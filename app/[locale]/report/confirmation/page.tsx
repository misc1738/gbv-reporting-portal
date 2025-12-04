import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConfirmationContent } from "@/components/report/confirmation-content"

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
