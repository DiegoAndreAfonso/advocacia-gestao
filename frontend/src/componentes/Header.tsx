"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";

type Props = {
    isAuthenticated?: boolean;
    userName?: string;
};

export function Header({ isAuthenticated = false, userName }: Props) {
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#fff",
                borderBottom: "1px solid #e2e8f0",
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
                                LawManager
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Advocacia & Consultoria
                            </Typography>
                        </Box>
                    </Stack>

                    {!isAuthenticated ? (
                        <Stack direction="row" spacing={2}>
                            <Link href="/login">
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#0f172a",
                                        borderRadius: "999px",
                                        px: 3,
                                        "&:hover": { bgcolor: "#020617" },
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography fontWeight="medium">
                                {userName || "Usuário"}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
