"use client"

import Link from "next/link"
import { Shield, AlertCircle, BookOpen, MapPin, Users, Award, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuickExit } from "@/components/quick-exit"
import { TiltCard } from "@/components/ui/tilt-card"
import { motion } from "framer-motion"

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <QuickExit />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Complex Mesh Gradient Background */}
          <div className="absolute inset-0 bg-gradient-hero -z-10 opacity-80" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay -z-10" />

          {/* Floating 3D Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mx-auto max-w-4xl text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-strong border-primary/20 text-primary text-sm font-semibold hover-lift shadow-lg backdrop-blur-xl"
              >
                <Shield className="h-4 w-4 animate-pulse" />
                <span>Safe. Confidential. Anonymous.</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
                Your Voice Matters.<br />
                <span className="text-gradient-primary drop-shadow-sm">Your Safety</span> Comes First.
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                A secure, encrypted platform for reporting gender-based violence and accessing life-saving support services.
                <span className="block mt-2 text-foreground font-medium">You are not alone.</span>
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              >
                <Button size="lg" variant="glow" asChild className="text-lg h-14 px-8 rounded-full">
                  <Link href="/report">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Report Incident
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 rounded-full glass-strong border-primary/20 hover:bg-primary/5">
                  <Link href="/resources">
                    <MapPin className="mr-2 h-5 w-5" />
                    Find Help Near You
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl -z-20" />

          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Comprehensive Support
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced tools and resources designed for your safety and empowerment.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Anonymous Reporting",
                  desc: "End-to-end encrypted reporting that protects your identity. No account required.",
                  icon: Shield,
                  gradient: "bg-gradient-primary",
                  glow: "group-hover:glow-primary"
                },
                {
                  title: "Local Resources",
                  desc: "Instant access to verified shelters, legal aid, and medical centers near you.",
                  icon: MapPin,
                  gradient: "bg-gradient-accent",
                  glow: "group-hover:glow-accent"
                },
                {
                  title: "Risk Assessment",
                  desc: "AI-powered safety evaluation to provide immediate, personalized recommendations.",
                  icon: AlertCircle,
                  gradient: "bg-gradient-secondary",
                  glow: "group-hover:glow-secondary"
                },
                {
                  title: "Learn Your Rights",
                  desc: "Interactive modules on legal rights, prevention, and healthy relationships.",
                  icon: BookOpen,
                  gradient: "bg-gradient-primary",
                  glow: "group-hover:glow-primary"
                },
                {
                  title: "Secure Tracking",
                  desc: "Monitor your case status with a unique, anonymous ID. Zero digital footprint.",
                  icon: Users,
                  gradient: "bg-gradient-accent",
                  glow: "group-hover:glow-accent"
                },
                {
                  title: "Earn Rewards",
                  desc: "Build knowledge and earn badges for completing safety and rights modules.",
                  icon: Award,
                  gradient: "bg-gradient-secondary",
                  glow: "group-hover:glow-secondary"
                }
              ].map((feature, index) => (
                <motion.div variants={item} key={index} className="h-full">
                  <TiltCard className="h-full">
                    <Card className="glass-strong border-white/10 h-full group hover:border-primary/30 transition-colors duration-500">
                      <CardHeader>
                        <div className={`h-14 w-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 ${feature.glow} transition-all duration-500 shadow-lg`}>
                          <feature.icon className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {feature.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-secondary opacity-[0.08]" />
          <div className="absolute -right-20 top-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-8 p-12 rounded-3xl glass-strong border-white/10 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Need <span className="text-gradient-secondary">Immediate Help?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                If you are in immediate danger, please call emergency services or use our quick exit button to leave
                this site safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <Button size="lg" variant="destructive" asChild className="text-lg h-14 px-8 rounded-full hover-lift glow-secondary shadow-xl">
                  <a href="tel:999">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Emergency: 999
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 rounded-full glass hover:bg-background/50">
                  <a href="tel:1195">
                    <Phone className="mr-2 h-5 w-5" />
                    GBV Helpline: 1195
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  )
}
