/**
 * Report Form component.
 * Multi-step form for reporting GBV incidents.
 */
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IncidentDetailsStep } from "./steps/incident-details-step"
import { RiskAssessmentStep } from "./steps/risk-assessment-step"
import { EvidenceUploadStep } from "./steps/evidence-upload-step"
import { SafetyPlanStep } from "./steps/safety-plan-step"
import { ReviewSubmitStep } from "./steps/review-submit-step"
import type { ViolenceType } from "@/lib/types"

/**
 * Interface for report form data.
 */
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

/**
 * Report Form component.
 */
export function ReportForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
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

  // Load draft on mount
  useEffect(() => {
    const loadDraft = () => {
      try {
        const saved = localStorage.getItem('report-draft')
        if (saved) {
          const parsed = JSON.parse(saved)
          setFormData(prev => ({ ...prev, ...parsed, evidenceFiles: [] }))
        }
      } catch (e) {
        console.error("Failed to load draft", e)
      } finally {
        setIsLoaded(true)
      }
    }
    loadDraft()
  }, [])

  // Save draft on change
  useEffect(() => {
    if (isLoaded && currentStep < 5) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { evidenceFiles, ...toSave } = formData
      const timeout = setTimeout(() => {
        localStorage.setItem('report-draft', JSON.stringify(toSave))
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [formData, currentStep, isLoaded])

  const updateFormData = (data: Partial<ReportFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  if (!isLoaded) {
    return null // or a loading spinner
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Progress Stepper */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="flex justify-between items-center">
          {STEPS.map((step) => {
            const isActive = step.id === currentStep
            const isCompleted = step.id < currentStep
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                    ${isActive ? 'bg-primary text-primary-foreground scale-110 shadow-lg ring-4 ring-primary/20' :
                      isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}
                >
                  {isCompleted ? '✓' : step.id}
                </div>
                <div className="text-xs font-medium hidden sm:block text-muted-foreground">
                  {step.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Card className="border-none shadow-xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {STEPS[currentStep - 1].name}
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            {STEPS[currentStep - 1].description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 md:px-8">
          {currentStep === 1 && <IncidentDetailsStep data={formData as any} updateData={updateFormData as any} onNext={nextStep} />}
          {currentStep === 2 && (
            <RiskAssessmentStep data={formData as any} updateData={updateFormData as any} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 3 && (
            <EvidenceUploadStep data={formData as any} updateData={updateFormData as any} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 4 && (
            <SafetyPlanStep data={formData as any} updateData={updateFormData as any} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 5 && <ReviewSubmitStep data={formData as any} onBack={prevStep} />}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground/60 italic">
        {currentStep < 5 ? "Your progress is saved locally on this device" : "All data is encrypted before submission"}
      </div>
    </div>
  )
}
