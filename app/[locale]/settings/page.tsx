"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
              <p className="text-lg text-muted-foreground">Manage your account preferences</p>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                User settings page is under development. You can manage your profile and preferences here soon.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
