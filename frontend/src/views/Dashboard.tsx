"use client";

import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { Modal } from "@/componentes/Modal";
import { StatCard } from "@/componentes/StatCard";
import { FinanceChart } from "@/componentes/FinanceChart";
import { TodayAgenda } from "@/componentes/Agenda";
import { HeaderDashboard } from "@/componentes/HeaderADM";
import { SidebarDashboard } from "@/componentes/Sidebar";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationsContext";
import { useAppLanguage } from "@/theme/ThemeRegistry";

export default function DashboardView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const agenda = [
        {
            time: "09:00",
            client: "Acme Corp",
            description: "Consultoria",
        },
        {
            time: "11:30",
            client: "Maria Oliveira",
            description: "Revisão",
        },
        {
            time: "14:00",
            client: "João Santos",
            description: "Audiência",
        },
    ];
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState<"newCase" | "newClient">("newCase");
    const { addNotification } = useNotifications();

    return (
        <Box
            sx={{
                bgcolor: "background.default",
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
                                color="text.primary"
                                sx={{ mb: 0.2 }}
                            >
                                {isEn ? "Dashboard" : "Painel"}
                            </Typography>
                            <Typography color="text.secondary" fontSize="0.93rem">
                                {isEn ? "Welcome back." : "Bem-vindo de volta."}
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
                            {isEn ? "New Case" : "Novo Caso"}
                        </Button>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={2.2}
                        mb={3}
                    >
                        <StatCard
                            title={isEn ? "Total Clients" : "Total de Clientes"}
                            value="1.248"
                            trendText={isEn ? "↗ +12% this month" : "↗ +12% este mês"}
                            icon="mdi:account-group-outline"
                            iconBg="#dbeafe"
                            iconColor="#2563eb"
                        />
                        <StatCard
                            title={isEn ? "Current Balance" : "Saldo Atual"}
                            value="R$ 145.200"
                            trendText={isEn ? "↗ +8% vs last month" : "↗ +8% vs mês passado"}
                            icon="mdi:currency-usd"
                            iconBg="#d1fae5"
                            iconColor="#059669"
                        />
                        <StatCard
                            title={isEn ? "Today's Appointments" : "Compromissos de Hoje"}
                            value="4"
                            helperText={isEn ? "2 pending, 2 completed" : "2 pendentes, 2 concluídos"}
                            icon="mdi:calendar-blank-outline"
                            iconBg="#ffedd5"
                            iconColor="#f97316"
                        />
                        <StatCard
                            title={isEn ? "Monthly Revenue" : "Receita Mensal"}
                            value="R$ 32.450"
                            trendText={isEn ? "↘ -2% vs last month" : "↘ -2% vs mês passado"}
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
                onSubmit={(modalVariant) => {
                    if (modalVariant === "newCase") {
                        addNotification({
                            title: "Novo caso criado",
                            description: isEn
                                ? "A new case was added to the dashboard."
                                : "Um novo caso foi adicionado no painel.",
                        });
                    }
                }}
            />
        </Box>
    );
}
