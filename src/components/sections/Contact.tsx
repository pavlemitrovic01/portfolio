import MotionReveal from '../motion/MotionReveal'

export default function Contact() {
  return (
    <section id="contact" className="signal-out">
      <MotionReveal>
        <h2>Let&rsquo;s build something serious.</h2>
      </MotionReveal>
      <MotionReveal delay={0.1}>
        <a className="signal-out-cta" href="mailto:hello@cl3menza.com">hello@cl3menza.com</a>
      </MotionReveal>
    </section>
  )
}
