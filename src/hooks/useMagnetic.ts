import { useEffect } from 'react'

export function useMagnetic() {
  useEffect(() => {
    const magnetic = document.querySelectorAll<HTMLElement>('.magnetic')

    const handleMouseMove = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      btn.style.transform = 'translate(0,0)'
    }

    magnetic.forEach((btn) => {
      btn.addEventListener('mousemove', handleMouseMove)
      btn.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      magnetic.forEach((btn) => {
        btn.removeEventListener('mousemove', handleMouseMove)
        btn.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])
}
