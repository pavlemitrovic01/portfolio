import { lazy, Suspense } from 'react'
import HeroNormal from './HeroNormal'
import { useCl3menzaBodyClass } from '../../hooks/useCl3menzaBodyClass'

const HeroCl3menza = lazy(() => import('./HeroCl3menza'))

export default function Hero() {
  const isMode = useCl3menzaBodyClass()

  return (
    <section className="hero" id="hero">
      <div className="container">
        {!isMode ? <HeroNormal /> : (
          <Suspense fallback={<div className="lazy-fallback" />}>
            <HeroCl3menza />
          </Suspense>
        )}
      </div>
    </section>
  )
}
