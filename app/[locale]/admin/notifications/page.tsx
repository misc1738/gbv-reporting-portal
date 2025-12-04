/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminNotificationsPage() {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
              <p className="text-lg text-muted-foreground">Send confirmation messages or admin alerts</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send Notification</CardTitle>
                <CardDescription>Quick test UI to create a notification (server action not implemented)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This UI is a placeholder. Implement server actions to send emails or create notification records.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
