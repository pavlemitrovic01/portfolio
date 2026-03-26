import type { ReactNode } from 'react'
import Header from './Header'
import Ticker from './Ticker'
import Footer from './Footer'
import ParticlesCanvas from '../canvas/ParticlesCanvas'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <ParticlesCanvas />
      <div className="noise" />
      <div className="scanlines" />
      <Header />
      <Ticker />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  )
}
