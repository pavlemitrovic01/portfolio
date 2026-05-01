import { motion, useReducedMotion } from 'framer-motion'
import MagneticButton from '../system/MagneticButton'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Contact() {
  const reduceMotion = useReducedMotion() === true

  const lineFade = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.4, delay, ease: CL3_EASE },
  })

  return (
    <section id="contact" className="signal-out">
      <div className="signal-out-terminal">

        {/* Terminal lines — staggered reveal */}
        <motion.div className="signal-out-line signal-out-line--prompt" {...lineFade(0)}>
          <span className="signal-out-prompt">&gt;</span>
          <span>link established.</span>
        </motion.div>

        <motion.div className="signal-out-line signal-out-line--prompt" {...lineFade(0.35)}>
          <span className="signal-out-prompt">&gt;</span>
          <span>ready.</span>
        </motion.div>

        {/* Email — primary CTA, magnetic */}
        <motion.div className="signal-out-email-wrap" {...lineFade(0.7)}>
          <MagneticButton>
            <a
              className="signal-out-email"
              href="mailto:hello@cl3menza.com"
              data-cursor="cta"
            >
              hello@cl3menza.com<span className="signal-out-cursor" aria-hidden="true" />
            </a>
          </MagneticButton>
        </motion.div>

        {/* Footer metadata */}
        <motion.div className="signal-out-meta" {...lineFade(1.0)}>
          <div className="signal-out-meta-row">
            <span className="signal-out-meta-key">Response time</span>
            <span className="signal-out-meta-sep">·</span>
            <span className="signal-out-meta-val">under 24 hours</span>
          </div>
          <div className="signal-out-meta-row">
            <span className="signal-out-meta-key">Currently</span>
            <span className="signal-out-meta-sep">·</span>
            <span className="signal-out-meta-val">taking on select work</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
