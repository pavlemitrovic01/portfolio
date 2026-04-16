import { useRef, useEffect, useState } from 'react'

export default function ChatTerminal() {
  const [userInput, setUserInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)

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
      if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  return (
    <div className="chat-terminal">
      <div className="chat-terminal-header">cl3menza.ai</div>
      <div className="chat-terminal-messages" ref={messagesRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-terminal-msg chat-terminal-msg--${msg.role === 'user' ? 'user' : 'ai'}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="chat-terminal-typing">
            <span className="chat-terminal-typing-dot" />
            <span className="chat-terminal-typing-dot" />
            <span className="chat-terminal-typing-dot" />
          </div>
        )}
      </div>
      <div className="chat-terminal-input">
        <input
          className="chat-terminal-field"
          placeholder="Ask about my work..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage() } }}
        />
        <button className="chat-terminal-send" onClick={sendMessage} disabled={isLoading} aria-label="Send">
          &rarr;
        </button>
      </div>
    </div>
  )
}
