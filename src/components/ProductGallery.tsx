import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const SWIPE_THRESHOLD = 40

interface ProductGalleryProps {
  images: string[]
  alt: string
}

/** Galeria navegável (setas, indicadores e arraste no toque). Preenche o contêiner pai (relative). */
export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [index, setIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const total = images.length
  const hasMany = total > 1

  const goTo = (next: number) => setIndex((next + total) % total)

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || !hasMany) return
    const dx = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(dx) >= SWIPE_THRESHOLD) goTo(index + (dx < 0 ? 1 : -1))
    setTouchStartX(null)
  }

  return (
    <div
      className="absolute inset-0"
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={hasMany ? `${alt} (foto ${i + 1} de ${total})` : alt}
          /* object-cover: a foto preenche o quadro de borda a borda (sem faixa bege nem padding).
             O contêiner pai mantém bg bege [#F6EFE5] apenas como cor de fallback no carregamento. */
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
            i === index ? 'opacity-100 group-hover:scale-[1.03]' : 'opacity-0'
          }`}
          /* A capa carrega eager: com lazy, imagens empilhadas com opacity-0 podem
             nunca disparar o download em alguns navegadores/webviews. */
          loading={i === 0 ? 'eager' : 'lazy'}
          /* Evita que hotlinks externos bloqueiem a imagem pelo referrer. */
          referrerPolicy="no-referrer"
          draggable={false}
        />
      ))}

      {hasMany && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 text-[#342822] shadow flex items-center justify-center transition-all hover:bg-white active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próxima foto"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 text-[#342822] shadow flex items-center justify-center transition-all hover:bg-white active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

interface ProductGalleryDialogProps {
  images: string[]
  alt: string
  title: string
  triggerLabel: string
}

/** Botão "Conheça este sabor" que abre a galeria completa em uma janela. */
export const ProductGalleryDialog: React.FC<ProductGalleryDialogProps> = ({
  images,
  alt,
  title,
  triggerLabel,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        className="absolute bottom-3 right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm whitespace-nowrap"
      >
        {triggerLabel}
      </button>
    </DialogTrigger>
    <DialogContent className="w-[calc(100vw-2rem)] max-w-md p-4 sm:p-6">
      <DialogTitle className="font-serif text-xl font-bold text-[#342822]">{title}</DialogTitle>
      <div className="relative aspect-[4/5] max-h-[70vh] w-full rounded-xl overflow-hidden bg-[#F6EFE5] mt-2">
        <ProductGallery images={images} alt={alt} />
      </div>
    </DialogContent>
  </Dialog>
)
