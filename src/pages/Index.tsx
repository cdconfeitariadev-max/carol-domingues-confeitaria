import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PanettonesSection } from '@/components/PanettonesSection'
import { InsideCollection } from '@/components/InsideCollection'
import { DessertsSection } from '@/components/DessertsSection'
import { GiftsSection } from '@/components/GiftsSection'
import { HowItWorksAndFaq } from '@/components/HowItWorksAndFaq'
import { FloatingSelectionBar } from '@/components/FloatingSelectionBar'
import { Footer } from '@/components/Footer'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const Index = () => {
  // Seções e cards entram com animação ao rolar ([data-reveal])
  useScrollReveal()

  return (
    // pb-24 no celular: a barra flutuante de seleção não cobre o rodapé
    <div className="min-h-screen bg-[#FAF6EE] text-[#342822] selection:bg-[#B3242E] selection:text-white relative pb-24 sm:pb-0">
      <Header />
      <main>
        <Hero />
        <PanettonesSection />
        <InsideCollection />
        <DessertsSection />
        <GiftsSection />
        <HowItWorksAndFaq />
      </main>
      <Footer />
      <FloatingSelectionBar />
    </div>
  )
}

export default Index
