"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container max-w-4xl prose dark:prose-invert">
                    <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>

                    <p className="lead text-xl text-muted-foreground mb-8">
                        Your privacy and safety are our top priorities. This policy explains how we handle your data.
                    </p>

                    <h2>1. Data Collection</h2>
                    <p>
                        We collect minimal data necessary to provide support. For anonymous reports, we do not collect names, phone numbers, or email addresses. We do not log IP addresses for incident reports.
                    </p>

                    <h2>2. Confidentiality</h2>
                    <p>
                        All information submitted is encrypted and stored securely. Access is strictly limited to authorized case workers and support staff. We do not share your information with third parties without your explicit consent, unless required by law in life-threatening situations.
                    </p>

                    <h2>3. Cookies and Tracking</h2>
                    <p>
                        We use essential cookies only to maintain your session and ensure the site functions correctly. We do not use tracking cookies for advertising purposes.
                    </p>

                    <h2>4. Data Retention</h2>
                    <p>
                        Case data is retained only as long as necessary to provide support and for statistical analysis (in anonymized form). You have the right to request deletion of your data at any time.
                    </p>

                    <h2>5. Contact Us</h2>
                    <p>
                        If you have questions about your privacy, please contact our Data Protection Officer at privacy@safespacenairobi.org.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
