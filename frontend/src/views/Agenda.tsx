"use client";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { Modal } from "@/componentes/Modal";
import { CalendarCard } from "@/componentes/CalendarCard";
import { useMemo, useState } from "react";
import { useNotifications } from "@/context/NotificationsContext";
import { useAppLanguage } from "@/theme/ThemeRegistry";

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
    id: string;
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

const currentUserName = "Elena Silva";

const initialInternalTasks: InternalTask[] = [
    {
        id: "t1",
        title: "Redigir NDA para TechStart Inc.",
        owner: "Elena Silva",
        due: "Hoje",
        priority: "Alta Prioridade",
    },
    {
        id: "t2",
        title: "Revisar autos do processo Silva vs. Souza",
        owner: "Elena Silva",
        due: "Amanhã",
    },
    {
        id: "t3",
        title: "Prep. para reunião com cliente: Acme Corp",
        owner: "Carlos Santos",
        due: "26 Out",
        priority: "Alta Prioridade",
        done: true,
    },
    {
        id: "t4",
        title: "Atualizar política de compliance interna",
        owner: "Ana Costa",
        due: "28 Out",
    },
    {
        id: "t5",
        title: "Preparar relatório mensal de faturamento",
        owner: "Elena Silva",
        due: "31 Out",
    },
    {
        id: "t6",
        title: "Validar checklist de onboarding de cliente",
        owner: "Equipe Jurídica",
        due: "30 Out",
    },
];

type TaskTab = "mine" | "done";

function statusChip(status: EventStatus) {
    if (status === "Confirmado") {
        return { color: "#047857", bg: "#b8ead2" };
    }
    return { color: "#c2410c", bg: "#ffe3bf" };
}

function AgendaGroup({
    title,
    events,
    onEdit,
    isEn,
}: {
    title: string;
    events: AgendaEvent[];
    onEdit: (event: AgendaEvent) => void;
    isEn: boolean;
}) {
    return (
        <Paper
            sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
            }}
        >
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                <Icon
                    icon="mdi:calendar-blank-outline"
                    color="currentColor"
                    width={22}
                />
                <Typography
                    fontWeight={700}
                    fontSize="1.15rem"
                    color="text.primary"
                >
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
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Box sx={{ width: 115 }}>
                            <Typography
                                fontWeight={700}
                                color="text.primary"
                                fontSize="1rem"
                            >
                                {event.time}
                            </Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                                color="text.secondary"
                            >
                                <Icon icon="mdi:clock-outline" width={16} />
                                <Typography fontSize="0.8rem">
                                    {event.duration}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography
                                fontWeight={700}
                                color="text.primary"
                                fontSize="1rem"
                            >
                                {event.title}
                            </Typography>
                            <Typography
                                color="#2563eb"
                                fontSize="0.86rem"
                                mb={1}
                            >
                                {event.client}
                            </Typography>
                            <Stack
                                direction="row"
                                gap={2}
                                color="text.secondary"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={0.6}
                                >
                                    <Icon
                                        icon={
                                            event.place === "Videoconferência"
                                                ? "mdi:video-outline"
                                                : "mdi:map-marker-outline"
                                        }
                                        width={17}
                                    />
                                    <Typography fontSize="0.83rem">
                                        {event.place}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={0.6}
                                >
                                    <Icon icon="mdi:bell-outline" width={17} />
                                    <Typography fontSize="0.83rem">
                                        {event.reminder}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>

                        <Stack direction="row" alignItems="center" gap={2.2}>
                            <Chip
                                label={
                                    isEn
                                        ? event.status === "Confirmado"
                                            ? "Confirmed"
                                            : "Pending"
                                        : event.status
                                }
                                sx={{
                                    bgcolor: chip.bg,
                                    color: chip.color,
                                    fontWeight: 500,
                                    minWidth: 92,
                                    fontSize: "0.78rem",
                                }}
                            />
                            <Typography
                                color="text.secondary"
                                sx={{ cursor: "pointer", fontSize: "0.88rem" }}
                                onClick={() => onEdit(event)}
                            >
                                {isEn ? "Edit" : "Editar"}
                            </Typography>
                        </Stack>
                    </Stack>
                );
            })}
        </Paper>
    );
}

export default function AgendaView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openTask, setOpenTask] = useState(false);
    const [openEditTask, setOpenEditTask] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(
        null,
    );
    const [selectedTask, setSelectedTask] = useState<InternalTask | null>(null);
    const [activeTaskTab, setActiveTaskTab] = useState<TaskTab>("mine");
    const [internalTasks, setInternalTasks] =
        useState<InternalTask[]>(initialInternalTasks);
    const { addNotification } = useNotifications();

    const handleEditAppointment = (event: AgendaEvent) => {
        setSelectedEvent(event);
        setOpenEdit(true);
    };
    const visibleTasks = useMemo(() => {
        if (activeTaskTab === "mine") {
            return internalTasks.filter(
                (task) => !task.done && task.owner === currentUserName,
            );
        }
        return internalTasks.filter((task) => task.done);
    }, [activeTaskTab, internalTasks]);

    const handleEditTask = (task: InternalTask) => {
        setSelectedTask(task);
        setOpenEditTask(true);
    };

    const handleDeleteTask = (task: InternalTask) => {
        setInternalTasks((prev) => prev.filter((item) => item.id !== task.id));
        addNotification({
            title: isEn ? "Task removed" : "Tarefa removida",
            description: isEn
                ? `Task "${task.title}" was deleted.`
                : `A tarefa "${task.title}" foi excluída.`,
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
            <SidebarDashboard activeKey="agenda" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
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
                                {isEn ? "Schedule" : "Agenda"}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                fontSize="0.85rem"
                            >
                                {isEn
                                    ? "Manage your appointments and hearings."
                                    : "Gerencie seus compromissos e audiências."}
                            </Typography>
                        </Box>

                        <Stack direction="row" gap={1.2}>
                            <Button
                                variant="contained"
                                startIcon={<Icon icon="mdi:plus" />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "12px",
                                    px: 2.2,
                                }}
                                onClick={() => setOpen(true)}
                            >
                                {isEn ? "New Appointment" : "Novo Compromisso"}
                            </Button>
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                lg: "1.45fr 0.7fr",
                            },
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Stack spacing={2}>
                                <AgendaGroup
                                    title={isEn ? "Saturday, March 28, 2026" : "Sábado, 28 De Março, 2026"}
                                    events={eventsToday}
                                    onEdit={handleEditAppointment}
                                    isEn={isEn}
                                />
                                <AgendaGroup
                                    title={isEn ? "Tomorrow, March 29" : "Amanhã, 29 De Março"}
                                    events={eventsTomorrow}
                                    onEdit={handleEditAppointment}
                                    isEn={isEn}
                                />

                                <Paper sx={sideCardStyle}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <Box>
                                            <Typography
                                                fontWeight={700}
                                                fontSize="1.15rem"
                                                color="text.primary"
                                            >
                                                {isEn ? "Internal Tasks" : "Tarefas Internas"}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                fontSize="0.82rem"
                                            >
                                                {isEn
                                                    ? "Track your team's action items and deliveries."
                                                    : "Acompanhe os itens de ação e entregas da sua equipe."}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            startIcon={<Icon icon="mdi:plus" />}
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: "10px",
                                                fontSize: "0.82rem",
                                            }}
                                            onClick={() => setOpenTask(true)}
                                        >
                                            {isEn ? "Add Task" : "Adicionar Tarefa"}
                                        </Button>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            py: 1,
                                            borderBottom: "1px solid",
                                            borderColor: "divider",
                                        }}
                                    >
                                        <Typography
                                            color={
                                                activeTaskTab === "mine"
                                                    ? "primary.main"
                                                    : "text.secondary"
                                            }
                                            fontSize="0.86rem"
                                            fontWeight={
                                                activeTaskTab === "mine"
                                                    ? 600
                                                    : 500
                                            }
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setActiveTaskTab("mine")
                                            }
                                        >
                                            {isEn ? "My Tasks" : "Minhas Tarefas"}
                                        </Typography>
                                        <Typography
                                            color={
                                                activeTaskTab === "done"
                                                    ? "primary.main"
                                                    : "text.secondary"
                                            }
                                            fontSize="0.86rem"
                                            fontWeight={
                                                activeTaskTab === "done"
                                                    ? 600
                                                    : 500
                                            }
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setActiveTaskTab("done")
                                            }
                                        >
                                            {isEn ? "Completed" : "Concluídas"}
                                        </Typography>
                                    </Stack>

                                    {visibleTasks.map((task, idx) => (
                                        <Box key={task.title}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: 1.2 }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    alignItems="flex-start"
                                                    spacing={1}
                                                >
                                                    <Icon
                                                        icon={
                                                            task.done
                                                                ? "mdi:check-circle-outline"
                                                                : "mdi:circle-outline"
                                                        }
                                                        width={18}
                                                        color={
                                                            task.done
                                                                ? "#10b981"
                                                                : "#94a3b8"
                                                        }
                                                    />
                                                    <Box>
                                                        <Typography
                                                            fontSize="0.92rem"
                                                            color="text.primary"
                                                            sx={{
                                                                textDecoration:
                                                                    task.done
                                                                        ? "line-through"
                                                                        : "none",
                                                                opacity:
                                                                    task.done
                                                                        ? 0.65
                                                                        : 1,
                                                            }}
                                                        >
                                                            {task.title}
                                                        </Typography>
                                                        <Stack
                                                            direction="row"
                                                            spacing={1}
                                                            mt={0.4}
                                                        >
                                                            <Chip
                                                                avatar={
                                                                    <Avatar
                                                                        sx={{
                                                                            width: 14,
                                                                            height: 14,
                                                                            fontSize: 8,
                                                                        }}
                                                                    >
                                                                        {task.owner.slice(
                                                                            0,
                                                                            1,
                                                                        )}
                                                                    </Avatar>
                                                                }
                                                                label={
                                                                    task.owner
                                                                }
                                                                size="small"
                                                                sx={{
                                                                    fontSize:
                                                                        "0.72rem",
                                                                    height: 22,
                                                                }}
                                                            />
                                                            <Chip
                                                                label={task.due}
                                                                size="small"
                                                                icon={
                                                                    <Icon
                                                                        icon="mdi:clock-outline"
                                                                        width={
                                                                            13
                                                                        }
                                                                    />
                                                                }
                                                                sx={{
                                                                    fontSize:
                                                                        "0.72rem",
                                                                    height: 22,
                                                                }}
                                                            />
                                                            {task.priority && (
                                                                <Chip
                                                                    label={
                                                                        task.priority
                                                                    }
                                                                    size="small"
                                                                    sx={{
                                                                        fontSize:
                                                                            "0.72rem",
                                                                        height: 22,
                                                                        bgcolor:
                                                                            "#ffe4e6",
                                                                        color: "#ef4444",
                                                                    }}
                                                                />
                                                            )}
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    spacing={0.4}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: "text.secondary",
                                                        }}
                                                        onClick={() =>
                                                            handleEditTask(task)
                                                        }
                                                    >
                                                        <Icon
                                                            icon="mdi:pencil-outline"
                                                            width={17}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: "text.secondary",
                                                        }}
                                                        onClick={() =>
                                                            handleDeleteTask(
                                                                task,
                                                            )
                                                        }
                                                    >
                                                        <Icon
                                                            icon="mdi:trash-can-outline"
                                                            width={17}
                                                        />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                            {idx < visibleTasks.length - 1 && (
                                                <Divider />
                                            )}
                                        </Box>
                                    ))}
                                </Paper>
                            </Stack>
                        </Box>

                        <Stack spacing={2}>
                            <CalendarCard />
                        </Stack>
                    </Box>
                </Container>
            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                variant="newAppointment"
                onSubmit={() =>
                    addNotification({
                        title: isEn ? "Appointment created" : "Compromisso agendado",
                        description:
                            isEn
                                ? "A new appointment was added to the schedule."
                                : "Um novo compromisso foi adicionado na agenda.",
                    })
                }
            />
            <Modal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                variant="editAppointment"
                onSubmit={() =>
                    addNotification({
                        title: isEn ? "Appointment updated" : "Compromisso atualizado",
                        description: isEn
                            ? `Changes saved in "${selectedEvent?.title || "appointment"}".`
                            : `Alterações salvas em "${selectedEvent?.title || "compromisso"}".`,
                    })
                }
            />
            <Modal
                open={openTask}
                onClose={() => setOpenTask(false)}
                variant="newTask"
                onSubmit={() =>
                    addNotification({
                        title: isEn ? "New internal task" : "Nova tarefa interna",
                        description:
                            isEn
                                ? "Task created and linked to the schedule."
                                : "A tarefa foi criada e vinculada à agenda.",
                    })
                }
            />
            <Modal
                open={openEditTask}
                onClose={() => setOpenEditTask(false)}
                variant="editTask"
                onSubmit={() =>
                    addNotification({
                        title: isEn ? "Task updated" : "Tarefa atualizada",
                        description: isEn
                            ? `Changes saved in "${selectedTask?.title || "task"}".`
                            : `Alterações salvas em "${selectedTask?.title || "tarefa"}".`,
                    })
                }
            />
        </Box>
    );
}

const sideCardStyle = {
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
    p: 2.4,
};
