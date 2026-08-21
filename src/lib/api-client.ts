import type { SubmissionPayload } from "@/lib/build-payload"

export interface SubmitResult {
  success: boolean
  errorMessage?: string
}

/**
 * Calls our own Vercel serverless function, which internally:
 *  1. Writes the row to Google Sheets
 *  2. If (and only if) that succeeds, sends a Telegram summary notification
 */
export async function submitApplication(
  payload: SubmissionPayload
): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/submit-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      return {
        success: false,
        errorMessage:
          data?.error ?? "حدث خطأ أثناء إرسال الطلب. من فضلك حاول مرة أخرى.",
      }
    }

    return { success: true }
  } catch {
    return {
      success: false,
      errorMessage:
        "تعذر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.",
    }
  }
}
