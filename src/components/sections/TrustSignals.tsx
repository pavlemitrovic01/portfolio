import MotionReveal from '../motion/MotionReveal'
import { useCountUp } from '../../hooks/useCountUp'

export default function TrustSignals() {
  const [ref1, val1] = useCountUp(12)
  const [ref2, val2] = useCountUp(2)
  const [ref3, val3] = useCountUp(50)
  const [ref4, val4] = useCountUp(99)

  const activateCl3menza = () => {
    if (!document.body.classList.contains('cl3menza-mode')) {
      document.body.classList.add('cl3menza-mode')
    }
  }

  const prefetchCl3menzaChunks = () => {
    import('./HeroCl3menza')
    import('./Systems')
    import('./Projects')
    import('./Flagship')
    import('./AnatomyOfBuild')
    import('./Process')
    import('./Stack')
    import('./Testimonials')
  }

  return (
    <section id="signals">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">Trust signals</div>
            <h2 className="title">The portfolio should feel like a mind at work, not just a page with nice blocks.</h2>
          </div>
          <p className="copy">The main improvement here is not "more stuff." It is stronger perception design. Each section should help the client feel that there is taste, systems thinking, control and premium execution behind the visuals.</p>
        </MotionReveal>
        <div className="grid-4">
          <MotionReveal><article className="tile"><div><span className="tile-stat" ref={ref1}>{val1}+</span><div className="icon">01</div><h3>Real product framing</h3><p>Projects are presented as working digital products solving business problems, not as decorative portfolio entries.</p></div></article></MotionReveal>
          <MotionReveal delay={0.08}>
            <article
              className="tile tile--trigger"
              onClick={activateCl3menza}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && activateCl3menza()}
              onMouseEnter={prefetchCl3menzaChunks}
            >
              <div>
                <span className="tile-stat" ref={ref2}>{val2}+</span>
                <div className="icon icon--trigger">02</div>
                <h3>Genius builder vibe</h3>
                <p>The layout, glitch details and structure create the feeling of a product mind — not just a coder with animations.</p>
              </div>
              <div className="tile-trigger-hint">
                <span className="tile-trigger-dot" />
                <span>Enter cl3menza mode</span>
              </div>
            </article>
          </MotionReveal>
          <MotionReveal delay={0.16}><article className="tile"><div><span className="tile-stat" ref={ref3}>{val3}k+</span><div className="icon">03</div><h3>Premium motion control</h3><p>Particles, reveals, floating surfaces and magnetic interactions keep it alive without breaking the expensive look.</p></div></article></MotionReveal>
          <MotionReveal delay={0.24}><article className="tile"><div><span className="tile-stat" ref={ref4}>{val4}%</span><div className="icon">04</div><h3>Clear visual hierarchy</h3><p>White, black and blue now repeat consistently, making the whole page feel much more polished and intentional.</p></div></article></MotionReveal>
        </div>
      </div>
    </section>
  )
}
