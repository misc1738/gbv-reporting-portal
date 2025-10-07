import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReportForm } from "@/components/report/report-form"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Report an Incident</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Your report is confidential and secure. You can choose to remain anonymous or create an account to track
                your case.
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Your Safety First</AlertTitle>
              <AlertDescription>
                If you are in immediate danger, please call emergency services at <strong>999</strong> or the GBV
                Helpline at <strong>1195</strong>.
              </AlertDescription>
            </Alert>

            <ReportForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
