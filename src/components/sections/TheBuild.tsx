import { motion, useReducedMotion } from 'framer-motion'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const FAST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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

const momentsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.28 } },
}
const momentItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: CL3_EASE } },
}

const flowContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}
const nodeVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: CL3_EASE } },
}
const connectorVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.22, ease: FAST_EASE } },
}

// Reduced-motion: all content immediately at final state, no stagger, no animation
const reducedContainerVariants = { hidden: {}, visible: {} }
const reducedItemVariants = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
const reducedConnectorVariants = { hidden: { scaleX: 1 }, visible: { scaleX: 1 } }

export default function TheBuild() {
  const reduceMotion = useReducedMotion() === true

  return (
    <section id="the-build" className="the-build">
      <div className="container">

        {/* Block A — Context */}
        <motion.div
          className="build-context"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: CL3_EASE }}
        >
          <h2>Padrino Budva</h2>
          <p>
            Full-stack ordering system for a premium pizzeria. Custom cart engine, Bankart payment integration,
            delivery zone detection, real-time admin panel, and Telegram notifications.
            A real business needed a real product — this is what I built.
          </p>
          <p style={{ marginTop: 12 }}>
            <a href="https://padrinobudva.com" target="_blank" rel="noopener noreferrer" data-cursor="cta">
              View live &thinsp;&rarr;
            </a>
          </p>
        </motion.div>

        {/* Block B — Screenshot Frame System (images arrive in R4b) */}
        <motion.div
          className="build-visuals"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: CL3_EASE }}
        >
          <div className="build-frame">
            <div className="build-frame-inner">
              <span className="build-frame-label">Menu &amp; ordering flow</span>
            </div>
          </div>
          <div className="build-frame">
            <div className="build-frame-inner">
              <span className="build-frame-label">Admin dashboard</span>
            </div>
          </div>
        </motion.div>

        {/* Block C — Key Moments */}
        <motion.div
          className="build-moments"
          variants={reduceMotion ? reducedContainerVariants : momentsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {KEY_MOMENTS.map((moment, i) => (
            <motion.div
              key={i}
              className="build-moment"
              variants={reduceMotion ? reducedItemVariants : momentItemVariants}
            >
              <h3>{moment.title}</h3>
              <p>{moment.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Block D — Architecture Flow */}
        <motion.div
          className="build-flow"
          variants={reduceMotion ? reducedContainerVariants : flowContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {FLOW_NODES.flatMap((node, i) => [
            <motion.div
              key={node}
              className="build-flow-node"
              variants={reduceMotion ? reducedItemVariants : nodeVariants}
            >
              {node}
            </motion.div>,
            ...(i < FLOW_NODES.length - 1
              ? [
                  <motion.div
                    key={`c${i}`}
                    className="build-flow-connector"
                    variants={reduceMotion ? reducedConnectorVariants : connectorVariants}
                    style={{ originX: 0 }}
                  />,
                ]
              : []),
          ])}
        </motion.div>

      </div>
    </section>
  )
}
