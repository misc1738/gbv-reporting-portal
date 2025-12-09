/**
 * Type definitions for the application.
 */
export type UserRole = "adolescent" | "counselor" | "ngo" | "police" | "admin"

export type ReportStatus = "submitted" | "under_review" | "assigned" | "in_progress" | "resolved" | "closed"

export type ViolenceType = "physical" | "sexual" | "emotional" | "economic" | "online" | "other"

export type RiskLevel = "low" | "medium" | "high" | "critical"

/**
 * Represents a user in the system.
 */
export interface User {
  id: string
  email?: string
  phone?: string
  role: UserRole
  full_name?: string
  age?: number
  county: string
  sub_county?: string
  preferred_language: string
  created_at: string
  updated_at: string
  last_login?: string
  is_active: boolean
}

/**
 * Represents a GBV report.
 */
export interface Report {
  id: string
  user_id?: string
  anonymous_id?: string
  violence_type: ViolenceType
  incident_date?: string
  incident_location?: string
  incident_coordinates?: {
    latitude: number
    longitude: number
  }
  description: string
  status: ReportStatus
  risk_level?: RiskLevel
  is_anonymous: boolean
  assigned_to?: string
  created_at: string
  updated_at: string
}

/**
 * Data structure for the report submission form.
 */
export interface ReportFormData {
  // Incident Details
  violenceType: ViolenceType
  incidentDate?: string
  incidentLocation?: string
  description: string
  isAnonymous: boolean

  // Contact Info
  contactMethod?: "phone" | "email" | "none"
  contactDetails?: string
  ageGroup?: string
  gender?: string

  // Risk Assessment
  immediateDanger?: boolean
  hasWeapons?: boolean
  threatsMade?: boolean
  previousViolence?: boolean
  substanceAbuse?: boolean
  isolation?: boolean
  financialControl?: boolean

  // Safety Plan
  emergencyContacts?: Array<{ name: string; phone: string; relationship: string }>
  safeLocations?: Array<{ name: string; address: string; notes?: string }>
  escapePlan?: string
  importantDocuments?: string[]

  // Evidence
  evidenceFiles?: EvidenceFile[]
}

/**
 * Represents an evidence file associated with a report.
 */
export interface EvidenceFile {
  id: string
  report_id: string
  file_name: string
  file_type: string
  file_size: number
  storage_path: string
  encryption_key: string
  uploaded_at: string
  uploaded_by?: string
}

/**
 * Represents a risk assessment for a report.
 */
export interface RiskAssessment {
  id: string
  report_id: string
  immediate_danger: boolean
  has_weapons: boolean
  threats_made: boolean
  previous_violence: boolean
  substance_abuse: boolean
  isolation: boolean
  financial_control: boolean
  risk_score: number
  risk_level: RiskLevel
  recommendations?: string
  created_at: string
}

/**
 * Represents a safety plan for a user.
 */
export interface SafetyPlan {
  id: string
  report_id: string
  user_id: string
  emergency_contacts: Array<{
    name: string
    phone: string
    relationship: string
  }>
  safe_locations: Array<{
    name: string
    address: string
    notes?: string
  }>
  escape_plan?: string
  important_documents: string[]
  financial_resources?: string
  support_network: Array<{
    name: string
    type: string
    contact: string
  }>
  created_at: string
  updated_at: string
}

/**
 * Represents a service provider (e.g., hospital, shelter, legal aid).
 */
export interface ServiceProvider {
  id: string
  name: string
  type: string
  description?: string
  address?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  phone?: string
  email?: string
  website?: string
  operating_hours?: Record<string, string>
  services_offered?: string[]
  county: string
  sub_county?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

/**
 * Represents a referral to a service provider.
 */
export interface Referral {
  id: string
  report_id: string
  service_provider_id: string
  referred_by?: string
  status: "pending" | "accepted" | "completed" | "declined"
  notes?: string
  created_at: string
  updated_at: string
}

/**
 * Represents an update on a case/report.
 */
export interface CaseUpdate {
  id: string
  report_id: string
  updated_by?: string
  update_type: string
  message: string
  is_visible_to_reporter: boolean
  created_at: string
}

/**
 * Represents a notification for a user.
 */
export interface Notification {
  id: string
  user_id: string
  report_id?: string
  type: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

/**
 * Standard API response structure.
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Standard paginated response structure.
 */
export interface PaginatedResponse<T = unknown> {
  data: T[]
  total: number
  page: number
  limit: number
}

/**
 * Represents a learning module.
 */
export interface LearningModule {
  id: string
  title: string
  description?: string
  content: unknown
  category: string
  difficulty_level: string
  estimated_time: number
  points: number
  sdg_alignment: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

/**
 * Tracks user progress in a learning module.
 */
export interface UserProgress {
  id: string
  user_id: string
  module_id: string
  completed: boolean
  score?: number
  time_spent: number
  completed_at?: string
  created_at: string
}

/**
 * Represents a gamification badge.
 */
export interface Badge {
  id: string
  name: string
  description?: string
  icon?: string
  criteria: unknown
  points: number
  created_at: string
}

/**
 * Represents a badge earned by a user.
 */
export interface UserBadge {
  id: string
  user_id: string
  badge_id: string
  earned_at: string
}
