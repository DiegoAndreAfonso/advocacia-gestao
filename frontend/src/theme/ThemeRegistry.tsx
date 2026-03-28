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

export type ThemeMode = "claro" | "escuro" | "daltonismo";

type ThemeModeContextValue = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
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

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>("claro");

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

    if (
      savedTheme === "claro" ||
      savedTheme === "escuro" ||
      savedTheme === "daltonismo"
    ) {
      setThemeMode(savedTheme);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("lawmanager-theme-mode", themeMode);
    document.body.dataset.themeMode = themeMode;
  }, [themeMode]);

  const theme = React.useMemo(() => {
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
      });
    }

    if (themeMode === "daltonismo") {
      return createTheme({
        palette: {
          contrastThreshold: 4.5,
          mode: "light",
          primary: { main: "#0b63ce" },
          secondary: { main: "#f59e0b" },
          success: { main: "#0f766e" },
          error: { main: "#b45309" },
          warning: { main: "#ca8a04" },
          background: {
            default: "#f4f7fb",
            paper: "#ffffff",
          },
        },
      });
    }

    return createTheme({
      palette: {
        mode: "light",
        primary: { main: "#2563eb" },
        secondary: { main: "#06b6d4" },
        background: {
          default: "#f1f5f9",
          paper: "#ffffff",
        },
      },
    });
  }, [themeMode]);

  return (
    <CacheProvider value={cache}>
      <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                transition:
                  "background-color 180ms ease, color 180ms ease, filter 180ms ease",
              },
              'body[data-theme-mode="daltonismo"]': {
                filter: "saturate(0.85) contrast(1.05)",
              },
              'body[data-theme-mode="escuro"]': {
                filter: "none",
              },
              'body[data-theme-mode="claro"]': {
                filter: "none",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </CacheProvider>
  );
}
