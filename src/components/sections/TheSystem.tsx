import { motion, useReducedMotion } from 'framer-motion'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const STAGGER = 0.18

const CAPABILITIES = [
  {
    title: 'Premium Business Websites',
    desc: 'High-trust websites that make brands feel serious, elevated and modern from the first second.',
  },
  {
    title: 'Custom Web Products',
    desc: 'Interfaces and flows shaped around real business needs, with product logic and deeper UX thinking.',
  },
  {
    title: 'Ordering & Payment Systems',
    desc: 'Customer-facing journeys that feel polished and conversion-aware \u2014 with real functional depth.',
  },
  {
    title: 'Admin & Operational Layers',
    desc: 'Dashboards and management surfaces that turn a site into a useful business tool.',
  },
]

export default function TheSystem() {
  const reduceMotion = useReducedMotion() === true
  const lastDelay = (CAPABILITIES.length - 1) * STAGGER

  return (
    <section id="the-system" className="the-system">
      <div className="container">

        {/* Head — weighted reveal */}
        <motion.div
          className="system-head"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: CL3_EASE }}
        >
          <h2>What I build</h2>
          <p>End-to-end digital product capabilities — from first pixel to production deploy.</p>
        </motion.div>

        {/* Capabilities — weighted vertical cascade + left-edge line draw */}
        <div className="system-capabilities">
          {CAPABILITIES.map((cap, i) => {
            const delay = i * STAGGER
            return (
              <motion.div
                key={i}
                className="system-capability"
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: CL3_EASE }}
              >
                {/* Left-edge line draw — scaleY 0→1, synchronized with text */}
                <motion.span
                  className="system-capability-line"
                  initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay, ease: CL3_EASE }}
                />
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Process line — simple opacity fade, 0.3s after last capability */}
        <motion.div
          className="system-process"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: lastDelay + 0.3, ease: CL3_EASE }}
        >
          Discovery &rarr; Structure &rarr; Build &rarr; Polish &rarr; Ship
        </motion.div>

        {/* Stack signal — minimal, appears with process */}
        <motion.div
          className="system-stack"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: lastDelay + 0.45, ease: CL3_EASE }}
        >
          React &middot; TypeScript &middot; Supabase &middot; Framer Motion
        </motion.div>

      </div>
    </section>
  )
}
