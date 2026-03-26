import MotionReveal from '../motion/MotionReveal'

const FACTS = [
  { label: 'Based in', value: 'Serbia' },
  { label: 'Available for', value: 'Global projects' },
  { label: 'Building since', value: '2025' },
  { label: 'Focus', value: 'Product engineering' },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <MotionReveal className="about-left">
            <div className="kicker">The person behind it</div>
            <h2 className="title">Built by someone who thinks in systems.</h2>
            <p className="about-body">
              I build web products from the ground up — architecture, frontend, backend, and the details in between. My focus is on products that work as well as they look: real logic, real performance, no template shortcuts.
            </p>
            <p className="about-body">
              Started building seriously in 2025 with Padrino Budva — a full ordering and payment system for a restaurant in Montenegro. That project is where the approach was defined: no templates, no shortcuts, build it like a product.
            </p>
          </MotionReveal>
          <MotionReveal className="about-right" delay={0.1}>
            <div className="about-facts">
              {FACTS.map((fact) => (
                <div key={fact.label} className="about-fact">
                  <span className="about-fact-label">{fact.label}</span>
                  <span className="about-fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
            <div className="about-availability">
              <span className="about-dot" />
              <span>Available for new projects right now.</span>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
