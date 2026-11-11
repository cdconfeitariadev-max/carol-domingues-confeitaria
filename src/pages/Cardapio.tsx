import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Loader2, MessageCircle, Sparkles, Heart } from 'lucide-react'
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/data/catalog'
import { CARDAPIO_CATEGORIAS, CardapioCard } from '@/components/cardapio/CardapioCard'

const TITULO_DOCUMENTO = 'Tem Carol no seu Natal • Coleção 2026 — Cardápio'

/** Guarda o instante do último disparo automático: evita abrir a janela duas vezes
 * (remontagem rápida da rota / StrictMode). O botão manual nunca é bloqueado. */
let ultimaImpressaoAutomatica = 0

/** Espera as fotos do cardápio terminarem de carregar (hotlinks do Drive incluídos),
 * com um teto de tempo para não travar a página se alguma imagem falhar. */
const aguardarImagens = (raiz: HTMLElement, limiteMs = 5000): Promise<void> => {
  const imagens = Array.from(raiz.querySelectorAll('img')).filter(
    (img) => !img.complete || img.naturalWidth === 0,
  )
  if (imagens.length === 0) return Promise.resolve()
  return new Promise((resolve) => {
    let pendentes = imagens.length
    const temporizador = setTimeout(() => {
      pendentes = 0
      resolve()
    }, limiteMs)
    const conferir = () => {
      if (pendentes === 0) return
      pendentes -= 1
      if (pendentes <= 0) {
        clearTimeout(temporizador)
        resolve()
      }
    }
    imagens.forEach((img) => {
      img.addEventListener('load', conferir, { once: true })
      img.addEventListener('error', conferir, { once: true })
    })
  })
}

export const Cardapio: React.FC = () => {
  const raizRef = useRef<HTMLDivElement>(null)
  const [preparando, setPreparando] = useState(true)

  // O título da aba vira o nome sugerido do PDF ao salvar pela janela de impressão.
  useEffect(() => {
    const anterior = document.title
    document.title = TITULO_DOCUMENTO
    return () => {
      document.title = anterior
    }
  }, [])

  // Ao ENTRAR na rota (uma única vez, não em re-render), abre a janela de
  // impressão/PDF automaticamente — primeiro espera as fotos carregarem.
  useEffect(() => {
    if (Date.now() - ultimaImpressaoAutomatica < 4000) {
      setPreparando(false)
      return
    }
    let cancelado = false
    aguardarImagens(raizRef.current ?? document.body)
      // Pequeno delay de segurança para fontes e layout assentarem antes do print.
      .then(() => new Promise<void>((resolve) => setTimeout(resolve, 500)))
      .then(() => {
        if (cancelado) return
        ultimaImpressaoAutomatica = Date.now()
        setPreparando(false)
        window.print()
      })
    return () => {
      cancelado = true
    }
  }, [])

  return (
    <div
      ref={raizRef}
      className="cardapio-print-root min-h-screen w-full bg-[#FAF6EE] text-[#342822]"
    >
      {/* Barra de ações: some na impressão */}
      <div className="print:hidden sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E8DFD3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#4A3B32] hover:text-[#B3242E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao site</span>
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            disabled={preparando}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B3242E] hover:bg-[#8F1A22] disabled:opacity-70 disabled:cursor-wait text-[#FAF6EE] text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95"
          >
            {preparando ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{preparando ? 'Preparando o PDF…' : 'Salvar em PDF'}</span>
          </button>
        </div>
        <p className="print:hidden max-w-5xl mx-auto px-4 sm:px-6 pb-2 text-[11px] text-[#8A7566]">
          {preparando
            ? 'A janela de salvar PDF vai abrir sozinha assim que as fotos terminarem de carregar.'
            : 'Cancelou a janela? Clique abaixo para abrir de novo — ou escolha “Salvar como PDF” como destino.'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 print:max-w-none print:px-0 print:py-0">
        {/* Cabeçalho festivo */}
        <header className="break-inside-avoid relative rounded-3xl border border-[#E4D7C5] bg-white shadow-sm overflow-hidden mb-10 print:shadow-none print:mb-6">
          <div className="bg-[#8A1A22] text-[#FDEBD2] text-[11px] sm:text-xs py-1.5 px-3 text-center tracking-wide font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B55A] shrink-0" />
            <span>COLEÇÃO DE NATAL 2026</span>
          </div>
          <div className="px-6 py-10 sm:py-14 text-center">
            <p className="font-serif tracking-[0.18em] text-xs sm:text-sm font-semibold uppercase text-[#3A2A20]">
              Carol Domingues
            </p>
            <p className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#8A7566] mt-0.5">
              Confeitaria / Coleção de Natal 2026
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#342822] leading-tight mt-6">
              Tem Carol no seu <span className="italic font-normal text-[#B3242E]">Natal</span>
              <span className="text-[#B3242E]"> • </span>
              <span className="whitespace-nowrap">Coleção 2026</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B5A4E] mt-4">
              Cardápio completo com sabores, tamanhos e valores.
            </p>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-[#B3242E] via-[#D9A441] to-[#B3242E]" />
        </header>

        {/* Categorias */}
        {CARDAPIO_CATEGORIAS.map((categoria) => (
          <section key={categoria.id} className="mb-12 print:mb-8">
            <div className="break-after-avoid text-center mb-6">
              <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase">
                Cardápio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#342822] mt-1">
                {categoria.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#665447] mt-2 max-w-xl mx-auto">
                {categoria.intro}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 print:gap-4">
              {categoria.items.map((item) => (
                <CardapioCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Rodapé: contato e copyright */}
        <footer className="break-inside-avoid bg-[#2D211A] text-[#D8C9B9] rounded-2xl px-6 py-8 space-y-4 text-center">
          <h3 className="font-serif text-xl font-bold text-[#FAF6EE] tracking-wide">
            CAROL DOMINGUES
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#B3242E] font-semibold">
            Confeitaria · Coleção de Natal 2026
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp {WHATSAPP_DISPLAY}</span>
              <span className="text-[#9E8E81]">· wa.me/{WHATSAPP_NUMBER}</span>
            </span>
            <span className="text-[#9E8E81]">Instagram: @caroldominguesconfeitaria</span>
          </div>
          <p className="text-[11px] text-[#9E8E81]">
            Atendimento e confirmação de encomendas sob consulta.
          </p>
          <div className="pt-4 border-t border-[#443328] text-[11px] text-[#8F7E70] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © 2026 Carol Domingues Confeitaria • Tem Carol no seu Natal. Todos os direitos
              reservados.
            </p>
            <p className="flex items-center gap-1">
              <span>Feito com carinho para o Natal</span>
              <Heart className="w-3 h-3 text-[#B3242E] fill-[#B3242E]" />
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Cardapio
