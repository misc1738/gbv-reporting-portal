"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"

export function QuickExit() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                exit()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const exit = () => {
        window.location.href = "https://www.google.com"
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button variant="destructive" size="lg" onClick={exit} className="shadow-lg font-bold border-2 border-white">
                <LogOut className="mr-2 h-5 w-5" />
                Quick Exit (Esc)
            </Button>
        </div>
    )
}
