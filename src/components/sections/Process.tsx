import MotionReveal from '../motion/MotionReveal'

export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">How I work</div>
            <h2 className="title">The polish matters, but the trust comes from structure.</h2>
          </div>
          <p className="copy">The motion earns attention. The process earns trust.</p>
        </MotionReveal>
        <div className="process-grid">
          <MotionReveal><article className="process-step"><div className="step">1</div><h3>Understand the business goal</h3><p>Before any design or code, I map the real objective — what the product needs to do, who it's for, and what success actually looks like.</p></article></MotionReveal>
          <MotionReveal delay={0.08}><article className="process-step"><div className="step">2</div><h3>Structure before surface</h3><p>Hierarchy, flow and product logic come first. Surface polish is worthless without solid structure underneath.</p></article></MotionReveal>
          <MotionReveal delay={0.16}><article className="process-step"><div className="step">3</div><h3>Build what creates value</h3><p>Focus on the functionality, usability and premium feel that actually moves the needle for the business.</p></article></MotionReveal>
          <MotionReveal delay={0.24}><article className="process-step"><div className="step">4</div><h3>Polish until it's sharp</h3><p>Motion, typography and micro-interactions get refined until the product feels alive, intentional and impossible to ignore.</p></article></MotionReveal>
          <MotionReveal delay={0.32}><article className="process-step"><div className="step">5</div><h3>Ship something serious</h3><p>The final product feels premium, runs reliably and is ready for real-world use from day one.</p></article></MotionReveal>
        </div>
      </div>
    </section>
  )
}
