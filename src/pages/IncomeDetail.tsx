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
import { ArrowLeft, Edit2, Trash2, TrendingUp, Calendar, User } from "lucide-react";

export default function IncomeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  // Mock data
  const income = {
    id: 1,
    title: "Salary",
    source: "Employer",
    amount: 150000,
    frequency: "Monthly",
    category: "Salary",
    status: "Active",
    startDate: "Jan 1, 2024",
    nextPaymentDate: "Jan 31, 2025",
    daysUntilPayment: 5,
    description: "Monthly salary from ABC Corporation",
    totalReceived: 1500000,
    yearsActive: 1,
  };

  const incomeHistory = [
    { date: "Dec 31, 2024", amount: 150000, status: "Received" },
    { date: "Nov 30, 2024", amount: 150000, status: "Received" },
    { date: "Oct 31, 2024", amount: 150000, status: "Received" },
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
              onClick={() => navigate("/income")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-h3 font-bold">{income.title}</h1>
              <p className="text-muted-foreground text-sm mt-1">Income Details</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Income Card */}
          <Card className="p-4 bg-gradient-to-br from-blue/10 to-cyan/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Amount</span>
              <Badge className="bg-blue-500">Active</Badge>
            </div>
            <p className="text-2xl font-bold">₹{income.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{income.frequency}</p>
          </Card>

          {/* Key Details */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Details</h3>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Source</p>
                <p className="font-semibold">{income.source}</p>
              </div>
              <User className="h-5 w-5 text-blue-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-semibold">{income.category}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="font-semibold">{income.startDate}</p>
              </div>
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Total Received</p>
                <p className="font-semibold">₹{(income.totalReceived / 100000).toFixed(2)}L</p>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald" />
            </div>
          </Card>

          {/* Description */}
          {income.description && (
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{income.description}</p>
            </Card>
          )}

          {/* Recent Payments */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Recent Payments</h3>
            <div className="space-y-2">
              {incomeHistory.map((payment, idx) => (
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
              onClick={() => navigate(`/income/${id}/edit`)}
              variant="outline"
              className="w-full h-10"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Income
            </Button>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this income source?")) {
                  navigate("/income");
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

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Button variant="ghost" onClick={() => navigate("/income")} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Income
              </Button>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-h1 font-bold">{income.title}</h1>
                  <p className="text-muted-foreground">Income Details</p>
                </div>
                <Badge className="bg-blue-500">Active</Badge>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card className="p-6 bg-gradient-to-br from-blue/10 to-cyan/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Monthly Income</span>
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-h1 font-bold">₹{income.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">{income.frequency}</p>
                </Card>

                {/* Details Grid */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Income Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Source</p>
                      <p className="font-semibold">{income.source}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-semibold">{income.category}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                      <p className="font-semibold">{income.startDate}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Years Active</p>
                      <p className="font-semibold">{income.yearsActive} year(s)</p>
                    </div>
                  </div>
                </Card>

                {/* Description */}
                {income.description && (
                  <Card className="p-6">
                    <h2 className="font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground">{income.description}</p>
                  </Card>
                )}

                {/* Recent Payments */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Recent Payments</h2>
                  <div className="space-y-2">
                    {incomeHistory.map((payment, idx) => (
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
                      <p className="text-xs text-muted-foreground">Total Received</p>
                      <p className="text-lg font-bold">₹{(income.totalReceived / 100000).toFixed(2)}L</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-semibold">{income.frequency}</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Next Payment</p>
                      <p className="font-semibold">{income.nextPaymentDate}</p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-2">
                  <Button
                    onClick={() => navigate(`/income/${id}/edit`)}
                    variant="outline"
                    className="w-full h-10"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Income
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this income source?")) {
                        navigate("/income");
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
