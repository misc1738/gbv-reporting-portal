/**
 * Root Layout component.
 * Top-level layout for the application.
 */
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
    title: "SafeSpace Nairobi - GBV Support Portal",
    description: "Anonymous reporting and support for gender-based violence survivors in Nairobi County",
}

/**
 * Root Layout component.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    )
}
