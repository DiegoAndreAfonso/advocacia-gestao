import { Box, Container, Typography, Stack } from '@mui/material'

const stats = [
  { value: '25+', label: 'Anos de Experiência' },
  { value: '1.200+', label: 'Clientes Atendidos' },
  { value: 'R$ 50M+', label: 'Economizados' },
  { value: '98%', label: 'Taxa de Sucesso' }
]

export function StatsSection() {
  return (
    <Box py={8} bgcolor="#fff">
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
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
  )
}