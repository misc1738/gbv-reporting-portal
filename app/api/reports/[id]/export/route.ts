import { getSupabaseServerClient } from '@/lib/supabase/server'

function escapeCsv(value: any) {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await getSupabaseServerClient()

  // Auth + role check (same as bulk export)
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) return new Response(JSON.stringify({ error: userError.message }), { status: 401 })
    if (!user || !user.id) return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })

    const { data: userRecord, error: fetchUserError } = await supabase.from('users').select('role').eq('id', user.id).single()
    if (fetchUserError) return new Response(JSON.stringify({ error: fetchUserError.message }), { status: 403 })
    const role = (userRecord as any)?.role
    if (role !== 'admin') return new Response(JSON.stringify({ error: 'Forbidden: admin only' }), { status: 403 })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'Auth check failed' }), { status: 500 })
  }

  const { data, error } = await supabase
    .from('reports')
    .select(
      `id,user_id,anonymous_id,violence_type,incident_date,incident_location,description,status,risk_level,is_anonymous,assigned_to,created_at,updated_at`
    )
    .eq('id', id)
    .single()

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  const r = data
  if (!r) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })

  const headers = [
    'id',
    'user_id',
    'anonymous_id',
    'violence_type',
    'incident_date',
    'incident_location',
    'description',
    'status',
    'risk_level',
    'is_anonymous',
    'assigned_to',
    'created_at',
    'updated_at',
  ]

  const csvRows = [headers.join(',')]
  const vals = headers.map((h) => escapeCsv((r as any)[h]))
  csvRows.push(vals.join(','))

  const csv = csvRows.join('\n')

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="report-${id}.csv"`,
    },
  })
}
