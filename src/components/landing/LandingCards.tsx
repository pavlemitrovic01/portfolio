import { motion, useReducedMotion } from 'framer-motion'
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
    icon: IconCode,
    headline: 'Coding since 2016',
    body: "With over 8 years of experience — I've been a problem solver, builder, and engineering lead. I've worked across startup turns and have a knack for making digital systems tick.",
    image: '/card-coding.png',
  },
  {
    side: 'left',
    icon: IconRocket,
    headline: 'Product thinking',
    body: 'Driven by user empathy, market insights, and robust execution I turn vague ideas into clear, impactful digital experiences.',
    image: '/card-product-thinking.png',
  },
  {
    side: 'right',
    icon: IconBolt,
    headline: 'Real builder vibe',
    body: 'I ship full-stack products with a doer mentality and no bullshit. Ideas are good, execution with polish and speed is better.',
    image: '/card-builder.png',
  },
  {
    side: 'left',
    icon: IconGear,
    headline: 'Systems thinker',
    body: 'Methodical approach to architecting scalable and robust execution that solve real problems. I build with a system-level perspective.',
    image: '/card-systems.png',
  },
]

// Absolute top positions matching JUNCTIONS in LandingPath.tsx
const CARD_TOPS = ['23%', '45%', '67%', '89%'] as const

export default function LandingCards() {
  const reduceMotion = useReducedMotion() === true

  return (
    <>
      {CARDS.map((card, i) => (
        <JCard
          key={i}
          card={card}
          top={CARD_TOPS[i]}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  )
}

interface JCardProps {
  card: CardData
  top: string
  reduceMotion: boolean
}

function JCard({ card, top, reduceMotion }: JCardProps) {
  const isRight = card.side === 'right'

  const variants = {
    hidden: reduceMotion
      ? { opacity: 1, x: 0 }
      : { opacity: 0, x: isRight ? 28 : -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <motion.div
      className={`jcard jcard--${card.side}${card.image ? ' jcard--has-visual' : ''}`}
      style={{ top }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {/* Layer 1 — inner visual content (screenshot) */}
      {card.image && (
        <div
          className="jcard-visual"
          aria-hidden="true"
          style={{ backgroundImage: `url(${card.image})` }}
        />
      )}

      {/* Layer 2 — dark glass overlay (left heavy, opens right) */}
      <div className="jcard-glass" aria-hidden="true" />

      {/* Layer 5 — content above all layers */}
      <div className="jcard-content">
        <div className="jcard-header">
          <span className="jcard-icon" aria-hidden="true">{card.icon}</span>
          <h3 className="jcard-headline">{card.headline}</h3>
        </div>
        <p className="jcard-body">{card.body}</p>
      </div>
    </motion.div>
  )
}
