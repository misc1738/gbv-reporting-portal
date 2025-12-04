/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminEvidencePage() {
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

  const { data: files } = await supabase
    .from('evidence_files')
    .select('id,report_id,file_name,file_type,file_size,storage_path,uploaded_at')
    .order('uploaded_at', { ascending: false })
    .limit(200)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Evidence Files</h1>
              <p className="text-lg text-muted-foreground">Manage uploaded evidence</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evidence Files</CardTitle>
                <CardDescription>List of uploaded evidence (encrypted references)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="px-2 py-2">ID</th>
                        <th className="px-2 py-2">Report ID</th>
                        <th className="px-2 py-2">File</th>
                        <th className="px-2 py-2">Type</th>
                        <th className="px-2 py-2">Size</th>
                        <th className="px-2 py-2">Uploaded</th>
                        <th className="px-2 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(files || []).map((f: any) => (
                        <tr key={f.id} className="border-t">
                          <td className="px-2 py-2 text-sm">{f.id}</td>
                          <td className="px-2 py-2 text-sm">{f.report_id}</td>
                          <td className="px-2 py-2 text-sm">{f.file_name}</td>
                          <td className="px-2 py-2 text-sm">{f.file_type}</td>
                          <td className="px-2 py-2 text-sm">{f.file_size}</td>
                          <td className="px-2 py-2 text-sm">{f.uploaded_at}</td>
                          <td className="px-2 py-2 text-sm">
                            <a
                              href={f.storage_path ?? '#'}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-xs font-medium text-white"
                            >
                              View
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
