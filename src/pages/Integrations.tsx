import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, RefreshCw, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConnectedBank {
  id: string;
  name: string;
  accountNumber: string;
  type: string;
  status: "connected" | "syncing" | "error";
  lastSync: string;
}

const mockBanks: ConnectedBank[] = [
  {
    id: "1",
    name: "ICICI Bank",
    accountNumber: "****1234",
    type: "Savings",
    status: "connected",
    lastSync: "2 hours ago",
  },
  {
    id: "2",
    name: "HDFC Bank",
    accountNumber: "****5678",
    type: "Checking",
    status: "connected",
    lastSync: "4 hours ago",
  },
];

export default function Integrations() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();
  const [connectedBanks, setConnectedBanks] = useState(mockBanks);
  const [autoSync, setAutoSync] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("✅ Sync completed! 12 new transactions imported.");
    }, 2000);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40 px-4 py-4">
          <h1 className="text-h3 font-bold">Bank & UPI Integrations</h1>
          <p className="text-muted-foreground text-sm mt-1">Auto-sync transactions</p>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Connected Banks</p>
                  <p className="text-2xl font-bold">{connectedBanks.length}</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald/10">
                  <Link2 className="h-5 w-5 text-emerald" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Last 30 Days</p>
                  <p className="text-2xl font-bold">487</p>
                  <p className="text-xs text-muted-foreground mt-1">transactions synced</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Connected Banks */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Connected Banks</h3>
            {connectedBanks.map((bank) => (
              <div
                key={bank.id}
                className="flex items-center justify-between pb-3 border-b last:border-b-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{bank.name}</p>
                  <p className="text-xs text-muted-foreground">{bank.accountNumber}</p>
                </div>
                <Badge className="bg-emerald text-xs">Active</Badge>
              </div>
            ))}
            <Button
              onClick={handleSyncNow}
              className="w-full bg-emerald hover:bg-emerald/90 h-8 text-sm mt-2"
              disabled={isSyncing}
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
          </Card>

          {/* Settings */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Settings</h3>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-Sync</label>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            <Button variant="outline" className="w-full h-8 text-sm">
              Connect New Bank
            </Button>
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

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-h1 font-bold">Bank & UPI Integrations</h1>
              <p className="text-muted-foreground">
                Auto-sync transactions and reduce manual entry
              </p>
            </motion.div>

            {/* Overview Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-emerald/10">
                    <Link2 className="h-6 w-6 text-emerald" />
                  </div>
                  <Badge className="bg-emerald">Active</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-1">Connected Banks</p>
                <p className="text-h2 font-bold">{connectedBanks.length}</p>
                <p className="text-caption text-muted-foreground mt-2">2/5 slots used</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <RefreshCw className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-500">Active</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-1">Last 30 Days</p>
                <p className="text-h2 font-bold">487</p>
                <p className="text-caption text-muted-foreground mt-2">transactions synced</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">Status</p>
                <p className="text-h2 font-bold">All Good</p>
                <p className="text-caption text-muted-foreground mt-2">Last sync 2 hours ago</p>
              </Card>
            </motion.div>

            {/* Connected Banks */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Connected Banks</h2>
                <Button className="bg-emerald hover:bg-emerald/90">
                  <Link2 className="h-4 w-4 mr-2" />
                  Connect Bank
                </Button>
              </div>

              <div className="space-y-3">
                {connectedBanks.map((bank) => (
                  <div
                    key={bank.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{bank.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {bank.accountNumber} • {bank.type}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Synced {bank.lastSync}
                      </p>
                    </div>
                    <Badge className="bg-emerald">Connected</Badge>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSyncNow}
                className="w-full bg-emerald hover:bg-emerald/90"
                disabled={isSyncing}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {isSyncing ? "Syncing..." : "Sync Now"}
              </Button>
            </Card>

            {/* Settings */}
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Sync Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Auto-Sync Enabled</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync transactions daily
                    </p>
                  </div>
                  <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Auto-Categorize</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically categorize transactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
