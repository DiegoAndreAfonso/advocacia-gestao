"use client";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { Modal } from "@/componentes/Modal";
import { useMemo, useState } from "react";

type EventStatus = "Confirmado" | "Pendente";

type AgendaEvent = {
    time: string;
    duration: string;
    title: string;
    client: string;
    place: string;
    reminder: string;
    status: EventStatus;
};

type InternalTask = {
    title: string;
    owner: string;
    due: string;
    priority?: "Alta Prioridade";
    done?: boolean;
};

const eventsToday: AgendaEvent[] = [
    {
        time: "09:00",
        duration: "1h",
        title: "Consultoria Inicial",
        client: "Acme Corporation",
        place: "Videoconferência",
        reminder: "15m antes",
        status: "Confirmado",
    },
    {
        time: "11:30",
        duration: "30m",
        title: "Revisão de Contrato",
        client: "Maria Oliveira",
        place: "Sala de Reunião A",
        reminder: "15m antes",
        status: "Confirmado",
    },
    {
        time: "14:00",
        duration: "2h",
        title: "Preparação para Audiência",
        client: "João Santos",
        place: "Sala de Reunião B",
        reminder: "15m antes",
        status: "Pendente",
    },
];

const eventsTomorrow: AgendaEvent[] = [
    {
        time: "10:00",
        duration: "1h",
        title: "Discussão M&A",
        client: "TechStart Inc.",
        place: "Videoconferência",
        reminder: "15m antes",
        status: "Confirmado",
    },
];

const internalTasks: InternalTask[] = [
    {
        title: "Redigir NDA para TechStart Inc.",
        owner: "Elena Silva",
        due: "Hoje",
        priority: "Alta Prioridade",
    },
    {
        title: "Revisar autos do processo Silva vs. Souza",
        owner: "Elena Silva",
        due: "Amanhã",
    },
    {
        title: "Prep. para reunião com cliente: Acme Corp",
        owner: "Carlos Santos",
        due: "26 Out",
        priority: "Alta Prioridade",
        done: true,
    },
    {
        title: "Atualizar política de compliance interna",
        owner: "Ana Costa",
        due: "28 Out",
    },
    {
        title: "Preparar relatório mensal de faturamento",
        owner: "Elena Silva",
        due: "31 Out",
    },
];

function statusChip(status: EventStatus) {
    if (status === "Confirmado") {
        return { color: "#047857", bg: "#b8ead2" };
    }
    return { color: "#c2410c", bg: "#ffe3bf" };
}

function AgendaGroup({ title, events }: { title: string; events: AgendaEvent[] }) {
    return (
        <Paper
            sx={{
                borderRadius: "16px",
                border: "1px solid #dbe3ef",
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
            }}
        >
            <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #dbe3ef", display: "flex", gap: 1, alignItems: "center" }}>
                <Icon icon="mdi:calendar-blank-outline" color="#6f819b" width={22} />
                <Typography fontWeight={700} fontSize="1.15rem" color="#1f2937">
                    {title}
                </Typography>
            </Box>

            {events.map((event) => {
                const chip = statusChip(event.status);

                return (
                    <Stack
                        key={`${title}-${event.time}-${event.title}`}
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                            px: 2.5,
                            py: 2,
                            borderBottom: "1px solid #dbe3ef",
                        }}
                    >
                        <Box sx={{ width: 115 }}>
                            <Typography fontWeight={700} color="#1f2937" fontSize="1rem">
                                {event.time}
                            </Typography>
                            <Stack direction="row" alignItems="center" gap={0.5} color="#7588a3">
                                <Icon icon="mdi:clock-outline" width={16} />
                                <Typography fontSize="0.8rem">{event.duration}</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={700} color="#1f2937" fontSize="1rem">
                                {event.title}
                            </Typography>
                            <Typography color="#2563eb" fontSize="0.86rem" mb={1}>
                                {event.client}
                            </Typography>
                            <Stack direction="row" gap={2} color="#6f819b">
                                <Stack direction="row" alignItems="center" gap={0.6}>
                                    <Icon
                                        icon={
                                            event.place === "Videoconferência"
                                                ? "mdi:video-outline"
                                                : "mdi:map-marker-outline"
                                        }
                                        width={17}
                                    />
                                    <Typography fontSize="0.83rem">{event.place}</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={0.6}>
                                    <Icon icon="mdi:bell-outline" width={17} />
                                    <Typography fontSize="0.83rem">{event.reminder}</Typography>
                                </Stack>
                            </Stack>
                        </Box>

                        <Stack direction="row" alignItems="center" gap={2.2}>
                            <Chip
                                label={event.status}
                                sx={{
                                    bgcolor: chip.bg,
                                    color: chip.color,
                                    fontWeight: 500,
                                    minWidth: 92,
                                    fontSize: "0.78rem",
                                }}
                            />
                            <Typography color="#8a9bb3" sx={{ cursor: "pointer", fontSize: "0.88rem" }}>
                                Editar
                            </Typography>
                        </Stack>
                    </Stack>
                );
            })}
        </Paper>
    );
}

export default function AgendaView() {
    const [open, setOpen] = useState(false);
    const [openTask, setOpenTask] = useState(false);

    const days = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], []);

    return (
        <Box
            sx={{
                bgcolor: "#f1f5f9",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="agenda" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.2}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="#18263c">
                                Agenda
                            </Typography>
                            <Typography color="#60738f" fontSize="0.85rem">
                                Gerencie seus compromissos e audiências.
                            </Typography>
                        </Box>

                        <Stack direction="row" gap={1.2}>
                            
                            <Button
                                variant="contained"
                                startIcon={<Icon icon="mdi:plus" />}
                                sx={{ textTransform: "none", borderRadius: "12px", px: 2.2 }}
                                onClick={() => setOpen(true)}
                            >
                                Novo Compromisso
                            </Button>
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", lg: "1.45fr 0.7fr" },
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Stack spacing={2}>
                                <AgendaGroup title="Sábado, 28 De Março, 2026" events={eventsToday} />
                                <AgendaGroup title="Amanhã, 29 De Março" events={eventsTomorrow} />

                                <Paper sx={sideCardStyle}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <Box>
                                            <Typography fontWeight={700} fontSize="1.15rem" color="#1f2937">
                                                Tarefas Internas
                                            </Typography>
                                            <Typography color="#64748b" fontSize="0.82rem">
                                                Acompanhe os itens de ação e entregas da sua equipe.
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            startIcon={<Icon icon="mdi:plus" />}
                                            sx={{ textTransform: "none", borderRadius: "10px", fontSize: "0.82rem" }}
                                            onClick={() => setOpenTask(true)}
                                        >
                                            Adicionar Tarefa
                                        </Button>
                                    </Stack>

                                    <Stack direction="row" spacing={2} sx={{ py: 1, borderBottom: "1px solid #dbe3ef" }}>
                                        <Typography color="#2563eb" fontSize="0.86rem" fontWeight={600}>
                                            Minhas Tarefas
                                        </Typography>
                                        <Typography color="#64748b" fontSize="0.86rem">
                                            Tarefas da Equipe
                                        </Typography>
                                        <Typography color="#64748b" fontSize="0.86rem">
                                            Concluídas
                                        </Typography>
                                    </Stack>

                                    {internalTasks.map((task, idx) => (
                                        <Box key={task.title}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: 1.2 }}
                                            >
                                                <Stack direction="row" alignItems="flex-start" spacing={1}>
                                                    <Icon
                                                        icon={task.done ? "mdi:check-circle-outline" : "mdi:circle-outline"}
                                                        width={18}
                                                        color={task.done ? "#10b981" : "#94a3b8"}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            fontSize="0.92rem"
                                                            color="#1f2937"
                                                            sx={{
                                                                textDecoration: task.done ? "line-through" : "none",
                                                                opacity: task.done ? 0.65 : 1,
                                                            }}
                                                        >
                                                            {task.title}
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} mt={0.4}>
                                                            <Chip
                                                                avatar={<Avatar sx={{ width: 14, height: 14, fontSize: 8 }}>{task.owner.slice(0, 1)}</Avatar>}
                                                                label={task.owner}
                                                                size="small"
                                                                sx={{ fontSize: "0.72rem", height: 22 }}
                                                            />
                                                            <Chip
                                                                label={task.due}
                                                                size="small"
                                                                icon={<Icon icon="mdi:clock-outline" width={13} />}
                                                                sx={{ fontSize: "0.72rem", height: 22 }}
                                                            />
                                                            {task.priority && (
                                                                <Chip
                                                                    label={task.priority}
                                                                    size="small"
                                                                    sx={{
                                                                        fontSize: "0.72rem",
                                                                        height: 22,
                                                                        bgcolor: "#ffe4e6",
                                                                        color: "#ef4444",
                                                                    }}
                                                                />
                                                            )}
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                            {idx < internalTasks.length - 1 && <Divider />}
                                        </Box>
                                    ))}
                                </Paper>
                            </Stack>
                        </Box>

                        <Box>
                            <Stack spacing={2}>
                                <Paper sx={sideCardStyle}>
                                    <Stack direction="row" justifyContent="space-between" mb={2}>
                                        <Typography fontWeight={700} color="#1f2937" fontSize="1.15rem">
                                            Março 2026
                                        </Typography>
                                        <Stack direction="row" gap={1} color="#64748b">
                                            <Icon icon="mdi:chevron-left" width={20} />
                                            <Icon icon="mdi:chevron-right" width={20} />
                                        </Stack>
                                    </Stack>

                                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", rowGap: 1.1 }}>
                                        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                                            <Box key={day}>
                                                <Typography fontSize="0.75rem" color="#8698b2">
                                                    {day}
                                                </Typography>
                                            </Box>
                                        ))}
                                        {days.map((day) => (
                                            <Box key={day}>
                                                <Box
                                                    sx={{
                                                        width: 38,
                                                        height: 38,
                                                        borderRadius: "999px",
                                                        display: "grid",
                                                        placeItems: "center",
                                                        fontWeight: 500,
                                                        color: day === 28 ? "#fff" : "#334155",
                                                        bgcolor: day === 28 ? "#2563eb" : "transparent",
                                                    }}
                                                >
                                                    {day}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>

                                <Paper
                                    sx={{
                                        ...sideCardStyle,
                                        bgcolor: "#1f46b6",
                                        color: "#fff",
                                    }}
                                >
                                    <Typography fontWeight={700} fontSize="1.65rem" mb={1.2}>
                                        Sincronize seu Calendário
                                    </Typography>
                                    <Typography sx={{ opacity: 0.92, mb: 2.2 }}>
                                        Conecte seu Google Calendar ou Outlook para sincronizar todos os seus
                                        compromissos automaticamente.
                                    </Typography>
                                    <Button
                                        sx={{
                                            textTransform: "none",
                                            bgcolor: "#fff",
                                            color: "#1f46b6",
                                            borderRadius: "10px",
                                            "&:hover": { bgcolor: "#f1f5f9" },
                                        }}
                                    >
                                        Conectar Calendário
                                    </Button>
                                </Paper>
                            </Stack>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Modal open={open} onClose={() => setOpen(false)} variant="newAppointment" />
            <Modal open={openTask} onClose={() => setOpenTask(false)} variant="newTask" />
        </Box>
    );
}

const sideCardStyle = {
    borderRadius: "16px",
    border: "1px solid #dbe3ef",
    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
    p: 2.4,
};
