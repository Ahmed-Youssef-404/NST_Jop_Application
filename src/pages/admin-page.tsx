import { useState, useCallback, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  Mail,
  LogOut,
  RefreshCw,
  ChevronDown,
  Users,
  AlertCircle,
  Loader2,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { adminLogin, fetchApplicants } from "@/lib/admin-api-client"
import type { ApplicantRow } from "@/lib/admin-api-client"
import { groupApplicantsByRole } from "@/lib/admin-group-applicants"
import type { GroupedApplicant } from "@/lib/admin-group-applicants"
import { cn } from "@/lib/utils"

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      setIsSubmitting(true)

      const result = await adminLogin(email, password)

      setIsSubmitting(false)

      if (!result.success || !result.token) {
        setError(result.errorMessage ?? "Login failed.")
        return
      }

      onSuccess(result.token)
    },
    [email, password, onSuccess]
  )

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <Card className="glass-card border-border/60 shadow-2xl shadow-black/20">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <Lock className="size-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Admin Access</h1>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Sign in to view NST Team applicants.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="admin-email" className="field-label">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder="you@nst.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="admin-password" className="field-label">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2"
                  >
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-destructive" />
                    <p className="text-xs text-destructive">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

function AnswerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/40 py-3 last:border-b-0">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-foreground">
        {value?.trim() ? value : <span className="text-muted-foreground/50">—</span>}
      </p>
    </div>
  )
}

function ApplicantCard({
  applicant,
  questions,
}: {
  applicant: GroupedApplicant
  questions: { id: string; title: string; number: number }[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const name = applicant.answers.full_name || "Unnamed applicant"
  const email = applicant.answers.email_address || ""

  return (
    <Card className="glass-card border-border/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {email} {applicant.submittedAt ? `· ${formatDate(applicant.submittedAt)}` : ""}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <CardContent className="border-t border-border/40 px-5 pb-2 pt-2">
              {questions.map((q) => (
                <AnswerRow
                  key={q.id}
                  label={`${q.number}. ${q.title}`}
                  value={applicant.answers[q.id] ?? ""}
                />
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [rows, setRows] = useState<ApplicantRow[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [activeRoleTitle, setActiveRoleTitle] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const result = await fetchApplicants(token)

    setIsLoading(false)

    if (!result.success) {
      if (result.unauthorized) {
        onLogout()
        return
      }
      setError(result.errorMessage ?? "Failed to load applicants.")
      return
    }

    setRows(result.rows ?? [])
  }, [token, onLogout])

  useEffect(() => {
    load()
  }, [load])

  const groups = useMemo(() => groupApplicantsByRole(rows ?? []), [rows])

  useEffect(() => {
    if (!activeRoleTitle && groups.length > 0) {
      setActiveRoleTitle(groups[0].roleTitle)
    }
  }, [groups, activeRoleTitle])

  const activeGroup = groups.find((g) => g.roleTitle === activeRoleTitle) ?? groups[0]

  const filteredApplicants = useMemo(() => {
    if (!activeGroup) return []
    const q = search.trim().toLowerCase()
    if (!q) return activeGroup.applicants
    return activeGroup.applicants.filter((a) => {
      const name = (a.answers.full_name || "").toLowerCase()
      const email = (a.answers.email_address || "").toLowerCase()
      return name.includes(q) || email.includes(q)
    })
  }, [activeGroup, search])

  const totalApplicants = rows?.length ?? 0

  return (
    <main className="relative min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                NST Applicants
              </h1>
              <p className="text-xs text-muted-foreground">
                {totalApplicants} total submission{totalApplicants === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
              <RefreshCw className={cn("size-3.5", isLoading && "animate-spin")} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="size-3.5" />
              Log out
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {isLoading && !rows && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {rows && groups.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-24 text-center">
            <Users className="mb-3 size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No applicants yet.</p>
          </div>
        )}

        {groups.length > 0 && (
          <>
            {/* Role tabs */}
            <div className="mb-5 flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g.roleTitle}
                  type="button"
                  onClick={() => setActiveRoleTitle(g.roleTitle)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                    g.roleTitle === activeGroup?.roleTitle
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {g.roleTitle}
                  <span className="ml-1.5 opacity-60">({g.applicants.length})</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-5 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-9"
              />
            </div>

            {/* Applicant list */}
            {activeGroup && (
              <div className="space-y-3">
                {filteredApplicants.length === 0 ? (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    No applicants match your search.
                  </p>
                ) : (
                  filteredApplicants.map((applicant, idx) => (
                    <ApplicantCard
                      key={`${applicant.answers.email_address}-${idx}`}
                      applicant={applicant}
                      questions={activeGroup.questions}
                    />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export function AdminPage() {
  // Deliberately kept in React state only — never persisted to
  // localStorage/sessionStorage/cookies, so a refresh always requires
  // logging in again.
  const [token, setToken] = useState<string | null>(null)

  if (!token) {
    return <LoginForm onSuccess={setToken} />
  }

  return <Dashboard token={token} onLogout={() => setToken(null)} />
}
