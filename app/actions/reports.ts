"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface CreateReportData {
  violenceType: string
  incidentDate?: string
  incidentLocation?: string
  description: string
  isAnonymous: boolean
  immediateDanger?: boolean
  hasWeapons?: boolean
  threatsMade?: boolean
  previousViolence?: boolean
  substanceAbuse?: boolean
  isolation?: boolean
  financialControl?: boolean
  emergencyContacts?: Array<{ name: string; phone: string; relationship: string }>
  safeLocations?: Array<{ name: string; address: string; notes?: string }>
  escapePlan?: string
  importantDocuments?: string[]
  demographics?: {
    ageGroup?: string
    gender?: string
    isDisplaced?: boolean
  }
  perpetratorDetails?: {
    relationship?: string
    knownToVictim?: boolean
    multiplePerpetrators?: boolean
  }
}

function generateAnonymousId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "GBV-"
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

function calculateRiskScore(data: CreateReportData): { score: number; level: string } {
  let score = 0

  if (data.immediateDanger) score += 20
  if (data.hasWeapons) score += 15
  if (data.threatsMade) score += 15
  if (data.previousViolence) score += 15
  if (data.substanceAbuse) score += 10
  if (data.isolation) score += 10
  if (data.financialControl) score += 10

  let level = "low"
  if (score >= 70) level = "critical"
  else if (score >= 50) level = "high"
  else if (score >= 30) level = "medium"

  return { score, level }
}

export async function createReport(data: CreateReportData) {
  const supabase = await getSupabaseServerClient()

  try {
    const anonymousId = generateAnonymousId()
    const { score, level } = calculateRiskScore(data)

    let userId = null
    const { data: { user } } = await supabase.auth.getUser()
    if (user && !data.isAnonymous) {
      userId = user.id
    }

    const { data: report, error: reportError } = await supabase
      .from("reports")
      .insert({
        user_id: userId,
        anonymous_id: anonymousId,
        violence_type: data.violenceType,
        incident_date: data.incidentDate || null,
        incident_location: data.incidentLocation || null,
        description: data.description,
        demographics: data.demographics || null,
        perpetrator_details: data.perpetratorDetails || null,
        status: "submitted",
        risk_level: level,
        is_anonymous: data.isAnonymous,
      })
      .select()
      .single()

    if (reportError) {
      console.error("Report creation error:", reportError)
      return { success: false, error: "Failed to create report" }
    }

    const { error: riskError } = await supabase
      .from("risk_assessments")
      .insert({
        report_id: report.id,
        immediate_danger: data.immediateDanger || false,
        has_weapons: data.hasWeapons || false,
        threats_made: data.threatsMade || false,
        previous_violence: data.previousViolence || false,
        substance_abuse: data.substanceAbuse || false,
        isolation: data.isolation || false,
        financial_control: data.financialControl || false,
        risk_score: score,
        risk_level: level,
      })

    if (riskError) {
      console.error("Risk assessment error:", riskError)
    }

    if (userId && (data.emergencyContacts || data.safeLocations || data.escapePlan)) {
      const { error: safetyError } = await supabase
        .from("safety_plans")
        .insert({
          report_id: report.id,
          user_id: userId,
          emergency_contacts: data.emergencyContacts || [],
          safe_locations: data.safeLocations || [],
          escape_plan: data.escapePlan || null,
          important_documents: data.importantDocuments || [],
        })

      if (safetyError) {
        console.error("Safety plan error:", safetyError)
      }
    }

    revalidatePath("/report")

    return {
      success: true,
      data: {
        reportId: report.id,
        anonymousId: anonymousId,
        riskLevel: level,
      },
    }
  } catch (error) {
    console.error("Create report error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getReportByAnonymousId(anonymousId: string) {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: report, error } = await supabase
      .from("reports")
      .select(`
        id,
        anonymous_id,
        violence_type,
        incident_date,
        status,
        created_at,
        case_updates (
          id,
          message,
          created_at,
          is_visible_to_reporter
        )
      `)
      .eq("anonymous_id", anonymousId.toUpperCase())
      .maybeSingle()

    if (error) {
      console.error("Get report error:", error)
      return { success: false, error: "Failed to fetch report" }
    }

    if (!report) {
      return { success: false, error: "Report not found" }
    }

    return { success: true, data: report }
  } catch (error) {
    console.error("Get report by anonymous ID error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getAllReports() {
  const supabase = await getSupabaseServerClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Unauthorized" }
    }

    const { data: userRecord } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()

    if (!userRecord || !["admin", "counselor", "ngo", "police"].includes(userRecord.role)) {
      return { success: false, error: "Insufficient permissions" }
    }

    const { data: reports, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Get all reports error:", error)
      return { success: false, error: "Failed to fetch reports" }
    }

    return { success: true, data: reports }
  } catch (error) {
    console.error("Get all reports error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
