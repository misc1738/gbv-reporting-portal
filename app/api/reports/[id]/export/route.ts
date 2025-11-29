import { getSupabaseServerClient } from '@/lib/supabase/server'
/* eslint-disable @typescript-eslint/no-explicit-any */

function escapeCsv(value: any) {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await getSupabaseServerClient()
    const params = await props.params
    const { id } = params

    // Fetch report details
    const { data: report, error } = await supabase
      .from('reports')
      .select(`
        *,
        evidence_files (*)
      `)
      .eq('id', id)
      .single()

    if (error || !report) {
      return new Response('Report not found', { status: 404 })
    }

    // Format as CSV
    const headers = [
      'Report ID',
      'Date Submitted',
      'Status',
      'Violence Type',
      'Incident Date',
      'Location',
      'Description',
      'Risk Level',
      'Evidence Files'
    ]

    const row = [
      report.id,
      new Date(report.created_at).toLocaleDateString(),
      report.status,
      report.violence_type,
      report.incident_date ? new Date(report.incident_date).toLocaleDateString() : 'N/A',
      report.incident_location || 'N/A',
      report.description,
      report.risk_level || 'N/A',
      report.evidence_files?.length || 0
    ]

    const csvContent = [
      headers.join(','),
      row.map(escapeCsv).join(',')
    ].join('\n')

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="report-${id}.csv"`
      }
    })

  } catch (error) {
    console.error('Export error:', error)
    return new Response('Export failed', { status: 500 })
  }
}
