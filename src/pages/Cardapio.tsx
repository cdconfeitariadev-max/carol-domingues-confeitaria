import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  Loader2,
  MessageCircle,
  Sparkles,
  Heart,
  CheckCircle2,
} from 'lucide-react'
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/data/catalog'
import { CARDAPIO_CATEGORIAS, CardapioCard } from '@/components/cardapio/CardapioCard'
import { CardapioPdfStage } from '@/components/cardapio/PdfStage'
import { baixarPdfBlob, gerarPdfCardapio } from '@/lib/pdfCardapio'

const TITULO_DOCUMENTO = 'Tem Carol no seu Natal • Coleção 2026 — Cardápio'

type Estado = 'preparando' | 'pronto' | 'erro'

export const Cardapio: React.FC = () => {
  const [estado, setEstado] = useState<Estado>('preparando')
  const [baixou, setBaixou] = useState(false)
  const gerandoRef = useRef(false)
  // PDF já montado: o botão baixa esse blob direto no clique (gesto do usuário).
  const blobRef = useRef<Blob | null>(null)

  const gerar = useCallback(async (): Promise<Blob | null> => {
    if (gerandoRef.current) return null
    gerandoRef.current = true
    setEstado('preparando')
    try {
      const blob = await gerarPdfCardapio()
      blobRef.current = blob
      setEstado('pronto')
      return blob
    } catch (erro) {
      console.error('Falha ao gerar o PDF do cardápio:', erro)
      setEstado('erro')
      return null
    } finally {
      gerandoRef.current = false
    }
  }, [])

  const baixarAgora = useCallback(() => {
    const blob = blobRef.current
    if (estado === 'pronto' && blob) {
      baixarPdfBlob(blob)
      setBaixou(true)
      return
    }
    void gerar().then((novo) => {
      if (novo) {
        baixarPdfBlob(novo)
        setBaixou(true)
      }
    })
  }, [estado, gerar])

  // O título da aba vira o nome sugerido do PDF baixado.
  useEffect(() => {
    const anterior = document.title
    document.title = TITULO_DOCUMENTO
    return () => {
      document.title = anterior
    }
  }, [])

  // Ao ENTRAR na rota, monta o PDF e tenta baixá-lo sozinho. Se o navegador bloquear,
  // o botão "Baixar o PDF" (clique do usuário) entrega o mesmo arquivo.
  useEffect(() => {
    void gerar().then((blob) => {
      if (blob) {
        baixarPdfBlob(blob)
        setBaixou(true)
      }
    })
  }, [gerar])

  const rotuloBotao =
    estado === 'preparando'
      ? 'Preparando o PDF…'
      : estado === 'erro'
        ? 'Tentar de novo'
        : 'Baixar o PDF'

  return (
    <div className="relative min-h-screen w-full bg-[#FAF6EE] text-[#342822]">
      <CardapioPdfStage />

      {/* Barra de ações */}
      <div className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E8DFD3]">
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
            onClick={baixarAgora}
            disabled={estado === 'preparando'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B3242E] hover:bg-[#8F1A22] disabled:opacity-70 disabled:cursor-wait text-[#FAF6EE] text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95"
          >
            {estado === 'preparando' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{rotuloBotao}</span>
          </button>
        </div>
        <p className="max-w-5xl mx-auto px-4 sm:px-6 pb-2 text-[11px] text-[#8A7566]">
          {estado === 'preparando'
            ? 'Montando o PDF com as fotos. O download começa sozinho assim que ficar pronto.'
            : estado === 'erro'
              ? 'Não foi possível montar o PDF (pode ser falha de rede ao carregar as fotos). Clique em "Tentar de novo".'
              : baixou
                ? 'PDF baixado. Se o download não apareceu, clique em "Baixar o PDF" acima.'
                : 'O PDF está pronto. Se o navegador bloqueou o download, clique em "Baixar o PDF" acima.'}
        </p>
      </div>

      {/* Pré-visualização do cardápio no navegador */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Cabeçalho festivo */}
        <header className="relative rounded-3xl border border-[#E4D7C5] bg-white shadow-sm overflow-hidden mb-10">
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
          <section key={categoria.id} className="mb-12">
            <div className="text-center mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {categoria.items.map((item) => (
                <CardapioCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Rodapé: contato e copyright */}
        <footer className="bg-[#2D211A] text-[#D8C9B9] rounded-2xl px-6 py-8 space-y-4 text-center">
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
            Dúvidas de entrega e prazos? WhatsApp {WHATSAPP_DISPLAY}
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

        {estado === 'pronto' && (
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs text-[#3E7A4E] bg-[#EAF4EC] border border-[#CFE4D4] rounded-full px-4 py-2">
              <CheckCircle2 className="w-4 h-4" />
              PDF pronto. Use o botão "Baixar o PDF" lá em cima para baixar de novo.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cardapio
