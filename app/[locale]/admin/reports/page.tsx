/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { ReportsTable } from '@/components/admin/reports-table'

export default async function AdminReportsPage() {
  const supabase = await getSupabaseServerClient()

  // Fetch all necessary fields for display and export
  const { data: reports } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Reports</h1>
        <p className="text-lg text-muted-foreground">Manage and track incident reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
          <CardDescription>
            View details, update status, and export report data.
            Risk levels are automatically calculated based on assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportsTable initialReports={reports || []} />
        </CardContent>
      </Card>
    </div>
  )
}
