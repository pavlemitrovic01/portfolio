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

const activateCl3menza = () => {
  if (!document.body.classList.contains('cl3menza-mode')) {
    document.body.classList.add('cl3menza-mode')
  }
}

export default function LandingScene({ cl3menzaMode }: LandingSceneProps) {
  return (
    <section className={`landing-scene${cl3menzaMode ? ' landing-scene--cl3' : ''}`} id="landing">
      <LandingBackground />
      <div className="landing-content container">
        {/* L2: Hero */}
        <LandingHero onActivateCl3={activateCl3menza} onPrefetch={prefetchCl3menzaChunks} />

        {/* L3: Central light path */}
        <div className="landing-path-zone" id="landing-path">
          <LandingPath />
        </div>

        {/* L4: Story cards */}
        <div className="landing-cards-zone">
          <LandingCards />
        </div>

        {/* L5: Scroll-driven activation zone */}
        <LandingActivation cl3menzaMode={cl3menzaMode} onPrefetch={prefetchCl3menzaChunks} />
      </div>
    </section>
  )
}
