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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Lock,
  Fingerprint,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Shield,
  Zap,
  AlertCircle,
} from "lucide-react";

export default function DataVault() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Data Vault</h1>

          {/* Security Status */}
          <Card className="border-green-200 bg-green-50/30">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-sm">Secured</p>
              </div>
              <p className="text-xs text-muted-foreground">End-to-end encrypted</p>
            </CardContent>
          </Card>

          {/* Documents Count */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">8</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Expiring Soon</p>
                <p className="text-xl font-bold text-orange-600">2</p>
              </CardContent>
            </Card>
          </div>

          {/* Documents */}
          <div className="space-y-2">
            {[
              { name: "PAN Card", status: "Verified" },
              { name: "Aadhaar", status: "Verified" },
              { name: "Passport", status: "Expiring" },
            ].map((doc) => (
              <Card key={doc.name}>
                <CardContent className="pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <Badge variant={doc.status === "Verified" ? "default" : "destructive"} className="text-xs mt-1">
                      {doc.status}
                    </Badge>
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
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

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Data Vault & Security</h1>
              <p className="text-muted-foreground mt-2">
                Store and manage sensitive documents with end-to-end encryption
              </p>
            </motion.div>

            {/* Security Alert */}
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>✓ Your vault is secured!</strong> All documents are encrypted with AES-256
                encryption. Biometric unlock enabled on your device.
              </AlertDescription>
            </Alert>

            {/* Expiry Alert */}
            <Alert className="mb-6 bg-orange-50 border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <strong>2 documents expiring soon:</strong> Passport expires on Feb 15, 2025 and
                ATM Card expires on Dec 28, 2024
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Documents Stored", value: "8", icon: FileText, color: "blue" },
                { label: "Encryption Status", value: "AES-256", icon: Lock, color: "green" },
                { label: "Expiring Soon", value: "2", icon: AlertTriangle, color: "orange" },
                { label: "Backup Status", value: "Latest", icon: CheckCircle, color: "green" },
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
              {/* Documents */}
              <div className="lg:col-span-2 space-y-6">
                {/* Financial Documents */}
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <CardTitle>Financial Documents</CardTitle>
                          <CardDescription>Tax returns, receipts, statements</CardDescription>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        name: "FD Receipt - HDFC",
                        date: "Nov 15, 2024",
                        amount: "₹5,00,000",
                        expiry: null,
                      },
                      {
                        name: "Salary Slip - November",
                        date: "Nov 1, 2024",
                        amount: "₹75,000",
                        expiry: null,
                      },
                      {
                        name: "Insurance Policy Receipt",
                        date: "Oct 20, 2024",
                        amount: "₹45,000",
                        expiry: "Dec 20, 2024",
                      },
                    ].map((doc, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Uploaded {doc.date}
                            </p>
                            {doc.amount && (
                              <p className="text-sm font-medium text-green-600 mt-1">
                                {doc.amount}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {doc.expiry && (
                          <Badge variant="destructive" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            Expires {doc.expiry}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Identity Documents */}
                <Card className="border-purple-200 bg-purple-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle>Identity Documents</CardTitle>
                          <CardDescription>PAN, Aadhaar, Passport, Driving License</CardDescription>
                        </div>
                      </div>
                      <Button size="sm" className="bg-purple-600">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "PAN Card", number: "AAABP1234A", verified: true, expiry: null },
                      { name: "Aadhaar Card", number: "****-****-1234", verified: true, expiry: null },
                      {
                        name: "Passport",
                        number: "H1234567",
                        verified: true,
                        expiry: "Feb 15, 2025",
                      },
                      {
                        name: "Driving License",
                        number: "DL-0120200000001",
                        verified: false,
                        expiry: "Mar 30, 2026",
                      },
                    ].map((doc, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{doc.name}</p>
                              {doc.verified ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {doc.number}
                            </p>
                            {doc.expiry && (
                              <p className="text-xs text-orange-600 font-medium mt-1">
                                Expires: {doc.expiry}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Other Documents */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <div>
                          <CardTitle>Other Important Documents</CardTitle>
                          <CardDescription>ATM Card, Credit Card, Certificates</CardDescription>
                        </div>
                      </div>
                      <Button size="sm" className="bg-green-600">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Debit Card (HDFC)", expiry: "Dec 28, 2024", status: "Expiring Soon" },
                      { name: "Credit Card (ICICI)", expiry: "Jun 30, 2026", status: "Active" },
                    ].map((doc, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Expires: {doc.expiry}
                            </p>
                          </div>
                          <Badge
                            variant={doc.status === "Expiring Soon" ? "destructive" : "secondary"}
                          >
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Security Settings */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Encryption</p>
                          <p className="text-xs text-muted-foreground">AES-256</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Biometric Lock</p>
                          <p className="text-xs text-muted-foreground">Fingerprint</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Last Backup</p>
                          <p className="text-xs text-muted-foreground">Today at 2:45 PM</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expiry Calendar */}
                <Card className="border-orange-200 bg-orange-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Expiry Calendar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-orange-600">This Month</p>
                      <div className="text-sm p-2 rounded border border-orange-200 bg-white">
                        <p className="font-medium">ATM Card</p>
                        <p className="text-xs text-muted-foreground">Dec 28, 2024</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-yellow-600">Next Month</p>
                      <div className="text-sm p-2 rounded border border-yellow-200 bg-white">
                        <p className="font-medium">Passport</p>
                        <p className="text-xs text-muted-foreground">Feb 15, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">
                      View Full Calendar
                    </Button>
                  </CardContent>
                </Card>

                {/* Privacy Policy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-3">
                      Your documents are protected by military-grade encryption. Only you can
                      access them.
                    </p>
                    <Button variant="outline" className="w-full text-xs">
                      Read Privacy Policy
                    </Button>
                    <Button variant="outline" className="w-full text-xs">
                      Security Settings
                    </Button>
                  </CardContent>
                </Card>

                {/* Storage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Used</p>
                        <p className="text-sm">2.5 GB / 10 GB</p>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <Button variant="outline" className="w-full text-xs">
                      Upgrade Storage
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
