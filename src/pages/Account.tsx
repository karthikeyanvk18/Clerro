import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { badgeColors, getBadgeColor } from "@/lib/colors";
import { 
  Lock, 
  Shield, 
  Smartphone, 
  LogOut, 
  Trash2, 
  Download,
  Clock,
  Eye,
  Edit2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const loginSessions = [
  {
    id: 1,
    device: "Chrome on MacBook Pro",
    location: "Mumbai, India",
    ipAddress: "192.168.1.1",
    lastActive: "Today at 2:30 PM",
    isCurrent: true,
  },
  {
    id: 2,
    device: "Safari on iPhone 13",
    location: "Mumbai, India",
    ipAddress: "192.168.1.2",
    lastActive: "Yesterday at 6:45 PM",
    isCurrent: false,
  },
  {
    id: 3,
    device: "Chrome on Windows PC",
    location: "Pune, India",
    ipAddress: "192.168.1.3",
    lastActive: "3 days ago",
    isCurrent: false,
  },
];

const accountSettings = {
  email: "karthi@example.com",
  phone: "+91 98765 43210",
  twoFactorEnabled: true,
  emailNotifications: true,
  smsNotifications: false,
  autoLogout: "15 minutes",
};

export default function Account() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("security");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">Account</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="danger">Danger</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => toggleSidebar()} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-4 lg:p-6 pt-16">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2"
            >
              <h1 className="text-h1 lg:text-display">Account Management</h1>
              <p className="text-body text-muted-foreground">
                Manage your account security and settings
              </p>
            </motion.div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="sessions" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Sessions</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Data</span>
                </TabsTrigger>
                <TabsTrigger value="danger" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Danger</span>
                </TabsTrigger>
              </TabsList>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        • At least 8 characters • Mix of uppercase and lowercase • Include numbers and symbols
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Update Password</Button>
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-semibold">2FA is Enabled</p>
                          <p className="text-sm text-emerald-700">Your account is protected with two-factor authentication</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connected Devices</CardTitle>
                    <CardDescription>Manage devices connected to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {loginSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{session.device}</p>
                            {session.isCurrent && <Badge className={badgeColors.info}>Current</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{session.location}</p>
                          <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
                        </div>
                        {!session.isCurrent && (
                          <Button variant="ghost" size="sm" className="text-destructive dark:text-red-400 hover:text-red-700">
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>All your active login sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loginSessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Smartphone className="h-4 w-4" />
                              <p className="font-semibold">{session.device}</p>
                              {session.isCurrent && (
                                <Badge className={badgeColors.info}>Current</Badge>
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>📍 {session.location}</p>
                              <p>🔗 IP: {session.ipAddress}</p>
                              <p>⏰ {session.lastActive}</p>
                            </div>
                          </div>
                          {!session.isCurrent && (
                            <Button variant="destructive" size="sm">
                              Remove
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    <Alert className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Don't recognize a session? You can logout from all other sessions below.
                      </AlertDescription>
                    </Alert>

                    <Button variant="destructive" className="w-full" size="lg">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout All Other Sessions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Tab */}
              <TabsContent value="data" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Export or delete your data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Card className="bg-muted/50">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">Export Your Data</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Download all your financial data in JSON or CSV format
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            JSON Format
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            CSV Format
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Alert>
                      <AlertDescription>
                        Your data export includes all transactions, goals, budgets, and account information.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Danger Tab */}
              <TabsContent value="danger" className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    The actions below are permanent and cannot be undone. Please proceed with caution.
                  </AlertDescription>
                </Alert>

                <Card className="border-destructive/20">
                  <CardHeader>
                    <CardTitle className="text-destructive dark:text-red-400">Deactivate Account</CardTitle>
                    <CardDescription>Temporarily disable your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      You can reactivate your account anytime by logging back in. Your data will be preserved.
                    </p>
                    <Button variant="outline" className="w-full border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950">
                      <Clock className="mr-2 h-4 w-4" />
                      Deactivate Account
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-destructive/20">
                  <CardHeader>
                    <CardTitle className="text-destructive dark:text-red-400">Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert variant="destructive">
                      <AlertDescription>
                        This action cannot be undone. All your data, including transactions, goals, and settings will be permanently deleted.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <Label>Enter your password to confirm deletion</Label>
                      <Input type="password" placeholder="Enter your password" />
                    </div>
                    <Button variant="destructive" className="w-full" size="lg">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account Permanently
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
