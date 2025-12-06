/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { FileIcon, Image, Video, FileText } from 'lucide-react'

export default async function AdminEvidencePage() {
  const supabase = await getSupabaseServerClient()

  const { data: files } = await supabase
    .from('evidence_files')
    .select('id,report_id,file_name,file_type,file_size,storage_path,uploaded_at')
    .order('uploaded_at', { ascending: false })
    .limit(200)

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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Evidence Files</h1>
        <p className="text-lg text-muted-foreground">Manage uploaded evidence securely</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Vault ({files?.length || 0} files)</CardTitle>
          <CardDescription>All encrypted evidence files uploaded by users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="px-4 py-3 font-semibold">File</th>
                  <th className="px-4 py-3 font-semibold">Report ID</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {(files || []).map((f: any) => {
                  const Icon = getFileIcon(f.file_type)
                  return (
                    <tr key={f.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{f.file_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-muted-foreground">{f.report_id}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs">
                          {f.file_type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{formatFileSize(f.file_size || 0)}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(f.uploaded_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {(!files || files.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                No evidence files uploaded yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
