"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IncidentDetailsStep } from "./steps/incident-details-step"
import { RiskAssessmentStep } from "./steps/risk-assessment-step"
import { EvidenceUploadStep } from "./steps/evidence-upload-step"
import { SafetyPlanStep } from "./steps/safety-plan-step"
import { ReviewSubmitStep } from "./steps/review-submit-step"
import type { ViolenceType } from "@/lib/types"

export interface ReportFormData {
  // Incident details
  violenceType: ViolenceType | ""
  incidentDate?: string
  incidentLocation?: string
  description: string
  isAnonymous: boolean

  // Risk assessment
  immediateDanger: boolean
  hasWeapons: boolean
  threatsMade: boolean
  previousViolence: boolean
  substanceAbuse: boolean
  isolation: boolean
  financialControl: boolean

  // Evidence
  evidenceFiles: File[]

  // Safety plan
  emergencyContacts: Array<{ name: string; phone: string; relationship: string }>
  safeLocations: Array<{ name: string; address: string; notes?: string }>
  escapePlan?: string
  importantDocuments: string[]
}

const STEPS = [
  { id: 1, name: "Incident Details", description: "Tell us what happened" },
  { id: 2, name: "Risk Assessment", description: "Evaluate your safety" },
  { id: 3, name: "Evidence", description: "Upload supporting files" },
  { id: 4, name: "Safety Plan", description: "Create your safety plan" },
  { id: 5, name: "Review", description: "Review and submit" },
]

export function ReportForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ReportFormData>({
    violenceType: "",
    description: "",
    isAnonymous: true,
    immediateDanger: false,
    hasWeapons: false,
    threatsMade: false,
    previousViolence: false,
    substanceAbuse: false,
    isolation: false,
    financialControl: false,
    evidenceFiles: [],
    emergencyContacts: [],
    safeLocations: [],
    importantDocuments: [],
  })

  const updateFormData = (data: Partial<ReportFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}
            </CardTitle>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
      </Card>

      {/* Step content */}
      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && <IncidentDetailsStep data={formData} updateData={updateFormData} onNext={nextStep} />}
          {currentStep === 2 && (
            <RiskAssessmentStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 3 && (
            <EvidenceUploadStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 4 && (
            <SafetyPlanStep data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 5 && <ReviewSubmitStep data={formData} onBack={prevStep} />}
        </CardContent>
      </Card>
    </div>
  )
}
