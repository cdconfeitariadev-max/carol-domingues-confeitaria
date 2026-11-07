import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PanettonesSection } from '@/components/PanettonesSection'
import { InsideCollection } from '@/components/InsideCollection'
import { DessertsSection } from '@/components/DessertsSection'
import { GiftsSection } from '@/components/GiftsSection'
import { HowItWorksAndFaq } from '@/components/HowItWorksAndFaq'
import { FloatingSelectionBar } from '@/components/FloatingSelectionBar'
import { Footer } from '@/components/Footer'

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#342822] selection:bg-[#B3242E] selection:text-white relative">
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
