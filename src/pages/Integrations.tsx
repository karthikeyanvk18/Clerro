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
  Link2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MoreVertical,
  Gauge,
  DollarSign,
  Gift,
  RefreshCw,
} from "lucide-react";

export default function Integrations() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Integrations</h1>

          {/* Connected Services */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Connected Services</h3>
            {[
              { title: "ICICI Bank", status: "Connected", date: "2 hours ago" },
              { title: "HDFC Bank", status: "Connected", date: "4 hours ago" },
            ].map((service, i) => (
              <Card key={i}>
                <CardContent className="pt-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold mb-1">{service.title}</p>
                      <p className="text-xs text-muted-foreground">Synced {service.date}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full">Sync Now</Button>
            <Button variant="outline" className="w-full">Add Service</Button>
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

        <main className="flex-1 p-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Integrations</h1>
              <p className="text-muted-foreground mt-2">
                Connect your banks and financial accounts for seamless data synchronization
              </p>
            </motion.div>

            {/* Integrations Alert */}
            <Alert className="mb-6 border-primary/20 bg-card">
              <Link2 className="h-4 w-4 text-primary" />
              <AlertDescription>
                <strong>🔗 New Integration Available!</strong> Connect your UPI accounts for instant
                transaction updates. Secure and encrypted.
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Connected Banks", value: "3", icon: Link2, color: "green" },
                { label: "Total Transactions", value: "487", icon: TrendingUp, color: "blue" },
                { label: "Sync Status", value: "Active", icon: CheckCircle, color: "amber" },
                { label: "Last Sync", value: "2h ago", icon: RefreshCw, color: "purple" },
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
              {/* Left: Connected Services */}
              <div className="lg:col-span-2 space-y-6">
                {/* Connected Banks */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Connected Banks</CardTitle>
                          <CardDescription>Manage your bank connections</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">3 Banks</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "ICICI Bank",
                        account: "****1234",
                        type: "Savings",
                        status: "connected",
                        lastSync: "2 hours ago",
                        transactions: 156,
                      },
                      {
                        name: "HDFC Bank",
                        account: "****5678",
                        type: "Checking",
                        status: "connected",
                        lastSync: "4 hours ago",
                        transactions: 203,
                      },
                      {
                        name: "Axis Bank",
                        account: "****9012",
                        type: "Investment",
                        status: "connected",
                        lastSync: "6 hours ago",
                        transactions: 128,
                      },
                    ].map((bank, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{bank.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{bank.account} • {bank.type}</p>
                          </div>
                          <Badge className="bg-primary">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Last Sync</p>
                            <p className="font-semibold text-xs">{bank.lastSync}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Transactions</p>
                            <p className="font-semibold">{bank.transactions}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="font-semibold text-xs text-primary">Active</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-primary">Sync Now</Button>
                          <Button variant="outline" className="flex-1">
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Available Services */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Available Services</CardTitle>
                          <CardDescription>Connect more banks and services</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">5+ Services</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "UPI Payment Systems",
                        desc: "Connect Google Pay, PhonePe, Paytm",
                        icon: "💳",
                        supported: true,
                      },
                      {
                        name: "Credit Card Providers",
                        desc: "Sync credit card transactions",
                        icon: "🏦",
                        supported: true,
                      },
                      {
                        name: "Investment Platforms",
                        desc: "Connect Zerodha, Angel Broking, 5Paisa",
                        icon: "📊",
                        supported: true,
                      },
                      {
                        name: "Wallet Services",
                        desc: "Link digital wallets and prepaid cards",
                        icon: "💰",
                        supported: true,
                      },
                    ].map((service, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.desc}</p>
                          </div>
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                        <Button className="w-full bg-primary">Connect</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Sync History */}
                <Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle>Sync History</CardTitle>
                          <CardDescription>Recent synchronization activity</CardDescription>
                        </div>
                      </div>
                      <Badge className={badgeColors.info}>Latest Syncs</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { time: "2 hours ago", service: "ICICI Bank", transactions: 12, status: "Success" },
                      { time: "4 hours ago", service: "HDFC Bank", transactions: 8, status: "Success" },
                      { time: "6 hours ago", service: "Axis Bank", transactions: 5, status: "Success" },
                      { time: "8 hours ago", service: "All Banks", transactions: 25, status: "Success" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{item.service}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{item.transactions} txns</p>
                            <Badge variant="outline" className="text-xs mt-1">Success</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Integration Stats */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Integration Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-card/50 border-primary/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Overall Status</p>
                        <Badge className="bg-primary">Healthy</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">All systems operational</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Connected Services</p>
                        <p className="font-semibold">3 / 5 Slots</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Synced</p>
                        <p className="font-semibold">487 Transactions</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Auto-Sync</p>
                        <p className="font-semibold">Daily</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "End-to-end encryption",
                      "Secure API connections",
                      "Two-factor authentication",
                      "Data privacy compliant",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full bg-primary justify-start text-xs">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync All Banks
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs">
                      <Link2 className="w-4 h-4 mr-2" />
                      Connect New Bank
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      View Settings
                    </Button>
                  </CardContent>
                </Card>

                {/* Support */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <Button variant="outline" className="w-full justify-start">
                      Troubleshoot sync issues
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      View documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Contact support
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
