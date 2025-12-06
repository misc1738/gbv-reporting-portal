/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { Download, FileDown } from 'lucide-react'

export default async function AdminReportsPage() {
  const supabase = await getSupabaseServerClient()

  const { data: reports } = await supabase
    .from('reports')
    .select('id,violence_type,incident_date,status,created_at,anonymous_id')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Reports</h1>
        <p className="text-lg text-muted-foreground">View and export incident reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Export Reports</span>
            <Button asChild size="sm">
              <a href="/api/reports/export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CSV
              </a>
            </Button>
          </CardTitle>
          <CardDescription>Download all reports in CSV format</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports ({reports?.length || 0})</CardTitle>
          <CardDescription>Latest submitted incident reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="px-4 py-3 font-semibold">Case ID</th>
                  <th className="px-4 py-3 font-semibold">Violence Type</th>
                  <th className="px-4 py-3 font-semibold">Incident Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(reports || []).map((r: any) => (
                  <tr key={r.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm">{r.anonymous_id}</td>
                    <td className="px-4 py-3 text-sm capitalize">{r.violence_type?.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3 text-sm">{r.incident_date ? new Date(r.incident_date).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          r.status === 'resolved' ? 'default' :
                          r.status === 'in_progress' ? 'secondary' :
                          'outline'
                        }
                      >
                        {r.status?.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/api/reports/${r.id}/export`} className="flex items-center gap-2">
                          <FileDown className="h-4 w-4" />
                          Export
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!reports || reports.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                No reports found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
