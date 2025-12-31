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
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2, TrendingDown, Calendar, Tag } from "lucide-react";

export default function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  // Mock data
  const expense = {
    id: 1,
    title: "Electricity Bill",
    category: "Utilities",
    amount: 3500,
    frequency: "Monthly",
    status: "Active",
    dueDate: "5th of each month",
    nextPaymentDate: "Jan 5, 2025",
    daysUntilPayment: 2,
    description: "Monthly electricity bill for home",
    totalSpent: 42000,
    yearsActive: 1,
    tag: "Essential",
  };

  const expenseHistory = [
    { date: "Dec 5, 2024", amount: 3500, status: "Paid" },
    { date: "Nov 5, 2024", amount: 3200, status: "Paid" },
    { date: "Oct 5, 2024", amount: 3600, status: "Paid" },
  ];

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
              onClick={() => navigate("/expenses")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-h3 font-bold">{expense.title}</h1>
              <p className="text-muted-foreground text-sm mt-1">Expense Details</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Expense Card */}
          <Card className="p-4 bg-gradient-to-br from-destructive/10 to-amber/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Amount</span>
              <Badge className="bg-amber-600 dark:bg-amber-500">{expense.tag}</Badge>
            </div>
            <p className="text-2xl font-bold">₹{expense.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{expense.frequency}</p>
          </Card>

          {/* Key Details */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Details</h3>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-semibold">{expense.category}</p>
              </div>
              <Tag className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="font-semibold">{expense.dueDate}</p>
              </div>
              <Calendar className="h-5 w-5 text-destructive dark:text-red-400" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Next Payment</p>
                <p className="font-semibold">{expense.nextPaymentDate}</p>
              </div>
              <TrendingDown className="h-5 w-5 text-destructive dark:text-red-400" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="font-semibold">₹{(expense.totalSpent / 1000).toFixed(1)}K</p>
              </div>
              <TrendingDown className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            </div>
          </Card>

          {/* Description */}
          {expense.description && (
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            </Card>
          )}

          {/* Recent Payments */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Recent Payments</h3>
            <div className="space-y-2">
              {expenseHistory.map((payment, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                    <p className="font-semibold text-sm">{payment.status}</p>
                  </div>
                  <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              onClick={() => navigate(`/expense/${id}/edit`)}
              variant="outline"
              className="w-full h-10"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Expense
            </Button>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this expense?")) {
                  navigate("/expenses");
                }
              }}
              variant="destructive"
              className="w-full h-10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
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

        <main className="flex-1 p-6 pt-16">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Button variant="ghost" onClick={() => navigate("/expenses")} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Expenses
              </Button>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-h1 font-bold">{expense.title}</h1>
                  <p className="text-muted-foreground">Expense Details</p>
                </div>
                <Badge className="bg-amber-600 dark:bg-amber-500">{expense.tag}</Badge>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card className="p-6 bg-gradient-to-br from-destructive/10 to-amber/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Monthly Expense</span>
                    <TrendingDown className="h-5 w-5 text-destructive dark:text-red-400" />
                  </div>
                  <p className="text-h1 font-bold">₹{expense.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">{expense.frequency}</p>
                </Card>

                {/* Details Grid */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Expense Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-semibold">{expense.category}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                      <p className="font-semibold">{expense.dueDate}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Next Payment</p>
                      <p className="font-semibold">{expense.nextPaymentDate}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge className="bg-green-600 dark:bg-green-500">{expense.status}</Badge>
                    </div>
                  </div>
                </Card>

                {/* Description */}
                {expense.description && (
                  <Card className="p-6">
                    <h2 className="font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground">{expense.description}</p>
                  </Card>
                )}

                {/* Recent Payments */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Recent Payments</h2>
                  <div className="space-y-2">
                    {expenseHistory.map((payment, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition"
                      >
                        <div>
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                          <p className="font-medium">{payment.status}</p>
                        </div>
                        <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 space-y-3">
                  <h3 className="font-semibold">Statistics</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                      <p className="text-lg font-bold">₹{(expense.totalSpent / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-semibold">{expense.frequency}</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Years Active</p>
                      <p className="font-semibold">{expense.yearsActive} year(s)</p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-2">
                  <Button
                    onClick={() => navigate(`/expense/${id}/edit`)}
                    variant="outline"
                    className="w-full h-10"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Expense
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this expense?")) {
                        navigate("/expenses");
                      }
                    }}
                    variant="destructive"
                    className="w-full h-10"
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
