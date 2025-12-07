"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileIcon, Image, Video, FileText, Search, Download, Eye, Loader2 } from "lucide-react"
import { getSignedUrl } from "@/app/actions/evidence"
import { useToast } from "@/components/ui/use-toast"

interface EvidenceFile {
    id: string
    report_id: string
    file_name: string
    file_type: string
    file_size: number
    storage_path: string
    uploaded_at: string
}

export function EvidenceTable({ initialFiles }: { initialFiles: EvidenceFile[] }) {
    const [files] = useState(initialFiles)
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [previewType, setPreviewType] = useState<string | null>(null)
    const { toast } = useToast()

    const filteredFiles = files.filter(file =>
        file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.report_id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }

    const getFileIcon = (type: string) => {
        if (type?.startsWith('image/')) return Image
        if (type?.startsWith('video/')) return Video
        if (type?.includes('pdf')) return FileText
        return FileIcon
    }

    async function handleAction(file: EvidenceFile, action: 'preview' | 'download') {
        setLoading(file.id)
        const result = await getSignedUrl(file.storage_path)

        if (result.url) {
            if (action === 'download') {
                window.open(result.url, '_blank')
            } else {
                setPreviewType(file.file_type)
                setPreviewUrl(result.url)
            }
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error || "Failed to access file" })
        }
        setLoading(null)
    }

    return (
        <div className="space-y-4">
            <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by filename or report ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Report ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredFiles.map((file) => {
                            const Icon = getFileIcon(file.file_type)
                            return (
                                <TableRow key={file.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{file.file_name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{file.report_id}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{file.file_type}</Badge>
                                    </TableCell>
                                    <TableCell>{formatFileSize(file.file_size)}</TableCell>
                                    <TableCell>{new Date(file.uploaded_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={loading === file.id}
                                                onClick={() => handleAction(file, 'preview')}
                                            >
                                                {loading === file.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={loading === file.id}
                                                onClick={() => handleAction(file, 'download')}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>File Preview</DialogTitle>
                    </DialogHeader>
                    {previewUrl && (
                        <div className="flex justify-center">
                            {previewType?.startsWith('image/') ? (
                                <div className="relative w-full h-auto">
                                    <Image
                                        src={previewUrl}
                                        alt="Evidence Preview"
                                        width={800}
                                        height={600}
                                        className="rounded-lg object-contain"
                                        unoptimized
                                    />
                                </div>
                            ) : previewType?.startsWith('video/') ? (
                                <video src={previewUrl} controls className="max-w-full h-auto rounded-lg" />
                            ) : (
                                <div className="text-center py-10">
                                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <p>Preview not available for this file type.</p>
                                    <Button variant="outline" asChild className="mt-4">
                                        <a href={previewUrl} target="_blank" rel="noreferrer">Download to View</a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
