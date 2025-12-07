/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersTable } from '@/components/admin/users-table'
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
          <UsersTable initialUsers={users || []} />
        </CardContent>
      </Card>
    </div>
  )
}
