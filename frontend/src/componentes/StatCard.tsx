import { Box, Typography, Stack } from "@mui/material";
import { Icon } from "@iconify/react";

interface StatCardProps {
    title: string;
    value: string;
    helperText?: string;
    trendText?: string;
    trendColor?: string;
    icon?: string;
    iconBg?: string;
    iconColor?: string;
}

export function StatCard({
    title,
    value,
    helperText,
    trendText,
    trendColor = "#059669",
    icon = "mdi:chart-line",
    iconBg = "#e2e8f0",
    iconColor = "#334155",
}: StatCardProps) {
    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 230,
                p: 2.5,
                borderRadius: "12px",
                bgcolor: "#fff",
                border: "1px solid #dbe3ef",
                boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography fontSize="0.92rem" color="#526b8f" mb={1.8}>
                    {title}
                </Typography>

                <Box
                    sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        bgcolor: iconBg,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <Icon icon={icon} width={18} color={iconColor} />
                </Box>
            </Stack>

            <Typography fontSize="2rem" fontWeight={700} color="#0f172a" lineHeight={1.2}>
                {value}
            </Typography>

            {trendText && (
                <Typography fontSize="0.8rem" color={trendColor} mt={0.8} fontWeight={600}>
                    {trendText}
                </Typography>
            )}

            {helperText && (
                <Typography fontSize="0.78rem" color="#6b7f9d" mt={0.45}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
}
