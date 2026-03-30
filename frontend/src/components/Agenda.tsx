import { Box, Typography, Stack } from "@mui/material";

interface Item {
    time: string;
    client: string;
    description: string;
}

export function TodayAgenda({ items }: { items: Item[] }) {
    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
                width: 300,
            }}
        >
            <Typography fontWeight="bold" mb={2} color="text.primary">
                Agenda de Hoje
            </Typography>

            <Stack spacing={2}>
                {items.map((item, i) => (
                    <Box key={i}>
                        <Typography fontWeight="bold" color="text.primary">
                            {item.time}
                        </Typography>
                        <Typography color="text.primary">
                            {item.client}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {item.description}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
