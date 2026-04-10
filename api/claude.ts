import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ANTHROPIC_MODEL, MAX_TOKENS, SYSTEM_PROMPT } from './constants'

export { SYSTEM_PROMPT }

// --- CORS ---
const ALLOWED_ORIGINS = [
  'https://cl3menza.com',
  'https://www.cl3menza.com',
  'https://portfolio-seven-eosin-21.vercel.app',
]

function resolveOrigin(origin: string | undefined): string | null {
  if (!origin) return null
  return ALLOWED_ORIGINS.includes(origin) ? origin : null
}

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

// Upstash-backed rate limit — uses REST API directly (no npm dep).
// Falls back to in-memory isRateLimited if env vars are not configured.
async function checkRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return isRateLimited(ip)

  try {
    const key = `portfolio:rl:${ip}`
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, '60', 'NX'],
      ]),
    })
    if (!res.ok) return isRateLimited(ip)
    const results = (await res.json()) as Array<{ result: number }>
    return results[0].result > RATE_LIMIT
  } catch {
    return isRateLimited(ip)
  }
}

// --- Input validation ---
const MAX_MESSAGES = 30
const MAX_MESSAGE_LENGTH = 2000

export function validateBody(body: unknown): string | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Invalid request body'
  }

  const b = body as Record<string, unknown>

  // System prompt is server-side only — reject if client sends it
  if ('system' in b) return 'system field not allowed'

  if (!Array.isArray(b.messages)) return 'Invalid messages'
  if (b.messages.length > MAX_MESSAGES) return 'Too many messages'

  for (const msg of b.messages) {
    if (!msg || typeof msg !== 'object' || Array.isArray(msg)) return 'Invalid message format'
    const m = msg as Record<string, unknown>
    if (m.role !== 'user' && m.role !== 'assistant') return 'Invalid message role'
    if (typeof m.content !== 'string') return 'Invalid message content'
    if (m.content.length > MAX_MESSAGE_LENGTH) return 'Message too long'
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
  const origin = req.headers.origin as string | undefined
  const allowedOrigin = resolveOrigin(origin)

  // Reject requests from unknown cross-origin sources
  if (origin && !allowedOrigin) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  // Set CORS headers for whitelisted origins
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    res.setHeader('Vary', 'Origin')
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Service not configured.' })
  }

  const ip = getClientIp(req)
  if (await checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' })
  }

  const validationError = validateBody(req.body)
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  const b = req.body as Record<string, unknown>

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: b.messages,
      }),
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
