import React from 'react'
import { useCart } from '@/context/CartContext'
import { DESSERTS, GIFTS, PANETTONES, type Dessert, type Product } from '@/data/catalog'

/** Uma opção de compra exibida no card: tamanho/peso, detalhe (ex.: "Serve 4 pessoas") e preço. */
export interface CardapioOption {
  label: string
  detail?: string
  price: number
}

/** Item neutro do cardápio impresso: vale para panetones, sobremesas e presentinhos. */
export interface CardapioItem {
  id: string
  name: string
  image: string
  alt: string
  subtitle?: string
  description: string
  highlight: boolean
  options: CardapioOption[]
}

const productToItem = (product: Product): CardapioItem => ({
  id: product.id,
  name: product.name,
  image: product.image,
  alt: `${product.name} — foto do produto`,
  subtitle: product.tag,
  description: product.description,
  highlight: !!product.highlight,
  options: [{ label: product.weight, price: product.price }],
})

const dessertToItem = (dessert: Dessert): CardapioItem => ({
  id: dessert.id,
  name: dessert.name,
  image: dessert.image,
  alt: dessert.alt,
  description: dessert.description || dessert.alt,
  highlight: false,
  options: dessert.sizes.map((s) => ({ label: s.label, detail: s.serves, price: s.price })),
})

/** Categorias do cardápio, na ordem de impressão. Todos os dados vêm do catalog.ts. */
export const CARDAPIO_CATEGORIAS = [
  {
    id: 'panetones',
    title: 'Panetones',
    intro: 'Panetones artesanais de 1 kg com recheios fartos e cobertura nobre.',
    items: PANETTONES.map(productToItem),
  },
  {
    id: 'sobremesas',
    title: 'Sobremesas',
    intro: 'Criações da confeitaria para o Natal, em cada tamanho disponível.',
    items: DESSERTS.map(dessertToItem),
  },
  {
    id: 'presentinhos',
    title: 'Presentinhos',
    intro: 'Pequenos mimos para celebrar e presentear.',
    items: GIFTS.map(productToItem),
  },
]

export const CardapioCard: React.FC<{ item: CardapioItem }> = ({ item }) => {
  const { formatCurrency } = useCart()

  return (
    <article className="break-inside-avoid bg-white rounded-2xl border border-[#E9DFD3] shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-[#F6EFE5] overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          loading="eager"
          className="w-full h-full object-cover"
        />
        {item.highlight && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#B3242E] text-[#FAF6EE] text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-xl font-bold text-[#342822] leading-tight">{item.name}</h3>
        {item.subtitle && (
          <p className="text-[11px] uppercase tracking-widest text-[#B3242E] font-semibold mt-1">
            {item.subtitle}
          </p>
        )}
        <p className="text-xs sm:text-sm text-[#665447] leading-relaxed mt-2">{item.description}</p>

        <div className="mt-auto pt-3 border-t border-[#F2ECE3] space-y-2">
          {item.options.map((option, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3">
              <span className="flex flex-wrap items-baseline gap-2 min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F4EDE2] text-[10px] font-bold text-[#84222A] tracking-wide uppercase">
                  {option.label}
                </span>
                {option.detail && (
                  <span className="text-[11px] text-[#8A7566]">{option.detail}</span>
                )}
              </span>
              <span className="font-serif text-lg font-bold text-[#B3242E] whitespace-nowrap">
                {formatCurrency(option.price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
