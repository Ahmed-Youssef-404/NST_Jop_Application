import { Progress } from "@/components/ui/progress"

interface FormProgressProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function FormProgress({
  currentStep,
  totalSteps,
  stepTitle,
}: FormProgressProps) {
  const percent = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="font-medium text-foreground">{stepTitle}</span>
      </div>
      <Progress value={percent} />
    </div>
  )
}