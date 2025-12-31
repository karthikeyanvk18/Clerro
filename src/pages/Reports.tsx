import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Calculator,
  Globe,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Share2,
  Settings,
  Clock,
  Calendar,
} from "lucide-react";

interface ReportOption {
  id: string;
  name: string;
  description: string;
  formats: string[];
  icon: React.ElementType;
}

const reportOptions: ReportOption[] = [
  {
    id: "comprehensive",
    name: "Comprehensive Report",
    description: "Full financial summary including all debts, income, and expenses",
    formats: ["PDF", "CSV", "Excel"],
    icon: FileText,
  },
  {
    id: "tax",
    name: "Tax Report",
    description: "Interest paid summary for tax filing",
    formats: ["PDF", "CSV"],
    icon: DollarSign,
  },
  {
    id: "bank",
    name: "Bank Submission Report",
    description: "Debt repayment history for bank applications",
    formats: ["PDF"],
    icon: BarChart3,
  },
  {
    id: "monthly",
    name: "Monthly Statements",
    description: "Month-wise transaction and payment reports",
    formats: ["PDF", "CSV", "Excel"],
    icon: Calendar,
  },
];

export default function Reports() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (reportId: string, format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`✅ ${reportId} exported as ${format}!`);
    }, 1500);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40 px-4 py-4">
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Download & analyze</p>
        </div>

        <div className="px-4 py-4 space-y-4">
          <Tabs defaultValue="exports" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="exports">Export</TabsTrigger>
              <TabsTrigger value="scenario">Scenario</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="exports" className="space-y-4">
              <div className="flex gap-2">
                {["PDF", "CSV", "Excel"].map((format) => (
                  <Button
                    key={format}
                    variant={selectedFormat === format ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(format)}
                    className="text-xs h-8"
                  >
                    {format}
                  </Button>
                ))}
              </div>

              <div className="space-y-3">
                {reportOptions.map((report) => {
                  const Icon = report.icon;
                  return (
                    <Card key={report.id} className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Icon className="h-5 w-5 text-emerald mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{report.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleExport(report.id, selectedFormat)}
                        className="w-full bg-emerald hover:bg-emerald/90 h-8 text-xs"
                        disabled={isExporting}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {isExporting ? "Exporting..." : "Export"}
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="scenario">
              <Card className="p-4 space-y-3">
                <h3 className="font-semibold text-sm">What If Calculator</h3>
                <input
                  type="text"
                  placeholder="Monthly Payment"
                  defaultValue="50,000"
                  className="w-full px-3 py-2 rounded-lg border text-sm bg-background"
                />
                <input
                  type="text"
                  placeholder="Interest Rate %"
                  defaultValue="7.5"
                  className="w-full px-3 py-2 rounded-lg border text-sm bg-background"
                />
                <Button className="w-full bg-emerald hover:bg-emerald/90 h-8 text-sm">
                  <Calculator className="h-3 w-3 mr-2" />
                  Calculate
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-4 space-y-4">
                <h3 className="font-semibold text-sm">Currency</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { code: "INR", symbol: "₹" },
                    { code: "USD", symbol: "$" },
                    { code: "EUR", symbol: "€" },
                  ].map((c) => (
                    <Button
                      key={c.code}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                    >
                      {c.symbol} {c.code}
                    </Button>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
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
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 space-y-2"
            >
              <h1 className="text-h1 font-bold">Reports & Advanced Features</h1>
              <p className="text-muted-foreground">
                Download reports and plan your financial future
              </p>
            </motion.div>

            <Tabs defaultValue="exports" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="exports">Export Reports</TabsTrigger>
                <TabsTrigger value="scenario">Scenario Planner</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Export Reports Tab */}
              <TabsContent value="exports" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {["PDF", "CSV", "Excel"].map((format) => (
                      <Button
                        key={format}
                        variant={selectedFormat === format ? "default" : "outline"}
                        onClick={() => setSelectedFormat(format)}
                      >
                        {format}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportOptions.map((report, index) => {
                      const Icon = report.icon;
                      return (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6 hover:shadow-lg transition-all h-full">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="p-3 rounded-lg bg-emerald/10">
                                <Icon className="h-6 w-6 text-emerald" />
                              </div>
                              <Badge className="bg-emerald">Available</Badge>
                            </div>

                            <h3 className="font-semibold mb-2">{report.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {report.description}
                            </p>

                            <div className="mb-4 flex flex-wrap gap-2">
                              {report.formats.map((format) => (
                                <Badge key={format} variant="outline" className="text-xs">
                                  {format}
                                </Badge>
                              ))}
                            </div>

                            <Button
                              onClick={() => handleExport(report.id, selectedFormat)}
                              className="w-full bg-emerald hover:bg-emerald/90"
                              disabled={isExporting}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              {isExporting ? "Exporting..." : "Export Now"}
                            </Button>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Scenario Planner Tab */}
              <TabsContent value="scenario" className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-emerald/10 border-emerald/20">
                  <h3 className="font-semibold mb-2">What If Calculator</h3>
                  <p className="text-sm text-muted-foreground">
                    See how different payment strategies affect your debt payoff timeline and
                    interest saved.
                  </p>
                </Card>

                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Current Debt: Home Loan ₹12L</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Monthly Payment</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          defaultValue="50,000"
                          className="flex-1 px-3 py-2 rounded-lg border bg-background"
                        />
                        <span className="flex items-center px-3 font-medium">₹</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Interest Rate (p.a)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          defaultValue="7.5"
                          className="flex-1 px-3 py-2 rounded-lg border bg-background"
                        />
                        <span className="flex items-center px-3 font-medium">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Extra Payment</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          defaultValue="0"
                          className="flex-1 px-3 py-2 rounded-lg border bg-background"
                        />
                        <span className="flex items-center px-3 font-medium">₹</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald hover:bg-emerald/90">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Scenarios
                  </Button>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Multi-Currency Support
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Select your primary currency for all reports
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { code: "INR", symbol: "₹" },
                      { code: "USD", symbol: "$" },
                      { code: "EUR", symbol: "€" },
                    ].map((c) => (
                      <Button
                        key={c.code}
                        variant="outline"
                        className="h-auto flex-col items-start justify-start p-4"
                      >
                        <span className="text-h3 font-bold mb-1">{c.symbol}</span>
                        <span className="text-xs">{c.code}</span>
                      </Button>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
