import StarfieldCanvas from '../canvas/StarfieldCanvas'

export default function LandingBackground() {
  return (
    <div className="landing-bg" aria-hidden="true">
      <StarfieldCanvas />
      <div className="landing-bg-nebula" />
      <div className="landing-bg-depth" />
      <div className="landing-bg-zones" />
      <div className="landing-bg-vignette" />
    </div>
  )
}
