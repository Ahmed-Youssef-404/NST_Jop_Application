import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface IntroPageProps {
  onContinue: () => void
}

export function IntroPage({ onContinue }: IntroPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2 rounded-full border bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          <Sparkles className="size-4" />
          NST Team Recruitment
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          انضم إلى فريق NST
        </h1>
        <p className="max-w-md text-muted-foreground">
          مجتمع طلابي متنامي يركز على حل المشكلات، التعلم، التعاون، وخلق فرص
          حقيقية لنمو الطلاب.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 text-right">
          <p className="text-foreground">
            نبحث حاليًا عن طلاب لديهم الحافز للانضمام إلى فريق NST والمساهمة
            في بناء وتطوير المجتمع.
          </p>
          <p className="text-muted-foreground">
            نبحث عن أشخاص مهتمين حقًا بالمساهمة، التعلم، تحمل المسؤولية،
            اكتساب خبرة حقيقية، وأن يكونوا جزءًا من مجتمع متنامٍ.
          </p>
        </CardContent>
      </Card>

      <Card className="border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40">
        <CardContent className="flex items-start gap-3 text-right">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-500" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-amber-900 dark:text-amber-400">
              تنبيه مهم
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              جميع أدوار فريق NST هي أدوار{" "}
              <span className="font-semibold">تطوعية وغير مدفوعة</span>.
              من فضلك تأكد من فهمك للدور الذي تتقدم إليه قبل إرسال هذا
              الطلب.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button size="lg" onClick={onContinue} className="mt-2 self-center">
        عرض الأدوار المتاحة
        <ArrowLeft className="size-4" />
      </Button>
    </motion.div>
  )
}
