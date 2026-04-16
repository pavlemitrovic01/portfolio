import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const heroVisual = document.querySelector<HTMLElement>('.hero-visual')

    const handleScroll = () => {
      const y = window.scrollY
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${y * 0.08}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
