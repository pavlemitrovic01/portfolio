import { motion, useReducedMotion } from 'framer-motion'

type BezierEasing = [number, number, number, number]

type MotionRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  ease?: BezierEasing
  amplitude?: number
}

export default function MotionReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  ease = [0.22, 1, 0.36, 1],
  amplitude = 24,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion() === true
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: amplitude }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        reduceMotion
          ? { duration: 0.01, delay: 0, ease }
          : { duration, delay, ease }
      }
    >
      {children}
    </motion.div>
  )
}
