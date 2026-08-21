import type { FormStep, RoleId } from "@/types/form"
import {
  basicInfoQuestions,
  generalQuestions,
  finalQuestions,
  getRoleQuestions,
} from "@/data/questions"

/**
 * Builds the full ordered list of steps for the form.
 * Step order:
 *  1. Basic Information (Section 3)
 *  2. General Questions (Section 4) — includes the terminating question
 *  3. Role-specific Questions (Section 5A/5B/5C) — only if a role is selected
 *     and the applicant hasn't been terminated
 *  4. Final Questions (Section 6)
 */
export function buildFormSteps(
  role: RoleId | undefined,
  isTerminated: boolean
): FormStep[] {
  const steps: FormStep[] = [
    {
      id: "basic-info",
      title: "المعلومات الأساسية",
      questions: basicInfoQuestions,
    },
    {
      id: "general",
      title: "أسئلة عامة",
      questions: generalQuestions,
    },
  ]

  if (isTerminated) {
    return steps
  }

  if (role) {
    steps.push({
      id: `role-${role}`,
      title: "أسئلة خاصة بالدور",
      questions: getRoleQuestions(role),
    })
  }

  steps.push({
    id: "final",
    title: "أسئلة ختامية",
    questions: finalQuestions,
  })

  return steps
}
