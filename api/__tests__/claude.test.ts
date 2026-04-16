/// <reference types="vitest/globals" />
import type { VercelRequest, VercelResponse } from '@vercel/node'
import handler, { validateBody, isRateLimited, _resetRateLimitMap, sanitizeAnthropicResponse } from '../claude'
import { SYSTEM_PROMPT } from '../constants'

// --- Helpers ---

function req(overrides: Partial<{
  method: string
  headers: Record<string, string>
  body: unknown
  socket: { remoteAddress: string }
}> = {}): VercelRequest {
  return {
    method: 'POST',
    headers: { 'x-forwarded-for': '1.2.3.4' },
    body: null,
    socket: { remoteAddress: '1.2.3.4' },
    ...overrides,
  } as unknown as VercelRequest
}

function mockRes() {
  const r = {
    statusCode: 0,
    body: null as unknown,
    headers: {} as Record<string, string>,
    status(code: number) { r.statusCode = code; return r },
    json(body: unknown) { r.body = body; return r },
    setHeader(name: string, value: string) { r.headers[name] = value; return r },
    end() { return r },
  }
  return r
}

const validBody = {
  messages: [{ role: 'user', content: 'hello' }],
}

// --- validateBody ---

describe('validateBody', () => {
  it('returns error for null', () => {
    expect(validateBody(null)).toBe('Invalid request body')
  })

  it('returns error for array', () => {
    expect(validateBody([])).toBe('Invalid request body')
  })

  it('returns error for non-object', () => {
    expect(validateBody('string')).toBe('Invalid request body')
  })

  it('returns error when messages is not an array', () => {
    expect(validateBody({ messages: 'bad' })).toBe('Invalid messages')
  })

  it('returns error when messages exceed MAX_MESSAGES', () => {
    const messages = Array.from({ length: 31 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: 'x',
    }))
    expect(validateBody({ messages })).toBe('Too many messages')
  })

  it('returns error for invalid message format', () => {
    expect(validateBody({ messages: [null] })).toBe('Invalid message format')
  })

  it('returns error for invalid role', () => {
    expect(validateBody({ messages: [{ role: 'system', content: 'x' }] })).toBe('Invalid message role')
  })

  it('returns error when content is not a string', () => {
    expect(validateBody({ messages: [{ role: 'user', content: 123 }] })).toBe('Invalid message content')
  })

  it('returns error when content exceeds MAX_MESSAGE_LENGTH', () => {
    const content = 'x'.repeat(2001)
    expect(validateBody({ messages: [{ role: 'user', content }] })).toBe('Message too long')
  })

  it('returns error when system field is present (non-string)', () => {
    expect(validateBody({ messages: [], system: 123 })).toBe('system field not allowed')
  })

  it('returns error when system field is present (string)', () => {
    const system = 'x'.repeat(4001)
    expect(validateBody({ messages: [], system })).toBe('system field not allowed')
  })

  it('returns null for valid body', () => {
    expect(validateBody(validBody)).toBeNull()
  })

  it('returns error when system field is present in valid body', () => {
    expect(validateBody({ ...validBody, system: 'You are helpful.' })).toBe('system field not allowed')
  })

  it('returns null for valid body with multiple messages', () => {
    const messages = [
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
      { role: 'user', content: 'bye' },
    ]
    expect(validateBody({ messages })).toBeNull()
  })

  it('ignores extra client fields (model, max_tokens) without error', () => {
    expect(validateBody({ messages: [{ role: 'user', content: 'x' }], model: 'gpt-4', max_tokens: 9999 })).toBeNull()
  })
})

// --- isRateLimited ---

describe('isRateLimited', () => {
  beforeEach(() => _resetRateLimitMap())

  it('allows first request', () => {
    expect(isRateLimited('1.2.3.4')).toBe(false)
  })

  it('allows requests up to the limit', () => {
    for (let i = 0; i < 14; i++) isRateLimited('1.2.3.4')
    expect(isRateLimited('1.2.3.4')).toBe(false) // 15th — still allowed
  })

  it('blocks request over the limit', () => {
    for (let i = 0; i < 15; i++) isRateLimited('1.2.3.4')
    expect(isRateLimited('1.2.3.4')).toBe(true) // 16th — blocked
  })

  it('tracks IPs independently', () => {
    for (let i = 0; i < 15; i++) isRateLimited('1.2.3.4')
    expect(isRateLimited('9.9.9.9')).toBe(false)
  })

  it('resets after window expires', () => {
    vi.useFakeTimers()
    for (let i = 0; i < 15; i++) isRateLimited('1.2.3.4')
    expect(isRateLimited('1.2.3.4')).toBe(true)

    vi.advanceTimersByTime(61_000) // past 60s window
    expect(isRateLimited('1.2.3.4')).toBe(false)
    vi.useRealTimers()
  })
})

// --- sanitizeAnthropicResponse ---

describe('sanitizeAnthropicResponse', () => {
  it('strips HTML tags from text content blocks', () => {
    const input = { content: [{ type: 'text', text: 'Hello <b>bold</b> world' }] }
    const result = sanitizeAnthropicResponse(input) as typeof input
    expect(result.content[0].text).toBe('Hello bold world')
  })

  it('leaves non-text blocks unchanged', () => {
    const input = { content: [{ type: 'tool_use', id: 'abc' }] }
    const result = sanitizeAnthropicResponse(input) as typeof input
    expect(result.content[0]).toEqual({ type: 'tool_use', id: 'abc' })
  })

  it('passes through response shape unchanged when no HTML present', () => {
    const input = { content: [{ type: 'text', text: 'plain text' }], model: 'claude-haiku' }
    const result = sanitizeAnthropicResponse(input) as typeof input
    expect(result.content[0].text).toBe('plain text')
    expect((result as Record<string, unknown>).model).toBe('claude-haiku')
  })

  it('returns non-object input unchanged', () => {
    expect(sanitizeAnthropicResponse(null)).toBeNull()
    expect(sanitizeAnthropicResponse('string')).toBe('string')
  })

  it('returns unchanged when content is not an array', () => {
    const input = { content: 'not-array' }
    expect(sanitizeAnthropicResponse(input)).toEqual(input)
  })
})

// --- handler ---

describe('handler', () => {
  beforeEach(() => {
    _resetRateLimitMap()
    vi.stubGlobal('fetch', vi.fn())
    process.env['ANTHROPIC_API_KEY'] = 'test-key'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    delete process.env['ANTHROPIC_API_KEY']
  })

  it('returns 403 for disallowed cross-origin request', async () => {
    const r = mockRes()
    await handler(req({ headers: { 'x-forwarded-for': '1.2.3.4', origin: 'https://evil.com' } }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(403)
  })

  it('returns 204 for OPTIONS preflight from allowed origin', async () => {
    const r = mockRes()
    await handler(req({ method: 'OPTIONS', headers: { origin: 'https://cl3menza.com' } }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(204)
    expect(r.headers['Access-Control-Allow-Origin']).toBe('https://cl3menza.com')
  })

  it('returns 405 for non-POST', async () => {
    const r = mockRes()
    await handler(req({ method: 'GET' }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(405)
    expect((r.body as Record<string, string>).error).toBe('Method not allowed')
  })

  it('returns 500 when ANTHROPIC_API_KEY is missing', async () => {
    delete process.env['ANTHROPIC_API_KEY']
    const r = mockRes()
    await handler(req({ body: validBody }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(500)
    expect((r.body as Record<string, string>).error).toBe('Service not configured.')
  })

  it('returns 429 when rate limited', async () => {
    const r = mockRes()
    for (let i = 0; i < 15; i++) isRateLimited('1.2.3.4')
    await handler(req(), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(429)
  })

  it('returns 400 for invalid body', async () => {
    const r = mockRes()
    await handler(req({ body: { messages: 'not-array' } }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(400)
    expect((r.body as Record<string, string>).error).toBe('Invalid messages')
  })

  it('returns 400 when client sends system field', async () => {
    const r = mockRes()
    await handler(req({ body: { ...validBody, system: 'injected prompt' } }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(400)
    expect((r.body as Record<string, string>).error).toBe('system field not allowed')
  })

  it('always forwards server-side system prompt to Anthropic', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: [{ type: 'text', text: 'ok' }] }),
    } as Response)
    const r = mockRes()
    await handler(req({ body: validBody }), r as unknown as VercelResponse)
    const forwarded = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string)
    expect(forwarded.system).toBe(SYSTEM_PROMPT)
  })

  it('does not forward extra client fields to Anthropic', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: [{ type: 'text', text: 'ok' }] }),
    } as Response)
    const r = mockRes()
    await handler(
      req({ body: { ...validBody, model: 'gpt-4', max_tokens: 9999, extra_field: 'sneaky' } }),
      r as unknown as VercelResponse
    )
    const forwarded = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string)
    expect(forwarded.model).toBe('claude-haiku-4-5-20251001')
    expect(forwarded.max_tokens).toBe(600)
    expect(forwarded.extra_field).toBeUndefined()
  })

  it('returns 429 when Anthropic returns 429', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 429 } as Response)
    const r = mockRes()
    await handler(req({ body: validBody }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(429)
  })

  it('returns 500 when Anthropic returns other error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 500 } as Response)
    const r = mockRes()
    await handler(req({ body: validBody }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(500)
  })

  it('returns 500 on network error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('network'))
    const r = mockRes()
    await handler(req({ body: validBody }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(500)
    expect((r.body as Record<string, string>).error).toContain('Network error')
  })

  it('returns 200 with sanitized data on success', async () => {
    const mockData = { content: [{ type: 'text', text: 'hello <b>world</b>' }] }
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response)
    const r = mockRes()
    await handler(req({ body: validBody }), r as unknown as VercelResponse)
    expect(r.statusCode).toBe(200)
    expect((r.body as typeof mockData).content[0].text).toBe('hello world')
  })

  it('uses x-forwarded-for header for IP', async () => {
    for (let i = 0; i < 15; i++) isRateLimited('9.9.9.9')
    const r = mockRes()
    await handler(
      req({ headers: { 'x-forwarded-for': '9.9.9.9' } }),
      r as unknown as VercelResponse
    )
    expect(r.statusCode).toBe(429)
  })
})
