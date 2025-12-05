/**
 * Safety Plan Step component.
 * Helps users create a safety plan with emergency contacts and safe locations.
 */
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, X, Shield, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ReportFormData } from "@/lib/types"

interface SafetyPlanStepProps {
  data: ReportFormData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

/**
 * Safety Plan Step component.
 */
export function SafetyPlanStep({ data, updateData, onNext, onBack }: SafetyPlanStepProps) {
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" })
  const [newLocation, setNewLocation] = useState({ name: "", address: "", notes: "" })

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      updateData({
        emergencyContacts: [...(data.emergencyContacts || []), newContact],
      })
      setNewContact({ name: "", phone: "", relationship: "" })
    }
  }

  const removeContact = (index: number) => {
    const newContacts = [...(data.emergencyContacts || [])]
    newContacts.splice(index, 1)
    updateData({ emergencyContacts: newContacts })
  }

  const addLocation = () => {
    if (newLocation.name) {
      updateData({
        safeLocations: [...(data.safeLocations || []), newLocation],
      })
      setNewLocation({ name: "", address: "", notes: "" })
    }
  }

  const removeLocation = (index: number) => {
    const newLocations = [...(data.safeLocations || [])]
    newLocations.splice(index, 1)
    updateData({ safeLocations: newLocations })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Create Your Safety Plan</h3>
          <p className="text-sm text-muted-foreground">
            A safety plan helps you prepare for emergencies. This information is private and can be updated anytime.
          </p>
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Optional but Recommended</AlertTitle>
          <AlertDescription>
            You can skip this step and create your safety plan later. However, having a plan can help keep you safe.
          </AlertDescription>
        </Alert>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Emergency Contacts</Label>
          <p className="text-sm text-muted-foreground">
            People you can call in an emergency who can help you stay safe
          </p>

          {(data.emergencyContacts || []).map((contact, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30">
              <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-muted-foreground text-xs">{contact.relationship}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">{contact.phone}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeContact(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <Input
              placeholder="Relationship"
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
            />
          </div>
          <Button onClick={addContact} variant="outline" size="sm" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Emergency Contact
          </Button>
        </div>

        {/* Safe Locations */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Safe Locations</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Identify places where you can go if you feel unsafe (e.g., friend&apos;s house, police station, hospital).
          </p>

          {(data.safeLocations || []).map((location, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30">
              <div className="flex-1 text-sm">
                <p className="font-medium">{location.name}</p>
                <p className="text-muted-foreground">{location.address}</p>
                {(location as any).notes && <p className="text-xs text-muted-foreground mt-1">{(location as any).notes}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeLocation(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                id="locationName"
                placeholder="e.g., Aunt Mary's House"
                value={newLocation.name}
                onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationAddress">Address/Details</Label>
              <Input
                id="locationAddress"
                placeholder="Address or directions"
                value={newLocation.address}
                onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="locationNotes">Notes (Optional)</Label>
              <Input
                id="locationNotes"
                placeholder="e.g., Key is under the mat"
                value={newLocation.notes}
                onChange={(e) => setNewLocation({ ...newLocation, notes: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addLocation} type="button" variant="secondary" disabled={!newLocation.name}>
            <Plus className="h-4 w-4 mr-2" /> Add Location
          </Button>
        </div>

        {/* Escape Plan */}
        <div className="space-y-2 pt-4 border-t border-border">
          <Label htmlFor="escapePlan" className="text-base font-semibold">
            Escape Plan
          </Label>
          <p className="text-sm text-muted-foreground">Describe how you would leave safely if needed (optional)</p>
          <Textarea
            id="escapePlan"
            placeholder="e.g., Keep important items in a bag, have transport money ready, know the quickest exit routes..."
            value={(data as any).escapePlan || ""}
            onChange={(e) => updateData({ escapePlan: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Review and Submit
        </Button>
      </div>
    </div>
  )
}
