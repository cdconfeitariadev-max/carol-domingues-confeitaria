import React from 'react'
import { Sparkles, MessageCircle } from 'lucide-react'
import { HOW_IT_WORKS, FAQ_ITEMS, WHATSAPP_NUMBER } from '@/data/catalog'
import mascotePresente from '@/assets/saco-confeitarpresente-2b14a.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useCart } from '@/context/CartContext'

export const HowItWorksAndFaq: React.FC = () => {
  const { whatsappUrl } = useCart()

  return (
    <>
      {/* Como funciona */}
      <section className="py-16 bg-[#F4EDE2] border-t border-[#E9DFD3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase font-sans">
              Simples e direto
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#342822] mt-1">Como funciona</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E8DED2] shadow-sm relative overflow-hidden"
              >
                <div className="font-serif text-4xl font-extrabold text-[#EFE4D3] absolute top-4 right-4 select-none">
                  {step.step}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#342822] mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#665447] leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 bg-[#FAF6EE] scroll-mt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-[#B3242E] uppercase font-sans">
              Antes de encomendar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#342822] mt-1 mb-2">
              Vamos combinar os detalhes?
            </h2>
            <p className="text-sm sm:text-base text-[#665447]">
              Um caminho simples entre encontrar seu sabor e confirmar sua encomenda.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DFD3] shadow-sm">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-[#F0E6D8] last:border-b-0 py-1"
                >
                  <AccordionTrigger className="text-left font-serif text-base sm:text-lg font-bold text-[#342822] hover:text-[#B3242E] transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-[#665447] leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 sm:py-20 bg-[#FAF6EE] text-center border-t border-[#E8DED2]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8A7566] mb-2 font-sans">
            Carol Domingues Confeitaria
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#342822] mb-6">
            Vai ter Carol <br />
            <span className="italic text-[#B3242E]">no seu Natal?</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar pelo WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] sm:text-xs text-[#8A7566] leading-relaxed max-w-lg mb-8">
            Prazo, disponibilidade, pagamento e retirada ou entrega serão confirmados diretamente
            com a confeitaria. A seleção é uma lista de interesse e não confirma uma encomenda.
          </p>

          <img
            src={mascotePresente}
            alt="Mascote Carol Domingues segurando um presente de Natal"
            className="w-24 h-24 object-contain"
            loading="lazy"
          />
        </div>
      </section>
    </>
  )
}
