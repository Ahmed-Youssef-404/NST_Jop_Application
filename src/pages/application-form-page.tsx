import { useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormProgress } from "@/components/form/form-progress"
import { FormStepView } from "@/components/form/form-step-view"
import { buildFormSteps } from "@/lib/build-steps"
import { validateAnswers } from "@/lib/validation"
import { buildSubmissionPayload } from "@/lib/build-payload"
import { submitApplication } from "@/lib/api-client"
import { TERMINATING_QUESTION_ID } from "@/data/questions"
import { getRoleById } from "@/data/roles"
import { useFormStore } from "@/store/form-store"
import type { AnswerValue } from "@/types/form"

export function ApplicationFormPage() {
  const {
    selectedRole,
    currentStepIndex,
    answers,
    phase,
    setAnswer,
    nextStep,
    prevStep,
    setPhase,
    setSubmissionError,
    submissionError,
  } = useFormStore()

  const [errors, setErrors] = useState<Record<string, string>>({})

  // isTerminated is only meaningful once the terminating question is actually answered "No"
  const isTerminated =
    answers[TERMINATING_QUESTION_ID] === "No"

  const steps = useMemo(
    () => buildFormSteps(selectedRole, isTerminated),
    [selectedRole, isTerminated]
  )

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1
  const isSubmitting = phase === "submitting"

  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setAnswer(questionId, value)
    if (errors[questionId]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[questionId]
        return next
      })
    }
  }

  const handleNext = async () => {
    const result = validateAnswers(currentStep.questions, answers)
    if (!result.success) {
      setErrors(result.errors)
      return
    }
    setErrors({})

    // Check termination right after validating the step that contains the question
    if (answers[TERMINATING_QUESTION_ID] === "No") {
      setPhase("terminated")
      return
    }

    if (isLastStep) {
      await handleSubmit()
      return
    }

    nextStep(steps.length)
  }

  const handleSubmit = async () => {
    setPhase("submitting")
    setSubmissionError(undefined)

    const role = getRoleById(selectedRole ?? "")
    const payload = buildSubmissionPayload(answers, role?.title ?? "")

    const result = await submitApplication(payload)

    if (result.success) {
      setPhase("submitted")
    } else {
      setSubmissionError(result.errorMessage)
      setPhase("form")
    }
  }

  const handleBack = () => {
    if (currentStepIndex === 0) return
    prevStep()
  }

  if (!currentStep) return null

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <FormProgress
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        stepTitle={currentStep.title}
      />

      <AnimatePresence mode="wait">
        <FormStepView
          step={currentStep}
          answers={answers}
          errors={errors}
          onAnswerChange={handleAnswerChange}
        />
      </AnimatePresence>

      {submissionError && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          {submissionError}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t pt-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStepIndex === 0 || isSubmitting}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <Button size="lg" onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </>
          ) : isLastStep ? (
            <>
              Submit application
              <Send className="size-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}