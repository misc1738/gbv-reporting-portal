"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, PlayCircle, FileText } from "lucide-react"
import Link from "next/link"

interface Lesson {
    id: string
    title: string
    content: string
    duration: string
}

interface Module {
    title: string
    description: string
    lessons: Lesson[]
}

// Mock data - in a real app this would come from a database/CMS
const modulesData: Record<string, Module> = {
    rights: {
        title: "Know Your Rights",
        description: "Understanding legal protections against GBV in Kenya.",
        lessons: [
            {
                id: "l1",
                title: "The Sexual Offences Act",
                content: "The Sexual Offences Act (2006) is a key piece of legislation in Kenya that defines and criminalizes various sexual offences...",
                duration: "5 min",
            },
            {
                id: "l2",
                title: "Protection Against Domestic Violence Act",
                content: "This Act provides for the protection and relief of victims of domestic violence...",
                duration: "8 min",
            },
            {
                id: "l3",
                title: "Reporting Procedures",
                content: "Step-by-step guide on how to report an incident to the police...",
                duration: "6 min",
            },
        ],
    },
    safety: {
        title: "Safety Planning",
        description: "Practical steps to ensure your safety.",
        lessons: [
            { id: "s1", title: "Recognizing Warning Signs", content: "Learn to identify early signs of abuse...", duration: "5 min" },
            { id: "s2", title: "Creating an Exit Plan", content: "How to leave safely when danger escalates...", duration: "10 min" },
        ],
    },
    healing: {
        title: "Healing & Recovery",
        description: "Resources for well-being.",
        lessons: [
            { id: "h1", title: "Understanding Trauma", content: "Trauma affects everyone differently...", duration: "6 min" },
        ],
    },
    digital: {
        title: "Digital Security",
        description: "Protecting your online presence.",
        lessons: [
            { id: "d1", title: "Secure Communication", content: "Use encrypted messaging apps like Signal...", duration: "5 min" },
        ],
    },
}

export default function ModulePage() {
    const params = useParams()
    const moduleId = params.moduleId as string
    const module = modulesData[moduleId]

    if (!module) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container py-12 text-center">
                    <h1 className="text-2xl font-bold">Module Not Found</h1>
                    <Button asChild className="mt-4">
                        <Link href="/learn">Back to Learning Hub</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-muted/30">
                <div className="container max-w-4xl">
                    <Button variant="ghost" asChild className="mb-6">
                        <Link href="/learn">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
                        </Link>
                    </Button>

                    <div className="grid gap-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
                            <p className="text-xl text-muted-foreground">{module.description}</p>
                            <div className="flex items-center gap-4">
                                <Progress value={33} className="h-2 w-full max-w-xs" />
                                <span className="text-sm text-muted-foreground">33% Complete</span>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {module.lessons.map((lesson: Lesson) => (
                                <Card key={lesson.id} className="overflow-hidden">
                                    <CardHeader className="bg-muted/50 border-b">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <div className="bg-primary/10 p-2 rounded-full">
                                                    <FileText className="h-4 w-4 text-primary" />
                                                </div>
                                                {lesson.title}
                                            </CardTitle>
                                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground mb-4">{lesson.content}</p>
                                        <Button variant="outline" className="w-full sm:w-auto">
                                            <PlayCircle className="mr-2 h-4 w-4" /> Start Lesson
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
