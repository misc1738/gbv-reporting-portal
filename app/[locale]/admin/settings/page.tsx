import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Settings as SettingsIcon, Info } from 'lucide-react'

export default async function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
        <p className="text-lg text-muted-foreground">Configure platform settings</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Settings management coming soon. Configure system-wide options, data retention policies, and integrations.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Anonymous Reporting</p>
                <p className="text-xs text-muted-foreground">Allow reports without login</p>
              </div>
              <span className="text-sm text-muted-foreground">Enabled</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Case Tracking</p>
                <p className="text-xs text-muted-foreground">Enable case ID tracking</p>
              </div>
              <span className="text-sm text-muted-foreground">Enabled</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">Evidence Upload</p>
                <p className="text-xs text-muted-foreground">Allow file attachments</p>
              </div>
              <span className="text-sm text-muted-foreground">Enabled</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & Privacy</CardTitle>
            <CardDescription>Data protection settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">End-to-End Encryption</p>
                <p className="text-xs text-muted-foreground">For evidence files</p>
              </div>
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Data Retention</p>
                <p className="text-xs text-muted-foreground">Auto-delete after</p>
              </div>
              <span className="text-sm text-muted-foreground">7 years</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">Two-Factor Auth</p>
                <p className="text-xs text-muted-foreground">For admin accounts</p>
              </div>
              <span className="text-sm text-muted-foreground">Recommended</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Email and SMS settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Case updates via email</p>
              </div>
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">SMS Alerts</p>
                <p className="text-xs text-muted-foreground">Emergency notifications</p>
              </div>
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Third-party services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium text-sm">Maps Integration</p>
                <p className="text-xs text-muted-foreground">Leaflet/OpenStreetMap</p>
              </div>
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">Analytics</p>
                <p className="text-xs text-muted-foreground">Usage statistics</p>
              </div>
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
