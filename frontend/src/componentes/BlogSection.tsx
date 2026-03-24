'use client'

import { Box, Container, Typography, Stack } from '@mui/material'
import { Icon } from '@iconify/react'

const posts = [
  {
    title: 'Entendendo as Mudanças Tributárias em 2026',
    description:
      'Um guia completo sobre as novas regulamentações fiscais que afetam médias e grandes empresas.',
    category: 'Direito Tributário',
    date: '20 de Outubro, 2025',
    author: 'Dra. Elena Silva',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Direito do Trabalho: Políticas de Trabalho Remoto',
    description:
      'Considerações essenciais para empregadores ao elaborar acordos permanentes.',
    category: 'Direito Trabalhista',
    date: '15 de Outubro, 2025',
    author: 'Dr. Roberto Alves',
    image:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Propriedade Intelectual na Era da IA',
    description:
      'Como proteger seus ativos digitais e lidar com disputas envolvendo tecnologia.',
    category: 'Propriedade Intelectual',
    date: '10 de Outubro, 2025',
    author: 'Dr. Marcos Santos',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  }
]

export function BlogSection() {
  return (
    <Box py={10} bgcolor="#f8fafc">
      <Container>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight="bold">
            Publicações Recentes
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Mantenha-se atualizado com nossos artigos sobre as últimas mudanças
            na legislação e jurisprudência.
          </Typography>
        </Box>

        {/* Cards */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={4}
          justifyContent="center"
        >
          {posts.map((post, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: '100%', md: '30%' },
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: '#fff',
                border: '1px solid #e2e8f0',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-6px)'
                }
              }}
            >
              {/* Imagem */}
              <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover'
                }}
              />

              {/* Conteúdo */}
              <Box p={3}>
                {/* Categoria + Data */}
                <Stack direction="row" spacing={2} mb={2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: '#eff6ff',
                      color: '#2563eb',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 5,
                      fontSize: 12,
                      fontWeight: 500
                    }}
                  >
                    {post.category}
                  </Box>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Icon icon="mdi:calendar" width={16} />
                    <Typography variant="caption">
                      {post.date}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Título */}
                <Typography fontWeight="bold" mb={1}>
                  {post.title}
                </Typography>

                {/* Descrição */}
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {post.description}
                </Typography>

                {/* Autor */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon icon="mdi:account" width={16} />
                  <Typography variant="caption">
                    {post.author}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}