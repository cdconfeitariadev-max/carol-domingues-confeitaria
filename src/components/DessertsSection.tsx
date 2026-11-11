import React from 'react'
import { Plus, Check, Sparkles } from 'lucide-react'
import { DESSERTS, Dessert, DessertSize, productImages } from '@/data/catalog'
import { useCart } from '@/context/CartContext'
import { WhatsAppOrderButton, buildProductOrderMessage } from '@/components/WhatsAppOrderButton'
import { ProductGallery, ProductGalleryDialog } from '@/components/ProductGallery'

export const DessertsSection: React.FC = () => {
  const { addDessert, getDessertQuantity, formatCurrency } = useCart()

  const renderSizeRow = (dessert: Dessert, size: DessertSize) => {
    const qty = getDessertQuantity(dessert.id, size.id)
    const isAdded = qty > 0

    return (
      <div
        key={size.id}
        className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-3 border-t border-[#F2ECE3]"
      >
        {/* Topo: tamanho + preço (nunca disputam espaço com os botões) */}
        <div className="flex items-center justify-between gap-2 flex-1 min-w-[10rem]">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="px-2.5 py-1 rounded-full bg-[#F4EDE2] text-[10px] font-bold text-[#84222A] tracking-wide uppercase shadow-sm shrink-0">
              {size.label}
            </span>
            <span className="text-[11px] text-[#8A7566] truncate">{size.serves}</span>
          </div>
          <span className="font-serif text-lg font-bold text-[#B3242E] whitespace-nowrap">
            {formatCurrency(size.price)}
          </span>
        </div>

        {/* Botões em linha própria sempre — completos em qualquer largura */}
        <div className="flex items-center gap-2 w-full">
          <WhatsAppOrderButton
            message={buildProductOrderMessage(dessert.name, size.label)}
            ariaLabel={`Pedir ${dessert.name} (${size.label}) pelo WhatsApp`}
            className="flex flex-1 min-w-0 items-center justify-center gap-1.5 px-2 sm:px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm whitespace-nowrap"
          />
          <button
            onClick={() => addDessert(dessert, size.id)}
            className={`flex flex-1 min-w-0 items-center justify-center gap-1.5 px-2 sm:px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 whitespace-nowrap ${
              isAdded
                ? 'bg-[#B3242E] text-white shadow-sm'
                : 'bg-[#FAF6EE] text-[#5A4538] hover:bg-[#B3242E] hover:text-white border border-[#DFD3C4]'
            }`}
            aria-label={`Adicionar ${dessert.name} — ${size.label}`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0 animate-check-pop" />
                <span>{qty}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  const renderCard = (dessert: Dessert) => {
    return (
      <div
        key={dessert.id}
        data-reveal
        className="group bg-white rounded-2xl border border-[#E9DFD3] shadow-sm transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1"
      >
        {/* Product Image */}
        <div className="relative aspect-[4/5] min-h-[18rem] w-full bg-[#F6EFE5] overflow-hidden">
          <ProductGallery images={productImages(dessert)} alt={dessert.alt} />
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#84222A] tracking-wide uppercase shadow-sm">
              Sobremesa
            </span>
          </div>
          <ProductGalleryDialog
            images={productImages(dessert)}
            alt={dessert.alt}
            title={dessert.name}
            triggerLabel="Conheça esta sobremesa"
          />
        </div>

        {/* Card Details */}
        <div className="p-5 flex-1 flex flex-col">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#342822] group-hover:text-[#B3242E] transition-colors">
            {dessert.name}
          </h4>
          <p className="text-xs sm:text-sm text-[#665447] leading-relaxed mt-2 mb-4">
            {dessert.description || dessert.alt}
          </p>

          {/* Sizes + Prices + Add buttons */}
          <div className="mt-auto flex flex-col gap-3">
            {dessert.sizes.map((size) => renderSizeRow(dessert, size))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="sobremesas" className="py-16 sm:py-20 bg-[#FAF6EE] scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10" data-reveal>
          <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase font-sans">
            Mais sabores para celebrar
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#342822] mt-1 mb-3">
            As sobremesas.
          </h2>
          <p className="text-sm sm:text-base text-[#665447]">
            Outras criações da confeitaria para o Natal. Toque em <strong>Adicionar</strong> para
            incluir na sua seleção.
          </p>
        </div>

        {/* 4 Cards Grid — mesmo estilo dos panetones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {DESSERTS.map(renderCard)}
        </div>

        {/* Bottom Callout */}
        <div
          data-reveal
          className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#EADFCF] shadow-sm text-center"
        >
          <Sparkles className="w-6 h-6 text-[#D9A441] mx-auto mb-2" />
          <p className="text-sm sm:text-base font-medium text-[#4A3B32]">
            Consulte sabores, tamanhos e valores diretamente com a Carol.
          </p>
        </div>
      </div>
    </section>
  )
}
