import { motion } from "framer-motion"
import { HeartHandshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TerminatedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-24 text-center"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-accent">
        <HeartHandshake className="size-8 text-accent-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          شكرًا لوقتك
        </h1>
        <p className="text-muted-foreground">
          نتفهم أن الأدوار التطوعية غير المدفوعة قد لا تناسب ظروفك الحالية.
          نقدّر اهتمامك بـ NST، ونتمنى لك التوفيق.
        </p>
      </div>
      <Card className="w-full">
        <CardContent className="text-sm text-muted-foreground">
          إذا تغيرت ظروفك مستقبلًا، يسعدنا استقبال طلبك مرة أخرى.
        </CardContent>
      </Card>
    </motion.div>
  )
}
