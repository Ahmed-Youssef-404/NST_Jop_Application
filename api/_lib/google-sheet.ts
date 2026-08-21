export interface SheetSubmissionPayload {
  submittedAt: string
  role: string
  answers: Record<string, string>
}

export interface SheetWriteResult {
  success: boolean
  error?: string
}

/**
 * Sends the submission to the Google Apps Script Web App, which appends
 * a row to the Google Sheet. The Apps Script endpoint is expected to
 * respond with JSON: { success: true } or { success: false, error: "..." }
 */
export async function writeToGoogleSheet(
  payload: SheetSubmissionPayload
): Promise<SheetWriteResult> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    return {
      success: false,
      error: "GOOGLE_SCRIPT_URL environment variable is not configured.",
    }
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script web apps sometimes respond with a redirect; fetch follows by default.
    })

    if (!response.ok) {
      return {
        success: false,
        error: `Google Sheet write failed with status ${response.status}`,
      }
    }

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; error?: string }
      | null

    if (!data || data.success !== true) {
      return {
        success: false,
        error: data?.error ?? "Unexpected response from Google Sheet endpoint.",
      }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error contacting Google Sheet.",
    }
  }
}
