import { motion } from "framer-motion"
import {
  Sparkles,
  TriangleAlert,
  ArrowRight,
  Users,
  Target,
  Rocket,
  Award,
  ChevronDown,
  Briefcase,
  Megaphone,
  GraduationCap,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Heart,
  Zap,
  Eye,
  Lightbulb
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

// Data array containing all role information
const rolesData = [
  {
    id: 'operations',
    icon: Briefcase,
    title: 'Operations & Strategy Partner',
    subtitle: 'Make things actually happen.',
    description: 'The Operations & Strategy Partner is the person who turns ideas and decisions into clear plans and real execution. You\'re the bridge between the Founder\'s vision and the team\'s daily work.',
    badge: 'Core Role',
    sections: [
      {
        title: 'Key Responsibilities',
        items: [
          'Task & Deadline Management',
          'Team Coordination',
          'Daily Operations',
          'Student Success Follow-up',
          'Website & Technical Coordination',
          'Execution Support',
          'Problem Solving'
        ]
      },
      {
        title: 'We Need Someone Who',
        items: [
          'Is responsible, reliable, and organized',
          'Takes initiative and doesn\'t wait',
          'Has strong communication skills',
          'Can handle multiple things without losing focus',
          'Deals with problems calmly',
          'Knows when to solve vs. escalate'
        ],
        footer: {
          label: 'The Mindset:',
          text: '"Sees a problem, suggests a solution, and follows it until it happens."'
        }
      }
    ],
    delay: 0
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing & Communications',
    subtitle: 'Build how people see NST.',
    description: 'The Marketing & Communications team is responsible for everything related to NST\'s image and how it reaches students and the community. This isn\'t just about being active on social media — it\'s about building a brand people recognize and trust.',
    badge: 'Core Role',
    sections: [
      {
        title: 'Team Structure',
        items: [
          'Marketing & Communications Lead',
          'Content & Marketing Strategy',
          'Visual & Social Media',
          'Outreach, PR & Events'
        ]
      },
      {
        title: 'Key Responsibilities',
        items: [
          'Define Marketing Direction',
          'Turn NST goals into marketing strategy',
          'Design graphics and manage social accounts',
          'Plan outreach and partnership opportunities',
          'Organize events and coordinate participants'
        ],
        footer: {
          label: 'The Standard:',
          text: '"Marketing doesn\'t just promote NST. Marketing builds how people see NST."'
        }
      }
    ],
    delay: 0.1
  },
  {
    id: 'mentorship',
    icon: GraduationCap,
    title: 'Mentorship & Assessment',
    subtitle: 'Understand, support, and help students grow.',
    description: 'The Mentorship & Assessment team is responsible for monitoring students throughout their NST journey. You\'re the closest person to the students — you see their progress, identify problems, and help the team know how to help them.',
    badge: 'Core Role',
    sections: [
      {
        title: 'Key Responsibilities',
        items: [
          'Daily Student Monitoring',
          'Problem Identification',
          'Basic Support & Guidance',
          'Reporting to Operations',
          'Applicant Interviews',
          'Progress Evaluation'
        ]
      },
      {
        title: 'We Need Someone Who',
        items: [
          'Notices what others miss',
          'Can distinguish between types of student struggles',
          'Communicates clearly and reports specifically',
          'Is patient, approachable, and supportive',
          'Knows when to escalate vs. help'
        ],
        footer: {
          label: 'The Standard:',
          text: '"A good mentor isn\'t the one who knows the most. A good mentor notices what others miss."'
        }
      }
    ],
    delay: 0.2
  }
];

interface LandingPageProps {
  onApply: () => void
}

export function IntroPage({ onApply }: LandingPageProps) {
  const rolesRef = useRef<HTMLDivElement>(null)

  const scrollToRoles = () => {
    rolesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative overflow-x-hidden ">
      {/* Background Elements */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20rem] h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-[25rem] w-[25rem] rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, currentColor 0.5px, transparent 0.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen">
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
                <h1 className="text-balance text-4xl font-bold tracking-[0.01em] sm:text-5xl lg:text-6xl">
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
                  onClick={onApply}
                  className="group h-10 gap-2 rounded-lg px-5 text-sm shadow-lg shadow-primary/10"
                >
                  Apply Now

                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToRoles}
                  className="h-10 gap-2 rounded-lg px-5 text-xs shadow-lg shadow-primary/10"
                >
                  View Open Roles
                  <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
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
                      <img src="/logo1.png" className="h-32" alt="NST" />
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
      </section>

      {/* About NST Section */}
      <section className="relative py-18 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-sm font-medium uppercase tracking-widest text-primary/70">
                About NST
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-[0.01em] sm:text-5xl">
                What Is NST?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                NST is a student-led community that helps beginners build a strong, correct foundation in programming. We believe the biggest problem beginners face isn't lack of resources — it's lack of direction.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Too many students get lost between conflicting advice and don't know where to start.
              </p>
              <p className="mt-4 text-lg font-medium text-primary">
                We exist to change that.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Guidance", desc: "Clear direction from day one" },
                  { icon: Lightbulb, label: "Learning", desc: "Focused, practical content" },
                  { icon: Zap, label: "Practice", desc: "Problem-solving as a tool" },
                  { icon: Heart, label: "Community", desc: "A space to grow together" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                    className="group rounded-xl border border-primary/10 bg-primary/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-primary/[0.05] backdrop-blur-[2px]"
                  >
                    <item.icon className="size-4 text-primary" />
                    <p className="mt-1.5 text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Our Mission</h3>
                <p className="mt-2 text-muted-foreground">
                  Help students build a strong foundation, develop their thinking, and start their programming journey clearly and correctly. We teach students <span className="text-foreground">how</span> to think, <span className="text-foreground">how</span> to solve problems, <span className="text-foreground">how</span> to experiment, and <span className="text-foreground">how</span> to learn on their own.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Our Vision</h3>
                <p className="mt-2 text-muted-foreground">
                  Become a recognized name that students trust and look forward to each year. Expand to more faculties and universities. Build a community with real impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="relative py-18 lg:py-18 backdrop-blur-[4px] border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-medium uppercase tracking-widest text-primary/70">
              Why Join
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-[0.01em] sm:text-5xl">
              Why Join the Core Team?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              This isn't about filling a position — it's about building something meaningful.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Rocket, title: "Build Real Experience", desc: "Work on something that actually matters" },
              { icon: Users, title: "Develop Leadership", desc: "Lead initiatives, coordinate teams, solve real problems" },
              { icon: Award, title: "Grow Your Network", desc: "Connect with driven people who care about impact" },
              { icon: Eye, title: "Shape the Future", desc: "Help build a community that changes how students learn" },
              { icon: Layers, title: "Create Your Legacy", desc: "Be part of something that lasts beyond your time" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className="group rounded-2xl border border-primary/10 bg-background/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.02] hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 text-center"
          >
            <h3 className="text-lg font-semibold">What We're Looking For</h3>
            <p className="mt-2 text-muted-foreground">
              We don't need people who wait for instructions. We need people who:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {["See problems and suggest solutions", "Take ownership and follow through", "Communicate clearly and early", "Care about impact over titles", "Are willing to learn and improve continuously"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section ref={rolesRef} className="relative py-18 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-medium uppercase tracking-widest text-primary/70">
              Join Us
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-[0.01em] sm:text-5xl">
              Open Roles
            </h2>
          </motion.div>


          <div className="mt-12 space-y-8">
            {rolesData.map((role) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: role.delay, duration: 0.6 }}
                  className="group rounded-2xl border border-primary/10 bg-linear-to-r from-[#070400] to-[#090904] p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 lg:p-10 backdrop-blur-[2px]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-primary" />
                        <h3 className="text-2xl font-bold">{role.title}</h3>
                      </div>
                      <p className="mt-1.5 text-primary/80">{role.subtitle}</p>
                    </div>
                    <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      {role.badge}
                    </span>
                  </div>

                  <p className="mt-4 text-muted-foreground">{role.description}</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {role.sections.map((section, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-primary/30 bg-primary/[0.02] p-5"
                      >
                        <h4 className="text-sm font-semibold">{section.title}</h4>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {section.footer && (
                          <div className="mt-4 rounded-lg border border-primary/10 bg-primary/5 p-3 text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              {section.footer.label}
                            </span>{" "}
                            {section.footer.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>




        </div>
      </section>

      {/* What We're Building Section */}
      <section className="relative py-18 lg:py-18 backdrop-blur-[4px] border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-medium uppercase tracking-widest text-primary/70">
              Our Philosophy
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-[0.01em] sm:text-5xl">
              What We're Actually Building
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "A Name", desc: "Something people recognize and trust" },
              { icon: Sparkles, title: "An Experience", desc: "Something worth having on your CV" },
              { icon: Users, title: "A Community", desc: "Something that has real impact" },
              { icon: Layers, title: "A Legacy", desc: "Something worth remembering" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className="group rounded-2xl border border-primary/10 bg-background/50 p-6 text-center transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.02] hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex justify-center">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <item.icon className="size-6" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 rounded-2xl border border-primary/10 bg-primary/[0.02] p-8 text-center"
          >
            <blockquote className="text-xl font-medium italic text-primary/90">
              "Don't just build a team. Build something worth remembering."
            </blockquote>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {["Ownership", "Initiative", "Accountability", "Communication", "Commitment", "Continuous Improvement"].map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium"
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="relative py-18 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-medium uppercase tracking-widest text-primary/70">
              Are You the Right Fit?
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-[0.01em] sm:text-5xl">
              Who Should Apply
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, label: "Proactive", desc: "Not reactive" },
              { icon: Target, label: "Ownership", desc: "Take it and follow through" },
              { icon: Users, label: "Team Player", desc: "Work well with others" },
              { icon: Lightbulb, label: "Critical Thinker", desc: "Solve problems effectively" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                className="flex items-center gap-4 rounded-xl border border-primary/10 bg-background/50 p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 rounded-2xl border border-amber-500/10 bg-red-900/30 p-6 text-center backdrop-blur-2xl"
          >
            <TriangleAlert className="mx-auto mb-2 size-5 text-amber-500" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">All roles are volunteer-based and unpaid.</span>{" "}
              We're at an early stage and building something meaningful together. You'll gain real experience, leadership skills, and the satisfaction of building something that matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Apply / CTA */}
      <section className="relative py-6 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-primary/60 bg-gradient-to-br from-primary/[0.05] via-primary/[0.09] to-primary/[0.09] p-12 text-center lg:p-16 backdrop-blur-xl"
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold tracking-[0.01em] sm:text-4xl">
                Ready to Join?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Submit your application, and if shortlisted, you'll have an interview with the team.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  onClick={onApply}
                  className="group h-12 gap-2 rounded-xl px-8 text-sm font-medium shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30"
                >
                  Apply Now
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                {/* <p className="text-xs text-muted-foreground">
                  Application Deadline: <span className="font-medium text-foreground">To be determined</span>
                </p> */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left flex gap-4">
              <img src="/logo1 - Copy.png" className="h-8" alt="NST" />
              <div className="">
                <p className="text-sm font-semibold">Northern Stars Team — NST</p>
                <p className="text-xs text-muted-foreground">Build. Grow. Impact.</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">

              {/* WhatsApp Icon */}
              <button
                onClick={() => window.open('https://wa.me/+201159169762', '_blank')}
                className="cursor-pointer hover:scale-110 transition-scale duration-300 flex items-center gap-1"
              >
                <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="w-6 h-6" />
                {/* WhatsApp */}
              </button>

              {/* Email Icon */}
              <button
                onClick={() => window.location.href = 'mailto:we.northernstar@gmail.com'}
                className="cursor-pointer hover:scale-110 transition-scale duration-300 flex items-center gap-1"
              >
                <img src="/email-svgrepo-com.svg" alt="Email" className="w-5 h-5" />
                {/* Email */}
              </button>
            </div>
            <p className="text-xs text-muted-foreground/60">
              © 2026 Northern Stars Team. <br /> All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}