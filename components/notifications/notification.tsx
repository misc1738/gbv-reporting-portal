/**
 * Notification component.
 * Displays a single notification toast.
 */
"use client"

import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationType = "success" | "info" | "warning" | "error"

interface NotificationProps {
    type: NotificationType
    title: string
    message: string
    onClose?: () => void
}

const notificationStyles = {
    success: {
        container: "bg-success/10 border-success/20",
        icon: "text-success",
        Icon: CheckCircle2,
    },
    info: {
        container: "bg-accent/10 border-accent/20",
        icon: "text-accent",
        Icon: Info,
    },
    warning: {
        container: "bg-warning/10 border-warning/20",
        icon: "text-warning",
        Icon: AlertTriangle,
    },
    error: {
        container: "bg-destructive/10 border-destructive/20",
        icon: "text-destructive",
        Icon: XCircle,
    },
}

/**
 * Notification component.
 */
export function Notification({ type, title, message, onClose }: NotificationProps) {
    const style = notificationStyles[type]
    const Icon = style.Icon

    return (
        <div
            className={cn(
                "glass p-4 rounded-lg border animate-in slide-in-from-right-full duration-300",
                style.container
            )}
        >
            <div className="flex items-start gap-3">
                <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", style.icon)} />
                <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-sm">{title}</h4>
                    <p className="text-sm text-muted-foreground">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <XCircle className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    )
}

/**
 * Notification Center component.
 * Displays a list of notifications.
 */
export function NotificationCenter({ notifications }: { notifications: NotificationProps[] }) {
    return (
        <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm w-full">
            {notifications.map((notification, index) => (
                <Notification key={index} {...notification} />
            ))}
        </div>
    )
}
