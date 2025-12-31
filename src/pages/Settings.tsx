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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Eye, 
  Shield, 
  LogOut, 
  Save, 
  Download, 
  Trash2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("profile");
  const isMobile = useIsMobile();

  // Profile State
  const [profile, setProfile] = useState({
    fullName: "Karthi",
    email: "karthi@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, MH 400001",
    dateOfBirth: "1990-05-15",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    monthlyReport: true,
    emiReminders: true,
    goalMilestones: true,
    investmentAlerts: true,
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    activityTracking: true,
    dataAnalytics: true,
    marketingEmails: false,
  });

  // Display Settings
  const [display, setDisplay] = useState({
    theme: "system",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    language: "en",
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications({ ...notifications, [field]: value });
  };

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy({ ...privacy, [field]: value });
  };

  const handleDisplayChange = (field: string, value: string) => {
    setDisplay({ ...display, [field]: value });
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
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

        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2"
            >
              <h1 className="text-h1 lg:text-display">Settings</h1>
              <p className="text-body text-muted-foreground">
                Manage your account preferences and settings
              </p>
            </motion.div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="display" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Display</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => handleProfileChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleProfileChange("email", e.target.value)}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => handleProfileChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="flex gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => handleProfileChange("address", e.target.value)}
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                      />
                    </div>

                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive alerts and notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Communication Channels</h4>
                      {[
                        { key: "emailNotifications", label: "Email Notifications", description: "Receive updates via email" },
                        { key: "pushNotifications", label: "Push Notifications", description: "Receive push notifications on your device" },
                        { key: "smsNotifications", label: "SMS Notifications", description: "Receive alerts via SMS" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onCheckedChange={(value) => handleNotificationChange(item.key, value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <h4 className="font-medium">Notification Types</h4>
                      {[
                        { key: "weeklyReport", label: "Weekly Report", description: "Summary of your financial activity" },
                        { key: "monthlyReport", label: "Monthly Report", description: "Detailed monthly financial report" },
                        { key: "emiReminders", label: "EMI Reminders", description: "Reminders for upcoming EMI payments" },
                        { key: "goalMilestones", label: "Goal Milestones", description: "Alerts when you reach goal milestones" },
                        { key: "investmentAlerts", label: "Investment Alerts", description: "Important investment updates" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onCheckedChange={(value) => handleNotificationChange(item.key, value)}
                          />
                        </div>
                      ))}
                    </div>

                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Display Tab */}
              <TabsContent value="display" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                    <CardDescription>Customize your app appearance and format</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={display.theme} onValueChange={(value) => handleDisplayChange("theme", value)}>
                        <SelectTrigger id="theme">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={display.currency} onValueChange={(value) => handleDisplayChange("currency", value)}>
                        <SelectTrigger id="currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                          <SelectItem value="GBP">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select value={display.dateFormat} onValueChange={(value) => handleDisplayChange("dateFormat", value)}>
                        <SelectTrigger id="dateFormat">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeFormat">Time Format</Label>
                      <Select value={display.timeFormat} onValueChange={(value) => handleDisplayChange("timeFormat", value)}>
                        <SelectTrigger id="timeFormat">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hour (12:00 PM)</SelectItem>
                          <SelectItem value="24h">24 Hour (12:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={display.language} onValueChange={(value) => handleDisplayChange("language", value)}>
                        <SelectTrigger id="language">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="te">Telugu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Display Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Manage your privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Profile Visibility</p>
                          <p className="text-xs text-muted-foreground">Control who can see your profile</p>
                        </div>
                        <Select value={privacy.profileVisibility} onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Activity Tracking</p>
                          <p className="text-xs text-muted-foreground">Allow us to track your activity for improvements</p>
                        </div>
                        <Switch
                          checked={privacy.activityTracking}
                          onCheckedChange={(value) => handlePrivacyChange("activityTracking", value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Data Analytics</p>
                          <p className="text-xs text-muted-foreground">Allow usage of your data for analytics</p>
                        </div>
                        <Switch
                          checked={privacy.dataAnalytics}
                          onCheckedChange={(value) => handlePrivacyChange("dataAnalytics", value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Marketing Emails</p>
                          <p className="text-xs text-muted-foreground">Receive promotional emails and offers</p>
                        </div>
                        <Switch
                          checked={privacy.marketingEmails}
                          onCheckedChange={(value) => handlePrivacyChange("marketingEmails", value)}
                        />
                      </div>
                    </div>

                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>Manage your account security and data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>

                      <Button variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        View Login Activity
                      </Button>

                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Export My Data
                      </Button>

                      <Alert>
                        <AlertDescription className="text-xs">
                          Exporting your data will generate a file containing all your personal and financial information.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <h4 className="font-medium text-sm">Danger Zone</h4>
                      
                      <Button variant="outline" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout All Sessions
                      </Button>

                      <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>

                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-xs text-red-800">
                          Deleting your account is permanent and cannot be undone. All your data will be deleted.
                        </AlertDescription>
                      </Alert>
                    </div>
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
