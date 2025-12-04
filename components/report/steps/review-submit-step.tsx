"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, Shield, FileText, Users } from "lucide-react"
import type { ReportFormData } from "@/lib/types"

interface ReviewSubmitStepProps {
  data: ReportFormData
  onBack: () => void
}

export function ReviewSubmitStep({ data, onBack }: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate anonymous tracking ID
    const trackingId = `GBV-${Date.now().toString(36).toUpperCase()}`

    // Redirect to confirmation page
    router.push(`/report/confirmation?id=${trackingId}`)
  }

  const riskCount = [
    data.immediateDanger,
    data.hasWeapons,
    data.threatsMade,
    data.previousViolence,
    data.substanceAbuse,
    data.isolation,
    data.financialControl,
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Review Your Report</h3>
          <p className="text-sm text-muted-foreground">
            By submitting this report, you confirm that the information provided is true to the best of your knowledge.
            We&apos;ll encrypt your data immediately.
          </p>
        </div>

        {/* Incident Summary */}
        <div className="space-y-3 p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <Label className="text-base font-semibold">Incident Details</Label>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>{" "}
              <span className="font-medium capitalize">{data.violenceType.replace("_", " ")}</span>
            </div>
            {data.incidentDate && (
              <div>
                <span className="text-muted-foreground">Date:</span>{" "}
                <span className="font-medium">{new Date(data.incidentDate).toLocaleDateString()}</span>
              </div>
            )}
            {data.incidentLocation && (
              <div>
                <span className="text-muted-foreground">Location:</span>{" "}
                <span className="font-medium">{data.incidentLocation}</span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Description:</span>{" "}
              <p className="mt-1 text-foreground">{data.description}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Reporting as:</span>{" "}
              <span className="font-medium">Anonymous</span>
            </div>
          </div>
        </div>

        {/* Risk Assessment Summary */}
        <div className="space-y-3 p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-secondary" />
            <Label className="text-base font-semibold">Risk Assessment</Label>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Risk factors identified:</span>{" "}
            <span className="font-medium">{riskCount} of 7</span>
          </div>
          {data.immediateDanger && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You indicated you are in immediate danger. Emergency resources will be prioritized.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Evidence Summary */}
        {data.evidenceFiles && data.evidenceFiles.length > 0 && (
          <div className="space-y-3 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <Label className="text-base font-semibold">Evidence Files</Label>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Files uploaded:</span>{" "}
              <span className="font-medium">{data.evidenceFiles.length}</span>
              <p className="text-xs text-muted-foreground mt-1">All files will be encrypted before storage</p>
            </div>
          </div>
        )}

        {/* Safety Plan Summary */}
        {((data.emergencyContacts?.length ?? 0) > 0 || (data.safeLocations?.length ?? 0) > 0) && (
          <div className="space-y-3 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <Label className="text-base font-semibold">Safety Plan</Label>
            </div>
            <div className="space-y-1 text-sm">
              {data.emergencyContacts && data.emergencyContacts.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Emergency contacts:</span>{" "}
                  <span className="font-medium">{data.emergencyContacts.length}</span>
                </div>
              )}
              {data.safeLocations && data.safeLocations.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Safe locations:</span>{" "}
                  <span className="font-medium">{data.safeLocations.length}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>What happens next?</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>After submitting your report:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>You&apos;ll receive a tracking ID to monitor your case</li>
              <li>Our team will review your report within 24 hours</li>
              <li>You&apos;ll be connected with appropriate support services</li>
              <li>All information remains confidential and encrypted</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </div>
    </div>
  )
}
