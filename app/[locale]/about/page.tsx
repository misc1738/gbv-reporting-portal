/**
 * About Page component.
 * Displays information about the organization, mission, vision, and values.
 */
"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Users, Heart, Target } from "lucide-react"

/**
 * About Page component.
 */
export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About SafeSpace Nairobi</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            We are dedicated to creating a safer Nairobi by providing accessible, confidential, and comprehensive support for survivors of gender-based violence.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16">
                    <div className="container">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">Our Mission</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    To empower survivors of gender-based violence through technology, providing immediate access to justice, healthcare, and psychosocial support while fostering a culture of safety and accountability in our community.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 text-secondary mb-4">
                                    <Heart className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">Our Vision</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    A Nairobi free from gender-based violence, where every individual feels safe, heard, and supported, and where justice is accessible to all regardless of their status.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-muted/30">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card>
                                <CardHeader>
                                    <Shield className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle>Confidentiality</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    We prioritize your privacy and safety above all else. Your data is encrypted and your identity protected.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Users className="h-8 w-8 text-secondary mb-2" />
                                    <CardTitle>Inclusivity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Our services are available to everyone, regardless of gender, age, ability, or background.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Heart className="h-8 w-8 text-accent mb-2" />
                                    <CardTitle>Empathy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    We approach every case with compassion, understanding, and a survivor-centered mindset.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is my report truly anonymous?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. We use end-to-end encryption and do not store IP addresses. You can choose to report without providing any personal details.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>What happens after I submit a report?</AccordionTrigger>
                                <AccordionContent>
                                    Your report is securely transmitted to our verified partners. If you choose to be contacted, a case worker will reach out via your preferred method. Otherwise, the data is used for advocacy and resource allocation.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is this service free?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, all services accessed through SafeSpace Nairobi, including legal aid, counseling, and medical support, are free of charge.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Can I report for someone else?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, you can file a third-party report. Please ensure you have the survivor&apos;s consent if possible, or report anonymously if you believe they are in immediate danger but cannot report themselves.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
