import { roles } from "@/data/roles"
import {
  basicInfoQuestions,
  generalQuestions,
  finalQuestions,
  getRoleQuestions,
} from "@/data/questions"
import type { Question, RoleId } from "@/types/form"
import type { ApplicantRow } from "@/lib/admin-api-client"

/** Maps the exact role title stored in the sheet back to a RoleId. */
const titleToRoleId = new Map<string, RoleId>(roles.map((r) => [r.title, r.id]))

export interface GroupedApplicant {
  submittedAt: string
  roleTitle: string
  roleId: RoleId | null
  answers: Record<string, string>
}

export interface RoleGroup {
  roleId: RoleId | null
  roleTitle: string
  applicants: GroupedApplicant[]
  /** Questions to render for this group, in display order: basic info -> general -> role-specific -> final */
  questions: Question[]
}

/**
 * Groups raw sheet rows by the role the applicant selected, and attaches
 * the full ordered question list (shared + role-specific) for each group
 * so the UI can render every question next to its answer.
 */
export function groupApplicantsByRole(rows: ApplicantRow[]): RoleGroup[] {
  const groups = new Map<string, RoleGroup>()

  for (const row of rows) {
    const roleId = titleToRoleId.get(row.role) ?? null
    const key = row.role || "Unknown"

    if (!groups.has(key)) {
      const roleQuestions = roleId ? getRoleQuestions(roleId) : []
      groups.set(key, {
        roleId,
        roleTitle: row.role || "Unknown / Not specified",
        applicants: [],
        questions: [
          ...basicInfoQuestions,
          ...generalQuestions,
          ...roleQuestions,
          ...finalQuestions,
        ],
      })
    }

    groups.get(key)!.applicants.push({
      submittedAt: row.submittedAt,
      roleTitle: row.role,
      roleId,
      answers: row.answers,
    })
  }

  // Stable order: the 3 known roles first (in roles.ts order), then any
  // unrecognized/legacy role strings last.
  const knownOrder = roles.map((r) => r.title)
  return Array.from(groups.values()).sort((a, b) => {
    const ai = knownOrder.indexOf(a.roleTitle)
    const bi = knownOrder.indexOf(b.roleTitle)
    if (ai === -1 && bi === -1) return a.roleTitle.localeCompare(b.roleTitle)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}
