import { motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Circle,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    title: "Application received",
    description: "Your application has been successfully submitted.",
  },
  {
    title: "Application review",
    description:
      "Our team will carefully review your responses and profile.",
  },
  {
    title: "Next stage",
    description:
      "Shortlisted candidates will be contacted directly.",
  },
]

export function SubmittedPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Ambient background */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[20%] top-[-220px] size-[520px] rounded-full bg-primary/10 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-220px] right-[5%] size-[450px] rounded-full bg-primary/5 blur-[120px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,hsl(var(--background))_80%)]" />
      </div> */}

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-12"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* LEFT — Hero content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Icon */}
            

            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-4 flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-sm"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>

              Application Submitted
            </motion.div> */}

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Thank you for applying to{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  join the NST team
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base lg:text-[15px]">
                Your application has been received. Our team will carefully
                review your responses, motivation, fit for the role, and
                overall potential.
              </p>
            </motion.div>

            {/* Small bottom statement */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-7 flex items-center gap-2 text-xs text-muted-foreground/70"
            >
              <Check className="size-3.5 text-primary" />
              <span>Thank you for your interest in building NST with us.</span>
            </motion.div>
          </div>

          {/* RIGHT — Application journey */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            <Card className="group relative overflow-hidden border-border/50 bg-card/50 shadow-2xl shadow-black/10 backdrop-blur-2xl">
              {/* Top shine */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              {/* Side glow */}
              <div className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-primary/10 blur-[90px] transition-all duration-700 group-hover:bg-primary/15" />

              {/* Bottom glow */}
              <div className="pointer-events-none absolute -bottom-32 -left-32 size-64 rounded-full bg-primary/5 blur-[80px]" />

              <CardContent className="relative p-6 sm:p-8">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold tracking-tight">
                      What happens next?
                    </p>

                    <p className="mt-1.5 max-w-xs text-xs leading-5 text-muted-foreground">
                      Here is what you can expect after submitting your
                      application.
                    </p>
                  </div>

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: -5,
                    }}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/10"
                  >
                    <ArrowRight className="size-4 text-primary" />
                  </motion.div>
                </div>

                {/* Timeline */}
                <div className="space-y-7">
                  {steps.map((step, index) => {
                    const isLast = index === steps.length - 1

                    return (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.85 + index * 0.15,
                          duration: 0.5,
                        }}
                        className="relative flex gap-4"
                      >
                        {/* Connector */}
                        {!isLast && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "calc(100% + 12px)" }}
                            transition={{
                              delay: 1.1 + index * 0.15,
                              duration: 0.5,
                            }}
                            className="absolute left-[15px] top-8 w-px bg-gradient-to-b from-primary/30 to-border"
                          />
                        )}

                        {/* Number */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.95 + index * 0.15,
                            type: "spring",
                            stiffness: 300,
                          }}
                          className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10"
                        >
                          {index === 0 ? (
                            <Check className="size-4 text-primary" />
                          ) : (
                            <Circle className="size-2 fill-primary text-primary" />
                          )}
                        </motion.div>

                        {/* Text */}
                        <div className="pt-0.5">
                          <p className="text-sm font-medium">{step.title}</p>

                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Bottom status */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.35, duration: 0.5 }}
                  className="mt-8 flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/[0.04] px-4 py-3"
                >
                  <div className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                    <span className="relative size-2 rounded-full bg-primary" />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Your application is now in our review queue.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}