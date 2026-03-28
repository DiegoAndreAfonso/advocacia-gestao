"use client";

import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { Modal } from "@/componentes/Modal";
import { StatCard } from "@/componentes/StatCard";
import { FinanceChart } from "@/componentes/FinanceChart";
import { TodayAgenda } from "@/componentes/Agenda";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { useState } from "react";

export default function DashboardView() {
    const agenda = [
        { time: "09:00", client: "Acme Corp", description: "Consultoria" },
        { time: "11:30", client: "Maria Oliveira", description: "Revisão" },
        { time: "14:00", client: "João Santos", description: "Audiência" },
    ];
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<"newCase" | "newClient">("newCase");

    return (
        <Box
            sx={{
                bgcolor: "#f1f5f9",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="painel" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}>
                    <Stack direction="row" justifyContent="space-between" mb={4}>
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                color="#18263c"
                                sx={{ mb: 0.2 }}
                            >
                                Painel
                            </Typography>
                            <Typography color="#60738f" fontSize="0.93rem">
                                Bem-vindo de volta.
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            onClick={() => {
                                setVariant("newCase");
                                setOpen(true);
                            }}
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px",
                                px: 2.2,
                                fontWeight: 600,
                            }}
                        >
                            Novo Caso
                        </Button>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={2.2}
                        mb={3}
                    >
                        <StatCard
                            title="Total de Clientes"
                            value="1.248"
                            trendText="↗ +12% este mês"
                            icon="mdi:account-group-outline"
                            iconBg="#dbeafe"
                            iconColor="#2563eb"
                        />
                        <StatCard
                            title="Saldo Atual"
                            value="R$ 145.200"
                            trendText="↗ +8% vs mês passado"
                            icon="mdi:currency-usd"
                            iconBg="#d1fae5"
                            iconColor="#059669"
                        />
                        <StatCard
                            title="Compromissos de Hoje"
                            value="4"
                            helperText="2 pendentes, 2 concluídos"
                            icon="mdi:calendar-blank-outline"
                            iconBg="#ffedd5"
                            iconColor="#f97316"
                        />
                        <StatCard
                            title="Receita Mensal"
                            value="R$ 32.450"
                            trendText="↘ -2% vs mês passado"
                            trendColor="#dc2626"
                            icon="mdi:chart-line"
                            iconBg="#f3e8ff"
                            iconColor="#9333ea"
                        />
                    </Stack>

                    <Stack direction={{ xs: "column", xl: "row" }} spacing={2.2}>
                        <FinanceChart />
                        <TodayAgenda items={agenda} />
                    </Stack>
                </Container>
            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                variant={variant}
            />
        </Box>
    );
}
