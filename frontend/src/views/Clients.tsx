"use client";

import {
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { Modal } from "@/componentes/Modal";
import { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/context/NotificationsContext";
import { ClientStatus, listTrackedClients } from "@/data/cases";

function statusStyles(status: ClientStatus) {
    if (status === "Ativo") {
        return { color: "#047857", bg: "#b8ead2" };
    }
    if (status === "Inativo") {
        return { color: "#334155", bg: "#e2e8f0" };
    }
    return { color: "#1d4ed8", bg: "#c7d8f2" };
}

export default function ClientesView() {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const clients = listTrackedClients();
    const { addNotification } = useNotifications();

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="clientes" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.2}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="text.primary">
                                Clientes
                            </Typography>
                            <Typography color="text.secondary" fontSize="0.95rem">
                                Gerencie seu diretório de clientes e contas corporativas.
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<Icon icon="mdi:plus" />}
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px",
                                px: 2.2,
                                fontWeight: 600,
                            }}
                            onClick={() => setOpen(true)}
                        >
                            Adicionar Cliente
                        </Button>
                    </Stack>

                    <Paper
                        sx={{
                            borderRadius: "16px",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                            overflow: "hidden",
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                px: 2,
                                py: 1.8,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <TextField
                                placeholder="Buscar por nome, documento ou e-mail..."
                                sx={{
                                    width: { xs: "100%", sm: 450 },
                                    "& .MuiOutlinedInput-root": {
                                        bgcolor: "background.paper",
                                        borderRadius: "12px",
                                        height: 44,
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "divider",
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon icon="mdi:magnify" color="currentColor" width={20} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                variant="outlined"
                                startIcon={<Icon icon="mdi:filter-variant" />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "12px",
                                    borderColor: "divider",
                                    color: "text.secondary",
                                    minWidth: 100,
                                }}
                            >
                                Filtros
                            </Button>
                        </Stack>

                        <Table>
                            <TableHead sx={{ bgcolor: "background.paper" }}>
                                <TableRow>
                                    <TableCell sx={headCellStyle}>NOME DO CLIENTE</TableCell>
                                    <TableCell sx={headCellStyle}>DETALHES DE CONTATO</TableCell>
                                    <TableCell sx={headCellStyle}>CPF / CNPJ</TableCell>
                                    <TableCell sx={headCellStyle}>STATUS</TableCell>
                                    <TableCell sx={{ ...headCellStyle, textAlign: "right", pr: 3 }}>
                                        AÇÕES
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {clients.map((client) => {
                                    const { color, bg } = statusStyles(client.status);

                                    return (
                                        <TableRow key={client.slug}>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography fontWeight={600} color="text.primary" mb={0.3}>
                                                    {client.name}
                                                </Typography>
                                                <Typography color="text.secondary" fontSize="0.86rem">
                                                    Contato: {client.contactName}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.primary">{client.email}</Typography>
                                                <Typography color="text.secondary" fontSize="0.86rem">
                                                    {client.phone}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.secondary">{client.cpfCnpj}</Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Chip
                                                    label={client.status}
                                                    sx={{
                                                        bgcolor: bg,
                                                        color,
                                                        fontWeight: 500,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{ ...rowCellStyle, textAlign: "right", pr: 2 }}>
                                                <IconButton
                                                    sx={actionBtnStyle}
                                                    component={Link}
                                                    href={`/acompanhamento/${client.slug}`}
                                                >
                                                    <Icon icon="mdi:eye-outline" width={19} />
                                                </IconButton>
                                                <IconButton
                                                    sx={actionBtnStyle}
                                                    onClick={() => setEditOpen(true)}
                                                >
                                                    <Icon icon="mdi:pencil-outline" width={19} />
                                                </IconButton>
                                                <IconButton sx={actionBtnStyle}>
                                                    <Icon icon="mdi:trash-can-outline" width={19} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ px: 2, py: 2, borderTop: "1px solid", borderColor: "divider" }}
                        >
                            <Typography color="text.secondary" fontSize="0.95rem">
                                Mostrando 1 até 6 de 6 registros
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="outlined"
                                    disabled
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        borderColor: "divider",
                                        minWidth: 88,
                                    }}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outlined"
                                    disabled
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        borderColor: "divider",
                                        minWidth: 88,
                                    }}
                                >
                                    Próximo
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                variant="newClient"
                onSubmit={() =>
                    addNotification({
                        title: "Novo cliente cadastrado",
                        description: "O cliente foi adicionado com sucesso.",
                    })
                }
            />
            <Modal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                variant="editCase"
                onSubmit={() =>
                    addNotification({
                        title: "Caso atualizado",
                        description: "As alterações do caso foram salvas.",
                    })
                }
            />
        </Box>
    );
}

const headCellStyle = {
    color: "text.secondary",
    fontWeight: 700,
    fontSize: "0.9rem",
    borderBottom: "1px solid",
    borderColor: "divider",
};

const rowCellStyle = {
    py: 1.9,
    borderBottom: "1px solid",
    borderColor: "divider",
};

const actionBtnStyle = {
    color: "text.secondary",
};
