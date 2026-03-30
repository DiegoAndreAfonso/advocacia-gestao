"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";
import { publicacoes } from "@/data/publicacoes";
import { useAppLanguage } from "@/theme/ThemeRegistry";

export default function HomeView() {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";

    const areas = [
        "Direito Tributário",
        "Direito Empresarial",
        "Direito Trabalhista",
        "Contratos",
        "Direito Civil",
        "Direito Digital",
    ];

    const stats = [
        { value: "25+", label: "Anos de Experiência" },
        { value: "1.200+", label: "Clientes Atendidos" },
        { value: "R$ 50M+", label: "Economizados" },
        { value: "98%", label: "Taxa de Sucesso" },
    ];

    const posts = [
        {
            title: "Entendendo as Mudanças Tributárias em 2026",
            description:
                "Um guia completo sobre as novas regulamentações fiscais que afetam médias e grandes empresas.",
            category: "Direito Tributário",
            date: "20 de Outubro, 2025",
            author: "Dra. Elena Silva",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
            href: `/publicacoes/${publicacoes[0]?.slug || ""}`,
        },
        {
            title: "Direito do Trabalho: Políticas de Trabalho Remoto",
            description:
                "Considerações essenciais para empregadores ao elaborar acordos permanentes.",
            category: "Direito Trabalhista",
            date: "15 de Outubro, 2025",
            author: "Dr. Roberto Alves",
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
            href: `/publicacoes/${publicacoes[1]?.slug || ""}`,
        },
        {
            title: "Propriedade Intelectual na Era da IA",
            description:
                "Como proteger seus ativos digitais e lidar com disputas envolvendo tecnologia.",
            category: "Propriedade Intelectual",
            date: "10 de Outubro, 2025",
            author: "Dr. Marcos Santos",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
            href: `/publicacoes/${publicacoes[2]?.slug || ""}`,
        },
    ];

    return (
        <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
            <Header isAuthenticated={true} userName="Diego" />
            <Box
                sx={{
                    background:
                        "linear-gradient(to right, #0f172a, #1e293b, #1e3a8a)",
                    color: "#fff",
                    py: 10,
                }}
            >
                <Container maxWidth="lg">
                    <Box maxWidth={600}>
                        <Typography variant="h3" fontWeight="bold" mb={3}>
                            {isEn
                                ? "Tax and Business Law"
                                : "Direito Tributário e Empresarial"}
                        </Typography>

                        <Typography variant="h6" sx={{ opacity: 0.8 }} mb={4}>
                            {isEn
                                ? "Specialists in corporate legal solutions..."
                                : "Especialistas em soluções jurídicas corporativas..."}
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Button
                                component={Link}
                                href="#contato"
                                variant="contained"
                            >
                                {isEn
                                    ? "Free Consultation"
                                    : "Consulta Gratuita"}
                            </Button>
                            <Button
                                component={Link}
                                href="/login"
                                variant="outlined"
                                sx={{ color: "#fff", borderColor: "#fff" }}
                            >
                                {isEn
                                    ? "Track Your Case"
                                    : "Acompanhe seu Caso"}
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>
            <Box py={8} bgcolor="background.paper">
                <Container>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={4}
                        justifyContent="space-between"
                    >
                        {stats.map((item, i) => (
                            <Box key={i} textAlign="center" flex={1}>
                                <Typography variant="h4" color="primary">
                                    {item.value}
                                </Typography>
                                <Typography>{item.label}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>
            <Box
                id="areas"
                sx={{ scrollMarginTop: "80px" }}
                py={8}
                bgcolor="background.default"
            >
                <Container>
                    <Typography variant="h4" textAlign="center" mb={4}>
                        {isEn ? "Practice Areas" : "Áreas de Atuação"}
                    </Typography>

                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={2}
                        justifyContent="center"
                    >
                        {areas.map((area, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: { xs: "45%", md: "22%" },
                                    p: 3,
                                    textAlign: "center",
                                    borderRadius: 2,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    "&:hover": { boxShadow: 2 },
                                }}
                            >
                                <Typography fontWeight="bold">
                                    {area}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>
            <Box
                id="publicacoes"
                sx={{ scrollMarginTop: "80px" }}
                py={10}
                bgcolor="background.default"
            >
                <Container>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h4" fontWeight="bold">
                            {isEn
                                ? "Recent Publications"
                                : "Publicações Recentes"}
                        </Typography>

                        <Typography color="text.secondary" mt={1}>
                            {isEn
                                ? "Stay updated with our articles on the latest legal and jurisprudence changes."
                                : "Mantenha-se atualizado com nossos artigos sobre as últimas mudanças na legislação e jurisprudência."}
                        </Typography>
                    </Box>

                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={4}
                        justifyContent="center"
                    >
                        {posts.map((post, i) => (
                            <PostCard key={i} post={post} />
                        ))}
                    </Stack>
                </Container>
            </Box>
            <Box id="contato" bgcolor="background.default">
                <Footer />
            </Box>
        </Box>
    );
}
