import MotionReveal from '../motion/MotionReveal'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <MotionReveal className="cta-card">
          <div>
            <div className="kicker">Final CTA</div>
            <h3>Need a premium website or custom web product that feels intelligent, polished and impossible to confuse with something basic?</h3>
            <p>This direction is designed to feel like a high-end personal digital studio: strong identity, rich motion, premium visual hierarchy and real trust signals built into the experience.</p>
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
