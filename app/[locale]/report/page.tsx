/**
 * Report Page component.
 * Main page for submitting an incident report.
 */
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReportForm } from "@/components/report/report-form"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Report Page component.
 */
export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

        <div className="container max-w-4xl relative z-10">
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">Report an Incident</h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Your report is confidential and secure. You will receive a unique Case ID to track your report anonymously.
              </p>
            </div>

            <Alert className="glass border-primary/20 shadow-sm">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary font-semibold">Your Safety First</AlertTitle>
              <AlertDescription>
                If you are in immediate danger, please call emergency services at <strong>999</strong> or the GBV
                Helpline at <strong>+254 711 226 8924</strong>.
              </AlertDescription>
            </Alert>

            <div className="glass-strong p-6 md:p-8 rounded-xl shadow-lg border-white/10">
              <ReportForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
