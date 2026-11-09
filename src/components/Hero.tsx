import React from 'react'
import { Sparkles, ArrowDown } from 'lucide-react'
import { HERO_ASSETS, FLAVOR_TICKER } from '@/data/catalog'
import mascoteAcenando from '@/assets/saco-confeitar-0d4b0.png'

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#FAF6EE]">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#F3E7D5] blur-3xl rounded-full pointer-events-none -z-10 opacity-70" />

      {/* Subtle snowfall effect particles */}
      <div
        className="absolute inset-0 pointer-events-none -z-5 overflow-hidden select-none"
        aria-hidden="true"
      >
        <span className="absolute top-2 left-[15%] w-1.5 h-1.5 bg-white/70 rounded-full animate-snow-1" />
        <span className="absolute top-6 left-[35%] w-2 h-2 bg-white/60 rounded-full animate-snow-2" />
        <span className="absolute top-4 left-[65%] w-1 h-1 bg-white/80 rounded-full animate-snow-3" />
        <span className="absolute top-10 left-[85%] w-2 h-2 bg-white/50 rounded-full animate-snow-1" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Top: Carol Image & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Visual */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/90 bg-[#ECE2D2] group">
              <img
                src={HERO_ASSETS.carolHero}
                alt="Carol com os sete panetones da coleção, na imagem da confeitaria com letreiro iluminado"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[#FAF6EE] text-[11px] px-3 py-1 rounded-full font-medium tracking-wide">
                Carol Domingues Confeitaria · Natal 2026
              </div>
            </div>
          </div>

          {/* Hero Copy */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D3] text-[#84222A] text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C49339]" />
              <span>Uma coleção da Carol para você</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#342822] leading-[1.08] tracking-tight mb-4">
              Tem Carol <br />
              no seu <span className="italic font-normal text-[#B3242E]">Natal.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6B5A4E] leading-relaxed mb-6 font-normal">
              Panetones, chocotones e pequenos presentes para celebrar e presentear.
            </p>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="#cardapio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B3242E] hover:bg-[#8F1A22] text-[#FAF6EE] font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Escolha seu sabor</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8DFD3] w-full flex items-center justify-between text-[11px] tracking-wider uppercase text-[#8A7566] font-medium">
              <span>CAROL DOMINGUES CONFEITARIA</span>
              <span>COLEÇÃO DE NATAL 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee with 7 flavors */}
      <div className="mt-12 sm:mt-16 border-y border-[#E8DFD3] bg-[#F4ECDF] py-2.5 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-serif tracking-wider text-[#5A4538] uppercase">
          {[...FLAVOR_TICKER, ...FLAVOR_TICKER, ...FLAVOR_TICKER, ...FLAVOR_TICKER].map(
            (flavor, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span>{flavor}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B3242E]" />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Mascot & Intro Callout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E9E0D4] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={mascoteAcenando}
            alt="Mascote Carol Domingues acenando com saco de confeitar"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
          />
          <div className="space-y-2 flex-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#342822] leading-tight">
              Você escolhe o sabor.{' '}
              <span className="italic text-[#B3242E]">O toque é da Carol.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B5A4E] leading-relaxed">
              Do brigadeiro branco ao chocolate meio amargo, sete versões para encontrar a sua
              favorita. Explore os recheios, compare os sabores e prepare sua seleção.
            </p>
          </div>
          <a
            href="#cardapio"
            className="shrink-0 px-4 py-2.5 rounded-full bg-[#FAF6EE] hover:bg-[#F2E8DA] text-[#84222A] text-xs sm:text-sm font-semibold border border-[#E4D7C5] transition-colors"
          >
            Descubra a coleção ↓
          </a>
        </div>
      </div>
    </section>
  )
}
