/**
 * Not Found Page component.
 * Displays a 404 error message when a page is not found.
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

/**
 * Not Found Page component.
 */
export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <div className="container flex flex-col items-center justify-center gap-4 text-center">
                <div className="rounded-full bg-muted p-4">
                    <FileQuestion className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or doesn&apos;t exist.
                </p>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/">Go back home</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
