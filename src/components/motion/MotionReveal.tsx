import { motion, useReducedMotion } from 'framer-motion'

type MotionRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const reduceMotion = useReducedMotion() === true
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        reduceMotion
          ? { duration: 0.01, delay: 0, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  )
}
