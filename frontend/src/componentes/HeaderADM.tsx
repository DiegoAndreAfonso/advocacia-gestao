"use client";

import { Avatar, Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

type Props = {
    userName?: string;
    userRole?: string;
};

export function HeaderDashboard({ userName = "Dra. Elena Silva", userRole = "Sócia Sênior" }: Props) {
    return (
        <Box
            sx={{
                height: 80,
                bgcolor: "#ffffff",
                borderBottom: "1px solid #dbe3ef",
                px: { xs: 2, md: 4 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
            }}
        >
            <TextField
                fullWidth
                placeholder="Buscar clientes, processos ou tarefas..."
                sx={{
                    maxWidth: 460,
                    "& .MuiOutlinedInput-root": {
                        height: 46,
                        borderRadius: "10px",
                        bgcolor: "#f8fafc",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d2dceb",
                    },
                    "& input": {
                        py: 1.2,
                        fontSize: "0.95rem",
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icon icon="mdi:magnify" width={20} color="#7c8ba1" />
                        </InputAdornment>
                    ),
                }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.9, flexShrink: 0 }}>
                <Box sx={{ position: "relative", display: "grid", placeItems: "center" }}>
                    <IconButton sx={{ color: "#8090a7", p: 0.45 }}>
                        <Icon icon="mdi:bell-outline" width={19} />
                    </IconButton>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            width: 6.5,
                            height: 6.5,
                            borderRadius: "999px",
                            bgcolor: "#ef4444",
                            border: "1.5px solid #fff",
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        width: 1,
                        height: 28,
                        bgcolor: "#dbe3ef",
                        mx: 0.2,
                    }}
                />

                <Box
                    sx={{
                        textAlign: "right",
                        display: { xs: "none", sm: "block" },
                        lineHeight: 1.05,
                        whiteSpace: "nowrap",
                    }}
                >
                    <Typography fontSize="0.92rem" fontWeight={700} color="#162236" whiteSpace="nowrap">
                        {userName}
                    </Typography>
                    <Typography fontSize="0.75rem" color="#6f819b" mt={0.18} whiteSpace="nowrap">
                        {userRole}
                    </Typography>
                </Box>

                <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
                    alt={userName}
                    sx={{ width: 36, height: 36, bgcolor: "#1d4ed8", fontSize: "0.84rem", ml: 0.1 }}
                >
                    ES
                </Avatar>
            </Box>
        </Box>
    );
}
