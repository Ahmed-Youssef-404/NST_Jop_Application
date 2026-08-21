import { create } from "zustand"
import type { AnswersMap, AnswerValue, RoleId } from "@/types/form"

export type FormPhase =
  | "intro"
  | "roles-overview"
  | "form"
  | "terminated"
  | "submitting"
  | "submitted"
  | "error"

interface FormState {
  phase: FormPhase
  selectedRole: RoleId | undefined
  currentStepIndex: number
  answers: AnswersMap
  submissionError: string | undefined

  setPhase: (phase: FormPhase) => void
  setRole: (role: RoleId) => void
  setAnswer: (questionId: string, value: AnswerValue) => void
  goToStep: (index: number) => void
  nextStep: (totalSteps: number) => void
  prevStep: () => void
  setSubmissionError: (message: string | undefined) => void
  reset: () => void
}

const initialState = {
  phase: "intro" as FormPhase,
  selectedRole: undefined,
  currentStepIndex: 0,
  answers: {} as AnswersMap,
  submissionError: undefined as string | undefined,
}

export const useFormStore = create<FormState>((set, get) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),

  setRole: (role) =>
    set({
      selectedRole: role,
      answers: { ...get().answers, role_selected: role },
    }),

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  goToStep: (index) => set({ currentStepIndex: index }),

  nextStep: (totalSteps) => {
    const next = get().currentStepIndex + 1
    if (next < totalSteps) {
      set({ currentStepIndex: next })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  },

  prevStep: () => {
    const prev = get().currentStepIndex - 1
    if (prev >= 0) {
      set({ currentStepIndex: prev })
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  },

  setSubmissionError: (message) => set({ submissionError: message }),

  reset: () => set({ ...initialState, answers: {} }),
}))
