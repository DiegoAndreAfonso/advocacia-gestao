"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
    ThemeProvider,
    CssBaseline,
    createTheme,
    GlobalStyles,
} from "@mui/material";
import { useServerInsertedHTML } from "next/navigation";
import type { EmotionCache } from "@emotion/cache";

export type ThemeMode = "claro" | "escuro" | "daltonismo" | "acessibilidade";
export type AppLanguage = "pt-BR" | "en-US";
export type AccessibilityPreferences = {
    increasedFont: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
};

type ThemeModeContextValue = {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    language: AppLanguage;
    setLanguage: (language: AppLanguage) => void;
    accessibility: AccessibilityPreferences;
    setAccessibility: (settings: AccessibilityPreferences) => void;
};

const ThemeModeContext = React.createContext<ThemeModeContextValue | undefined>(
    undefined,
);

export function useThemeMode() {
    const context = React.useContext(ThemeModeContext);

    if (!context) {
        throw new Error("useThemeMode deve ser usado dentro de ThemeRegistry.");
    }

    return context;
}

export function useAppLanguage() {
    const context = React.useContext(ThemeModeContext);
    if (!context) {
        throw new Error(
            "useAppLanguage deve ser usado dentro de ThemeRegistry.",
        );
    }
    return {
        language: context.language,
        setLanguage: context.setLanguage,
    };
}

export function useAccessibility() {
    const context = React.useContext(ThemeModeContext);
    if (!context) {
        throw new Error(
            "useAccessibility deve ser usado dentro de ThemeRegistry.",
        );
    }
    return {
        accessibility: context.accessibility,
        setAccessibility: context.setAccessibility,
    };
}

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const [themeMode, setThemeMode] = React.useState<ThemeMode>("claro");
    const [language, setLanguage] = React.useState<AppLanguage>("pt-BR");
    const [accessibility, setAccessibility] =
        React.useState<AccessibilityPreferences>({
            increasedFont: false,
            reducedMotion: false,
            highContrast: false,
        });

    const [{ cache, inserted }] = React.useState(() => {
        const cache = createCache({ key: "mui", prepend: true });
        cache.compat = true;

        const inserted: string[] = [];

        const prevInsert = cache.insert;

        cache.insert = (...args: Parameters<EmotionCache["insert"]>) => {
            const serialized = args[1];

            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }

            return prevInsert(...args);
        };

        return { cache, inserted };
    });

    useServerInsertedHTML(() => (
        <style
            data-emotion={`mui ${inserted.join(" ")}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(" "),
            }}
        />
    ));

    React.useEffect(() => {
        const savedTheme = window.localStorage.getItem(
            "lawmanager-theme-mode",
        ) as ThemeMode | null;
        const savedLanguage = window.localStorage.getItem(
            "lawmanager-language",
        ) as AppLanguage | null;
        const savedAccessibility = window.localStorage.getItem(
            "lawmanager-accessibility",
        );

        if (
            savedTheme === "claro" ||
            savedTheme === "escuro" ||
            savedTheme === "daltonismo" ||
            savedTheme === "acessibilidade"
        ) {
            setThemeMode(savedTheme);
        }

        if (savedLanguage === "pt-BR" || savedLanguage === "en-US") {
            setLanguage(savedLanguage);
        }

        if (savedAccessibility) {
            try {
                const parsed =
                    JSON.parse(savedAccessibility) as AccessibilityPreferences;
                setAccessibility(parsed);
            } catch {
                // ignore malformed storage
            }
        } else {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion) {
                setAccessibility((prev) => ({
                    ...prev,
                    reducedMotion: true,
                }));
            }
        }
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem("lawmanager-theme-mode", themeMode);
        document.body.dataset.themeMode = themeMode;
    }, [themeMode]);

    React.useEffect(() => {
        window.localStorage.setItem("lawmanager-language", language);
        document.documentElement.lang = language === "en-US" ? "en" : "pt-br";
    }, [language]);

    React.useEffect(() => {
        window.localStorage.setItem(
            "lawmanager-accessibility",
            JSON.stringify(accessibility),
        );
    }, [accessibility]);

    const theme = React.useMemo(() => {
        const isA11yMode = themeMode === "acessibilidade";
        const highContrast = accessibility.highContrast || isA11yMode;
        const increasedFont = accessibility.increasedFont || isA11yMode;

        if (themeMode === "escuro") {
            return createTheme({
                palette: {
                    mode: "dark",
                    primary: { main: "#60a5fa" },
                    secondary: { main: "#22d3ee" },
                    background: {
                        default: "#0b1220",
                        paper: "#111b2e",
                    },
                },
                components: {
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                borderColor: "#23324d",
                            },
                        },
                    },
                },
                typography: {
                    fontSize: increasedFont ? 18 : 14,
                    allVariants: { lineHeight: 1.7 },
                    fontWeightRegular: increasedFont ? 500 : 400,
                    fontWeightMedium: 600,
                    fontWeightBold: 700,
                },
            });
        }

        if (themeMode === "daltonismo") {
            return createTheme({
                palette: {
                    mode: "light",

                    primary: { main: "#1d4ed8" }, // azul forte
                    secondary: { main: "#9333ea" }, // roxo 

                    success: { main: "#2563eb" }, // azul 
                    error: { main: "#dc2626" }, // vermelho forte
                    warning: { main: "#d97706" }, // laranja
                    info: { main: "#0891b2" }, // ciano

                    background: {
                        default: "#ffffff",
                        paper: "#f8fafc",
                    },

                    text: {
                        primary: "#0f172a",
                        secondary: "#334155",
                    },
                },

                typography: {
                    fontSize: increasedFont ? 18 : 14,
                    allVariants: { lineHeight: 1.7 },
                    fontWeightRegular: increasedFont ? 500 : 400,
                    fontWeightMedium: 600,
                    fontWeightBold: 700,
                },

                components: {
                    MuiButton: {
                        styleOverrides: {
                            contained: {
                                fontWeight: 600,
                                borderRadius: 8,
                            },
                        },
                    },

                    MuiChip: {
                        styleOverrides: {
                            root: {
                                fontWeight: 600,
                            },
                        },
                    },

                    MuiAlert: {
                        styleOverrides: {
                            standardSuccess: {
                                backgroundColor: "#e0f2fe",
                                color: "#1e3a8a",
                            },
                        },
                    },
                },
            });
        }

        if (themeMode === "acessibilidade") {
            return createTheme({
                palette: {
                    mode: highContrast ? "dark" : "light",
                    primary: { main: "#2563eb" },
                    secondary: { main: "#0891b2" },
                    background: {
                        default: highContrast ? "#000000" : "#ffffff",
                        paper: highContrast ? "#000000" : "#ffffff",
                    },
                    text: {
                        primary: highContrast ? "#ffffff" : "#000000",
                        secondary: highContrast ? "#e2e8f0" : "#111827",
                    },
                    divider: highContrast ? "#60a5fa" : "#1f2937",
                },
                typography: {
                    fontSize: increasedFont ? 20 : 18,
                    allVariants: { lineHeight: 1.8 },
                    fontWeightRegular: 600,
                    fontWeightMedium: 700,
                    fontWeightBold: 800,
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                minHeight: 46,
                                padding: "10px 18px",
                                fontWeight: 700,
                                borderRadius: 10,
                            },
                        },
                    },
                    MuiTextField: {
                        defaultProps: {
                            size: "medium",
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                padding: "8px",
                            },
                        },
                    },
                },
            });
        }

        return createTheme({
            palette: {
                mode: "light",
                primary: { main: "#2563eb" },
                secondary: { main: "#06b6d4" },
                text: {
                    primary: highContrast ? "#000000" : "#0f172a",
                    secondary: highContrast ? "#111827" : "#475569",
                },
                background: {
                    default: "#f1f5f9",
                    paper: "#ffffff",
                },
                divider: highContrast ? "#1f2937" : "#e2e8f0",
            },
            typography: {
                fontSize: increasedFont ? 18 : 14,
                allVariants: { lineHeight: 1.7 },
                fontWeightRegular: increasedFont ? 500 : 400,
                fontWeightMedium: 600,
                fontWeightBold: 700,
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            minHeight: increasedFont ? 44 : 40,
                            padding: increasedFont ? "10px 16px" : "8px 14px",
                        },
                    },
                },
                MuiTextField: {
                    defaultProps: {
                        size: increasedFont ? "medium" : "small",
                    },
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            padding: increasedFont ? "8px" : "4px",
                        },
                    },
                },
            },
        });
    }, [themeMode, accessibility]);

    return (
        <CacheProvider value={cache}>
            <ThemeModeContext.Provider
                value={{
                    themeMode,
                    setThemeMode,
                    language,
                    setLanguage,
                    accessibility,
                    setAccessibility,
                }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles
                        styles={{
                            body: {
                                transition:
                                    "background-color 180ms ease, color 180ms ease, filter 180ms ease",
                            },
                            "*:focus-visible": {
                                outline: "3px solid #2563eb",
                                outlineOffset: "2px",
                            },
                            ...(accessibility.reducedMotion ||
                            themeMode === "acessibilidade"
                                ? {
                                      "*": {
                                          transition: "none !important",
                                          animation: "none !important",
                                          scrollBehavior: "auto !important",
                                      },
                                  }
                                : {}),
                        }}
                    />
                    {children}
                </ThemeProvider>
            </ThemeModeContext.Provider>
        </CacheProvider>
    );
}
