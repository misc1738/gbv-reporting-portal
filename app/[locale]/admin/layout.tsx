import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Shield, LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function AdminLayout({ children, params }: { children: ReactNode, params: Promise<{ locale: string }> }) {
    const { locale } = await params
    return (
        <div className="flex min-h-screen bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href={`/${locale}/admin/dashboard`} className="flex items-center gap-2 font-semibold">
                        <Shield className="h-6 w-6" />
                        <span>Admin Portal</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 px-4 py-8">
                    <Link
                        href={`/${locale}/admin/dashboard`}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href={`/${locale}/admin/reports`}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        <FileText className="h-5 w-5" />
                        Reports
                    </Link>
                    <Link
                        href={`/${locale}/admin/users`}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        <Users className="h-5 w-5" />
                        Users
                    </Link>
                    <Link
                        href={`/${locale}/admin/settings`}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>
                <div className="mt-auto p-4 border-t">
                    <form action={signOut}>
                        <Button variant="outline" className="w-full gap-2">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>
            <main className="flex-1 sm:ml-64">
                <div className="container py-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
