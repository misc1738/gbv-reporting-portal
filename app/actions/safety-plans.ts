"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface CreateSafetyPlanData {
  emergencyContacts?: Array<{ name: string; phone: string; relationship: string }>
  safeLocations?: Array<{ name: string; address: string; notes?: string }>
  escapePlan?: string
  importantDocuments?: string[]
  financialResources?: string
  supportNetwork?: unknown
}

export async function createSafetyPlan(data: CreateSafetyPlanData) {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const { data: safetyPlan, error } = await supabase
      .from("safety_plans")
      .insert({
        user_id: user.id,
        emergency_contacts: data.emergencyContacts || [],
        safe_locations: data.safeLocations || [],
        escape_plan: data.escapePlan || null,
        important_documents: data.importantDocuments || [],
        financial_resources: data.financialResources || null,
        support_network: data.supportNetwork || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Safety plan creation error:", error)
      return { success: false, error: "Failed to create safety plan" }
    }

    revalidatePath("/safety-plan")

    return { success: true, data: safetyPlan }
  } catch (error) {
    console.error("Create safety plan error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateSafetyPlan(planId: string, data: CreateSafetyPlanData) {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const { data: safetyPlan, error } = await supabase
      .from("safety_plans")
      .update({
        emergency_contacts: data.emergencyContacts || [],
        safe_locations: data.safeLocations || [],
        escape_plan: data.escapePlan || null,
        important_documents: data.importantDocuments || [],
        financial_resources: data.financialResources || null,
        support_network: data.supportNetwork || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", planId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("Safety plan update error:", error)
      return { success: false, error: "Failed to update safety plan" }
    }

    revalidatePath("/safety-plan")

    return { success: true, data: safetyPlan }
  } catch (error) {
    console.error("Update safety plan error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getUserSafetyPlans() {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const { data: safetyPlans, error } = await supabase
      .from("safety_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Get safety plans error:", error)
      return { success: false, error: "Failed to fetch safety plans" }
    }

    return { success: true, data: safetyPlans }
  } catch (error) {
    console.error("Get user safety plans error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
