"use client"

/**
 * Skeleton component for loading states.
 */
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

/**
 * Skeleton component.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("animate-shimmer rounded-md bg-gradient-to-r from-muted via-muted-foreground/10 to-muted", className)}
            {...props}
        />
    )
}

export function CardSkeleton() {
    return (
        <div className="glass p-6 rounded-lg space-y-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-48" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
                <div className="space-y-6">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
        </div>
    )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                </div>
            ))}
        </div>
    )
}
