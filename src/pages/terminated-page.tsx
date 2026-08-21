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
          Thank You for Your Time
        </h1>
        <p className="text-muted-foreground">
          We understand that unpaid volunteer roles may not fit your current situation.
          We appreciate your interest in NST and wish you all the best.
        </p>
      </div>
      <Card className="w-full">
        <CardContent className="text-sm text-muted-foreground">
          If your circumstances change in the future, we'd be happy to receive your application again.
        </CardContent>
      </Card>
    </motion.div>
  )
}