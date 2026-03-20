import { useState } from 'react'
import MotionReveal from '../motion/MotionReveal'

type Category = 'frontend' | 'backend' | 'database' | 'notification'
type NodeId = 'kupac' | 'cart' | 'create-order' | 'supabase' | 'bankart' | 'bankart-callback' | 'telegram'

const CAT_META: Record<Category, { label: string; role: string; color: string; icon: string }> = {
  frontend:     { label: 'Frontend',      role: 'FRONTEND COMPONENT',     color: 'var(--blue)',   icon: '◧' },
  backend:      { label: 'Backend',       role: 'SERVERLESS FUNCTION',    color: 'var(--violet)', icon: '⚙' },
  database:     { label: 'Database',      role: 'DATABASE',               color: 'var(--cyan)',   icon: '◫' },
  notification: { label: 'Notification',  role: 'NOTIFICATION SERVICE',   color: 'var(--gold)',   icon: '△' },
}

interface NodeDef {
  id: NodeId
  label: string
  category: Category
  x: number
  y: number
  detail: string
}

const NODE_W = 170
const NODE_H = 56

const NODES: NodeDef[] = [
  { id: 'kupac', label: 'Kupac', category: 'frontend', x: 30, y: 40,
    detail: 'Zero trust architecture. Client total validated server-side to ±1 cent. Inactive menu items rejected. META item pattern encodes zone + delivery price + payment method.' },
  { id: 'cart', label: 'CartDrawer', category: 'frontend', x: 260, y: 40,
    detail: '108KB checkout engine. Manages pizza variants (33/50cm), stuffed crust pricing, Bankart Payment.js iframe tokenization. Card data never touches our server.' },
  { id: 'create-order', label: 'create-order.ts', category: 'backend', x: 490, y: 40,
    detail: '38KB core. Rate limiting (Upstash Redis), server-side price recalculation, ray-casting delivery zone check, HMAC-SHA512 Bankart signing. Never trusts the client.' },
  { id: 'telegram', label: 'Telegram', category: 'notification', x: 260, y: 190,
    detail: 'Fire-and-forget notifications. Never blocks the order. Rich emoji-formatted messages via api.telegram.org.' },
  { id: 'bankart', label: 'Bankart', category: 'backend', x: 490, y: 190,
    detail: 'PCI-isolated card tokenization. Two modes: inline iframe + server debit. HMAC signatures on every request and webhook. Payment state machine snapshots every phase to JSONB.' },
  { id: 'supabase', label: 'Supabase', category: 'database', x: 660, y: 190,
    detail: '5 tables: orders, menu_items, site_settings, admin_users, delivery_zones. Delivery zones stored as [[lng,lat]] polygons.' },
  { id: 'bankart-callback', label: 'bankart-callback.ts', category: 'backend', x: 490, y: 330,
    detail: 'Server-to-server webhook. Timing-safe HMAC verification ±300s clock skew. 4-strategy order lookup. Updates payment_status, fires Telegram.' },
]

const EDGES: [NodeId, NodeId][] = [
  ['kupac', 'cart'],
  ['cart', 'create-order'],
  ['create-order', 'telegram'],
  ['create-order', 'bankart'],
  ['create-order', 'supabase'],
  ['bankart', 'bankart-callback'],
  ['bankart-callback', 'supabase'],
]

function getNode(id: NodeId) {
  return NODES.find(n => n.id === id)!
}

export default function AnatomyOfBuild() {
  const [active, setActive] = useState<NodeId>('create-order')
  const activeNode = getNode(active)
  const activeCat = CAT_META[activeNode.category]

  return (
    <section className="anatomy">
      <div className="container">
        <MotionReveal className="section-head">
          <div>
            <div className="kicker">How it's built</div>
            <h2 className="title">Anatomy of a build</h2>
          </div>
          <p className="copy">An interactive architecture map of the Padrino Budva ordering system. Click any component to see how it works under the hood.</p>
        </MotionReveal>
        <div className="anatomy-grid">
          <div className="anatomy-map">
            <svg viewBox="0 0 880 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {EDGES.map((_, i) => (
                  <marker key={i} id={`dot-${i}`} viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6">
                    <circle cx="3" cy="3" r="2.5" fill="var(--blue)" opacity="0.8" />
                  </marker>
                ))}
              </defs>

              {EDGES.map(([from, to], i) => {
                const a = getNode(from)
                const b = getNode(to)
                const isConnected = active === from || active === to
                return (
                  <line
                    key={i}
                    className={`anatomy-edge ${isConnected ? 'anatomy-edge--active' : ''}`}
                    x1={a.x + NODE_W / 2}
                    y1={a.y + NODE_H / 2}
                    x2={b.x + NODE_W / 2}
                    y2={b.y + NODE_H / 2}
                    stroke={isConnected ? 'var(--line-strong)' : 'var(--line)'}
                    strokeWidth={isConnected ? 2 : 1}
                  />
                )
              })}

              {EDGES.map(([from, to], i) => {
                const a = getNode(from)
                const b = getNode(to)
                const isConnected = active === from || active === to
                const dx = (b.x + NODE_W / 2) - (a.x + NODE_W / 2)
                const dy = (b.y + NODE_H / 2) - (a.y + NODE_H / 2)
                const len = Math.sqrt(dx * dx + dy * dy)
                return (
                  <line
                    key={`flow-${i}`}
                    className="anatomy-flow"
                    x1={a.x + NODE_W / 2}
                    y1={a.y + NODE_H / 2}
                    x2={b.x + NODE_W / 2}
                    y2={b.y + NODE_H / 2}
                    stroke={isConnected ? 'var(--blue)' : 'var(--blue)'}
                    strokeWidth={isConnected ? 3 : 2}
                    strokeDasharray={`4 ${len - 4}`}
                    opacity={isConnected ? 0.9 : 0.3}
                    style={{ '--edge-len': `${len}px` } as React.CSSProperties}
                  />
                )
              })}

              {NODES.map(node => {
                const isActive = node.id === active
                const cat = CAT_META[node.category]
                return (
                  <g key={node.id} className="anatomy-node" onClick={() => setActive(node.id)} style={{ cursor: 'pointer' }}>
                    {isActive && (
                      <rect
                        x={node.x - 4}
                        y={node.y - 4}
                        width={NODE_W + 8}
                        height={NODE_H + 8}
                        rx={14}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="1"
                        opacity="0.3"
                        className="anatomy-glow"
                      />
                    )}
                    <rect
                      x={node.x}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx={12}
                      fill={isActive ? 'rgba(255,255,255,.06)' : 'var(--panel)'}
                      stroke={cat.color}
                      strokeWidth={isActive ? 2 : 1}
                      opacity={isActive ? 1 : 0.7}
                    />
                    <text
                      x={node.x + 14}
                      y={node.y + 22}
                      fill={isActive ? cat.color : 'var(--text)'}
                      fontSize="13"
                      fontFamily="'Space Grotesk', monospace"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + 14}
                      y={node.y + 40}
                      fill="var(--muted)"
                      fontSize="10"
                      fontFamily="Inter, system-ui, sans-serif"
                      opacity="0.7"
                    >
                      {cat.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
          <div className="anatomy-detail">
            <div className="anatomy-detail-inner" key={active}>
              <div className="anatomy-detail-icon" style={{ color: activeCat.color }}>{activeCat.icon}</div>
              <div className="anatomy-detail-label" style={{ color: activeCat.color }}>{activeNode.label}</div>
              <div className="anatomy-detail-role">{activeCat.role}</div>
              <p className="anatomy-detail-text">{activeNode.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
