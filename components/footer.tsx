import Link from "next/link"
import { Shield, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">SafeSpace Nairobi</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A safe, confidential platform for reporting and addressing gender-based violence in Nairobi County.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Incident
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-primary transition-colors">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Resources
                </Link>
              </li>
              <li>
                <Link href="/safety-plan" className="text-muted-foreground hover:text-primary transition-colors">
                  Safety Planning
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Emergency Contacts</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-destructive">Emergency: 999</p>
                  <p className="text-muted-foreground">Police Hotline</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">1195</p>
                  <p className="text-muted-foreground">GBV Helpline</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SafeSpace Nairobi. All rights reserved.</p>
          <p className="mt-2">Supported by Nairobi County Government</p>
        </div>
      </div>
    </footer>
  )
}
