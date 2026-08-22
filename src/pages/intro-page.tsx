import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Lightbulb,
  MessageCircle,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface IntroPageProps {
  onContinue: () => void
}

const values = [
  {
    number: "01",
    title: "Ownership",
    description:
      "If you're responsible for something, you own it. Take responsibility and see it through.",
    icon: Target,
  },
  {
    number: "02",
    title: "Initiative",
    description:
      "See a problem or an opportunity? Act on it. Don't wait for someone to tell you what to do.",
    icon: Rocket,
  },
  {
    number: "03",
    title: "Accountability",
    description:
      "Mistakes are part of growth. Hiding them isn't. Be honest, learn, and move forward.",
    icon: Check,
  },
  {
    number: "04",
    title: "Communication",
    description:
      "Report early, ask when needed, and keep things clear. Good communication keeps teams strong.",
    icon: MessageCircle,
  },
  {
    number: "05",
    title: "Commitment",
    description:
      "College and life come first, but commitments still matter. Show up and take them seriously.",
    icon: Compass,
  },
  {
    number: "06",
    title: "Continuous Improvement",
    description:
      "No system is perfect. Learn from every experience and make the next one better.",
    icon: TrendingUp,
  },
]

const process = [
  "Understand",
  "Think",
  "Suggest",
  "Execute",
  "Improve",
]

const problems = [
  "Conflicting advice from everywhere",
  "No clear learning direction",
  "Weak foundations",
  "Trying to learn everything at once",
]

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function IntroPage({ onContinue }: IntroPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* =========================================================
          GLOBAL BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[120px]" />

        <div className="absolute right-[-15rem] top-[30%] h-[30rem] w-[30rem] rounded-full bg-primary/[0.035] blur-[110px]" />

        <div className="absolute bottom-[-15rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-primary/[0.025] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
            {/* Hero copy */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
            >
              {/* Eyebrow */}

              {/* <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.4 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.045] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-primary backdrop-blur-sm"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>

                Northern Stars Team
              </motion.div> */}

              {/* Heading */}

              <h1 className="max-w-4xl text-balance text-3xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-4xl md:text-5xl lg:text-[4rem]">
                Build the
                <br />

                <span className="relative inline-block text-primary">
                  right foundation.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: 0.8,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="absolute -bottom-1 left-0 h-px rounded-full bg-primary/40"
                  />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                Where the right foundation meets the right direction.
                <br className="hidden sm:block" />
                A launchpad for beginners who want to start right,
                <br className="hidden sm:block" />
                think better, and build something that matters.
              </p>

              {/* CTA */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="group h-10 rounded-xl px-5 text-sm shadow-xl shadow-primary/10"
                >
                  Become part of NST

                  <ArrowRight className="ml-2 size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                {/* <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3 text-primary" />
                  Built with purpose
                </div> */}
              </div>

              {/* Mini stats */}

              <div className="mt-10 flex items-center gap-6 border-t border-border/60 pt-5">
                <div>
                  <div className="text-xs font-semibold">Foundation</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    Before everything else
                  </div>
                </div>

                <div className="h-6 w-px bg-border/70" />

                <div>
                  <div className="text-xs font-semibold">Direction</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    Know where you're going
                  </div>
                </div>

                <div className="h-6 w-px bg-border/70" />

                <div>
                  <div className="text-xs font-semibold">Growth</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    Become better every day
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero visual */}

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden min-h-[440px] lg:block"
            >
              <div className="absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.055] blur-3xl" />

              {/* Orbit */}

              {/* <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/15"
              /> */}

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 65,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 size-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
              />

              {/* Main card */}

              <div className="absolute left-1/2 top-1/2 flex size-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-background/75 shadow-[0_0_80px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <div className="text-center">
                  <img
                    src="/logo1.png"
                    alt="Northern Stars Team"
                    className="mx-auto h-28 w-auto object-contain"
                  />

                  <div className="mx-auto mt-2 h-px w-8 bg-border" />

                  {/* <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                    Built to become
                  </p>

                  <p className="mt-0.5 text-[11px] font-semibold">
                    Something worth remembering.
                  </p> */}
                </div>
              </div>

              {/* Floating card — Learn */}

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-24 rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="size-3 text-primary" />
                  </div>

                  <div>
                    <div className="text-[9px] text-muted-foreground">
                      Learn
                    </div>

                    <div className="text-[11px] font-semibold">
                      How to think
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — Community */}

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-24 left-10 rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="size-3 text-primary" />
                  </div>

                  <div>
                    <div className="text-[9px] text-muted-foreground">
                      Grow
                    </div>

                    <div className="text-[11px] font-semibold">
                      Together
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating dot */}

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-24 top-18 flex size-8 items-center justify-center rounded-full border border-primary/15 bg-background shadow-xl"
              >
                <Sparkles className="size-3 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / WHO WE ARE
      ========================================================== */}

      <section className="relative border-t border-border/50 backdrop-blur-[4px]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          {/* <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"> */}
          <div className="flex flex-col gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-6">
            <Reveal>
              <div className="sticky top-24">
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                  01 / Who we are
                </div>

                <h2 className="max-w-sm text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  More than a community.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="max-w-3xl text-xl font-medium leading-[1.35] tracking-[-0.025em] sm:text-2xl">
                  NST is a launchpad for beginners in programming.
                </p>

                <p className="mt-6 max-w-2xl text-sm leading-5 text-muted-foreground">
                  We provide clear guidance, structured learning,
                  hands-on practice, continuous follow-up, and a
                  supportive community.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-5 text-muted-foreground">
                  We exist to help students start right, understand
                  their path, and build a strong foundation—without
                  getting lost in the noise of conflicting advice.
                </p>

                <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Clear direction",
                    "Structured learning",
                    "Hands-on practice",
                    "Continuous follow-up",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.06,
                        duration: 0.4,
                      }}
                      className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-muted/[0.18] px-3.5 py-2.5"
                    >
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary/10">
                        <Check className="size-2.5 text-primary" />
                      </span>

                      <span className="text-xs font-medium">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY NST
      ========================================================== */}

      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                02 / Why NST
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                The hardest part isn't
                <span className="text-muted-foreground"> coding.</span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                It's knowing what to learn, when to learn it, and why
                you're learning it in the first place.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="rounded-2xl border border-border/60 bg-muted/[0.12] p-6 sm:p-7 backdrop-blur-2xl">
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10">
                    <Compass className="size-3.5 text-primary" />
                  </div>

                  <div>
                    <div className="text-xs font-semibold">
                      Without direction
                    </div>

                    <div className="text-[11px] text-muted-foreground">
                      The beginner's noise
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {problems.map((problem) => (
                    <div
                      key={problem}
                      className="flex items-start gap-2.5 border-b border-border/50 pb-2.5 last:border-0 last:pb-0"
                    >
                      <span className="mt-3 size-1 shrink-0 rounded-full bg-muted-foreground/50" />

                      <span className="text-xs leading-6 text-muted-foreground">
                        {problem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex h-full flex-col justify-center">
                <div className="text-xs font-semibold text-primary">
                  That's where NST comes in.
                </div>

                <p className="mt-4 text-xl font-medium leading-[1.4] tracking-[-0.025em] sm:text-2xl">
                  We don't shortcut the journey.
                  <br />
                  <span className="text-muted-foreground">
                    We help you walk it with confidence.
                  </span>
                </p>

                <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
                  We guide you, keep you on track, and make sure you
                  don't waste time building weak foundations or learning
                  things you don't need yet.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 bg-primary/[0.025]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-8 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
              03 / Our mission
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-6xl">
              <p className="text-3xl font-bold leading-[1.1] tracking-[-0.045em] sm:text-4xl lg:text-4xl">
                We help students build a solid foundation,
                <span className="text-muted-foreground">
                  {" "}
                  develop their thinking,
                </span>{" "}
                and start their programming journey the right way.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  Our philosophy
                </div>

                <h3 className="mt-2 text-xl font-bold tracking-[-0.035em] sm:text-2xl">
                  Problem Solving
                  <br />
                  <span className="text-primary">
                    is a means, not the destination.
                  </span>
                </h3>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  "How to analyze",
                  "How to think",
                  "How to experiment",
                  "How to handle challenges",
                  "How to learn independently",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.4,
                    }}
                    className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/60 px-3.5 py-3 backdrop-blur-sm"
                  >
                    <span className="text-[9px] font-mono text-primary/60">
                      0{index + 1}
                    </span>

                    <span className="text-xs font-medium transition-colors group-hover:text-primary">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 border-t border-border/50 pt-6">
              <p className="text-xs leading-6 text-muted-foreground">
                The goal isn't to memorize problems.
                <span className="font-medium text-foreground">
                  {" "}
                  It's to be ready for any new problem you face.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          WHAT MAKES NST DIFFERENT
      ========================================================== */}

      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                  04 / What makes us different
                </div>

                <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  Growth over
                  <br />
                  completion.
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/50 sm:grid-cols-2">
                {[
                  {
                    title: "Continuous Follow-up",
                    text: "We track your progress, not just your attendance.",
                  },
                  {
                    title: "Personalized Attention",
                    text: "Guidance tailored to what you actually need.",
                  },
                  {
                    title: "Strong Foundation",
                    text: "We prioritize the essentials without overwhelming you.",
                  },
                  {
                    title: "Genuine Effort",
                    text: "Our goal is your real growth, not just finishing content.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.4,
                    }}
                    className="group bg-[#00010a] p-5 transition-colors duration-300 hover:bg-muted/[0.25] sm:p-6 backdrop-blur-2xl"
                  >
                    <div className="mb-6 text-[9px] font-mono text-primary/60">
                      0{index + 1}
                    </div>

                    <h3 className="text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {item.text}
                    </p>

                    <ArrowUpRight className="mt-4 size-3.5 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          CORE VALUES
      ========================================================== */}

      <section className="relative border-t border-border/50 backdrop-blur-[4px]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                  05 / Core values
                </div>

                <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  How we show up.
                </h2>
              </div>

              <p className="max-w-sm text-xs leading-5 text-muted-foreground">
                These aren't words on a wall. They're the standard we
                expect from ourselves and from each other.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/50 md:grid-cols-2 lg:grid-cols-3 ">
            {values.map((value, index) => {
              const Icon = value.icon

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                  }}
                  className="group relative bg-[#00010a] p-6 transition-colors duration-500 hover:bg-muted/[0.2] sm:p-7 "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono tracking-widest text-primary/60">
                      {value.number}
                    </span>

                    <Icon className="size-3.5 text-muted-foreground/40 transition-colors duration-300 group-hover:text-primary" />
                  </div>

                  <h3 className="mt-2 text-base font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {value.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW WE WORK
      ========================================================== */}

      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-10">
              <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                06 / How we work
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Don't wait to be told.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                We don't operate with a "tell me what to do" mindset.
                We think first, then move.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Connecting line */}

            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

            <div className="grid gap-3 lg:grid-cols-5 content-center">
              {process.map((step, index) => (
                <Reveal key={step} delay={index * 0.06}>
                  <div className="group relative">
                    <div className="relative z-10 mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-background text-[11px] font-semibold shadow-sm transition-all duration-500 group-hover:border-primary/40 group-hover:text-primary group-hover:shadow-lg group-hover:shadow-primary/10">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3 className="text-base font-semibold">
                      {step}
                    </h3>

                    <p className="mt-1.5 text-[13px] leading-4 text-muted-foreground">
                      {index === 0 &&
                        "Understand the goal before jumping into action."}

                      {index === 1 &&
                        "Think through the problem and possible paths."}

                      {index === 2 &&
                        "Suggest a clear and reasonable direction."}

                      {index === 3 &&
                        "Turn the plan into real action."}

                      {index === 4 &&
                        "Review what happened and make it better."}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STUDENT VOICE
      ========================================================== */}

      <section className="relative border-t border-border/50 backdrop-blur-[4px]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <Reveal>
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
                  07 / The experience
                </div>

                <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
                  What we want you to say when it's over.
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-2.5">
              {[
                "NST taught me how to think.",
                "It put me on the right path from day one.",
                "I left with a strong foundation.",
                "I made real progress in a short time.",
              ].map((quote, index) => (
                <Reveal key={quote} delay={index * 0.07}>
                  <div className="group flex items-center gap-4 border-b border-border/60 py-4">
                    <span className="text-[9px] font-mono text-primary/50">
                      0{index + 1}
                    </span>

                    <p className="text-base font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                      “{quote}”
                    </p>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <p className="mt-5 max-w-xl text-xs leading-6 text-muted-foreground">
                  If you walk away stronger, clearer, and more capable—
                  we've succeeded.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISION
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 bg-primary/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">
              08 / Our vision
            </div>

            <div className="max-w-5xl">
              <h2 className="text-2xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-3xl lg:text-5xl">
                We don't want NST to be
                <span className="text-muted-foreground">
                  {" "}
                  just another team.
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-5 text-muted-foreground">
                We want it to be a recognized name—one that students
                look forward to each year, and that applications value.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Expand to other faculties and universities",
              "Offer different levels and programs",
              "Build a strong, impactful community",
              "Create real value in the market",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-border/60 bg-[#00010a] p-5 backdrop-blur-sm">
                  <div className="text-[9px] font-mono text-primary/60">
                    0{index + 1}
                  </div>

                  <p className="mt-2 text-xs font-medium leading-5">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 border-t border-border/50 pt-6">
              <p className="text-base font-medium tracking-[-0.02em] sm:text-lg">
                We're not here to prove we're good.
                <span className="text-muted-foreground">
                  {" "}
                  We're here to become a name that speaks for itself.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          THE NST STANDARD
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-border/50 backdrop-blur-[4px]">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-10 lg:py-18">
          <Reveal>
            <div className="mx-auto max-w-xl">
              <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-primary">
                09 / The NST standard
              </div>

              <h2 className="text-2xl font-bold leading-[0.95] tracking-[-0.055em] sm:text-3xl lg:text-5xl">
                Don't just build
                <br />
                <span className="text-primary">a team.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Build something students trust.
                <br />
                Something members are proud to have been part of.
                <br />
                Something that adds real value to a CV and life experience.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span>Trust</span>
              <span className="size-0.5 rounded-full bg-primary/50" />
              <span>Experience</span>
              <span className="size-0.5 rounded-full bg-primary/50" />
              <span>Growth</span>
              <span className="size-0.5 rounded-full bg-primary/50" />
              <span>Impact</span>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-12 text-lg font-semibold tracking-[-0.025em] sm:text-xl">
              We're building more than a training program.
              <br />
              <span className="text-primary">
                We're building a name worth remembering.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.035] px-6 py-12 text-center sm:px-10 sm:py-16">
              {/* CTA glow */}

              <div className="pointer-events-none absolute left-1/2 top-0 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex size-8 items-center justify-center rounded-xl border border-primary/15 bg-background/70 shadow-lg">
                  <Sparkles className="size-3.5 text-primary" />
                </div>

                <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-[-0.045em] sm:text-4xl">
                  Your journey starts with
                  <span className="text-primary"> the right direction.</span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm">
                  Whether you're a beginner looking for the right path or
                  someone who wants to be part of something meaningful—
                  NST is where you belong.
                </p>

                <Button
                  size="lg"
                  onClick={onContinue}
                  className="group mt-7 h-11 rounded-xl px-6 text-sm shadow-xl shadow-primary/10"
                >
                  Start your journey

                  <ArrowRight className="ml-2 size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <p className="mt-5 text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
                  Let's build something great. Together.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-2">
            <img
              src="/logo1.png"
              alt="NST"
              className="h-5 w-auto opacity-80"
            />

            <span className="text-[11px] font-medium">
              Northern Stars Team
            </span>
          </div>

          <p className="text-[9px] text-muted-foreground">
            © Northern Stars Team
          </p>
        </div>
      </footer>
    </div>
  )
}