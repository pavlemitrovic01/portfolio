import MotionReveal from '../motion/MotionReveal'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Placeholder quote. Replace with real client feedback. Something specific about the quality of work, speed, or results delivered.',
    name: 'Client Name',
    role: 'Role, Company',
    initials: 'CN',
  },
  {
    quote: 'Placeholder quote. A second testimonial about the technical capability, attention to detail, or how the product performed after launch.',
    name: 'Client Name',
    role: 'Role, Company',
    initials: 'CN',
  },
  {
    quote: 'Placeholder quote. Third testimonial — could be about communication, reliability, or the overall experience of working together.',
    name: 'Client Name',
    role: 'Role, Company',
    initials: 'CN',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">Social proof</div>
            <h2 className="title">What clients say.</h2>
          </div>
          <p className="copy">Real feedback from people who hired cl3menza to build something serious.</p>
        </MotionReveal>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <MotionReveal key={i} delay={i * 0.1}>
              <article className="testimonial-card">
                <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div className="testimonial-meta">
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
