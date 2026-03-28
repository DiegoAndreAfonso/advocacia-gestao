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
        bgcolor: "#fff",
        boxShadow: 1,
        width: 300,
      }}
    >
      <Typography fontWeight="bold" mb={2}>
        Agenda de Hoje
      </Typography>

      <Stack spacing={2}>
        {items.map((item, i) => (
          <Box key={i}>
            <Typography fontWeight="bold">{item.time}</Typography>
            <Typography>{item.client}</Typography>
            <Typography variant="caption" color="text.secondary">
              {item.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}