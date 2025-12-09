/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotificationsForm } from '@/components/admin/notifications-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Clock, CheckCircle2 } from 'lucide-react'
import { getRecentNotifications } from '@/app/actions/notifications'

export default async function AdminNotificationsPage() {
  const { data: notifications } = await getRecentNotifications()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
        <p className="text-lg text-muted-foreground">Manage system alerts and user communications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <NotificationsForm />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(!notifications || notifications.length === 0) ? (
                  <p className="text-muted-foreground text-center py-4">No notifications sent yet.</p>
                ) : (
                  notifications.map((n: any) => (
                    <div key={n.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{n.title}</span>
                          <Badge variant="outline" className="capitalize">{n.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{n.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(n.created_at).toLocaleDateString()} {new Date(n.created_at).toLocaleTimeString()}</span>
                          <span>•</span>
                          <span>{n.user_id ? `To: ${n.users?.email || 'User'}` : 'Broadcast to All'}</span>
                        </div>
                      </div>
                      {n.is_read && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Broadcasts:</strong> Messages with &quot;All Users&quot; selected will be visible to everyone on the platform. Use for system maintenance or major announcements.
              </p>
              <p>
                <strong>Warnings:</strong> Use the &quot;Warning&quot; type for security alerts or critical service interruptions. These are highlighted to grab attention.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
