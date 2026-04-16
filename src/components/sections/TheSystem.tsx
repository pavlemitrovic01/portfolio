import MotionReveal from '../motion/MotionReveal'

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
  return (
    <section className="the-system">
      <div className="container">
        <MotionReveal>
          <div className="system-head">
            <h2>What I build</h2>
            <p>End-to-end digital product capabilities — from first pixel to production deploy.</p>
          </div>
        </MotionReveal>

        <div className="system-capabilities">
          {CAPABILITIES.map((cap, i) => (
            <MotionReveal key={i} delay={i * 0.06}>
              <div className="system-capability">
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal>
          <div className="system-process">
            Discovery &rarr; Structure &rarr; Build &rarr; Polish &rarr; Ship
          </div>
        </MotionReveal>

        <MotionReveal>
          <div className="system-stack">
            React &middot; TypeScript &middot; Supabase &middot; Framer Motion
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
