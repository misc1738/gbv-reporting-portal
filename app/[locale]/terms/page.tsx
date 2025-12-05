/**
 * Terms Page component.
 * Displays the terms of service of the application.
 */
"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

/**
 * Terms Page component.
 */
export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container max-w-4xl prose dark:prose-invert">
                    <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>

                    <p className="lead text-xl text-muted-foreground mb-8">
                        By using SafeSpace Nairobi, you agree to the following terms.
                    </p>

                    <h2>1. Purpose</h2>
                    <p>
                        SafeSpace Nairobi is a platform for reporting gender-based violence and accessing support services. It is not a substitute for emergency services. In an emergency, always call 999 or 112.
                    </p>

                    <h2>2. User Conduct</h2>
                    <p>
                        You agree to use this platform responsibly. False reporting or misuse of the platform to harass others is strictly prohibited and may result in legal action.
                    </p>

                    <h2>3. Disclaimer</h2>
                    <p>
                        While we strive to connect you with verified service providers, we are not responsible for the quality of services provided by third-party organizations.
                    </p>

                    <h2>4. Intellectual Property</h2>
                    <p>
                        Content on this site, including educational materials, is protected by copyright. You may use it for personal, non-commercial purposes.
                    </p>

                    <h2>5. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
