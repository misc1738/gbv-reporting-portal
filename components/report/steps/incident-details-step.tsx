/**
 * Incident Details Step component.
 * Collects information about the incident, including type, date, location, and description.
 */
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { VoiceInput } from "@/components/ui/voice-input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ReportFormData, ViolenceType } from "@/lib/types"

interface IncidentDetailsStepProps {
  data: Omit<ReportFormData, "violenceType" | "incidentDate" | "evidenceFiles"> & {
    violenceType: ViolenceType | ""
    incidentDate?: string | Date
    evidenceFiles: File[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
  onNext: () => void
}

const VIOLENCE_TYPES: Array<{ value: ViolenceType; label: string; description: string }> = [
  { value: "physical", label: "Physical Violence", description: "Hitting, slapping, pushing, or other physical harm" },
  { value: "sexual", label: "Sexual Violence", description: "Rape, sexual assault, or unwanted sexual contact" },
  { value: "emotional", label: "Emotional/Psychological", description: "Threats, intimidation, or emotional abuse" },
  {
    value: "economic",
    label: "Economic Violence",
    description: "Control of finances or preventing economic independence",
  },
  {
    value: "online",
    label: "Online/Digital Violence",
    description: "Cyberbullying, harassment, or sharing intimate images",
  },
  { value: "other", label: "Other", description: "Other forms of gender-based violence" },
]

/**
 * Incident Details Step component.
 */
export function IncidentDetailsStep({ data, updateData, onNext }: IncidentDetailsStepProps) {
  const canProceed = data.violenceType && data.description.length >= 20

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold mb-3 block">Type of Violence *</Label>
          <RadioGroup
            value={data.violenceType}
            onValueChange={(value) => updateData({ violenceType: value as ViolenceType })}
            className="space-y-3"
          >
            {VIOLENCE_TYPES.map((type) => (
              <div
                key={type.value}
                className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={type.value} className="font-medium cursor-pointer">
                    {type.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="incidentDate">When did this happen?</Label>
            <Input
              id="incidentDate"
              type="date"
              value={
                data.incidentDate instanceof Date
                  ? data.incidentDate.toISOString().split("T")[0]
                  : data.incidentDate || ""
              }
              onChange={(e) => updateData({ incidentDate: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
            />
            <p className="text-xs text-muted-foreground">Optional - approximate date is fine</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="incidentLocation">Where did this happen?</Label>
            <div className="flex gap-2">
              <Input
                id="incidentLocation"
                placeholder="e.g., Nairobi CBD, Kibera"
                value={data.incidentLocation || ""}
                onChange={(e) => updateData({ incidentLocation: e.target.value })}
              />
              <Button type="button" variant="outline" size="icon" onClick={async () => {
                const { getUserLocation } = await import("@/lib/location")
                const location = await getUserLocation()
                if (location) {
                  updateData({ incidentLocation: `${location.city}${location.district ? `, ${location.district}` : ''}` })
                }
              }} title="Detect Location">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Optional - general area is fine</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">What happened? *</Label>
          <VoiceInput
            id="description"
            placeholder="Please describe the incident in as much detail as you feel comfortable sharing. This information will help us provide appropriate support."
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            rows={6}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {data.description.length < 20
              ? `Minimum 20 characters (${20 - data.description.length} more needed)`
              : `${data.description.length} characters`}
          </p>
        </div>

        <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
          <div className="flex-1">
            <Label className="font-medium">
              Anonymous Reporting
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Your identity is protected. You will be given a Case ID to track your report without needing an account.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continue to Risk Assessment
        </Button>
      </div>
    </div>
  )
}
