import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          اختر الدور الذي تتقدم إليه
        </h1>
        <p className="max-w-md text-muted-foreground">
          اقرأ وصف كل دور جيدًا قبل الاختيار — الأسئلة التالية ستختلف حسب
          الدور الذي تحدده.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id
          return (
            <Card
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "border-primary ring-2 ring-primary/20"
              )}
            >
              <CardContent className="flex flex-col gap-3 text-right">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{role.emoji}</span>
                    <h2 className="text-lg font-semibold">{role.title}</h2>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="size-6 shrink-0 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {role.fullDescription}
                </p>
                <ul className="flex flex-col gap-1.5 border-t pt-3">
                  {role.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="ghost" onClick={onBack}>
          <ArrowRight className="size-4" />
          رجوع
        </Button>
        <Button size="lg" disabled={!selectedRole} onClick={onContinue}>
          متابعة تقديم الطلب
          <ArrowLeft className="size-4" />
        </Button>
      </div>
    </motion.div>
  )
}
