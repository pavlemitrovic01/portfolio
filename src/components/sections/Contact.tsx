import { motion, useReducedMotion } from 'framer-motion'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Contact() {
  const reduceMotion = useReducedMotion() === true

  return (
    <section id="contact" className="signal-out">

      {/* Heading — 1.0s gravity reveal, 300ms settle delay */}
      <motion.h2
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.0, delay: 0.3, ease: CL3_EASE }}
      >
        Let&rsquo;s build something serious.
      </motion.h2>

      {/* CTA — materializes in place, 0.8s, 400ms after heading (700ms total) */}
      <motion.a
        className="signal-out-cta"
        href="mailto:hello@cl3menza.com"
        data-cursor="cta"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.7, ease: CL3_EASE }}
      >
        hello@cl3menza.com
      </motion.a>

    </section>
  )
}
