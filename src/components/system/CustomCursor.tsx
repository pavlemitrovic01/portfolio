import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type HoverContext = 'default' | 'cta' | 'portrait' | 'reward'

interface CustomCursorProps {
  cl3menzaMode: boolean
}

const SPRING = { stiffness: 350, damping: 28, mass: 0.5 }

export default function CustomCursor({ cl3menzaMode }: CustomCursorProps) {
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const springX = useSpring(mvX, SPRING)
  const springY = useSpring(mvY, SPRING)

  const [hoverContext, setHoverContext] = useState<HoverContext>('default')
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Effect 1: capability detection + body class
  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMql = window.matchMedia('(pointer: coarse)')

    const update = () => {
      const enabled = !motionMql.matches && !pointerMql.matches
      setIsEnabled(enabled)
      if (enabled) {
        document.body.classList.add('has-custom-cursor')
      } else {
        document.body.classList.remove('has-custom-cursor')
      }
    }

    update()
    motionMql.addEventListener('change', update)
    pointerMql.addEventListener('change', update)

    return () => {
      motionMql.removeEventListener('change', update)
      pointerMql.removeEventListener('change', update)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  // Effect 2: mouse position tracking
  useEffect(() => {
    if (!isEnabled) return

    let seen = false
    const handleMouseMove = (e: MouseEvent) => {
      mvX.set(e.clientX)
      mvY.set(e.clientY)
      if (!seen) {
        seen = true
        setIsVisible(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isEnabled, mvX, mvY])

  // Effect 3: hover context via event delegation
  useEffect(() => {
    if (!isEnabled) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest('[data-cursor]')
      const ctx = (target as HTMLElement | null)?.dataset.cursor as HoverContext | undefined
      setHoverContext(ctx ?? 'default')
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [isEnabled])

  if (!isEnabled) return null

  const classes = [
    'custom-cursor',
    cl3menzaMode ? 'custom-cursor--cl3' : '',
    hoverContext !== 'default' ? `custom-cursor--${hoverContext}` : '',
    !isVisible ? 'custom-cursor--hidden' : '',
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className="custom-cursor-wrap"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <div className={classes} />
    </motion.div>
  )
}
