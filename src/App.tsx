import { AnimatePresence } from "framer-motion"
import { IntroPage } from "@/pages/intro-page"
import { RolesOverviewPage } from "@/pages/roles-overview-page"
import { ApplicationFormPage } from "@/pages/application-form-page"
import { TerminatedPage } from "@/pages/terminated-page"
import { SubmittedPage } from "@/pages/submitted-page"
import { useFormStore } from "@/store/form-store"
import StarsBackground from "@/components/StarsBackground"

function App() {
  const { phase, setPhase, selectedRole, toggleRole } = useFormStore() // Use toggleRole

  return (
    <div className="min-h-screen bg-background" dir="ltr">
      <AnimatePresence mode="wait">
        <StarsBackground/>
        {phase === "intro" && (
          <IntroPage
            key="intro"
            onContinue={() => setPhase("roles-overview")}
          />
        )}

        {phase === "roles-overview" && (
          <RolesOverviewPage
            key="roles-overview"
            selectedRole={selectedRole}
            onSelectRole={toggleRole} // Use toggleRole instead of setRole
            onBack={() => setPhase("intro")}
            onContinue={() => setPhase("form")}
          />
        )}

        {(phase === "form" || phase === "submitting") && (
          <ApplicationFormPage key="form" />
        )}

        {phase === "terminated" && <TerminatedPage key="terminated" />}

        {phase === "submitted" && <SubmittedPage key="submitted" />}
      </AnimatePresence>
    </div>
  )
}

export default App