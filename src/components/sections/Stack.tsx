import MotionReveal from '../motion/MotionReveal'

export default function Stack() {
  return (
    <section id="stack">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">Execution layer</div>
            <h2 className="title">Technical proof, presented with premium restraint.</h2>
          </div>
          <p className="copy">Real tools, real depth. Every visual decision is backed by serious implementation.</p>
        </MotionReveal>
        <div className="stack-grid">
          <MotionReveal><article className="tile"><div><div className="icon">R</div><h3>React</h3><p>Flexible modern frontend execution with room for custom high-end interactive experiences.</p></div></article></MotionReveal>
          <MotionReveal delay={0.08}><article className="tile"><div><div className="icon">T</div><h3>TypeScript</h3><p>Cleaner architecture, safer logic and stronger confidence in the way systems are built.</p></div></article></MotionReveal>
          <MotionReveal delay={0.16}><article className="tile"><div><div className="icon">S</div><h3>Supabase</h3><p>Practical backend capability for product flows, data layers and operational interfaces.</p></div></article></MotionReveal>
          <MotionReveal delay={0.24}><article className="tile"><div><div className="icon">M</div><h3>Motion & polish</h3><p>Glitch details, particles, magnetic actions and disciplined premium interaction design.</p></div></article></MotionReveal>
        </div>
      </div>
    </section>
  )
}
