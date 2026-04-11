import MotionReveal from '../motion/MotionReveal'

export default function Systems() {
  return (
    <section id="offers">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">Systems I build</div>
            <h2 className="title">A premium offer set, without the usual freelancer cliché layout.</h2>
          </div>
          <p className="copy">End-to-end digital product capabilities — from first pixel to production deploy.</p>
        </MotionReveal>
        <div className="grid-4">
          <MotionReveal><article className="tile"><div><div className="icon">A</div><h3>Premium Business Websites</h3><p>High-trust websites that make brands feel serious, elevated and modern from the first second.</p></div></article></MotionReveal>
          <MotionReveal delay={0.08}><article className="tile"><div><div className="icon">B</div><h3>Custom Web Products</h3><p>Interfaces and flows shaped around real business needs, with stronger product logic and deeper UX thinking.</p></div></article></MotionReveal>
          <MotionReveal delay={0.16}><article className="tile"><div><div className="icon">C</div><h3>Ordering & Payment Systems</h3><p>Customer-facing journeys that feel polished, clear and conversion-aware — with real functional depth.</p></div></article></MotionReveal>
          <MotionReveal delay={0.24}><article className="tile"><div><div className="icon">D</div><h3>Admin & Operational Layers</h3><p>Dashboards and management surfaces that turn a site into a useful business tool.</p></div></article></MotionReveal>
        </div>
      </div>
    </section>
  )
}
