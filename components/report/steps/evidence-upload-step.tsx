/**
 * Evidence Upload Step component.
 * Allows users to upload and manage evidence files.
 */
"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, File, X, Lock } from "lucide-react"
import type { ReportFormData } from "@/lib/types"

interface EvidenceUploadStepProps {
  data: Omit<ReportFormData, "evidenceFiles"> & { evidenceFiles: File[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

/**
 * Evidence Upload Step component.
 */
export function EvidenceUploadStep({ data, updateData, onNext, onBack }: EvidenceUploadStepProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newFiles = [...(data.evidenceFiles || []), ...files]
    updateData({ evidenceFiles: newFiles })
  }

  const removeFile = (index: number) => {
    const newFiles = data.evidenceFiles.filter((_, i) => i !== index)
    updateData({ evidenceFiles: newFiles })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Upload Evidence (Optional)</h3>
          <p className="text-sm text-muted-foreground">
            You can upload photos, videos, screenshots, or documents that support your report. All files are encrypted
            and stored securely.
          </p>
        </div>

        <Alert>
          <Lock className="h-4 w-4" />
          <AlertTitle>End-to-End Encryption</AlertTitle>
          <AlertDescription>
            All uploaded files are encrypted on your device before upload using AES-256 encryption. Only authorized
            support staff can access them with your permission.
          </AlertDescription>
        </Alert>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleChange}
            accept="image/*,video/*,.pdf,.doc,.docx"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Label htmlFor="file-upload" className="text-base font-medium cursor-pointer">
                Click to upload or drag and drop
              </Label>
              <p className="text-sm text-muted-foreground mt-1">Images, videos, PDFs, or documents (max 10MB each)</p>
            </div>
          </div>
        </div>

        {data.evidenceFiles.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Uploaded Files ({data.evidenceFiles.length})</Label>
            <div className="space-y-2">
              {data.evidenceFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="flex-shrink-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Continue to Safety Plan
        </Button>
      </div>
    </div>
  )
}
