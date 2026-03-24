import { Container, Typography, Stack } from '@mui/material'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Funcionalidades do Sistema
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mt={5}>
        <FeatureCard
          icon="mdi:account-tie"
          title="Gestão de Clientes"
          description="Cadastre e acompanhe todos os seus clientes em um só lugar"
        />

        <FeatureCard
          icon="mdi:gavel"
          title="Controle de Processos"
          description="Gerencie processos jurídicos com organização e precisão"
        />

        <FeatureCard
          icon="mdi:calendar-clock"
          title="Prazos e Audiências"
          description="Nunca perca prazos importantes com controle inteligente"
        />
      </Stack>
    </Container>
  )
}