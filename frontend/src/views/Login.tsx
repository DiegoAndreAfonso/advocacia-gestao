"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppLanguage } from "@/theme/ThemeRegistry";
import { loginSchema } from "@/schemas/auth.schema";
import { postLogin } from "@/api/apiAuth";
import { handleRequest } from "@/configs/handleRequest";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getRouteByRole } from "@/utils/redirectByRole";

const labels = {
  "pt-BR": {
    brand: "LawManager",
    title: "Entrar no sistema",
    subtitle: "Acesse sua conta para continuar.",
    email: "E-mail",
    identifier: "CPF ou E-mail",
    password: "Senha",
    role: "Perfil de acesso",
    lawyer: "Advogado",
    client: "Cliente",
    remember: "Lembrar de mim",
    forgot: "Esqueceu a senha?",
    login: "Entrar",
    back: "← Voltar para o site",
    heroTitle: "Gestão Jurídica com foco em produtividade",
    heroText:
      "Controle clientes, processos, compromissos e financeiro em um único lugar, com interface moderna e segura.",
    rights: "© 2026 LawManager. Todos os direitos reservados.",
  },
  "en-US": {
    brand: "LawManager",
    title: "Sign in",
    subtitle: "Access your account to continue.",
    email: "E-mail",
    identifier: "CPF or E-mail",
    password: "Password",
    role: "Access profile",
    lawyer: "Lawyer",
    client: "Client",
    remember: "Remember me",
    forgot: "Forgot password?",
    login: "Sign in",
    back: "← Back to website",
    heroTitle: "Legal management focused on productivity",
    heroText:
      "Manage clients, cases, appointments, and finance in one place with a modern and secure interface.",
    rights: "© 2026 LawManager. All rights reserved.",
  },
} as const;

export default function LoginView() {
  const [role, setRole] = useState<"advogado" | "cliente">("advogado");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAuthenticated, redirectByRole } = useAuth();
  const { language } = useAppLanguage();
  const t = labels[language];

  const { setAuth } = useAuth();

const handleLogin = async () => {
  setError(null);

  const parsed = loginSchema.safeParse({ identifier, password });

  if (!parsed.success) {
    setError(parsed.error.issues[0].message);
    return;
  }

  const { data, error } = await handleRequest(() =>
    postLogin(parsed.data)
  );

  if (error || !data) {
    setError(error || "Erro ao realizar login");
    return;
  }

  // 🔥 ATUALIZA ESTADO GLOBAL
  setAuth(data.user, data.token);

  const roles: string[] = Array.isArray(data.user?.roles)
    ? data.user.roles
    : Object.values(data.user?.roles ?? {});

  const route = getRouteByRole(roles);

  router.replace(route || "/dashboard");
};

  useEffect(() => {
    if (isAuthenticated) {
      redirectByRole();
    }
  }, [isAuthenticated, redirectByRole]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1.05fr" },
        bgcolor: "background.default",
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
        <Typography fontSize="1.08rem" fontWeight={700}>
          {t.brand}
        </Typography>

        <Box>
          <Typography fontSize="2rem" fontWeight={700} mb={1.2}>
            {t.heroTitle}
          </Typography>
          <Typography sx={{ maxWidth: 420, opacity: 0.9 }}>
            {t.heroText}
          </Typography>
        </Box>

        <Typography sx={{ opacity: 0.75 }} fontSize="0.86rem">
          {t.rights}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 430,
            p: 3,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography
                fontSize="1.35rem"
                fontWeight={700}
                color="text.primary"
              >
                {t.title}
              </Typography>
              <Typography color="text.secondary" fontSize="0.88rem">
                {t.subtitle}
              </Typography>
            </Box>

            <TextField
              label={t.identifier}
              fullWidth
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <TextField
              label={t.password}
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="0.82rem" color="text.secondary">
                {t.remember}
              </Typography>
              <Typography
                fontSize="0.82rem"
                color="#2563eb"
                sx={{ cursor: "pointer" }}
              >
                {t.forgot}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{
                py: 1.1,
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              {t.login}
            </Button>

            {error ? (
              <Typography color="error" fontSize="0.85rem">
                {error}
              </Typography>
            ) : null}

            <Divider />

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                textAlign="center"
                fontSize="0.86rem"
                sx={{
                  textDecoration: "none",
                  color: "text.secondary",
                }}
              >
                {t.back}
              </Typography>
            </a>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
