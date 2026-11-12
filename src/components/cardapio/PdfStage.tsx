import React from 'react'
import { Heart, MessageCircle, Sparkles } from 'lucide-react'
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/data/catalog'
import { CARDAPIO_CATEGORIAS, CardapioCard } from '@/components/cardapio/CardapioCard'

/**
 * Stage do PDF: a mesma direção de arte da página /cardapio, mas em largura fixa
 * (794 px ≈ A4 a 96 dpi) e sem interação. O gerador (lib/pdfCardapio.ts) captura
 * cada [data-pdf-block] como um bloco e pagina os blocos em folhas A4 sem cortá-los.
 */

export const A4_LARGURA_PX = 794

export const PDF_BLOCK_SELECTORS = [
  'header[data-pdf-block]',
  'section[data-pdf-categoria] [data-pdf-categoria-titulo]',
  'section[data-pdf-categoria] [data-pdf-linha]',
  'footer[data-pdf-block]',
] as const

export const CardapioPdfStage: React.FC = () => {
  return (
    <div
      id="pdf-stage"
      aria-hidden="true"
      style={{ width: A4_LARGURA_PX }}
      className="cardapio-pdf-stage absolute -left-[9999px] top-0 bg-[#FAF6EE] text-[#342822]"
    >
      {/* Cabeçalho */}
      <header data-pdf-block className="overflow-hidden border-b-4 border-[#D9A441]">
        <div className="bg-[#8A1A22] text-[#FDEBD2] py-1.5 px-3 text-center text-[10px] tracking-[0.18em] font-semibold uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#E5B55A]" />
          <span>COLEÇÃO DE NATAL 2026</span>
        </div>
        <div className="px-8 py-8 text-center">
          <p className="font-serif text-[11px] tracking-[0.2em] uppercase font-semibold text-[#3A2A20]">
            Carol Domingues
          </p>
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A7566] mt-0.5">
            Confeitaria / Coleção de Natal 2026
          </p>
          <h1 className="font-serif text-[32px] leading-tight text-[#342822] mt-5">
            Tem Carol no seu <span className="italic font-normal text-[#B3242E]">Natal</span>
            <span className="text-[#B3242E]"> • </span>
            <span>Coleção 2026</span>
          </h1>
          <p className="text-[12px] text-[#6B5A4E] mt-2.5">
            Cardápio completo com sabores, tamanhos e valores.
          </p>
        </div>
      </header>

      {/* Categorias e cards */}
      {CARDAPIO_CATEGORIAS.map((categoria) => (
        <section key={categoria.id} data-pdf-categoria className="px-7">
          <div
            data-pdf-block
            data-pdf-categoria-titulo
            className="text-center pt-7 pb-4 border-b border-[#E4D7C5]"
          >
            <span className="text-[10px] font-bold tracking-[0.22em] text-[#B3242E] uppercase">
              Cardápio
            </span>
            <h2 className="font-serif text-[26px] text-[#342822] mt-1">{categoria.title}</h2>
            <p className="text-[11px] text-[#665447] mt-1.5 max-w-xl mx-auto">{categoria.intro}</p>
          </div>
          {[0, 2].map((inicio) => {
            const linha = categoria.items.slice(inicio, inicio + 2)
            if (linha.length === 0) return null
            return (
              <div
                key={inicio}
                data-pdf-block
                data-pdf-linha
                className="grid grid-cols-2 gap-4 pt-5"
              >
                {linha.map((item) => (
                  <CardapioCard key={item.id} item={item} />
                ))}
              </div>
            )
          })}
          <div className="pb-2" />
        </section>
      ))}

      {/* Rodapé: contato e copyright */}
      <footer data-pdf-block className="px-7 pt-6 pb-7">
        <div className="bg-[#2D211A] text-[#D8C9B9] rounded-2xl px-6 py-7 space-y-3 text-center">
          <h3 className="font-serif text-lg font-bold text-[#FAF6EE] tracking-wide">
            CAROL DOMINGUES
          </h3>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#B3242E] font-semibold">
            Confeitaria · Coleção de Natal 2026
          </p>
          <div className="flex flex-col items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp {WHATSAPP_DISPLAY}</span>
              <span className="text-[#9E8E81]">· wa.me/{WHATSAPP_NUMBER}</span>
            </span>
            <span className="text-[#9E8E81]">Instagram: @caroldominguesconfeitaria</span>
          </div>
          <p className="text-[10px] text-[#9E8E81]">
            Dúvidas de entrega e prazos? WhatsApp {WHATSAPP_DISPLAY}
          </p>
          <div className="pt-3 border-t border-[#443328] text-[10px] text-[#8F7E70] flex flex-col items-center gap-1.5">
            <p>
              © 2026 Carol Domingues Confeitaria • Tem Carol no seu Natal. Todos os direitos
              reservados.
            </p>
            <p className="flex items-center gap-1">
              <span>Feito com carinho para o Natal</span>
              <Heart className="w-3 h-3 text-[#B3242E] fill-[#B3242E]" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
