import { allQuestionIds } from "@/data/questions"
import type { AnswersMap } from "@/types/form"

export interface SubmissionPayload {
  submittedAt: string
  role: string
  answers: Record<string, string>
}

/**
 * Flattens the answers map into a stable, ordered record of string values
 * ready to be written as a single Google Sheet row. Multi-choice answers
 * are joined with a comma; missing answers become an empty string.
 */
export function buildSubmissionPayload(
  answers: AnswersMap,
  role: string
): SubmissionPayload {
  const flatAnswers: Record<string, string> = {}

  for (const id of allQuestionIds) {
    const value = answers[id]
    if (Array.isArray(value)) {
      flatAnswers[id] = value.join(", ")
    } else if (value === undefined || value === null) {
      flatAnswers[id] = ""
    } else {
      flatAnswers[id] = String(value)
    }
  }

  return {
    submittedAt: new Date().toISOString(),
    role,
    answers: flatAnswers,
  }
}
