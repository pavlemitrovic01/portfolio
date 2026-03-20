import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    const heroVisual = document.querySelector<HTMLElement>('.hero-visual')
    const glows = document.querySelectorAll<HTMLElement>('.glow')

    const handleScroll = () => {
      const y = window.scrollY
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${y * 0.08}px)`
      }
      glows.forEach((g, i) => {
        g.style.transform = `translateY(${y * (0.04 + i * 0.02)}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
