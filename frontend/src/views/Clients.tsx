"use client";

import {
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
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
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/context/NotificationsContext";
import { ClientStatus, listTrackedClients } from "@/data/cases";
import { useAppLanguage } from "@/theme/ThemeRegistry";

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
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [caseOpen, setCaseOpen] = useState(false);
    const clients = listTrackedClients();
    const { addNotification } = useNotifications();
    const statusLabel = (status: ClientStatus) =>
        isEn
            ? status === "Ativo"
                ? "Active"
                : status === "Inativo"
                  ? "Inactive"
                  : "Prospect"
            : status;
    const handleOpenNewClientModal = () => setOpen(true);
    const handleCloseNewClientModal = () => setOpen(false);
    const handleOpenEditCaseModal = () => setEditOpen(true);
    const handleCloseEditCaseModal = () => setEditOpen(false);
    const handleOpenMenu = (e: any) => setAnchorEl(e.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleOpenNewCaseModal = () => setCaseOpen(true);
    const handleCloseNewCaseModal = () => setCaseOpen(false);
    const handleNewClientSubmit = () =>
        addNotification({
            title: "Novo cliente cadastrado",
            description: isEn
                ? "Client added successfully."
                : "O cliente foi adicionado com sucesso.",
        });
    const handleNewCaseSubmit = () => {
        setCaseOpen(false);
        addNotification({
            title: "Novo caso criado",
            description: isEn
                ? "A new case was added."
                : "Um novo caso foi adicionado no painel.",
        });
    };
    const handleEditCaseSubmit = () =>
        addNotification({
            title: "Caso atualizado",
            description: isEn
                ? "Case changes were saved."
                : "As alterações do caso foram salvas.",
        });

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
                                {isEn ? "Clients" : "Clientes"}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                fontSize="0.95rem"
                            >
                                {isEn
                                    ? "Manage your client directory and corporate accounts."
                                    : "Gerencie seu diretório de clientes e contas corporativas."}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleOpenMenu}
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px",
                                px: 1,
                                minWidth: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                            }}
                        >
                            <Icon icon="mdi:plus" width={20} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleCloseMenu}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleCloseMenu();
                                    handleOpenNewClientModal();
                                }}
                            >
                                {isEn ? "Add Client" : "Novo Cliente"}
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseMenu();
                                    handleOpenNewCaseModal();
                                }}
                            >
                                {isEn ? "New Case" : "Novo Caso"}
                            </MenuItem>
                        </Menu>
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
                                placeholder={
                                    isEn
                                        ? "Search by name, document, or email..."
                                        : "Buscar por nome, documento ou e-mail..."
                                }
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
                                            <Icon
                                                icon="mdi:magnify"
                                                color="currentColor"
                                                width={20}
                                            />
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
                                {isEn ? "Filters" : "Filtros"}
                            </Button>
                        </Stack>

                        <Table>
                            <TableHead sx={{ bgcolor: "background.paper" }}>
                                <TableRow>
                                    <TableCell sx={headCellStyle}>
                                        {isEn
                                            ? "CLIENT NAME"
                                            : "NOME DO CLIENTE"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn
                                            ? "CONTACT DETAILS"
                                            : "DETALHES DE CONTATO"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "TAX ID" : "CPF / CNPJ"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "STATUS" : "STATUS"}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            ...headCellStyle,
                                            textAlign: "right",
                                            pr: 3,
                                        }}
                                    >
                                        {isEn ? "ACTIONS" : "AÇÕES"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {clients.map((client) => {
                                    const { color, bg } = statusStyles(
                                        client.status,
                                    );

                                    return (
                                        <TableRow key={client.slug}>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography
                                                    fontWeight={600}
                                                    color="text.primary"
                                                    mb={0.3}
                                                >
                                                    {client.name}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.86rem"
                                                >
                                                    {isEn
                                                        ? "Contact:"
                                                        : "Contato:"}{" "}
                                                    {client.contactName}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.primary">
                                                    {client.email}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    fontSize="0.86rem"
                                                >
                                                    {client.phone}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.secondary">
                                                    {client.cpfCnpj}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={rowCellStyle}>
                                                <Chip
                                                    label={statusLabel(
                                                        client.status,
                                                    )}
                                                    sx={{
                                                        bgcolor: bg,
                                                        color,
                                                        fontWeight: 500,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    ...rowCellStyle,
                                                    textAlign: "right",
                                                    pr: 2,
                                                }}
                                            >
                                                <IconButton
                                                    sx={actionBtnStyle}
                                                    component={Link}
                                                    href={`/acompanhamento/${client.slug}`}
                                                >
                                                    <Icon
                                                        icon="mdi:eye-outline"
                                                        width={19}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    sx={actionBtnStyle}
                                                    onClick={
                                                        handleOpenEditCaseModal
                                                    }
                                                >
                                                    <Icon
                                                        icon="mdi:pencil-outline"
                                                        width={19}
                                                    />
                                                </IconButton>
                                                <IconButton sx={actionBtnStyle}>
                                                    <Icon
                                                        icon="mdi:trash-can-outline"
                                                        width={19}
                                                    />
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
                            sx={{
                                px: 2,
                                py: 2,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                fontSize="0.95rem"
                            >
                                {isEn
                                    ? "Showing 1 to 6 of 6 records"
                                    : "Mostrando 1 até 6 de 6 registros"}
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
                                    {isEn ? "Previous" : "Anterior"}
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
                                    {isEn ? "Next" : "Próximo"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            <Modal
                open={open}
                onClose={handleCloseNewClientModal}
                variant="newClient"
                onSubmit={handleNewClientSubmit}
            />
            <Modal
                open={caseOpen}
                onClose={handleCloseNewCaseModal}
                variant="newCase"
                onSubmit={handleNewCaseSubmit}
            />
            <Modal
                open={editOpen}
                onClose={handleCloseEditCaseModal}
                variant="editCase"
                onSubmit={handleEditCaseSubmit}
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
