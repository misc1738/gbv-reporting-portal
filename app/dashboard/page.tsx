import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, MessageSquare, Bell, Settings, Shield, AlertTriangle, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

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

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-muted/30">
                <div className="container">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
                                <p className="text-muted-foreground">Welcome back, Anonymous User</p>
                            </div>
                            <Button variant="destructive" className="gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Quick Exit
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Main Content Area */}
                            <div className="md:col-span-2 space-y-6">

                                {/* Active Reports */}
                                <Card>
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
                                                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                                                    <div className="space-y-1">
                                                        <div className="font-medium">{report.id}</div>
                                                        <div className="text-sm text-muted-foreground">{report.type} • {report.date}</div>
                                                    </div>
                                                    <Badge variant={report.status === "Closed" ? "secondary" : "default"}>
                                                        {report.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href="/report">Submit New Report</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Activity */}
                                <Card>
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
                                                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                                                    <div>
                                                        <p className="text-sm font-medium">{notification.message}</p>
                                                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Safety Status */}
                                <Card className="bg-primary/5 border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-primary">
                                            <Shield className="h-5 w-5" />
                                            Safety Status
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Alert>
                                            <AlertTitle>Secure Connection</AlertTitle>
                                            <AlertDescription className="text-xs">
                                                Your connection is encrypted. No browsing history is saved on this device.
                                            </AlertDescription>
                                        </Alert>
                                        <Button className="w-full" variant="outline">
                                            Safety Check
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Quick Actions */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                                                <Link href="/resources">
                                                    <ExternalLink className="h-5 w-5" />
                                                    <span>Find Support</span>
                                                </Link>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
                                                <Link href="/learn">
                                                    <ExternalLink className="h-5 w-5" />
                                                    <span>Learning Hub</span>
                                                </Link>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                                                <MessageSquare className="h-5 w-5" />
                                                <span>Messages</span>
                                            </Button>
                                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                                                <Settings className="h-5 w-5" />
                                                <span>Settings</span>
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
