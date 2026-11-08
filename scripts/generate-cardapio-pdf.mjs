/**
 * Gera o cardápio em PDF da Coleção de Natal 2026 (Carol Domingues Confeitaria)
 * em public/cardapio-natal-carol.pdf, sem dependências externas.
 *
 * Layout tipográfico limpo no tema natalino do site (creme/vermelho/dourado),
 * sem fotos. Roda automaticamente antes do build (npm run prebuild) e se
 * autovalida: se o PDF sair malformado, o processo falha.
 *
 * Executar: node scripts/generate-cardapio-pdf.mjs
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(here, '..', 'public', 'cardapio-natal-carol.pdf')

// ---------- Paleta (mesma do site) ----------
const CREAM = [0.98, 0.965, 0.933] // #FAF6EE
const CARD = [1, 1, 1]
const SOFT = [0.957, 0.925, 0.871] // #F4ECDF
const RED = [0.702, 0.141, 0.18] // #B3242E
const GOLD = [0.851, 0.643, 0.255] // #D9A441
const CHOCOLATE = [0.204, 0.157, 0.133] // #342822
const MUTED = [0.42, 0.353, 0.306] // #6B5A4E

const F_REG = 'F1'
const F_BOLD = 'F2'
const F_ITALIC = 'F3'

// Métrica Helvetica (largura/1000 por glifo) para centralizar e quebrar linhas.
const AFM = {
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
  0: 556,
  1: 556,
  2: 556,
  3: 556,
  4: 556,
  5: 556,
  6: 556,
  7: 556,
  8: 556,
  9: 556,
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

const glyphWidth = (ch, font) => {
  let w = AFM[ch]
  if (w === undefined) w = 600 // média segura para acentos não mapeados
  if (font === F_BOLD) w *= 1.05
  return w / 1000
}

const textWidth = (s, size, font) => {
  let total = 0
  for (const ch of s) total += glyphWidth(ch, font)
  return total * size
}

// Quebra por largura real (não por nº de caracteres).
const wrapText = (text, size, font, maxWidth) => {
  const words = text.split(' ')
  const lines = []
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

// ---------- Dados do cardápio (mesmos preços/textos do site) ----------
const PANETTONES = [
  [
    '01',
    'Panetone',
    'R$ 89,90',
    '1 kg',
    'Massa de panetone com frutas cristalizadas, recheio de brigadeiro branco e cobertura de chocolate branco nobre com frutas cristalizadas.',
  ],
  [
    '02',
    'Chocotone',
    'R$ 89,90',
    '1 kg',
    'Massa de chocotone com gotas de chocolate ao leite, recheio de brigadeiro e cobertura de chocolate nobre ao leite com gotas de chocolate.',
  ],
  [
    '03',
    'Dois amores',
    'R$ 89,90',
    '1 kg',
    'Recheio de brigadeiro Ninho e brigadeiro ao leite. Cobertura de chocolate nobre branco e ao leite.',
  ],
  [
    '04',
    'Maracujá com brigadeiro',
    'R$ 99,90',
    '1 kg',
    'Recheio de brigadeiro de maracujá com brigadeiro ao leite. Cobertura de chocolate branco nobre com geleia de maracujá.',
  ],
  [
    '05',
    'Meio amargo',
    'R$ 99,90',
    '1 kg',
    'Recheio de brigadeiro de chocolate meio amargo e cobertura de chocolate nobre meio amargo.',
  ],
  [
    '06',
    'Ninho com Nutella',
    'R$ 109,90',
    '1 kg',
    'Recheio de brigadeiro Ninho com Nutella. Cobertura de chocolate branco nobre com Nutella.',
  ],
  [
    '07',
    'Kinder',
    'R$ 109,90',
    '1 kg',
    'Recheio de mousse de Ninho e mousse de Nutella. Cobertura de chocolate branco nobre e Kinder Bueno.',
  ],
]

const DESSERTS = [
  [
    'Guirlanda de Brownie',
    'Tamanho único · serve 10 pessoas',
    'R$ 129,90',
    'Brownie, brigadeiro ao leite, decorada com morangos, nozes, brigadeiros e cerejas.',
  ],
  [
    'Sobremesa Natalina',
    'Mini (4 pessoas) · Grande (10 a 15 pessoas)',
    'Mini R$ 69,90 · Grande R$ 189,90',
    'Mousse de chocolate meio amargo, geleia de frutas vermelhas artesanal e massa de chocotone.',
  ],
  [
    'Folhata de Morango',
    'Mini (4 pessoas) · Grande (10 a 15 pessoas)',
    'Mini R$ 69,90 · Grande R$ 189,90',
    'Massa folhada, creme de 3 leites, leite ninho e morangos.',
  ],
  [
    'Pavê de Abacaxi com Coco',
    'Mini (4 pessoas) · Grande',
    'Mini R$ 69,90 · Grande R$ 189,90',
    'Mousse de abacaxi com coco e bolacha champanhe umedecida no licor de chocolate.',
  ],
]

const GIFTS = [
  [
    'Mini chocotone',
    'R$ 19,90',
    '250 g',
    'Mini chocotone de 250 g, perfeito para lembranças afetuosas e pequenos gestos de carinho.',
  ],
  [
    'Gingerbread',
    'R$ 14,90',
    '3 unidades',
    'Biscoitos de Natal de especiarias. Porção com 3 unidades, nos formatos árvore de Natal e boneco de neve.',
  ],
]

// ---------- Sanitização para WinAnsi ----------
const enc = (s) =>
  s
    .replace(/•/g, '·')
    .replace(/[—–]/g, '-')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\u00A0/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')

// ---------- Primitivas de desenho (A4: 595 x 842 pt, y sobe) ----------
class Page {
  constructor() {
    this.ops = []
  }
  out(str) {
    this.ops.push(str)
  }
  content() {
    return this.ops.join('\n')
  }
}

class Doc {
  constructor() {
    this.pages = []
    this.current = null
  }
  addPage() {
    this.current = new Page()
    this.pages.push(this.current)
    return this.current
  }
  text(str, { x = 50, y, size = 10, font = F_REG, color = CHOCOLATE, width }) {
    const [r, g, b] = color
    let xx = x
    if (width) xx = x + (width - textWidth(str, size, font)) / 2
    this.current.out(
      `BT /${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${xx.toFixed(2)} ${y.toFixed(2)} Tm (${enc(str)}) Tj ET`,
    )
  }
  textRight(str, xRight, y, size, font, color) {
    this.text(str, { x: xRight - textWidth(str, size, font), y, size, font, color })
  }
  rect(x, y, w, h, color) {
    const [r, g, b] = color
    this.current.out(`${r} ${g} ${b} rg`)
    this.current.out(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re`)
    this.current.out('f')
  }
  line(x1, y1, x2, y2, color, width = 1) {
    const [r, g, b] = color
    this.current.out(`${r} ${g} ${b} RG ${width} w`)
    this.current.out(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`)
  }
}

// ---------- Moldura comum das páginas ----------
const chrome = (doc, title) => {
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

const sectionTitle = (doc, title) => {
  doc.text(title, { x: 50, y: 756, size: 21, font: F_BOLD, color: CHOCOLATE })
  doc.line(50, 744, 545, 744, GOLD, 1.5)
}

// Card de panetone/presentes (h = 78): nº, nome, peso, preço à direita, descrição
const productCard = (doc, num, name, weight, price, desc, cardTop, accent) => {
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

const buildPdf = () => {
  const doc = new Doc()

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
  doc.text('sobremesas exclusivas e pequenos mimos para', { x: 50, y: 592, size: 11, color: MUTED })
  doc.text('celebrar o Natal com quem você mais ama.', { x: 50, y: 578, size: 11, color: MUTED })

  doc.text('Neste cardápio', { x: 50, y: 534, size: 13, font: F_BOLD, color: CHOCOLATE })
  let idxY = 510
  for (const [label, pg] of [
    ['Os Panetones (1 kg)', '2'],
    ['As Sobremesas', '3'],
    ['Pequenos Presentes', '4'],
    ['Informações de Pedido', '4'],
  ]) {
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
  doc.text('Pedidos pelo WhatsApp (17) 99135-3873', {
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
  for (const [num, name, price, weight, desc] of PANETTONES) {
    productCard(doc, num, name, weight, price, desc, y, RED)
    y -= 88
  }

  // ===== Página 3: Sobremesas =====
  doc.addPage()
  chrome(doc, 'CAROL DOMINGUES · CARDÁPIO DE NATAL 2026')
  sectionTitle(doc, 'As Sobremesas')
  y = 710
  for (const [name, sizes, prices, desc] of DESSERTS) {
    doc.rect(50, y - 116, 495, 116, CARD)
    doc.rect(50, y - 116, 3, 116, GOLD)
    doc.text(name, { x: 64, y: y - 24, size: 13, font: F_BOLD, color: CHOCOLATE })
    doc.text(sizes, { x: 64, y: y - 40, size: 9.5, font: F_ITALIC, color: MUTED })
    doc.text(prices, { x: 64, y: y - 57, size: 10.5, font: F_BOLD, color: RED })
    let dy = y - 76
    for (const l of wrapText(desc, 9, F_REG, 445)) {
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
  for (const [name, price, weight, desc] of GIFTS) {
    productCard(doc, null, name, weight, price, desc, y, GOLD)
    y -= 88
  }

  // Box de pedido
  const boxTop = y - 10
  const boxH = boxTop - 200
  doc.rect(50, 200, 495, boxH, SOFT)
  doc.rect(50, boxTop - 4, 495, 4, RED)
  doc.text('Informações de Pedido', {
    x: 50,
    y: boxTop - 30,
    size: 14,
    font: F_BOLD,
    color: CHOCOLATE,
    width: 495,
  })
  const orderLines = [
    { t: 'Pedidos pelo WhatsApp (17) 99135-3873 · wa.me/5517991353873', bold: true, red: true },
    { t: '' },
    {
      t: 'Escolha seus produtos, envie sua lista pelo WhatsApp e combine os',
    },
    { t: 'detalhes diretamente com a Carol.' },
    { t: '' },
    {
      t: 'Prazo, disponibilidade, pagamento e opções de retirada ou entrega',
    },
    {
      t: 'são confirmados diretamente com a confeitaria antes da encomenda.',
    },
    { t: '' },
    { t: 'Instagram: @caroldominguesconfeitaria' },
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

  // IDs atribuídos em sequência, sem colisão:
  // 1..n: content streams | n+1..n+3: fontes | n+4..n+4+n-1: páginas | n+4+n: Pages | +1: Catalog
  const contentIds = []
  const fontRegularId = n + 1
  const fontBoldId = n + 2
  const fontItalicId = n + 3
  const firstPageObjId = n + 4
  const pagesId = firstPageObjId + n
  const catalogId = pagesId + 1

  const objects = []
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
  const kids = []
  for (let i = 0; i < n; i++) kids.push(`${firstPageObjId + i} 0 R`)
  objects.push(`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${n} >>`)
  objects.push(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`)

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
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

  const bytes = Buffer.from(pdf, 'latin1')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, bytes)
  return { bytes, n }
}

// ---------- Autovalidação: o PDF só passa se estiver íntegro ----------
const validatePdf = (bytes, expectedPages) => {
  const s = bytes.toString('latin1')
  if (!s.startsWith('%PDF-1.4')) throw new Error('header ausente')
  if (!s.trimEnd().endsWith('%%EOF')) throw new Error('%%EOF ausente')

  const startxref = s.lastIndexOf('startxref')
  const xrefStart = parseInt(s.slice(startxref + 9).trim(), 10)
  const xref = s.slice(xrefStart, s.indexOf('trailer', xrefStart))
  const entries = xref.split('\n').slice(2)

  const expectedTexts = [
    'Tem Carol no seu Natal',
    'Cardápio de Natal',
    'Os Panetones (1 kg)',
    ...PANETTONES.map((p) => p[1]),
    'As Sobremesas',
    ...DESSERTS.map((d) => d[0]),
    'Pequenos Presentes',
    ...GIFTS.map((g) => g[0]),
    'Informações de Pedido',
    '(17) 99135-3873',
    'wa.me/5517991353873',
    '@caroldominguesconfeitaria',
  ]
  const missing = expectedTexts.filter((t) => !s.includes(`(${enc(t)}) Tj`))
  if (missing.length > 0) throw new Error(`textos ausentes no PDF: ${missing.join(' | ')}`)

  let ok = 0
  for (let i = 1; i <= expectedTexts.length + 100; i++) {
    const row = entries[i]
    if (!row) break
    const offset = parseInt(row.slice(0, 10), 10)
    const expected = `${i} 0 obj`
    if (s.slice(offset, offset + expected.length) !== expected) {
      throw new Error(`xref desalinhado no objeto ${i} (offset ${offset})`)
    }
    ok++
  }
  if (ok < 2 * expectedPages + 5) throw new Error(`poucos objetos válidos (${ok})`)
}

const { bytes, n } = buildFile()
validatePdf(readFileSync(outPath), n)
console.log(`PDF gerado e validado: ${outPath} (${bytes.length} bytes, ${n} páginas)`)
