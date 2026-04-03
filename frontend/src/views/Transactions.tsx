"use client";

import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationsContext";

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
];

export default function TransactionsView() {
    const [openTransaction, setOpenTransaction] = useState(false);
    const { addNotification } = useNotifications();

    const handleOpenTransactionModal = () => setOpenTransaction(true);
    const handleCloseTransactionModal = () => setOpenTransaction(false);
    const handleTransactionSubmit = () => {
        setOpenTransaction(false);
        addNotification({
            title: "Nova transação registrada",
            description: "A movimentação financeira foi adicionada com sucesso.",
        });
    };

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", display: "block" }}>
            <SidebarDashboard activeKey="financeiro" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.2}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="text.primary">
                                Transações
                            </Typography>
                            <Typography color="text.secondary" fontSize="0.95rem">
                                Lista completa de movimentações financeiras
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<Icon icon="mdi:plus" />}
                            sx={{ textTransform: "none", borderRadius: "12px" }}
                            onClick={handleOpenTransactionModal}
                        >
                            Nova Transação
                        </Button>
                    </Stack>

                    <Paper sx={{ borderRadius: "16px", border: "1px solid", borderColor: "divider", boxShadow: "0 1px 2px rgba(15,23,42,0.06)", overflow: "hidden" }}>
                        {transactions.map((tx) => {
                            const isEntry = tx.type === "entrada";
                            return (
                                <Stack key={tx.title} direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.65, borderBottom: "1px solid", borderColor: "divider" }}>
                                    <Stack direction="row" spacing={1.6} alignItems="center">
                                        <Box sx={{ width: 32, height: 32, borderRadius: "999px", display: "grid", placeItems: "center", bgcolor: isEntry ? "#dcfce7" : "#fee2e2", color: isEntry ? "#059669" : "#ef4444" }}>
                                            <Icon icon={isEntry ? "mdi:arrow-bottom-right" : "mdi:arrow-top-right"} width={17} />
                                        </Box>
                                        <Box>
                                            <Typography fontWeight={600} color="text.primary">{tx.title}</Typography>
                                            <Typography color="text.secondary" fontSize="0.88rem">{tx.meta}</Typography>
                                        </Box>
                                    </Stack>

                                    <Typography fontWeight={700} color={isEntry ? "#059669" : "#1f2937"}>{tx.amount}</Typography>
                                </Stack>
                            );
                        })}
                    </Paper>
                </Container>
            </Box>

            <Modal open={openTransaction} onClose={handleCloseTransactionModal} variant="newFinance" onSubmit={handleTransactionSubmit} />
        </Box>
    );
}
