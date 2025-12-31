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
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  Brain,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function AIAdvice() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">AI Financial Advisor</h1>

          {/* Health Score */}
          <Card className="bg-gradient-to-br from-blue-50 to-transparent border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Financial Health Score</p>
                <p className="text-4xl font-bold text-blue-600 mb-2">78/100</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Good - Room for improvement</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          {[
            { title: "Spend Optimizer", desc: "Save ₹5,000/month by reducing subscriptions", icon: Lightbulb, color: "amber" },
            { title: "Debt Strategy", desc: "Avalanche method saves ₹23,000 interest", icon: Brain, color: "purple" },
            { title: "Risk Alert", desc: "Savings below recommended 3-month buffer", icon: AlertTriangle, color: "red" },
            { title: "Savings Automation", desc: "Set ₹10,000 auto-transfer every salary day", icon: Zap, color: "green" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-4">
                  <div className="flex gap-3">
                    <Icon className={`w-5 h-5 text-${item.color}-600 flex-shrink-0 mt-1`} />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
              <h1 className="text-4xl font-bold">AI Financial Advisor</h1>
              <p className="text-muted-foreground mt-2">Personalized financial insights powered by AI</p>
            </motion.div>

            {/* Health Score Card */}
            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-1"
              >
                <Card className="bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 border-blue-200">
                  <CardHeader>
                    <CardTitle>Financial Health Score</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-blue-600 mb-2">78</div>
                      <p className="text-sm font-medium">Out of 100</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Debt Management</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Savings Rate</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Income Growth</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Emergency Fund</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <Progress value={45} />
                      </div>
                    </div>

                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Emergency fund below 3-month threshold. Aim for ₹1,50,000.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Recommendations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 space-y-4"
              >
                {/* Spend Optimizer */}
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-600" />
                        <div>
                          <CardTitle className="text-lg">AI Spend Optimizer</CardTitle>
                          <CardDescription>Monthly savings potential</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-amber-600">Savings: ₹5,000</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-3">
                      {[
                        { name: "Netflix + Prime + Disney+", current: "₹799/mo", optimize: "→ ₹299/mo", save: "₹500" },
                        { name: "Gym Membership", current: "₹2,000/mo", optimize: "→ Unused", save: "₹2,000" },
                        { name: "Coffee Budget", current: "₹3,000/mo", optimize: "→ ₹2,000/mo", save: "₹1,000" },
                        { name: "Eating Out", current: "₹4,500/mo", optimize: "→ ₹3,500/mo", save: "₹1,000" },
                      ].map((item, i) => (
                        <div key={i} className="p-3 rounded-lg border bg-white text-sm">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{item.current}</span>
                            <span className="text-green-600 font-medium">{item.optimize}</span>
                          </div>
                          <p className="text-xs text-green-600 font-medium mt-1">💚 Save {item.save}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">Implement Suggestions</Button>
                  </CardContent>
                </Card>

                {/* Debt Strategy */}
                <Card className="border-purple-200 bg-purple-50/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle className="text-lg">AI Debt Avalanche Strategy</CardTitle>
                          <CardDescription>Auto-generated payoff plan</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-purple-600">Save ₹23,000 Interest</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border space-y-2 text-sm">
                      <p className="font-medium">Recommended Payment Order:</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>1. Credit Card (18% interest) - Pay ₹20,000/month</p>
                        <p>2. Personal Loan (12% interest) - Pay ₹15,000/month</p>
                        <p>3. Education Loan (5% interest) - Minimum payment</p>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Apply Strategy</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Risk Alerts & Automation */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Predictive Risk Alerts */}
              <Card className="border-red-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <CardTitle>Predictive Risk Alerts</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { risk: "Low savings buffer", severity: "High", action: "Build emergency fund" },
                    { risk: "Debt-to-income ratio increasing", severity: "Medium", action: "Reduce new borrowing" },
                    { risk: "Subscription creep detected", severity: "Low", action: "Review subscriptions" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-red-50/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{item.risk}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.action}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            item.severity === "High"
                              ? "bg-red-100 text-red-700"
                              : item.severity === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {item.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Savings Automation */}
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <CardTitle>AI Savings Automation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg border bg-green-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">Salary Day Auto-Transfer</p>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₹10,000</p>
                    <p className="text-xs text-muted-foreground mt-1">Every 1st of month → Savings Account</p>
                  </div>

                  <div className="p-3 rounded-lg border bg-blue-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">Round-up Savings</p>
                      <Badge variant="outline">Suggested</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Save leftover amounts after spending</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Enable Round-ups
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg border bg-purple-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">Goal-Based Savings</p>
                      <Badge variant="outline">Setup</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Auto-allocate toward your goals</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Configure Goals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
