import { Box, Container, Typography, Button, Stack } from '@mui/material'
import Link from 'next/link'
import { Icon } from '@iconify/react'

export function Header() {
  return (
    <Box sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: '#fff', width: '100%' }}>
  <Container maxWidth="xl" disableGutters sx={{ px: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ bgcolor: '#2563eb', p: 1, borderRadius: 2 }}>
              <Icon icon="mdi:scale-balance" color="#fff" />
            </Box>
            <Box>
              <Typography fontWeight="bold">LawManager</Typography>
              <Typography variant="caption">Advocacia & Consultoria</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Link href="/login">
              <Button>Área do Cliente</Button>
            </Link>

            <Link href="/login?tipo=advogado">
              <Button variant="contained">
                Login Advogado
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}