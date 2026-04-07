"use client";

import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import auth from "@/configs/auth";
import { useAppLanguage } from "@/theme/ThemeRegistry";

type Feedback = {
    severity: "success" | "error" | "info";
    message: string;
};

export default function ChangePasswordView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [saving, setSaving] = useState(false);

    const passwordsMismatch =
        confirmPassword.length > 0 && confirmPassword !== newPassword;

    const extractErrorMessage = (errors: unknown): string | undefined => {
        if (!errors || typeof errors !== "object") return undefined;
        const values = Object.values(errors as Record<string, unknown>);
        for (const value of values) {
            if (typeof value === "string") return value;
            if (Array.isArray(value)) {
                const nested = value.find((item) => typeof item === "string");
                if (nested) return nested as string;
            }
        }
        return undefined;
    };

    const handleSubmit = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setFeedback({
                severity: "error",
                message: isEn
                    ? "Please fill in all password fields."
                    : "Preencha todos os campos de senha.",
            });
            return;
        }

        if (passwordsMismatch) {
            setFeedback({
                severity: "error",
                message: isEn
                    ? "The new password and confirmation must match."
                    : "A nova senha e a confirmação precisam ser iguais.",
            });
            return;
        }

        setSaving(true);
        setFeedback(null);

        try {
            const base = process.env.NEXT_PUBLIC_API_URL ?? "";
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem(auth.storageTokenKeyName)
                    : null;
            const response = await fetch(`${base}/api/profile/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setFeedback({
                    severity: "success",
                    message:
                        data?.message ??
                        (isEn
                            ? "Password updated successfully."
                            : "Senha atualizada com sucesso."),
                });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                const fallbackMessage = isEn
                    ? "Unable to update the password."
                    : "Não foi possível atualizar a senha.";
                const serverMessage =
                    data?.message || extractErrorMessage(data?.errors) || fallbackMessage;
                setFeedback({
                    severity: "error",
                    message: serverMessage,
                });
            }
        } catch (error) {
            console.error(error);
            setFeedback({
                severity: "error",
                message: isEn
                    ? "Unable to reach the server. Try again later."
                    : "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
            });
        } finally {
            setSaving(false);
        }
    };

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
                    <Paper
                        sx={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                        }}
                    >
                        <Box sx={{ px: 2.5, py: 3 }}>
                            <Stack spacing={1} mb={3}>
                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    color="text.primary"
                                >
                                    {isEn ? "Change Password" : "Alterar Senha"}
                                </Typography>
                                <Typography color="text.secondary">
                                    {isEn
                                        ? "Keep your account secure by choosing a strong password."
                                        : "Mantenha sua conta segura escolhendo uma senha forte."}
                                </Typography>
                            </Stack>

                            <Stack spacing={2}>
                                {feedback ? (
                                    <Alert severity={feedback.severity}>
                                        {feedback.message}
                                    </Alert>
                                ) : null}

                                <TextField
                                    label={isEn ? "Current password" : "Senha atual"}
                                    type="password"
                                    value={currentPassword}
                                    onChange={(event) =>
                                        setCurrentPassword(event.target.value)
                                    }
                                    fullWidth
                                    autoComplete="current-password"
                                />
                                <TextField
                                    label={isEn ? "New password" : "Nova senha"}
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) =>
                                        setNewPassword(event.target.value)
                                    }
                                    fullWidth
                                    autoComplete="new-password"
                                />
                                <TextField
                                    label={
                                        isEn
                                            ? "Confirm new password"
                                            : "Confirmar nova senha"
                                    }
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    fullWidth
                                    autoComplete="new-password"
                                    error={passwordsMismatch}
                                    helperText={
                                        passwordsMismatch
                                            ? isEn
                                                ? "The passwords must match."
                                                : "As senhas precisam ser iguais."
                                            : ""
                                    }
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={saving}
                                    onClick={handleSubmit}
                                    sx={{ textTransform: "none" }}
                                >
                                    {saving
                                        ? isEn
                                            ? "Updating..."
                                            : "Atualizando..."
                                        : isEn
                                            ? "Save new password"
                                            : "Salvar nova senha"}
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}
