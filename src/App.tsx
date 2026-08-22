import { AnimatePresence } from "framer-motion"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { IntroPage } from "@/pages/intro-page"
import { RolesOverviewPage } from "@/pages/roles-overview-page"
import { ApplicationFormPage } from "@/pages/application-form-page"
import { TerminatedPage } from "@/pages/terminated-page"
import { SubmittedPage } from "@/pages/submitted-page"
import { useFormStore } from "@/store/form-store"
import StarsBackground from "@/components/StarsBackground"
import { TERMINATING_QUESTION_ID } from "@/data/questions"
import ScrolToTop from "@/components/ScrollToTop"

function App() {
  const { phase, setPhase, selectedRole, toggleRole, answers, hasHydrated } =
    useFormStore()
  const navigate = useNavigate()
  const location = useLocation()

  // Guard against deep-linking into a route the current state doesn't
  // support (e.g. opening /form directly with no role chosen, or /submitted
  // without ever having submitted). Sends the user back to the right place
  // instead of showing a broken screen. Wait for localStorage rehydration
  // first so a refresh mid-form doesn't briefly bounce to "/" before the
  // saved role/answers are back in memory.
  useEffect(() => {
    if (!hasHydrated) return

    const path = location.pathname

    // Only bounce back to /roles if we're actually still meant to be on the
    // form (phase === "form"). Once phase has moved on to "submitted" or
    // "terminated", selectedRole may already have been cleared (e.g. right
    // after a successful submit clears persisted data) — that's not a sign
    // of an invalid deep link, just cleanup, so don't redirect on it.
    if (path.startsWith("/form") && phase === "form" && !selectedRole) {
      navigate("/roles", { replace: true })
      return
    }

    if (path === "/terminated" && answers[TERMINATING_QUESTION_ID] !== "No") {
      // Not actually in a terminated state — don't allow direct access.
      navigate("/", { replace: true })
      return
    }

    if (path === "/submitted" && phase !== "submitted") {
      navigate("/", { replace: true })
      return
    }
  }, [location.pathname, selectedRole, phase, answers, navigate, hasHydrated])

  if (!hasHydrated) {
    // Brief, practically-instant gate while zustand reads localStorage,
    // so we never flash the wrong page before a refresh restores state.
    return <div className="min-h-screen bg-background" dir="ltr" />
  }

  return (
    <div className="min-h-screen bg-background" dir="ltr">
      <StarsBackground />
      <AnimatePresence mode="wait">
        <ScrolToTop>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <IntroPage
                  key="intro"
                  onApply={() => {
                    setPhase("roles-overview")
                    navigate("/roles")
                  }}
                />
              }
            />

            <Route
              path="/roles"
              element={
                <RolesOverviewPage
                  key="roles-overview"
                  selectedRole={selectedRole}
                  onSelectRole={toggleRole}
                  onBack={() => {
                    setPhase("intro")
                    navigate("/")
                  }}
                  onContinue={() => {
                    setPhase("form")
                    navigate("/form")
                  }}
                />
              }
            />

            <Route path="/form" element={<ApplicationFormPage key="form" />} />

            <Route path="/terminated" element={<TerminatedPage key="terminated" />} />

            <Route path="/submitted" element={<SubmittedPage key="submitted" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScrolToTop>
      </AnimatePresence>
    </div>
  )
}

export default App