import { Box, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Box
      textAlign="center"
      flex={1}
      sx={{
        p: 3,
        borderRadius: 2,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Icon icon={icon} width={40} />

      <Typography variant="h6" mt={2}>
        {title}
      </Typography>

      <Typography variant="body2" mt={1}>
        {description}
      </Typography>
    </Box>
  )
}