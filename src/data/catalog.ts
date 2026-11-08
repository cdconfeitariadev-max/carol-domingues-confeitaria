import carolHeroImg from '../assets/carol-domingues-confeitaria-f0d07.png'
import brigadeiroBrancoFatiado from '../assets/04brigadeiro-branco-8a883.png'

export interface Product {
  id: string
  number?: string
  name: string
  price: number
  weight: string
  tag: string
  category: 'classicos' | 'especiais' | 'presentes' | 'sobremesas'
  flavorCategory?: 'chocolate' | 'fruta' | 'ninho'
  description: string
  /** Foto de capa do card (primeira da galeria). */
  image: string
  /** Galeria completa, na ordem de exibição. Quando ausente, usa só `image`. */
  images?: string[]
  highlight?: boolean
}

export interface DessertSize {
  id: 'unico' | 'mini' | 'grande'
  label: string
  serves: string
  price: number
}

export interface Dessert {
  id: string
  name: string
  image: string
  images?: string[]
  alt: string
  description?: string
  sizes: DessertSize[]
}

const BRIGADEIRO_BRANCO_FOTOS = [
  'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/e01520b9-84b8-418a-9dc1-1d4e8a2f02db/01brigadeiro-branco-6ce5a.png',
  'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/e01520b9-84b8-418a-9dc1-1d4e8a2f02db/02brigadeiro-branco-4cd98.png',
  'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/e01520b9-84b8-418a-9dc1-1d4e8a2f02db/03brigadeiro-branco-28bfb.png',
]

/** Lista de fotos do produto para a galeria (sempre ao menos a foto de capa). */
export const productImages = (item: { image: string; images?: string[] }): string[] =>
  item.images && item.images.length > 0 ? item.images : [item.image]

export interface FaqItem {
  question: string
  answer: string
}

export const INSTAGRAM_URL = 'https://www.instagram.com/caroldominguesconfeitaria/'
export const WHATSAPP_NUMBER = '5517991353873'
export const WHATSAPP_DISPLAY = '(17) 99135-3873'
export const HERO_ASSETS = {
  carolHero: carolHeroImg,
  mascoteOi:
    'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/brand/mascote-oi.webp',
  mascoteNatal:
    'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/brand/mascote-natal.webp',
  recheioFatiado:
    'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/recheio-colecao-v10.webp',
}

export const FLAVOR_TICKER = [
  'Brigadeiro branco',
  'Chocolate ao leite',
  'Dois amores',
  'Maracujá',
  'Meio amargo',
  'Ninho com Nutella',
  'Kinder',
]

export const PANETTONES: Product[] = [
  {
    id: 'panetone-frutas',
    number: '01',
    name: 'Panetone',
    price: 89.9,
    weight: '1 kg',
    tag: 'Brigadeiro branco',
    category: 'classicos',
    flavorCategory: 'fruta',
    description:
      'Massa de panetone com frutas cristalizadas, recheio de brigadeiro branco e cobertura de chocolate branco nobre com frutas cristalizadas.',
    image: BRIGADEIRO_BRANCO_FOTOS[0],
    images: [...BRIGADEIRO_BRANCO_FOTOS.slice(0, 3), brigadeiroBrancoFatiado],
  },
  {
    id: 'chocotone-brigadeiro',
    number: '02',
    name: 'Chocotone',
    price: 89.9,
    weight: '1 kg',
    tag: 'Brigadeiro',
    category: 'classicos',
    flavorCategory: 'chocolate',
    description:
      'Massa de chocotone com gotas de chocolate ao leite, recheio de brigadeiro e cobertura de chocolate nobre ao leite com gotas de chocolate.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/brigadeiro-v10.webp',
  },
  {
    id: 'dois-amores',
    number: '03',
    name: 'Dois amores',
    price: 89.9,
    weight: '1 kg',
    tag: 'Ninho + chocolate ao leite',
    category: 'classicos',
    flavorCategory: 'chocolate',
    description:
      'Recheio de brigadeiro Ninho e brigadeiro ao leite. Cobertura de chocolate nobre branco e ao leite.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/dois-amores-v10.webp',
  },
  {
    id: 'maracuja-brigadeiro',
    number: '04',
    name: 'Maracujá com brigadeiro',
    price: 99.9,
    weight: '1 kg',
    tag: 'Fruta + chocolate',
    category: 'especiais',
    flavorCategory: 'fruta',
    description:
      'Recheio de brigadeiro de maracujá com brigadeiro ao leite. Cobertura de chocolate branco nobre com geleia de maracujá.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/maracuja-v10.webp',
  },
  {
    id: 'meio-amargo',
    number: '05',
    name: 'Meio amargo',
    price: 99.9,
    weight: '1 kg',
    tag: 'Chocolate em destaque',
    category: 'especiais',
    flavorCategory: 'chocolate',
    description:
      'Recheio de brigadeiro de chocolate meio amargo e cobertura de chocolate nobre meio amargo.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/meio-amargo-v10.webp',
  },
  {
    id: 'ninho-nutella',
    number: '06',
    name: 'Ninho com Nutella',
    price: 109.9,
    weight: '1 kg',
    tag: 'Uma combinação para celebrar',
    category: 'especiais',
    flavorCategory: 'ninho',
    description:
      'Recheio de brigadeiro Ninho com Nutella. Cobertura de chocolate branco nobre com Nutella.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/ninho-nutella-v10.webp',
    highlight: true,
  },
  {
    id: 'kinder',
    number: '07',
    name: 'Kinder',
    price: 109.9,
    weight: '1 kg',
    tag: 'Ninho + Nutella + Kinder Bueno',
    category: 'especiais',
    flavorCategory: 'ninho',
    description:
      'Recheio de mousse de Ninho e mousse de Nutella. Cobertura de chocolate branco nobre e Kinder Bueno.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/kinder-v10.webp',
    highlight: true,
  },
]

export const DESSERTS: Dessert[] = [
  {
    id: 'sobremesa-guirlanda',
    name: 'Guirlanda de Brownie',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/sobremesa-guirlanda-v10.webp',
    alt: 'Sobremesa em formato de guirlanda, com laço e decoração, fotografada pela confeitaria',
    description:
      'Brownie, brigadeiro ao leite, decorada com morangos, nozes, brigadeiros e cerejas.',
    sizes: [
      {
        id: 'unico',
        label: 'Único',
        serves: 'Serve 10 pessoas',
        price: 129.9,
      },
    ],
  },
  {
    id: 'sobremesa-camadas',
    name: 'Sobremesa Natalina',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/sobremesa-camadas-v10.webp',
    alt: 'Sobremesa em recipiente de vidro, com camadas aparentes e decoração no topo',
    description:
      'Mousse de chocolate meio amargo, geleia de frutas vermelhas artesanal e massa de chocotone.',
    sizes: [
      { id: 'mini', label: 'Mini', serves: '4 pessoas', price: 69.9 },
      { id: 'grande', label: 'Grande', serves: '10 a 15 pessoas', price: 189.9 },
    ],
  },
  {
    id: 'sobremesa-decorada',
    name: 'Folhata de Morango',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/sobremesa-decorada-v10.webp',
    alt: 'Outra sobremesa em recipiente de vidro, decorada para o Natal',
    description: 'Massa folhada, creme de 3 leites, leite ninho e morangos.',
    sizes: [
      { id: 'mini', label: 'Mini', serves: '4 pessoas', price: 69.9 },
      { id: 'grande', label: 'Grande', serves: '10 a 15 pessoas', price: 189.9 },
    ],
  },
  {
    id: 'sobremesa-branca',
    name: 'Pavê de Abacaxi com Coco',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/sobremesa-branca-v10.webp',
    alt: 'Sobremesa em recipiente de vidro, com decoração branca e frutas amarelas no topo',
    description: 'Mousse de abacaxi com coco e bolacha champanhe umedecida no licor de chocolate.',
    sizes: [
      { id: 'mini', label: 'Mini', serves: '4 pessoas', price: 69.9 },
      { id: 'grande', label: 'Grande', serves: '', price: 189.9 },
    ],
  },
]

export const GIFTS: Product[] = [
  {
    id: 'mini-chocotone',
    name: 'Mini chocotone',
    price: 19.9,
    weight: '250 g',
    tag: 'Mini chocotone de 250 g.',
    category: 'presentes',
    description:
      'Mini chocotone de 250 g, perfeito para lembranças afetuosas e pequenos gestos de carinho.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/brigadeiro-v10.webp',
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    price: 14.9,
    weight: '3 unidades',
    tag: 'Biscoitos de especiarias',
    category: 'presentes',
    description:
      'Biscoitos de Natal de especiarias. Porção com 3 unidades, nos formatos árvore de Natal e boneco de neve.',
    image:
      'https://carol-domingues-natal-2026.nathygarcia85.chatgpt.site/assets/optimized/gingerbread-v10.webp',
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como faço para encomendar?',
    answer:
      'Adicione seus favoritos à seleção, ajuste as quantidades e copie a lista. Depois, abra o Instagram da Carol ou envie pelo WhatsApp para confirmar a encomenda com a equipe.',
  },
  {
    question: 'Qual é o prazo? Há retirada ou entrega?',
    answer:
      'Prazo, disponibilidade, pagamento e opções de retirada ou entrega são confirmados diretamente com a Carol antes da encomenda.',
  },
  {
    question: 'Onde vejo os sabores e valores das sobremesas?',
    answer:
      'As fotos apresentam outras criações da confeitaria. Consulte a Carol para confirmar os sabores, os tamanhos e os valores disponíveis.',
  },
  {
    question: 'Tenho uma restrição alimentar. Como consultar?',
    answer:
      'Converse com a Carol sobre ingredientes e restrições alimentares antes de escolher seus produtos.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Encontre seu sabor',
    description: 'Confira os recheios, os pesos e os valores da coleção.',
  },
  {
    step: '02',
    title: 'Faça sua seleção',
    description:
      'Adicione os produtos e ajuste as quantidades. A lista fica salva no seu navegador.',
  },
  {
    step: '03',
    title: 'Converse com a Carol',
    description: 'Copie a lista e envie pelo WhatsApp ou Instagram para consultar as condições.',
  },
]

export const INSIDE_COLLECTION_TABS = {
  recheios: {
    title: 'Recheios fartos e cremosos',
    description:
      'Brigadeiros nobres cozidos no ponto perfeito: brigadeiro de colher, Ninho cremoso, mousse aerado e geleias artesanais com frutas de verdade.',
    highlights: [
      'Brigadeiro ao leite & meio amargo',
      'Mousse de Ninho & mousse de Nutella',
      'Geleia artesanal de maracujá',
    ],
  },
  coberturas: {
    title: 'Chocolates nobres e finalizações artesanais',
    description:
      'Casquinhas e coberturas com puro chocolate nobre, confeitos crocantes, Kinder Bueno autêntico, gotas de chocolate e frutas cristalizadas premium.',
    highlights: [
      'Chocolate branco & ao leite nobres',
      'Toques de Nutella e Kinder Bueno',
      'Frutas selecionadas',
    ],
  },
  sabores: {
    title: 'Sete criações com personalidade própria',
    description:
      'Desde os tradicionais panetones com frutas até as combinações indulgentes mais pedidas, pensadas para o centro da mesa na ceia de Natal.',
    highlights: [
      '3 clássicos a R$ 89,90',
      '2 combinações a R$ 99,90',
      '2 especiais com Nutella a R$ 109,90',
    ],
  },
}
