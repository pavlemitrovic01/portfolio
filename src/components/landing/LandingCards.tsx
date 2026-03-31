import { motion, useReducedMotion } from 'framer-motion'

// Card content matches reference image
const CARDS = [
  {
    side: 'right' as const,
    icon: '🚀',
    headline: 'Coding since 2016',
    body: "With over 8 years of experience — I've been a problem solver, builder, and engineering lead. I've worked across startup turns and have a knack for making digital systems tick.",
  },
  {
    side: 'left' as const,
    icon: '🧠',
    headline: 'Product thinking',
    body: 'Driven by user empathy, market insights, and robust execution I turn vague ideas into clear, impactful digital experiences.',
  },
  {
    side: 'right' as const,
    icon: '⚡',
    headline: 'Real builder vibe',
    body: 'I ship full-stack products with a doer mentality and no bullshit. Ideas are good, execution with polish and speed is better.',
  },
  {
    side: 'left' as const,
    icon: '⚙️',
    headline: 'Systems thinker',
    body: 'Methodical approach to architecting scalable and robust execution that solve real problems. I build with a system-level perspective.',
  },
] as const

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
  card: (typeof CARDS)[number]
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
      className={`jcard jcard--${card.side}`}
      style={{ top }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="jcard-icon" aria-hidden="true">{card.icon}</div>
      <h3 className="jcard-headline">{card.headline}</h3>
      <p className="jcard-body">{card.body}</p>
    </motion.div>
  )
}
