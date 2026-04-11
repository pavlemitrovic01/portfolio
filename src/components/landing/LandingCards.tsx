import { useState } from 'react'
import { motion, useReducedMotion, useTransform, useMotionValueEvent } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

/* ── Inline SVG icons — white line style matching reference ── */
const IconCode = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6.5,4.5 2,9 6.5,13.5" />
    <polyline points="11.5,4.5 16,9 11.5,13.5" />
  </svg>
)
const IconRocket = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 1.5c0 0-5 3.5-5 9.5l5 5 5-5c0-6-5-9.5-5-9.5z" />
    <circle cx="9" cy="8.5" r="1.5" />
  </svg>
)
const IconBolt = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 1.5L3.5 10.5H8L7 16.5l7-9.5h-4.5L10 1.5z" />
  </svg>
)
const IconGear = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="9" cy="9" r="2.5" />
    <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.4 3.4l1.4 1.4M13.2 13.2l1.4 1.4M3.4 14.6l1.4-1.4M13.2 4.8l1.4-1.4" />
  </svg>
)

interface CardData {
  side: 'left' | 'right'
  icon: ReactNode
  headline: string
  body: string
  image?: string  // Layer 1 — inner visual content (screenshot asset)
}

const CARDS: readonly CardData[] = [
  {
    side: 'right',
    icon: IconBolt,
    headline: 'The First Pull',
    body: 'My first real connection to development started when I was around 12, running Counter-Strike servers and paying attention to the part most players never think about. I was not only interested in playing the game — I kept getting pulled toward plugins, server behavior, and the way gameplay could be shaped from behind the scenes. On COD, Public, Deathmatch servers, I was already editing and adjusting parts of the experience because I wanted more than just the default version of things. That was the beginning: not just enjoying systems, but wanting to understand them, change them, and make them feel better.',
    image: '/card-systems.webp',
  },
  {
    side: 'left',
    icon: IconCode,
    headline: 'Obsession as Method',
    body: 'After those servers were gone, that same curiosity followed me into Minecraft. I kept noticing broken logic, strange plugin behavior, bugs in scripts, and all the hidden parts of a server that most people never look at. I was the type to chase the exact script, open it up, and stay with the problem until I understood what was actually wrong. At one point, I spent an entire month fixing a single issue because I refused to leave it half-understood. That persistence eventually led me into a server\'s development team, where programming stopped being something distant and started becoming something real.',
    image: '/card-coding.webp',
  },
  {
    side: 'right',
    icon: IconGear,
    headline: 'Life Interrupted',
    body: 'Later, life went in a different direction. I finished culinary school, started working, and slowly drifted away from programming and development as a daily part of my life. Work took over, time disappeared, and for a while that side of me stayed in the background. But the instinct never really left. Even while doing other jobs, there was always a part of me that wanted to return to building, solving, and working on something that depended on logic, discipline, and my own standards instead of routine.',
    image: '/card-builder.webp',
  },
  {
    side: 'left',
    icon: IconRocket,
    headline: 'Back With Proof',
    body: 'That comeback happened when I finally reached the point where I knew I did not want to build my life around average work and average outcomes. I left my job, tried recruiting, realized it was not my path, and came back to programming with real intent. I sat down at my computer and made a simple decision: I would not get up until I had built something real. Twenty-seven hours later, I had the first serious foundation of what would become padrinobudva.com. About a month and a half later, it was live — with a working ordering flow, admin system, and Bankart payment integration. That project mattered because it turned everything into proof.',
    image: '/card-product-thinking.webp',
  },
]

// Absolute top positions matching JUNCTIONS in LandingPath.tsx (viewBox 0 0 1000 3000)
// Exact orb y-positions: cy / viewBox-height = 700/3000, 1300/3000, 1900/3000, 2500/3000
const CARD_TOPS = ['23.33%', '43.33%', '63.33%', '83.33%'] as const

interface LandingCardsProps {
  cardOrbProgress: MotionValue<number>[]
}

export default function LandingCards({ cardOrbProgress }: LandingCardsProps) {
  return (
    <>
      {CARDS.map((card, i) => (
        <JCard
          key={i}
          card={card}
          top={CARD_TOPS[i]}
          orbProgress={cardOrbProgress[i]}
        />
      ))}
    </>
  )
}

interface JCardProps {
  card: CardData
  top: string
  orbProgress: MotionValue<number>
}

function JCard({ card, top, orbProgress }: JCardProps) {
  const isRight = card.side === 'right'
  const reduceMotion = useReducedMotion() === true
  const [revealed, setRevealed] = useState(false)

  // Delayed entry: connector draws first (0→0.45), card follows (0.45→0.95)
  const opacityMotion = useTransform(orbProgress, [0.45, 0.95], [0, 1])
  const xMotion      = useTransform(orbProgress, [0.45, 0.95], [isRight ? 18 : -18, 0])

  useMotionValueEvent(orbProgress, 'change', (v) => {
    if (v >= 0.95 && !revealed) setRevealed(true)
  })

  return (
    <motion.div
      className={`jcard jcard--${card.side}${card.image ? ' jcard--has-visual' : ''}${revealed ? ' jcard--revealed' : ''}`}
      style={{
        top,
        y: '-50%',
        opacity: reduceMotion ? 1 : revealed ? 1 : opacityMotion,
        x: reduceMotion ? 0 : revealed ? 0 : xMotion,
      }}
    >
      {/* Layer 1 — inner visual content (screenshot) */}
      {card.image && (
        <div className="jcard-visual" aria-hidden="true">
          <img src={card.image} alt="" loading="lazy" width="800" height="600" />
        </div>
      )}

      {/* Layer 2 — dark glass overlay (left heavy, opens right) */}
      <div className="jcard-glass" aria-hidden="true" />

      {/* Layer 5 — content above all layers */}
      <div className="jcard-content">
        <div className="jcard-header">
          <span className="jcard-icon" aria-hidden="true">{card.icon}</span>
          <h2 className="jcard-headline">{card.headline}</h2>
        </div>
        <p className="jcard-body">{card.body}</p>
      </div>
    </motion.div>
  )
}
