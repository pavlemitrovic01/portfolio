const items = [
  'Premium Product Engineer',
  'Luxury Meets Logic',
  'Custom Systems',
  'Glitch Identity',
  'Admin Dashboards',
  'Ordering Flows',
]

export default function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
