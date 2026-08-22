export interface AdminLoginResult {
  success: boolean
  token?: string
  errorMessage?: string
}

export async function adminLogin(
  email: string,
  password: string
): Promise<AdminLoginResult> {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok || !data?.success) {
      return {
        success: false,
        errorMessage: data?.error ?? "Login failed. Please try again.",
      }
    }

    return { success: true, token: data.token as string }
  } catch {
    return {
      success: false,
      errorMessage: "Couldn't reach the server. Check your connection and try again.",
    }
  }
}

export interface ApplicantRow {
  submittedAt: string
  role: string
  answers: Record<string, string>
}

export interface AdminApplicantsResult {
  success: boolean
  rows?: ApplicantRow[]
  errorMessage?: string
  unauthorized?: boolean
}

export async function fetchApplicants(token: string): Promise<AdminApplicantsResult> {
  try {
    const response = await fetch("/api/admin/applicants", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })

    const data = await response.json().catch(() => null)

    if (response.status === 401) {
      return {
        success: false,
        unauthorized: true,
        errorMessage: data?.error ?? "Session expired. Please log in again.",
      }
    }

    if (!response.ok || !data?.success) {
      return {
        success: false,
        errorMessage: data?.error ?? "Failed to load applicants.",
      }
    }

    return { success: true, rows: data.rows as ApplicantRow[] }
  } catch {
    return {
      success: false,
      errorMessage: "Couldn't reach the server. Check your connection and try again.",
    }
  }
}
