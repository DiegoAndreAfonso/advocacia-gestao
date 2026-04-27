"use client";

import { useCallback, useMemo, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translateBatch } from "@/services/translationService";

type TranslateFn = ((text: string) => string) & {
    prefetch: (texts: string[]) => Promise<void>;
};

export function useTranslate(): TranslateFn {
    const { language } = useLanguage();
    const cacheRef = useRef<Record<"pt" | "en" | "es", Record<string, string>>>({
        pt: {},
        en: {},
        es: {},
    });

    const prefetch = useCallback(
        async (texts: string[]) => {
            if (language === "pt") return;
            const unique = Array.from(new Set(texts.map((t) => t.trim()).filter(Boolean)));
            const langCache = cacheRef.current[language];
            const missing = unique.filter((t) => langCache[t] == null);
            if (missing.length === 0) return;

            const res = await translateBatch(missing, language);
            cacheRef.current[language] = { ...langCache, ...res };
        },
        [language],
    );

    const t = useMemo(() => {
        const fn = ((text: string) => {
            if (language === "pt") return text;
            const hit = cacheRef.current[language][text];
            return typeof hit === "string" ? hit : text;
        }) as TranslateFn;

        fn.prefetch = prefetch;

        return fn;
    }, [language, prefetch]);

    return t;
}

export default useTranslate;
