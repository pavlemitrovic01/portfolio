import type { ReactNode } from 'react'
import Header from './Header'
import Ticker from './Ticker'
import Footer from './Footer'
import ParticlesCanvas from '../canvas/ParticlesCanvas'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ParticlesCanvas />
      <div className="noise" />
      <div className="scanlines" />
      <Header />
      <Ticker />
      <main>{children}</main>
      <Footer />
    </>
  )
}
