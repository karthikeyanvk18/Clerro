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
import { Progress } from "@/components/ui/progress";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, TrendingUp, Calendar, DollarSign } from "lucide-react";

export default function DebtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  // Mock data - in a real app, fetch from API using id
  const debt = {
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
    paymentHistory: [
      { date: "Dec 10, 2024", amount: 42500, status: "Paid" },
      { date: "Nov 10, 2024", amount: 42500, status: "Paid" },
      { date: "Oct 10, 2024", amount: 42500, status: "Paid" },
    ],
  };

  const progress = ((debt.principal - debt.remaining) / debt.principal) * 100;

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => navigate("/debts")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-h3 font-bold">{debt.name}</h1>
              <p className="text-muted-foreground text-sm mt-1">Loan Details</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Status Card */}
          <Card className="p-4 bg-gradient-to-br from-slate/10 to-navy/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <Badge className="bg-emerald">Active</Badge>
            </div>
            <p className="text-2xl font-bold">₹{(debt.remaining / 100000).toFixed(2)}L</p>
            <p className="text-xs text-muted-foreground mt-1">Remaining Balance</p>
          </Card>

          {/* Progress */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground mt-2">
              ₹{(debt.totalPaid / 100000).toFixed(2)}L of ₹{(debt.principal / 100000).toFixed(2)}L paid
            </p>
          </Card>

          {/* Key Details */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Details</h3>
            
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Monthly EMI</p>
                <p className="font-semibold">₹{debt.monthlyEMI.toLocaleString()}</p>
              </div>
              <DollarSign className="h-5 w-5 text-emerald" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Interest Rate</p>
                <p className="font-semibold">{debt.interestRate}% p.a</p>
              </div>
              <TrendingUp className="h-5 w-5 text-gold" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Years Remaining</p>
                <p className="font-semibold">{debt.yearsRemaining} years</p>
              </div>
              <Calendar className="h-5 w-5 text-slate" />
            </div>
          </Card>

          {/* Payment History */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Recent Payments</h3>
            {debt.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between pb-2 border-b last:border-b-0">
                <div>
                  <p className="text-sm font-medium">{payment.date}</p>
                  <p className="text-xs text-muted-foreground">{payment.status}</p>
                </div>
                <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
              </div>
            ))}
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              onClick={() => navigate(`/debt/${id}/payment`)}
              className="w-full bg-emerald hover:bg-emerald/90 h-10"
            >
              Make Payment
            </Button>
            <Button
              onClick={() => navigate(`/debt/${id}/edit`)}
              variant="outline"
              className="w-full h-10"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
          </div>
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
              className="mb-6"
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/debts")}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Debts
              </Button>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-h1 font-bold">{debt.name}</h1>
                  <p className="text-muted-foreground">Loan Details & Payment History</p>
                </div>
                <Badge className="bg-emerald text-lg px-4 py-2">Active</Badge>
              </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-6 bg-gradient-to-br from-slate/10 to-navy/10">
                    <p className="text-muted-foreground text-sm mb-2">Remaining Balance</p>
                    <p className="text-h2 font-bold">₹{(debt.remaining / 100000).toFixed(2)}L</p>
                    <p className="text-xs text-muted-foreground mt-4">{progress.toFixed(1)}% complete</p>
                  </Card>

                  <Card className="p-6">
                    <p className="text-muted-foreground text-sm mb-2">Monthly EMI</p>
                    <p className="text-h2 font-bold">₹{debt.monthlyEMI.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-4">Next payment in {debt.daysUntilPayment} days</p>
                  </Card>
                </div>

                {/* Progress */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Repayment Progress</h2>
                  <Progress value={progress} />
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Paid</p>
                      <p className="font-semibold">₹{(debt.totalPaid / 100000).toFixed(2)}L</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Original Amount</p>
                      <p className="font-semibold">₹{(debt.principal / 100000).toFixed(2)}L</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="font-semibold">₹{(debt.remaining / 100000).toFixed(2)}L</p>
                    </div>
                  </div>
                </Card>

                {/* Payment History */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>
                  <div className="space-y-3">
                    {debt.paymentHistory.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{payment.date}</p>
                          <p className="text-sm text-muted-foreground">{payment.status}</p>
                        </div>
                        <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Key Metrics */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-2xl font-bold">{debt.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tenure</p>
                      <p className="text-2xl font-bold">{debt.tenure} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-2xl font-bold">{debt.yearsRemaining} years</p>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate(`/debt/${id}/payment`)}
                    className="w-full bg-emerald hover:bg-emerald/90 h-10"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Make Payment
                  </Button>
                  <Button
                    onClick={() => navigate(`/debt/${id}/edit`)}
                    variant="outline"
                    className="w-full h-10"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this debt?")) {
                        navigate("/debts");
                      }
                    }}
                    variant="outline"
                    className="w-full h-10 text-crimson hover:text-crimson"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
