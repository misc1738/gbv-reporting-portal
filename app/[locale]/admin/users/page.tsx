/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminUsersPage() {
  const supabase = await getSupabaseServerClient()

  const { data: users } = await supabase
    .from('users')
    .select('id,email,full_name,role,created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Users</h1>
        <p className="text-lg text-muted-foreground">Manage registered users and their roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users ({users?.length || 0})</CardTitle>
          <CardDescription>View all platform users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {(users || []).map((u: any) => (
                  <tr key={u.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">{u.full_name || '-'}</td>
                    <td className="px-4 py-3 text-sm">{u.email || '-'}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          u.role === 'admin' ? 'destructive' :
                          u.role === 'counselor' ? 'default' :
                          u.role === 'ngo' ? 'secondary' :
                          u.role === 'police' ? 'outline' :
                          'secondary'
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!users || users.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
