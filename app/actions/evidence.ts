'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'


export async function uploadEvidence(formData: FormData) {
  const supabase = await getSupabaseServerClient()

  const reportId = formData.get('reportId') as string
  const fileName = formData.get('fileName') as string
  const fileType = formData.get('fileType') as string
  const fileSize = parseInt(formData.get('fileSize') as string)
  const encryptedData = formData.get('encryptedData') as string
  const encryptionKey = formData.get('encryptionKey') as string
  const iv = formData.get('iv') as string

  // Convert base64 back to buffer for storage
  const fileBuffer = Buffer.from(encryptedData, 'base64')
  const storagePath = `${reportId}/${Date.now()}-${fileName}`

  // 1. Upload to Supabase Storage
  const { error: uploadError } = await supabase
    .storage
    .from('evidence')
    .upload(storagePath, fileBuffer, {
      contentType: fileType,
      upsert: false
    })

  if (uploadError) {
    return { error: `Storage Error: ${uploadError.message}` }
  }

  // 2. Save metadata to Database
  const { error: dbError } = await supabase
    .from('evidence_files')
    .insert({
      report_id: reportId,
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      storage_path: storagePath,
      encryption_key: encryptionKey,
      iv: iv,
      uploaded_at: new Date().toISOString()
    })

  if (dbError) {
    // Cleanup storage if DB insert fails
    await supabase.storage.from('evidence').remove([storagePath])
    return { error: `Database Error: ${dbError.message}` }
  }

  revalidatePath(`/admin/evidence`)
  return { success: true }
}

export async function getSignedUrl(filePath: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .storage
    .from('evidence')
    .createSignedUrl(filePath, 3600) // 1 hour expiry

  if (error) {
    return { error: error.message }
  }

  return { url: data.signedUrl }
}

export async function getEvidenceFiles(reportId: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from('evidence_files')
    .select('*')
    .eq('report_id', reportId)
    .order('uploaded_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { success: true, data }
}

export async function deleteEvidence(evidenceId: string) {
  const supabase = getSupabaseAdminClient()

  // First get the file path to delete from storage
  const { data: fileData, error: fetchError } = await supabase
    .from('evidence_files')
    .select('storage_path')
    .eq('id', evidenceId)
    .single()

  if (fetchError) return { error: fetchError.message }

  const { error: storageError } = await supabase
    .storage
    .from('evidence')
    .remove([fileData.storage_path])

  if (storageError) return { error: storageError.message }

  const { error: dbError } = await supabase
    .from('evidence_files')
    .delete()
    .eq('id', evidenceId)

  if (dbError) return { error: dbError.message }

  revalidatePath('/admin/evidence')
  return { success: true }
}

export async function downloadEvidence(evidenceId: string) {
  const supabase = getSupabaseAdminClient()

  const { data: fileData, error: fetchError } = await supabase
    .from('evidence_files')
    .select('*')
    .eq('id', evidenceId)
    .single()

  if (fetchError) return { error: fetchError.message }

  const { data: signedUrlData, error: signedUrlError } = await supabase
    .storage
    .from('evidence')
    .createSignedUrl(fileData.storage_path, 60) // 1 minute expiry for download

  if (signedUrlError) return { error: signedUrlError.message }

  return {
    success: true,
    data: {
      url: signedUrlData.signedUrl,
      encryptionKey: fileData.encryption_key,
      iv: fileData.iv, // Assuming IV is stored, if not handled in key
      fileName: fileData.file_name
    }
  }
}
