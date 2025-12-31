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
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  BarChart3,
  Landmark,
  Coins,
  Target,
  PieChart,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Investments() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Investments</h1>

          {/* Portfolio Summary */}
          <Card className="bg-gradient-to-br from-blue-50 to-transparent border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-bold text-blue-600 mb-1">₹4,56,789</p>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+12.5% YTD</span>
              </div>
            </CardContent>
          </Card>

          {/* Investment Types */}
          {[
            { type: "SIP - Mutual Funds", value: "₹2,34,567", allocation: "51%", return: "+18.2%" },
            { type: "Direct Stocks", value: "₹1,23,456", allocation: "27%", return: "+8.5%" },
            { type: "Gold Investment", value: "₹67,890", allocation: "15%", return: "+4.2%" },
            { type: "NPS/EPF", value: "₹30,876", allocation: "7%", return: "+6.3%" },
          ].map((inv, i) => (
            <Card key={i}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm">{inv.type}</p>
                  <Badge variant={inv.return.includes("+") ? "default" : "destructive"}>{inv.return}</Badge>
                </div>
                <p className="text-lg font-bold">{inv.value}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: inv.allocation }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{inv.allocation} of portfolio</p>
              </CardContent>
            </Card>
          ))}
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
              <h1 className="text-4xl font-bold">Investments & Wealth Building</h1>
              <p className="text-muted-foreground mt-2">Grow your wealth with smart investments</p>
            </motion.div>

            {/* Portfolio Overview */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Total Value", value: "₹4,56,789", icon: TrendingUp, color: "blue" },
                { label: "Year Return", value: "+12.5%", icon: ArrowUpRight, color: "green" },
                { label: "Monthly Invested", value: "₹15,000", icon: Coins, color: "purple" },
                { label: "SIP Goals Active", value: "8", icon: Target, color: "orange" },
              ].map((item, i) => {
                const Icon = item.icon;
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
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="text-2xl font-bold mt-1">{item.value}</p>
                          </div>
                          <Icon className={`w-5 h-5 text-${item.color}-600 opacity-70`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Investment Categories */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              {/* Mutual Funds & SIP */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <div>
                        <CardTitle>Mutual Funds (SIP)</CardTitle>
                        <CardDescription>Systematic Investment Plans</CardDescription>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Add SIP
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Axis Growth Fund", monthly: "₹5,000", value: "₹78,456", return: "+24.5%" },
                    { name: "HDFC Mid-cap Plus", monthly: "₹7,000", value: "₹1,23,456", return: "+18.2%" },
                    { name: "Vanguard Index Fund", monthly: "₹3,000", value: "₹45,123", return: "+12.8%" },
                  ].map((fund, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-blue-50/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{fund.name}</p>
                          <p className="text-xs text-muted-foreground">₹{fund.monthly}/month</p>
                        </div>
                        <Badge variant="outline" className="text-green-700 bg-green-50">{fund.return}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold">{fund.value}</p>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Direct Stocks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <CardTitle>Direct Stocks</CardTitle>
                        <CardDescription>Individual stock holdings</CardDescription>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Buy Stock
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { symbol: "TCS", shares: 10, value: "₹45,670", return: "+8.2%" },
                    { symbol: "INFY", shares: 15, value: "₹54,320", return: "+5.6%" },
                    { symbol: "RELIANCE", shares: 5, value: "₹23,465", return: "+12.3%" },
                  ].map((stock, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-green-50/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.shares} shares</p>
                        </div>
                        <Badge variant="outline" className="text-green-700 bg-green-50">{stock.return}</Badge>
                      </div>
                      <p className="text-sm font-bold">{stock.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Retirement & Gold */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Retirement Planning */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-purple-600" />
                    <div>
                      <CardTitle>Retirement Planning</CardTitle>
                      <CardDescription>EPF, NPS, 401k</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "NPS Tier-1", value: "₹2,34,567", contribution: "₹5,000/month" },
                    { name: "EPF", value: "₹8,90,456", contribution: "₹18,750/month (auto)" },
                  ].map((plan, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-purple-50/30">
                      <p className="font-medium text-sm">{plan.name}</p>
                      <p className="text-lg font-bold mt-2">{plan.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{plan.contribution}</p>
                      <div className="mt-2 text-xs">
                        <div className="flex justify-between mb-1">
                          <span>Projected at 60:</span>
                          <span className="font-medium">₹45,67,890</span>
                        </div>
                        <Progress value={65} />
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                    Retirement Calculator
                  </Button>
                </CardContent>
              </Card>

              {/* Gold Investment */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <div>
                      <CardTitle>Gold Investment</CardTitle>
                      <CardDescription>Secure & traditional wealth</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg border bg-amber-50/30">
                    <p className="text-sm text-muted-foreground mb-1">Current Holdings</p>
                    <p className="text-2xl font-bold text-amber-600">10.5 grams</p>
                    <p className="text-sm mt-1">₹67,890 @ ₹6,465/gram</p>
                  </div>

                  <div className="p-3 rounded-lg border bg-amber-50/30">
                    <p className="text-sm text-muted-foreground mb-2">Investment Options</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Physical Gold</span>
                        <Badge variant="outline">1.5% charges</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Gold ETF</span>
                        <Badge variant="outline">0.4% charges</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Digital Gold</span>
                        <Badge variant="outline">0.2% charges</Badge>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Buy Gold
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
