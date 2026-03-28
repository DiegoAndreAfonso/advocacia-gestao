"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Jan", receita: 4000, despesa: 2400 },
  { name: "Fev", receita: 3000, despesa: 1398 },
  { name: "Mar", receita: 9800, despesa: 2000 },
  { name: "Abr", receita: 3900, despesa: 2800 },
  { name: "Mai", receita: 4800, despesa: 1800 },
  { name: "Jun", receita: 3800, despesa: 2300 },
  { name: "Jul", receita: 4300, despesa: 3200 },
];

export function FinanceChart() {
  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 3,
        bgcolor: "#fff",
        boxShadow: 1,
        height: 350,
      }}
    >
      <Typography fontWeight="bold" mb={2}>
        Receitas vs Despesas
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="receita"
            stroke="#2563eb"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="despesa"
            stroke="#ef4444"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}