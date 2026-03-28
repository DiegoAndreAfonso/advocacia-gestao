"use client";

import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Divider,
    InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function LoginView() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.05fr" },
                bgcolor: "#eef2f9",
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 5,
                    color: "#fff",
                    background:
                        "linear-gradient(145deg, #0a1834 0%, #122a5f 60%, #1f46b6 100%)",
                }}
            >
                <Box
                    sx={{
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
                        <Icon icon="mdi:scale-balance" color="#fff" width={20} />
                    </Box>
                    <Typography fontSize="1.08rem" fontWeight={700}>
                        LawManager
                    </Typography>
                </Box>

                <Box>
                    <Typography fontSize="2rem" fontWeight={700} mb={1.2}>
                        Gestão Jurídica com foco em produtividade
                    </Typography>
                    <Typography sx={{ maxWidth: 420, opacity: 0.9 }}>
                        Controle clientes, processos, compromissos e financeiro em
                        um único lugar, com interface moderna e segura.
                    </Typography>
                </Box>

                <Typography sx={{ opacity: 0.75 }} fontSize="0.86rem">
                    © 2026 LawManager. Todos os direitos reservados.
                </Typography>
            </Box>

            <Box sx={{ display: "grid", placeItems: "center", p: { xs: 2, md: 4 } }}>
                <Paper
                    elevation={0}
                    sx={{
                        width: "100%",
                        maxWidth: 430,
                        p: 3,
                        borderRadius: "16px",
                        border: "1px solid #dbe3ef",
                        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                    }}
                >
                    <Stack spacing={2}>
                        <Box>
                            <Typography fontSize="1.35rem" fontWeight={700} color="#18263c">
                                Entrar no sistema
                            </Typography>
                            <Typography color="#6b7f9d" fontSize="0.88rem">
                                Acesse sua conta para continuar.
                            </Typography>
                        </Box>

                        <TextField
                            label="E-mail"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon icon="mdi:email-outline" width={18} color="#6f819b" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon icon="mdi:lock-outline" width={18} color="#6f819b" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Stack direction="row" justifyContent="space-between">
                            <Typography fontSize="0.82rem" color="#64748b">
                                Lembrar de mim
                            </Typography>
                            <Typography fontSize="0.82rem" color="#2563eb" sx={{ cursor: "pointer" }}>
                                Esqueceu a senha?
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            component={Link}
                            href="/dashboard"
                            sx={{
                                py: 1.1,
                                textTransform: "none",
                                borderRadius: "10px",
                                fontWeight: 600,
                            }}
                        >
                            Entrar
                        </Button>

                        <Divider />

                        <Typography
                            textAlign="center"
                            fontSize="0.86rem"
                            component={Link}
                            href="/"
                            sx={{ textDecoration: "none", color: "#6b7f9d" }}
                        >
                            ← Voltar para o site
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}
