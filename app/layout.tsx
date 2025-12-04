import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { ChatWidget } from "@/components/chat-widget"
import { ThemeProvider } from "@/components/theme-provider"
import { generateMetadata } from "@/lib/seo"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = generateMetadata({
  title: "SafeSpace Nairobi - GBV Support Portal",
  description: "Anonymous reporting and support for gender-based violence survivors in Nairobi County",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <Suspense fallback={null}>{children}</Suspense>
            <ChatWidget />
            <Toaster />
            <Analytics />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
