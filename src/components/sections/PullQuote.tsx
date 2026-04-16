import { motion, useReducedMotion } from 'framer-motion'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function PullQuote() {
  const reduceMotion = useReducedMotion() === true

  return (
    <section className="pull-quote">
      {/* Materializes in atmosphere — no translate, pure opacity */}
      <motion.p
        className="pull-quote-text"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={
          reduceMotion ? { duration: 0.01 } : { duration: 1.0, ease: CL3_EASE }
        }
      >
        The only real proof is a <em>shipped product</em> that works under pressure.
      </motion.p>
    </section>
  )
}
