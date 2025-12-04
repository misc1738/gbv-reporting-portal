/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminSettingsPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
              <p className="text-lg text-muted-foreground">Application configuration</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>Toggle application-level settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Placeholders for toggles like outbound email, evidence retention policy, and export settings.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
