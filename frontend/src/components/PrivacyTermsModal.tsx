"use client";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useAppLanguage } from "@/theme/ThemeRegistry";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function PrivacyTermsModal({ open, onClose }: Props) {
    const { language } = useAppLanguage();
    const isEn = language === "en-US";

    const sections = isEn
        ? [
              {
                  title: "Purpose of processing",
                  body: "We process personal data only to deliver the services you request, answer your questions, and keep you informed about case updates.",
              },
              {
                  title: "Data sharing",
                  body: "We share information with trusted partners or authorities only when required for legal compliance or to execute a requested service.",
              },
              {
                  title: "Security and rights",
                  body: "Access is limited, transmissions are protected, and you can always review, correct, or delete your personal information.",
              },
          ]
        : [
              {
                  title: "Finalidade do tratamento",
                  body: "Processamos dados pessoais apenas para entregar os serviços solicitados, responder às suas dúvidas e informar sobre o andamento dos casos.",
              },
              {
                  title: "Compartilhamento",
                  body: "Compartilhamos informações com parceiros confiáveis ou autoridades somente quando necessário para cumprir a lei ou executar um serviço solicitado.",
              },
              {
                  title: "Segurança e direitos",
                  body: "O acesso é restrito, as transmissões são protegidas e você pode consultar, corrigir ou excluir seus dados a qualquer momento.",
              },
          ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 3,
                }}
            >
                <Typography fontWeight={700} fontSize="1.15rem">
                    {isEn ? "Privacy Terms" : "Termo de Privacidade"}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <Icon icon="mdi:close" width={18} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ px: 3, py: 1.5 }}>
                <Stack spacing={2}>
                    {sections.map((section) => (
                        <Stack key={section.title} spacing={0.4}>
                            <Typography fontWeight={600} fontSize="0.95rem">
                                {section.title}
                            </Typography>
                            <Typography color="text.secondary" lineHeight={1.6}>
                                {section.body}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained" fullWidth>
                    {isEn ? "Close" : "Fechar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
