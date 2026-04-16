import MotionReveal from '../motion/MotionReveal'

const KEY_MOMENTS = [
  {
    title: 'Cart \u2192 Order \u2192 Payment in one flow',
    desc: 'The core user journey works end-to-end. Menu browsing, cart management, add-ons, delivery zone detection, and checkout \u2014 one continuous path from appetite to confirmation.',
  },
  {
    title: 'Real-time order notifications via Telegram',
    desc: 'Every new order triggers an instant Telegram alert to the restaurant. Operational visibility without operational complexity.',
  },
  {
    title: 'Bankart payment integration with HMAC verification',
    desc: 'Production-grade payment handling with webhook callbacks and cryptographic verification. Real transactions, real money, real security.',
  },
  {
    title: 'Admin dashboard with zone management and menu control',
    desc: 'The restaurant manages menus, delivery zones, pricing and order flow from a single interface. Operator autonomy without developer dependency.',
  },
]

const FLOW_NODES = ['Client', 'Cart', 'Order', 'Payment', 'Notification']

export default function TheBuild() {
  return (
    <section className="the-build">
      <div className="container">
        {/* Block A — Context */}
        <MotionReveal>
          <div className="build-context">
            <h2>Padrino Budva</h2>
            <p>
              Full-stack ordering system for a premium pizzeria. Custom cart engine, Bankart payment integration,
              delivery zone detection, real-time admin panel, and Telegram notifications.
              A real business needed a real product — this is what I built.
            </p>
            <p style={{ marginTop: 12 }}>
              <a href="https://padrinobudva.com" target="_blank" rel="noopener noreferrer">
                View live &thinsp;&rarr;
              </a>
            </p>
          </div>
        </MotionReveal>

        {/* Block B — Visual (screenshot placeholders) */}
        <MotionReveal>
          <div className="build-visuals">
            <div className="build-screenshot">Screenshot — menu &amp; ordering flow</div>
            <div className="build-screenshot">Screenshot — admin dashboard</div>
          </div>
        </MotionReveal>

        {/* Block C — Key Moments */}
        <div className="build-moments">
          {KEY_MOMENTS.map((moment, i) => (
            <MotionReveal key={i} delay={i * 0.06}>
              <div className="build-moment">
                <h3>{moment.title}</h3>
                <p>{moment.desc}</p>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Block D — Architecture Flow */}
        <MotionReveal>
          <div className="build-flow">
            {FLOW_NODES.map((node, i) => (
              <div key={node} style={{ display: 'contents' }}>
                <div className="build-flow-node">{node}</div>
                {i < FLOW_NODES.length - 1 && <span className="build-flow-arrow">&rarr;</span>}
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
