"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Printer, ArrowRight, ArrowLeft, Lock, Baby, Home, AlertTriangle } from "lucide-react"
import { RiskAssessment, RiskProfile } from "@/components/safety-plan/risk-assessment"


export default function SafetyPlanPage() {
    const [step, setStep] = useState(0) // 0 = Risk Assessment
    const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null)

    const [formData, setFormData] = useState({
        safePeople: ["", "", ""],
        safePlaces: ["", ""],
        essentials: "",
        codeWord: "",
        childSafety: "",
        digitalSafety: "",
    })

    const componentRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    })

    // Calculate total steps based on risk profile
    const getSteps = () => {
        const steps = [
            { id: "people", title: "Safe People", icon: Shield },
            { id: "places", title: "Safe Places", icon: Home },
            { id: "essentials", title: "Essentials", icon: AlertTriangle },
        ]

        if (riskProfile?.hasChildren) {
            steps.push({ id: "children", title: "Child Safety", icon: Baby })
        }

        if (riskProfile?.livesWithAbuser) {
            steps.push({ id: "digital", title: "Digital Safety", icon: Lock })
        }

        steps.push({ id: "review", title: "Review Plan", icon: Printer })

        return steps
    }

    const steps = getSteps()
    const currentStepIndex = step - 1
    const progress = step === 0 ? 0 : (step / steps.length) * 100

    const handleRiskAssessmentComplete = (profile: RiskProfile) => {
        setRiskProfile(profile)
        setStep(1)
    }

    const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length))
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 0))

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const updateArrayField = (field: "safePeople" | "safePlaces", index: number, value: string) => {
        setFormData((prev) => {
            const newArray = [...prev[field]]
            newArray[index] = value
            return { ...prev, [field]: newArray }
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

                <div className="container max-w-3xl relative z-10">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Smart Safety Assistant</h1>
                        <p className="text-lg text-muted-foreground">
                            {step === 0
                                ? "Let's assess your situation to create a personalized safety plan."
                                : "Your personalized guide to staying safe."}
                        </p>
                    </div>

                    {step === 0 ? (
                        <RiskAssessment onComplete={handleRiskAssessmentComplete} />
                    ) : (
                        <Card className="glass border-primary/20 shadow-lg">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        {steps[currentStepIndex].icon && (() => {
                                            const Icon = steps[currentStepIndex].icon
                                            return (
                                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                            )
                                        })()}
                                        <span className="text-xl font-semibold">{steps[currentStepIndex].title}</span>
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">Step {step} of {steps.length}</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                            </CardHeader>
                            <CardContent className="py-6 min-h-[400px]">
                                {steps[currentStepIndex].id === "people" && (
                                    <div className="space-y-6">
                                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-sm">
                                            <p>Identify 3 people you trust. These should be people who will not tell your abuser where you are.</p>
                                        </div>
                                        {formData.safePeople.map((person, index) => (
                                            <div key={index} className="space-y-2">
                                                <label className="text-sm font-medium">Safe Contact {index + 1}</label>
                                                <Input
                                                    placeholder="Name & Phone Number"
                                                    value={person}
                                                    onChange={(e) => updateArrayField("safePeople", index, e.target.value)}
                                                    className="bg-background/50"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {steps[currentStepIndex].id === "places" && (
                                    <div className="space-y-6">
                                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-sm">
                                            <p>Where can you go if you need to leave immediately? Consider places open 24/7 like hospitals or police stations.</p>
                                        </div>
                                        {formData.safePlaces.map((place, index) => (
                                            <div key={index} className="space-y-2">
                                                <label className="text-sm font-medium">Safe Place {index + 1}</label>
                                                <Input
                                                    placeholder="Location (e.g., Sister's house, Local Church)"
                                                    value={place}
                                                    onChange={(e) => updateArrayField("safePlaces", index, e.target.value)}
                                                    className="bg-background/50"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {steps[currentStepIndex].id === "essentials" && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium">Code Word</label>
                                            <p className="text-xs text-muted-foreground">A secret word to signal danger to your safe people without alerting the abuser.</p>
                                            <Input
                                                placeholder="e.g., 'Blueberry Pancakes'"
                                                value={formData.codeWord}
                                                onChange={(e) => updateField("codeWord", e.target.value)}
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium">Emergency Bag Checklist</label>
                                            <p className="text-xs text-muted-foreground">Items to pack in a &apos;Go Bag&apos;. We&apos;ve started a list for you.</p>
                                            <Textarea
                                                placeholder="ID, Money, Keys, Medicines, Children's Birth Certificates..."
                                                value={formData.essentials}
                                                onChange={(e) => updateField("essentials", e.target.value)}
                                                className="min-h-[150px] bg-background/50"
                                            />
                                        </div>
                                    </div>
                                )}

                                {steps[currentStepIndex].id === "children" && (
                                    <div className="space-y-6">
                                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 text-sm">
                                            <p><strong>Child Safety:</strong> Teach your children how to call 999. Identify a &quot;Safe Room&quot; in the house with a lock.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium">Plan for Children</label>
                                            <Textarea
                                                placeholder="Who will pick them up from school? Where will they hide during an incident?"
                                                value={formData.childSafety}
                                                onChange={(e) => updateField("childSafety", e.target.value)}
                                                className="min-h-[150px] bg-background/50"
                                            />
                                        </div>
                                    </div>
                                )}

                                {steps[currentStepIndex].id === "digital" && (
                                    <div className="space-y-6">
                                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 text-sm">
                                            <p><strong>Digital OpSec:</strong> Since you live with the abuser, assume your devices are monitored. Use Incognito mode.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-sm font-medium">Digital Safety Steps</label>
                                            <Textarea
                                                placeholder="Change passwords, check for stalkerware, use a burner phone..."
                                                value={formData.digitalSafety}
                                                onChange={(e) => updateField("digitalSafety", e.target.value)}
                                                className="min-h-[150px] bg-background/50"
                                            />
                                        </div>
                                    </div>
                                )}

                                {steps[currentStepIndex].id === "review" && (
                                    <div className="space-y-6">
                                        <div className="text-center space-y-2">
                                            <h2 className="text-2xl font-bold text-primary">Your Safety Plan is Ready</h2>
                                            <p className="text-muted-foreground">This plan is private. Print it or save it to a secure, hidden location.</p>
                                        </div>

                                        <div className="bg-white text-black p-8 rounded-lg border shadow-sm" ref={componentRef}>
                                            <div className="flex justify-between items-center border-b pb-4 mb-6">
                                                <h3 className="text-2xl font-bold">My Safety Plan</h3>
                                                <span className="text-xs text-gray-500">Generated on SafeSpace</span>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-2 text-blue-600">Safe People</h4>
                                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                                            {formData.safePeople.filter(p => p).map((p, i) => <li key={i}>{p}</li>)}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-2 text-green-600">Safe Places</h4>
                                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                                            {formData.safePlaces.filter(p => p).map((p, i) => <li key={i}>{p}</li>)}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-gray-100 rounded-lg">
                                                    <h4 className="font-bold text-lg mb-1">Code Word</h4>
                                                    <p className="text-xl font-mono">{formData.codeWord || "Not set"}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-lg mb-2">Essentials (Go Bag)</h4>
                                                    <p className="whitespace-pre-wrap text-sm">{formData.essentials || "Not set"}</p>
                                                </div>

                                                {riskProfile?.hasChildren && (
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-2 text-amber-600">Child Safety Plan</h4>
                                                        <p className="whitespace-pre-wrap text-sm">{formData.childSafety || "Not set"}</p>
                                                    </div>
                                                )}

                                                {riskProfile?.livesWithAbuser && (
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-2 text-purple-600">Digital Security</h4>
                                                        <p className="whitespace-pre-wrap text-sm">{formData.digitalSafety || "Not set"}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
                                                Emergency: 999 | GBV Helpline: 1195 | Childline: 116
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={handleBack}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                {step < steps.length ? (
                                    <Button onClick={handleNext} className="glow">
                                        Next <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button onClick={handlePrint} variant="default" className="glow">
                                        <Printer className="mr-2 h-4 w-4" /> Print / Save PDF
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
