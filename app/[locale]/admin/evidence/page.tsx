import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { EvidenceTable } from '@/components/admin/evidence-table'

export default async function AdminEvidencePage() {
  const supabase = await getSupabaseServerClient()

  const { data: files } = await supabase
    .from('evidence_files')
    .select('id,report_id,file_name,file_type,file_size,storage_path,uploaded_at')
    .order('uploaded_at', { ascending: false })
    .limit(200)



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
          <EvidenceTable initialFiles={files || []} />
        </CardContent>
      </Card>
    </div>
  )
}
