"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressStep {
    id: string
    label: string
    description?: string
}

interface ProgressIndicatorProps {
    steps: ProgressStep[]
    currentStep: number
    className?: string
}

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isCurrent = index === currentStep
                    const isUpcoming = index > currentStep

                    return (
                        <div key={step.id} className="flex-1 relative">
                            <div className="flex flex-col items-center">
                                {/* Step Circle */}
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                                        isCompleted && "bg-gradient-primary border-primary text-white",
                                        isCurrent && "bg-primary/10 border-primary text-primary scale-110 glow-primary",
                                        isUpcoming && "bg-muted border-border text-muted-foreground"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <span className="text-sm font-semibold">{index + 1}</span>
                                    )}
                                </div>

                                {/* Step Label */}
                                <div className="mt-3 text-center max-w-[120px]">
                                    <p
                                        className={cn(
                                            "text-sm font-medium transition-colors",
                                            isCurrent && "text-primary",
                                            isCompleted && "text-foreground",
                                            isUpcoming && "text-muted-foreground"
                                        )}
                                    >
                                        {step.label}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-5 left-1/2 w-full h-0.5 -z-10">
                                    <div className="h-full bg-border relative overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full bg-gradient-primary transition-all duration-500",
                                                isCompleted ? "w-full" : "w-0"
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Compact version for mobile
export function CompactProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                </span>
                <span className="font-medium">{steps[currentStep]?.label}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
            </div>
        </div>
    )
}
