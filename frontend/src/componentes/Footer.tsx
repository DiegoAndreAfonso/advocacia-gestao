"use client";

import {
    Box,
    Container,
    Typography,
    Stack,
    TextField,
    Button,
} from "@mui/material";

export function Footer() {
    const inputStyle = {
        "& .MuiInputBase-input": {
            color: "#fff", // texto digitado
        },
        "& .MuiInputLabel-root": {
            color: "rgba(255,255,255,0.7)", // label
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#2563eb", // label quando focado
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
            },
            "&:hover fieldset": {
                borderColor: "#fff",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
            },
        },
    };
    const mensagem = encodeURIComponent(
        "Olá, gostaria de agendar uma consulta jurídica.",
    );

    const telefone = "5533999377986";
    return (
        <Box
            sx={{
                background:
                    "linear-gradient(to right, #0f172a, #1e293b, #1e3a8a)",
                color: "#fff",
            }}
        >
            <Container maxWidth="xl" disableGutters sx={{ py: 10, px: 2 }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={6}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* Texto */}
                    <Box maxWidth={400} sx={{ color: "#fff" }}>
                        <Typography variant="h4" fontWeight="bold" mb={2}>
                            Agende sua primeira consulta jurídica sem custo.
                        </Typography>

                        <Typography mb={3}>
                            Oferecemos consultoria especializada na análise de
                            cada processo com a primeira consulta sem custo.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#a16207",
                                "&:hover": { bgcolor: "#854d0e" },
                            }}
                        >
                            Conversar pelo WhatsApp
                        </Button>
                    </Box>

                    {/* Form */}
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Nome"
                                fullWidth
                                size="small"
                                sx={inputStyle}
                            />
                            <TextField
                                label="Telefone"
                                fullWidth
                                size="small"
                                sx={inputStyle}
                            />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="E-mail"
                                fullWidth
                                size="small"
                                sx={inputStyle}
                            />
                            <TextField
                                label="Empresa"
                                fullWidth
                                size="small"
                                sx={inputStyle}
                            />
                        </Stack>

                        <TextField
                            label="Como podemos te ajudar?"
                            multiline
                            rows={3}
                            fullWidth
                            sx={inputStyle}
                        />

                        <Button
                            component="a"
                            href={`https://wa.me/${telefone}?text=${mensagem}`}
                            target="_blank"
                        >
                            Conversar pelo WhatsApp
                        </Button>
                    </Stack>
                </Stack>
            </Container>

            <Container maxWidth="xl" disableGutters sx={{ pb: 6, px: 2 }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={6}
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography fontWeight="bold">LAW MANAGER</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Advocacia & Consultoria Jurídica
                        </Typography>
                    </Box>

                    <Box maxWidth={300}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Direito tributário e empresarial com atuação
                            especializada.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2">São Paulo</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                            Av. Paulista, 1000
                        </Typography>
                    </Box>
                </Stack>

                {/* COPYRIGHT */}
                <Box textAlign="center" mt={6}>
                    <Typography
                        variant="caption"
                        sx={{
                            opacity: 0.5, // 🔥 mais sutil
                        }}
                    >
                        © 2026 LawManager - Todos os direitos reservados
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
