import type { VercelRequest, VercelResponse } from '@vercel/node'

// --- Backend constants (never client-controlled) ---
const ANTHROPIC_MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 600

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

export function isRateLimited(ip: string): boolean {
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

export function validateBody(body: unknown): string | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Invalid request body'
  }

  const b = body as Record<string, unknown>

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

// --- Response sanitization ---
// Strip HTML tags from text content blocks only — guards against XSS if upstream ever returns markup.
export function sanitizeAnthropicResponse(data: unknown): unknown {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data
  const d = data as Record<string, unknown>
  if (!Array.isArray(d.content)) return data
  return {
    ...d,
    content: d.content.map((block: unknown) => {
      if (!block || typeof block !== 'object' || Array.isArray(block)) return block
      const b = block as Record<string, unknown>
      if (typeof b.text === 'string') {
        return { ...b, text: b.text.replace(/<[^>]*>/g, '') }
      }
      return block
    }),
  }
}

/** Test-only: reset in-memory rate limit state between test runs. */
export function _resetRateLimitMap(): void {
  rateLimitMap.clear()
}

// --- Handler ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Service not configured.' })
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' })
  }

  const validationError = validateBody(req.body)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  const b = req.body as Record<string, unknown>
  const anthropicBody: Record<string, unknown> = {
    model: ANTHROPIC_MODEL,
    max_tokens: MAX_TOKENS,
    messages: b.messages,
  }
  if (typeof b.system === 'string') {
    anthropicBody.system = b.system
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(anthropicBody),
    })

    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({ error: 'Service busy. Try again shortly.' })
      }
      return res.status(500).json({ error: 'Service error. Please try again.' })
    }

    const data = await response.json()
    return res.status(200).json(sanitizeAnthropicResponse(data))
  } catch {
    return res.status(500).json({ error: 'Network error. Please try again.' })
  }
}
