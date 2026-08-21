import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
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
  /** True once the persisted state has been read from localStorage. */
  hasHydrated: boolean

  setPhase: (phase: FormPhase) => void
  setRole: (role: RoleId | undefined) => void // Allow undefined
  toggleRole: (role: RoleId) => void // New toggle function
  setAnswer: (questionId: string, value: AnswerValue) => void
  goToStep: (index: number) => void
  setSubmissionError: (message: string | undefined) => void
  reset: () => void
  /** Clears persisted data from localStorage (called after a successful submit) */
  clearPersisted: () => void
}

const initialState = {
  phase: "intro" as FormPhase,
  selectedRole: undefined,
  currentStepIndex: 0,
  answers: {} as AnswersMap,
  submissionError: undefined as string | undefined,
  hasHydrated: false,
}

const STORAGE_KEY = "nst-application-storage"

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
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

      setSubmissionError: (message) => set({ submissionError: message }),

      reset: () => set({ ...initialState, answers: {} }),

      // Wipes saved answers from localStorage after a successful submission,
      // but keeps the current in-memory phase (e.g. "submitted") intact so
      // the confirmation screen stays visible instead of bouncing to intro.
      clearPersisted: () => {
        set({
          selectedRole: undefined,
          currentStepIndex: 0,
          answers: {},
        })
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {
          // ignore storage errors (e.g. private browsing)
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Persist everything except transient submission state.
      partialize: (state: FormState) => ({
        phase: state.phase,
        selectedRole: state.selectedRole,
        currentStepIndex: state.currentStepIndex,
        answers: state.answers,
      }),
      // Never restore into "submitting" — if the tab was closed mid-submit,
      // resume on the form instead of a stuck spinner.
      onRehydrateStorage: () => (state?: FormState) => {
        if (state) {
          if (state.phase === "submitting") {
            state.phase = "form"
          }
          state.hasHydrated = true
        }
      },
    }
  )
)