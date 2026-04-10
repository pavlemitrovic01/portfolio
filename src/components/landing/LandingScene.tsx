import { useRef, useState, useCallback } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import LandingBackground from './LandingBackground'
import LandingHero from './LandingHero'
import LandingPath from './LandingPath'
import LandingCards from './LandingCards'
import LandingActivation from './LandingActivation'
import StepInsideModal from './StepInsideModal'
import { useAssistMode } from '../../hooks/useAssistMode'
import { useRewardState, REWARD_REGISTRY } from '../../hooks/useRewardState'

interface LandingSceneProps {
  cl3menzaMode: boolean
}

const prefetchCl3menzaChunks = () => {
  import('../sections/HeroCl3menza')
  import('../sections/Systems')
  import('../sections/Projects')
  import('../sections/Flagship')
  import('../sections/AnatomyOfBuild')
  import('../sections/Process')
  import('../sections/Stack')
  import('../sections/Testimonials')
}

export default function LandingScene({ cl3menzaMode }: LandingSceneProps) {
  // Shared ref: LandingPath reads scroll progress relative to this container
  const journeyRef = useRef<HTMLDivElement>(null)

  // Card orb progress — same thresholds as LandingPath's orb1–orb4
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start center', 'end end'],
  })
  const cardOrb1 = useTransform(scrollYProgress, [0.18, 0.28], [0, 1])
  const cardOrb2 = useTransform(scrollYProgress, [0.38, 0.48], [0, 1])
  const cardOrb3 = useTransform(scrollYProgress, [0.58, 0.68], [0, 1])
  const cardOrb4 = useTransform(scrollYProgress, [0.78, 0.88], [0, 1])

  // Step Inside modal + assist mode
  const [modalOpen, setModalOpen] = useState(false)
  const [, enableAssist] = useAssistMode()

  // Reward state — separate from assist mode (localStorage-persistent)
  const { unlock } = useRewardState()
  const handleProductThinkingOrb = useCallback(() => {
    unlock(REWARD_REGISTRY.TEN_PCT.id)
  }, [unlock])

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])
  const handleKeepExploring = useCallback(() => {
    setModalOpen(false)
    enableAssist()
  }, [enableAssist])

  return (
    <section className={`landing-scene${cl3menzaMode ? ' landing-scene--cl3' : ''}`} id="landing">
      <LandingBackground />
      <div className="landing-content container">

        {/* Phase 1 — Hero: scene entry */}
        <LandingHero onPrefetch={prefetchCl3menzaChunks} onStepInside={openModal} />

        {/* Phase 2 — Journey: unified path + quote + cards as one system */}
        <div className="landing-journey-zone" id="landing-path" ref={journeyRef}>
          {/* SVG S-curve + junction nodes. Index 1 = Product Thinking = 10% reward orb */}
          <LandingPath
            containerRef={journeyRef}
            rewardOrbIndex={1}
            onRewardOrbClick={handleProductThinkingOrb}
          />

          {/* Editorial quote — left side, path curves right for card 1 */}
          <blockquote className="journey-quote" aria-label="Portfolio philosophy">
            <p>
              The portfolio<br />
              should feel like<br />
              a mind at work,<br />
              not just a page<br />
              with nice blocks.
            </p>
          </blockquote>

          {/* Cards — absolutely positioned at junction y-coordinates */}
          <LandingCards cardOrbProgress={[cardOrb1, cardOrb2, cardOrb3, cardOrb4]} />
        </div>

        {/* Phase 3 — Activation: scene culmination */}
        <LandingActivation cl3menzaMode={cl3menzaMode} onPrefetch={prefetchCl3menzaChunks} />

      </div>

      <StepInsideModal
        open={modalOpen}
        onClose={closeModal}
        onKeepExploring={handleKeepExploring}
      />
    </section>
  )
}
