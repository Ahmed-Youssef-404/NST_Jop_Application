import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { roles } from "@/data/roles"
import { cn } from "@/lib/utils"
import type { RoleId } from "@/types/form"

interface RolesOverviewPageProps {
  selectedRole: RoleId | undefined
  onSelectRole: (role: RoleId) => void
  onBack: () => void
  onContinue: () => void
}

export function RolesOverviewPage({
  selectedRole,
  onSelectRole,
  onBack,
  onContinue,
}: RolesOverviewPageProps) {
  // Handle toggle functionality
  const handleRoleClick = (roleId: RoleId) => {
    // If the clicked role is already selected, deselect it (pass undefined or a sentinel value)
    if (selectedRole === roleId) {
      // You'll need to handle deselection in the parent component
      // Option 1: Pass a special value to deselect
      onSelectRole(roleId) // This will need parent logic to toggle
      // Option 2: Have a separate deselect handler
      // onDeselectRole()
    } else {
      onSelectRole(roleId)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18rem] size-[40rem] -translate-x-1/2 rounded-full bg-primary/[0.055] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary"
          >
            Step 01 / Choose your path
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl"
          >
            Find where you can
            <span className="text-primary"> make an impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base"
          >
            Explore the roles below and choose the one that best matches
            your strengths, interests, and the kind of impact you want to
            make at NST.
          </motion.p>
        </div>

        {/* Roles */}
        <div className="border-t">
          {roles.map((role, index) => {
            const isSelected = selectedRole === role.id
            const Icon = role.icon

            return (
              <motion.button
                key={role.id}
                type="button"
                onClick={() => handleRoleClick(role.id)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                }}
                className={cn(
                  "group relative flex w-full flex-col border-b text-left outline-none transition-colors cursor-pointer backdrop-blur-md",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                  isSelected
                    ? "bg-primary/[0.035]"
                    : "hover:bg-muted/30"
                )}
              >
                <div className="flex items-center gap-3 px-3 py-4 sm:px-4 sm:py-5">
                  {/* Number */}
                  <span
                    className={cn(
                      "w-6 shrink-0 font-mono text-[10px] transition-colors",
                      isSelected
                        ? "text-primary"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isSelected
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground"
                    )}
                  >
                    <Icon className="size-3.5" strokeWidth={1.7} />
                  </div>

                  {/* Main content */}
                  <div className="min-w-0 flex-1">
                    <h2
                      className={cn(
                        "text-sm font-semibold tracking-tight transition-colors sm:text-base",
                        isSelected && "text-primary"
                      )}
                    >
                      {role.title}
                    </h2>

                    <p className="mt-0.5 max-w-2xl text-xs leading-5 text-muted-foreground">
                      {role.shortDescription}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    {isSelected ? (
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-3" />
                      </span>
                    ) : (
                      <ChevronRight className="size-4 text-muted-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isSelected ? "auto" : 0,
                    opacity: isSelected ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 px-3 pb-6 pl-[3.75rem] sm:grid-cols-[1fr_auto] sm:px-4 sm:pl-[5.75rem]">
                    <div>
                      <p className="max-w-2xl text-xs leading-6 text-foreground/80">
                        {role.fullDescription}
                      </p>

                      <div className="mt-4">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          What you'll work on
                        </p>

                        <ul className="grid gap-1.5 sm:grid-cols-2">
                          {role.responsibilities.map((responsibility) => (
                            <li
                              key={responsibility}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-end">
                      <span className="text-[10px] font-medium text-primary">
                        Selected
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="group w-fit gap-1.5 text-sm"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:block">
              {selectedRole
                ? "Role selected"
                : "Select a role to continue"}
            </span>

            <Button
              size="default"
              disabled={!selectedRole}
              onClick={onContinue}
              className="group rounded-full px-4 text-sm"
            >
              Continue

              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.main>
  )
}