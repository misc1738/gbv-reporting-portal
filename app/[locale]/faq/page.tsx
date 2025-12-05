/**
 * FAQ Page component.
 * Displays frequently asked questions and answers in an accordion format.
 */
"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

/**
 * FAQ Page component.
 */
export default function FAQPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

                <div className="container max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-muted-foreground">
                            Find answers to common questions about reporting, safety, and support resources.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="item-1" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">Is my report truly anonymous?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Yes. When you choose to report anonymously, we do not collect any personal identifying information. Your IP address is not logged, and your report is encrypted. You will receive a unique case ID to track your report without revealing who you are. We use industry-standard encryption protocols to ensure your data remains secure at all times.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">What happens after I submit a report?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                After submission, your report is securely routed to our verified support partners. If you provided contact information, a case worker will reach out to you within 24 hours. If you reported anonymously, you can use your case ID to check for updates and messages from support staff on our platform. The data is also used to help organizations understand GBV trends and allocate resources more effectively.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">Can I get medical help through this platform?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                We connect you with medical facilities that provide specialized care for GBV survivors. While we don&apos;t provide medical services directly, our &quot;Resources&quot; page lists nearby hospitals and clinics that offer free or subsidized post-rape care, including PEP (Post-Exposure Prophylaxis) to prevent HIV, emergency contraception, and treatment for injuries. It is crucial to seek medical attention within 72 hours of an incident.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">Is legal aid available?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Yes. We partner with several legal aid organizations, such as FIDA Kenya and Kituo Cha Sheria, that offer free legal counsel and representation to survivors. You can request legal support when submitting your report or find legal aid providers in our directory. They can assist with obtaining restraining orders, filing police reports, and navigating the court process.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">How do I delete my browsing history?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                For your safety, we have a &quot;Quick Exit&quot; button that immediately leaves the site. To delete your history, check your browser&apos;s settings (usually under &quot;History&quot; or &quot;Privacy&quot;). We also recommend using &quot;Incognito&quot; or &quot;Private&quot; browsing mode when accessing this site if you are concerned about someone checking your phone or computer.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">How do I collect digital evidence safely?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                If you are experiencing online harassment or cyberstalking, take screenshots of all messages, posts, and call logs. Do not delete the messages if possible. Store these screenshots in a secure location, like a cloud drive with a password only you know, or send them to a trusted friend. This evidence can be crucial for legal proceedings.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-7" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">What is a restraining order and how do I get one?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                A restraining order (or protection order) is a legal document issued by a court that prohibits an abuser from contacting or coming near you. In Kenya, you can apply for a protection order under the Protection Against Domestic Violence Act. Our legal partners can guide you through this process free of charge.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-8" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">Can I report if I am under 18?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Yes, you can report if you are under 18. We have specialized protocols for minors to ensure their safety and protection. We work with child protection agencies to provide age-appropriate support and care. Your safety is our top priority.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-9" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">What constitutes workplace harassment?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Workplace harassment includes unwanted sexual advances, requests for sexual favors, and other verbal or physical conduct of a sexual nature that creates a hostile work environment. It also covers gender-based discrimination. You have the right to a safe working environment, and we can connect you with resources to address this.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-10" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">What types of counseling are available?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Our partners offer various forms of counseling, including individual trauma-informed therapy, group support sessions, and family counseling. These services are designed to help you process trauma, build resilience, and move forward in your healing journey. All counseling services accessed through our platform are free and confidential.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-11" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">I am a man/boy. Can I use this platform?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Absolutely. Gender-based violence affects everyone. We provide support for men and boys who are survivors of violence. Our partners include organizations that specialize in male survivor support. Your report will be treated with the same level of seriousness and confidentiality.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-12" className="glass p-4 rounded-lg border-none">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary">What if the perpetrator is a police officer?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Reporting a police officer can be intimidating. We work with independent oversight bodies like IPOA (Independent Policing Oversight Authority) and human rights organizations to ensure such cases are handled impartially. We strongly recommend seeking legal support through our platform before or while reporting such incidents.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </main>
            <Footer />
        </div>
    )
}
