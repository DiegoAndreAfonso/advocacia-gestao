"use client";

import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

type NavItem = {
    key: string;
    label: string;
    icon: string;
    href?: string;
};

const mainItems: NavItem[] = [
    {
        key: "painel",
        label: "Painel",
        icon: "mdi:view-dashboard-outline",
        href: "/dashboard",
    },
    {
        key: "clientes",
        label: "Clientes",
        icon: "mdi:account-group-outline",
        href: "/clients",
    },
    {
        key: "agenda",
        label: "Agenda",
        icon: "mdi:calendar-month-outline",
        href: "/agenda",
    },
    {
        key: "financeiro",
        label: "Financeiro",
        icon: "mdi:currency-usd",
        href: "/finance",
    },
];

const bottomItems: NavItem[] = [
    { key: "perfil", label: "Meu Perfil", icon: "mdi:account-outline", href: "/profile" },
    { key: "sair", label: "Sair", icon: "mdi:logout", href: "/login" },
];

type SidebarItemProps = {
    item: NavItem;
    active: boolean;
};

function SidebarItem({ item, active }: SidebarItemProps) {
    return (
        <ButtonBase
            component={item.href ? Link : "button"}
            href={item.href}
            sx={{
                width: "100%",
                borderRadius: "12px",
                justifyContent: "flex-start",
                px: 1.6,
                py: 1.2,
                color: active ? "#ffffff" : "#c4d0e6",
                bgcolor: active ? "#2563eb" : "transparent",
                "&:hover": {
                    bgcolor: active ? "#2563eb" : "rgba(148,163,184,0.12)",
                },
            }}
        >
            <Icon icon={item.icon} width={21} />
            <Typography
                sx={{
                    ml: 1.3,
                    fontSize: "1rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                }}
            >
                {item.label}
            </Typography>
        </ButtonBase>
    );
}

type Props = {
    activeKey?: string;
};

export function SidebarDashboard({ activeKey }: Props) {
    return (
        <Box
            sx={{
                width: 280,
                height: "100dvh",
                bgcolor: "#0a1834",
                borderRight: "1px solid #142746",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                flexShrink: 0,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1200,
            }}
        >
            <Box
                sx={{
                    height: 80,
                    px: 3,
                    borderBottom: "1px solid #1f3358",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                }}
            >
                <Box
                    sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "9px",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "#2563eb",
                    }}
                >
                    <Icon icon="mdi:scale-balance" width={20} color="#fff" />
                </Box>
                <Typography fontWeight={700} fontSize="1.1rem" color="#f8fafc">
                    LawManager
                </Typography>
            </Box>

            <Box sx={{ px: 2, py: 2.5, flex: 1 }}>
                <Typography
                    sx={{
                        color: "#8da0c2",
                        fontSize: "0.76rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.09em",
                        mb: 1.2,
                    }}
                >
                    Menu Principal
                </Typography>

                <Stack spacing={0.8}>
                    {mainItems.map((item) => (
                        <SidebarItem
                            key={item.key}
                            item={item}
                            active={activeKey === item.key}
                        />
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    px: 2,
                    py: 2.5,
                    borderTop: "1px solid #1f3358",
                    bgcolor: "#0a1834",
                    flexShrink: 0,
                }}
            >
                <Stack spacing={0.8}>
                    {bottomItems.map((item) => (
                        <SidebarItem
                            key={item.key}
                            item={item}
                            active={activeKey === item.key}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
