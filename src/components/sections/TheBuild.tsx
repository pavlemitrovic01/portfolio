import { motion, useReducedMotion } from 'framer-motion'

const CL3_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Stat {
  value: string
  label: string
  sub: string
}

interface MomentGroup {
  group: string
  items: string[]
}

interface Project {
  name: string
  subtitle: string
  url: string
  domain: string
  tech: string[]
  stats: Stat[]
  moments: MomentGroup[]
}

const PROJECTS: readonly Project[] = [
  {
    name: 'Padrino Budva',
    subtitle: 'Full-stack ordering platform for a real restaurant.',
    url: 'https://padrinobudva.com',
    domain: 'padrinobudva.com',
    tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Bankart', 'Telegram API', 'Vercel'],
    stats: [
      { value: '27',  label: 'Hours',            sub: 'to first prototype' },
      { value: '6',   label: 'Weeks',            sub: 'from start to live' },
      { value: '85+', label: 'Orders processed', sub: 'and counting' },
    ],
    moments: [
      {
        group: 'Customer flow',
        items: [
          'Custom cart engine — dodaci, varijante, količine',
          'Delivery zone detection — automatsko prepoznavanje zone',
          'Bankart payment integration sa HMAC webhook verifikacijom',
        ],
      },
      {
        group: 'Operator control',
        items: [
          'Admin dashboard — upravljanje menijem, zonama, cenama',
          'Order management sistem — pregled, status, istorija',
          'Real-time Telegram notifikacije pri svakoj porudžbini',
        ],
      },
      {
        group: 'Infrastructure',
        items: [
          'Mobile-first responsive dizajn',
          'Vercel deployment sa automatskim CI/CD',
        ],
      },
    ],
  },
]

const statsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const statItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: CL3_EASE } },
}

const layersContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const layerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: CL3_EASE } },
}

const itemsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: CL3_EASE } },
}

const reducedVariants = { hidden: {}, visible: {} }
const reducedChildVariants = { hidden: { opacity: 1, y: 0, x: 0 }, visible: { opacity: 1, y: 0, x: 0 } }

export default function TheBuild() {
  const reduceMotion = useReducedMotion() === true
  const p = PROJECTS[0]

  return (
    <section id="the-build" className="the-build">
      <div className="container">

        <div className="build-label">The Build</div>

        {/* Heading + subtitle */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: CL3_EASE }}
        >
          <h2 className="build-heading">{p.name}</h2>
          <p className="build-subtitle">{p.subtitle}</p>
        </motion.div>

        {/* Browser frame + iframe */}
        <motion.div
          className="build-browser"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.0, delay: 0.2, ease: CL3_EASE }}
        >
          <div className="build-browser-chrome">
            <div className="build-browser-dots">
              <span className="build-browser-dot build-browser-dot--red" />
              <span className="build-browser-dot build-browser-dot--yellow" />
              <span className="build-browser-dot build-browser-dot--green" />
            </div>
            <div className="build-browser-url">
              <svg className="build-browser-lock" width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M3 5V3.5C3 2.12 4.12 1 5.5 1S8 2.12 8 3.5V5M2.5 5h6v5h-6z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{p.domain}</span>
            </div>
            <div className="build-browser-live">
              <span className="build-browser-live-dot" />
              LIVE
            </div>
          </div>
          <div className="build-browser-disclaimer">
            ⚠ Live preview — orders placed here are real. Visit {p.domain} directly.
          </div>
          <iframe
            src={p.url}
            title={`${p.name} — live preview`}
            className="build-browser-iframe"
            loading="lazy"
          />
        </motion.div>

        {/* Built with */}
        <motion.div
          className="build-techline"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4, ease: CL3_EASE }}
        >
          <span className="build-techline-label">Built with:</span>
          {p.tech.map((t, i) => (
            <span key={t} className="build-techline-item">
              {t}{i < p.tech.length - 1 && <span className="build-techline-sep">·</span>}
            </span>
          ))}
        </motion.div>

        <div className="build-divider" />

        {/* Stat strip */}
        <motion.div
          className="build-stats"
          variants={reduceMotion ? reducedVariants : statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {p.stats.map((s, i) => (
            <motion.div
              key={i}
              className="build-stat"
              variants={reduceMotion ? reducedChildVariants : statItemVariants}
            >
              <div className="build-stat-value">{s.value}</div>
              <div className="build-stat-label">{s.label}</div>
              <div className="build-stat-sub">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="build-divider" />

        {/* Layered key moments */}
        <motion.div
          className="build-layers"
          variants={reduceMotion ? reducedVariants : layersContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {p.moments.map((layer) => (
            <motion.div
              key={layer.group}
              className="build-layer"
              variants={reduceMotion ? reducedChildVariants : layerVariants}
            >
              <h3 className="build-layer-title">{layer.group}</h3>
              <motion.ul
                className="build-layer-list"
                variants={reduceMotion ? reducedVariants : itemsContainerVariants}
              >
                {layer.items.map((item, ii) => (
                  <motion.li
                    key={ii}
                    className="build-layer-item"
                    variants={reduceMotion ? reducedChildVariants : itemVariants}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="build-cta"
          data-cursor="cta"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: CL3_EASE }}
        >
          Visit live site →
        </motion.a>

      </div>
    </section>
  )
}
