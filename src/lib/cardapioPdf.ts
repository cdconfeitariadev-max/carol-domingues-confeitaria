/**
 * Gera o PDF do cardápio de Natal 2026 no próprio app (client-side, sem
 * dependências externas): layout tipográfico limpo no tema natalino do site,
 * com panetones, sobremesas, presentes e informações de pedido — tudo lido
 * de src/data/catalog.ts para os preços nunca divergirem do site.
 */
import {
  PANETTONES,
  DESSERTS,
  GIFTS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  type Dessert,
} from '@/data/catalog'

// ---------- Paleta (mesma do site) ----------
const CREAM: RGB = [0.98, 0.965, 0.933]
const CARD: RGB = [1, 1, 1]
const SOFT: RGB = [0.957, 0.925, 0.871]
const RED: RGB = [0.702, 0.141, 0.18] // #B3242E
const GOLD: RGB = [0.851, 0.643, 0.255] // #D9A441
const CHOCOLATE: RGB = [0.204, 0.157, 0.133] // #342822
const MUTED: RGB = [0.42, 0.353, 0.306] // #6B5A4E

type RGB = [number, number, number]

const F_REG = 'F1'
const F_BOLD = 'F2'
const F_ITALIC = 'F3'

// Métrica Helvetica (largura/1000 por glifo) para centralizar e quebrar linhas.
const AFM: Record<string, number> = {
  ' ': 278,
  '!': 278,
  '"': 355,
  '#': 556,
  $: 556,
  '%': 889,
  '&': 667,
  "'": 191,
  '(': 333,
  ')': 333,
  '*': 389,
  '+': 584,
  ',': 278,
  '-': 333,
  '.': 278,
  '/': 278,
  '0': 556,
  '1': 556,
  '2': 556,
  '3': 556,
  '4': 556,
  '5': 556,
  '6': 556,
  '7': 556,
  '8': 556,
  '9': 556,
  ':': 278,
  ';': 278,
  '<': 584,
  '=': 584,
  '>': 584,
  '?': 556,
  '@': 1015,
  A: 667,
  B: 667,
  C: 722,
  D: 722,
  E: 667,
  F: 611,
  G: 778,
  H: 722,
  I: 278,
  J: 500,
  K: 667,
  L: 556,
  M: 833,
  N: 722,
  O: 778,
  P: 667,
  Q: 778,
  R: 722,
  S: 667,
  T: 611,
  U: 722,
  V: 667,
  W: 944,
  X: 667,
  Y: 667,
  Z: 611,
  '[': 278,
  '\\': 278,
  ']': 278,
  a: 556,
  b: 556,
  c: 500,
  d: 556,
  e: 556,
  f: 278,
  g: 556,
  h: 556,
  i: 222,
  j: 222,
  k: 500,
  l: 222,
  m: 833,
  n: 556,
  o: 556,
  p: 556,
  q: 556,
  r: 333,
  s: 500,
  t: 278,
  u: 556,
  v: 500,
  w: 722,
  x: 500,
  y: 500,
  z: 500,
  Á: 667,
  Â: 667,
  Ã: 667,
  À: 667,
  Ç: 722,
  É: 667,
  Ê: 667,
  Í: 278,
  Ó: 778,
  Ô: 778,
  Õ: 778,
  Ú: 722,
  à: 556,
  á: 556,
  â: 556,
  ã: 556,
  ç: 500,
  é: 556,
  ê: 556,
  í: 222,
  ó: 556,
  ô: 556,
  õ: 556,
  ú: 556,
  '·': 278,
  '©': 737,
}

const glyphWidth = (ch: string, font: string) => {
  let w = AFM[ch]
  if (w === undefined) w = 600 // média segura para acentos não mapeados
  if (font === F_BOLD) w *= 1.05
  return w / 1000
}

const textWidth = (s: string, size: number, font: string) => {
  let total = 0
  for (const ch of s) total += glyphWidth(ch, font)
  return total * size
}

// Quebra por largura real (não por nº de caracteres).
const wrapText = (text: string, size: number, font: string, maxWidth: number) => {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w
    if (line && textWidth(candidate, size, font) > maxWidth) {
      lines.push(line)
      line = w
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

// ---------- Sanitização para WinAnsi/latin1 ----------
const enc = (s: string) =>
  s
    .replace(/•/g, '·')
    .replace(/[—–]/g, '-')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\u00A0/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\u0020-\u00FF]/g, '?')

// ---------- Primitivas de desenho (A4: 595 x 842 pt, y sobe) ----------
class Page {
  ops: string[] = []
  out(str: string) {
    this.ops.push(str)
  }
  content() {
    return this.ops.join('\n')
  }
}

class PdfDoc {
  pages: Page[] = []
  current: Page | null = null
  addPage() {
    this.current = new Page()
    this.pages.push(this.current)
    return this.current
  }
  text(
    str: string,
    opts: { x?: number; y: number; size?: number; font?: string; color?: RGB; width?: number },
  ) {
    const { x = 50, y, size = 10, font = F_REG, color = CHOCOLATE, width } = opts
    const [r, g, b] = color
    let xx = x
    if (width) xx = x + (width - textWidth(str, size, font)) / 2
    this.current!.out(
      `BT /${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${xx.toFixed(2)} ${y.toFixed(2)} Tm (${enc(str)}) Tj ET`,
    )
  }
  textRight(str: string, xRight: number, y: number, size: number, font: string, color: RGB) {
    this.text(str, { x: xRight - textWidth(str, size, font), y, size, font, color })
  }
  rect(x: number, y: number, w: number, h: number, color: RGB) {
    const [r, g, b] = color
    this.current!.out(`${r} ${g} ${b} rg`)
    this.current!.out(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re`)
    this.current!.out('f')
  }
  line(x1: number, y1: number, x2: number, y2: number, color: RGB, width = 1) {
    const [r, g, b] = color
    this.current!.out(`${r} ${g} ${b} RG ${width} w`)
    this.current!.out(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`)
  }
}

const fmt = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`

// ---------- Moldura comum das páginas ----------
const chrome = (doc: PdfDoc, title: string) => {
  doc.rect(0, 0, 595, 842, CREAM)
  doc.rect(0, 792, 595, 50, RED)
  doc.rect(0, 787, 595, 3, GOLD)
  doc.text(title, { x: 0, y: 811, size: 10, font: F_BOLD, color: [1, 1, 1], width: 595 })
  doc.rect(0, 0, 595, 36, RED)
  doc.rect(0, 35, 595, 2, GOLD)
  doc.text('Tem Carol no seu Natal · Coleção 2026', {
    x: 0,
    y: 14,
    size: 9,
    font: F_ITALIC,
    color: [1, 1, 1],
    width: 595,
  })
}

const sectionTitle = (doc: PdfDoc, title: string) => {
  doc.text(title, { x: 50, y: 756, size: 21, font: F_BOLD, color: CHOCOLATE })
  doc.line(50, 744, 545, 744, GOLD, 1.5)
}

// Card de panetone/presentes (h = 78)
const productCard = (
  doc: PdfDoc,
  num: string | null,
  name: string,
  weight: string,
  price: string,
  desc: string,
  cardTop: number,
  accent: RGB,
) => {
  doc.rect(50, cardTop - 78, 495, 78, CARD)
  doc.rect(50, cardTop - 78, 3, 78, accent)
  if (num) doc.text(num, { x: 62, y: cardTop - 22, size: 11, font: F_BOLD, color: GOLD })
  doc.text(name, { x: 84, y: cardTop - 22, size: 13, font: F_BOLD, color: CHOCOLATE })
  doc.textRight(price, 533, cardTop - 22, 13, F_BOLD, RED)
  doc.text(weight, { x: 84, y: cardTop - 36, size: 8.5, font: F_ITALIC, color: MUTED })
  let dy = cardTop - 52
  for (const l of wrapText(desc, 9, F_REG, 445)) {
    doc.text(l, { x: 84, y: dy, size: 9, color: MUTED })
    dy -= 11
  }
}

const dessertSizeInfo = (d: Dessert) => {
  const unico = d.sizes.find((s) => s.id === 'unico')
  if (unico) {
    return {
      sizes: unico.serves ? `Tamanho único · ${unico.serves}` : 'Tamanho único',
      prices: fmt(unico.price),
    }
  }
  const mini = d.sizes.find((s) => s.id === 'mini')
  const grande = d.sizes.find((s) => s.id === 'grande')
  const sizeLabel = [
    mini ? `Mini (${mini.serves || '4 pessoas'})` : null,
    grande ? `Grande${grande.serves ? ` (${grande.serves})` : ''}` : null,
  ]
    .filter(Boolean)
    .join(' · ')
  const priceLabel = [
    mini ? `Mini ${fmt(mini.price)}` : null,
    grande ? `Grande ${fmt(grande.price)}` : null,
  ]
    .filter(Boolean)
    .join(' · ')
  return { sizes: sizeLabel, prices: priceLabel }
}

const buildPdf = () => {
  const doc = new PdfDoc()

  // ===== Página 1: capa =====
  doc.addPage()
  chrome(doc, 'CAROL DOMINGUES')
  doc.text('Cardápio de Natal', { x: 50, y: 690, size: 34, font: F_BOLD, color: CHOCOLATE })
  doc.text('Tem Carol no seu Natal', { x: 50, y: 656, size: 20, font: F_ITALIC, color: RED })
  doc.line(50, 638, 545, 638, GOLD, 2)
  doc.text('Panetones artesanais de 1 kg com recheios fartos,', {
    x: 50,
    y: 606,
    size: 11,
    color: MUTED,
  })
  doc.text('sobremesas exclusivas e pequenos mimos para', {
    x: 50,
    y: 592,
    size: 11,
    color: MUTED,
  })
  doc.text('celebrar o Natal com quem você mais ama.', { x: 50, y: 578, size: 11, color: MUTED })

  doc.text('Neste cardápio', { x: 50, y: 534, size: 13, font: F_BOLD, color: CHOCOLATE })
  let idxY = 510
  for (const [label, pg] of [
    ['Os Panetones (1 kg)', '2'],
    ['As Sobremesas', '3'],
    ['Pequenos Presentes', '4'],
    ['Informações de Pedido', '4'],
  ] as const) {
    doc.text(`·  ${label}`, { x: 58, y: idxY, size: 11, color: CHOCOLATE })
    doc.text(`p. ${pg}`, { x: 500, y: idxY, size: 11, color: RED })
    idxY -= 17
  }

  doc.rect(50, 320, 495, 130, SOFT)
  doc.rect(50, 446, 495, 4, RED)
  doc.text('Coleção 2026', { x: 50, y: 418, size: 12, font: F_BOLD, color: RED, width: 495 })
  doc.text('3 clássicos a R$ 89,90 · 2 combinações a R$ 99,90', {
    x: 50,
    y: 394,
    size: 11,
    color: CHOCOLATE,
    width: 495,
  })
  doc.text('2 especiais com Nutella a R$ 109,90', {
    x: 50,
    y: 378,
    size: 11,
    color: CHOCOLATE,
    width: 495,
  })
  doc.text(`Pedidos pelo WhatsApp ${WHATSAPP_DISPLAY}`, {
    x: 50,
    y: 348,
    size: 11,
    font: F_BOLD,
    color: RED,
    width: 495,
  })

  // ===== Página 2: Panetones =====
  doc.addPage()
  chrome(doc, 'CAROL DOMINGUES · CARDÁPIO DE NATAL 2026')
  sectionTitle(doc, 'Os Panetones (1 kg)')
  let y = 712
  for (const p of PANETTONES) {
    productCard(doc, p.number ?? null, p.name, p.weight, fmt(p.price), p.description, y, RED)
    y -= 88
  }

  // ===== Página 3: Sobremesas =====
  doc.addPage()
  chrome(doc, 'CAROL DOMINGUES · CARDÁPIO DE NATAL 2026')
  sectionTitle(doc, 'As Sobremesas')
  y = 710
  for (const d of DESSERTS) {
    const { sizes, prices } = dessertSizeInfo(d)
    doc.rect(50, y - 116, 495, 116, CARD)
    doc.rect(50, y - 116, 3, 116, GOLD)
    doc.text(d.name, { x: 64, y: y - 24, size: 13, font: F_BOLD, color: CHOCOLATE })
    doc.text(sizes, { x: 64, y: y - 40, size: 9.5, font: F_ITALIC, color: MUTED })
    doc.text(prices, { x: 64, y: y - 57, size: 10.5, font: F_BOLD, color: RED })
    let dy = y - 76
    for (const l of wrapText(d.description ?? '', 9, F_REG, 445)) {
      doc.text(l, { x: 64, y: dy, size: 9, color: MUTED })
      dy -= 11
    }
    y -= 128
  }

  // ===== Página 4: Presentes + Informações de Pedido =====
  doc.addPage()
  chrome(doc, 'CAROL DOMINGUES · CARDÁPIO DE NATAL 2026')
  sectionTitle(doc, 'Pequenos Presentes')
  y = 712
  for (const g of GIFTS) {
    productCard(doc, null, g.name, g.weight, fmt(g.price), g.description, y, GOLD)
    y -= 88
  }

  // Box de pedido
  const boxTop = y - 10
  doc.rect(50, 200, 495, boxTop - 200, SOFT)
  doc.rect(50, boxTop - 4, 495, 4, RED)
  doc.text('Informações de Pedido', {
    x: 50,
    y: boxTop - 30,
    size: 14,
    font: F_BOLD,
    color: CHOCOLATE,
    width: 495,
  })
  const orderLines: { t: string; bold?: boolean; red?: boolean }[] = [
    {
      t: `Pedidos pelo WhatsApp ${WHATSAPP_DISPLAY} · wa.me/${WHATSAPP_NUMBER}`,
      bold: true,
      red: true,
    },
    { t: '' },
    { t: 'Escolha seus produtos, envie sua lista pelo WhatsApp e combine os' },
    { t: 'detalhes diretamente com a Carol.' },
    { t: '' },
    { t: 'Prazo, disponibilidade, pagamento e opções de retirada ou entrega' },
    { t: 'são confirmados diretamente com a confeitaria antes da encomenda.' },
    { t: '' },
    {
      t: `Instagram: ${INSTAGRAM_URL.replace('https://www.instagram.com/', '@').replace('/', '')}`,
    },
  ]
  let oy = boxTop - 52
  for (const { t, bold, red } of orderLines) {
    if (t) {
      doc.text(t, {
        x: 66,
        y: oy,
        size: 10,
        font: bold ? F_BOLD : F_REG,
        color: red ? RED : CHOCOLATE,
      })
    }
    oy -= 15
  }

  doc.text('Carol Domingues - Tem Carol no seu Natal · Coleção 2026', {
    x: 0,
    y: 130,
    size: 10,
    font: F_ITALIC,
    color: MUTED,
    width: 595,
  })
  doc.text('© 2026 Carol Domingues Confeitaria. Todos os direitos reservados.', {
    x: 0,
    y: 114,
    size: 8.5,
    color: MUTED,
    width: 595,
  })
  doc.text('Feito com carinho para o Natal', {
    x: 0,
    y: 98,
    size: 8.5,
    font: F_ITALIC,
    color: RED,
    width: 595,
  })

  return doc
}

// ---------- Montagem do arquivo PDF ----------
const buildFile = () => {
  const doc = buildPdf()
  const n = doc.pages.length

  // IDs em sequência, sem colisão:
  // 1..n: content streams | n+1..n+3: fontes | n+4..: páginas | Pages | Catalog
  const contentIds: number[] = []
  const fontRegularId = n + 1
  const fontBoldId = n + 2
  const fontItalicId = n + 3
  const firstPageObjId = n + 4
  const pagesId = firstPageObjId + n
  const catalogId = pagesId + 1

  const objects: string[] = []
  for (let i = 0; i < n; i++) {
    contentIds.push(
      objects.push(
        `<< /Length ${doc.pages[i].content().length} >>\nstream\n${doc.pages[i].content()}\nendstream`,
      ),
    )
  }
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
  objects.push(
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  )
  objects.push(
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>',
  )
  for (let i = 0; i < n; i++) {
    objects.push(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] ` +
        `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R >> >> ` +
        `/Contents ${contentIds[i]} 0 R >>`,
    )
  }
  const kids: string[] = []
  for (let i = 0; i < n; i++) kids.push(`${firstPageObjId + i} 0 R`)
  objects.push(`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${n} >>`)
  objects.push(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`)

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = [0]
  for (let i = 0; i < objects.length; i++) {
    offsets.push(pdf.length)
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
  }
  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

  // latin1: cada char cabe em 1 byte (enc() já sanitizou o resto)
  const bytes = new Uint8Array(pdf.length)
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff
  return bytes
}

/**
 * Gera o PDF e dispara o download ("Baixar o cardápio · PDF").
 * O arquivo é criado pelo próprio app, na hora, sem nenhum domínio externo.
 */
export const downloadCardapioPdf = () => {
  const bytes = buildFile()
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cardapio-natal-carol-2026.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 30_000)
}
