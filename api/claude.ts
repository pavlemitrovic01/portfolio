import type { VercelRequest, VercelResponse } from '@vercel/node'

// --- Rate limiter (in-memory, best-effort on Vercel warm instances) ---
const RATE_LIMIT = 15
const RATE_WINDOW = 60_000

interface RateEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateEntry>()

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }

  if (entry.count >= RATE_LIMIT) return true

  entry.count++
  return false
}

// --- Input validation ---
const MAX_MESSAGES = 30
const MAX_MESSAGE_LENGTH = 2000
const MAX_SYSTEM_LENGTH = 4000

function validateBody(body: unknown): string | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Invalid request body'
  }

  const b = body as Record<string, unknown>

  if (typeof b.model !== 'string' || !b.model.startsWith('claude-')) {
    return 'Invalid model'
  }

  if (!Array.isArray(b.messages)) return 'Invalid messages'
  if (b.messages.length > MAX_MESSAGES) return 'Too many messages'

  for (const msg of b.messages) {
    if (!msg || typeof msg !== 'object' || Array.isArray(msg)) return 'Invalid message format'
    const m = msg as Record<string, unknown>
    if (m.role !== 'user' && m.role !== 'assistant') return 'Invalid message role'
    if (typeof m.content !== 'string') return 'Invalid message content'
    if (m.content.length > MAX_MESSAGE_LENGTH) return 'Message too long'
  }

  if (b.system !== undefined) {
    if (typeof b.system !== 'string') return 'Invalid system prompt'
    if (b.system.length > MAX_SYSTEM_LENGTH) return 'System prompt too long'
  }

  return null
}

// --- Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' })
  }

  const validationError = validateBody(req.body)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({ error: 'Service busy. Try again shortly.' })
      }
      return res.status(500).json({ error: 'Service error. Please try again.' })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch {
    return res.status(500).json({ error: 'Network error. Please try again.' })
  }
}
