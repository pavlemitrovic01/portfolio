import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
}

const SPRING_CFG = { stiffness: 150, damping: 15 }
const RADIUS = 60
const MAX_DISPLACEMENT = 12

export default function MagneticButton({ children }: MagneticButtonProps) {
  const reduceMotion = useReducedMotion()
  const isTouch = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  ).current
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING_CFG)
  const y = useSpring(my, SPRING_CFG)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist < RADIUS) {
      const scale = MAX_DISPLACEMENT / RADIUS
      mx.set(dx * scale)
      my.set(dy * scale)
    }
  }, [mx, my])

  const handleMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  if (reduceMotion || isTouch) return <>{children}</>

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
