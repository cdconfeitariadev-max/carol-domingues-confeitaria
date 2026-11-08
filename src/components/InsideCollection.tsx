import React, { useState } from 'react'
import { FileText, Sparkles, CheckCircle2, Eye, Loader2 } from 'lucide-react'
import { HERO_ASSETS, INSIDE_COLLECTION_TABS } from '@/data/catalog'
import { downloadCardapioPdf } from '@/lib/cardapioPdf'

export const InsideCollection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recheios' | 'coberturas' | 'sabores'>('recheios')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPdf = () => {
    setIsGenerating(true)
    // deixa o estado pintar antes da geração (é rápida, mas evita clique duplo)
    setTimeout(() => {
      try {
        downloadCardapioPdf()
      } finally {
        setIsGenerating(false)
      }
    }, 30)
  }

  const tabData = INSIDE_COLLECTION_TABS[activeTab]

  return (
    <section
      id="por-dentro"
      className="py-16 sm:py-20 bg-[#F4EDE2] border-y border-[#E9DFD3] scroll-mt-14"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Sliced Panettone Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <img
                src={HERO_ASSETS.recheioFatiado}
                alt="Detalhe real do panetone fatiado, mostrando o recheio farto e cremoso"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 text-white flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#D9A441]" />
                  Ver o recheio de perto
                </span>
                <span className="text-[11px] uppercase tracking-wider text-amber-200 font-serif">
                  Fartura artesanal
                </span>
              </div>
            </div>
          </div>

          {/* Tab content & PDF Download */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase font-sans mb-1">
              Por dentro da coleção
            </span>

            {/* Tab Buttons */}
            <div className="flex items-center gap-2 my-4 p-1 bg-white/70 rounded-full border border-[#DFD3C4]">
              <button
                onClick={() => setActiveTab('recheios')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'recheios'
                    ? 'bg-[#B3242E] text-white shadow-sm'
                    : 'text-[#6B5A4E] hover:text-[#342822]'
                }`}
              >
                Recheios
              </button>
              <button
                onClick={() => setActiveTab('coberturas')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'coberturas'
                    ? 'bg-[#B3242E] text-white shadow-sm'
                    : 'text-[#6B5A4E] hover:text-[#342822]'
                }`}
              >
                Coberturas
              </button>
              <button
                onClick={() => setActiveTab('sabores')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'sabores'
                    ? 'bg-[#B3242E] text-white shadow-sm'
                    : 'text-[#6B5A4E] hover:text-[#342822]'
                }`}
              >
                Sete sabores
              </button>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#342822] leading-tight mb-4">
              O primeiro olhar <br />
              já dá vontade. <br />
              <span className="italic text-[#B3242E]">A primeira fatia, mais ainda.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#6B5A4E] leading-relaxed mb-6 font-normal">
              Conheça o recheio e a cobertura de cada versão. Depois, é só escolher com quem você
              quer dividir.
            </p>

            <div className="bg-white/90 rounded-2xl p-5 border border-[#E6D9CA] shadow-sm w-full mb-6">
              <h3 className="font-serif text-lg font-bold text-[#342822] mb-2">{tabData.title}</h3>
              <p className="text-xs sm:text-sm text-[#665447] leading-relaxed mb-4">
                {tabData.description}
              </p>
              <div className="space-y-1.5">
                {tabData.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium text-[#4A3B32]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B3242E] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#342822] hover:bg-[#1E1713] text-[#FAF6EE] text-xs sm:text-sm font-semibold shadow transition-all active:scale-95 disabled:opacity-70"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 text-[#D9A441] animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 text-[#D9A441]" />
                )}
                <span>Baixar o cardápio · PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
