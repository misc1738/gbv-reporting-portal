"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-muted-foreground">
                            Find answers to common questions about reporting, safety, and support resources.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is my report truly anonymous?</AccordionTrigger>
                            <AccordionContent>
                                Yes. When you choose to report anonymously, we do not collect any personal identifying information. Your IP address is not logged, and your report is encrypted. You will receive a unique case ID to track your report without revealing who you are.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What happens after I submit a report?</AccordionTrigger>
                            <AccordionContent>
                                After submission, your report is securely routed to our verified support partners. If you provided contact information, a case worker will reach out to you within 24 hours. If you reported anonymously, you can use your case ID to check for updates and messages from support staff on our platform.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I get medical help through this platform?</AccordionTrigger>
                            <AccordionContent>
                                We connect you with medical facilities that provide specialized care for GBV survivors. While we don&apos;t provide medical services directly, our &quot;Resources&quot; page lists nearby hospitals and clinics that offer free or subsidized post-rape care, including PEP and emergency contraception.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Is legal aid available?</AccordionTrigger>
                            <AccordionContent>
                                Yes. We partner with several legal aid organizations that offer free legal counsel and representation to survivors. You can request legal support when submitting your report or find legal aid providers in our directory.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>How do I delete my browsing history?</AccordionTrigger>
                            <AccordionContent>
                                For your safety, we have a &quot;Quick Exit&quot; button that immediately leaves the site. To delete your history, check your browser&apos;s settings (usually under &quot;History&quot; or &quot;Privacy&quot;). We also recommend using &quot;Incognito&quot; or &quot;Private&quot; browsing mode when accessing this site if you are concerned about someone checking your phone or computer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </main>
            <Footer />
        </div>
    )
}
