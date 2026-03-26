"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Header } from "@/componentes/Header";
import { Footer } from "@/componentes/Footer";
import { PostCard } from "@/componentes/PostCard";
import Link from "next/link";
export default function HomeView() {
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
        },
        {
            title: "Direito do Trabalho: Políticas de Trabalho Remoto",
            description:
                "Considerações essenciais para empregadores ao elaborar acordos permanentes.",
            category: "Direito Trabalhista",
            date: "15 de Outubro, 2025",
            author: "Dr. Roberto Alves",
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Propriedade Intelectual na Era da IA",
            description:
                "Como proteger seus ativos digitais e lidar com disputas envolvendo tecnologia.",
            category: "Propriedade Intelectual",
            date: "10 de Outubro, 2025",
            author: "Dr. Marcos Santos",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        },
    ];

    return (
        <Box>
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
                            Direito Tributário e Empresarial
                        </Typography>

                        <Typography variant="h6" sx={{ opacity: 0.8 }} mb={4}>
                            Especialistas em soluções jurídicas corporativas...
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Button
                                component={Link}
                                href="#contato"
                                variant="contained"
                            >
                                Consulta Gratuita
                            </Button>
                            <Button
                                component={Link}
                                href="/login"
                                variant="outlined"
                                sx={{ color: "#fff", borderColor: "#fff" }}
                            >
                                Acompanhe seu Caso
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>
            <Box py={8} bgcolor="#fff">
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
                bgcolor="#f8fafc"
            >
                <Container>
                    <Typography variant="h4" textAlign="center" mb={4}>
                        Áreas de Atuação
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
                                    bgcolor: "#fff",
                                    border: "1px solid #e2e8f0",
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
                bgcolor="#f8fafc"
            >
                <Container>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h4" fontWeight="bold">
                            Publicações Recentes
                        </Typography>

                        <Typography color="text.secondary" mt={1}>
                            Mantenha-se atualizado com nossos artigos sobre as
                            últimas mudanças na legislação e jurisprudência.
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
            <Box id="contato" bgcolor="#f8fafc">
                <Footer />
            </Box>
        </Box>
    );
}
