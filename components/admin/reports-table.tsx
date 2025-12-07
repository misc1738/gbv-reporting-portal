"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, FileDown, Download, Filter, RefreshCcw } from "lucide-react"
import { updateReportStatus } from "@/app/actions/reports"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"

// Define a type for the report based on what getAllReports returns
// In a real app, this should be shared from types/index.ts or inferred
interface Report {
    id: string
    anonymous_id: string
    violence_type: string
    incident_date: string | null
    status: string
    created_at: string
    demographics?: any
    perpetrator_details?: any
    risk_level?: string
    description?: string
}

export function ReportsTable({ initialReports }: { initialReports: Report[] }) {
    const [reports, setReports] = useState(initialReports)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [loading, setLoading] = useState<string | null>(null)
    const { toast } = useToast()

    const filteredReports = reports.filter(report => {
        const matchesSearch =
            (report.anonymous_id?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (report.violence_type?.toLowerCase() || "").includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || report.status === statusFilter

        return matchesSearch && matchesStatus
    })

    async function handleStatusUpdate(reportId: string, newStatus: string) {
        setLoading(reportId)
        const result = await updateReportStatus(reportId, newStatus)

        if (result.success) {
            setReports(reports.map(r => r.id === reportId ? { ...r, status: newStatus } : r))
            toast({ title: "Status Updated", description: `Report status changed to ${newStatus}` })
        } else {
            toast({ variant: "destructive", title: "Update Failed", description: result.error })
        }
        setLoading(null)
    }

    const exportToCSV = () => {
        // Create CSV header
        const headers = ["Case ID", "Violence Type", "Date", "Status", "Risk Level", "Description", "Submitted"]

        // Create CSV rows
        const rows = filteredReports.map(r => [
            r.anonymous_id,
            r.violence_type,
            r.incident_date ? format(new Date(r.incident_date), "yyyy-MM-dd") : "N/A",
            r.status,
            r.risk_level || "N/A",
            `"${(r.description || "").replace(/"/g, '""')}"`, // Escape quotes in description
            format(new Date(r.created_at), "yyyy-MM-dd HH:mm")
        ])

        // Combine
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map(e => e.join(","))].join("\n")

        // Download
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `gbv_reports_export_${format(new Date(), "yyyy-MM-dd")}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by ID or Type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px]">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="submitted">Submitted</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="dismissed">Dismissed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={exportToCSV} variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Case ID</TableHead>
                            <TableHead>Violence Type</TableHead>
                            <TableHead>Risk</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredReports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No reports found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredReports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-mono text-sm font-medium">{report.anonymous_id}</TableCell>
                                    <TableCell className="capitalize">{report.violence_type?.replace(/_/g, ' ')}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            report.risk_level === 'critical' || report.risk_level === 'high' ? 'destructive' :
                                                report.risk_level === 'medium' ? 'default' : 'secondary'
                                        }>
                                            {report.risk_level || 'N/A'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{report.incident_date ? format(new Date(report.incident_date), "MMM d, yyyy") : '-'}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                report.status === 'resolved' ? 'default' :
                                                    report.status === 'in_progress' ? 'secondary' :
                                                        report.status === 'dismissed' ? 'outline' :
                                                            'destructive' // submitted
                                            }
                                        >
                                            {report.status?.replace(/_/g, ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {format(new Date(report.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading === report.id}>
                                                    <span className="sr-only">Open menu</span>
                                                    {loading === report.id ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(report.id, "in_progress")}>
                                                    Mark In Progress
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(report.id, "resolved")}>
                                                    Mark Resolved
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(report.id, "dismissed")}>
                                                    Dismiss Report
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleStatusUpdate(report.id, "submitted")}>
                                                    Reset to Submitted
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="text-xs text-muted-foreground text-center">
                Showing {filteredReports.length} of {reports.length} reports
            </div>
        </div>
    )
}
