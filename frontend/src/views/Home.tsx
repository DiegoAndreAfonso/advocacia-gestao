import { Box } from '@mui/material'
import { HeroSection } from '@/componentes/HeroSection'
import { StatsSection } from '@/componentes/StatsSection'
import { AreasSection } from '@/componentes/AreasSection'
import { BlogSection } from '@/componentes/BlogSection'
import { Header } from '@/componentes/Header'
import { Footer } from '@/componentes/Footer'

export default function HomeView() {
  return (
    <Box>
      <Header/>
      <HeroSection />
      <StatsSection />
      <AreasSection />
      <BlogSection />
      <Footer/>
    </Box>
  )
}