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
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { AccessibilitySettings } from "@/components/AccessibilitySettings";
import { PrivacyTermsModal } from "@/components/PrivacyTermsModal";
import { useAppLanguage } from "@/theme/ThemeRegistry";

type LegalCase = {
    id: number;
    title: string;
    description?: string;
    status?: string;
    created_at?: string;
};

type ProfileUpdate = {
    name: string;
    email: string;
    phone: string;
    location: string;
    oab_number?: string;
    areas?: string;
    position?: string;
};

export default function ProfileView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const router = useRouter();

    // estados iniciados vazios para evitar conflito entre render server/client
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [oabNumber, setOabNumber] = useState("");
    const [areas, setAreas] = useState("");
    const [position, setPosition] = useState("");
    const [cases, setCases] = useState<LegalCase[]>([]);
    const [newCaseTitle, setNewCaseTitle] = useState("");
    const [newCaseDescription, setNewCaseDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);

    const handleOpenPrivacy = () => setPrivacyOpen(true);
    const handleClosePrivacy = () => setPrivacyOpen(false);

    // carregar usuário do localStorage (apenas no cliente)
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem("user");
            const parsed = raw ? JSON.parse(raw) : null;
            if (parsed) {
                setName(parsed.name || "");
                setEmail(parsed.email || "");
                setPhone(parsed.phone || "");
                setLocation(parsed.location || "");
                setRole(parsed.role || "");
                setOabNumber(parsed.oab_number || "");
                setAreas(parsed.areas || "");
                setPosition(parsed.position || "");
            } else {
                // se houver token, tentar carregar /api/me e guardar em localStorage
                const token = localStorage.getItem("api_token");
                if (token) {
                    (async () => {
                        try {
                            const base = process.env.NEXT_PUBLIC_API_URL ?? "";
                            const res = await fetch(`${base}/api/me`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            if (res.ok) {
                                const data = await res.json();
                                const user = data.user;
                                if (user) {
                                    setName(user.name || "");
                                    setEmail(user.email || "");
                                    setPhone(user.phone || "");
                                    setLocation(user.location || "");
                                    setRole(user.role || "");
                                    setOabNumber(user.oab_number || "");
                                    setAreas(user.areas || "");
                                    setPosition(user.position || "");
                                    localStorage.setItem(
                                        "user",
                                        JSON.stringify(user),
                                    );
                                }
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    })();
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    // buscar casos sempre que o papel do usuário permitir
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (role !== "cliente" && role !== "advogado") return;
        const base = process.env.NEXT_PUBLIC_API_URL ?? "";
        const token = localStorage.getItem("api_token");
        (async () => {
            try {
                const res = await fetch(`${base}/api/profile/cases`, {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setCases((data.cases || []) as LegalCase[]);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [role]);
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
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
                                            {name}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {role}
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
                                    {isEn
                                        ? "Save Changes"
                                        : "Salvar Alterações"}
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
                                        {isEn
                                            ? "Personal Information"
                                            : "Informações Pessoais"}
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
                                            label={
                                                isEn
                                                    ? "Full Name"
                                                    : "Nome Completo"
                                            }
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn
                                                    ? "Professional Email"
                                                    : "E-mail Profissional"
                                            }
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn
                                                    ? "Mobile Phone"
                                                    : "Telefone Celular"
                                            }
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn
                                                    ? "Location"
                                                    : "Localização"
                                            }
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(e.target.value)
                                            }
                                            fullWidth
                                        />
                                    </Box>

                                    <Typography
                                        fontWeight={700}
                                        color="text.primary"
                                        mb={1.2}
                                    >
                                        {isEn
                                            ? "Professional Information"
                                            : "Informações Profissionais"}
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
                                            label={
                                                isEn
                                                    ? "Bar Number"
                                                    : "Número da OAB"
                                            }
                                            value={oabNumber}
                                            onChange={(e) =>
                                                setOabNumber(e.target.value)
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn
                                                    ? "Role/Position"
                                                    : "Cargo/Função"
                                            }
                                            value={position}
                                            onChange={(e) =>
                                                setPosition(e.target.value)
                                            }
                                            fullWidth
                                        />
                                        <Box sx={{ gridColumn: "1 / -1" }}>
                                            <TextField
                                                label={
                                                    isEn
                                                        ? "Practice Areas"
                                                        : "Áreas de Atuação"
                                                }
                                                value={areas}
                                                onChange={(e) =>
                                                    setAreas(e.target.value)
                                                }
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
                                                {isEn
                                                    ? "Security"
                                                    : "Segurança"}
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
                                            onClick={() =>
                                                router.push(
                                                    "/profile/change-password",
                                                )
                                            }
                                        >
                                            {isEn
                                                ? "Change Password"
                                                : "Alterar Senha"}
                                        </Button>
                                        <Button
                                            variant="text"
                                            fullWidth
                                            sx={{
                                                justifyContent: "flex-start",
                                                textTransform: "none",
                                                color: "text.secondary",
                                                mb: 1.5,
                                            }}
                                            startIcon={
                                                <Icon
                                                    icon="mdi:file-document-outline"
                                                    width={20}
                                                />
                                            }
                                            onClick={handleOpenPrivacy}
                                        >
                                            {isEn
                                                ? "View privacy terms"
                                                : "Ver termo de privacidade"}
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
                                        disabled={saving}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: "10px",
                                        }}
                                        onClick={async () => {
                                            setSaving(true);
                                            try {
                                                const base =
                                                    process.env
                                                        .NEXT_PUBLIC_API_URL ??
                                                    "";
                                                const token =
                                                    typeof window !==
                                                    "undefined"
                                                        ? localStorage.getItem(
                                                              "api_token",
                                                          )
                                                        : null;
                                                const body: ProfileUpdate = {
                                                    name,
                                                    email,
                                                    phone,
                                                    location,
                                                };
                                                if (role === "advogado") {
                                                    body.oab_number = oabNumber;
                                                    body.areas = areas;
                                                    body.position = position;
                                                } else if (
                                                    role === "funcionario"
                                                ) {
                                                    body.position = position;
                                                }

                                                const res = await fetch(
                                                    `${base}/api/profile`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                            ...(token
                                                                ? {
                                                                      Authorization: `Bearer ${token}`,
                                                                  }
                                                                : {}),
                                                        },
                                                        body: JSON.stringify(
                                                            body,
                                                        ),
                                                    },
                                                );

                                                const data = await res.json();
                                                if (res.ok && data.user) {
                                                    localStorage.setItem(
                                                        "user",
                                                        JSON.stringify(
                                                            data.user,
                                                        ),
                                                    );
                                                }
                                            } catch (e) {
                                                console.error(e);
                                            } finally {
                                                setSaving(false);
                                            }
                                        }}
                                    >
                                        {saving
                                            ? isEn
                                                ? "Saving..."
                                                : "Salvando..."
                                            : isEn
                                              ? "Apply Preferences"
                                              : "Aplicar Preferências"}
                                    </Button>
                                </Stack>

                                <Box sx={{ mt: 3, gridColumn: "1 / -1" }}>
                                    <Typography
                                        fontWeight={700}
                                        color="text.primary"
                                        mb={1.2}
                                    >
                                        {isEn ? "Cases" : "Casos"}
                                    </Typography>

                                    {role === "cliente" ||
                                    role === "advogado" ? (
                                        <Paper
                                            variant="outlined"
                                            sx={{ p: 2, mb: 2 }}
                                        >
                                            <List>
                                                {cases.length === 0 ? (
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={
                                                                isEn
                                                                    ? "No cases yet"
                                                                    : "Nenhum caso encontrado"
                                                            }
                                                        />
                                                    </ListItem>
                                                ) : (
                                                    cases.map((c) => (
                                                        <div key={c.id}>
                                                            <ListItem>
                                                                <ListItemText
                                                                    primary={
                                                                        c.title
                                                                    }
                                                                    secondary={
                                                                        c.status
                                                                    }
                                                                />
                                                            </ListItem>
                                                            <Divider />
                                                        </div>
                                                    ))
                                                )}
                                            </List>

                                            <Box sx={{ mt: 2 }}>
                                                <Typography
                                                    fontWeight={700}
                                                    mb={1}
                                                >
                                                    {isEn
                                                        ? "Create case"
                                                        : "Criar Caso"}
                                                </Typography>
                                                <TextField
                                                    label={
                                                        isEn
                                                            ? "Title"
                                                            : "Título"
                                                    }
                                                    fullWidth
                                                    value={newCaseTitle}
                                                    onChange={(e) =>
                                                        setNewCaseTitle(
                                                            e.target.value,
                                                        )
                                                    }
                                                    sx={{ mb: 1 }}
                                                />
                                                <TextField
                                                    label={
                                                        isEn
                                                            ? "Description"
                                                            : "Descrição"
                                                    }
                                                    fullWidth
                                                    multiline
                                                    minRows={3}
                                                    value={newCaseDescription}
                                                    onChange={(e) =>
                                                        setNewCaseDescription(
                                                            e.target.value,
                                                        )
                                                    }
                                                    sx={{ mb: 1 }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={async () => {
                                                        try {
                                                            const base =
                                                                process.env
                                                                    .NEXT_PUBLIC_API_URL ??
                                                                "";
                                                            const token =
                                                                typeof window !==
                                                                "undefined"
                                                                    ? localStorage.getItem(
                                                                          "api_token",
                                                                      )
                                                                    : null;
                                                            const res =
                                                                await fetch(
                                                                    `${base}/api/profile/cases`,
                                                                    {
                                                                        method: "POST",
                                                                        headers:
                                                                            {
                                                                                "Content-Type":
                                                                                    "application/json",
                                                                                ...(token
                                                                                    ? {
                                                                                          Authorization: `Bearer ${token}`,
                                                                                      }
                                                                                    : {}),
                                                                            },
                                                                        body: JSON.stringify(
                                                                            {
                                                                                title: newCaseTitle,
                                                                                description:
                                                                                    newCaseDescription,
                                                                            },
                                                                        ),
                                                                    },
                                                                );
                                                            const data =
                                                                await res.json();
                                                            if (res.ok) {
                                                                const created =
                                                                    data.case as LegalCase;
                                                                setCases(
                                                                    (s) => [
                                                                        created,
                                                                        ...s,
                                                                    ],
                                                                );
                                                                setNewCaseTitle(
                                                                    "",
                                                                );
                                                                setNewCaseDescription(
                                                                    "",
                                                                );
                                                            } else {
                                                                console.error(
                                                                    data,
                                                                );
                                                            }
                                                        } catch (e) {
                                                            console.error(e);
                                                        }
                                                    }}
                                                >
                                                    {isEn ? "Create" : "Criar"}
                                                </Button>
                                            </Box>
                                        </Paper>
                                    ) : null}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
            <PrivacyTermsModal
                open={privacyOpen}
                onClose={handleClosePrivacy}
            />
        </Box>
    );
}
