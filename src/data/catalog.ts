import carolHeroImg from '../assets/carol-domingues-confeitaria-f0d07.png'
import brigadeiroBranco01 from '../assets/01brigadeiro-branco-83ebd.png'
import brigadeiroBranco02 from '../assets/02brigadeiro-branco-6bdad.png'
import brigadeiroBranco03 from '../assets/03brigadeiro-branco-014be.png'
import brigadeiroBrancoFatiado from '../assets/04brigadeiro-branco-a1dea.png'
import chocotone01 from '../assets/chocotone01-50aa0.png'
import chocotone02 from '../assets/chocotone02-50fa8.png'
import chocotone03 from '../assets/chocotone03-c40c7.png'
import chocotoneFatiado from '../assets/chocotone04-cfab3.png'
import gingerbread01 from '../assets/gingerbread1-670a0.jpg'
import gingerbread02 from '../assets/gingerbread2-77dee.png'
import gingerbread03 from '../assets/gingerbread3-485db.jpg'
import guirlanda01 from '../assets/guirlanda-1-a643e.png'
import guirlanda02 from '../assets/guirlanda-2-480fc.png'
import guirlanda03 from '../assets/guirlanda-3-f9c48.png'
import maracuja01 from '../assets/maracuja-com-brigadeiro01-4824d.png'
import maracuja02 from '../assets/maracuja-com-brigadeiro02-0e926.png'
import maracuja03 from '../assets/maracuja-com-brigadeiro03-51436.png'
import maracujaFatiado from '../assets/panettone-de-maracuja-com-chocolate-1dca2.png'
import paveAbacaxi01 from '../assets/pave-de-abacaxi-com-coco01-f72c8.png'
import paveAbacaxi02 from '../assets/pave-de-abacaxi-com-coco02-f3541.png'
import paveAbacaxi03 from '../assets/pave-de-abacaxi-com-coco03-a8ba2.png'

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

/** Galeria do Brigadeiro Branco, na ordem: 01 capa, 02 close do topo, 03 vista de cima, 04 fatiado. */
const BRIGADEIRO_BRANCO_FOTOS = [
  brigadeiroBranco01,
  brigadeiroBranco02,
  brigadeiroBranco03,
  brigadeiroBrancoFatiado,
]

/** Galeria do Gingerbread, na ordem: 01 mão segurando (capa), 02 close do biscoito, 03 prato cheio. */
const GINGERBREAD_FOTOS = [gingerbread01, gingerbread02, gingerbread03]

/** Galeria do Chocotone, na ordem: 01 produto inteiro (capa), 02 close da cobertura, 03 vista de cima, 04 fatiado. */
const CHOCOTONE_FOTOS = [chocotone01, chocotone02, chocotone03, chocotoneFatiado]

/** Galeria do Mini Chocotone, na ordem: 01 capa (foto própria do mini panetone, hotlink), 02 close da cobertura, 03 vista de cima. Sem a foto fatiada. */
const MINI_CHOCOTONE_FOTOS = [
  'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/e01520b9-84b8-418a-9dc1-1d4e8a2f02db/mini-chocotone-34dd6.png',
  chocotone02,
  chocotone03,
]

/** Galeria do Dois Amores, na ordem: 01 produto inteiro de frente (capa), 02 close da cobertura com os brigadeiros, 03 vista de cima. Fotos hotlinkadas do Google Drive. */
const DOIS_AMORES_FOTOS = [
  'https://lh3.googleusercontent.com/d/1-esB3bAJghnuGWxgBv68z_8zunH-bhb9',
  'https://lh3.googleusercontent.com/d/15cxIlimZrwGmAKYNJZvDAYsgBqYmPmhi',
  'https://lh3.googleusercontent.com/d/1jIjSjKW5K8KHd0uXOjqnnkxejywZVSnS',
]

/** Galeria do Meio Amargo, na ordem: 01 panetone inteiro com brigadeiros no topo (capa), 02 close da cobertura brilhante, 03 vista de cima com os três brigadeiros, 04 fatiado com recheio no prato. Fotos hotlinkadas do Google Drive. */
const MEIO_AMARGO_FOTOS = [
  'https://lh3.googleusercontent.com/d/1IhB7WNGDP0Dw0yG2M27iBGvoWE5nPCn0',
  'https://lh3.googleusercontent.com/d/1csPlABsy4gNKaZGwnjfjbsiNzb35U5LB',
  'https://lh3.googleusercontent.com/d/1Ma4yTeNTG57ZN73-ZqRKxvjOtYC-lk3_',
  'https://lh3.googleusercontent.com/d/1D0wjd4JT5z4eu0Rh6Ykq_c5AwWSx6JKQ',
]

/** Galeria do Ninho com Nutella, na ordem: 01 panetone inteiro (capa), 02 close dos brigadeiros, 03 vista de cima, 04 fatiado. Fotos hotlinkadas do Google Drive. */
const NINHO_NUTELLA_FOTOS = [
  'https://lh3.googleusercontent.com/d/1L-71vH7cbpAw--ahv6rgTh4wvHeByYOT',
  'https://lh3.googleusercontent.com/d/1wuFXnaOo7L_oRru86vo0daJfsv1vLSvc',
  'https://lh3.googleusercontent.com/d/1tG62pNOdgw09EHr4NWbOh0fMnSSr155H',
  'https://lh3.googleusercontent.com/d/1D5D4Qf3e0kQoCvLNdEbWe8FgYcdRT5uu',
]

/** Galeria da Guirlanda de Brownie, na ordem: 01 capa de frente com o laço, 02 vista em ângulo, 03 vista de cima. */
const GUIRLANDA_FOTOS = [guirlanda01, guirlanda02, guirlanda03]

/** Galeria do Maracujá com brigadeiro, na ordem: 01 produto inteiro (capa), 02 close da cobertura, 03 vista de cima, 04 fatiado. */
const MARACUJA_BRIGADEIRO_FOTOS = [maracuja01, maracuja02, maracuja03, maracujaFatiado]

/** Galeria do Pavê de Abacaxi com Coco, na ordem: 01 capa no pote, 02 vista de cima com pinhas e colher, 03 close das camadas. */
const PAVE_ABACAXI_FOTOS = [paveAbacaxi01, paveAbacaxi02, paveAbacaxi03]

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
    images: BRIGADEIRO_BRANCO_FOTOS,
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
    image: CHOCOTONE_FOTOS[0],
    images: CHOCOTONE_FOTOS,
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
    image: DOIS_AMORES_FOTOS[0],
    images: DOIS_AMORES_FOTOS,
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
    image: MARACUJA_BRIGADEIRO_FOTOS[0],
    images: MARACUJA_BRIGADEIRO_FOTOS,
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
    image: MEIO_AMARGO_FOTOS[0],
    images: MEIO_AMARGO_FOTOS,
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
    image: NINHO_NUTELLA_FOTOS[0],
    images: NINHO_NUTELLA_FOTOS,
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
    image: GUIRLANDA_FOTOS[0],
    images: GUIRLANDA_FOTOS,
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
    image: PAVE_ABACAXI_FOTOS[0],
    images: PAVE_ABACAXI_FOTOS,
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
    image: MINI_CHOCOTONE_FOTOS[0],
    images: MINI_CHOCOTONE_FOTOS,
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
    image: GINGERBREAD_FOTOS[0],
    images: GINGERBREAD_FOTOS,
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
