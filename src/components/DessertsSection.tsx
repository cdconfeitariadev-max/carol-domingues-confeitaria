import React, { useState } from 'react'
import { Instagram, ZoomIn, X, Sparkles } from 'lucide-react'
import { DESSERTS, Dessert, INSTAGRAM_URL } from '@/data/catalog'

export const DessertsSection: React.FC = () => {
  const [selectedDessert, setSelectedDessert] = useState<Dessert | null>(null)

  return (
    <section id="sobremesas" className="py-16 sm:py-20 bg-[#FAF6EE] scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase font-sans">
            Mais sabores para celebrar
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#342822] mt-1 mb-3">
            As sobremesas.
          </h2>
          <p className="text-sm sm:text-base text-[#665447]">
            Outras criações da confeitaria para o Natal. Toque nas fotos para ampliar.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {DESSERTS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDessert(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E9DFD3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedDessert(item)
              }}
            >
              <div className="relative aspect-square w-full bg-[#F6EFE5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#342822] text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Ampliar foto
                  </span>
                </div>
              </div>
              <div className="p-4 text-center flex-1 flex flex-col justify-center">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#342822] group-hover:text-[#B3242E] transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs text-[#8A7566] mt-1">Criação exclusiva</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout & Instagram Button */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#EADFCF] shadow-sm text-center">
          <Sparkles className="w-6 h-6 text-[#D9A441] mx-auto mb-2" />
          <p className="text-sm sm:text-base font-medium text-[#4A3B32] mb-4">
            Consulte sabores, tamanhos e valores diretamente com a Carol.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B3242E] hover:bg-[#8F1A22] text-[#FAF6EE] text-xs sm:text-sm font-semibold shadow transition-all active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            <span>Consultar opções</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedDessert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedDessert(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDessert(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
              aria-label="Fechar ampliação"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-4/3 w-full bg-black">
              <img
                src={selectedDessert.image}
                alt={selectedDessert.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-serif text-2xl font-bold text-[#342822] mb-2">
                {selectedDessert.name}
              </h3>
              <p className="text-sm text-[#665447] mb-4">
                {selectedDessert.description || selectedDessert.alt}
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B3242E] text-white text-xs font-semibold hover:bg-[#8F1A22] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Consultar valores com a Carol</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
