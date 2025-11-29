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
import { Shield, Printer, ArrowRight, ArrowLeft } from "lucide-react"

export default function SafetyPlanPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        safePeople: ["", "", ""],
        safePlaces: ["", ""],
        emergencyContacts: ["", "", ""],
        essentials: "",
        codeWord: "",
    })

    const componentRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    })

    const totalSteps = 4
    const progress = (step / totalSteps) * 100

    const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps))
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const updateArrayField = (field: "safePeople" | "safePlaces" | "emergencyContacts", index: number, value: string) => {
        setFormData((prev) => {
            const newArray = [...prev[field]]
            newArray[index] = value
            return { ...prev, [field]: newArray }
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-muted/30">
                <div className="container max-w-3xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Your Safety Plan</h1>
                        <p className="text-muted-foreground">
                            A personalized plan to help you stay safe. This information is not saved to our servers.
                        </p>
                    </div>

                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-muted-foreground">Step {step} of {totalSteps}</span>
                                <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </CardHeader>
                        <CardContent className="py-6">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Safe People
                                    </h2>
                                    <p className="text-sm text-muted-foreground">List 3 people you can trust and contact in an emergency.</p>
                                    {formData.safePeople.map((person, index) => (
                                        <div key={index} className="space-y-2">
                                            <label className="text-sm font-medium">Contact {index + 1}</label>
                                            <Input
                                                placeholder="Name & Phone Number"
                                                value={person}
                                                onChange={(e) => updateArrayField("safePeople", index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Safe Places
                                    </h2>
                                    <p className="text-sm text-muted-foreground">Identify places you can go if you need to leave quickly.</p>
                                    {formData.safePlaces.map((place, index) => (
                                        <div key={index} className="space-y-2">
                                            <label className="text-sm font-medium">Place {index + 1}</label>
                                            <Input
                                                placeholder="Location (e.g., Friend's house, Library)"
                                                value={place}
                                                onChange={(e) => updateArrayField("safePlaces", index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Essentials & Code Word
                                    </h2>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Code Word</label>
                                        <p className="text-xs text-muted-foreground">A secret word to signal danger to your safe people.</p>
                                        <Input
                                            placeholder="e.g., 'Pizza'"
                                            value={formData.codeWord}
                                            onChange={(e) => updateField("codeWord", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Emergency Bag Checklist</label>
                                        <p className="text-xs text-muted-foreground">Items to pack (ID, money, keys, medicines).</p>
                                        <Textarea
                                            placeholder="List items here..."
                                            value={formData.essentials}
                                            onChange={(e) => updateField("essentials", e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-bold text-primary">Plan Complete!</h2>
                                        <p className="text-muted-foreground">Review your plan below. Print or save it to a secure location.</p>
                                    </div>

                                    <div className="bg-white p-8 rounded-lg border shadow-sm" ref={componentRef}>
                                        <h3 className="text-2xl font-bold mb-6 text-center border-b pb-4">My Safety Plan</h3>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Safe People</h4>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {formData.safePeople.filter(p => p).map((p, i) => <li key={i}>{p}</li>)}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Safe Places</h4>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {formData.safePlaces.filter(p => p).map((p, i) => <li key={i}>{p}</li>)}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Code Word</h4>
                                                <p className="p-2 bg-muted rounded">{formData.codeWord || "Not set"}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Essentials</h4>
                                                <p className="whitespace-pre-wrap">{formData.essentials || "Not set"}</p>
                                            </div>
                                        </div>
                                        <div className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
                                            Created on SafeSpace Nairobi. In an emergency, call 1195 or 999.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            {step < totalSteps ? (
                                <Button onClick={handleNext}>
                                    Next <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={handlePrint} variant="default">
                                    <Printer className="mr-2 h-4 w-4" /> Print / Save PDF
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
