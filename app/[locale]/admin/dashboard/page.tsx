/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { FileText, Files, Users, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient()

  const [{ count: reportsCount }, { count: evidenceCount }, { count: usersCount }] = await Promise.all([
    supabase.from('reports').select('id', { count: 'estimated', head: true }),
    supabase.from('evidence_files').select('id', { count: 'estimated', head: true }),
    supabase.from('users').select('id', { count: 'estimated', head: true }),
  ]).then((results) => results.map((r: any) => ({ count: r?.count ?? 0 })))

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">Monitor and manage SafeSpace platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reportsCount ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Incident reports submitted
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evidence Files</CardTitle>
            <Files className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{evidenceCount ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Secure evidence stored
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{usersCount ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active platform users
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/en/admin/reports"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Review Reports</h3>
              <p className="text-sm text-muted-foreground">View and manage incident reports</p>
            </a>
            <a
              href="/en/admin/users"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Manage Users</h3>
              <p className="text-sm text-muted-foreground">View and update user accounts</p>
            </a>
            <a
              href="/en/admin/evidence"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Evidence Vault</h3>
              <p className="text-sm text-muted-foreground">Access encrypted evidence files</p>
            </a>
            <a
              href="/en/admin/notifications"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Send Notifications</h3>
              <p className="text-sm text-muted-foreground">Communicate with users</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
