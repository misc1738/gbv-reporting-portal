"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, PlayCircle, Shield, Heart, Scale, Users, Briefcase } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LearnPage() {
    const [progress] = useState(65)

    const modules = [
        {
            id: "rights",
            title: "Know Your Rights",
            description: "Understanding legal protections against GBV in Kenya.",
            icon: Scale,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            lessons: [
                { title: "The Sexual Offences Act", duration: "5 min", completed: true },
                { title: "Protection Against Domestic Violence Act", duration: "8 min", completed: true },
                { title: "Reporting Procedures", duration: "6 min", completed: false },
                { title: "Legal Aid Access", duration: "4 min", completed: false },
                { title: "Rights of a Survivor", duration: "7 min", completed: false },
                { title: "Court Process Overview", duration: "10 min", completed: false },
            ],
        },
        {
            id: "safety",
            title: "Safety Planning",
            description: "Practical steps to ensure your safety in dangerous situations.",
            icon: Shield,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            lessons: [
                { title: "Recognizing Warning Signs", duration: "5 min", completed: true },
                { title: "Creating an Exit Plan", duration: "10 min", completed: false },
                { title: "Emergency Contacts", duration: "3 min", completed: false },
                { title: "Digital Safety", duration: "7 min", completed: false },
                { title: "Safety in Public Spaces", duration: "6 min", completed: false },
                { title: "Protecting Children", duration: "8 min", completed: false },
            ],
        },
        {
            id: "healing",
            title: "Healing & Recovery",
            description: "Resources for psychological and emotional well-being.",
            icon: Heart,
            color: "text-rose-500",
            bgColor: "bg-rose-500/10",
            lessons: [
                { title: "Understanding Trauma", duration: "6 min", completed: false },
                { title: "Self-Care Practices", duration: "5 min", completed: false },
                { title: "Finding a Support Group", duration: "4 min", completed: false },
                { title: "Professional Counseling", duration: "5 min", completed: false },
                { title: "Coping Mechanisms", duration: "7 min", completed: false },
                { title: "Rebuilding Trust", duration: "9 min", completed: false },
            ],
        },
        {
            id: "digital",
            title: "Digital Security",
            description: "Protecting your online presence and communications.",
            icon: Shield,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            lessons: [
                { title: "Secure Communication", duration: "5 min", completed: false },
                { title: "Social Media Privacy", duration: "7 min", completed: false },
                { title: "Device Safety", duration: "6 min", completed: false },
                { title: "Online Harassment", duration: "8 min", completed: false },
                { title: "Collecting Digital Evidence", duration: "10 min", completed: false },
                { title: "Cyberstalking Protection", duration: "7 min", completed: false },
            ],
        },
        {
            id: "bystander",
            title: "Bystander Intervention",
            description: "How to safely intervene and support others.",
            icon: Users,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            lessons: [
                { title: "The 5 Ds of Intervention", duration: "8 min", completed: false },
                { title: "Supporting a Survivor", duration: "6 min", completed: false },
                { title: "Reporting as a Witness", duration: "5 min", completed: false },
                { title: "Creating Safe Communities", duration: "7 min", completed: false },
            ],
        },
        {
            id: "workplace",
            title: "Workplace Safety",
            description: "Addressing harassment and discrimination at work.",
            icon: Briefcase,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
            lessons: [
                { title: "Defining Workplace Harassment", duration: "6 min", completed: false },
                { title: "Reporting Channels", duration: "5 min", completed: false },
                { title: "Employee Rights", duration: "7 min", completed: false },
                { title: "Supportive Work Culture", duration: "8 min", completed: false },
            ],
        },
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

                <div className="container relative z-10">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight">Learning Hub</h1>
                                <p className="text-lg text-muted-foreground max-w-2xl">
                                    Empower yourself with knowledge. Learn about your rights, safety planning, and the path to recovery through our interactive modules.
                                </p>
                            </div>

                            <Card className="w-full md:w-80 glass border-primary/20 shadow-lg">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Your Progress</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end justify-between mb-2">
                                        <span className="text-3xl font-bold text-primary">{progress}%</span>
                                        <span className="text-sm text-muted-foreground mb-1">Level 2 Scholar</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Complete 2 more lessons to earn the &quot;Safety Advocate&quot; badge.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="all" className="space-y-6">
                            <TabsList className="glass p-1">
                                <TabsTrigger value="all">All Modules</TabsTrigger>
                                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                                <TabsTrigger value="saved">Saved</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="space-y-6">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {modules.map((module) => (
                                        <Card key={module.id} className="flex flex-col overflow-hidden glass hover-lift border-white/10 transition-all duration-300">
                                            <div className={`h-2 w-full ${module.bgColor.replace('/10', '')}`} />
                                            <CardHeader>
                                                <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center mb-4`}>
                                                    <module.icon className={`h-6 w-6 ${module.color}`} />
                                                </div>
                                                <CardTitle>{module.title}</CardTitle>
                                                <CardDescription>{module.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <div className="space-y-3">
                                                    {module.lessons.map((lesson, index) => (
                                                        <div key={index} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-muted/50 p-2 rounded-md -mx-2 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                {lesson.completed ? (
                                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                                ) : (
                                                                    <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                                                )}
                                                                <span className={lesson.completed ? "text-muted-foreground line-through" : ""}>
                                                                    {lesson.title}
                                                                </span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="border-t bg-muted/20 pt-4">
                                                <Button className="w-full" asChild>
                                                    <Link href={`/learn/${module.id}`}>Continue Learning</Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
