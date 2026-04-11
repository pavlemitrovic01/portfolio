import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  baseAlpha: number
  phase: number
  period: number
  bright: boolean
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let animId: number
    let paused = false
    let lastDraw = 0

    function buildStars(w: number, h: number) {
      const count = Math.min(100, Math.max(60, Math.floor((w * h) / 14000)))
      stars = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        baseAlpha: Math.random() * 0.45 + 0.12,
        phase: Math.random() * Math.PI * 2,
        period: Math.random() * 5000 + 3500,
        bright: i < 9,
      }))
    }

    function resize() {
      if (!canvas || !ctx) return
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * devicePixelRatio)
      canvas.height = Math.round(h * devicePixelRatio)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      buildStars(w, h)
    }

    function draw(now: number) {
      if (!canvas || !ctx) return
      if (document.hidden) { paused = true; return }

      // Cap breathing update rate — no need to redraw every frame for static stars
      const delta = now - lastDraw
      if (delta < 32) { // ~30fps cap for this layer
        animId = requestAnimationFrame(draw)
        return
      }
      lastDraw = now

      const w = canvas.width / devicePixelRatio
      const h = canvas.height / devicePixelRatio
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        const breathing = prefersReduced
          ? 0
          : Math.sin(now / s.period + s.phase) * 0.13
        const alpha = Math.max(0.04, Math.min(0.85, s.baseAlpha + breathing))

        if (s.bright) {
          // Micro glow for bright accent stars
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5)
          grd.addColorStop(0, `rgba(210, 238, 255, ${alpha * 0.9})`)
          grd.addColorStop(0.35, `rgba(160, 210, 255, ${alpha * 0.35})`)
          grd.addColorStop(1, 'rgba(100, 170, 255, 0)')
          ctx.beginPath()
          ctx.fillStyle = grd
          ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.fillStyle = s.bright
          ? `rgba(225, 242, 255, ${alpha})`
          : `rgba(180, 210, 235, ${alpha})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onVisible = () => {
      if (!document.hidden && paused) {
        paused = false
        animId = requestAnimationFrame(draw)
      }
    }

    resize()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  )
}
