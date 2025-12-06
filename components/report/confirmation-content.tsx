/**
 * Confirmation Content component.
 * Displays success message and tracking ID after report submission.
 */
"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Copy, Phone, MapPin, BookOpen, Shield } from "lucide-react"
import { useState } from "react"
import { useLocale } from "next-intl"

/**
 * Confirmation Content component.
 */
export function ConfirmationContent() {
  const searchParams = useSearchParams()
  const trackingId = searchParams.get("id") || "GBV-UNKNOWN"
  const [copied, setCopied] = useState(false)
  const locale = useLocale()

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-accent">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl">Report Submitted Successfully</CardTitle>
          <CardDescription>
            Your report has been received and will be reviewed by our support team within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Your Tracking ID</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-lg font-mono font-semibold bg-background px-3 py-2 rounded border border-border">
                {trackingId}
              </code>
              <Button onClick={copyTrackingId} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy tracking ID</span>
              </Button>
            </div>
            {copied && <p className="text-xs text-accent">Copied to clipboard!</p>}
            <p className="text-xs text-muted-foreground">
              Save this ID to track your case status. You can check updates anytime without logging in.
            </p>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Your Privacy is Protected</AlertTitle>
            <AlertDescription>
              Your report is encrypted and only accessible to authorized support staff. Your identity remains
              confidential.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium">Review & Assessment</p>
                <p className="text-sm text-muted-foreground">
                  Our team will review your report and assess the risk level within 24 hours.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">2</span>
              </div>
              <div>
                <p className="font-medium">Resource Connection</p>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll be connected with appropriate support services based on your needs.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">3</span>
              </div>
              <div>
                <p className="font-medium">Ongoing Support</p>
                <p className="text-sm text-muted-foreground">
                  Track your case status and receive updates through secure messaging.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-2">
              <Phone className="h-5 w-5 text-destructive" />
            </div>
            <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
            <CardDescription>If you&apos;re in danger, contact emergency services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="destructive" className="w-full" asChild>
              <a href="tel:999">Call Emergency: 999</a>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href="tel:+2547112268924">GBV Helpline: +254 711 226 8924</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Find Resources</CardTitle>
            <CardDescription>Locate support services near you</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href={`/${locale}/resources`}>
                <MapPin className="mr-2 h-4 w-4" />
                Browse Resources
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-2">
            <BookOpen className="h-5 w-5 text-secondary" />
          </div>
          <CardTitle className="text-lg">Continue Learning</CardTitle>
          <CardDescription>Learn about your rights and safety through our educational modules</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href={`/${locale}/learn`}>
              <BookOpen className="mr-2 h-4 w-4" />
              Explore Learning Modules
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href={`/${locale}`}>Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
