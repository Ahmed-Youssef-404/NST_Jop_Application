import { motion } from "framer-motion"
import { PartyPopper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SubmittedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="flex size-16 items-center justify-center rounded-full bg-primary"
      >
        <PartyPopper className="size-8 text-primary-foreground" />
      </motion.div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Thank you for applying to join the NST team
        </h1>
        <p className="text-muted-foreground">
          Your application will be carefully reviewed based on your responses,
          motivation, fit for the role, and overall potential.
        </p>
      </div>
      <Card className="w-full">
        <CardContent className="text-sm text-muted-foreground">
          Shortlisted candidates will be contacted for the next stage of the
          selection process. Good luck, and thank you for your interest in
          building NST with us.
        </CardContent>
      </Card>
    </motion.div>
  )
}