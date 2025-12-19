// import { redirect } from "next/navigation";

// import { appConfig } from "@/config";
// import { getCurrentUser } from "@/lib/auth";

// import { ChangePasswordForm } from "@/components/forms/change-password";

// export default async function PasswordSettingsPage() {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     return redirect(appConfig.auth.login);
//   }

//   return <ChangePasswordForm />;
// }

"use client";

import { useState } from "react";
import { Save, Bell, Lock, Shield, Zap, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  return (
    <div className="p-6 space-y-6">

      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#252850] border border-[#2a2d4a]">
          <TabsTrigger value="general" className="text-gray-400 data-[state=active]:text-white">General</TabsTrigger>
          <TabsTrigger value="security" className="text-gray-400 data-[state=active]:text-white">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="text-gray-400 data-[state=active]:text-white">Notifications</TabsTrigger>
          <TabsTrigger value="api" className="text-gray-400 data-[state=active]:text-white">API Keys</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-[#252850] border-[#2a2d4a]">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Company Name</label>
                <Input
                  defaultValue="Provax Auto Solutions"
                  className="bg-[#1a1d3a] border-[#2a2d4a] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                <Input
                  defaultValue="admin@provax.com"
                  type="email"
                  className="bg-[#1a1d3a] border-[#2a2d4a] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                <Input
                  defaultValue="+1 (555) 123-4567"
                  className="bg-[#1a1d3a] border-[#2a2d4a] text-white"
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252850] border-[#2a2d4a]">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Business Type</label>
                <select className="w-full bg-[#1a1d3a] border border-[#2a2d4a] text-white rounded px-3 py-2">
                  <option>Dealership</option>
                  <option>Service Center</option>
                  <option>Marketplace</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Industry</label>
                <Input defaultValue="Automotive" className="bg-[#1a1d3a] border-[#2a2d4a] text-white" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="bg-[#252850] border-[#2a2d4a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Current Password</label>
                <Input type="password" className="bg-[#1a1d3a] border-[#2a2d4a] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">New Password</label>
                <Input type="password" className="bg-[#1a1d3a] border-[#2a2d4a] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Confirm Password</label>
                <Input type="password" className="bg-[#1a1d3a] border-[#2a2d4a] text-white" />
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="bg-[#252850] border-[#2a2d4a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-gray-400 text-sm">Secure your account with 2FA</p>
                </div>
                <Badge className="bg-red-500/20 text-red-400">Disabled</Badge>
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Enable 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-[#252850] border-[#2a2d4a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Email Notifications", description: "Receive important updates via email" },
                { title: "Marketing Emails", description: "Receive promotional content and offers" },
                { title: "Security Alerts", description: "Get notified about security events" },
                { title: "Service Updates", description: "Receive service-related notifications" },
              ].map((notif) => (
                <div key={notif.title} className="flex items-center justify-between py-3 border-b border-[#1a1d3a] last:border-0">
                  <div>
                    <p className="text-white font-medium">{notif.title}</p>
                    <p className="text-gray-400 text-sm">{notif.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-4">
          <Card className="bg-[#252850] border-[#2a2d4a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Production Key", key: "pk_live_51234567890", created: "2024-01-15" },
                { name: "Test Key", key: "pk_test_0987654321", created: "2024-01-10" },
              ].map((api) => (
                <div key={api.name} className="bg-[#1a1d3a] border border-[#2a2d4a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{api.name}</h4>
                    <p className="text-gray-400 text-sm">Created {api.created}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0f1129] p-3 rounded">
                    <code className="text-gray-400 text-sm flex-1">{api.key}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-white"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}