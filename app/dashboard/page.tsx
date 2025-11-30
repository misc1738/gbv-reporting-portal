"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, MessageSquare, Bell, Settings, Shield, AlertTriangle, ExternalLink, TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

export default function DashboardPage() {
    // Mock data
    const reports = [
        { id: "R-2023-001", date: "2023-11-28", status: "Under Review", type: "Domestic Violence" },
        { id: "R-2023-002", date: "2023-10-15", status: "Closed", type: "Harassment" },
    ]

    const notifications = [
        { id: 1, message: "New message from Case Worker Sarah", time: "2 hours ago" },
        { id: 2, message: "Your report R-2023-001 status updated", time: "1 day ago" },
    ]

    // Chart data
    const monthlyReports = [
        { month: "Jul", reports: 12 },
        { month: "Aug", reports: 19 },
        { month: "Sep", reports: 15 },
        { month: "Oct", reports: 22 },
        { month: "Nov", reports: 28 },
        { month: "Dec", reports: 18 },
    ]

    const reportTypes = [
        { name: "Domestic Violence", value: 45, color: "oklch(0.55 0.22 285)" },
        { name: "Harassment", value: 30, color: "oklch(0.65 0.18 350)" },
        { name: "Assault", value: 15, color: "oklch(0.60 0.15 195)" },
        { name: "Other", value: 10, color: "oklch(0.70 0.18 75)" },
    ]

    const stats = [
        { label: "Total Reports", value: "12", icon: FileText, change: "+15%", color: "primary" },
        { label: "Active Cases", value: "3", icon: Clock, change: "+2", color: "accent" },
        { label: "Resolved", value: "9", icon: CheckCircle2, change: "75%", color: "success" },
        { label: "Response Time", value: "2.4h", icon: TrendingUp, change: "-12%", color: "secondary" },
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-gradient-hero opacity-50">
                <div className="container">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
                                <p className="text-muted-foreground">Welcome back, Anonymous User</p>
                            </div>
                            <Button variant="destructive" className="gap-2 hover-lift glow-secondary">
                                <AlertTriangle className="h-4 w-4" />
                                Quick Exit
                            </Button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="glass hover-lift transition-smooth">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={`h-12 w-12 rounded-lg bg-gradient-${stat.color} flex items-center justify-center`}>
                                                        <Icon className="h-6 w-6 text-white" />
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {stat.change}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                                    <p className={`text-3xl font-bold text-gradient-${stat.color}`}>{stat.value}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Main Content Area */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Charts */}
                                <Card className="glass">
                                    <CardHeader>
                                        <CardTitle>Reports Overview</CardTitle>
                                        <CardDescription>Monthly report submissions over the last 6 months</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={monthlyReports}>
                                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "var(--card)",
                                                        border: "1px solid var(--border)",
                                                        borderRadius: "var(--radius)",
                                                    }}
                                                />
                                                <Bar dataKey="reports" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                                                <defs>
                                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="oklch(0.55 0.22 285)" />
                                                        <stop offset="100%" stopColor="oklch(0.65 0.18 350)" />
                                                    </linearGradient>
                                                </defs>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                {/* Report Types */}
                                <Card className="glass">
                                    <CardHeader>
                                        <CardTitle>Report Types Distribution</CardTitle>
                                        <CardDescription>Breakdown of report categories</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-8">
                                            <ResponsiveContainer width="50%" height={200}>
                                                <PieChart>
                                                    <Pie
                                                        data={reportTypes}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {reportTypes.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <div className="flex-1 space-y-3">
                                                {reportTypes.map((type) => (
                                                    <div key={type.name} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: type.color }}
                                                            />
                                                            <span className="text-sm">{type.name}</span>
                                                        </div>
                                                        <span className="text-sm font-semibold">{type.value}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Active Reports */}
                                <Card className="glass">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            My Reports
                                        </CardTitle>
                                        <CardDescription>Track the status of your submitted reports</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {reports.map((report) => (
                                                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg bg-background/50 hover-lift transition-smooth">
                                                    <div className="space-y-1">
                                                        <div className="font-medium">{report.id}</div>
                                                        <div className="text-sm text-muted-foreground">{report.type} • {report.date}</div>
                                                    </div>
                                                    <Badge variant={report.status === "Closed" ? "secondary" : "default"}>
                                                        {report.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                            <Button variant="outline" className="w-full glass hover-lift" asChild>
                                                <Link href="/report">Submit New Report</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Safety Status */}
                                <Card className="glass border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-primary">
                                            <Shield className="h-5 w-5 animate-pulse-slow" />
                                            Safety Status
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Alert className="border-primary/20">
                                            <AlertTitle>Secure Connection</AlertTitle>
                                            <AlertDescription className="text-xs">
                                                Your connection is encrypted. No browsing history is saved on this device.
                                            </AlertDescription>
                                        </Alert>
                                        <Button className="w-full bg-gradient-primary hover:opacity-90 hover-lift">
                                            Safety Check
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Recent Activity */}
                                <Card className="glass">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Bell className="h-5 w-5" />
                                            Recent Activity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {notifications.map((notification) => (
                                                <div key={notification.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                                                    <div className="h-2 w-2 mt-2 rounded-full bg-primary animate-pulse-slow" />
                                                    <div>
                                                        <p className="text-sm font-medium">{notification.message}</p>
                                                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Actions */}
                                <Card className="glass">
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover-lift" asChild>
                                                <Link href="/resources">
                                                    <ExternalLink className="h-5 w-5" />
                                                    <span className="text-xs">Find Support</span>
                                                </Link>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover-lift" asChild>
                                                <Link href="/learn">
                                                    <ExternalLink className="h-5 w-5" />
                                                    <span className="text-xs">Learning Hub</span>
                                                </Link>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover-lift">
                                                <MessageSquare className="h-5 w-5" />
                                                <span className="text-xs">Messages</span>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover-lift">
                                                <Settings className="h-5 w-5" />
                                                <span className="text-xs">Settings</span>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
