'use client'

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function LoginView() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f1f5f9"
    >
      <Stack spacing={3} alignItems="center">

        {/* Logo */}
        <Box
          sx={{
            bgcolor: '#2563eb',
            p: 1.5,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Icon icon="mdi:scale-balance" color="#fff" width={24} />
        </Box>

        {/* Título */}
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            LawManager
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faça login para acessar sua conta
          </Typography>
        </Box>

        {/* Card */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: 400,
            borderRadius: 3
          }}
        >
          <Stack spacing={2}>

            {/* Email */}
            <TextField
              label="E-mail"
              placeholder="seu@email.com"
              fullWidth
              InputProps={{
                startAdornment: (
                  <Icon icon="mdi:email-outline" width={20} />
                )
              }}
            />

            {/* Senha */}
            <TextField
              label="Senha"
              type="password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <Icon icon="mdi:lock-outline" width={20} />
                )
              }}
            />

            {/* Opções */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Lembrar-me"
              />

              <Typography
                variant="body2"
                component={Link}
                href="#"
                sx={{ color: '#2563eb', textDecoration: 'none' }}
              >
                Esqueceu a senha?
              </Typography>
            </Stack>

            {/* Botão */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.2,
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' }
              }}
              endIcon={<Icon icon="mdi:arrow-right" />}
            >
              Entrar
            </Button>

            {/* Divider fake */}
            <Typography textAlign="center" variant="body2" color="text.secondary">
              Novo por aqui?
            </Typography>

            {/* Criar conta */}
            <Button variant="outlined" fullWidth>
              Criar uma conta
            </Button>

            {/* Voltar */}
            <Typography
              textAlign="center"
              variant="body2"
              component={Link}
              href="/"
              sx={{ textDecoration: 'none', color: 'text.secondary' }}
            >
              ← Voltar para o site
            </Typography>

          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}