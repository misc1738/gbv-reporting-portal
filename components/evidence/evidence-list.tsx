"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { File, Download, Trash2, Lock } from "lucide-react"
import { getEvidenceFiles, deleteEvidence, downloadEvidence } from "@/app/actions/evidence"
import { importKey, decryptFile, base64ToArrayBuffer } from "@/lib/encryption"
import type { EvidenceFile } from "@/lib/types"

interface EvidenceListProps {
  reportId: string
}

export function EvidenceList({ reportId }: EvidenceListProps) {
  const [files, setFiles] = useState<EvidenceFile[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [previewing, setPreviewing] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    loadFiles()
  }, [reportId])

  const loadFiles = async () => {
    setLoading(true)
    const result = await getEvidenceFiles(reportId)
    if (result.success && result.data) {
      setFiles(result.data)
    }
    setLoading(false)
  }

  const handleDownload = async (evidenceId: string) => {
    setDownloading(evidenceId)

    try {
      const result = await downloadEvidence(evidenceId)

      if (!result.success || !result.data) {
        throw new Error(result.error || "Download failed")
      }

      // Fetch encrypted file
      const response = await fetch(result.data.url)
      const encryptedData = await response.arrayBuffer()

      // Import encryption key
      const key = await importKey(result.data.encryptionKey)

      // Decrypt file
      const iv = new Uint8Array(base64ToArrayBuffer(result.data.iv))
      const decryptedData = await decryptFile(encryptedData, key, iv)

      // Create download link
      const blob = new Blob([decryptedData])
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = result.data.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Download error:", error)
      alert("Failed to download file")
    } finally {
      setDownloading(null)
    }
  }

  const handlePreview = async (file: EvidenceFile) => {
    // only images supported for inline preview
    if (!file.file_type.startsWith("image/")) {
      alert("Preview available for images only")
      return
    }

    setPreviewing(file.id)

    try {
      const result = await downloadEvidence(file.id)

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to get preview data")
      }

      const response = await fetch(result.data.url)
      const encryptedData = await response.arrayBuffer()

      const key = await importKey(result.data.encryptionKey)
      const iv = new Uint8Array(base64ToArrayBuffer(result.data.iv))
      const decryptedData = await decryptFile(encryptedData, key, iv)

      const blob = new Blob([decryptedData], { type: file.file_type })
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    } catch (error) {
      console.error("[v0] Preview error:", error)
      alert("Failed to generate preview")
    } finally {
      setPreviewing(null)
    }
  }

  const handleDelete = async (evidenceId: string) => {
    if (!confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      return
    }

    const result = await deleteEvidence(evidenceId)

    if (result.success) {
      setFiles(files.filter((f) => f.id !== evidenceId))
    } else {
      alert(result.error || "Failed to delete file")
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading evidence files...</div>
  }

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Evidence Files</CardTitle>
          <CardDescription>Upload files to add evidence to this report</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card key={file.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <File className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.file_name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatFileSize(file.file_size)}</span>
                    <span>•</span>
                    <span>{new Date(file.uploaded_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <Lock className="h-3 w-3" />
                    <span>Encrypted</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {file.file_type.startsWith("image/") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(file)}
                    disabled={previewing === file.id}
                  >
                    {previewing === file.id ? "Loading..." : "Preview"}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(file.id)}
                  disabled={downloading === file.id}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {downloading === file.id ? "Downloading..." : "Download"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(file.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true">
          <div className="bg-white rounded shadow p-4 max-w-3xl w-full relative">
            <div className="flex justify-end absolute top-2 right-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  URL.revokeObjectURL(previewUrl)
                  setPreviewUrl(null)
                }}
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <img src={previewUrl} alt="Preview" className="max-h-[70vh] w-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
