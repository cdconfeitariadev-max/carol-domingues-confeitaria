import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas-pro'
import type { Options as Html2CanvasOptions } from 'html2canvas-pro'
import { PDF_BLOCK_SELECTORS, A4_LARGURA_PX } from '@/components/cardapio/PdfStage'

/** Arquivo do cardápio: "cardapio-tem-carol-natal-2026.pdf" */
const NOME_ARQUIVO = 'cardapio-tem-carol-natal-2026.pdf'

/** A4 em mm, retrato. */
const A4_LARGURA_MM = 210
const A4_ALTURA_MM = 297
/** Margens da folha em mm. */
const MARGEM_MM = 10

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">
  <rect width="600" height="450" fill="#F6EFE5"/>
  <text x="300" y="225" fill="#B3242E" font-family="Georgia, serif" font-size="26"
    text-anchor="middle">Foto indisponível</text>
</svg>`

const PLACEHOLDER_DATAURL = `data:image/svg+xml;base64,${btoa(
  PLACEHOLDER_SVG.replace(/[\u0080-\uFFFF]/g, ''),
)}`

/** Converte uma URL (hotlink) em dataURL. Falha por CORS/rede → placeholder, nunca exceção. */
const urlParaDataUrl = async (url: string): Promise<string> => {
  if (url.startsWith('data:')) return url
  try {
    const resposta = await fetch(url, { mode: 'cors' })
    if (!resposta.ok) throw new Error(String(resposta.status))
    const blob = await resposta.blob()
    return await new Promise<string>((resolve, reject) => {
      const leitor = new FileReader()
      leitor.onload = () => resolve(leitor.result as string)
      leitor.onerror = () => reject(new Error('FileReader falhou'))
      leitor.readAsDataURL(blob)
    })
  } catch {
    return PLACEHOLDER_DATAURL
  }
}

const esperar = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/** Espera todas as fontes do documento (Fraunces etc.) estarem prontas. */
const aguardarFontes = async (raiz: HTMLElement): Promise<void> => {
  if (!('fonts' in document)) return
  try {
    await Promise.race([(document as Document & { fonts: FontFaceSet }).fonts.ready, esperar(4000)])
  } catch {
    /* segue com as fontes carregadas até aqui */
  }
  void raiz
}

interface Captura {
  dataUrl: string
  larguraPx: number
  alturaPx: number
}

/** Captura um elemento como PNG (dataURL) na largura do stage. */
const capturar = async (elemento: HTMLElement): Promise<Captura> => {
  const opcoes: Html2CanvasOptions = {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FAF6EE',
    logging: false,
    scrollX: 0,
    scrollY: 0,
    windowWidth: A4_LARGURA_PX,
    windowHeight: document.documentElement.scrollHeight || 800,
    x: 0,
    y: 0,
    width: elemento.offsetWidth,
    height: elemento.offsetHeight,
    imageTimeout: 15000,
    allowTaint: false,
    foreignObjectRendering: false,
  }
  const canvas = await html2canvas(elemento, opcoes)
  return {
    dataUrl: canvas.toDataURL('image/png'),
    larguraPx: canvas.width,
    alturaPx: canvas.height,
  }
}

/** Gera o PDF do cardápio e dispara o download (save). */
export const gerarPdfCardapio = async (): Promise<void> => {
  const stage = document.getElementById('pdf-stage') as HTMLElement | null
  if (!stage) throw new Error('Stage do PDF não encontrado')

  await aguardarFontes(stage)

  // Fotos: fetch → blob → dataURL ANTES da captura. Sem CORS/bloqueio, o download não falha.
  const imgs = Array.from(stage.querySelectorAll('img'))
  const dataUrls = await Promise.all(
    imgs.map(async (img) => ({ img, dataUrl: await urlParaDataUrl(img.currentSrc || img.src) })),
  )
  dataUrls.forEach(({ img, dataUrl }) => {
    img.src = dataUrl
  })
  await esperar(250)

  // Captura cada bloco marcado no stage.
  const seletores = PDF_BLOCK_SELECTORS.join(',')
  const elementos = Array.from(stage.querySelectorAll<HTMLElement>(seletores))
  const blocos: Captura[] = []
  for (const elemento of elementos) {
    blocos.push(await capturar(elemento))
  }
  if (blocos.length === 0) throw new Error('Nenhum bloco capturado')

  // Monta as páginas A4: cada bloco inteiro, nunca cortado.
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true })
  const larguraUtil = A4_LARGURA_MM - 2 * MARGEM_MM
  const alturaUtil = A4_ALTURA_MM - 2 * MARGEM_MM

  let pagina = pdf
  let y = MARGEM_MM
  let primeira = true

  const novaPagina = () => {
    pdf.addPage()
    pagina = pdf
    y = MARGEM_MM
  }

  for (const bloco of blocos) {
    const alturaMm = (bloco.alturaPx / bloco.larguraPx) * larguraUtil
    if (!primeira && y + alturaMm > A4_ALTURA_MM - MARGEM_MM) novaPagina()
    else if (primeira && alturaMm > alturaUtil) {
      // Bloco maior que a folha inteira: reduz para caber (não deve acontecer com cards).
      const escala = alturaUtil / alturaMm
      const largura = larguraUtil * escala
      pdf.addImage(
        bloco.dataUrl,
        'PNG',
        (A4_LARGURA_MM - largura) / 2,
        MARGEM_MM,
        largura,
        alturaUtil,
      )
      primeira = false
      continue
    }
    pdf.addImage(bloco.dataUrl, 'PNG', MARGEM_MM, y, larguraUtil, alturaMm)
    y += alturaMm + 3
    primeira = false
  }

  pdf.save(NOME_ARQUIVO)
}
