"use client";

import {
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationsContext";
import { useTheme } from "@mui/material/styles";
import { useAppLanguage } from "@/theme/ThemeRegistry";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const cashFlowData = [
    { month: "Jan", receitas: 4, despesas: 2.4 },
    { month: "Fev", receitas: 3, despesas: 1.3 },
    { month: "Mar", receitas: 2, despesas: 10 },
    { month: "Abr", receitas: 2.8, despesas: 4 },
    { month: "Mai", receitas: 2, despesas: 5 },
    { month: "Jun", receitas: 2.5, despesas: 4 },
    { month: "Jul", receitas: 3.5, despesas: 4.5 },
];

type Transaction = {
    title: string;
    meta: string;
    amount: string;
    type: "entrada" | "saida";
};

const transactions: Transaction[] = [
    {
        title: "Honorários Iniciais - Acme Corp",
        meta: "Hoje  •  Honorários",
        amount: "+R$ 5.000,00",
        type: "entrada",
    },
    {
        title: "Material de Escritório",
        meta: "Hoje  •  Operações",
        amount: "R$ 124,50",
        type: "saida",
    },
    {
        title: "Consultoria - Maria Oliveira",
        meta: "Ontem  •  Consultoria",
        amount: "+R$ 350,00",
        type: "entrada",
    },
    {
        title: "Assinaturas de Software",
        meta: "24 Out  •  TI",
        amount: "R$ 299,99",
        type: "saida",
    },
    {
        title: "Pagamento de Acordo Recebido",
        meta: "22 Out  •  Acordos",
        amount: "+R$ 12.500,00",
        type: "entrada",
    },
    {
        title: "Aluguel - Escritório Principal",
        meta: "20 Out  •  Operações",
        amount: "R$ 3.500,00",
        type: "saida",
    },
];

export default function FinanceiroView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const [openTransaction, setOpenTransaction] = useState(false);
    const { addNotification } = useNotifications();
    const theme = useTheme();
    const chartTickColor =
        theme.palette.mode === "dark" ? "#cbd5e1" : "#475569";
    const handleOpenTransactionModal = () => setOpenTransaction(true);
    const handleCloseTransactionModal = () => setOpenTransaction(false);
    const handleTransactionSubmit = () =>
        addNotification({
            title: isEn
                ? "New transaction recorded"
                : "Nova transação registrada",
            description: isEn
                ? "Financial transaction added successfully."
                : "A movimentação financeira foi adicionada com sucesso.",
        });

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="financeiro" />

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
                                {isEn ? "Finance" : "Financeiro"}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                fontSize="0.95rem"
                            >
                                {isEn
                                    ? "Overview of firm finances, billing, and expenses."
                                    : "Visão geral das finanças, faturamentos e despesas do escritório."}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1.2}>
                            <Button
                                variant="outlined"
                                startIcon={<Icon icon="mdi:download" />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "12px",
                                    borderColor: "divider",
                                    color: "text.secondary",
                                }}
                            >
                                {isEn ? "Export" : "Exportar"}
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Icon icon="mdi:plus" />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "12px",
                                    bgcolor: "#059669",
                                    "&:hover": { bgcolor: "#047857" },
                                }}
                                onClick={handleOpenTransactionModal}
                            >
                                {isEn ? "New Transaction" : "Nova Transação"}
                            </Button>
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                lg: "0.9fr 1.8fr",
                            },
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Paper
                            sx={{
                                borderRadius: "16px",
                                p: 2.3,
                                border: "1px solid #12244b",
                                bgcolor: "#0b1838",
                                color: "#fff",
                                position: "relative",
                                overflow: "hidden",
                                boxShadow: "0 6px 22px rgba(15,23,42,0.18)",
                            }}
                        >
                            <Typography color="#b5c6e5" mb={1}>
                                {isEn ? "Total Balance" : "Saldo Total"}
                            </Typography>
                            <Typography
                                fontWeight={700}
                                fontSize="3rem"
                                mb={1.4}
                            >
                                R$ 145.200,00
                            </Typography>
                            <Stack direction="row" spacing={3}>
                                <Box>
                                    <Typography
                                        color="#93a6c5"
                                        fontSize="0.86rem"
                                    >
                                        {isEn
                                            ? "Monthly Income"
                                            : "Receitas do Mês"}
                                    </Typography>
                                    <Typography color="#34d399">
                                        ↗ R$ 32.450
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        color="#93a6c5"
                                        fontSize="0.86rem"
                                    >
                                        {isEn
                                            ? "Monthly Expenses"
                                            : "Despesas do Mês"}
                                    </Typography>
                                    <Typography color="#f87171">
                                        ↘ R$ 12.800
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography
                                sx={{
                                    position: "absolute",
                                    right: 20,
                                    top: -2,
                                    fontSize: "5.8rem",
                                    lineHeight: 1,
                                    color: "rgba(148,163,184,0.18)",
                                }}
                            >
                                $
                            </Typography>
                        </Paper>

                        <Paper sx={panelStyle}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1.2}
                            >
                                <Typography
                                    fontWeight={700}
                                    fontSize="1.15rem"
                                    color="text.primary"
                                    pl="16px"
                                >
                                    {isEn
                                        ? "Monthly Cash Flow"
                                        : "Fluxo de Caixa Mensal"}
                                </Typography>
                                <Select
                                    size="small"
                                    value="6m"
                                    sx={selectStyle}
                                >
                                    <MenuItem value="6m">
                                        {isEn
                                            ? "Last 6 Months"
                                            : "Últimos 6 Meses"}
                                    </MenuItem>
                                </Select>
                            </Stack>

                            <Box sx={{ height: 240 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={cashFlowData} barGap={8}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="var(--mui-palette-divider)"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tick={{
                                                fill: chartTickColor,
                                                fontSize: 13,
                                                fontWeight: 700,
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            tick={{
                                                fill: chartTickColor,
                                                fontSize: 13,
                                                fontWeight: 700,
                                            }}
                                            tickFormatter={(v) => `R$${v}k`}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            cursor={{
                                                fill:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "rgba(15,23,42,0.38)"
                                                        : "rgba(148,163,184,0.16)",
                                            }}
                                            contentStyle={{
                                                borderRadius: 10,
                                                border: "1px solid var(--mui-palette-divider)",
                                                backgroundColor:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#0f172a"
                                                        : "#ffffff",
                                                color:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#e2e8f0"
                                                        : "#0f172a",
                                            }}
                                            labelStyle={{
                                                color:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#cbd5e1"
                                                        : "#334155",
                                                fontWeight: 600,
                                            }}
                                            itemStyle={{
                                                color:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#e2e8f0"
                                                        : "#1e293b",
                                                fontWeight: 600,
                                            }}
                                        />
                                        <Bar
                                            dataKey="receitas"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={18}
                                        >
                                            {cashFlowData.map((_, idx) => (
                                                <Cell
                                                    key={`r-${idx}`}
                                                    fill="#3b82f6"
                                                />
                                            ))}
                                        </Bar>
                                        <Bar
                                            dataKey="despesas"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={18}
                                        >
                                            {cashFlowData.map((_, idx) => (
                                                <Cell
                                                    key={`d-${idx}`}
                                                    fill="#ef4444"
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>

                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={0.6}
                                >
                                    <Box
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: "999px",
                                            bgcolor: "#3b82f6",
                                        }}
                                    />
                                    <Typography
                                        fontSize="0.84rem"
                                        color="text.secondary"
                                    >
                                        {isEn ? "Income" : "Receitas"}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={0.6}
                                >
                                    <Box
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: "999px",
                                            bgcolor: "#ef4444",
                                        }}
                                    />
                                    <Typography
                                        fontSize="0.84rem"
                                        color="text.secondary"
                                    >
                                        {isEn ? "Expenses" : "Despesas"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Box>

                    <Paper sx={panelStyle}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                px: 2,
                                py: 1.7,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography
                                fontWeight={700}
                                fontSize="1.15rem"
                                color="text.primary"
                            >
                                {isEn
                                    ? "Recent Transactions"
                                    : "Transações Recentes"}
                            </Typography>
                            <Button
                                startIcon={<Icon icon="mdi:filter-variant" />}
                                sx={{ textTransform: "none", color: "#4b6283" }}
                            >
                                {isEn ? "Filter" : "Filtrar"}
                            </Button>
                        </Stack>

                        {transactions.map((tx) => {
                            const isEntry = tx.type === "entrada";
                            return (
                                <Stack
                                    key={tx.title}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{
                                        px: 2,
                                        py: 1.65,
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1.6}
                                        alignItems="center"
                                    >
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "999px",
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor: isEntry
                                                    ? "#dcfce7"
                                                    : "#fee2e2",
                                                color: isEntry
                                                    ? "#059669"
                                                    : "#ef4444",
                                            }}
                                        >
                                            <Icon
                                                icon={
                                                    isEntry
                                                        ? "mdi:arrow-bottom-right"
                                                        : "mdi:arrow-top-right"
                                                }
                                                width={17}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                fontWeight={600}
                                                color="text.primary"
                                            >
                                                {tx.title}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                fontSize="0.88rem"
                                            >
                                                {tx.meta}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography
                                        fontWeight={700}
                                        color={isEntry ? "#059669" : "#1f2937"}
                                    >
                                        {tx.amount}
                                    </Typography>
                                </Stack>
                            );
                        })}

                        <Box sx={{ py: 1.5, textAlign: "center" }}>
                            <Link href="/finance/transactions" style={{ textDecoration: "none" }}>
                                <Typography
                                    color="primary.main"
                                    sx={{ cursor: "pointer", fontSize: "0.92rem" }}
                                >
                                    {isEn
                                        ? "View All Transactions"
                                        : "Ver Todas as Transações"}
                                </Typography>
                            </Link>
                        </Box>
                    </Paper>
                </Container>
            </Box>

            <Modal
                open={openTransaction}
                onClose={handleCloseTransactionModal}
                variant="newFinance"
                onSubmit={handleTransactionSubmit}
            />
        </Box>
    );
}

const panelStyle = {
    color: "text.primary",
    bgcolor: "background.paper",
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "divider",
    boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
    overflow: "hidden",
};

const selectStyle = {
    minWidth: 146,
    borderRadius: "10px",
    color: "text.secondary",
    ".MuiOutlinedInput-notchedOutline": {
        borderColor: "divider",
    },
};
