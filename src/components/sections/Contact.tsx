import MotionReveal from '../motion/MotionReveal'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <MotionReveal className="cta-card">
          <div>
            <div className="kicker">Work together</div>
            <h3>Need a premium website or custom web product that feels intelligent, polished and impossible to confuse with something basic?</h3>
            <p>Strong identity, clean systems, premium execution. From concept to production.</p>
          </div>
          <div className="cta-actions">
            <span className="button primary magnetic">Upwork — soon</span>
            <span className="button magnetic">Fiverr — soon</span>
            <a className="button magnetic" href="mailto:hello@cl3menza.com">Contact</a>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
