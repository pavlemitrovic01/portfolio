import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HeroCl3menza() {
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'user', content: 'Need a premium ordering system with admin panel' },
    { role: 'assistant', content: 'On it. React + Supabase, custom flow, payment-ready. ETA 48h.' },
    { role: 'user', content: "That's exactly what I needed." }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const iframeWrapRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const wrap = iframeWrapRef.current
    if (!wrap) return
    const iframe = wrap.querySelector('iframe')
    if (!iframe) return
    const resize = () => {
      const scale = wrap.clientWidth / 1440
      iframe.style.transform = `scale(${scale})`
      wrap.style.height = `${900 * scale}px`
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return
    const newMessages = [...messages, { role: 'user' as const, content: userInput }]
    setMessages(newMessages)
    setUserInput('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: `You are cl3menza.ai — Pavle Mitrovic's AI presence embedded in his portfolio at cl3menza.com. You speak in the first person as cl3menza.ai. You are not a chatbot relaying messages — you ARE the direct channel to Pavle's work, knowledge and availability. Never imply you will "pass something along" or that Pavle is a separate party you communicate with.

Language rule (CRITICAL):
- ALWAYS respond in the same language the user writes in. Detect their language from every message.
- If they write in English, everything must be in English — including proposals, field labels, and the "give me a second" line.
- If they write in Serbian, respond in Serbian. Never mix languages within a response.

Who Pavle is:
- Freelance digital product engineer based in Serbia, working globally
- Builds premium websites, custom web products, ordering/payment systems and admin dashboards
- Stack: React 19, TypeScript, Vite, Framer Motion, Supabase, Vanilla CSS
- Flagship project: Padrino Budva — a pizza restaurant with a full ordering system, cart with add-ons, admin panel, Bankart payment integration, delivery zone logic and real-time order management
- Available for new projects immediately

Pavle's background (share when asked about history, beginnings, or experience):
- Started building seriously in 2025, first major project was the Padrino Budva ordering system
- The portfolio site the client is currently looking at shows where he is now
- Do not fabricate years of prior experience — be honest and let the work speak

Pricing (share openly when asked):
- Premium business website: 800–1500€
- Custom web product/system: 1500–4000€
- ETA: 2–6 weeks depending on scope
- These are starting ranges — final price depends on complexity, integrations and number of unique flows

Tone rules:
- Direct, technically competent, zero fluff
- Do not sell aggressively — inform clearly
- Keep responses concise (2–4 sentences max unless generating a proposal)
- Never say "I'm just an AI" or deflect — you know Pavle's work inside out

When a client mentions a business type or project idea (restaurant, print shop, invitations, e-commerce, booking system, salon, gym, real estate, etc.), respond EXACTLY like this:
1. First say (in the user's language): "Daj mi sekund da sklopim predlog za tebe." / "Give me a second to put together a proposal for you." (match their language)
2. Then generate the proposal in this plain-text format, with ALL field labels in the user's language:

[Project Name]
Features: [list 4–5 key features relevant to their business]
Stack: [relevant technologies from Pavle's stack]
ETA: [realistic estimate]
Price: [price range in EUR]

Example — if the user writes in Serbian, use "Funkcije:", "Stek:", "ETA:", "Cena:". If in English, use "Features:", "Stack:", "ETA:", "Price:".

Make the proposal specific to their business — not generic. Use real feature names that show you understand the domain.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await response.json()
      const assistantMessage = data.content[0].text
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Reach me directly at hello@cl3menza.com' }])
    } finally {
      setIsLoading(false)
      if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
  }, [messages])

  return (
    <div className="hero-grid">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <div className="eyebrow">cl3menza mode — portfolio engine active</div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h1>
            <span className="line pavle">Pavle</span>
            <span className="line" style={{ color: 'var(--cyan)' }}>cl3menza</span>
          </h1>
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="role">Digital Product Engineer</div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <p className="lead">From Padrino Budva's ordering system to premium business websites — I build digital products that work as well as they look. Based in Serbia, working globally.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="hero-actions">
            <a className="button primary magnetic" href="#project">View flagship build</a>
            <a className="button magnetic" href="#contact">Start a project</a>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="trust-pills">
            <span>Premium websites</span>
            <span>Custom systems</span>
            <span>Admin logic</span>
            <span>Payment integrations</span>
            <span>Product thinking</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="hv-badge-status">
          <span className="hv-status-dot" />
          <span>Available for projects</span>
        </div>
        <div className="hv-stack-pills">React · TypeScript · Framer</div>
        <div className="hv-iframe-wrap" ref={iframeWrapRef}>
          <iframe
            src="https://padrinobudva.com"
            title="Padrino Budva — Live Preview"
            loading="lazy"
            allow="fullscreen"
          />
        </div>
        <motion.div
          className="hv-chat"
          animate={reduceMotion ? { y: 0 } : { y: [0, 10, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
          }
        >
          <div className="hv-chat-header">
            <span className="hv-status-dot" />
            <span className="hv-chat-name">cl3menza.ai</span>
            <span className="hv-chat-active">active</span>
          </div>
          <div className="hv-messages" ref={messagesContainerRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`hv-msg ${msg.role === 'user' ? 'hv-msg-user' : 'hv-msg-ai'}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
          </div>
          <div className="hv-chat-input">
            <input
              className="hv-input-field"
              placeholder="Ask about your project..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage() } }}
            />
            <button className="hv-send" onClick={sendMessage} disabled={isLoading} aria-label="Send">→</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
