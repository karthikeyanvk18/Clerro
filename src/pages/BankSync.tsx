import { useEffect } from "react";
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
import { amountColors } from "@/lib/colors";
import {
  CreditCard,
  Building2,
  ArrowRightLeft,
  CheckCircle,
  AlertCircle,
  Plus,
  Wallet,
  TrendingUp,
  Lock,
  Smartphone,
  Zap,
} from "lucide-react";

export default function BankSync() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="space-y-4 p-4">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Bank Connect</h1>
            <p className="text-sm text-muted-foreground">Auto-sync your transactions</p>
          </div>

          {/* Connected Banks */}
          <Card className="dark:bg-[rgb(4,35,51)]\">
            <CardHeader>
              <CardTitle className="text-lg">Connected Banks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3\">"
              <div className="p-3 rounded-lg border border-primary/20 bg-card/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">HDFC Bank</p>
                    <p className="text-xs text-muted-foreground">****1234</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>

              <div className="p-3 rounded-lg border border-primary/20 bg-card/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">ICICI Bank</p>
                    <p className="text-xs text-muted-foreground">****5678</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>

              <Button className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Connect New Bank
              </Button>
            </CardContent>
          </Card>

          {/* Sync Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Last Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">HDFC Bank</span>
                <Badge variant="outline" className="text-xs">2 mins ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ICICI Bank</span>
                <Badge variant="outline" className="text-xs">5 mins ago</Badge>
              </div>
              <Button variant="outline" className="w-full mt-3">
                <Zap className="w-4 h-4 mr-2" />
                Sync Now
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Amazon Purchase", amount: "-₹2,499", type: "Shopping" },
                { name: "Salary Credit", amount: "+₹50,000", type: "Income" },
                { name: "Netflix Subscription", amount: "-₹649", type: "Entertainment" },
              ].map((tx, i) => (
                <div key={i} className="p-2 rounded border flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{tx.name}</p>
                    <Badge variant="secondary" className="text-xs mt-1">{tx.type}</Badge>
                  </div>
                  <span className={tx.amount.startsWith("+") ? amountColors.positive : amountColors.negative}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => toggleSidebar()} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-6 pt-16">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold">Bank Connect</h1>
              <p className="text-muted-foreground mt-2">
                Securely connect your bank accounts and auto-sync transactions
              </p>
            </motion.div>

            {/* Security Banner */}
            <Alert className="mb-6 bg-card border-primary/20">
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Your bank connection uses industry-standard encryption (TLS 1.2+). We never store passwords.
              </AlertDescription>
            </Alert>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Connected Banks */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Banks</CardTitle>
                    <CardDescription>Manage your connected bank accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "HDFC Bank", account: "****1234", balance: "₹1,24,567", synced: "2 mins ago" },
                      { name: "ICICI Bank", account: "****5678", balance: "₹87,432", synced: "5 mins ago" },
                      { name: "Axis Bank", account: "****9012", balance: "₹45,123", synced: "1 hour ago" },
                    ].map((bank, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-lg border bg-card/50 border-primary/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{bank.name}</h3>
                            <p className="text-sm text-muted-foreground">{bank.account}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <Badge variant="secondary" className="text-xs">{bank.balance}</Badge>
                              <span className="text-xs text-muted-foreground">Synced {bank.synced}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Resync
                          </Button>
                          <Button variant="ghost" size="sm">
                            Settings
                          </Button>
                        </div>
                      </motion.div>
                    ))}

                    <Button className="w-full mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect New Bank Account
                    </Button>
                  </CardContent>
                </Card>

                {/* Integration Options */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle>Available Integrations</CardTitle>
                    <CardDescription>Choose how to connect your bank</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        name: "Plaid",
                        desc: "Connect 12,000+ institutions",
                        icon: CreditCard,
                        color: "blue",
                      },
                      {
                        name: "Salt Edge",
                        desc: "Europe & Asia coverage",
                        icon: Lock,
                        color: "purple",
                      },
                      {
                        name: "India Stack (UPI)",
                        desc: "Direct UPI transaction sync",
                        icon: Smartphone,
                        color: "orange",
                      },
                      {
                        name: "Manual CSV Upload",
                        desc: "Import bank statements",
                        icon: ArrowRightLeft,
                        color: "green",
                      },
                    ].map((integration, i) => {
                      const Icon = integration.icon;
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border border-${integration.color}-200 bg-${integration.color}-50 cursor-pointer`}
                        >
                          <Icon className={`w-8 h-8 text-${integration.color}-600 mb-2`} />
                          <h3 className="font-semibold text-sm">{integration.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{integration.desc}</p>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Sync Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sync Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {[
                        { bank: "HDFC Bank", status: "Synced" },
                        { bank: "ICICI Bank", status: "Synced" },
                        { bank: "Axis Bank", status: "Syncing..." },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span>{item.bank}</span>
                          {item.status === "Synced" ? (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                          ) : (
                            <div className="animate-spin">
                              <Zap className="w-4 h-4 text-primary dark:text-primary/80" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4">
                      Sync All Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Auto-Categorization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Auto-Categorization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-3 bg-card border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium">Enabled</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Using AI to auto-categorize transactions
                      </p>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <Badge variant="outline">98%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Transactions Processed:</span>
                        <Badge variant="outline">342</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Income</p>
                      <p className={`text-2xl font-bold ${amountColors.positive}`}>₹1,25,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Expenses</p>
                      <p className={`text-2xl font-bold ${amountColors.negative}`}>₹47,230</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Net Savings</p>
                      <p className="text-2xl font-bold text-primary\">₹77,770</p>
                    </div>
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
