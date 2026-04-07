"use client";

import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useAppLanguage } from "@/theme/ThemeRegistry";

type Feedback = {
    severity: "success" | "error";
    message: string;
};

const practiceAreaOptions = [
    "Direito Civil",
    "Direito Trabalhista",
    "Direito Tributário",
    "Direito Penal",
    "Direito Empresarial",
    "Direito Administrativo",
    "Direito Previdenciário",
    "Direito de Família",
    "Propriedade Intelectual",
    "Contratos",
];

const defaultLawyerForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    oabNumber: "",
    areas: [] as string[],
};

const defaultStaffForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    position: "",
};

export default function AdminTeamView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const { hasRole } = useAuth();
    const isAdmin = hasRole("admin");

    const [lawyerForm, setLawyerForm] = useState(defaultLawyerForm);
    const [lawyerFeedback, setLawyerFeedback] = useState<Feedback | null>(null);
    const [lawyerLoading, setLawyerLoading] = useState(false);
    const [lawyerAreaInput, setLawyerAreaInput] = useState("");
    const [staffForm, setStaffForm] = useState(defaultStaffForm);
    const [staffFeedback, setStaffFeedback] = useState<Feedback | null>(null);
    const [staffLoading, setStaffLoading] = useState(false);

    const lawyerPasswordMismatch =
        lawyerForm.confirmPassword.length > 0 &&
        lawyerForm.password !== lawyerForm.confirmPassword;
    const staffPasswordMismatch =
        staffForm.confirmPassword.length > 0 &&
        staffForm.password !== staffForm.confirmPassword;

    const sendRegistration = async (payload: Record<string, unknown>) => {
        try {
            const base = process.env.NEXT_PUBLIC_API_URL ?? "";
            const response = await fetch(`${base}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                return {
                    success: true,
                    message:
                        data?.message ||
                        (isEn
                            ? "Registration succeeded."
                            : "Cadastro realizado com sucesso."),
                };
            }

            return {
                success: false,
                message:
                    data?.message ||
                    (isEn
                        ? "Unable to create the user."
                        : "Não foi possível criar o usuário."),
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: isEn
                    ? "Unable to reach the server."
                    : "Não foi possível conectar ao servidor.",
            };
        }
    };

    const addLawyerArea = (value?: string) => {
        const candidate = (value ?? lawyerAreaInput).trim();
        if (!candidate) return;
        if (lawyerForm.areas.includes(candidate)) {
            setLawyerAreaInput("");
            return;
        }
        setLawyerForm((prev) => ({
            ...prev,
            areas: [...prev.areas, candidate],
        }));
        setLawyerAreaInput("");
    };

    const removeLawyerArea = (area: string) => {
        setLawyerForm((prev) => ({
            ...prev,
            areas: prev.areas.filter((item) => item !== area),
        }));
    };

    const handleLawyerSubmit = async () => {
        if (!lawyerForm.name || !lawyerForm.email || !lawyerForm.password) {
            setLawyerFeedback({
                severity: "error",
                message: isEn
                    ? "Name, email and password are required."
                    : "Nome, e-mail e senha são obrigatórios.",
            });
            return;
        }
        if (lawyerPasswordMismatch) {
            setLawyerFeedback({
                severity: "error",
                message: isEn
                    ? "Password fields must match."
                    : "As senhas precisam ser iguais.",
            });
            return;
        }

        setLawyerLoading(true);
        setLawyerFeedback(null);

        const payload = {
            name: lawyerForm.name.trim(),
            email: lawyerForm.email.trim(),
            phone: lawyerForm.phone.trim(),
            password: lawyerForm.password,
            role: "advogado",
            oab_number: lawyerForm.oabNumber.trim() || undefined,
            areas:
                lawyerForm.areas.length > 0
                    ? lawyerForm.areas.join(", ")
                    : undefined,
        };

        const result = await sendRegistration(payload);
        setLawyerFeedback({
            severity: result.success ? "success" : "error",
            message: result.message,
        });
        if (result.success) {
            setLawyerForm(defaultLawyerForm);
        }
        setLawyerLoading(false);
    };

    const handleStaffSubmit = async () => {
        if (!staffForm.name || !staffForm.email || !staffForm.password) {
            setStaffFeedback({
                severity: "error",
                message: isEn
                    ? "Name, email and password are required."
                    : "Nome, e-mail e senha são obrigatórios.",
            });
            return;
        }
        if (staffPasswordMismatch) {
            setStaffFeedback({
                severity: "error",
                message: isEn
                    ? "Password fields must match."
                    : "As senhas precisam ser iguais.",
            });
            return;
        }

        setStaffLoading(true);
        setStaffFeedback(null);

        const payload = {
            name: staffForm.name.trim(),
            email: staffForm.email.trim(),
            phone: staffForm.phone.trim(),
            password: staffForm.password,
            role: "funcionario",
            position: staffForm.position.trim() || undefined,
        };

        const result = await sendRegistration(payload);
        setStaffFeedback({
            severity: result.success ? "success" : "error",
            message: result.message,
        });
        if (result.success) {
            setStaffForm(defaultStaffForm);
        }
        setStaffLoading(false);
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="admin-team" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container
                    maxWidth={false}
                    sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}
                >
                    <Stack spacing={3}>
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                color="text.primary"
                            >
                                {isEn
                                    ? "Team Management"
                                    : "Gestão de Equipe"}
                            </Typography>
                            <Typography color="text.secondary" fontSize="0.9rem">
                                {isEn
                                    ? "Only administrators can invite new lawyers and staff."
                                    : "Somente administradores podem convidar novos advogados e funcionários."}
                            </Typography>
                        </Box>

                        {isAdmin ? (
                            <Stack spacing={3}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: "16px",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                                    }}
                                    elevation={0}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={600}
                                        mb={0.5}
                                    >
                                        {isEn ? "Register Lawyer" : "Cadastrar Advogado"}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        fontSize="0.85rem"
                                        mb={2}
                                    >
                                        {isEn
                                            ? "Send credentials so the lawyer can access the platform."
                                            : "Envie as credenciais para que o advogado acesse o sistema."}
                                    </Typography>

                                    {lawyerFeedback ? (
                                        <Alert severity={lawyerFeedback.severity} sx={{ mb: 2 }}>
                                            {lawyerFeedback.message}
                                        </Alert>
                                    ) : null}

                                    <Stack spacing={2}>
                                        <TextField
                                            label={isEn ? "Full Name" : "Nome completo"}
                                            value={lawyerForm.name}
                                            onChange={(event) =>
                                                setLawyerForm((prev) => ({
                                                    ...prev,
                                                    name: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Email" : "E-mail"}
                                            type="email"
                                            value={lawyerForm.email}
                                            onChange={(event) =>
                                                setLawyerForm((prev) => ({
                                                    ...prev,
                                                    email: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Phone" : "Telefone"}
                                            value={lawyerForm.phone}
                                            onChange={(event) =>
                                                setLawyerForm((prev) => ({
                                                    ...prev,
                                                    phone: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn ? "OAB number" : "Número da OAB"
                                            }
                                            value={lawyerForm.oabNumber}
                                            onChange={(event) =>
                                                setLawyerForm((prev) => ({
                                                    ...prev,
                                                    oabNumber: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn
                                                    ? "Practice areas"
                                                    : "Áreas de atuação"
                                            }
                                            value={lawyerForm.areas}
                                            onChange={(event) =>
                                                setLawyerForm((prev) => ({
                                                    ...prev,
                                                    areas: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                            <TextField
                                                label={isEn ? "Password" : "Senha"}
                                                type="password"
                                                value={lawyerForm.password}
                                                onChange={(event) =>
                                                    setLawyerForm((prev) => ({
                                                        ...prev,
                                                        password: event.target.value,
                                                    }))
                                                }
                                                fullWidth
                                                autoComplete="new-password"
                                            />
                                            <TextField
                                                label={
                                                    isEn
                                                        ? "Confirm password"
                                                        : "Confirmar senha"
                                                }
                                                type="password"
                                                value={lawyerForm.confirmPassword}
                                                onChange={(event) =>
                                                    setLawyerForm((prev) => ({
                                                        ...prev,
                                                        confirmPassword: event.target.value,
                                                    }))
                                                }
                                                fullWidth
                                                error={lawyerPasswordMismatch}
                                                helperText={
                                                    lawyerPasswordMismatch
                                                        ? isEn
                                                            ? "The passwords must match."
                                                            : "As senhas precisam ser iguais."
                                                        : undefined
                                                }
                                            />
                                        </Stack>
                                        <Button
                                            variant="contained"
                                            disabled={lawyerLoading}
                                            onClick={handleLawyerSubmit}
                                            sx={{ textTransform: "none" }}
                                        >
                                            {lawyerLoading
                                                ? isEn
                                                    ? "Sending..."
                                                    : "Enviando..."
                                                : isEn
                                                    ? "Send invite"
                                                    : "Enviar convite"}
                                        </Button>
                                    </Stack>
                                </Paper>

                                <Divider />

                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: "16px",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                                    }}
                                    elevation={0}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={600}
                                        mb={0.5}
                                    >
                                        {isEn
                                            ? "Register Staff"
                                            : "Cadastrar Funcionário"}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        fontSize="0.85rem"
                                        mb={2}
                                    >
                                        {isEn
                                            ? "Create a profile for internal staff members."
                                            : "Crie perfis para funcionários internos."}
                                    </Typography>

                                    {staffFeedback ? (
                                        <Alert severity={staffFeedback.severity} sx={{ mb: 2 }}>
                                            {staffFeedback.message}
                                        </Alert>
                                    ) : null}

                                    <Stack spacing={2}>
                                        <TextField
                                            label={isEn ? "Full Name" : "Nome completo"}
                                            value={staffForm.name}
                                            onChange={(event) =>
                                                setStaffForm((prev) => ({
                                                    ...prev,
                                                    name: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Email" : "E-mail"}
                                            type="email"
                                            value={staffForm.email}
                                            onChange={(event) =>
                                                setStaffForm((prev) => ({
                                                    ...prev,
                                                    email: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={isEn ? "Phone" : "Telefone"}
                                            value={staffForm.phone}
                                            onChange={(event) =>
                                                setStaffForm((prev) => ({
                                                    ...prev,
                                                    phone: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label={
                                                isEn ? "Role/Position" : "Cargo/Função"
                                            }
                                            value={staffForm.position}
                                            onChange={(event) =>
                                                setStaffForm((prev) => ({
                                                    ...prev,
                                                    position: event.target.value,
                                                }))
                                            }
                                            fullWidth
                                        />
                                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                            <TextField
                                                label={isEn ? "Password" : "Senha"}
                                                type="password"
                                                value={staffForm.password}
                                                onChange={(event) =>
                                                    setStaffForm((prev) => ({
                                                        ...prev,
                                                        password: event.target.value,
                                                    }))
                                                }
                                                fullWidth
                                                autoComplete="new-password"
                                            />
                                            <TextField
                                                label={
                                                    isEn
                                                        ? "Confirm password"
                                                        : "Confirmar senha"
                                                }
                                                type="password"
                                                value={staffForm.confirmPassword}
                                                onChange={(event) =>
                                                    setStaffForm((prev) => ({
                                                        ...prev,
                                                        confirmPassword: event.target.value,
                                                    }))
                                                }
                                                fullWidth
                                                error={staffPasswordMismatch}
                                                helperText={
                                                    staffPasswordMismatch
                                                        ? isEn
                                                            ? "The passwords must match."
                                                            : "As senhas precisam ser iguais."
                                                        : undefined
                                                }
                                            />
                                        </Stack>
                                        <Button
                                            variant="contained"
                                            disabled={staffLoading}
                                            onClick={handleStaffSubmit}
                                            sx={{ textTransform: "none" }}
                                        >
                                            {staffLoading
                                                ? isEn
                                                    ? "Sending..."
                                                    : "Enviando..."
                                                : isEn
                                                    ? "Create profile"
                                                    : "Criar perfil"}
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Stack>
                        ) : (
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: "16px",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    mb={1}
                                >
                                    {isEn
                                        ? "Access restricted"
                                        : "Acesso restrito"}
                                </Typography>
                                <Typography color="text.secondary">
                                    {isEn
                                        ? "Only administrators can view this page."
                                        : "Somente administradores podem ver esta página."}
                                </Typography>
                            </Paper>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
