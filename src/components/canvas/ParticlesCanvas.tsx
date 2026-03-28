import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

interface TrailParticle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  born: number
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let trail: TrailParticle[] = []
    let animFrameId: number
    let paused = false
    let skipNext = false
    const TRAIL_LIFETIME = 800

    function resize() {
      if (!canvas || !ctx) return
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      particles = Array.from(
        { length: Math.min(70, Math.floor(w / 22)) },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 2.2 + 0.6,
          a: Math.random() * 0.5 + 0.15,
        })
      )
    }

    function onMouseMove(e: MouseEvent) {
      const now = performance.now()
      for (let i = 0; i < 3; i++) {
        trail.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 3 + 3,
          born: now,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      if (document.hidden) {
        paused = true
        return
      }
      if (skipNext) {
        skipNext = false
        animFrameId = requestAnimationFrame(draw)
        return
      }
      const frameStart = performance.now()
      const now = frameStart
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw trail particles
      trail = trail.filter(p => now - p.born < TRAIL_LIFETIME)
      trail.forEach(p => {
        const age = now - p.born
        const progress = age / TRAIL_LIFETIME
        const alpha = (1 - progress) * 0.8
        const blur = progress * 6
        p.x += p.vx
        p.y += p.vy
        ctx.save()
        ctx.filter = `blur(${blur}px)`
        ctx.beginPath()
        ctx.fillStyle = `rgba(120, 255, 240, ${alpha})`
        ctx.arc(p.x, p.y, p.r * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw ambient particles
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = window.innerWidth + 20
        if (p.x > window.innerWidth + 20) p.x = -20
        if (p.y < -20) p.y = window.innerHeight + 20
        if (p.y > window.innerHeight + 20) p.y = -20
        ctx.beginPath()
        ctx.fillStyle = `rgba(125, 220, 255, ${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(120, 180, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      if (performance.now() - frameStart > 20) skipNext = true
      animFrameId = requestAnimationFrame(draw)
    }

    const onVisibilityChange = () => {
      if (!document.hidden && paused) {
        paused = false
        animFrameId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particles"
    />
  )
}
