import React, { useState, useMemo } from 'react'
import { Plus, Check, Sparkles, Heart } from 'lucide-react'
import { PANETTONES, Product, productImages } from '@/data/catalog'
import { useCart } from '@/context/CartContext'
import { WhatsAppOrderButton, buildProductOrderMessage } from '@/components/WhatsAppOrderButton'
import { ProductGallery, ProductGalleryDialog } from '@/components/ProductGallery'

export const PanettonesSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'classicos' | 'especiais'>('all')
  const { addItem, getItemQuantity, formatCurrency } = useCart()

  // Filter products based on selected tab
  const filteredPanettones = useMemo(() => {
    return PANETTONES.filter((item) => filterCategory === 'all' || item.category === filterCategory)
  }, [filterCategory])

  const classicos = useMemo(
    () => filteredPanettones.filter((p) => p.category === 'classicos'),
    [filteredPanettones],
  )
  const especiais = useMemo(
    () => filteredPanettones.filter((p) => p.category === 'especiais'),
    [filteredPanettones],
  )

  const renderCard = (product: Product) => {
    const qty = getItemQuantity(product.id)
    const isAdded = qty > 0

    return (
      <div
        key={product.id}
        data-reveal
        className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
          isAdded
            ? 'border-[#B3242E] ring-2 ring-[#B3242E]/20 shadow-md'
            : 'border-[#E9DFD3] shadow-sm'
        }`}
      >
        {/* Product Image */}
        <div className="relative aspect-[4/5] min-h-[18rem] w-full bg-[#F6EFE5] overflow-hidden">
          <ProductGallery
            images={productImages(product)}
            alt={`${product.name}, fotografia do produto da confeitaria`}
          />
          <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1 items-start">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#84222A] tracking-wide uppercase shadow-sm">
              {product.weight}
            </span>
            {product.highlight && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#B3242E] text-white text-[10px] font-semibold tracking-wider uppercase shadow-sm">
                Destaque
              </span>
            )}
          </div>

          <ProductGalleryDialog
            images={productImages(product)}
            alt={`${product.name}, fotografia do produto da confeitaria`}
            title={product.name}
            triggerLabel="Conheça este sabor"
          />
        </div>

        {/* Product Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#342822] min-w-0">
                {product.name}
              </h4>
              <span className="font-serif text-lg font-bold text-[#B3242E] whitespace-nowrap shrink-0">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="inline-block text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider mb-2">
              {product.tag}
            </div>

            <p className="text-xs sm:text-sm text-[#665447] leading-relaxed mb-4 line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Card Footer: Weight badge + Action Button */}
          <div className="pt-3 border-t border-[#F2ECE3] flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-[#8A7566] font-medium flex items-center gap-1 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1C3B2] shrink-0" />
                <span className="truncate">{product.weight}</span>
              </span>
              <span className="font-serif text-lg font-bold text-[#B3242E] whitespace-nowrap">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <WhatsAppOrderButton
                message={buildProductOrderMessage(product.name)}
                ariaLabel={`Pedir ${product.name} pelo WhatsApp`}
                className="hidden sm:flex flex-1 min-w-[8rem] items-center justify-center gap-1.5 px-2 lg:px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm whitespace-nowrap"
              />
              <button
                onClick={() => addItem(product)}
                className={`hidden sm:flex flex-1 min-w-[8rem] items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 whitespace-nowrap ${
                  isAdded
                    ? 'bg-[#B3242E] text-white shadow-sm'
                    : 'bg-[#FAF6EE] text-[#5A4538] hover:bg-[#B3242E] hover:text-white border border-[#DFD3C4]'
                }`}
                aria-label={`Adicionar ${product.name}`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0 animate-check-pop" />
                    <span>Adicionado ({qty})</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>Adicionar</span>
                  </>
                )}
              </button>

              {/* Mobile: botões empilhados em linha própria, largura total */}
              <div className="flex sm:hidden flex-col gap-2 w-full">
                <WhatsAppOrderButton
                  message={buildProductOrderMessage(product.name)}
                  ariaLabel={`Pedir ${product.name} pelo WhatsApp`}
                  className="flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm"
                />
                <button
                  onClick={() => addItem(product)}
                  className={`flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                    isAdded
                      ? 'bg-[#B3242E] text-white shadow-sm'
                      : 'bg-[#FAF6EE] text-[#5A4538] hover:bg-[#B3242E] hover:text-white border border-[#DFD3C4]'
                  }`}
                  aria-label={`Adicionar ${product.name}`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 shrink-0 animate-check-pop" />
                      <span>Adicionado ({qty})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 shrink-0" />
                      <span>Adicionar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="cardapio" className="py-16 sm:py-20 bg-[#FAF6EE] scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10" data-reveal>
          <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase font-sans">
            O Natal em sete sabores
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#342822] mt-1 mb-3">
            Os panetones.
          </h2>
          <p className="text-base sm:text-lg text-[#665447]">Sete sabores, todos com 1 kg.</p>
          <p className="text-xs sm:text-sm text-[#8A7566] mt-1">
            Veja a foto, conheça o recheio e adicione os seus favoritos à seleção.
          </p>
        </div>

        {/* Category Tabs & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8DFD3]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filterCategory === 'all'
                  ? 'bg-[#342822] text-[#FAF6EE] shadow-sm'
                  : 'bg-white text-[#665447] hover:bg-[#EFE5D7] border border-[#E4D7C5]'
              }`}
            >
              Toda a coleção
            </button>
            <button
              onClick={() => setFilterCategory('classicos')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filterCategory === 'classicos'
                  ? 'bg-[#342822] text-[#FAF6EE] shadow-sm'
                  : 'bg-white text-[#665447] hover:bg-[#EFE5D7] border border-[#E4D7C5]'
              }`}
            >
              Clássicos
            </button>
            <button
              onClick={() => setFilterCategory('especiais')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filterCategory === 'especiais'
                  ? 'bg-[#342822] text-[#FAF6EE] shadow-sm'
                  : 'bg-white text-[#665447] hover:bg-[#EFE5D7] border border-[#E4D7C5]'
              }`}
            >
              Especiais
            </button>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-[#8A7566] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B3242E]" />
            <span>
              {filteredPanettones.length} {filteredPanettones.length === 1 ? 'sabor' : 'sabores'}
            </span>
          </div>
        </div>

        {/* Group 01: Os clássicos (if visible) */}
        {classicos.length > 0 && (
          <div className="mb-14" data-reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#E8DFD3] text-[#4A3B32] font-serif font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#342822] font-semibold">
                Os clássicos · <span className="text-[#B3242E]">R$ 89,90</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {classicos.map(renderCard)}
            </div>
          </div>
        )}

        {/* Group 02: Combinações especiais (if visible) */}
        {especiais.length > 0 && (
          <div data-reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#E8DFD3] text-[#4A3B32] font-serif font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#342822] font-semibold">
                Combinações especiais
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {especiais.map(renderCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
