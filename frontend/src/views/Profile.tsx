"use client";

import {
    Avatar,
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { ThemeMode, useThemeMode } from "@/theme/ThemeRegistry";
import { useEffect, useState } from "react";

export default function ProfileView() {
    const { themeMode, setThemeMode } = useThemeMode();
    const [themeDraft, setThemeDraft] = useState<ThemeMode>(themeMode);

    useEffect(() => {
        setThemeDraft(themeMode);
    }, [themeMode]);

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", display: "block" }}>
            <SidebarDashboard activeKey="perfil" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container
                    maxWidth={false}
                    sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}
                >
                    <Box mb={2}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            color="text.primary"
                        >
                            Meu Perfil
                        </Typography>
                        <Typography color="text.secondary" fontSize="0.9rem">
                            Gerencie suas Preferencias e informações pessoais.
                        </Typography>
                    </Box>

                    <Paper
                        sx={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                            bgcolor: "background.paper",
                        }}
                    >
                        <Box
                            sx={{
                                height: 150,
                                background:
                                    "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                            }}
                        />

                        <Box sx={{ px: 2.5, pb: 2.5 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mt: -5, mb: 2.2 }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
                                        sx={{
                                            width: 76,
                                            height: 76,
                                            border: "4px solid #fff",
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            fontWeight={700}
                                            fontSize="1.95rem"
                                            color="text.primary"
                                        >
                                            Dra. Elena Silva
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Sócia Sênior - Especialista em
                                            Direito Corporativo
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Button
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "10px",
                                        px: 2.2,
                                    }}
                                >
                                    Salvar Alterações
                                </Button>
                            </Stack>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        lg: "1.8fr 0.85fr",
                                    },
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Typography
                                        fontWeight={700}
                                        color="text.primary"
                                        mb={1.2}
                                    >
                                        Informações Pessoais
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                md: "1fr 1fr",
                                            },
                                            gap: 1.4,
                                            mb: 2.3,
                                        }}
                                    >
                                        <TextField
                                            label="Nome Completo"
                                            value="Elena Silva"
                                            fullWidth
                                        />
                                        <TextField
                                            label="E-mail Profissional"
                                            value="elena.silva@lawmanager.com"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Telefone Celular"
                                            value="+55 (11) 99999-9999"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Localização"
                                            value="São Paulo, SP"
                                            fullWidth
                                        />
                                    </Box>

                                    <Typography
                                        fontWeight={700}
                                        color="text.primary"
                                        mb={1.2}
                                    >
                                        Informações Profissionais
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                md: "1fr 1fr",
                                            },
                                            gap: 1.4,
                                        }}
                                    >
                                        <TextField
                                            label="Número da OAB"
                                            value="OAB/SP 123.456"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Cargo/Função"
                                            value="Sócia Sênior"
                                            fullWidth
                                        />
                                        <Box sx={{ gridColumn: "1 / -1" }}>
                                            <TextField
                                                label="Áreas de Atuação"
                                                value="Direito Corporativo, Fusões e Aquisições, Contratos"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Stack spacing={2}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: "12px",
                                            borderColor: "divider",
                                            alignSelf: "stretch",
                                            minHeight: 188,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            mb={1}
                                        >
                                            <Icon
                                                icon="mdi:tune-vertical"
                                                width={18}
                                                color="currentColor"
                                            />
                                            <Typography
                                                fontWeight={700}
                                                color="text.primary"
                                            >
                                                Preferências da Plataforma
                                            </Typography>
                                        </Stack>

                                        <Stack spacing={1.2}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.9rem"
                                                >
                                                    Tema visual
                                                </Typography>
                                                <Select
                            value={themeDraft}
                                                    size="small"
                                                    sx={selectStyle}
                                                    onChange={(event) => {
                                                        const newMode = event.target
                                                            .value as ThemeMode;
                                                        setThemeDraft(newMode);
                                                        setThemeMode(newMode);
                                                    }}
                                                >
                                                    <MenuItem value="claro">
                                                        Claro
                                                    </MenuItem>
                                                    <MenuItem value="escuro">
                                                        Escuro
                                                    </MenuItem>
                                                    <MenuItem value="daltonismo">
                                                        Daltonismo
                                                    </MenuItem>
                                                </Select>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.9rem"
                                                >
                                                    Idioma padrão
                                                </Typography>
                                                <Select
                                                    value="pt-BR"
                                                    size="small"
                                                    sx={selectStyle}
                                                >
                                                    <MenuItem value="pt-BR">
                                                        Português (Brasil)
                                                    </MenuItem>
                                                    <MenuItem value="en-US">
                                                        English
                                                    </MenuItem>
                                                </Select>
                                            </Stack>
                                        </Stack>
                                    </Paper>

                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: "12px",
                                            borderColor: "divider",
                                            alignSelf: "stretch",
                                            minHeight: 188,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            mb={1}
                                        >
                                            <Icon
                                                icon="mdi:shield-outline"
                                                width={18}
                                                color="currentColor"
                                            />
                                            <Typography
                                                fontWeight={700}
                                                color="text.primary"
                                            >
                                                Segurança
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            color="text.secondary"
                                            fontSize="0.86rem"
                                            mb={2}
                                        >
                                            Mantenha sua conta segura
                                            atualizando sua senha regularmente.
                                        </Typography>

                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: "10px",
                                                borderColor: "divider",
                                                color: "text.secondary",
                                                mb: 1.8,
                                            }}
                                        >
                                            Alterar Senha
                                        </Button>

                                        <Stack spacing={0.8}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ width: "100%" }}
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.88rem"
                                                >
                                                    Autenticação em 2 Fatores
                                                </Typography>
                                                <Switch
                                                    defaultChecked
                                                    size="small"
                                                    sx={{ ml: "auto" }}
                                                />
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ width: "100%" }}
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.88rem"
                                                >
                                                    Solicitar senha ao excluir
                                                    dados sensíveis
                                                </Typography>
                                                <Switch
                                                    defaultChecked
                                                    size="small"
                                                    sx={{ ml: "auto" }}
                                                />
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ width: "100%" }}
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.88rem"
                                                >
                                                    Permitir login por
                                                    dispositivo confiável
                                                </Typography>
                                                <Switch
                                                    defaultChecked
                                                    size="small"
                                                    sx={{ ml: "auto" }}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Paper>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: "10px",
                                        }}
                                        onClick={() => setThemeMode(themeDraft)}
                                    >
                                        Aplicar Preferências
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}

const selectStyle = {
    minWidth: 170,
    borderRadius: "10px",
    ".MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
};
