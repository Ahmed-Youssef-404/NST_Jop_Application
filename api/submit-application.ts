import type { VercelRequest, VercelResponse } from "@vercel/node"
import { writeToGoogleSheet } from "./_lib/google-sheet"
import { sendTelegramNotification } from "./_lib/telegram"

interface IncomingPayload {
  submittedAt?: string
  role?: string
  answers?: Record<string, string>
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = req.body as IncomingPayload

  if (!body || typeof body !== "object" || !body.answers) {
    return res.status(400).json({ error: "Invalid submission payload." })
  }

  const { submittedAt, role, answers } = body

  // Minimal server-side sanity checks — the full validation already
  // happened client-side, this just guards against malformed requests.
  if (!answers.full_name || !answers.email_address) {
    return res.status(400).json({ error: "Missing required fields." })
  }

  const sheetResult = await writeToGoogleSheet({
    submittedAt: submittedAt ?? new Date().toISOString(),
    role: role ?? "",
    answers,
  })

  if (!sheetResult.success) {
    console.error("Google Sheet write failed:", sheetResult.error)
    return res.status(502).json({
      error: "تعذر حفظ الطلب. من فضلك حاول مرة أخرى بعد قليل.",
    })
  }

  // Telegram notification only fires after a successful sheet write,
  // and its failure must never fail the overall submission for the user.
  const telegramResult = await sendTelegramNotification({
    fullName: answers.full_name,
    role: role ?? "",
    email: answers.email_address,
    whatsapp: answers.whatsapp_number ?? "",
  })

  if (!telegramResult.success) {
    console.error("Telegram notification failed:", telegramResult.error)
  }

  return res.status(200).json({ success: true })
}
