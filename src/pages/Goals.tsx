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
import { Plus, Target, TrendingUp, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Financial Goals Data
const financialGoals = [
  {
    id: 1,
    name: "Pay Off Credit Card Debt",
    category: "debt_reduction",
    targetAmount: 100000,
    currentAmount: 68000,
    deadline: "Mar 2025",
    priority: "high",
    progress: 68,
    status: "in_progress",
    description: "Clear all credit card balances",
    milestones: [
      { amount: 25000, completed: true, date: "Dec 2024" },
      { amount: 50000, completed: true, date: "Jan 2025" },
      { amount: 75000, completed: false, date: "Feb 2025" },
      { amount: 100000, completed: false, date: "Mar 2025" },
    ],
  },
  {
    id: 2,
    name: "Emergency Fund",
    category: "savings",
    targetAmount: 500000,
    currentAmount: 180000,
    deadline: "Dec 2025",
    priority: "high",
    progress: 36,
    status: "in_progress",
    description: "Build 6 months of emergency savings",
    milestones: [
      { amount: 100000, completed: true, date: "Aug 2024" },
      { amount: 200000, completed: false, date: "Dec 2024" },
      { amount: 400000, completed: false, date: "Jun 2025" },
      { amount: 500000, completed: false, date: "Dec 2025" },
    ],
  },
  {
    id: 3,
    name: "Down Payment for Home",
    category: "investment",
    targetAmount: 2000000,
    currentAmount: 850000,
    deadline: "Dec 2026",
    priority: "medium",
    progress: 42,
    status: "in_progress",
    description: "Save for down payment on property",
    milestones: [
      { amount: 500000, completed: true, date: "Jan 2024" },
      { amount: 1000000, completed: true, date: "Jul 2024" },
      { amount: 1500000, completed: false, date: "Jun 2026" },
      { amount: 2000000, completed: false, date: "Dec 2026" },
    ],
  },
  {
    id: 4,
    name: "Pay Off Home Loan",
    category: "debt_reduction",
    targetAmount: 3500000,
    currentAmount: 2650000,
    deadline: "Dec 2029",
    priority: "medium",
    progress: 76,
    status: "on_track",
    description: "Complete home loan repayment",
    milestones: [
      { amount: 1000000, completed: true, date: "Mar 2015" },
      { amount: 2000000, completed: true, date: "Mar 2020" },
      { amount: 3000000, completed: false, date: "Mar 2027" },
      { amount: 3500000, completed: false, date: "Dec 2029" },
    ],
  },
  {
    id: 5,
    name: "Investment Portfolio",
    category: "investment",
    targetAmount: 1500000,
    currentAmount: 450000,
    deadline: "Jun 2027",
    priority: "medium",
    progress: 30,
    status: "in_progress",
    description: "Build long-term investment portfolio",
    milestones: [
      { amount: 300000, completed: true, date: "Jan 2024" },
      { amount: 750000, completed: false, date: "Jan 2025" },
      { amount: 1200000, completed: false, date: "Jan 2026" },
      { amount: 1500000, completed: false, date: "Jun 2027" },
    ],
  },
  {
    id: 6,
    name: "Vacation Fund",
    category: "savings",
    targetAmount: 300000,
    currentAmount: 280000,
    deadline: "Feb 2025",
    priority: "low",
    progress: 93,
    status: "completed",
    description: "Holiday trip to Europe",
    milestones: [
      { amount: 100000, completed: true, date: "Aug 2024" },
      { amount: 200000, completed: true, date: "Nov 2024" },
      { amount: 300000, completed: true, date: "Jan 2025" },
    ],
  },
];

const goalsStatistics = {
  totalGoals: 6,
  completedGoals: 1,
  inProgressGoals: 4,
  atRiskGoals: 1,
  totalTargetAmount: 7800000,
  totalSavedAmount: 3478000,
  overallProgress: 44.6,
};

export default function Goals() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "on_track":
        return "bg-blue-100 text-blue-800";
      case "at_risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredGoals = 
    selectedPriority === "all" 
      ? financialGoals 
      : financialGoals.filter(g => g.priority === selectedPriority);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">Financial Goals</h1>
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{goal.name}</p>
                      <p className="text-xs text-muted-foreground">{goal.description}</p>
                    </div>
                    <Badge className={getPriorityColor(goal.priority)} variant="outline">
                      {goal.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>₹{goal.currentAmount.toLocaleString()}</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} />
                    <p className="text-xs text-muted-foreground">
                      Target: ₹{goal.targetAmount.toLocaleString()} by {goal.deadline}
                    </p>
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

        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-h1 lg:text-display">Financial Goals</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Set and track your financial objectives
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goalsStatistics.totalGoals}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goalsStatistics.completedGoals}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goalsStatistics.inProgressGoals}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goalsStatistics.atRiskGoals}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goalsStatistics.overallProgress.toFixed(1)}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Goals Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="at_risk">At Risk</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {["all", "high", "medium", "low"].map((priority) => (
                    <Button
                      key={priority}
                      variant={selectedPriority === priority ? "default" : "outline"}
                      onClick={() => setSelectedPriority(priority)}
                      size="sm"
                      className="capitalize"
                    >
                      {priority === "all" ? "All" : priority}
                    </Button>
                  ))}
                </div>
                
                <div className="grid gap-4">
                  {filteredGoals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1 flex-1">
                              <CardTitle>{goal.name}</CardTitle>
                              <CardDescription>{goal.description}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getPriorityColor(goal.priority)} variant="outline">
                                {goal.priority}
                              </Badge>
                              <Badge className={getStatusColor(goal.status)} variant="outline">
                                {goal.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                              <span>{goal.progress}% Complete</span>
                            </div>
                            <Progress value={goal.progress} />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Target Deadline</p>
                              <p className="font-semibold">{goal.deadline}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Remaining Amount</p>
                              <p className="font-semibold">₹{(goal.targetAmount - goal.currentAmount).toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <p className="text-sm font-semibold mb-3">Milestones</p>
                            <div className="space-y-2">
                              {goal.milestones.map((milestone, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                    milestone.completed ? "bg-green-500" : "bg-gray-300"
                                  }`}>
                                    {milestone.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">₹{milestone.amount.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button variant="default" size="sm">Update Progress</Button>
                            <Button variant="outline" size="sm">Edit Goal</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="in_progress" className="space-y-4">
                <div className="grid gap-4">
                  {financialGoals.filter(g => g.status === "in_progress").map((goal) => (
                    <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{goal.name}</CardTitle>
                          <CardDescription>{goal.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span>₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="grid gap-4">
                  {financialGoals.filter(g => g.status === "completed").map((goal) => (
                    <Card key={goal.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{goal.name}</CardTitle>
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">✓ Completed on {goal.deadline}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="at_risk" className="space-y-4">
                <div className="grid gap-4">
                  {financialGoals.filter(g => g.status === "at_risk").map((goal) => (
                    <Card key={goal.id} className="border-red-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{goal.name}</CardTitle>
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} />
                        <p className="text-xs text-red-600">⚠ This goal may not be achieved by {goal.deadline}</p>
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
