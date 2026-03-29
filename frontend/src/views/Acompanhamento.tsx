"use client";

import {
    Box,
    Button,
    Chip,
    Container,
    MenuItem,
    Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { useMemo, useState } from "react";
import { useNotifications } from "@/context/NotificationsContext";

type Props = {
    clientName: string;
    caseTitle: string;
    processNumber: string;
    status: "Em Andamento" | "Pendente" | "Concluído";
    nextHearing: string;
    lawyerName: string;
    role?: "advogado" | "cliente";
};

const phases = [
    "Cadastro do Caso",
    "Análise Inicial",
    "Documentação",
    "Andamento Processual",
    "Conclusão",
];

type Visibility = "both" | "internal";

const initialUpdates = [
    {
        id: "u1",
        date: "27/03/2026",
        title: "Petição inicial protocolada",
        description: "Protocolo confirmado no sistema do tribunal.",
        visibility: "both" as Visibility,
    },
    {
        id: "u2",
        date: "25/03/2026",
        title: "Documentos complementares recebidos",
        description: "Cliente enviou comprovantes e anexos solicitados.",
        visibility: "both" as Visibility,
    },
    {
        id: "u3",
        date: "22/03/2026",
        title: "Reunião de alinhamento realizada",
        description: "Definição dos próximos passos e estratégia jurídica.",
        visibility: "internal" as Visibility,
    },
];

const initialSteps = [
    {
        id: "s1",
        label: "Preparar manifestação até 02/04",
        visibility: "both" as Visibility,
    },
    {
        id: "s2",
        label: "Enviar atualização ao cliente",
        visibility: "internal" as Visibility,
    },
    {
        id: "s3",
        label: "Revisar documentos anexados",
        visibility: "both" as Visibility,
    },
];

export default function AcompanhamentoView({
    clientName,
    caseTitle,
    processNumber,
    status,
    nextHearing,
    lawyerName,
    role = "advogado",
}: Props) {
    const isClientView = role === "cliente";
    const { addNotification } = useNotifications();
    const [updates, setUpdates] = useState(initialUpdates);
    const [steps, setSteps] = useState(initialSteps);

    const [newUpdateTitle, setNewUpdateTitle] = useState("");
    const [newUpdateDescription, setNewUpdateDescription] = useState("");
    const [newUpdateVisibility, setNewUpdateVisibility] =
        useState<Visibility>("both");

    const [newStepLabel, setNewStepLabel] = useState("");
    const [newStepVisibility, setNewStepVisibility] =
        useState<Visibility>("both");

    const visibleUpdates = useMemo(
        () =>
            isClientView
                ? updates.filter((u) => u.visibility === "both")
                : updates,
        [isClientView, updates],
    );

    const visibleSteps = useMemo(
        () =>
            isClientView ? steps.filter((s) => s.visibility === "both") : steps,
        [isClientView, steps],
    );

    const addUpdate = () => {
        if (!newUpdateTitle.trim() || !newUpdateDescription.trim()) return;
        const now = new Date();
        const date = now.toLocaleDateString("pt-BR");
        setUpdates((prev) => [
            {
                id: `u${prev.length + 1}`,
                date,
                title: newUpdateTitle.trim(),
                description: newUpdateDescription.trim(),
                visibility: newUpdateVisibility,
            },
            ...prev,
        ]);
        setNewUpdateTitle("");
        setNewUpdateDescription("");
        setNewUpdateVisibility("both");
        addNotification({
            title: "Nova atualização registrada",
            description: `${caseTitle}: ${newUpdateTitle.trim()}`,
        });
    };

    const addStep = () => {
        if (!newStepLabel.trim()) return;
        setSteps((prev) => [
            {
                id: `s${prev.length + 1}`,
                label: newStepLabel.trim(),
                visibility: newStepVisibility,
            },
            ...prev,
        ]);
        setNewStepLabel("");
        setNewStepVisibility("both");
        addNotification({
            title: "Novo próximo passo criado",
            description: `${caseTitle}: ${newStepLabel.trim()}`,
        });
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
            {!isClientView && <SidebarDashboard activeKey="clientes" />}

            <Box
                sx={{
                    ml: { xs: 0, md: isClientView ? 0 : "280px" },
                    minWidth: 0,
                }}
            >
                <HeaderDashboard />

                <Container
                    maxWidth={false}
                    sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2.2}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                color="text.primary"
                            >
                                {isClientView
                                    ? "Acompanhamento do Meu Caso"
                                    : "Acompanhamento do Cliente"}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                fontSize="0.92rem"
                            >
                                {isClientView
                                    ? `Acompanhe aqui todas as atualizações do seu caso: ${caseTitle}.`
                                    : `Visão completa do caso "${caseTitle}" para ${clientName}.`}
                            </Typography>
                        </Box>

                        <Chip
                            label={status}
                            sx={{
                                bgcolor:
                                    status === "Concluído"
                                        ? "#dcfce7"
                                        : status === "Pendente"
                                          ? "#ffedd5"
                                          : "#d1fae5",
                                color:
                                    status === "Concluído"
                                        ? "#166534"
                                        : status === "Pendente"
                                          ? "#c2410c"
                                          : "#047857",
                                fontWeight: 600,
                            }}
                        />
                    </Stack>

                    <Paper sx={cardStyle}>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", md: "center" }}
                            mb={2}
                        >
                            <Box>
                                <Typography
                                    color="text.secondary"
                                    fontSize="0.84rem"
                                >
                                    Processo
                                </Typography>
                                <Typography
                                    color="text.primary"
                                    fontSize="1.02rem"
                                    fontWeight={700}
                                >
                                    {processNumber}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    color="text.secondary"
                                    fontSize="0.84rem"
                                >
                                    Advogado Responsável
                                </Typography>
                                <Typography
                                    color="text.primary"
                                    fontSize="1.02rem"
                                    fontWeight={700}
                                >
                                    {lawyerName}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    color="text.secondary"
                                    fontSize="0.84rem"
                                >
                                    Próxima Audiência
                                </Typography>
                                <Typography
                                    color="text.primary"
                                    fontSize="1.02rem"
                                    fontWeight={700}
                                >
                                    {nextHearing}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stepper activeStep={3} alternativeLabel>
                            {phases.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>

                    <Box
                        sx={{
                            mt: 2,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                xl: "1.3fr 0.9fr",
                            },
                            gap: 2,
                        }}
                    >
                        <Paper sx={cardStyle}>
                            <Typography
                                fontWeight={700}
                                color="text.primary"
                                mb={1.4}
                            >
                                Últimas Atualizações
                            </Typography>

                            <Stack spacing={1.2}>
                                {visibleUpdates.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            p: 1.5,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                            fontSize="0.8rem"
                                            mb={0.3}
                                        >
                                            {item.date}
                                        </Typography>
                                        <Typography
                                            fontWeight={700}
                                            color="text.primary"
                                            fontSize="0.95rem"
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            fontSize="0.86rem"
                                        >
                                            {item.description}
                                        </Typography>
                                        {!isClientView && (
                                            <Chip
                                                size="small"
                                                label={
                                                    item.visibility === "both"
                                                        ? "Visível para Cliente"
                                                        : "Somente Interno"
                                                }
                                                sx={{
                                                    mt: 1,
                                                    bgcolor:
                                                        item.visibility ===
                                                        "both"
                                                            ? "#dbeafe"
                                                            : "#e2e8f0",
                                                    color: "#334155",
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        <Stack spacing={2}>
                            <Paper sx={cardStyle}>
                                <Typography
                                    fontWeight={700}
                                    color="text.primary"
                                    mb={1.2}
                                >
                                    {isClientView
                                        ? "Próximos Passos"
                                        : "Próximas Ações"}
                                </Typography>
                                <Stack spacing={1}>
                                    {visibleSteps.map((stepItem) => (
                                        <Chip
                                            key={stepItem.id}
                                            label={stepItem.label}
                                        />
                                    ))}
                                </Stack>
                            </Paper>

                            <Paper sx={cardStyle}>
                                <Typography
                                    fontWeight={700}
                                    color="text.primary"
                                    mb={1.2}
                                >
                                    Compartilhamento
                                </Typography>
                                <Stack spacing={1}>
                                    <Button
                                        variant="outlined"
                                        startIcon={
                                            <Icon icon="mdi:download-outline" />
                                        }
                                        sx={actionBtn}
                                    >
                                        Baixar Relatório
                                    </Button>
                                    {isClientView ? (
                                        <Button
                                            variant="outlined"
                                            startIcon={
                                                <Icon icon="mdi:message-outline" />
                                            }
                                            sx={actionBtn}
                                        >
                                            Falar com meu advogado
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            startIcon={
                                                <Icon icon="mdi:email-outline" />
                                            }
                                            sx={actionBtn}
                                        >
                                            Enviar por E-mail
                                        </Button>
                                    )}
                                </Stack>
                            </Paper>
                        </Stack>
                    </Box>

                    {!isClientView && (
                        <Box
                            sx={{
                                mt: 2,
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    lg: "1fr 1fr",
                                },
                                gap: 2,
                            }}
                        >
                            <Paper sx={cardStyle}>
                                <Typography
                                    fontWeight={700}
                                    color="text.primary"
                                    mb={1.2}
                                >
                                    Nova Atualização do Caso
                                </Typography>
                                <Stack spacing={1.2}>
                                    <TextField
                                        label="Título"
                                        value={newUpdateTitle}
                                        onChange={(e) =>
                                            setNewUpdateTitle(e.target.value)
                                        }
                                        fullWidth
                                    />
                                    <TextField
                                        label="Descrição"
                                        value={newUpdateDescription}
                                        onChange={(e) =>
                                            setNewUpdateDescription(
                                                e.target.value,
                                            )
                                        }
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                    <TextField
                                        select
                                        label="Visibilidade"
                                        value={newUpdateVisibility}
                                        onChange={(e) =>
                                            setNewUpdateVisibility(
                                                e.target.value as Visibility,
                                            )
                                        }
                                        fullWidth
                                    >
                                        <MenuItem value="both">
                                            Advogado e Cliente
                                        </MenuItem>
                                        <MenuItem value="internal">
                                            Somente Interno
                                        </MenuItem>
                                    </TextField>
                                    <Button
                                        variant="contained"
                                        onClick={addUpdate}
                                        sx={{
                                            textTransform: "none",
                                            alignSelf: "flex-end",
                                        }}
                                    >
                                        Publicar Atualização
                                    </Button>
                                </Stack>
                            </Paper>

                            <Paper sx={cardStyle}>
                                <Typography
                                    fontWeight={700}
                                    color="text.primary"
                                    mb={1.2}
                                >
                                    Novo Próximo Passo
                                </Typography>
                                <Stack spacing={1.2}>
                                    <TextField
                                        label="Descrição do passo"
                                        value={newStepLabel}
                                        onChange={(e) =>
                                            setNewStepLabel(e.target.value)
                                        }
                                        fullWidth
                                    />
                                    <TextField
                                        select
                                        label="Visibilidade"
                                        value={newStepVisibility}
                                        onChange={(e) =>
                                            setNewStepVisibility(
                                                e.target.value as Visibility,
                                            )
                                        }
                                        fullWidth
                                    >
                                        <MenuItem value="both">
                                            Advogado e Cliente
                                        </MenuItem>
                                        <MenuItem value="internal">
                                            Somente Interno
                                        </MenuItem>
                                    </TextField>
                                    <Button
                                        variant="contained"
                                        onClick={addStep}
                                        sx={{
                                            textTransform: "none",
                                            alignSelf: "flex-end",
                                        }}
                                    >
                                        Adicionar Passo
                                    </Button>
                                </Stack>
                            </Paper>
                        </Box>
                    )}
                </Container>
            </Box>
        </Box>
    );
}

const cardStyle = {
    borderRadius: "14px",
    p: 2,
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
    bgcolor: "background.paper",
};

const actionBtn = {
    justifyContent: "flex-start",
    textTransform: "none",
    borderRadius: "10px",
    borderColor: "divider",
    color: "text.secondary",
};
