import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  baseAlpha: number
  phase: number
  period: number
  vx: number
  vy: number
  accent: boolean
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function randSign() { return Math.random() < 0.5 ? 1 : -1 }

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let far: Star[] = []
    let mid: Star[] = []
    let near: Star[] = []
    let animId: number
    let paused = false
    // Per-layer update timestamps — 0 signals "first frame, init to now"
    let lastFar = 0
    let lastMid = 0
    let lastNear = 0

    function buildStars(w: number, h: number) {
      const isMobile = isCoarse || w < 768
      const baseCount = Math.min(160, Math.floor((w * h) / 9000))
      const total = isMobile ? Math.floor(baseCount * 0.6) : baseCount

      const nFar = Math.round(total * 0.55)
      const nMid = Math.round(total * 0.30)
      const nNear = total - nFar - nMid
      const accentCount = Math.random() < 0.5 ? 5 : 6

      far = Array.from({ length: nFar }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.3, 0.8),
        baseAlpha: rand(0.08, 0.25),
        phase: Math.random() * Math.PI * 2,
        period: rand(4000, 7000),
        vx: 0,
        vy: 0,
        accent: false,
      }))

      mid = Array.from({ length: nMid }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 1.2),
        baseAlpha: rand(0.2, 0.45),
        phase: Math.random() * Math.PI * 2,
        period: rand(2500, 5000),
        vx: isMobile ? 0 : randSign() * rand(0.008, 0.015),
        vy: isMobile ? 0 : randSign() * rand(0.008, 0.015),
        accent: false,
      }))

      near = Array.from({ length: nNear }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.9, 1.8),
        baseAlpha: rand(0.35, 0.65),
        phase: Math.random() * Math.PI * 2,
        period: i < accentCount ? rand(1500, 2500) : rand(2000, 4000),
        vx: isMobile ? 0 : randSign() * rand(0.02, 0.04),
        vy: isMobile ? 0 : randSign() * rand(0.02, 0.04),
        accent: i < accentCount,
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

    function wrap(s: Star, w: number, h: number) {
      if (s.x < -s.r) s.x = w + s.r
      else if (s.x > w + s.r) s.x = -s.r
      if (s.y < -s.r) s.y = h + s.r
      else if (s.y > h + s.r) s.y = -s.r
    }

    function drawStar(s: Star, now: number, twinkleAmp: number) {
      if (!ctx) return
      const breathing = prefersReduced
        ? 0
        : Math.sin(now / s.period + s.phase) * twinkleAmp
      const alpha = Math.max(0, Math.min(1, s.baseAlpha + breathing))

      if (s.accent) {
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
      ctx.fillStyle = s.accent
        ? `rgba(225, 242, 255, ${alpha})`
        : `rgba(180, 210, 235, ${alpha})`
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }

    function draw(now: number) {
      if (!canvas || !ctx) return
      if (document.hidden) { paused = true; return }

      // Init timestamps on first frame (or after resume)
      if (lastFar === 0) lastFar = now
      if (lastMid === 0) lastMid = now
      if (lastNear === 0) lastNear = now

      const dpr = devicePixelRatio
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      // FAR — alpha only, 20fps cap (50ms)
      if (now - lastFar >= 50) lastFar = now

      // MID — drift update at 30fps (~33ms)
      const midDelta = now - lastMid
      if (midDelta >= 33) {
        if (!prefersReduced) {
          for (const s of mid) {
            s.x += s.vx * midDelta
            s.y += s.vy * midDelta
            wrap(s, w, h)
          }
        }
        lastMid = now
      }

      // NEAR — drift update every frame (60fps)
      const nearDelta = now - lastNear
      if (!prefersReduced && nearDelta > 0) {
        for (const s of near) {
          s.x += s.vx * nearDelta
          s.y += s.vy * nearDelta
          wrap(s, w, h)
        }
      }
      lastNear = now

      ctx.clearRect(0, 0, w, h)
      for (const s of far)  drawStar(s, now, 0.06)
      for (const s of mid)  drawStar(s, now, 0.12)
      for (const s of near) drawStar(s, now, s.accent ? 0.30 : 0.18)

      animId = requestAnimationFrame(draw)
    }

    const onVisible = () => {
      if (!document.hidden && paused) {
        paused = false
        lastMid = 0
        lastNear = 0
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
