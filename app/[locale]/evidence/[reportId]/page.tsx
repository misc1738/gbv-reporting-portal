/**
 * Evidence Vault Page component.
 * Allows users to upload and manage evidence files for a specific report.
 */
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EvidenceUploader } from "@/components/evidence/evidence-uploader"
import { EvidenceList } from "@/components/evidence/evidence-list"
import { Shield, Lock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Evidence Vault Page component.
 */
export default async function EvidenceVaultPage(props: { params: Promise<{ reportId: string }> }) {
  const params = await props.params
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold">Evidence Vault</h1>
              </div>
              <p className="text-lg text-muted-foreground">Securely upload and manage evidence files for your report</p>
            </div>

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertTitle>Maximum Security</AlertTitle>
              <AlertDescription>
                All files are encrypted on your device before upload using AES-256 encryption. Only authorized support
                staff with proper credentials can decrypt and view your evidence.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Upload Evidence</CardTitle>
                <CardDescription>
                  Add photos, videos, screenshots, or documents that support your report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EvidenceUploader reportId={params.reportId} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Evidence Files</CardTitle>
                <CardDescription>Manage and download your uploaded evidence</CardDescription>
              </CardHeader>
              <CardContent>
                <EvidenceList reportId={params.reportId} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
