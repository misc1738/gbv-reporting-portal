"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface CreateAppointmentData {
  serviceType: string
  providerName: string
  appointmentDate: string
  appointmentTime: string
  contactName?: string
  contactEmail?: string
  notes?: string
}

export async function createAppointment(data: CreateAppointmentData) {
  const supabase = await getSupabaseServerClient()

  try {
    let userId = null
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      userId = user.id
    }

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        user_id: userId,
        service_type: data.serviceType,
        provider_name: data.providerName,
        appointment_date: data.appointmentDate,
        appointment_time: data.appointmentTime,
        contact_name: data.contactName || null,
        contact_email: data.contactEmail || null,
        notes: data.notes || null,
        status: "scheduled",
      })
      .select()
      .single()

    if (error) {
      console.error("Appointment creation error:", error)
      return { success: false, error: "Failed to create appointment" }
    }

    revalidatePath("/appointments")

    return { success: true, data: appointment }
  } catch (error) {
    console.error("Create appointment error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getUserAppointments() {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("appointment_date", { ascending: true })

    if (error) {
      console.error("Get appointments error:", error)
      return { success: false, error: "Failed to fetch appointments" }
    }

    return { success: true, data: appointments }
  } catch (error) {
    console.error("Get user appointments error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function cancelAppointment(appointmentId: string) {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", appointmentId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Cancel appointment error:", error)
      return { success: false, error: "Failed to cancel appointment" }
    }

    revalidatePath("/appointments")

    return { success: true }
  } catch (error) {
    console.error("Cancel appointment error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
