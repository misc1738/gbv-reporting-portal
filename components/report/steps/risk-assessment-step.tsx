/**
 * Risk Assessment Step component.
 * Evaluates the user's safety based on a series of questions.
 */
"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Shield } from "lucide-react"
import type { ReportFormData } from "@/lib/types"

interface RiskAssessmentStepProps {
  data: ReportFormData
  updateData: (data: Partial<ReportFormData>) => void
  onNext: () => void
  onBack: () => void
}

const RISK_QUESTIONS = [
  {
    key: "immediateDanger" as const,
    label: "Are you in immediate danger right now?",
    description: "The person who harmed you is nearby or threatening you",
    critical: true,
  },
  {
    key: "hasWeapons" as const,
    label: "Does the person have access to weapons?",
    description: "Guns, knives, or other weapons",
    critical: true,
  },
  {
    key: "threatsMade" as const,
    label: "Have they made threats to harm or kill you?",
    description: "Direct threats against your life or safety",
    critical: true,
  },
  {
    key: "previousViolence" as const,
    label: "Has the violence happened before?",
    description: "This is not the first incident",
    critical: false,
  },
  {
    key: "substanceAbuse" as const,
    label: "Does the person abuse alcohol or drugs?",
    description: "Regular substance use that affects their behavior",
    critical: false,
  },
  {
    key: "isolation" as const,
    label: "Are you isolated from friends and family?",
    description: "They prevent you from seeing others or control your movements",
    critical: false,
  },
  {
    key: "financialControl" as const,
    label: "Do they control your finances?",
    description: "They control money, prevent you from working, or limit access to resources",
    critical: false,
  },
]

/**
 * Risk Assessment Step component.
 */
export function RiskAssessmentStep({ data, updateData, onNext, onBack }: RiskAssessmentStepProps) {
  const criticalRisks = RISK_QUESTIONS.filter((q) => q.critical && data[q.key]).length
  const totalRisks = RISK_QUESTIONS.filter((q) => data[q.key]).length
  const showCriticalAlert = criticalRisks > 0

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Safety Assessment</h3>
          <p className="text-sm text-muted-foreground">
            These questions help us understand your situation and provide appropriate support. All answers are
            confidential.
          </p>
        </div>

        {showCriticalAlert && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>High Risk Detected</AlertTitle>
            <AlertDescription>
              Based on your answers, you may be at high risk. We strongly recommend contacting a support provider immediately.
              Don&apos;t worry, this assessment is anonymous and won&apos;t be shared unless you choose to.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {RISK_QUESTIONS.map((question) => (
            <div
              key={question.key}
              className={`flex items-start space-x-3 p-4 rounded-lg border ${question.critical && data[question.key]
                ? "border-destructive bg-destructive/5"
                : "border-border hover:border-primary/50"
                } transition-colors`}
            >
              <Checkbox
                id={question.key}
                checked={data[question.key]}
                onCheckedChange={(checked) => updateData({ [question.key]: checked as boolean })}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor={question.key} className="font-medium cursor-pointer flex items-center gap-2">
                  {question.label}
                  {question.critical && <AlertTriangle className="h-4 w-4 text-destructive" />}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{question.description}</p>
              </div>
            </div>
          ))}
        </div>

        {totalRisks > 0 && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Risk Level: {criticalRisks > 0 ? "High" : totalRisks >= 3 ? "Medium" : "Low"}</AlertTitle>
            <AlertDescription>
              You&apos;ve indicated {totalRisks} risk factor{totalRisks !== 1 ? "s" : ""}. We&apos;ll help you create a safety
              plan and connect you with appropriate resources.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Continue to Evidence Upload
        </Button>
      </div>
    </div>
  )
}
