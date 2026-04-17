import { motion, useReducedMotion } from 'framer-motion'
import MotionReveal from '../motion/MotionReveal'
import ChatTerminal from './ChatTerminal'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Arrival() {
  const reduceMotion = useReducedMotion() === true

  return (
    <section id="arrival" className="arrival">
      {/* Identity — exposure-from-darkness: slow emerge, then settle */}
      <motion.h1
        className="arrival-identity"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        whileInView={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: [null, 0.08, 1], y: 0 }
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : {
                duration: 1.1,
                ease: CL3_EASE,
                opacity: { times: [0, 0.18, 1] },
              }
        }
      >
        <span className="arrival-name">Pavle</span>
        <span className="arrival-accent">cl3menza</span>
      </motion.h1>

      {/* Positioning — pure fade, no translate */}
      <MotionReveal delay={0.35} duration={0.8} ease={CL3_EASE} amplitude={0}>
        <p className="arrival-positioning">Digital Product Engineer</p>
      </MotionReveal>

      {/* Chat — materializes in place */}
      <MotionReveal delay={0.6} duration={0.6} ease={CL3_EASE} amplitude={0}>
        <ChatTerminal />
      </MotionReveal>
    </section>
  )
}
