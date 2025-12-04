"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        // Replace the locale in the pathname
        // Assuming the pathname starts with /en or /sw
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
        router.replace(newPath)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-lift transition-smooth hover:bg-primary/5 rounded-full">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Switch Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLocale("en")} className={locale === "en" ? "bg-primary/10" : ""}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("sw")} className={locale === "sw" ? "bg-primary/10" : ""}>
                    Swahili
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
