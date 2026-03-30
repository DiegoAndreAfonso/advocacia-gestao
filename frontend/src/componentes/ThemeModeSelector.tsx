"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { ThemeMode } from "@/theme/ThemeRegistry";

type Props = {
    value: ThemeMode;
    onChange: (mode: ThemeMode) => void;
    isEn?: boolean;
};

export function ThemeModeSelector({ value, onChange, isEn = false }: Props) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="text.secondary" fontSize="0.9rem">
                {isEn ? "Visual theme" : "Tema visual"}
            </Typography>
            <Select
                value={value}
                size="small"
                sx={{
                    minWidth: 190,
                    borderRadius: "10px",
                    ".MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                }}
                onChange={(event) => onChange(event.target.value as ThemeMode)}
            >
                <MenuItem value="claro">{isEn ? "Light" : "Claro"}</MenuItem>
                <MenuItem value="escuro">{isEn ? "Dark" : "Escuro"}</MenuItem>
                <MenuItem value="daltonismo">{isEn ? "Colorblind" : "Daltonismo"}</MenuItem>
                <MenuItem value="acessibilidade">{isEn ? "Accessibility" : "Acessibilidade"}</MenuItem>
            </Select>
        </Stack>
    );
}
