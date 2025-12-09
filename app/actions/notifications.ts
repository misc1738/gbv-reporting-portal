"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface CreateNotificationData {
    userId?: string | null
    type: string
    title: string
    message: string
}

export async function sendNotification(data: CreateNotificationData) {
    try {
        const supabase = await getSupabaseServerClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { success: false, error: "Unauthorized" }

        // Check permissions
        const { data: userRecord } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .maybeSingle()

        if (!userRecord || !["admin", "counselor"].includes(userRecord.role)) {
            return { success: false, error: "Insufficient permissions" }
        }

        const { error } = await supabase
            .from("notifications")
            .insert({
                user_id: data.userId || null, // null means system-wide/broadcast in our logic
                type: data.type,
                title: data.title,
                message: data.message,
            })

        if (error) {
            console.error("Send notification error:", error)
            return { success: false, error: "Failed to send notification" }
        }

        revalidatePath("/admin/notifications")
        return { success: true }
    } catch (error) {
        console.error("Send notification error:", error)
        return { success: false, error: "An unexpected error occurred" }
    }
}

export async function getRecentNotifications() {
    try {
        const supabase = await getSupabaseServerClient()
        const { data, error } = await supabase
            .from("notifications")
            .select(`
            *,
            users ( full_name, email )
        `)
            .order("created_at", { ascending: false })
            .limit(20)

        if (error) throw error
        return { success: true, data }
    } catch (error) {
        console.error("Get notifications error:", error)
        return { success: false, error: "Failed to fetch notifications" }
    }
}
