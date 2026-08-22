import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * Stateless admin session tokens.
 *
 * The token is `${expiresAt}.${signature}` where signature = HMAC-SHA256(
 * expiresAt, ADMIN_SESSION_SECRET). No session store is needed — the server
 * can verify a token by recomputing the signature. The frontend is expected
 * to keep this token in memory only (React state), so a page refresh
 * requires logging in again by design.
 */

const SESSION_TTL_MS = 60 * 60 * 1000 // 1 hour of inactivity before re-login is forced anyway

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET environment variable is not configured.")
  }
  return secret
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const payload = String(expiresAt)
  const signature = sign(payload)
  return `${payload}.${signature}`
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false

  const parts = token.split(".")
  if (parts.length !== 2) return false

  const [payload, signature] = parts
  if (!payload || !signature) return false

  const expiresAt = Number(payload)
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false

  let expectedBuf: Buffer
  let providedBuf: Buffer
  try {
    expectedBuf = Buffer.from(sign(payload), "hex")
    providedBuf = Buffer.from(signature, "hex")
  } catch {
    return false
  }

  if (expectedBuf.length !== providedBuf.length) return false

  return timingSafeEqual(expectedBuf, providedBuf)
}

/** Extracts the bearer token from an Authorization header value. */
export function extractBearerToken(authHeader: string | undefined | null): string | null {
  if (!authHeader) return null
  const match = authHeader.match(/^Bearer\s+(.+)$/i)
  return match ? match[1] : null
}
