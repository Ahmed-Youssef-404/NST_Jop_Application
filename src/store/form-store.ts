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
  setRole: (role: RoleId | undefined) => void // Allow undefined
  toggleRole: (role: RoleId) => void // New toggle function
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

  setRole: (role) => {
    // If role is undefined, just update selectedRole and remove from answers
    if (role === undefined) {
      const { role_selected, ...restAnswers } = get().answers
      return set({
        selectedRole: undefined,
        answers: restAnswers,
      })
    }
    
    // Otherwise set the role and update answers
    return set({
      selectedRole: role,
      answers: { ...get().answers, role_selected: role },
    })
  },

  // New toggle function
  toggleRole: (role) => {
    const current = get().selectedRole
    if (current === role) {
      // Deselect: remove role from answers
      const { role_selected, ...restAnswers } = get().answers
      set({
        selectedRole: undefined,
        answers: restAnswers,
      })
    } else {
      // Select: update role and answers
      set({
        selectedRole: role,
        answers: { ...get().answers, role_selected: role },
      })
    }
  },

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