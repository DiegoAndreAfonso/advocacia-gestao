"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAppLanguage } from "@/theme/ThemeRegistry";

type Props = {
    isAuthenticated?: boolean;
    userName?: string;
};

export function Header({ isAuthenticated = false, userName }: Props) {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    py={2}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ bgcolor: "#2563eb", p: 1, borderRadius: 2 }}>
                            <Icon icon="mdi:scale-balance" color="#fff" />
                        </Box>

                        <Box>
                            <Typography fontWeight="bold">
                                Central jurídica
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {isEn
                                    ? "Law Firm & Consulting"
                                    : "Advocacia & Consultoria"}
                            </Typography>
                        </Box>
                    </Stack>

                    {!isAuthenticated ? (
                        <Stack direction="row" spacing={2}>
                            <Link href="/login">
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "primary.main",
                                        borderRadius: "999px",
                                        px: 3,
                                        "&:hover": { bgcolor: "primary.dark" },
                                    }}
                                >
                                    {isEn ? "Sign in" : "Login"}
                                </Button>
                            </Link>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography fontWeight="medium">
                                {userName || (isEn ? "User" : "Usuário")}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
