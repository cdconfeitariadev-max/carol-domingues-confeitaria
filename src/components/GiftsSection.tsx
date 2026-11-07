import React from 'react'
import { Plus, Check, Gift } from 'lucide-react'
import { GIFTS, Product } from '@/data/catalog'
import { useCart } from '@/context/CartContext'

export const GiftsSection: React.FC = () => {
  const { addItem, getItemQuantity, formatCurrency } = useCart()

  const renderGiftCard = (product: Product) => {
    const qty = getItemQuantity(product.id)
    const isAdded = qty > 0

    return (
      <div
        key={product.id}
        className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
          isAdded
            ? 'border-[#B3242E] ring-2 ring-[#B3242E]/20 shadow-md'
            : 'border-[#E9DFD3] shadow-sm'
        }`}
      >
        <div className="relative aspect-square w-full bg-[#F6EFE5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#84222A] tracking-wide uppercase shadow-sm">
              {product.weight}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#342822]">
                {product.name}
              </h3>
              <span className="font-serif text-lg font-bold text-[#B3242E]">
                {formatCurrency(product.price)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#665447] leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between gap-3">
            <span className="text-xs text-[#8A7566] font-medium">{product.weight}</span>

            <button
              onClick={() => addItem(product)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                isAdded
                  ? 'bg-[#B3242E] text-white shadow-sm'
                  : 'bg-[#FAF6EE] text-[#5A4538] hover:bg-[#B3242E] hover:text-white border border-[#DFD3C4]'
              }`}
              aria-label={`Adicionar ${product.name}`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Adicionado ({qty})</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="presentes" className="py-16 sm:py-20 bg-[#FAF6EE] scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE4D3] text-[#84222A] text-xs font-semibold tracking-wide uppercase mb-3">
            <Gift className="w-3.5 h-3.5 text-[#C49339]" />
            <span>Para presentear</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#342822] leading-tight mb-2">
            Um pouco de Carol. <br />
            <span className="italic text-[#B3242E]">Para alguém especial.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#665447]">
            Pequenos presentes para um gesto de carinho no Natal.
          </p>
        </div>

        {/* 2 Gift Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {GIFTS.map(renderGiftCard)}
        </div>
      </div>
    </section>
  )
}
