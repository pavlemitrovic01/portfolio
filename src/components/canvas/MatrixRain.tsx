import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const MatrixRain: React.FC = () => {
  const reduceMotion = useReducedMotion() === true
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=~^%$#@!?'
    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)
    let animId: number
    let paused = false
    let skipNext = false

    const draw = () => {
      if (document.hidden) {
        paused = true
        return
      }
      if (skipNext) {
        skipNext = false
        animId = requestAnimationFrame(draw)
        return
      }
      const frameStart = performance.now()
      ctx.fillStyle = 'rgba(2,4,8,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const progress = y / (canvas.height / fontSize)
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#78fff0'
          ctx.shadowBlur = 15
        } else if (progress < 0.3) {
          ctx.fillStyle = 'rgba(120,255,240,0.9)'
          ctx.shadowColor = '#78fff0'
          ctx.shadowBlur = 8
        } else {
          ctx.fillStyle = `rgba(120,255,240,${0.15 + Math.random() * 0.4})`
          ctx.shadowBlur = 0
        }
        ctx.font = `${fontSize}px "Space Grotesk", monospace`
        ctx.fillText(char, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
      if (performance.now() - frameStart > 20) skipNext = true
      animId = requestAnimationFrame(draw)
    }

    const onVisibilityChange = () => {
      if (!document.hidden && paused) {
        paused = false
        animId = requestAnimationFrame(draw)
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    draw()
    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reduceMotion])
  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden />
}

export default MatrixRain
