"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { ReportFormData } from "@/lib/types"

// Helper functions not exported
function generateAnonymousId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "GBV-"
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

function calculateRiskScore(data: ReportFormData): { score: number; level: string } {
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

export async function createReport(data: ReportFormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    return { success: false, error: "Configuration Error: Missing Database Credentials. Check Vercel Env Vars." }
  }

  try {
    const supabase = await getSupabaseServerClient()

    const anonymousId = generateAnonymousId()
    const { score, level } = calculateRiskScore(data)

    let userId = null
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) {
      console.warn("Auth check failed (user might be anon):", authError.message)
    }

    if (user && !data.isAnonymous) {
      userId = user.id
    }

    const reportId = crypto.randomUUID()
    const { error: reportError } = await supabase
      .from("reports")
      .insert({
        id: reportId,
        user_id: userId,
        anonymous_id: anonymousId,
        violence_type: data.violenceType,
        incident_date: data.incidentDate || null,
        incident_location: data.incidentLocation || null,
        description: data.description,
        status: "submitted",
        risk_level: level,
        is_anonymous: data.isAnonymous,
      })

    if (reportError) {
      console.error("Report creation error details:", JSON.stringify(reportError, null, 2))
      return { success: false, error: reportError.message || "Failed to create report" }
    }

    const { error: riskError } = await supabase
      .from("risk_assessments")
      .insert({
        report_id: reportId,
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
          report_id: reportId,
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
        reportId: reportId,
        anonymousId: anonymousId,
        riskLevel: level,
      },
    }
  } catch (error) {
    console.error("Create report critical error:", error)
    return { success: false, error: `Server Error: ${error instanceof Error ? error.message : "Unknown error"}` }
  }
}

export async function getReportByAnonymousId(anonymousId: string) {
  try {
    const supabase = await getSupabaseServerClient()

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
  try {
    const supabase = await getSupabaseServerClient()

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

export async function updateReportStatus(reportId: string, status: string) {
  try {
    const supabase = await getSupabaseServerClient()

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

    const { error } = await supabase
      .from("reports")
      .update({ status })
      .eq("id", reportId)

    if (error) {
      console.error("Update report status error:", error)
      return { success: false, error: "Failed to update status" }
    }


    revalidatePath("/admin/reports")
    return { success: true }
  } catch (error) {
    console.error("Update report status error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getDashboardStats() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: "Unauthorized" }

    // Fetch all reports with necessary columns for aggregation
    const { data: reports, error } = await supabase
      .from("reports")
      .select("id, created_at, violence_type, risk_level, status")
      .order("created_at", { ascending: true })

    if (error) throw error

    // 1. Monthly Trends (Last 12 months)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Simple aggregation by Month Name for now (assuming data is recent)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const monthlyStats = reports.reduce((acc: any, report) => {
      const date = new Date(report.created_at)
      const month = months[date.getMonth()]
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {})

    const overviewData = months.map(name => ({
      name,
      total: monthlyStats[name] || 0
    }))

    // 2. Violence Type Distribution
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const violenceStats = reports.reduce((acc: any, report) => {
      const type = report.violence_type?.replace(/_/g, ' ') || 'Unknown'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    const violenceData = Object.keys(violenceStats).map(name => ({
      name,
      value: violenceStats[name]
    }))

    // 3. Risk Level Distribution
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const riskStats = reports.reduce((acc: any, report) => {
      const level = report.risk_level || 'Unknown' // risk_level might be null in DB if old schema, but we added it.
      acc[level] = (acc[level] || 0) + 1
      return acc
    }, {})

    const riskData = [
      { name: 'Critical', value: riskStats['critical'] || 0, fill: '#ef4444' }, // red-500
      { name: 'High', value: riskStats['high'] || 0, fill: '#f97316' }, // orange-500
      { name: 'Medium', value: riskStats['medium'] || 0, fill: '#eab308' }, // yellow-500
      { name: 'Low', value: riskStats['low'] || 0, fill: '#22c55e' }, // green-500
    ].filter(item => item.value > 0)

    return {
      success: true,
      data: {
        overview: overviewData,
        violence: violenceData,
        risk: riskData,
        totalReports: reports.length,
        pendingReports: reports.filter(r => r.status === 'submitted' || r.status === 'in_progress').length,
        resolvedReports: reports.filter(r => r.status === 'resolved').length
      }
    }

  } catch (error) {
    console.error("Get dashboard stats error:", error)
    return { success: false, error: "Failed to fetch dashboard stats" }
  }
}
