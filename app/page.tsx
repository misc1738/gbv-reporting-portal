import Link from "next/link"
import { Shield, AlertCircle, BookOpen, MapPin, Users, Award, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Safe, Confidential, Anonymous</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Your Voice Matters. Your Safety Comes First.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                SafeSpace Nairobi is a secure platform for reporting gender-based violence, accessing support services,
                and learning about your rights. You are not alone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild className="text-base">
                  <Link href="/report">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Report Incident
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                  <Link href="/resources">
                    <MapPin className="mr-2 h-5 w-5" />
                    Find Help Near You
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How We Support You</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our platform provides comprehensive support through multiple channels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Anonymous Reporting</CardTitle>
                  <CardDescription>
                    Report incidents safely without revealing your identity. Your privacy is protected with end-to-end
                    encryption.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Find Local Resources</CardTitle>
                  <CardDescription>
                    Access a network of verified support services including counseling, legal aid, medical care, and
                    safe shelters near you.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>
                    Get immediate safety recommendations based on your situation with our AI-powered risk assessment
                    tool.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Learn Your Rights</CardTitle>
                  <CardDescription>
                    Access educational content about GBV prevention, legal rights, and healthy relationships through
                    gamified modules.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Case Tracking</CardTitle>
                  <CardDescription>
                    Track your report status and receive updates from support providers through secure, encrypted
                    messaging.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Earn Rewards</CardTitle>
                  <CardDescription>
                    Complete learning modules and earn badges while building knowledge about safety, rights, and support
                    resources.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Need Immediate Help?</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                If you are in immediate danger, please call emergency services or use our quick exit button to leave
                this site safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="destructive" asChild>
                  <a href="tel:999">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Emergency: 999
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:1195">
                    <Phone className="mr-2 h-5 w-5" />
                    GBV Helpline: 1195
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Confidential</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Partner Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Free</div>
                <div className="text-sm text-muted-foreground">All Services</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
