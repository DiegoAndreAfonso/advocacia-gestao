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
    ThemeMode,
    useAccessibility,
    useThemeMode,
} from "@/theme/ThemeRegistry";
import { ThemeModeSelector } from "./ThemeModeSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslate";

export function AccessibilitySettings() {
    const { themeMode, setThemeMode } = useThemeMode();
    const { language, setLanguage } = useLanguage();
    const t = useTranslate();
    const { accessibility, setAccessibility } = useAccessibility();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const updateAndNotify = () => {
        setSnackbarOpen(true);
    };
    const handleThemeModeChange = (mode: ThemeMode) => {
        setThemeMode(mode);
        updateAndNotify();
    };
    const handleLanguageChange = (value: "pt" | "en" | "es") => {
        setLanguage(value);
        updateAndNotify();
    };
    const handleIncreasedFontChange = (checked: boolean) => {
        setAccessibility({
            ...accessibility,
            increasedFont: checked,
        });
        updateAndNotify();
    };
    const handleReducedMotionChange = (checked: boolean) => {
        setAccessibility({
            ...accessibility,
            reducedMotion: checked,
        });
        updateAndNotify();
    };
    const handleHighContrastChange = (checked: boolean) => {
        setAccessibility({
            ...accessibility,
            highContrast: checked,
        });
        updateAndNotify();
    };
    const handleSnackbarClose = () => setSnackbarOpen(false);

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
                <Icon
                    icon="mdi:universal-access"
                    width={18}
                    color="currentColor"
                />
                <Typography fontWeight={700} color="text.primary">
                    {t("Acessibilidade")}
                </Typography>
            </Stack>

            <ThemeModeSelector
                value={themeMode}
                onChange={handleThemeModeChange}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography color="text.secondary" fontSize="0.9rem">
                    {t("Idioma padrão")}
                </Typography>
                <Select
                    value={language}
                    size="small"
                    sx={{
                        minWidth: 190,
                        borderRadius: "10px",
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "divider",
                        },
                    }}
                    onChange={(event) =>
                        handleLanguageChange(event.target.value as "pt" | "en" | "es")
                    }
                >
                    <MenuItem value="pt">{t("Português")}</MenuItem>
                    <MenuItem value="en">{t("Inglês")}</MenuItem>
                    <MenuItem value="es">{t("Espanhol")}</MenuItem>
                </Select>
            </Stack>

            <Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={accessibility.increasedFont}
                            onChange={(event) =>
                                handleIncreasedFontChange(event.target.checked)
                            }
                        />
                    }
                    label={t("Aumentar fonte")}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={accessibility.reducedMotion}
                            onChange={(event) =>
                                handleReducedMotionChange(event.target.checked)
                            }
                        />
                    }
                    label={t("Reduzir animações")}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={accessibility.highContrast}
                            onChange={(event) =>
                                handleHighContrastChange(event.target.checked)
                            }
                        />
                    }
                    label={t("Alto contraste")}
                />
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2200}
                message={t("Preferências de acessibilidade atualizadas.")}
                onClose={handleSnackbarClose}
            />
        </Paper>
    );
}
