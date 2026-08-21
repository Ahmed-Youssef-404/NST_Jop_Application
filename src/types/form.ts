export type RoleId = "operations" | "growth" | "mentorship"

export type QuestionType =
  | "short-text"
  | "paragraph"
  | "single-choice"
  | "multi-choice"
  | "scale"

export interface QuestionOption {
  value: string
  label: string
}

export interface BaseQuestion {
  /** Stable machine key, used as the Google Sheet column header and form field id */
  id: string
  /** Question number, matches the source application form numbering */
  number: number
  title: string
  description?: string
  type: QuestionType
  required?: boolean
  minLength?: number
  placeholder?: string
}

export interface ShortTextQuestion extends BaseQuestion {
  type: "short-text"
}

export interface ParagraphQuestion extends BaseQuestion {
  type: "paragraph"
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice"
  options: QuestionOption[]
  /** If set, selecting this value ends the application immediately */
  terminatesOnValue?: string
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: "multi-choice"
  options: QuestionOption[]
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale"
  min: number
  max: number
  minLabel: string
  maxLabel: string
}

export type Question =
  | ShortTextQuestion
  | ParagraphQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | ScaleQuestion

export interface RoleDefinition {
  id: RoleId
  emoji: string
  title: string
  shortDescription: string
  fullDescription: string
  responsibilities: string[]
}

export type AnswerValue = string | string[] | number | undefined

export type AnswersMap = Record<string, AnswerValue>

export interface FormStep {
  id: string
  title: string
  questions: Question[]
}
