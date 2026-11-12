import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShoppingBag, FileText } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const { totalCount, setIsSelectionOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top micro banner */}
      <div className="bg-[#8A1A22] text-[#FDEBD2] text-[11px] sm:text-xs py-1.5 px-3 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E5B55A] animate-pulse shrink-0" />
        <span>Encomendas abertas · Coleção de Natal 2026</span>
      </div>

      {/* Sticky Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF6EE]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD3] py-2.5'
            : 'bg-[#FAF6EE] py-3.5 border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#"
            className="group flex flex-col text-left focus:outline-none"
            aria-label="Carol Domingues Confeitaria - Início"
          >
            <span className="font-serif tracking-[0.14em] text-xs sm:text-sm font-semibold uppercase text-[#3A2A20] group-hover:text-[#B3242E] transition-colors">
              Carol Domingues
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans tracking-widest uppercase text-[#8A7566] -mt-0.5">
              Confeitaria / Coleção de Natal 2026
            </span>
          </a>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#4A3B32]">
            <a
              href="#cardapio"
              className="hover:text-[#B3242E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B3242E] hover:after:w-full after:transition-all"
            >
              Panetones
            </a>
            <a
              href="#por-dentro"
              className="hover:text-[#B3242E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B3242E] hover:after:w-full after:transition-all"
            >
              Detalhes
            </a>
            <a
              href="#sobremesas"
              className="hover:text-[#B3242E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B3242E] hover:after:w-full after:transition-all"
            >
              Sobremesas
            </a>
            <a
              href="#presentes"
              className="hover:text-[#B3242E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B3242E] hover:after:w-full after:transition-all"
            >
              Presentes
            </a>
            <a
              href="#faq"
              className="hover:text-[#B3242E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B3242E] hover:after:w-full after:transition-all"
            >
              Dúvidas
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <Link
              to="/cardapio"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE7DC] hover:bg-[#E4D9CC] text-[#3A2A20] hover:text-[#B3242E] text-xs font-semibold transition-colors"
              title="Abrir cardápio para salvar em PDF"
            >
              <FileText className="w-3.5 h-3.5 text-[#B3242E]" />
              <span>Cardápio PDF</span>
            </Link>

            {totalCount > 0 && (
              <button
                onClick={() => setIsSelectionOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE7DC] text-[#3A2A20] hover:bg-[#E4D9CC] transition-colors text-xs font-semibold"
                aria-label="Abrir seleção"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#B3242E]" />
                <span>{totalCount}</span>
              </button>
            )}

            <a
              href="#cardapio"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B3242E] hover:bg-[#8F1A22] text-[#FAF6EE] text-xs font-semibold shadow-sm transition-transform active:scale-95"
            >
              <span>Ir ao cardápio</span>
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
