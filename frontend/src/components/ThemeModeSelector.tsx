"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { ThemeMode } from "@/theme/ThemeRegistry";
import { useTranslate } from "@/hooks/useTranslate";

type Props = {
    value: ThemeMode;
    onChange: (mode: ThemeMode) => void;
};

export function ThemeModeSelector({ value, onChange }: Props) {
    const t = useTranslate();
    const handleModeChange = (mode: ThemeMode) => onChange(mode);
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography color="text.secondary" fontSize="0.9rem">
                {t("Tema visual")}
            </Typography>
            <Select
                value={value}
                size="small"
                sx={{
                    minWidth: 190,
                    borderRadius: "10px",
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "divider",
                    },
                }}
                onChange={(event) =>
                    handleModeChange(event.target.value as ThemeMode)
                }
            >
                <MenuItem value="claro">{t("Claro")}</MenuItem>
                <MenuItem value="escuro">{t("Escuro")}</MenuItem>
                <MenuItem value="daltonismo">
                    {t("Daltonismo")}
                </MenuItem>
                <MenuItem value="acessibilidade">
                    {t("Acessibilidade")}
                </MenuItem>
            </Select>
        </Stack>
    );
}
