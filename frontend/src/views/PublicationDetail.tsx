"use client";

import { Box, Container, Stack } from "@mui/material";
import { HeaderDashboard } from "@/components/HeaderADM";
import { SidebarDashboard } from "@/components/Sidebar";
import { PublicacaoHeader } from "@/components/publications/PublicacaoHeader";
import { PublicacaoConteudo } from "@/components/publications/PublicacaoConteudo";
import { PublicacaoAnexos } from "@/components/publications/PublicacaoAnexos";
import { PublicacaoItem } from "@/data/publicacoes";
import { useRouter } from "next/navigation";
import { useAppLanguage } from "@/theme/ThemeRegistry";

type Props = {
    publicacao: PublicacaoItem;
    canManage?: boolean;
};

export default function PublicationDetailView({
    publicacao,
    canManage = true,
}: Props) {
    const router = useRouter();
    const { language } = useAppLanguage();
    const isEn = language === "en-US";

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                display: "block",
            }}
        >
            <SidebarDashboard activeKey="publicacoes" />

            <Box sx={{ ml: { xs: 0, md: "280px" }, minWidth: 0 }}>
                <HeaderDashboard />

                <Container
                    maxWidth={false}
                    sx={{ px: { xs: 2, md: 4 }, py: 3.2 }}
                >
                    <PublicacaoHeader
                        canManage={canManage}
                        onEdit={() =>
                            router.push(
                                `/publicacoes/editar/${publicacao.slug}`,
                            )
                        }
                        onDelete={() => {
                            if (typeof window === "undefined") return;
                            const confirmed = window.confirm(
                                isEn
                                    ? "Are you sure you want to delete this publication?"
                                    : "Tem certeza que deseja excluir esta publicação?",
                            );
                            if (!confirmed) return;
                            router.push("/publicacoes");
                        }}
                        onShare={async () => {
                            if (typeof window === "undefined") return;

                            const url = window.location.href;
                            const nav = window.navigator as Navigator & {
                                share?: (data: ShareData) => Promise<void>;
                                clipboard?: {
                                    writeText: (text: string) => Promise<void>;
                                };
                            };

                            if (typeof nav.share === "function") {
                                await nav.share({
                                    title: publicacao.titulo,
                                    text: publicacao.resumo,
                                    url,
                                });
                                return;
                            }
                            if (nav.clipboard?.writeText) {
                                await nav.clipboard.writeText(url);
                                window.alert(
                                    isEn
                                        ? "Link copied to clipboard."
                                        : "Link copiado para a área de transferência.",
                                );
                                return;
                            }

                            window.prompt(
                                isEn ? "Copy this link:" : "Copie este link:",
                                url,
                            );
                        }}
                    />

                    <Stack spacing={2}>
                        <PublicacaoConteudo publicacao={publicacao} />
                        <PublicacaoAnexos publicacao={publicacao} />
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
