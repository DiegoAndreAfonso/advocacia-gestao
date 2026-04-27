"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAppLanguage, type AppLanguage } from "@/theme/ThemeRegistry";

export type Language = "pt" | "en" | "es";

type LanguageContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
};

const STORAGE_KEY = "lawmanager-language-v2";
const LEGACY_STORAGE_KEY = "lawmanager-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function normalizeLanguage(value: unknown): Language {
    return value === "pt" || value === "en" || value === "es" ? value : "pt";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const legacy = useAppLanguage();
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window === "undefined") return "pt";
        const storedV2 = localStorage.getItem(STORAGE_KEY);
        if (storedV2) return normalizeLanguage(storedV2);

        // Migration: map legacy ThemeRegistry language to the new format.
        const storedLegacy = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (storedLegacy === "en-US") return "en";
        if (storedLegacy === "pt-BR") return "pt";
        // If a previous build wrote pt/en/es into the legacy key, accept it.
        return normalizeLanguage(storedLegacy);
    });

    useEffect(() => {
        const mapped: AppLanguage = language === "en" ? "en-US" : "pt-BR";
        queueMicrotask(() => {
            legacy.setLanguage(mapped);
        });
    }, [language, legacy]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, lang);
        }

        // Keep legacy UI (manual strings) working while the migration is in progress.
        const mapped: AppLanguage = lang === "en" ? "en-US" : "pt-BR";
        legacy.setLanguage(mapped);
    }, [legacy]);

    const value = useMemo<LanguageContextValue>(() => ({ language, setLanguage }), [language, setLanguage]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage deve ser usado com LanguageProvider.");
    return ctx;
}
