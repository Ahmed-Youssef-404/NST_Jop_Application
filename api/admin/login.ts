import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createSessionToken } from "../_lib/admin-auth.js"

interface LoginPayload {
  email?: string
  password?: string
}

// Extremely small in-memory rate limit, best-effort only (resets on cold
// start / across serverless instances). Meant to slow down naive brute
// forcing, not to be a real defense — the real gate is the password itself.
const attempts = new Map<string, { count: number; firstAttemptAt: number }>()
const WINDOW_MS = 60_000
const MAX_ATTEMPTS_PER_WINDOW = 8

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now })
    return false
  }

  entry.count += 1
  return entry.count > MAX_ATTEMPTS_PER_WINDOW
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not configured.")
    return res.status(500).json({ error: "Admin login is not configured." })
  }

  const clientKey =
    (req.headers["x-forwarded-for"] as string) || req.socket?.remoteAddress || "unknown"

  if (isRateLimited(clientKey)) {
    return res.status(429).json({ error: "Too many attempts. Try again in a minute." })
  }

  const body = req.body as LoginPayload

  if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
    return res.status(400).json({ error: "Email and password are required." })
  }

  const emailMatches = body.email.trim().toLowerCase() === adminEmail.trim().toLowerCase()
  const passwordMatches = body.password === adminPassword

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ error: "Invalid email or password." })
  }

  let token: string
  try {
    token = createSessionToken()
  } catch (err) {
    console.error("Failed to create session token:", err)
    return res.status(500).json({ error: "Admin login is not configured correctly." })
  }

  return res.status(200).json({ success: true, token })
}
