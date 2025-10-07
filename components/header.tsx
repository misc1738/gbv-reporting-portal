import Link from "next/link"
import { Shield, Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-foreground">SafeSpace</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">Nairobi</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/report" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Report Incident
          </Link>
          <Link href="/learn" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Learn
          </Link>
          <Link href="/resources" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Resources
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
