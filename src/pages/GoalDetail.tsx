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
import { ArrowLeft, Edit2, Trash2, Target, Calendar, TrendingUp } from "lucide-react";

export default function GoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  // Mock data
  const goal = {
    id: 1,
    title: "Emergency Fund",
    description: "Build an emergency fund of 6 months expenses",
    targetAmount: 500000,
    currentAmount: 325000,
    targetDate: "Dec 31, 2025",
    category: "Savings",
    priority: "High",
    status: "In Progress",
    createdDate: "Jan 1, 2024",
    monthlyContribution: 25000,
  };

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const monthsRemaining = 12;

  const contributions = [
    { date: "Dec 31, 2024", amount: 25000 },
    { date: "Nov 30, 2024", amount: 25000 },
    { date: "Oct 31, 2024", amount: 25000 },
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
              onClick={() => navigate("/goals")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-h3 font-bold">{goal.title}</h1>
              <p className="text-muted-foreground text-sm mt-1">Goal Details</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Goal Card */}
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-pink/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Target Amount</span>
              <Badge className="bg-primary">{goal.priority}</Badge>
            </div>
            <p className="text-2xl font-bold">₹{goal.targetAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Target Date: {goal.targetDate}</p>
          </Card>

          {/* Progress */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                Saved: ₹{(goal.currentAmount / 100000).toFixed(2)}L
              </p>
              <p className="text-xs text-muted-foreground">
                Remaining: ₹{(remainingAmount / 100000).toFixed(2)}L
              </p>
            </div>
          </Card>

          {/* Key Details */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Details</h3>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold">{goal.status}</p>
              </div>
              <Badge className="bg-primary dark:bg-primary">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-semibold">{goal.category}</p>
              </div>
              <Target className="h-5 w-5 text-purple-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                <p className="font-semibold">₹{goal.monthlyContribution.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Months Remaining</p>
                <p className="font-semibold">{monthsRemaining}</p>
              </div>
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
          </Card>

          {/* Description */}
          {goal.description && (
            <Card className="p-4">
              <h3 className="font-semibold text-sm mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </Card>
          )}

          {/* Recent Contributions */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Recent Contributions</h3>
            <div className="space-y-2">
              {contributions.map((contrib, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">{contrib.date}</p>
                    <p className="font-semibold text-sm">Contributed</p>
                  </div>
                  <span className="font-semibold">₹{contrib.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              onClick={() => navigate(`/goal/${id}/edit`)}
              variant="outline"
              className="w-full h-10"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Goal
            </Button>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this goal?")) {
                  navigate("/goals");
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
              <Button variant="ghost" onClick={() => navigate("/goals")} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Goals
              </Button>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-h1 font-bold">{goal.title}</h1>
                  <p className="text-muted-foreground">Financial Goal Details</p>
                </div>
                <Badge className="bg-purple-500">{goal.priority}</Badge>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card className="p-6 bg-gradient-to-br from-purple/10 to-pink/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Target Amount</span>
                    <Target className="h-5 w-5 text-purple-500" />
                  </div>
                  <p className="text-h1 font-bold">₹{goal.targetAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">Target Date: {goal.targetDate}</p>
                </Card>

                {/* Progress Card */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Progress</h2>
                  <div className="space-y-3">
                    <Progress value={progress} className="h-3" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Saved</p>
                        <p className="font-bold">₹{(goal.currentAmount / 100000).toFixed(2)}L</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Target</p>
                        <p className="font-bold">₹{(goal.targetAmount / 100000).toFixed(2)}L</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                        <p className="font-bold">₹{(remainingAmount / 100000).toFixed(2)}L</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Details Grid */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Goal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-semibold">{goal.category}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge className="bg-blue-600 dark:bg-blue-500">{goal.status}</Badge>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Contribution</p>
                      <p className="font-semibold">₹{goal.monthlyContribution.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Created Date</p>
                      <p className="font-semibold">{goal.createdDate}</p>
                    </div>
                  </div>
                </Card>

                {/* Description */}
                {goal.description && (
                  <Card className="p-6">
                    <h2 className="font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground">{goal.description}</p>
                  </Card>
                )}

                {/* Recent Contributions */}
                <Card className="p-6 space-y-4">
                  <h2 className="font-semibold">Recent Contributions</h2>
                  <div className="space-y-2">
                    {contributions.map((contrib, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition"
                      >
                        <div>
                          <p className="text-sm text-muted-foreground">{contrib.date}</p>
                          <p className="font-medium">Contributed</p>
                        </div>
                        <span className="font-semibold">₹{contrib.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 space-y-3">
                  <h3 className="font-semibold">Timeline</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Months Remaining</p>
                      <p className="text-lg font-bold">{monthsRemaining}</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Target Date</p>
                      <p className="font-semibold text-sm">{goal.targetDate}</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Monthly Needed</p>
                      <p className="text-lg font-bold">₹{goal.monthlyContribution.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-2">
                  <Button
                    onClick={() => navigate(`/goal/${id}/edit`)}
                    variant="outline"
                    className="w-full h-10"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Goal
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this goal?")) {
                        navigate("/goals");
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
