import { motion } from "framer-motion"
import { QuestionField } from "@/components/form/question-field"
import type { AnswersMap, FormStep } from "@/types/form"

interface FormStepViewProps {
  step: FormStep
  answers: AnswersMap
  errors: Record<string, string>
  onAnswerChange: (questionId: string, value: AnswersMap[string]) => void
}

export function FormStepView({
  step,
  answers,
  errors,
  onAnswerChange,
}: FormStepViewProps) {
  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-8"
    >
      {step.questions.map((question) => (
        <QuestionField
          key={question.id}
          question={question}
          value={answers[question.id]}
          onChange={(value) => onAnswerChange(question.id, value)}
          error={errors[question.id]}
        />
      ))}
    </motion.div>
  )
}
