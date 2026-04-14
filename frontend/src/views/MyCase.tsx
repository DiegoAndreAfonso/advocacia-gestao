"use client";

import Link from "next/link";
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { listCasesByClient } from "@/data/cases";
import { useAppLanguage } from "@/theme/ThemeRegistry";

export default function MyCaseView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";
    const myCases = listCasesByClient("cliente");

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
                <HeaderDashboard showSearch={false} />

                <Container
                    maxWidth={false}
                    sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}
                >
                    <Box mb={2.2}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            color="text.primary"
                        >
                            {isEn ? "My Cases" : "Meus Casos"}
                        </Typography>
                        <Typography color="text.secondary" fontSize="0.92rem">
                            {isEn
                                ? "Select a case to view detailed tracking."
                                : "Selecione um caso para ver o acompanhamento detalhado."}
                        </Typography>
                    </Box>

                    <Stack spacing={1.4}>
                        {myCases.map((item) => (
                            <Paper
                                key={item.caseSlug}
                                sx={{
                                    borderRadius: "12px",
                                    p: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow:
                                        "0 1px 2px rgba(15,23,42,0.06)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography
                                        fontWeight={700}
                                        color="text.primary"
                                    >
                                        {item.caseTitle}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        fontSize="0.86rem"
                                    >
                                        {isEn ? "Case:" : "Processo:"}{" "}
                                        {item.processNumber}
                                    </Typography>
                                </Box>

                                <Button
                                    component={Link}
                                    href={`/acompanhamento/cliente/${item.caseSlug}`}
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "10px",
                                    }}
                                >
                                    {isEn ? "Track" : "Acompanhar"}
                                </Button>
                            </Paper>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
