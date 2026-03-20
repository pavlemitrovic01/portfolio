import MotionReveal from '../motion/MotionReveal'

export default function Flagship() {
  return (
    <section id="project">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">Flagship case study</div>
            <h2 className="title">One real project. Full stack. Shipped to production.</h2>
          </div>
          <p className="copy">This section is intentionally large and layered. It should communicate that you can take a real business idea and turn it into a premium digital product with customer-facing quality and back-office logic.</p>
        </MotionReveal>
        <div className="project-grid">
          <div>
            <MotionReveal className="project-main">
              <div className="project-stage">
                <div>
                  <div className="tag">Online ordering platform</div>
                  <h3>Padrino Budva</h3>
                  <p>A premium pizzeria website combined with ordering flow, add-ons logic, operational visibility and payment-ready structure.</p>
                </div>
                <div className="project-ui">
                  <div className="menu-col">
                    <div className="menu-item"><span>Menu discovery <small>brand-first browsing</small></span><strong>Live</strong></div>
                    <div className="menu-item"><span>Cart flow <small>real customer logic</small></span><strong>Built</strong></div>
                    <div className="menu-item"><span>Add-ons & sauces <small>custom behavior</small></span><strong>Custom</strong></div>
                    <div className="menu-item"><span>Checkout path <small>conversion layer</small></span><strong>Ready</strong></div>
                  </div>
                  <div className="ops-col">
                    <div className="ops-item"><span>Admin control <small>operational layer</small></span><strong>Present</strong></div>
                    <div className="ops-item"><span>Orders visibility <small>workflow support</small></span><strong>Useful</strong></div>
                    <div className="ops-item"><span>Payment integration <small>Bankart-ready</small></span><strong>Integrated</strong></div>
                    <div className="ops-item"><span>Responsive polish <small>premium feel</small></span><strong>High</strong></div>
                  </div>
                </div>
              </div>
              <div className="project-highlights">
                <MotionReveal className="project-highlight"><strong>Premium public experience</strong><span>The customer-facing layer feels like a serious brand, not a basic restaurant template.</span></MotionReveal>
                <MotionReveal className="project-highlight" delay={0.08}><strong>Real functional depth</strong><span>Ordering flow, cart logic, add-ons, admin panel and Bankart payment integration — all built and working.</span></MotionReveal>
                <MotionReveal className="project-highlight" delay={0.16}><strong>Production-ready architecture</strong><span>Not a demo or a concept. A live product handling real orders for a real business.</span></MotionReveal>
              </div>
            </MotionReveal>
          </div>
          <MotionReveal className="project-aside" delay={0.12}>
            <div>
              <h3>What this proves</h3>
              <p>One project that covers the full stack — premium public presentation, real ordering logic, payment integration and operational admin tools. Everything a serious digital product needs.</p>
            </div>
            <div className="aside-list">
              <div>Premium public-facing website</div>
              <div>Full ordering & cart system</div>
              <div>Add-ons & custom item options</div>
              <div>Admin dashboard & order visibility</div>
              <div>Bankart payment integration</div>
              <div>Shipped to production</div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
