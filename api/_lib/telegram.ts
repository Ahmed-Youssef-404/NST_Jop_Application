export interface TelegramNotificationData {
  fullName: string
  role: string
  email: string
  whatsapp: string
}

export interface TelegramSendResult {
  success: boolean
  error?: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/**
 * Sends a short summary notification to the configured Telegram chat
 * whenever a new application is successfully saved to the Google Sheet.
 */
export async function sendTelegramNotification(
  data: TelegramNotificationData
): Promise<TelegramSendResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return {
      success: false,
      error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.",
    }
  }

  const text =
    `📩 <b>New NST Application</b>\n\n` +
    `<b>Name:</b> ${escapeHtml(data.fullName)}\n` +
    `<b>Role:</b> ${escapeHtml(data.role)}\n` +
    `<b>Email:</b> ${escapeHtml(data.email)}\n` +
    `<b>WhatsApp:</b> ${escapeHtml(data.whatsapp)}`

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    )

    if (!response.ok) {
      const errBody = await response.text().catch(() => "")
      return {
        success: false,
        error: `Telegram API responded with status ${response.status}: ${errBody}`,
      }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error contacting Telegram.",
    }
  }
}
