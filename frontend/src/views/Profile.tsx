"use client";

import {
    Avatar,
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { AccessibilitySettings } from "@/componentes/AccessibilitySettings";
import { useAppLanguage } from "@/theme/ThemeRegistry";

export default function ProfileView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
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
                            {isEn ? "My Profile" : "Meu Perfil"}
                        </Typography>
                        <Typography color="text.secondary" fontSize="0.9rem">
                            {isEn
                                ? "Manage your preferences and personal information."
                                : "Gerencie suas Preferencias e informações pessoais."}
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
                                            {isEn
                                                ? "Senior Partner - Corporate Law Specialist"
                                                : "Sócia Sênior - Especialista em Direito Corporativo"}
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
                                    {isEn ? "Save Changes" : "Salvar Alterações"}
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
                                        {isEn ? "Personal Information" : "Informações Pessoais"}
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
                                            label={isEn ? "Full Name" : "Nome Completo"}
                                            value="Elena Silva"
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Professional Email" : "E-mail Profissional"}
                                            value="elena.silva@lawmanager.com"
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Mobile Phone" : "Telefone Celular"}
                                            value="+55 (11) 99999-9999"
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Location" : "Localização"}
                                            value="São Paulo, SP"
                                            fullWidth
                                        />
                                    </Box>

                                    <Typography
                                        fontWeight={700}
                                        color="text.primary"
                                        mb={1.2}
                                    >
                                        {isEn ? "Professional Information" : "Informações Profissionais"}
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
                                            label={isEn ? "Bar Number" : "Número da OAB"}
                                            value="OAB/SP 123.456"
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Role/Position" : "Cargo/Função"}
                                            value="Sócia Sênior"
                                            fullWidth
                                        />
                                        <Box sx={{ gridColumn: "1 / -1" }}>
                                            <TextField
                                                label={isEn ? "Practice Areas" : "Áreas de Atuação"}
                                                value="Direito Corporativo, Fusões e Aquisições, Contratos"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Stack spacing={2}>
                                    <AccessibilitySettings />

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
                                                {isEn ? "Security" : "Segurança"}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            color="text.secondary"
                                            fontSize="0.86rem"
                                            mb={2}
                                        >
                                            {isEn
                                                ? "Keep your account secure by updating your password regularly."
                                                : "Mantenha sua conta segura atualizando sua senha regularmente."}
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
                                            {isEn ? "Change Password" : "Alterar Senha"}
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
                                                    {isEn
                                                        ? "Two-Factor Authentication"
                                                        : "Autenticação em 2 Fatores"}
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
                                                    {isEn
                                                        ? "Require password to delete sensitive data"
                                                        : "Solicitar senha ao excluir dados sensíveis"}
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
                                                    {isEn
                                                        ? "Allow login from trusted devices"
                                                        : "Permitir login por dispositivo confiável"}
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
                                    >
                                        {isEn ? "Apply Preferences" : "Aplicar Preferências"}
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
