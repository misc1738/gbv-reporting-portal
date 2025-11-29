"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, Lock, AlertCircle, File as FileIcon } from "lucide-react"
import { generateEncryptionKey, encryptFile, exportKey, arrayBufferToBase64 } from "@/lib/encryption"
import { uploadEvidence } from "@/app/actions/evidence"

interface EvidenceUploaderProps {
  reportId: string
  onUploadComplete?: () => void
}

type FileState = {
  id: string
  file: File
  preview?: string
  kind: "image" | "video" | "pdf" | "doc" | "other"
  status: "queued" | "encrypting" | "uploading" | "success" | "error"
  progress: number
  message?: string
  error?: string
}

const DEFAULT_MAX_BYTES = 10 * 1024 * 1024 // 10MB

export function EvidenceUploader({ reportId, onUploadComplete }: EvidenceUploaderProps) {
  const [files, setFiles] = useState<FileState[]>([])
  const [globalErrors, setGlobalErrors] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    return () => {
      // Cleanup previews
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
    }
  }, [files])

  const validateFile = (file: File) => {
    const allowed = ["image/", "video/", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const isAllowed = allowed.some((prefix) => file.type.startsWith(prefix) || file.name.endsWith(prefix)) || file.type === ""
    if (!isAllowed) return "Unsupported file type"
    if (file.size > DEFAULT_MAX_BYTES) return `File too large (max ${DEFAULT_MAX_BYTES / 1024 / 1024}MB)`
    return null
  }

  const getKind = (file: File) => {
    if (file.type.startsWith("image/")) return "image"
    if (file.type.startsWith("video/")) return "video"
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) return "pdf"
    if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) return "doc"
    return "other"
  }

  const handleFileSelection = (fileList: FileList) => {
    setGlobalErrors([])
    const newFiles: FileState[] = []
    const errors: string[] = []

    Array.from(fileList).forEach((file) => {
      const err = validateFile(file)
      if (err) {
        errors.push(`${file.name}: ${err}`)
        return
      }

      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined
      newFiles.push({
        id: `${Date.now()}-${file.name}`,
        file,
        preview,
        kind: getKind(file),
        status: "queued",
        progress: 0,
      })
    })

    if (errors.length > 0) setGlobalErrors(errors)
    if (newFiles.length > 0) setFiles((prev) => [...prev, ...newFiles])
  }

  const startUpload = async () => {
    if (files.length === 0) return
    setIsProcessing(true)

    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      if (f.status !== "queued") continue

      updateFile(f.id, { status: "encrypting", progress: 5, message: "Encrypting" })

      try {
        const encryptionKey = await generateEncryptionKey()
        const { encryptedData, iv } = await encryptFile(f.file, encryptionKey)
        const exportedKey = await exportKey(encryptionKey)
        const encryptedBase64 = arrayBufferToBase64(encryptedData)
        const ivBase64 = arrayBufferToBase64(iv.buffer)

        updateFile(f.id, { status: "uploading", progress: 40, message: "Uploading" })

        const formData = new FormData()
        formData.append("reportId", reportId)
        formData.append("fileName", f.file.name)
        formData.append("fileType", f.file.type)
        formData.append("fileSize", f.file.size.toString())
        formData.append("encryptedData", encryptedBase64)
        formData.append("encryptionKey", exportedKey)
        formData.append("iv", ivBase64)

        const result = await uploadEvidence(formData)

        if (!result.success) throw new Error(result.error || "Upload failed")

        updateFile(f.id, { status: "success", progress: 100, message: "Uploaded" })
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Upload failed"
        updateFile(f.id, { status: "error", progress: 0, error: errorMessage })
      }
    }

    setIsProcessing(false)
    onUploadComplete?.()
  }

  const updateFile = (id: string, patch: Partial<FileState>) => {
    setFiles((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const toRemove = prev.find((p) => p.id === id)
      if (toRemove?.preview) URL.revokeObjectURL(toRemove.preview)
      return prev.filter((p) => p.id !== id)
    })
  }

  return (
    <div className="space-y-4">
      <div className="relative border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:border-primary/50">
        <input
          type="file"
          multiple
          onChange={(e) => e.target.files && handleFileSelection(e.target.files)}
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        <div className="flex items-center gap-4 justify-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-base font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">Images, videos, PDFs, or documents (max 10MB each)</p>
          </div>
        </div>
      </div>

      {globalErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid Files</AlertTitle>
          <AlertDescription>
            {globalErrors.map((g, idx) => (
              <div key={idx}>{g}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-16 w-16 flex items-center justify-center bg-primary/5 rounded overflow-hidden">
                {f.kind === "image" && f.preview ? (
                  <img src={f.preview} alt={f.file.name} className="h-full w-full object-cover" />
                ) : (
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{f.file.name}</p>
                  <div className="text-xs text-muted-foreground">{(f.file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <div className="mt-2">
                  <Progress value={f.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-muted-foreground">{f.status === "queued" ? "Queued" : f.message ?? f.status}</span>
                    <div className="flex items-center gap-2">
                      {f.status === "error" && <span className="text-destructive">{f.error}</span>}
                      <button
                        className="text-sm text-muted-foreground hover:underline"
                        onClick={() => removeFile(f.id)}
                        disabled={isProcessing}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              onClick={startUpload}
              disabled={isProcessing || files.every((f) => f.status !== "queued")}
            >
              {isProcessing ? "Processing..." : "Start Upload"}
            </button>
            <button
              className="inline-flex items-center rounded-md bg-muted px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              onClick={() => setFiles([])}
              disabled={isProcessing}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>End-to-End Encryption</AlertTitle>
        <AlertDescription>
          Files are encrypted in your browser before upload. Keys are handled server-side; do not share files publicly.
        </AlertDescription>
      </Alert>
    </div>
  )
}
