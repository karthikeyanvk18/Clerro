import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { EMIList } from "@/components/dashboard/EMIList";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingDown, Calendar, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Comprehensive EMI Data
const emiData = [
  {
    id: "1",
    name: "HDFC Credit Card",
    type: "credit_card" as const,
    amount: 15000,
    dueDate: "Jan 5, 2025",
    daysLeft: 2,
    isPaid: false,
  },
  {
    id: "2",
    name: "Home Loan - SBI",
    type: "home_loan" as const,
    amount: 42500,
    dueDate: "Jan 10, 2025",
    daysLeft: 7,
    isPaid: false,
  },
  {
    id: "3",
    name: "Car Loan - ICICI",
    type: "car_loan" as const,
    amount: 18200,
    dueDate: "Jan 15, 2025",
    daysLeft: 12,
    isPaid: false,
  },
  {
    id: "4",
    name: "Education Loan",
    type: "education" as const,
    amount: 8500,
    dueDate: "Dec 28, 2024",
    daysLeft: 0,
    isPaid: true,
  },
  {
    id: "5",
    name: "Credit Card - ICICI",
    type: "credit_card" as const,
    amount: 12000,
    dueDate: "Jan 8, 2025",
    daysLeft: 5,
    isPaid: false,
  },
  {
    id: "6",
    name: "Home Loan - HDFC",
    type: "home_loan" as const,
    amount: 35000,
    dueDate: "Jan 12, 2025",
    daysLeft: 9,
    isPaid: false,
  },
];

// Loan details with full options
const loanDetails = [
  {
    id: "1",
    name: "Home Loan - SBI",
    type: "home_loan",
    principal: 3500000,
    interest: 6.5,
    emi: 42500,
    tenure: 20,
    startDate: "Mar 2010",
    endDate: "Feb 2030",
    totalPaid: 2550000,
    remaining: 950000,
    processingFee: 50000,
    rateType: "Fixed",
    bank: "State Bank of India",
    accountNumber: "XXXX XXXX XXXX 1234",
    propertyAddress: "123 Main Street, Mumbai",
  },
  {
    id: "2",
    name: "Car Loan - ICICI",
    type: "car_loan",
    principal: 800000,
    interest: 9.2,
    emi: 18200,
    tenure: 5,
    startDate: "Jan 2023",
    endDate: "Dec 2027",
    totalPaid: 145600,
    remaining: 654400,
    processingFee: 8000,
    rateType: "Fixed",
    bank: "ICICI Bank",
    accountNumber: "XXXX XXXX XXXX 5678",
    vehicleRegNumber: "KA01AB1234",
  },
];

const loanStatistics = {
  totalLoans: 6,
  totalAmount: 131200,
  totalDebt: 847500,
  averageInterestRate: 7.85,
  nextDueDate: "Jan 5, 2025",
  totalPaidThisYear: 250000,
};

export default function EMIAndLoans() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">EMI & Loans</h1>
          <EMIList emis={emiData} />
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
                <h1 className="text-h1 lg:text-display">EMI & Loans</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Manage all your loans and EMI payments in one place
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add New Loan
              </Button>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loanStatistics.totalLoans}</div>
                  <p className="text-xs text-muted-foreground">Active loan accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month EMI</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{loanStatistics.totalAmount.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Due on {loanStatistics.nextDueDate}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{loanStatistics.totalDebt.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Principal outstanding</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Interest Rate</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loanStatistics.averageInterestRate}%</div>
                  <p className="text-xs text-muted-foreground">Across all loans</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
                <TabsTrigger value="details">Loan Details</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle>All EMI & Loans</CardTitle>
                    <CardDescription>
                      Track all your loans and EMI payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EMIList emis={emiData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                    <CardDescription>
                      EMI due in the next 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EMIList emis={emiData.filter(emi => emi.daysLeft > 0 && emi.daysLeft <= 30)} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4">
                  {loanDetails.map((loan) => (
                    <Card key={loan.id} className="dark:bg-[rgb(4,35,51)]">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{loan.name}</CardTitle>
                            <CardDescription>{loan.bank}</CardDescription>
                          </div>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Principal Amount</p>
                            <p className="text-lg font-semibold">₹{loan.principal.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly EMI</p>
                            <p className="text-lg font-semibold">₹{loan.emi.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Interest Rate</p>
                            <p className="text-lg font-semibold">{loan.interest}% {loan.rateType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tenure</p>
                            <p className="text-lg font-semibold">{loan.tenure} Years</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Amount Paid</p>
                            <p className="text-lg font-semibold">₹{loan.totalPaid.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Remaining</p>
                            <p className="text-lg font-semibold">₹{loan.remaining.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Loan Period</p>
                              <p className="text-sm">{loan.startDate} to {loan.endDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Account Number</p>
                              <p className="text-sm font-mono">{loan.accountNumber}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
