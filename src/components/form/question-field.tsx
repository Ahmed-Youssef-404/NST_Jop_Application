import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import type { AnswerValue, Question } from "@/types/form"

interface QuestionFieldProps {
  question: Question
  value: AnswerValue
  onChange: (value: AnswerValue) => void
  error?: string
}

export function QuestionField({
  question,
  value,
  onChange,
  error,
}: QuestionFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label htmlFor={question.id} className="text-base font-semibold text-foreground">
          <span className="text-muted-foreground ml-1">{question.number}.</span>{" "}
          {question.title}
          {question.required && <span className="text-destructive">*</span>}
        </Label>
        {question.description && (
          <p className="text-sm text-muted-foreground">{question.description}</p>
        )}
      </div>

      <QuestionInput question={question} value={value} onChange={onChange} error={error} />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

function QuestionInput({
  question,
  value,
  onChange,
  error,
}: QuestionFieldProps) {
  switch (question.type) {
    case "short-text":
      return (
        <Input
          id={question.id}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          aria-invalid={!!error}
          className="bg-input border-secondary/30 backdrop-blur-2xl px-3 py-2 text-foreground"
        />
      )

    case "paragraph":
      return (
        <Textarea
          id={question.id}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          aria-invalid={!!error}
          className="bg-input border-secondary/30 backdrop-blur-2xl px-3 py-2 text-foreground"
        />
      )

    case "single-choice":
      return (
        <RadioGroup
          value={(value as string) ?? ""}
          onValueChange={onChange}
          className="gap-2"
        >
          {question.options.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`${question.id}-${opt.value}`}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors bg-input hover:bg-primary/60 backdrop-blur-2xl",
                value === opt.value && "border-primary bg-primary-light/30"
              )}
            >
              <RadioGroupItem value={opt.value} id={`${question.id}-${opt.value}`} />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
      )

    case "multi-choice": {
      const selected = (value as string[]) ?? []
      const toggle = (optValue: string) => {
        if (selected.includes(optValue)) {
          onChange(selected.filter((v) => v !== optValue))
        } else {
          onChange([...selected, optValue])
        }
      }
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`${question.id}-${opt.value}`}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-primary/60 backdrop-blur-2xl",
                selected.includes(opt.value) && "border-primary bg-primary-light/30"
              )}
            >
              <Checkbox
                id={`${question.id}-${opt.value}`}
                checked={selected.includes(opt.value)}
                onCheckedChange={() => toggle(opt.value)}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      )
    }

    case "scale": {
      const numValue = typeof value === "number" ? value : question.min
      return (
        <div className="flex flex-col gap-3 pt-2">
          <Slider
            id={question.id}
            min={question.min}
            max={question.max}
            step={1}
            value={[numValue]}
            onValueChange={([v]) => onChange(v)}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{question.min} — {question.minLabel}</span>
            <span className="text-base font-semibold text-foreground">{numValue}</span>
            <span>{question.max} — {question.maxLabel}</span>
          </div>
        </div>
      )
    }

    default:
      return null
  }
}
