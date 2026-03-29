"use client";

import {
    Avatar,
    Badge,
    Box,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationsContext";
import { useTheme } from "@mui/material/styles";

type Props = {
    userName?: string;
    userRole?: string;
};

export function HeaderDashboard({
    userName = "Dra. Elena Silva",
    userRole = "Sócia Sênior",
}: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
        useNotifications();

    return (
        <Box
            sx={{
                height: 80,
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
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
                        bgcolor: isDark ? "#0f172a" : "#f8fafc",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "divider",
                    },
                    "& input": {
                        py: 1.2,
                        fontSize: "0.95rem",
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icon
                                icon="mdi:magnify"
                                width={20}
                                color="currentColor"
                            />
                        </InputAdornment>
                    ),
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.9,
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <IconButton
                        sx={{ color: "text.secondary", p: 0.45 }}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <Badge
                            color="error"
                            variant={unreadCount > 0 ? "dot" : "standard"}
                            overlap="circular"
                        >
                            <Icon icon="mdi:bell-outline" width={19} />
                        </Badge>
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        width: 1,
                        height: 28,
                        bgcolor: "divider",
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
                    <Typography
                        fontSize="0.92rem"
                        fontWeight={700}
                        color="text.primary"
                        whiteSpace="nowrap"
                    >
                        {userName}
                    </Typography>
                    <Typography
                        fontSize="0.75rem"
                        color="text.secondary"
                        mt={0.18}
                        whiteSpace="nowrap"
                    >
                        {userRole}
                    </Typography>
                </Box>

                <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
                    alt={userName}
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: "#1d4ed8",
                        fontSize: "0.84rem",
                        ml: 0.1,
                    }}
                >
                    ES
                </Avatar>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: {
                        width: 360,
                        borderRadius: "12px",
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    },
                }}
            >
                <Box
                    sx={{
                        px: 1.6,
                        py: 1.2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography fontWeight={700} color="text.primary">
                            Notificações
                        </Typography>
                        <Stack direction="row" spacing={0.8}>
                            <Typography
                                fontSize="0.75rem"
                                color="primary.main"
                                sx={{ cursor: "pointer" }}
                                onClick={markAllAsRead}
                            >
                                Marcar tudo como lido
                            </Typography>
                            <Typography
                                fontSize="0.75rem"
                                color="text.secondary"
                                sx={{ cursor: "pointer" }}
                                onClick={clearAll}
                            >
                                Limpar
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>

                {notifications.length === 0 ? (
                    <MenuItem disabled>
                        <Typography color="text.secondary" fontSize="0.86rem">
                            Sem notificações por enquanto.
                        </Typography>
                    </MenuItem>
                ) : (
                    notifications.slice(0, 8).map((item) => (
                        <MenuItem
                            key={item.id}
                            onClick={() => markAsRead(item.id)}
                            sx={{
                                alignItems: "flex-start",
                                whiteSpace: "normal",
                                py: 1.2,
                                bgcolor: item.read
                                    ? "transparent"
                                    : isDark
                                      ? "rgba(96,165,250,0.15)"
                                      : "#eff6ff",
                            }}
                        >
                            <Box>
                                <Typography
                                    fontSize="0.86rem"
                                    fontWeight={600}
                                    color="text.primary"
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    color="text.secondary"
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </Box>
    );
}
