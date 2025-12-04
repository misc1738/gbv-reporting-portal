"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We are here to help. Reach out to us for support, inquiries, or to learn more about our services.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <Card className="border-destructive/50 bg-destructive/5">
                                <CardHeader>
                                    <CardTitle className="text-destructive flex items-center gap-2">
                                        <Phone className="h-5 w-5" />
                                        Emergency Hotlines
                                    </CardTitle>
                                    <CardDescription>Available 24/7, toll-free</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                                        <span className="font-semibold">National GBV Helpline</span>
                                        <a href="tel:+2547112268924" className="text-primary font-bold hover:underline">+254 711 226 8924</a>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                                        <span className="font-semibold">Police Emergency</span>
                                        <a href="tel:999" className="text-primary font-bold hover:underline">999 / 112</a>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                                        <span className="font-semibold">Childline Kenya</span>
                                        <a href="tel:116" className="text-primary font-bold hover:underline">116</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Visit Us</h3>
                                        <p className="text-muted-foreground">
                                            SafeSpace Nairobi HQ<br />
                                            Upper Hill, Nairobi<br />
                                            Kenya
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Email Us</h3>
                                        <p className="text-muted-foreground">
                                            support@safespacenairobi.org<br />
                                            info@safespacenairobi.org
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Office Hours</h3>
                                        <p className="text-muted-foreground">
                                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                                            Weekends: Closed (Helplines active 24/7)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Send a Message</CardTitle>
                                <CardDescription>
                                    For non-emergency inquiries. We aim to respond within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Name (Optional)</label>
                                            <Input id="name" placeholder="Your name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                                            <Input id="email" type="email" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                        <Input id="subject" placeholder="How can we help?" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                                    </div>
                                    <Button type="submit" className="w-full">Send Message</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
