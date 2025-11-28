import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminUsersPage() {
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

  const { data: users } = await supabase.from('users').select('id,email,full_name,role,created_at').order('created_at', { ascending: false }).limit(200)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Users</h1>
              <p className="text-lg text-muted-foreground">Manage registered users</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>List of users and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="px-2 py-2">ID</th>
                        <th className="px-2 py-2">Name</th>
                        <th className="px-2 py-2">Email</th>
                        <th className="px-2 py-2">Role</th>
                        <th className="px-2 py-2">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(users || []).map((u: any) => (
                        <tr key={u.id} className="border-t">
                          <td className="px-2 py-2 text-sm text-slate-700">{u.id}</td>
                          <td className="px-2 py-2 text-sm">{u.full_name ?? '-'}</td>
                          <td className="px-2 py-2 text-sm">{u.email ?? '-'}</td>
                          <td className="px-2 py-2 text-sm">{u.role}</td>
                          <td className="px-2 py-2 text-sm">{u.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
