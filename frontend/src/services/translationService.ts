"use client";

import { getAxios } from "@/configs/axios";
import type { Language } from "@/context/LanguageContext";

type CacheEntry = { s: string; t: string };

const MEMORY_CACHE = new Map<string, string>();
const STORAGE_PREFIX = "tr:v1";
const api = getAxios({ timeoutMs: 12000 });

function hashText(text: string): string {
    // Small, deterministic hash (djb2) to keep localStorage keys short.
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash) ^ text.charCodeAt(i);
    }
    // Convert to unsigned 32-bit
    return (hash >>> 0).toString(16);
}

function storageKey(text: string, lang: Language): string {
    return `${STORAGE_PREFIX}:${lang}:${hashText(text)}`;
}

function getCached(text: string, lang: Language): string | null {
    if (lang === "pt") return text;

    const memKey = `${lang}:${text}`;
    const mem = MEMORY_CACHE.get(memKey);
    if (mem) return mem;

    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(storageKey(text, lang));
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as CacheEntry;
        if (!parsed || parsed.s !== text || typeof parsed.t !== "string") return null;
        MEMORY_CACHE.set(memKey, parsed.t);
        return parsed.t;
    } catch {
        return null;
    }
}

function setCached(text: string, lang: Language, translated: string): void {
    if (lang === "pt") return;
    const memKey = `${lang}:${text}`;
    MEMORY_CACHE.set(memKey, translated);

    if (typeof window === "undefined") return;
    const entry: CacheEntry = { s: text, t: translated };
    try {
        localStorage.setItem(storageKey(text, lang), JSON.stringify(entry));
    } catch {
        // ignore quota errors
    }
}

export async function translate(text: string, targetLang: Language): Promise<string> {
    if (!text.trim()) return text;
    if (targetLang === "pt") return text;

    const cached = getCached(text, targetLang);
    if (cached) return cached;

    try {
        const res = await api.post("/translate", {
            texts: [text],
            target: targetLang,
        });

        const payload = res.data?.data ?? res.data;
        const translations = (payload?.translations ?? payload?.data?.translations) as
            | Record<string, string>
            | undefined;
        const translated = translations?.[text] ?? text;

        setCached(text, targetLang, translated);
        return translated;
    } catch {
        // Fallback to PT if the translation API is slow/unavailable.
        return text;
    }
}

export async function translateBatch(texts: string[], targetLang: Language): Promise<Record<string, string>> {
    const unique = Array.from(new Set(texts.map((t) => t.trim()).filter(Boolean)));
    const result: Record<string, string> = {};

    if (targetLang === "pt") {
        for (const t of unique) result[t] = t;
        return result;
    }

    const missing: string[] = [];
    for (const t of unique) {
        const cached = getCached(t, targetLang);
        if (cached) result[t] = cached;
        else missing.push(t);
    }

    if (missing.length === 0) return result;

    try {
        const res = await api.post("/translate", {
            texts: missing,
            target: targetLang,
        });
        const payload = res.data?.data ?? res.data;
        const translations = (payload?.translations ?? payload?.data?.translations) as
            | Record<string, string>
            | undefined;

        for (const source of missing) {
            const translated = translations?.[source] ?? source;
            result[source] = translated;
            setCached(source, targetLang, translated);
        }
    } catch {
        for (const source of missing) {
            result[source] = source;
        }
    }

    return result;
}

const translationService = {
    translate,
    translateBatch,
};

export default translationService;
