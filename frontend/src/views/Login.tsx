"use client";

import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Checkbox,
    FormControlLabel,
    InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginView() {
    const [step, setStep] = useState<"identify" | "login" | "register">(
        "identify",
    );
    const [identifier, setIdentifier] = useState("");
    const handleIdentify = () => {
        if (identifier.includes("@")) {
            setStep("login");
        } else {
            setStep("register");
        }
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f1f5f9"
        >
            <Stack spacing={3} alignItems="center">
                <Box
                    sx={{
                        bgcolor: "#2563eb",
                        p: 1.5,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Icon icon="mdi:scale-balance" color="#fff" width={24} />
                </Box>

                <Box textAlign="center">
                    <Typography variant="h5" fontWeight="bold">
                        LawManager
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {step === "identify" && "Informe seu e-mail ou CPF"}
                        {step === "login" && "Digite sua senha"}
                        {step === "register" && "Crie sua conta"}
                    </Typography>
                </Box>

                <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 4 }}>
                    <Stack spacing={2}>
                        {step === "identify" && (
                            <>
                                <TextField
                                    label="E-mail ou CPF"
                                    fullWidth
                                    value={identifier}
                                    onChange={(e) =>
                                        setIdentifier(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon
                                                    icon="mdi:account-outline"
                                                    width={20}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleIdentify}
                                    sx={{
                                        py: 1.2,
                                        bgcolor: "#2563eb",
                                        "&:hover": { bgcolor: "#1d4ed8" },
                                    }}
                                >
                                    Continuar
                                </Button>
                            </>
                        )}

                        {step === "login" && (
                            <>
                                <TextField
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon
                                                    icon="mdi:lock-outline"
                                                    width={20}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Lembrar-me"
                                    />

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#2563eb",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Esqueceu a senha?
                                    </Typography>
                                </Stack>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        py: 1.2,
                                        bgcolor: "#2563eb",
                                        "&:hover": { bgcolor: "#1d4ed8" },
                                    }}
                                >
                                    Entrar
                                </Button>

                                <Button onClick={() => setStep("identify")}>
                                    Voltar
                                </Button>
                            </>
                        )}

                        {step === "register" && (
                            <>
                                <TextField label="Nome completo" fullWidth />

                                <TextField
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                />

                                <TextField
                                    label="Confirmar senha"
                                    type="password"
                                    fullWidth
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        py: 1.2,
                                        bgcolor: "#2563eb",
                                        "&:hover": { bgcolor: "#1d4ed8" },
                                    }}
                                >
                                    Criar conta
                                </Button>

                                <Button onClick={() => setStep("identify")}>
                                    Voltar
                                </Button>
                            </>
                        )}

                        <Typography
                            textAlign="center"
                            variant="body2"
                            component={Link}
                            href="/"
                            sx={{
                                textDecoration: "none",
                                color: "text.secondary",
                            }}
                        >
                            ← Voltar para o site
                        </Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}
