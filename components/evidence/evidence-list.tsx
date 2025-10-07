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
    </div>
  )
}
