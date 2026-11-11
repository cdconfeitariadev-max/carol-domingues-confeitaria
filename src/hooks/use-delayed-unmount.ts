import { useEffect, useState } from 'react'

/**
 * Mantém um elemento montado por `delay` ms após fechar, para que a saída possa ser animada.
 * `exiting` indica que está no período de saída (aplique a animação de fechamento).
 */
export function useDelayedUnmount(open: boolean, delay = 200) {
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      return
    }
    const timer = window.setTimeout(() => setMounted(false), delay)
    return () => window.clearTimeout(timer)
  }, [open, delay])

  return { mounted, exiting: mounted && !open }
}
