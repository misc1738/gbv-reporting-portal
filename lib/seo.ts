import type { Metadata } from "next"

interface SEOProps {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    ogType?: "website" | "article"
    canonical?: string
    noindex?: boolean
}

export function generateMetadata({
    title = "SafeSpace Nairobi - GBV Support Portal",
    description = "Anonymous reporting and support for gender-based violence survivors in Nairobi County. Access counseling, legal aid, medical care, and safe shelters. You are not alone.",
    keywords = [
        "GBV support",
        "gender-based violence",
        "Nairobi",
        "anonymous reporting",
        "survivor support",
        "counseling services",
        "legal aid",
        "safe shelter",
        "women empowerment",
        "domestic violence help",
    ],
    ogImage = "/og-image.png",
    ogType = "website",
    canonical,
    noindex = false,
}: SEOProps = {}): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://safespace-nairobi.vercel.app"
    const fullTitle = title.includes("SafeSpace") ? title : `${title} | SafeSpace Nairobi`

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(", "),
        authors: [{ name: "SafeSpace Nairobi" }],
        creator: "SafeSpace Nairobi",
        publisher: "Nairobi County Government",
        robots: noindex ? "noindex, nofollow" : "index, follow",
        alternates: {
            canonical: canonical || baseUrl,
        },
        openGraph: {
            type: ogType,
            locale: "en_KE",
            url: canonical || baseUrl,
            title: fullTitle,
            description,
            siteName: "SafeSpace Nairobi",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "SafeSpace Nairobi - GBV Support Portal",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [ogImage],
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        },
        category: "Social Services",
    }
}

// Structured data for organization
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "SafeSpace Nairobi",
    description: "GBV support and reporting portal for Nairobi County",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://safespace-nairobi.vercel.app",
    logo: "/logo.png",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+2547112268924",
        contactType: "Crisis Hotline",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
        // Add social media URLs here
    ],
}

// Structured data for emergency service
export const emergencyServiceSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: "GBV Emergency Helpline",
    telephone: "+2547112268924",
    areaServed: {
        "@type": "City",
        name: "Nairobi",
    },
    availableLanguage: ["English", "Swahili"],
}
