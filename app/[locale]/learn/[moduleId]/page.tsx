"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ArrowLeft, PlayCircle, FileText, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"
import { modulesData, Lesson } from "../data"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"

export default function ModulePage() {
    const params = useParams()
    const moduleId = params.moduleId as string
    const module = modulesData.find(m => m.id === moduleId)
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const locale = useLocale()

    if (!module) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container py-12 text-center flex flex-col items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Module Not Found</h1>
                    <p className="text-muted-foreground mb-8">The learning module you are looking for does not exist.</p>
                    <Button asChild size="lg">
                        <Link href={`/${locale}/learn`}>Back to Learning Hub</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        )
    }

    const completedCount = module.lessons.filter(l => l.completed).length
    const progressPercentage = Math.round((completedCount / module.lessons.length) * 100)

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

                <div className="container max-w-4xl relative z-10">
                    <Button variant="ghost" asChild className="mb-8 hover:bg-background/50">
                        <Link href={`/${locale}/learn`}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
                        </Link>
                    </Button>

                    <div className="grid gap-8">
                        {/* Module Header */}
                        <div className="space-y-6 glass p-8 rounded-2xl border-primary/10">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-4">
                                    <div className={cn("inline-flex p-3 rounded-xl", module.bgColor)}>
                                        <module.icon className={cn("h-8 w-8", module.color)} />
                                    </div>
                                    <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
                                    <p className="text-xl text-muted-foreground max-w-2xl">{module.description}</p>
                                </div>
                                <div className="hidden md:block text-right">
                                    <div className="text-3xl font-bold text-primary">{module.lessons.length}</div>
                                    <div className="text-sm text-muted-foreground">Lessons</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Module Progress</span>
                                    <span className="text-muted-foreground">{progressPercentage}% Complete</span>
                                </div>
                                <Progress value={progressPercentage} className="h-3" />
                            </div>
                        </div>

                        {/* Lessons List */}
                        <div className="grid gap-4">
                            <h2 className="text-2xl font-semibold px-2">Course Content</h2>
                            {module.lessons.map((lesson: Lesson, index: number) => (
                                <Card
                                    key={lesson.id}
                                    className={cn(
                                        "overflow-hidden transition-all duration-300 hover:shadow-md border-white/10",
                                        lesson.completed ? "bg-primary/5 border-primary/20" : "glass"
                                    )}
                                >
                                    <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-background border border-border shrink-0 text-lg font-semibold text-muted-foreground">
                                            {lesson.completed ? <CheckCircle2 className="h-6 w-6 text-primary" /> : index + 1}
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                {lesson.title}
                                                {lesson.completed && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Completed</span>}
                                            </h3>
                                            <p className="text-muted-foreground line-clamp-2 text-sm">{lesson.content}</p>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="mr-1 h-4 w-4" />
                                                {lesson.duration}
                                            </div>
                                            <Button
                                                onClick={() => setSelectedLesson(lesson)}
                                                variant={lesson.completed ? "outline" : "default"}
                                                className={cn(lesson.completed ? "" : "glow")}
                                            >
                                                {lesson.completed ? "Review" : "Start Lesson"}
                                                <PlayCircle className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Lesson Viewer Dialog */}
            <Dialog open={!!selectedLesson} onOpenChange={(open) => !open && setSelectedLesson(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-strong border-white/10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            {selectedLesson?.title}
                        </DialogTitle>
                        <DialogDescription className="flex items-center gap-2 text-base">
                            <Clock className="h-4 w-4" />
                            Duration: {selectedLesson?.duration}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-4">
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">{selectedLesson?.content}</p>
                            {/* Placeholder for more content */}
                            <p className="text-muted-foreground">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-lg border border-border my-4">
                                <h4 className="font-semibold mb-2">Key Takeaways:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Understanding the core concepts of {selectedLesson?.title}</li>
                                    <li>Identifying key indicators and warning signs</li>
                                    <li>Knowing appropriate response strategies</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setSelectedLesson(null)}>
                            Close
                        </Button>
                        <Button onClick={() => setSelectedLesson(null)} className="glow">
                            Mark as Complete <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
