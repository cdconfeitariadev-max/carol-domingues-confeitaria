import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-reveal]:not([data-revealed])'
const STAGGER_MS = 90

/**
 * Revelação ao rolar: cada elemento [data-reveal] entra com fade + slide quando aparece na tela.
 * Irmãos entram em sequência (stagger). Elementos que surgem depois (ex.: filtros do cardápio)
 * são detectados automaticamente. Desligado para quem pede menos movimento.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    const tracked = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.setAttribute('data-revealed', '')
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    const track = (el: HTMLElement) => {
      if (tracked.has(el)) return
      tracked.add(el)
      const parent = el.parentElement
      const pending = parent
        ? Array.from(parent.children).filter((child) => child.matches(REVEAL_SELECTOR))
        : [el]
      const index = Math.max(0, pending.indexOf(el))
      el.style.setProperty('--reveal-delay', `${index * STAGGER_MS}ms`)
      observer.observe(el)
    }

    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(track)
    }

    root.classList.add('reveal-ready')
    scan()
    const mutationObserver = new MutationObserver(scan)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
