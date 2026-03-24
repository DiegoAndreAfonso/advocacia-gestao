import { Box, Container, Typography, Stack } from '@mui/material'

const areas = [
  'Direito Tributário',
  'Direito Empresarial',
  'Direito Trabalhista',
  'Contratos',
  'Direito Civil',
  'Direito Digital'
]

export function AreasSection() {
  return (
    <Box py={8} bgcolor="#f8fafc">
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
                width: { xs: '45%', md: '22%' }, // responsivo
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: '#fff',
                border: '1px solid #e2e8f0',
                '&:hover': { boxShadow: 2 }
              }}
            >
              <Typography fontWeight="bold">{area}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}