/**
 * Appointments Page component.
 * Allows users to book appointments with support professionals.
 */
"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Calendar as CalendarIcon, Clock, User } from "lucide-react"
import { format } from "date-fns"

/**
 * Appointments Page component.
 */
export default function AppointmentsPage() {
    const [step, setStep] = useState(1)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [formData, setFormData] = useState({
        service: "",
        provider: "",
        time: "",
        name: "",
        email: "",
        notes: "",
    })

    const services = [
        { id: "counseling", name: "Trauma Counseling" },
        { id: "legal", name: "Legal Consultation" },
        { id: "medical", name: "Medical Assessment" },
    ]

    const providers = {
        counseling: ["Dr. Sarah Kimani", "Mr. John Doe", "Ms. Jane Smith"],
        legal: ["Adv. Peter Kamau", "FIDA Legal Team"],
        medical: ["Dr. Mary Atieno", "Nairobi Women's Hospital"],
    }

    const times = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]

    const handleNext = () => setStep((prev) => prev + 1)
    const handleBack = () => setStep((prev) => prev - 1)

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-muted/30">
                <div className="container max-w-3xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Book an Appointment</h1>
                        <p className="text-muted-foreground">
                            Schedule a confidential session with our verified support professionals.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {step === 1 && "Select Service & Provider"}
                                    {step === 2 && "Choose Date & Time"}
                                    {step === 3 && "Your Details"}
                                    {step === 4 && "Booking Confirmed"}
                                </CardTitle>
                                {step < 4 && <span className="text-sm text-muted-foreground">Step {step} of 3</span>}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Service Type</Label>
                                        <Select onValueChange={(val) => updateField("service", val)} value={formData.service}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {services.map((s) => (
                                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {formData.service && (
                                        <div className="space-y-2">
                                            <Label>Provider</Label>
                                            <Select onValueChange={(val) => updateField("provider", val)} value={formData.provider}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a provider" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {providers[formData.service as keyof typeof providers]?.map((p) => (
                                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 2 && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label>Select Date</Label>
                                        <div className="border rounded-md p-4 flex justify-center">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-md border"
                                                disabled={(date) => {
                                                    const today = new Date()
                                                    today.setHours(0, 0, 0, 0)
                                                    return date < today || date.getDay() === 0 || date.getDay() === 6
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Select Time</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {times.map((t) => (
                                                <Button
                                                    key={t}
                                                    variant={formData.time === t ? "default" : "outline"}
                                                    onClick={() => updateField("time", t)}
                                                    className="w-full"
                                                >
                                                    {t}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Name (Optional - Leave blank for Anonymous)</Label>
                                        <Input
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email (Optional - for confirmation)</Label>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Notes (Optional)</Label>
                                        <Input
                                            placeholder="Any specific requirements?"
                                            value={formData.notes}
                                            onChange={(e) => updateField("notes", e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        Your appointment has been scheduled. Please save these details.
                                    </p>

                                    <div className="bg-muted p-6 rounded-lg text-left space-y-3 max-w-sm mx-auto mt-6">
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Provider</p>
                                                <p className="font-medium">{formData.provider}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CalendarIcon className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Date</p>
                                                <p className="font-medium">{date ? format(date, "PPP") : "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Time</p>
                                                <p className="font-medium">{formData.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {step < 4 && (
                                <>
                                    <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        disabled={
                                            (step === 1 && (!formData.service || !formData.provider)) ||
                                            (step === 2 && (!date || !formData.time))
                                        }
                                    >
                                        {step === 3 ? "Confirm Booking" : "Next"}
                                    </Button>
                                </>
                            )}
                            {step === 4 && (
                                <Button className="w-full" onClick={() => window.location.href = "/"}>
                                    Return Home
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}
