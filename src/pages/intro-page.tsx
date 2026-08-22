import { motion } from "framer-motion"
import { Sparkles, TriangleAlert, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IntroPageProps {
  onContinue: () => void
}

export function IntroPage({ onContinue }: IntroPageProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-[-10rem] top-1/3 h-[20rem] w-[20rem] rounded-full bg-primary/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center px-4 py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-sm"
            >
              <Sparkles className="size-3.5" />
              NST Team Recruitment
            </motion.div> */}

            {/* Heading */}
            <div className="max-w-2xl pt-12">
              <h1 className="text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Build something
                <br />

                <span className="relative inline-block text-primary">
                  that matters.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: 0.8,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-0.5 left-0 h-[2px] rounded-full bg-primary/30"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Join NST and become part of a growing student community
                focused on problem-solving, collaboration, learning, and
                creating real opportunities for growth.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={onContinue}
                className="group h-10 gap-2 rounded-lg px-5 text-sm shadow-lg shadow-primary/10"
              >
                Apply Now

                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {/* <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowDown className="size-3.5" />
                Find where you fit
              </div> */}
            </div>

            {/* Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="bg-[#140600] rounded-xl mt-8 flex justify-center max-w-lg items-start gap-2.5 border-t px-4 py-2"
            >
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-amber-500" />

              <p className="text-[11px] leading-5 text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Before you continue:
                </span>{" "}
                NST team roles are{" "}
                <span className="font-semibold text-foreground">
                  voluntary and unpaid
                </span>
                . Please make sure you understand the role you are applying
                for before submitting your application.
              </p>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative hidden lg:flex"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[340px]">
              {/* Outer glow */}
              <div className="absolute inset-6 rounded-full bg-primary/10 blur-3xl" />

              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-4 rounded-full border border-dashed border-primary/20"
              />

              {/* Main circle */}
              <div className="absolute inset-11 flex items-center justify-center rounded-full border border-primary/10 bg-background/70 shadow-2xl shadow-primary/10">
                <div className="text-center">
                  <div className="mb-2 text-6xl font-black tracking-[-0.08em] text-primary">
                    {/* NST */}
                    <img src="/logo1.png" className="h-40" alt="NST" />
                  </div>

                  <div className="mx-auto h-px w-10 bg-border" />

                  {/* <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    Student Community
                  </p> */}
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-1 top-16 rounded-xl border bg-background/80 px-3 py-2 text-xs shadow-xl backdrop-blur-md"
              >
                <div className="text-[10px] text-muted-foreground">
                  Learn
                </div>
                <div className="text-sm font-semibold">Together</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-10 left-0 rounded-xl border bg-background/80 px-3 py-2 text-xs shadow-xl backdrop-blur-md"
              >
                <div className="text-[10px] text-muted-foreground">
                  Build
                </div>
                <div className="text-sm font-semibold">Something Real</div>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-12 top-6 flex size-8 items-center justify-center rounded-full border bg-background shadow-lg"
              >
                <Sparkles className="size-3 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}