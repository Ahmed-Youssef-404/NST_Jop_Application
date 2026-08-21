import { useEffect, useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
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
    goToStep,
    setPhase,
    setSubmissionError,
    submissionError,
    clearPersisted,
    hasHydrated,
  } = useFormStore()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // isTerminated is only meaningful once the terminating question is actually answered "No"
  const isTerminated = answers[TERMINATING_QUESTION_ID] === "No"

  const steps = useMemo(
    () => buildFormSteps(selectedRole, isTerminated),
    [selectedRole, isTerminated]
  )

  // Keep the URL (?step=N) and the store's currentStepIndex in sync in both
  // directions, so browser Back/Forward moves one form step at a time
  // instead of leaving the app. Wait for localStorage rehydration so a
  // refresh doesn't briefly write "step=0" before the saved step loads.
  useEffect(() => {
    if (!hasHydrated) return

    const stepFromUrl = Number(searchParams.get("step"))
    const validStepFromUrl =
      Number.isInteger(stepFromUrl) && stepFromUrl >= 0 && stepFromUrl < steps.length
        ? stepFromUrl
        : 0

    if (!searchParams.has("step")) {
      // No step in URL yet (first load) — write the current one.
      setSearchParams({ step: String(currentStepIndex) }, { replace: true })
    } else if (validStepFromUrl !== currentStepIndex) {
      // URL changed (e.g. browser back/forward) — sync the store to match.
      goToStep(validStepFromUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, hasHydrated])

  useEffect(() => {
    // Clamp if steps shrink (e.g. role changes) and current index is now out of range.
    if (currentStepIndex >= steps.length) {
      goToStep(Math.max(0, steps.length - 1))
    }
  }, [steps.length, currentStepIndex, goToStep])

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1
  const isSubmitting = phase === "submitting"

  const goToStepAndUrl = (index: number) => {
    goToStep(index)
    setSearchParams({ step: String(index) })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
      navigate("/terminated")
      return
    }

    if (isLastStep) {
      await handleSubmit()
      return
    }

    goToStepAndUrl(currentStepIndex + 1)
  }

  const handleSubmit = async () => {
    setPhase("submitting")
    setSubmissionError(undefined)

    const role = getRoleById(selectedRole ?? "")
    const payload = buildSubmissionPayload(answers, role?.title ?? "")

    const result = await submitApplication(payload)

    if (result.success) {
      setPhase("submitted")
      navigate("/submitted")
      clearPersisted()
    } else {
      setSubmissionError(result.errorMessage)
      setPhase("form")
    }
  }

  const handleBack = () => {
    if (currentStepIndex === 0) return
    goToStepAndUrl(currentStepIndex - 1)
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