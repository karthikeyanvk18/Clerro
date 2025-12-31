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
import { badgeColors } from "@/lib/colors";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Lock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Key,
  Star,
  MoreVertical,
  Gauge,
  DollarSign,
  Gift,
  Eye,
} from "lucide-react";

export default function Vault() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Secure Vault</h1>

          {/* Vault Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Your Documents</h3>
            {[
              { title: "Bank Statements", date: "5 files", size: "12 MB" },
              { title: "Loan Documents", date: "8 files", size: "25 MB" },
            ].map((doc, i) => (
              <Card key={i}>
                <CardContent className="pt-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold mb-1">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                    <p className="text-xs font-semibold">{doc.size}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full">Upload Document</Button>
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

        <main className="flex-1 p-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Secure Vault</h1>
              <p className="text-muted-foreground mt-2">
                Store and manage your important financial documents in an encrypted vault
              </p>
            </motion.div>

            {/* Vault Alert */}
            <Alert className="mb-6 border-primary/20 bg-card">
              <Lock className="h-4 w-4 text-primary" />
              <AlertDescription>
                <strong>🔒 Military-Grade Encryption!</strong> All documents are encrypted with AES-256.
                Your data is 100% secure and private.
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Total Documents", value: "47", icon: Lock, color: "green" },
                { label: "Total Storage", value: "245 MB", icon: DollarSign, color: "blue" },
                { label: "Encryption Status", value: "Active", icon: CheckCircle, color: "amber" },
                { label: "Last Upload", value: "2h ago", icon: Eye, color: "purple" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                          </div>
                          <Icon className={`w-5 h-5 text-${stat.color}-600 opacity-70`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Vault Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Document Categories */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Document Categories</CardTitle>
                          <CardDescription>Organized by type</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">6 Categories</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Bank Statements",
                        count: "12 files",
                        size: "45 MB",
                        updated: "2 hours ago",
                      },
                      {
                        name: "Loan Documents",
                        count: "18 files",
                        size: "78 MB",
                        updated: "3 days ago",
                      },
                      {
                        name: "Tax Documents",
                        count: "8 files",
                        size: "32 MB",
                        updated: "1 week ago",
                      },
                      {
                        name: "Insurance Documents",
                        count: "5 files",
                        size: "28 MB",
                        updated: "2 weeks ago",
                      },
                    ].map((category, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{category.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{category.count}</p>
                          </div>
                          <Badge variant="outline">
                            <Lock className="w-3 h-3 mr-1" />
                            Encrypted
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Size</p>
                            <p className="font-semibold">{category.size}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Updated</p>
                            <p className="font-semibold text-xs">{category.updated}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Access</p>
                            <p className="font-semibold text-xs text-primary">View</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-primary">Open</Button>
                          <Button variant="outline" className="flex-1">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Uploads */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Recent Uploads</CardTitle>
                          <CardDescription>Latest documents added</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">Latest</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "ICICI_Statement_Dec2025.pdf",
                        category: "Bank Statements",
                        size: "2.5 MB",
                        uploaded: "2 hours ago",
                        verified: true,
                      },
                      {
                        name: "Home_Loan_Agreement.pdf",
                        category: "Loan Documents",
                        size: "3.2 MB",
                        uploaded: "1 day ago",
                        verified: true,
                      },
                      {
                        name: "Tax_Return_2024.pdf",
                        category: "Tax Documents",
                        size: "1.8 MB",
                        uploaded: "3 days ago",
                        verified: true,
                      },
                      {
                        name: "Health_Insurance_Policy.pdf",
                        category: "Insurance",
                        size: "2.1 MB",
                        uploaded: "1 week ago",
                        verified: true,
                      },
                    ].map((doc, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{doc.category}</p>
                          </div>
                          {doc.verified && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Size</p>
                            <p className="font-semibold">{doc.size}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Uploaded</p>
                            <p className="font-semibold text-xs">{doc.uploaded}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <Badge className="text-xs">Secure</Badge>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Security Details */}
                <Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle>Security Features</CardTitle>
                          <CardDescription>Your vault is protected by:</CardDescription>
                        </div>
                      </div>
                      <Badge className={badgeColors.info}>Enterprise</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { feature: "AES-256 Encryption", desc: "Military-grade encryption standard" },
                      { feature: "End-to-End Encryption", desc: "Only you can decrypt your files" },
                      { feature: "Secure Backup", desc: "Automatic daily backups" },
                      { feature: "Access Logs", desc: "Complete audit trail of all access" },
                      { feature: "Two-Factor Authentication", desc: "Extra layer of security" },
                      { feature: "Data Privacy", desc: "GDPR and privacy compliant" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-card/50 border-primary/20 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{item.feature}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Storage */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Storage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-card/50 border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Used</p>
                        <Badge className="bg-primary">245 MB</Badge>
                      </div>
                      <Progress value={49} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">245 MB of 500 MB</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Plan</p>
                        <p className="font-semibold">Pro Plan</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Upgrade Available</p>
                        <p className="font-semibold">1 TB Plan</p>
                      </div>
                    </div>

                    <Button className="w-full bg-primary mt-2">Upgrade Storage</Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "Upload Document",
                      "Manage Categories",
                      "View Access Logs",
                      "Security Settings",
                    ].map((action) => (
                      <Button key={action} variant="outline" className="w-full justify-start text-xs">
                        {action}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Documents</span>
                      <span className="font-bold">47</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Access</span>
                      <span className="font-bold">234</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Support */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Help & Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <Button variant="outline" className="w-full justify-start">
                      How to upload files?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Security FAQ
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
