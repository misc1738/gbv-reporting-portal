/**
 * Track Case Page component.
 * Allows users to track the status of their report using a case ID.
 */
"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Search, Shield, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Track Case Page component.
 */
export default function TrackCasePage() {
    const [caseId, setCaseId] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle")
    const [caseData, setCaseData] = useState<{ id: string; status: string; date: string; message?: string } | null>(null)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!caseId.trim()) return

        setStatus("loading")

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock logic - in real app, this would query the DB
        if (caseId.toUpperCase().startsWith("GBV-")) {
            setCaseData({
                id: caseId.toUpperCase(),
                status: "Under Review",
                date: new Date().toLocaleDateString(),
                message: "Your report has been received and is being reviewed by a case worker. Please check back in 24 hours for an update."
            })
            setStatus("found")
        } else {
            setStatus("not-found")
            setCaseData(null)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-gradient-hero opacity-50">
                <div className="container max-w-2xl">
                    <div className="text-center mb-8 space-y-4">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Track Your Case</h1>
                        <p className="text-lg text-muted-foreground">
                            Enter your anonymous Case ID to check the status of your report.
                        </p>
                    </div>

                    <Card className="glass border-primary/20 shadow-lg">
                        <CardHeader>
                            <CardTitle>Case Search</CardTitle>
                            <CardDescription>
                                Your Case ID was provided when you submitted your report (e.g., GBV-X7Y9Z).
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="caseId">Case ID</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="caseId"
                                            placeholder="Enter Case ID..."
                                            value={caseId}
                                            onChange={(e) => setCaseId(e.target.value)}
                                            className="font-mono uppercase"
                                        />
                                        <Button type="submit" disabled={status === "loading" || !caseId.trim()}>
                                            {status === "loading" ? (
                                                <Clock className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Search className="h-4 w-4" />
                                            )}
                                            <span className="ml-2">Track</span>
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {status === "not-found" && (
                                <Alert variant="destructive" className="mt-6 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Case Not Found</AlertTitle>
                                    <AlertDescription>
                                        We couldn&apos;t find a report with that Case ID. Please check the ID and try again.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {status === "found" && caseData && (
                                <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-4 rounded-lg border bg-background/50 space-y-4">
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Case ID</p>
                                                <p className="font-mono font-bold text-lg">{caseData.id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Date Submitted</p>
                                                <p className="font-medium">{caseData.date}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                                <CheckCircle2 className="h-4 w-4" />
                                                {caseData.status}
                                            </div>
                                        </div>

                                        {caseData.message && (
                                            <div className="bg-muted p-3 rounded-md text-sm">
                                                <p className="font-semibold mb-1">Latest Update:</p>
                                                <p className="text-muted-foreground">{caseData.message}</p>
                                            </div>
                                        )}
                                    </div>

                                    <Alert>
                                        <Shield className="h-4 w-4" />
                                        <AlertTitle>Privacy Reminder</AlertTitle>
                                        <AlertDescription>
                                            For your safety, clear your browser history after checking your case status.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}
