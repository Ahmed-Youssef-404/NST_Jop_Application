import type { VercelRequest, VercelResponse } from "@vercel/node"
import { verifySessionToken, extractBearerToken } from "../_lib/admin-auth.js"

interface SheetRow {
  submittedAt: string
  role: string
  answers: Record<string, string>
}

interface SheetGetResponse {
  success: boolean
  rows?: SheetRow[]
  error?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const token = extractBearerToken(req.headers.authorization)

  if (!verifySessionToken(token)) {
    return res.status(401).json({ error: "Not authenticated." })
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  const sheetSecret = process.env.SHEET_READ_SECRET

  if (!scriptUrl || !sheetSecret) {
    console.error("GOOGLE_SCRIPT_URL or SHEET_READ_SECRET is not configured.")
    return res.status(500).json({ error: "Applicant data source is not configured." })
  }

  try {
    const url = new URL(scriptUrl)
    url.searchParams.set("secret", sheetSecret)

    const response = await fetch(url.toString(), { method: "GET" })

    if (!response.ok) {
      return res.status(502).json({
        error: `Failed to read applicants (status ${response.status}).`,
      })
    }

    const data = (await response.json().catch(() => null)) as SheetGetResponse | null

    if (!data || data.success !== true || !Array.isArray(data.rows)) {
      return res.status(502).json({
        error: data?.error ?? "Unexpected response while reading applicants.",
      })
    }

    return res.status(200).json({ success: true, rows: data.rows })
  } catch (err) {
    console.error("Failed to fetch applicants from sheet:", err)
    return res.status(502).json({
      error: err instanceof Error ? err.message : "Unknown error reading applicants.",
    })
  }
}
