"use client";

import { Box, Typography, Stack } from "@mui/material";
import { Icon } from "@iconify/react";

type Post = {
    title: string;
    description: string;
    category: string;
    date: string;
    author: string;
    image: string;
};

type Props = {
    post: Post;
};

export function PostCard({ post }: Props) {
    return (
        <Box
            sx={{
                width: { xs: "100%", md: "30%" },
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#fff",
                border: "1px solid #e2e8f0",
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-6px)",
                },
                "&:hover img": {
                    transform: "scale(1.05)",
                },
            }}
        >
            <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    transition: "0.4s",
                }}
            />

            <Box p={3}>
                <Stack direction="row" spacing={2} mb={2} alignItems="center">
                    <Box
                        sx={{
                            bgcolor: "#eff6ff",
                            color: "#2563eb",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 5,
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        {post.category}
                    </Box>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Icon icon="mdi:calendar" width={16} />
                        <Typography variant="caption">{post.date}</Typography>
                    </Stack>
                </Stack>

                <Typography fontWeight="bold" mb={1}>
                    {post.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    {post.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Icon icon="mdi:account" width={16} />
                    <Typography variant="caption">{post.author}</Typography>
                </Stack>
            </Box>
        </Box>
    );
}
