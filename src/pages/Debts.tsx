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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, TrendingDown, DollarSign, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { debtTypeColors, getBadgeColor } from "@/lib/colors";

const debtsData = [
  {
    id: 1,
    name: "HDFC Home Loan",
    type: "home_loan",
    principal: 3500000,
    remaining: 2650000,
    interestRate: 6.5,
    monthlyEMI: 42500,
    nextPaymentDate: "Jan 10, 2025",
    daysUntilPayment: 7,
    totalPaid: 850000,
    tenure: 20,
    yearsRemaining: 15,
    status: "active",
  },
  {
    id: 2,
    name: "ICICI Car Loan",
    type: "car_loan",
    principal: 800000,
    remaining: 654400,
    interestRate: 9.2,
    monthlyEMI: 18200,
    nextPaymentDate: "Jan 15, 2025",
    daysUntilPayment: 12,
    totalPaid: 145600,
    tenure: 5,
    yearsRemaining: 3,
    status: "active",
  },
  {
    id: 3,
    name: "HDFC Credit Card",
    type: "credit_card",
    principal: 150000,
    remaining: 85000,
    interestRate: 42,
    monthlyEMI: 15000,
    nextPaymentDate: "Jan 5, 2025",
    daysUntilPayment: 2,
    totalPaid: 65000,
    tenure: null,
    yearsRemaining: null,
    status: "active",
  },
  {
    id: 4,
    name: "Personal Loan - Bajaj",
    type: "personal_loan",
    principal: 500000,
    remaining: 350000,
    interestRate: 12,
    monthlyEMI: 12000,
    nextPaymentDate: "Jan 8, 2025",
    daysUntilPayment: 5,
    totalPaid: 150000,
    tenure: 5,
    yearsRemaining: 3,
    status: "active",
  },
  {
    id: 5,
    name: "Education Loan",
    type: "education_loan",
    principal: 500000,
    remaining: 0,
    interestRate: 8.5,
    monthlyEMI: 0,
    nextPaymentDate: "Paid Off",
    daysUntilPayment: 0,
    totalPaid: 500000,
    tenure: 5,
    yearsRemaining: 0,
    status: "closed",
  },
];

export default function Debts() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const totalDebt = debtsData.reduce((sum, d) => sum + d.remaining, 0);
  const totalMonthlyEMI = debtsData.reduce((sum, d) => sum + (d.monthlyEMI || 0), 0);
  const debtsPaid = debtsData.reduce((sum, d) => sum + d.totalPaid, 0);
  const activeDebts = debtsData.filter(d => d.status === "active").length;

  const filteredDebts = activeTab === "all" ? debtsData : debtsData.filter(d => d.status === activeTab);

  const getTypeColor = (type: string) => {
    return getBadgeColor(type, debtTypeColors);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Debts</h1>
            <Button
              onClick={() => navigate("/debt/add")}
              size="icon-sm"
              className="bg-emerald hover:bg-emerald/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {filteredDebts.map((debt) => (
              <Card key={debt.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{debt.name}</p>
                      <Badge className={getTypeColor(debt.type)}>{debt.type}</Badge>
                    </div>
                    {debt.remaining === 0 && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Remaining: ₹{debt.remaining.toLocaleString()}</span>
                      <span className="font-semibold">{((debt.remaining / debt.principal) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={((debt.totalPaid / debt.principal) * 100)} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Monthly EMI: ₹{debt.monthlyEMI?.toLocaleString() || "N/A"}</span>
                      <span>{debt.interestRate}% p.a.</span>
                    </div>
                  </div>
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

        <main className="flex-1 p-4 lg:p-6 pt-16">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-h1 lg:text-display">Debts & Liabilities</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Track and manage all your debts in one place
                </p>
              </div>
              <Button
                onClick={() => navigate("/debt/add")}
                className="w-full sm:w-auto bg-emerald hover:bg-emerald/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Debt
              </Button>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalDebt.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Outstanding amount</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly EMI</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalMonthlyEMI.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total EMI commitment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{debtsPaid.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total paid off</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Debts</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeDebts}</div>
                  <p className="text-xs text-muted-foreground">Ongoing loans</p>
                </CardContent>
              </Card>
            </div>

            {/* Debts List */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="closed">Paid Off</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="grid gap-4">
                  {filteredDebts.map((debt) => (
                    <motion.div
                      key={debt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="flex items-center gap-2">
                                {debt.name}
                                {debt.remaining === 0 && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />}
                              </CardTitle>
                              <CardDescription>{debt.type.replace(/_/g, " ")}</CardDescription>
                            </div>
                            <Badge className={getTypeColor(debt.type)}>
                              {debt.interestRate}% p.a.
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {debt.remaining > 0 ? (
                            <>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Principal</p>
                                  <p className="font-semibold">₹{debt.principal.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Remaining</p>
                                  <p className="font-semibold">₹{debt.remaining.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Monthly EMI</p>
                                  <p className="font-semibold">₹{debt.monthlyEMI.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Next Payment</p>
                                  <p className="font-semibold text-sm">{debt.nextPaymentDate}</p>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-medium">Repayment Progress</span>
                                  <span className="text-sm font-semibold">
                                    {((debt.totalPaid / debt.principal) * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <Progress value={(debt.totalPaid / debt.principal) * 100} />
                              </div>

                              {debt.daysUntilPayment <= 7 && (
                                <div className="flex items-center gap-2 p-3 bg-amber-600/10 border border-amber-600/20 rounded-lg">
                                  <AlertCircle className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                                  <span className="text-sm text-amber-700 dark:text-amber-400">
                                    Payment due in {debt.daysUntilPayment} days
                                  </span>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button variant="default" className="flex-1">
                                  Make Payment
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="flex-1"
                                  onClick={() => navigate(`/debt/${debt.id}`)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
                              <CheckCircle2 className="h-6 w-6 text-green-700 dark:text-green-400" />
                              <div>
                                <p className="font-semibold text-green-700 dark:text-green-400">Debt Paid Off!</p>
                                <p className="text-sm text-green-600 dark:text-green-500">Congratulations! This debt has been fully repaid.</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
