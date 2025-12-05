"use client"

import React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

/**
 * Error Boundary component to catch JavaScript errors in child components.
 * Displays a fallback UI instead of crashing the app.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <Card className="max-w-md w-full glass">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                                    <AlertTriangle className="h-6 w-6 text-destructive" />
                                </div>
                                <div>
                                    <CardTitle>Something went wrong</CardTitle>
                                    <CardDescription>We encountered an unexpected error</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted/50 border border-border">
                                <p className="text-sm text-muted-foreground font-mono">
                                    {this.state.error?.message || "Unknown error"}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={this.handleReset} className="flex-1 bg-gradient-primary">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Try Again
                                </Button>
                                <Button variant="outline" onClick={() => window.location.href = "/"} className="flex-1 glass">
                                    Go Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}

/**
 * Functional error fallback component for specific sections.
 * 
 * @param props - Props containing the error and a reset function.
 */
export function ErrorFallback({
    error,
    resetError
}: {
    error: Error
    resetError: () => void
}) {
    return (
        <div className="p-6 glass rounded-lg border border-destructive/20">
            <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-destructive">Error Loading Content</h3>
                    <p className="text-sm text-muted-foreground">{error.message}</p>
                    <Button size="sm" variant="outline" onClick={resetError} className="mt-2">
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Retry
                    </Button>
                </div>
            </div>
        </div>
    )
}
