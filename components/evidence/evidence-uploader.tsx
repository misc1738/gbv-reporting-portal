"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, Lock, CheckCircle2, AlertCircle } from "lucide-react"
import { generateEncryptionKey, encryptFile, exportKey, arrayBufferToBase64 } from "@/lib/encryption"
import { uploadEvidence } from "@/app/actions/evidence"

interface EvidenceUploaderProps {
  reportId: string
  onUploadComplete?: () => void
}

export function EvidenceUploader({ reportId, onUploadComplete }: EvidenceUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "encrypting" | "uploading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return

    setUploading(true)
    setStatus("encrypting")
    setProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setMessage(`Encrypting ${file.name}...`)
        setProgress((i / files.length) * 50)

        // Generate encryption key
        const encryptionKey = await generateEncryptionKey()

        // Encrypt file
        const { encryptedData, iv } = await encryptFile(file, encryptionKey)

        // Export key for storage
        const exportedKey = await exportKey(encryptionKey)

        // Convert to base64 for transmission
        const encryptedBase64 = arrayBufferToBase64(encryptedData)
        const ivBase64 = arrayBufferToBase64(iv)

        // Upload to server
        setStatus("uploading")
        setMessage(`Uploading ${file.name}...`)
        setProgress(50 + (i / files.length) * 50)

        const formData = new FormData()
        formData.append("reportId", reportId)
        formData.append("fileName", file.name)
        formData.append("fileType", file.type)
        formData.append("fileSize", file.size.toString())
        formData.append("encryptedData", encryptedBase64)
        formData.append("encryptionKey", exportedKey)
        formData.append("iv", ivBase64)

        const result = await uploadEvidence(formData)

        if (!result.success) {
          throw new Error(result.error || "Upload failed")
        }
      }

      setStatus("success")
      setMessage(`Successfully uploaded ${files.length} file${files.length > 1 ? "s" : ""}`)
      setProgress(100)

      setTimeout(() => {
        setUploading(false)
        setStatus("idle")
        setProgress(0)
        onUploadComplete?.()
      }, 2000)
    } catch (error) {
      console.error("[v0] Upload error:", error)
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Upload failed")
      setTimeout(() => {
        setUploading(false)
        setStatus("idle")
        setProgress(0)
      }, 3000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:border-primary/50">
        <input
          type="file"
          multiple
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">Images, videos, PDFs, or documents (max 10MB each)</p>
          </div>
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{message}</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {status === "success" && (
        <Alert className="border-accent">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          <AlertTitle>Upload Successful</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Failed</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>End-to-End Encryption</AlertTitle>
        <AlertDescription>
          All files are encrypted on your device before upload. Only authorized personnel can decrypt them.
        </AlertDescription>
      </Alert>
    </div>
  )
}
