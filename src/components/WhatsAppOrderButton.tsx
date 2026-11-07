import React from 'react'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/data/catalog'

export const buildWhatsappUrl = (message: string) => {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

/** Mensagem de pedido direto: "Olá, Carol! Quero pedir: [produto] ([tamanho])" */
export const buildProductOrderMessage = (productName: string, sizeLabel?: string) => {
  const size = sizeLabel ? ` (${sizeLabel})` : ''
  return `Olá, Carol! Quero pedir: ${productName}${size}`
}

interface WhatsAppOrderButtonProps {
  message: string
  label?: string
  ariaLabel?: string
  className?: string
}

export const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  message,
  label = 'Pedir pelo WhatsApp',
  ariaLabel,
  className = 'flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm',
}) => {
  return (
    <a
      href={buildWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || label}
      className={className}
    >
      <MessageCircle className="w-3.5 h-3.5" />
      <span>{label}</span>
    </a>
  )
}
