import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import ThemeRegistry from "@/theme/ThemeRegistry";

export const metadata: Metadata = {
    title: "Advocacia Gestão - Sistema de Gestão Jurídica",
    description:
        "Sistema de gestão jurídica para advogados e escritórios de advocacia, com controle de clientes, processos e prazos.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body style={{ margin: 0 }}>
                <ThemeRegistry>
                    <Box
                        display="flex"
                        flexDirection="column"
                        minHeight="100vh"
                    >
                        <Box component="main" flex={1}>
                            {children}
                        </Box>
                    </Box>
                </ThemeRegistry>
            </body>
        </html>
    );
}
