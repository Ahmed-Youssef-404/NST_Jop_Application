import type { Question, RoleId } from "@/types/form"
import {
  basicInfoQuestions,
  generalQuestions,
  finalQuestions,
} from "@/data/questions-general"
import { operationsQuestions } from "@/data/questions-operations"
import { growthQuestions } from "@/data/questions-growth"
import { mentorshipQuestions } from "@/data/questions-mentorship"

export {
  basicInfoQuestions,
  generalQuestions,
  finalQuestions,
  operationsQuestions,
  growthQuestions,
  mentorshipQuestions,
}

/** The one question that, if answered "No", ends the application immediately. */
export const TERMINATING_QUESTION_ID = "unpaid_confirmation"

export const roleQuestionsMap: Record<RoleId, Question[]> = {
  operations: operationsQuestions,
  growth: growthQuestions,
  mentorship: mentorshipQuestions,
}

export const getRoleQuestions = (roleId: RoleId | undefined): Question[] =>
  roleId ? roleQuestionsMap[roleId] : []

/**
 * Full ordered list of every question that could ever appear across all roles.
 * Used to build the Google Sheet header row (one column per possible question)
 * regardless of which role the applicant chose.
 */
export const allPossibleQuestions: Question[] = [
  ...basicInfoQuestions,
  ...generalQuestions,
  ...operationsQuestions,
  ...growthQuestions,
  ...mentorshipQuestions,
  ...finalQuestions,
]

/** All question ids in stable order, used as the canonical Google Sheet column order. */
export const allQuestionIds: string[] = allPossibleQuestions.map((q) => q.id)
