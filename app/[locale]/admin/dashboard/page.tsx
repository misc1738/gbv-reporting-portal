/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OverviewChart } from '@/components/admin/overview-chart'
import { ViolenceDistributionChart } from '@/components/admin/violence-distribution-chart'
import { RiskLevelChart } from '@/components/admin/risk-level-chart'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getDashboardStats } from '@/app/actions/reports'
import { FileText, Files, Users, TrendingUp, AlertTriangle } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient()

  // Fetch basic counts
  const [{ count: evidenceCount }, { count: usersCount }] = await Promise.all([
    supabase.from('evidence_files').select('id', { count: 'estimated', head: true }),
    supabase.from('users').select('id', { count: 'estimated', head: true }),
  ]).then((results) => results.map((r: any) => ({ count: r?.count ?? 0 })))

  // Fetch detailed stats
  const statsResult = await getDashboardStats()
  const stats = statsResult.success ? statsResult.data : null

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">Monitor and manage SafeSpace platform</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalReports ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Incident reports submitted
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.pendingReports ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In Progress or Submitted
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

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Report Trends</CardTitle>
            <CardDescription>Monthly incident reports</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={stats?.overview || []} />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Violence Distribution</CardTitle>
            <CardDescription>Reports by violence type</CardDescription>
          </CardHeader>
          <CardContent>
            <ViolenceDistributionChart data={stats?.violence || []} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Risk Levels</CardTitle>
            <CardDescription>Severity of reported incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskLevelChart data={stats?.risk || []} />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/en/admin/reports"
                className="p-4 border rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Review Reports</h3>
                  <p className="text-sm text-muted-foreground">View and manage incident reports</p>
                </div>
              </a>
              <a
                href="/en/admin/users"
                className="p-4 border rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Manage Users</h3>
                  <p className="text-sm text-muted-foreground">View and update user accounts</p>
                </div>
              </a>
              <a
                href="/en/admin/evidence"
                className="p-4 border rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Evidence Vault</h3>
                  <p className="text-sm text-muted-foreground">Access encrypted evidence files</p>
                </div>
              </a>
              <a
                href="/en/admin/notifications"
                className="p-4 border rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Send Notifications</h3>
                  <p className="text-sm text-muted-foreground">Communicate with users</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
