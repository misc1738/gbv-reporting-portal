"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function uploadEvidence(formData: FormData) {
  const supabase = await getSupabaseServerClient()

  const reportId = formData.get("reportId") as string
  const fileName = formData.get("fileName") as string
  const fileType = formData.get("fileType") as string
  const fileSize = Number.parseInt(formData.get("fileSize") as string)
  const encryptedData = formData.get("encryptedData") as string
  const encryptionKey = formData.get("encryptionKey") as string
  const iv = formData.get("iv") as string

  try {
    // Store encrypted file in Supabase Storage
    const storagePath = `evidence/${reportId}/${Date.now()}-${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("evidence-vault")
      .upload(storagePath, Buffer.from(encryptedData, "base64"), {
        contentType: "application/octet-stream",
        upsert: false,
      })

    if (uploadError) {
      console.error("[v0] Upload error:", uploadError)
      return { success: false, error: "Failed to upload file" }
    }

    // Store metadata in database
    const { data, error: dbError } = await supabase
      .from("evidence_files")
      .insert({
        report_id: reportId,
        file_name: fileName,
        file_type: fileType,
        file_size: fileSize,
        storage_path: storagePath,
        encryption_key: encryptionKey, // In production, this should be encrypted with a master key
        iv: iv,
      })
      .select()
      .single()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      // Clean up uploaded file
      await supabase.storage.from("evidence-vault").remove([storagePath])
      return { success: false, error: "Failed to save file metadata" }
    }

    revalidatePath(`/report/${reportId}`)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Upload evidence error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getEvidenceFiles(reportId: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("evidence_files")
    .select("*")
    .eq("report_id", reportId)
    .order("uploaded_at", { ascending: false })

  if (error) {
    console.error("[v0] Get evidence files error:", error)
    return { success: false, error: "Failed to fetch evidence files" }
  }

  return { success: true, data }
}

export async function deleteEvidence(evidenceId: string) {
  const supabase = await getSupabaseServerClient()

  // Get file info first
  const { data: evidence, error: fetchError } = await supabase
    .from("evidence_files")
    .select("storage_path")
    .eq("id", evidenceId)
    .single()

  if (fetchError || !evidence) {
    return { success: false, error: "Evidence file not found" }
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage.from("evidence-vault").remove([evidence.storage_path])

  if (storageError) {
    console.error("[v0] Storage deletion error:", storageError)
    return { success: false, error: "Failed to delete file from storage" }
  }

  // Delete from database
  const { error: dbError } = await supabase.from("evidence_files").delete().eq("id", evidenceId)

  if (dbError) {
    console.error("[v0] Database deletion error:", dbError)
    return { success: false, error: "Failed to delete file metadata" }
  }

  return { success: true }
}

export async function downloadEvidence(evidenceId: string) {
  const supabase = await getSupabaseServerClient()

  // Get file info
  const { data: evidence, error: fetchError } = await supabase
    .from("evidence_files")
    .select("*")
    .eq("id", evidenceId)
    .single()

  if (fetchError || !evidence) {
    return { success: false, error: "Evidence file not found" }
  }

  // Get signed URL for download
  const { data: urlData, error: urlError } = await supabase.storage
    .from("evidence-vault")
    .createSignedUrl(evidence.storage_path, 60) // 60 seconds expiry

  if (urlError || !urlData) {
    console.error("[v0] URL generation error:", urlError)
    return { success: false, error: "Failed to generate download URL" }
  }

  return {
    success: true,
    data: {
      url: urlData.signedUrl,
      fileName: evidence.file_name,
      encryptionKey: evidence.encryption_key,
      iv: evidence.iv,
    },
  }
}
