"use client";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";

type Variant = "newCase" | "newClient";

interface Props {
  open: boolean;
  onClose: () => void;
  variant: Variant;
}

export function Modal({ open, onClose, variant }: Props) {
  const variants = {
    newCase: {
      title: "Novo Caso",
      subtitle: "Cadastre um novo caso no sistema",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
      fields: [
        { name: "cliente", label: "Cliente", type: "text" },
        { name: "descricao", label: "Descrição", type: "textarea" },
      ],
    },

    newClient: {
      title: "Novo Cliente",
      subtitle: "Adicione um novo cliente",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      fields: [
        { name: "nome", label: "Nome", type: "text" },
        { name: "cpf", label: "CPF", type: "text" },
        { name: "email", label: "E-mail", type: "email" },
        { name: "telefone", label: "Telefone", type: "text" },
      ],
    },
  };

  const current = variants[variant];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogContent sx={{ p: 0 }}>
        <Box display="flex" height={500}>
          
          {/* LADO ESQUERDO (IMAGEM) */}
          <Box
            sx={{
              width: "40%",
              backgroundImage: `url(${current.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: { xs: "none", md: "block" },
            }}
          >
            {/* overlay escuro */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.5)",
              }}
            />

            {/* texto */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                color: "#fff",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                LawManager
              </Typography>
              <Typography variant="body2">
                Gestão jurídica inteligente
              </Typography>
            </Box>
          </Box>

          {/* LADO DIREITO (FORM) */}
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              p: 4,
              position: "relative",
            }}
          >
            {/* botão fechar */}
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              <Icon icon="mdi:close" />
            </IconButton>

            {/* título */}
            <Typography variant="h5" fontWeight="bold" mb={1}>
              {current.title}
            </Typography>

            <Typography color="text.secondary" mb={3}>
              {current.subtitle}
            </Typography>

            {/* campos */}
            <Stack spacing={2}>
              {current.fields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? 3 : 1}
                  type={field.type !== "textarea" ? field.type : "text"}
                />
              ))}

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.2,
                  bgcolor: "#2563eb",
                  "&:hover": { bgcolor: "#1d4ed8" },
                }}
              >
                Salvar
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
