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
import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { useNotifications } from "@/context/NotificationsContext";
import { cases, type CaseItem } from "@/data/cases";
import { useAppLanguage } from "@/theme/ThemeRegistry";
import { useAuth } from "@/hooks/useAuth";

const statusStyles = (status: CaseItem["status"]) => {
    if (status === "Em Andamento") {
        return { color: "#047857", bg: "#d1fae5" };
    }
    if (status === "Concluído") {
        return { color: "#059669", bg: "#a7f3d0" };
    }
    return { color: "#d97706", bg: "#fef3c7" };
};

export default function CasesView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const { hasRole } = useAuth();
    const canManageCases = hasRole("admin");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [caseOpen, setCaseOpen] = useState(false);
    const { addNotification } = useNotifications();

    const statusLabel = (status: CaseItem["status"]) =>
        isEn
            ? status === "Em Andamento"
              ? "Ongoing"
              : status === "Pendente"
              ? "Pending"
              : "Completed"
            : status;

    const handleOpenMenu = (e: MouseEvent<HTMLElement>) =>
        setAnchorEl(e.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleOpenNewCaseModal = () => setCaseOpen(true);
    const handleCloseNewCaseModal = () => setCaseOpen(false);

    const handleNewCaseSubmit = () =>
        addNotification({
            title: "Novo caso criado",
            description: isEn
                ? "A new case was added."
                : "Um novo caso foi adicionado.",
        });

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="cases" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard showSearch={false} />

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
                                {isEn ? "Cases" : "Casos"}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                fontSize="0.95rem"
                            >
                                {isEn
                                    ? "Manage all legal cases and processes."
                                    : "Gerencie todos os casos e processos jurídicos."}
                            </Typography>
                        </Box>

                        {canManageCases ? (
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
                        ) : null}

                        <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleCloseMenu();
                                handleOpenNewCaseModal();
                            }}>
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
                                        ? "Search by title, process number or client..."
                                        : "Buscar por título, número do processo ou cliente..."
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
                                        {isEn ? "CLIENT" : "CLIENTE"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "CASE TITLE" : "TÍTULO DO CASO"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "PROCESS NUMBER" : "NÚMERO DO PROCESSO"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "STATUS" : "STATUS"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "NEXT HEARING" : "PRÓXIMA AUDIÊNCIA"}
                                    </TableCell>
                                    <TableCell sx={headCellStyle}>
                                        {isEn ? "LAWYER" : "ADVOGADO"}
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
                                {cases.map((caseItem) => {
                                    const { color, bg } = statusStyles(caseItem.status);
                                    return (
                                        <TableRow key={caseItem.caseSlug}>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography fontWeight={600} color="text.primary">
                                                    {caseItem.clientName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.primary">
                                                    {caseItem.caseTitle}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.secondary">
                                                    {caseItem.processNumber}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={rowCellStyle}>
                                                <Chip
                                                    label={statusLabel(caseItem.status)}
                                                    sx={{ bgcolor: bg, color, fontWeight: 500 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.primary">
                                                    {caseItem.nextHearing}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={rowCellStyle}>
                                                <Typography color="text.primary">
                                                    {caseItem.lawyerName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ ...rowCellStyle, textAlign: "right", pr: 2 }}>
                                                <IconButton
                                                    sx={actionBtnStyle}
                                                    component={Link}
                                                href={`/acompanhamento/${caseItem.clientSlug}/${caseItem.caseSlug}`}
                                                >
                                                    <Icon
                                                        icon="mdi:eye-outline"
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
                            <Typography color="text.secondary" fontSize="0.95rem">
                                {isEn
                                    ? `Showing 1 to ${cases.length} of ${cases.length} records`
                                    : `Mostrando 1 até ${cases.length} de ${cases.length} registros`}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Button variant="outlined" disabled sx={{ textTransform: "none", borderRadius: "8px", borderColor: "divider", minWidth: 88 }}>
                                  {isEn ? "Previous" : "Anterior"}
                                </Button>
                                <Button variant="outlined" disabled sx={{ textTransform: "none", borderRadius: "8px", borderColor: "divider", minWidth: 88 }}>
                                    {isEn ? "Next" : "Próximo"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            <Modal
                open={caseOpen}
                onClose={handleCloseNewCaseModal}
                variant="newCase"
                onSubmit={handleNewCaseSubmit}
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
