"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { sendNotification } from "@/app/actions/notifications"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send } from "lucide-react"

export function NotificationsForm() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: "info",
        title: "",
        message: "",
        userId: "all" // "all" represents null/broadcast
    })
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await sendNotification({
            type: formData.type,
            title: formData.title,
            message: formData.message,
            userId: formData.userId === "all" ? null : formData.userId
        })

        if (result.success) {
            toast({ title: "Notification Sent", description: "Message has been queued successfully." })
            setFormData({ ...formData, title: "", message: "" })
        } else {
            toast({ variant: "destructive", title: "Wait", description: result.error || "Failed to send." })
        }
        setLoading(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Notification
                </CardTitle>
                <CardDescription>
                    Send alerts or updates to users. Use &apos;All Users&apos; for general announcements.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Notification Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(v) => setFormData({ ...formData, type: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="info">Information</SelectItem>
                                    <SelectItem value="warning">Warning / Alert</SelectItem>
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="error">Critical Error</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="recipient">Recipient</Label>
                            <Select
                                value={formData.userId}
                                onValueChange={(v) => setFormData({ ...formData, userId: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select recipient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Users (Broadcast)</SelectItem>
                                    {/* Ideally we'd fetch users and list them here, but for now specific ID input or All is fine */}
                                </SelectContent>
                            </Select>
                            {/* If we had a user search combobox, it would go here. For now, we assume broadcast or ID entry if we implemented it, but keeping it simple to Broadcast only for MVP or we'd add an Input for ID */}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g., System Maintenance Update"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Enter the detailed message..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            className="min-h-[100px]"
                        />
                    </div>

                    <span className="text-muted-foreground">Target specific user groups (e.g., &apos;Counselors&apos;, &apos;Police&apos;).</span>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Notification
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
