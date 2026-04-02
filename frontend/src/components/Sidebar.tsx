"use client";

import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { useAppLanguage } from "@/theme/ThemeRegistry";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  key: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
};

const mainItems: NavItem[] = [
  {
    key: "painel",
    label: "Painel",
    icon: "mdi:view-dashboard-outline",
    href: "/dashboard",
  },
  {
    key: "clientes",
    label: "Clientes",
    icon: "mdi:account-group-outline",
    href: "/clients",
  },
  {
    key: "agenda",
    label: "Agenda",
    icon: "mdi:calendar-month-outline",
    href: "/agenda",
  },
  {
    key: "financeiro",
    label: "Financeiro",
    icon: "mdi:currency-usd",
    href: "/finance",
  },
  {
    key: "publicacoes",
    label: "Publicações",
    icon: "mdi:newspaper-variant-outline",
    href: "/publicacoes",
  },
];

const bottomItems: NavItem[] = [
  {
    key: "perfil",
    label: "Meu Perfil",
    icon: "mdi:account-outline",
    href: "/profile",
  },
  {
    key: "sair",
    label: "Sair",
    icon: "mdi:logout",
  },
];

type SidebarItemProps = {
  item: NavItem;
  active: boolean;
};

function SidebarItem({ item, active }: SidebarItemProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <ButtonBase
      component={item.href ? Link : "button"}
      href={item.href}
      onClick={item.onClick}
      sx={{
        width: "100%",
        borderRadius: "12px",
        justifyContent: "flex-start",
        px: 1.6,
        py: 1.2,
        color: active ? "#ffffff" : isDark ? "#cbd5e1" : "#c4d0e6",
        bgcolor: active ? theme.palette.primary.main : "transparent",
        "&:hover": {
          bgcolor: active
            ? theme.palette.primary.main
            : isDark
              ? "rgba(148,163,184,0.2)"
              : "rgba(148,163,184,0.12)",
        },
      }}
    >
      <Icon icon={item.icon} width={21} />
      <Typography
        sx={{
          ml: 1.3,
          fontSize: "1rem",
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        {item.label}
      </Typography>
    </ButtonBase>
  );
}

type Props = {
  activeKey?: string;
};

export function SidebarDashboard({ activeKey }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { language } = useAppLanguage();
  const isEn = language === "en-US";
  const { logout } = useAuth();

  const translatedMainItems = mainItems.map((item) => ({
    ...item,
    label:
      item.key === "painel"
        ? isEn
          ? "Dashboard"
          : "Painel"
        : item.key === "clientes"
          ? isEn
            ? "Clients"
            : "Clientes"
          : item.key === "agenda"
            ? isEn
              ? "Calendar"
              : "Agenda"
            : item.key === "financeiro"
              ? isEn
                ? "Finance"
                : "Financeiro"
              : item.key === "publicacoes"
                ? isEn
                  ? "Publications"
                  : "Publicações"
                : item.label,
  }));

  const translatedBottomItems = bottomItems.map((item) => {
    if (item.key === "sair") {
      return {
        ...item,
        label: isEn ? "Sign out" : "Sair",
        href: undefined,
        onClick: () => {
          logout();
        },
      };
    }

    return {
      ...item,
      label:
        item.key === "perfil"
          ? isEn
            ? "My Profile"
            : "Meu Perfil"
          : item.label,
    };
  });

  return (
    <Box
      sx={{
        width: 280,
        height: "100dvh",
        bgcolor: isDark ? "#0b1220" : "#0a1834",
        borderRight: "1px solid",
        borderColor: isDark ? "#1e293b" : "#142746",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        flexShrink: 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
      }}
    >
      <Link href="/">
        <Box
          sx={{
            height: 80,
            px: 3,
            borderBottom: "1px solid",
            borderColor: isDark ? "#1e293b" : "#1f3358",
            display: "flex",
            alignItems: "center",
            gap: 1.2,
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "9px",
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
            }}
          >
            <Icon icon="mdi:scale-balance" width={20} color="#fff" />
          </Box>
          <Typography fontWeight={700} fontSize="1.1rem" color="#f8fafc">
            LawManager
          </Typography>
        </Box>
      </Link>

      <Box sx={{ px: 2, py: 2.5, flex: 1 }}>
        <Typography
          sx={{
            color: isDark ? "#94a3b8" : "#8da0c2",
            fontSize: "0.76rem",
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            mb: 1.2,
          }}
        >
          {isEn ? "Main Menu" : "Menu Principal"}
        </Typography>

        <Stack spacing={0.8}>
          {translatedMainItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              active={activeKey === item.key}
            />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 2.5,
          borderTop: "1px solid",
          borderColor: isDark ? "#1e293b" : "#1f3358",
          bgcolor: isDark ? "#0b1220" : "#0a1834",
          flexShrink: 0,
        }}
      >
        <Stack spacing={0.8}>
          {translatedBottomItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              active={activeKey === item.key}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
