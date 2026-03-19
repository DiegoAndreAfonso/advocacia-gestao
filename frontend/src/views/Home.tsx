
import { Box, Button, Container, Typography, Stack } from '@mui/material'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function HomeView() {
  return (
    <Box>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a192f, #112240)',
          color: '#fff'
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h3" fontWeight="bold">
              Sistema de Gestão Jurídica
            </Typography>

            <Typography variant="h6" sx={{ opacity: 0.85 }}>
              Organize processos, clientes e prazos com eficiência e segurança
            </Typography>

            <Stack direction="row" spacing={2}>
              <Link href="/clientes">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Icon icon="mdi:scale-balance" />}
                  sx={{
                    backgroundColor: '#2563eb',
                    '&:hover': { backgroundColor: '#1d4ed8' }
                  }}
                >
                  Acessar Sistema
                </Button>
              </Link>

              <Button
                variant="outlined"
                size="large"
                startIcon={<Icon icon="mdi:information-outline" />}
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': { borderColor: '#93c5fd', color: '#93c5fd' }
                }}
              >
                Saiba mais
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 10 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Funcionalidades do Sistema
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          mt={5}
        >
          <Feature
            icon="mdi:account-tie"
            title="Gestão de Clientes"
            description="Cadastre e acompanhe todos os seus clientes em um só lugar"
          />

          <Feature
            icon="mdi:gavel"
            title="Controle de Processos"
            description="Gerencie processos jurídicos com organização e precisão"
          />

          <Feature
            icon="mdi:calendar-clock"
            title="Prazos e Audiências"
            description="Nunca perca prazos importantes com controle inteligente"
          />
        </Stack>
      </Container>
    </Box>
  )
}

function Feature({ icon, title, description }: any) {
  return (
    <Box
      textAlign="center"
      flex={1}
      sx={{
        p: 3,
        borderRadius: 2,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Icon icon={icon} width={40} />

      <Typography variant="h6" mt={2}>
        {title}
      </Typography>

      <Typography variant="body2" mt={1}>
        {description}
      </Typography>
    </Box>
  )
}