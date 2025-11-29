import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { ChatWidget } from "@/components/chat-widget"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "SafeSpace Nairobi - GBV Support Portal",
  description: "Anonymous reporting and support for gender-based violence survivors in Nairobi County",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
          <ChatWidget />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
