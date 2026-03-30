"use client";

import {
    Box,
    FormControlLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
    AppLanguage,
    ThemeMode,
    useAccessibility,
    useAppLanguage,
    useThemeMode,
} from "@/theme/ThemeRegistry";
import { ThemeModeSelector } from "./ThemeModeSelector";

export function AccessibilitySettings() {
    const { themeMode, setThemeMode } = useThemeMode();
    const { language, setLanguage } = useAppLanguage();
    const isEn = language === "en-US";
    const { accessibility, setAccessibility } = useAccessibility();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const updateAndNotify = () => {
        setSnackbarOpen(true);
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: "12px",
                borderColor: "divider",
                alignSelf: "stretch",
                minHeight: 188,
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <Icon icon="mdi:universal-access" width={18} color="currentColor" />
                <Typography fontWeight={700} color="text.primary">
                    {isEn ? "Accessibility" : "Acessibilidade"}
                </Typography>
            </Stack>

            <ThemeModeSelector
                value={themeMode}
                isEn={isEn}
                onChange={(mode) => {
                    setThemeMode(mode as ThemeMode);
                    updateAndNotify();
                }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography color="text.secondary" fontSize="0.9rem">
                    {isEn ? "Default language" : "Idioma padrão"}
                </Typography>
                <Select
                    value={language}
                    size="small"
                    sx={{
                        minWidth: 190,
                        borderRadius: "10px",
                        ".MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                    }}
                    onChange={(event) => {
                        setLanguage(event.target.value as AppLanguage);
                        updateAndNotify();
                    }}
                >
                    <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                    <MenuItem value="en-US">English</MenuItem>
                </Select>
            </Stack>

            <Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={accessibility.increasedFont}
                            onChange={(event) => {
                                setAccessibility({
                                    ...accessibility,
                                    increasedFont: event.target.checked,
                                });
                                updateAndNotify();
                            }}
                        />
                    }
                    label={isEn ? "Increase font size" : "Aumentar fonte"}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={accessibility.reducedMotion}
                            onChange={(event) => {
                                setAccessibility({
                                    ...accessibility,
                                    reducedMotion: event.target.checked,
                                });
                                updateAndNotify();
                            }}
                        />
                    }
                    label={isEn ? "Reduce animations" : "Reduzir animações"}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={accessibility.highContrast}
                            onChange={(event) => {
                                setAccessibility({
                                    ...accessibility,
                                    highContrast: event.target.checked,
                                });
                                updateAndNotify();
                            }}
                        />
                    }
                    label={isEn ? "High contrast" : "Alto contraste"}
                />
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2200}
                message={
                    isEn
                        ? "Accessibility preferences updated."
                        : "Preferências de acessibilidade atualizadas."
                }
                onClose={() => setSnackbarOpen(false)}
            />
        </Paper>
    );
}
