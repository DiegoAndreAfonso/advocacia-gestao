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
    Skeleton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslate";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function PrivacyTermsModal({ open, onClose }: Props) {
    const { language } = useLanguage();
    const t = useTranslate();
    const [ready, setReady] = useState(true);

    const baseSections = useMemo(
        () => [
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
        ],
        [],
    );

    const [sections, setSections] = useState(() => baseSections);

    useEffect(() => {
        let cancelled = false;
        if (!open) return;

        if (language === "pt") {
            queueMicrotask(() => {
                setSections(baseSections);
                setReady(true);
            });
            return;
        }

        queueMicrotask(() => {
            setReady(false);
        });
        const texts = [
            "Termo de Privacidade",
            "Fechar",
            ...baseSections.flatMap((s) => [s.title, s.body]),
        ];

        t.prefetch(texts)
            .then(() => {
                if (cancelled) return;
                setSections(
                    baseSections.map((s) => ({
                        title: t(s.title),
                        body: t(s.body),
                    })),
                );
            })
            .catch(() => {
                if (cancelled) return;
                setSections(baseSections);
            })
            .finally(() => {
                if (!cancelled) setReady(true);
            });

        return () => {
            cancelled = true;
        };
    }, [baseSections, language, open, t]);

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
                    {t("Termo de Privacidade")}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <Icon icon="mdi:close" width={18} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ px: 3, py: 1.5 }}>
                <Stack spacing={2}>
                    {!ready ? (
                        <>
                            <Skeleton variant="text" width={180} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </>
                    ) : (
                        sections.map((section) => (
                            <Stack key={section.title} spacing={0.4}>
                                <Typography fontWeight={600} fontSize="0.95rem">
                                    {section.title}
                                </Typography>
                                <Typography color="text.secondary" lineHeight={1.6}>
                                    {section.body}
                                </Typography>
                            </Stack>
                        ))
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained" fullWidth>
                    {t("Fechar")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
