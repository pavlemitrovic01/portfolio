import { useRef } from 'react'
import LandingBackground from './LandingBackground'
import LandingHero from './LandingHero'
import LandingPath from './LandingPath'
import LandingCards from './LandingCards'
import LandingActivation from './LandingActivation'

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

  return (
    <section className={`landing-scene${cl3menzaMode ? ' landing-scene--cl3' : ''}`} id="landing">
      <LandingBackground />
      <div className="landing-content container">

        {/* Phase 1 — Hero: scene entry */}
        <LandingHero onPrefetch={prefetchCl3menzaChunks} />

        {/* Phase 2 — Journey: unified path + quote + cards as one system */}
        <div className="landing-journey-zone" id="landing-path" ref={journeyRef}>
          {/* SVG S-curve + junction nodes */}
          <LandingPath containerRef={journeyRef} />

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
          <LandingCards />
        </div>

        {/* Phase 3 — Activation: scene culmination */}
        <LandingActivation cl3menzaMode={cl3menzaMode} onPrefetch={prefetchCl3menzaChunks} />

      </div>
    </section>
  )
}
