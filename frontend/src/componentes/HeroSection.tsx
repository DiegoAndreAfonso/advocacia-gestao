"use client";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

export function HeroSection() {
    return (
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
    );
}
