import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { Product, Dessert } from '@/data/catalog'
import { buildWhatsappUrl } from '@/components/WhatsAppOrderButton'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  addDessert: (dessert: Dessert, sizeId: Dessert['sizes'][number]['id']) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getItemQuantity: (productId: string) => number
  getDessertQuantity: (dessertId: string, sizeId: string) => number
  clearCart: () => void
  totalCount: number
  totalPrice: number
  formatCurrency: (value: number) => string
  generateOrderText: () => string
  whatsappUrl: string
  isSelectionOpen: boolean
  setIsSelectionOpen: (open: boolean) => void
}

const STORAGE_KEY = 'carol_domingues_natal_2026_cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item: any) => item?.product?.id && typeof item?.quantity === 'number',
          )
        }
      }
    } catch (e) {
      console.error('Falha ao ler seleção do localStorage', e)
    }
    return []
  })

  const [isSelectionOpen, setIsSelectionOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Falha ao salvar seleção no localStorage', e)
    }
  }, [items])

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const addDessert: CartContextType['addDessert'] = (dessert, sizeId) => {
    const size = dessert.sizes.find((s) => s.id === sizeId)
    if (!size) return
    const id = `${dessert.id}--${sizeId}`
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      const label = size.serves ? `${size.label} (${size.serves})` : size.label
      return [
        ...prev,
        {
          product: {
            id,
            name: `${dessert.name} — ${size.label}`,
            price: size.price,
            weight: size.serves,
            tag: label,
            category: 'sobremesas',
            description: dessert.description || dessert.alt,
            image: dessert.image,
          },
          quantity: 1,
        },
      ]
    })
  }

  const getDessertQuantity = (dessertId: string, sizeId: string) => {
    const found = items.find((item) => item.product.id === `${dessertId}--${sizeId}`)
    return found ? found.quantity : 0
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    )
  }

  const getItemQuantity = (productId: string) => {
    const found = items.find((item) => item.product.id === productId)
    return found ? found.quantity : 0
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0)
  }, [items])

  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [items])

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const generateOrderText = () => {
    if (items.length === 0) {
      return 'Olá, Carol! Gostaria de consultar os produtos do Cardápio de Natal 2026.'
    }

    const lines: string[] = []
    lines.push('Olá, Carol! Quero pedir:')
    lines.push('')

    items.forEach((item) => {
      const subtotal = item.product.price * item.quantity
      lines.push(
        `• ${item.quantity}x ${item.product.name} (${item.product.weight}) - ${formatCurrency(subtotal)}`,
      )
    })

    lines.push('')
    lines.push(
      `Total: ${formatCurrency(totalPrice)} (${totalCount} ${totalCount === 1 ? 'item' : 'itens'})`,
    )

    return lines.join('\n')
  }

  const whatsappUrl = useMemo(() => {
    return buildWhatsappUrl(generateOrderText())
  }, [items, totalPrice, totalCount])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addDessert,
        removeItem,
        updateQuantity,
        getItemQuantity,
        getDessertQuantity,
        clearCart,
        totalCount,
        totalPrice,
        formatCurrency,
        generateOrderText,
        whatsappUrl,
        isSelectionOpen,
        setIsSelectionOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
