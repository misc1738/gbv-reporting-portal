/**
 * Risk Assessment component.
 * Interactive questionnaire to assess user safety risks.
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RiskProfile {
    isInImmediateDanger: boolean
    hasChildren: boolean
    livesWithAbuser: boolean
    hasSafePlace: boolean
}

interface RiskAssessmentProps {
    onComplete: (profile: RiskProfile) => void
}

/**
 * Risk Assessment component.
 */
export function RiskAssessment({ onComplete }: RiskAssessmentProps) {
    const [answers, setAnswers] = useState<Partial<RiskProfile>>({})

    const handleAnswer = (key: keyof RiskProfile, value: boolean) => {
        setAnswers(prev => ({ ...prev, [key]: value }))
    }

    const isComplete =
        answers.isInImmediateDanger !== undefined &&
        answers.hasChildren !== undefined &&
        answers.livesWithAbuser !== undefined &&
        answers.hasSafePlace !== undefined

    const handleSubmit = () => {
        if (isComplete) {
            onComplete(answers as RiskProfile)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Safety Assessment</h2>
                <p className="text-muted-foreground">Please answer a few questions so we can tailor the plan to your needs.</p>
            </div>

            <div className="grid gap-4">
                <Card className={cn("glass transition-all duration-300", answers.isInImmediateDanger ? "border-red-500/50 bg-red-500/5" : "")}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className={cn("h-5 w-5", answers.isInImmediateDanger ? "text-red-500" : "text-amber-500")} />
                            Are you in immediate danger right now?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(v) => handleAnswer("isInImmediateDanger", v === "yes")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="danger-yes" />
                                <Label htmlFor="danger-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="danger-no" />
                                <Label htmlFor="danger-no">No</Label>
                            </div>
                        </RadioGroup>
                        {answers.isInImmediateDanger && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                                <ShieldAlert className="h-5 w-5 shrink-0" />
                                <div>
                                    <strong>Please call 999 or +254 711 226 8924 immediately.</strong> Do not continue with this form if you are unsafe.
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Do you have children living with you?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(v) => handleAnswer("hasChildren", v === "yes")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="children-yes" />
                                <Label htmlFor="children-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="children-no" />
                                <Label htmlFor="children-no">No</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Do you currently live with the person hurting you?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(v) => handleAnswer("livesWithAbuser", v === "yes")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="live-yes" />
                                <Label htmlFor="live-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="live-no" />
                                <Label htmlFor="live-no">No</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Do you have a safe place to go if you leave?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(v) => handleAnswer("hasSafePlace", v === "yes")}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="place-yes" />
                                <Label htmlFor="place-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="place-no" />
                                <Label htmlFor="place-no">No</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            </div>

            <Button
                className="w-full hover-lift glow"
                size="lg"
                disabled={!isComplete || answers.isInImmediateDanger}
                onClick={handleSubmit}
            >
                Continue to Safety Plan <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
