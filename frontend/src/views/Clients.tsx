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

type ClientStatus = "Ativo" | "Inativo" | "Prospecto";

type ClientRow = {
    name: string;
    contactName: string;
    email: string;
    phone: string;
    cpfCnpj: string;
    status: ClientStatus;
};

const clients: ClientRow[] = [
    {
        name: "Acme Corporation",
        contactName: "João Silva",
        email: "juridico@acmecorp.com.br",
        phone: "+55 11 98765-4321",
        cpfCnpj: "12.345.678/0001-90",
        status: "Ativo",
    },
    {
        name: "Maria Oliveira",
        contactName: "-",
        email: "maria.oliveira@email.com",
        phone: "+55 11 99999-8888",
        cpfCnpj: "123.456.789-00",
        status: "Ativo",
    },
    {
        name: "TechStart Inc.",
        contactName: "Sarah Santos",
        email: "sarah@techstart.io",
        phone: "+55 41 95555-0198",
        cpfCnpj: "98.765.432/0001-10",
        status: "Inativo",
    },
    {
        name: "João Santos Silva",
        contactName: "João Santos",
        email: "joao.santos@email.com",
        phone: "+55 21 98888-7777",
        cpfCnpj: "234.567.890-11",
        status: "Ativo",
    },
    {
        name: "Global Logistics LLC",
        contactName: "Roberto Chen",
        email: "legal@globallogistics.com.br",
        phone: "+55 21 95555-0123",
        cpfCnpj: "45.678.901/0001-23",
        status: "Ativo",
    },
    {
        name: "Ana Paula Costa",
        contactName: "Ana Costa",
        email: "ana.costa@email.com",
        phone: "+55 31 97777-6666",
        cpfCnpj: "345.678.901-22",
        status: "Prospecto",
    },
];

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

    return (
        <Box
            sx={{
                bgcolor: "#f1f5f9",
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
                            <Typography variant="h4" fontWeight={700} color="#18263c">
                                Clientes
                            </Typography>
                            <Typography color="#60738f" fontSize="0.95rem">
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
                            border: "1px solid #dbe3ef",
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
                                borderBottom: "1px solid #dbe3ef",
                            }}
                        >
                            <TextField
                                placeholder="Buscar por nome, documento ou e-mail..."
                                sx={{
                                    width: { xs: "100%", sm: 450 },
                                    "& .MuiOutlinedInput-root": {
                                        bgcolor: "#f8fafc",
                                        borderRadius: "12px",
                                        height: 44,
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#d2dceb",
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon icon="mdi:magnify" color="#7c8ba1" width={20} />
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
                                    borderColor: "#d2dceb",
                                    color: "#3f5677",
                                    minWidth: 100,
                                }}
                            >
                                Filtros
                            </Button>
                        </Stack>

                        <Table>
                            <TableHead sx={{ bgcolor: "#f8fafc" }}>
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
                                        <TableRow key={client.name}>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography fontWeight={600} color="#1e293b" mb={0.3}>
                                                    {client.name}
                                                </Typography>
                                                <Typography color="#7487a5" fontSize="0.86rem">
                                                    Contato: {client.contactName}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="#1e293b">{client.email}</Typography>
                                                <Typography color="#7487a5" fontSize="0.86rem">
                                                    {client.phone}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="#475569">{client.cpfCnpj}</Typography>
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
                                                <IconButton sx={actionBtnStyle}>
                                                    <Icon icon="mdi:eye-outline" width={19} />
                                                </IconButton>
                                                <IconButton sx={actionBtnStyle}>
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
                            sx={{ px: 2, py: 2, borderTop: "1px solid #dbe3ef" }}
                        >
                            <Typography color="#647a9a" fontSize="0.95rem">
                                Mostrando 1 até 6 de 6 registros
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="outlined"
                                    disabled
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        borderColor: "#d2dceb",
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
                                        borderColor: "#d2dceb",
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

            <Modal open={open} onClose={() => setOpen(false)} variant="newClient" />
        </Box>
    );
}

const headCellStyle = {
    color: "#546987",
    fontWeight: 700,
    fontSize: "0.9rem",
    borderBottom: "1px solid #dbe3ef",
};

const rowCellStyle = {
    py: 1.9,
    borderBottom: "1px solid #dbe3ef",
};

const actionBtnStyle = {
    color: "#8395b0",
};
