import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Heart } from 'lucide-react'
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/data/catalog'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D211A] text-[#D8C9B9] pt-14 pb-24 sm:pb-16 border-t border-[#443328]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#443328]">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF6EE] tracking-wide">
              CAROL DOMINGUES
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#B3242E] font-semibold">
              Confeitaria · Coleção de Natal 2026
            </p>
            <p className="text-xs sm:text-sm text-[#B4A394] max-w-md leading-relaxed">
              Panetones artesanais de 1 kg com recheios fartos, sobremesas exclusivas e pequenos
              mimos para celebrar o Natal com quem você mais ama.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#FAF6EE] font-serif mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#cardapio" className="hover:text-[#FAF6EE] transition-colors">
                  Os Panetones (1 kg)
                </a>
              </li>
              <li>
                <a href="#por-dentro" className="hover:text-[#FAF6EE] transition-colors">
                  Por dentro da coleção
                </a>
              </li>
              <li>
                <a href="#sobremesas" className="hover:text-[#FAF6EE] transition-colors">
                  As Sobremesas
                </a>
              </li>
              <li>
                <a href="#presentes" className="hover:text-[#FAF6EE] transition-colors">
                  Pequenos Presentes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FAF6EE] transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
              <li className="pt-1">
                <Link
                  to="/cardapio"
                  className="inline-flex items-center gap-1.5 text-[#D9A441] hover:text-[#FAF6EE] font-semibold transition-colors"
                >
                  <span>Baixar cardápio em PDF</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact channels */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#FAF6EE] font-serif mb-3">
              Contato & Pedidos
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FAF6EE] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#D9A441]" />
                <span>@caroldominguesconfeitaria</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FAF6EE] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
            <p className="text-[11px] text-[#9E8E81] pt-2">
              Atendimento e confirmação de encomendas sob consulta.
            </p>
          </div>
        </div>

        {/* Bottom copyright line verbatim */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8F7E70]">
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
  )
}
