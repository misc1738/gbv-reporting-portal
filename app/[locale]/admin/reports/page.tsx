"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminReportsPage() {
  const supabase = await getSupabaseServerClient()

  // Ensure user is admin
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw new Error(userError.message)
    if (!user || !user.id) return redirect('/')

    const { data: userRecord, error: fetchUserError } = await supabase.from('users').select('role').eq('id', user.id).single()
    if (fetchUserError) return redirect('/')
    const role = (userRecord as any)?.role
    if (role !== 'admin') return redirect('/')
  } catch (e) {
    return redirect('/')
  }

  // Fetch recent reports
  const { data: reports } = await supabase.from('reports').select('id,violence_type,incident_date,status,created_at').order('created_at', { ascending: false }).limit(100)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Admin: Reports</h1>
              <p className="text-lg text-muted-foreground">Export and manage reports</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Exports</CardTitle>
                <CardDescription>Download all reports as CSV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <a
                    href="/api/reports/export"
                    className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                  >
                    Download CSV (all reports)
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="px-2 py-2">ID</th>
                        <th className="px-2 py-2">Type</th>
                        <th className="px-2 py-2">Date</th>
                        <th className="px-2 py-2">Status</th>
                        <th className="px-2 py-2">Created</th>
                        <th className="px-2 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(reports || []).map((r: any) => (
                        <tr key={r.id} className="border-t">
                          <td className="px-2 py-2 text-sm text-slate-700">{r.id}</td>
                          <td className="px-2 py-2 text-sm">{r.violence_type}</td>
                          <td className="px-2 py-2 text-sm">{r.incident_date ?? '-'}</td>
                          <td className="px-2 py-2 text-sm">{r.status}</td>
                          <td className="px-2 py-2 text-sm">{r.created_at}</td>
                          <td className="px-2 py-2 text-sm">
                            <a
                              href={`/api/reports/${r.id}/export`}
                              className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-xs font-medium text-white"
                            >
                              Export
                            </a>
                          </td>
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
