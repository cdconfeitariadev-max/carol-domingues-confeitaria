import React from 'react'
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, ChevronUp } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { buildWhatsappUrl } from '@/components/WhatsAppOrderButton'

export const FloatingSelectionBar: React.FC = () => {
  const {
    items,
    totalCount,
    totalPrice,
    formatCurrency,
    updateQuantity,
    removeItem,
    clearCart,
    generateOrderText,
    isSelectionOpen,
    setIsSelectionOpen,
  } = useCart()

  const whatsappSelectionUrl = buildWhatsappUrl(generateOrderText())

  // Floating trigger bar when collapsed (only visible if there are items)
  return (
    <>
      {/* Collapsed bottom floating bar */}
      {totalCount > 0 && !isSelectionOpen && (
        <aside
          aria-label="Barra flutuante de seleção"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slide-up"
        >
          <div className="bg-[#342822] text-[#FAF6EE] rounded-full p-2.5 sm:p-3 shadow-2xl border border-[#FAF6EE]/15 flex items-center justify-between gap-3">
            <button
              onClick={() => setIsSelectionOpen(true)}
              className="flex items-center gap-2.5 text-left pl-2 hover:opacity-90 transition-opacity flex-1 min-w-0"
              aria-label="Ver detalhes da seleção"
            >
              <div className="w-8 h-8 rounded-full bg-[#B3242E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {totalCount}
              </div>
              <div className="truncate">
                <div className="text-xs sm:text-sm font-semibold truncate">
                  {totalCount} {totalCount === 1 ? 'item' : 'itens'} · {formatCurrency(totalPrice)}
                </div>
                <div className="text-[10px] text-[#D6C7B7] flex items-center gap-1">
                  <span>Toque para ver a seleção</span>
                  <ChevronUp className="w-3 h-3 inline" />
                </div>
              </div>
            </button>

            <div className="flex items-center shrink-0">
              <button
                onClick={() => setIsSelectionOpen(true)}
                className="px-3 py-2 rounded-full bg-[#B3242E] hover:bg-[#8F1A22] text-white font-semibold text-xs transition-colors shadow-sm whitespace-nowrap"
              >
                Ver seleção
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Expanded Selection Drawer / Modal */}
      {isSelectionOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsSelectionOpen(false)}
        >
          <div
            className="w-full sm:max-w-xl bg-[#FAF6EE] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E6D9C8] max-h-[85vh] flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E8DFD3] flex items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2 min-w-0">
                <ShoppingBag className="w-5 h-5 text-[#B3242E] shrink-0" />
                <h3 className="font-serif text-base sm:text-xl font-bold text-[#342822] truncate">
                  Sua seleção de Natal
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#F4EDE2] text-[11px] font-semibold text-[#84222A] whitespace-nowrap shrink-0">
                  {totalCount} {totalCount === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <button
                onClick={() => setIsSelectionOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#6B5A4E] hover:text-[#342822] hover:bg-[#EFE5D7] flex items-center justify-center transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items List */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {items.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm text-[#7A695B] mb-3">Sua seleção está vazia no momento.</p>
                  <button
                    onClick={() => setIsSelectionOpen(false)}
                    className="px-4 py-2 rounded-full bg-[#B3242E] text-white text-xs font-semibold"
                  >
                    Ver cardápio
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-xl p-3 border border-[#EAE0D4] flex items-center gap-3 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover bg-[#F6EFE5] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#342822] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#8C6D4F] truncate font-medium">
                        {item.product.tag || item.product.weight}
                      </p>
                      <div className="text-xs font-bold text-[#B3242E] mt-0.5">
                        {formatCurrency(item.product.price * item.quantity)}
                        <span className="text-[10px] text-[#8A7566] font-normal ml-1">
                          ({formatCurrency(item.product.price)} un.)
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 bg-[#FAF6EE] rounded-full p-1 border border-[#E4D7C5] shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white hover:bg-[#F2E7D7] text-[#4A3B32] flex items-center justify-center transition-colors text-xs"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#342822]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white hover:bg-[#F2E7D7] text-[#4A3B32] flex items-center justify-center transition-colors text-xs"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-[#9E8B7C] hover:text-[#B3242E] p-1.5 transition-colors"
                      aria-label="Remover item"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Actions */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#E8DFD3] bg-white space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#665447]">
                    Total estimado ({totalCount} {totalCount === 1 ? 'item' : 'itens'}):
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#B3242E]">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>

                <a
                  href={whatsappSelectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold shadow transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar seleção pelo WhatsApp</span>
                </a>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-[#A69382] hover:text-[#B3242E] transition-colors underline"
                  >
                    Limpar toda a seleção
                  </button>
                  <span className="text-[10px] text-[#A69382]">Salvo no seu navegador</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
