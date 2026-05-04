"use client";

import {
    Paper,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
    ThemeMode,
    useThemeMode,
} from "@/theme/ThemeRegistry";
import { ThemeModeSelector } from "./ThemeModeSelector";

export function AccessibilitySettings() {
    const { themeMode, setThemeMode } = useThemeMode();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const updateAndNotify = () => {
        setSnackbarOpen(true);
    };
    const handleThemeModeChange = (mode: ThemeMode) => {
        setThemeMode(mode);
        updateAndNotify();
    };
    

    return (
     
            

            <ThemeModeSelector
                value={themeMode}
                onChange={handleThemeModeChange}
            />

    );
}
