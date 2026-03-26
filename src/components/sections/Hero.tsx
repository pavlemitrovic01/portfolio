import HeroNormal from './HeroNormal'
import HeroCl3menza from './HeroCl3menza'
import { useCl3menzaBodyClass } from '../../hooks/useCl3menzaBodyClass'

export default function Hero() {
  const isMode = useCl3menzaBodyClass()

  return (
    <section className="hero" id="hero">
      <div className="container">
        {!isMode ? <HeroNormal /> : <HeroCl3menza />}
      </div>
    </section>
  )
}
