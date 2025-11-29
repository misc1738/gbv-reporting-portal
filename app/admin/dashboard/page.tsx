/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient()

  // Admin check
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError) throw new Error(userError.message)
    if (!user || !user.id) return null

    const { data: userRecord, error: fetchUserError } = await supabase.from('users').select('role').eq('id', user.id).single()
    if (fetchUserError) return null
    const role = (userRecord as any)?.role
    if (role !== 'admin') return null
  } catch (e) {
    return null
  }

  // Fetch counts
  const [{ count: reportsCount }, { count: evidenceCount }, { count: usersCount }] = await Promise.all([
    supabase.from('reports').select('id', { count: 'estimated', head: true }),
    supabase.from('evidence_files').select('id', { count: 'estimated', head: true }),
    supabase.from('users').select('id', { count: 'estimated', head: true }),
  ]).then((results) => results.map((r: any) => ({ count: r?.count ?? 0 })))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground">Overview of reports and evidence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Total submitted reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reportsCount ?? 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evidence Files</CardTitle>
                  <CardDescription>Files uploaded to evidence vault</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{evidenceCount ?? 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{usersCount ?? 0}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
