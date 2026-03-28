import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const CARDS = [
  {
    side: 'left' as const,
    label: 'Origin',
    headline: 'Developer. Product person. Slightly obsessed.',
    body: 'I build things end-to-end — architecture, interface, deployment. One person, full ownership.',
  },
  {
    side: 'right' as const,
    label: 'The approach',
    headline: 'I think before I build.',
    body: 'Systems, flows, edge cases first. The code is the last part of the process, not the first.',
  },
  {
    side: 'left' as const,
    label: 'How it started',
    headline: 'Code before it made sense.',
    body: 'Started early, figured it out later. The why came after the doing.',
  },
  {
    side: 'right' as const,
    label: 'Honest',
    headline: 'Good at depth. Impatient with noise.',
    body: 'Some things come naturally, some take longer. Worth knowing before we work together.',
  },
  {
    side: 'left' as const,
    label: 'cl3menza',
    headline: "There's another layer.",
    body: 'A different mode. The full picture. Built for clients who think in systems, not just deliverables.',
  },
] as const

export default function LandingCards() {
  const fillRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() === true

  useEffect(() => {
    const fill = fillRef.current
    if (!fill || reduceMotion) return
    if (window.matchMedia('(max-width: 760px)').matches) return

    const zone = fill.closest('.lcards') as HTMLElement | null
    if (!zone) return

    let rafId: number | null = null

    const update = () => {
      const rect = zone.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const elapsed = vh - rect.top
      const progress = Math.min(1, Math.max(0, elapsed / total))
      fill.style.transform = `scaleY(${progress})`
      rafId = null
    }

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reduceMotion])

  return (
    <div className="lcards">
      {/* Path track running through all cards */}
      <div className="lcards-track" aria-hidden="true">
        <div className="lcards-fill" ref={fillRef} />
      </div>

      {CARDS.map((card, i) => (
        <CardRow key={i} card={card} reduceMotion={reduceMotion} />
      ))}
    </div>
  )
}

interface CardRowProps {
  card: (typeof CARDS)[number]
  reduceMotion: boolean
}

function CardRow({ card, reduceMotion }: CardRowProps) {
  const isLeft = card.side === 'left'

  const variants = {
    hidden: reduceMotion
      ? { opacity: 1, x: 0 }
      : { opacity: 0, x: isLeft ? -28 : 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <div className={`lcard-row lcard-row--${card.side}`}>
      {/* Junction dot on the path */}
      <div className="lcard-junction" aria-hidden="true" />

      <motion.div
        className="lcard"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
      >
        <span className="lcard-label">{card.label}</span>
        <h3 className="lcard-headline">{card.headline}</h3>
        <p className="lcard-body">{card.body}</p>
      </motion.div>
    </div>
  )
}
