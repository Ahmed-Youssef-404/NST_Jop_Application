import { z } from "zod"
import type { AnswersMap, Question } from "@/types/form"

const MIN_PARAGRAPH_LENGTH = 10

/**
 * Builds a Zod object schema for a given list of questions.
 * Required questions must be non-empty; paragraphs get a minimum length
 * to discourage low-effort one-word answers.
 */
export function buildSchemaForQuestions(questions: Question[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const q of questions) {
    let fieldSchema: z.ZodTypeAny

    switch (q.type) {
      case "short-text": {
        fieldSchema = z.string().trim()
        if (q.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(1, "This field is required")
        } else {
          fieldSchema = fieldSchema.optional()
        }
        break
      }
      case "paragraph": {
        fieldSchema = z.string().trim()
        if (q.required) {
          const minLength = q.minLength ?? MIN_PARAGRAPH_LENGTH
          fieldSchema = (fieldSchema as z.ZodString).min(
            minLength,
            `Please provide a more detailed answer (minimum ${minLength} characters) - this helps us better understand your response`
          )
        } else {
          fieldSchema = fieldSchema.optional()
        }
        break
      }
      case "single-choice": {
        fieldSchema = z.string()
        if (q.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(1, "Please select an answer")
        } else {
          fieldSchema = fieldSchema.optional()
        }
        break
      }
      case "multi-choice": {
        fieldSchema = z.array(z.string())
        if (q.required) {
          fieldSchema = (fieldSchema as z.ZodArray<z.ZodString>).min(
            1,
            "Please select at least one option"
          )
        } else {
          fieldSchema = fieldSchema.optional()
        }
        break
      }
      case "scale": {
        fieldSchema = z.number().min(q.min).max(q.max)
        break
      }
      default:
        fieldSchema = z.any().optional()
    }

    shape[q.id] = fieldSchema
  }

  return z.object(shape)
}

export interface ValidationResult {
  success: boolean
  errors: Record<string, string>
}

export function validateAnswers(
  questions: Question[],
  answers: AnswersMap
): ValidationResult {
  const schema = buildSchemaForQuestions(questions)
  const relevantAnswers: Record<string, unknown> = {}
  for (const q of questions) {
    relevantAnswers[q.id] = answers[q.id] ?? (q.type === "multi-choice" ? [] : "")
  }

  const result = schema.safeParse(relevantAnswers)

  if (result.success) {
    return { success: true, errors: {} }
  }

  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0])
    if (!errors[key]) {
      errors[key] = issue.message
    }
  }
  return { success: false, errors }
}