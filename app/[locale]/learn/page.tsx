/**
 * Learn Page component.
 * Educational hub with modules on rights, safety planning, and recovery.
 */
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, PlayCircle } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { modulesData } from "./data"
import { useLocale } from "next-intl"

/**
 * Learn Page component.
 */
export default function LearnPage() {
    const locale = useLocale()
    const [progress] = useState(65)
    const modules = modulesData

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
                                                    <Link href={`/${locale}/learn/${module.id}`}>Continue Learning</Link>
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
