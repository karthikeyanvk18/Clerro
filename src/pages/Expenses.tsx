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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Utensils, ShoppingBag, Zap, Smartphone, Heart, BookOpen, TrendingUp } from "lucide-react";
import { BarChart, Bar, PieChart as PieChartComponent, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const expenseData = [
  { month: "Jan", food: 14200, shopping: 11800, utilities: 5900, transport: 7500, health: 2100, education: 7500 },
  { month: "Feb", food: 12500, shopping: 9200, utilities: 5800, transport: 8100, health: 3200, education: 8000 },
  { month: "Mar", food: 15100, shopping: 13500, utilities: 6100, transport: 7200, health: 1800, education: 6500 },
  { month: "Apr", food: 13800, shopping: 10500, utilities: 5900, transport: 7800, health: 2500, education: 7800 },
  { month: "May", food: 14900, shopping: 12100, utilities: 6000, transport: 8200, health: 2100, education: 7200 },
  { month: "Jun", food: 13200, shopping: 11300, utilities: 5800, transport: 7600, health: 2800, education: 7500 },
];

const expenseCategories = [
  {
    id: 1,
    name: "Food & Dining",
    icon: Utensils,
    color: "bg-orange-100 text-orange-800",
    allocated: 15000,
    spent: 14200,
    transactions: 28,
  },
  {
    id: 2,
    name: "Shopping",
    icon: ShoppingBag,
    color: "bg-pink-100 text-pink-800",
    allocated: 12000,
    spent: 11800,
    transactions: 15,
  },
  {
    id: 3,
    name: "Utilities",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-800",
    allocated: 6000,
    spent: 5900,
    transactions: 5,
  },
  {
    id: 4,
    name: "Transportation",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-800",
    allocated: 8000,
    spent: 7500,
    transactions: 12,
  },
  {
    id: 5,
    name: "Health & Fitness",
    icon: Heart,
    color: "bg-red-100 text-red-800",
    allocated: 4000,
    spent: 2100,
    transactions: 8,
  },
  {
    id: 6,
    name: "Education",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-800",
    allocated: 8000,
    spent: 7500,
    transactions: 6,
  },
];

const pieData = expenseCategories.map(c => ({ name: c.name, value: c.spent }));
const COLORS = ["#ff9500", "#ec4899", "#eab308", "#3b82f6", "#ef4444", "#a855f7"];

const recentExpenses = [
  { id: 1, description: "Starbucks Coffee", category: "Food & Dining", amount: 450, date: "29 Dec", icon: Utensils },
  { id: 2, description: "Amazon Purchase", category: "Shopping", amount: 2340, date: "28 Dec", icon: ShoppingBag },
  { id: 3, description: "Electricity Bill", category: "Utilities", amount: 2100, date: "27 Dec", icon: Zap },
  { id: 4, description: "Uber Ride", category: "Transportation", amount: 320, date: "27 Dec", icon: TrendingUp },
  { id: 5, description: "Gym Membership", category: "Health & Fitness", amount: 500, date: "26 Dec", icon: Heart },
  { id: 6, description: "Online Course", category: "Education", amount: 1500, date: "25 Dec", icon: BookOpen },
];

export default function Expenses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.spent, 0);
  const totalAllocated = expenseCategories.reduce((sum, c) => sum + c.allocated, 0);
  const totalTransactions = expenseCategories.reduce((sum, c) => sum + c.transactions, 0);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <div className="space-y-3">
            {expenseCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">₹{cat.spent.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">Budget: ₹{cat.allocated.toLocaleString()}</p>
                  </CardContent>
                </Card>
              );
            })}
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
                <h1 className="text-h1 lg:text-display">Expenses</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Track and analyze your spending
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Allocated</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalAllocated.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Budget limit</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{(totalAllocated - totalExpenses).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Available</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTransactions}</div>
                  <p className="text-xs text-muted-foreground">Total this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Trend</CardTitle>
                    <CardDescription>6-month spending pattern</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="food" fill="#ff9500" name="Food & Dining" />
                        <Bar dataKey="shopping" fill="#ec4899" name="Shopping" />
                        <Bar dataKey="utilities" fill="#eab308" name="Utilities" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Distribution</CardTitle>
                      <CardDescription>Breakdown by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChartComponent>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ₹${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChartComponent>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {expenseCategories.map((cat) => {
                      const Icon = cat.icon;
                      const percentage = ((cat.spent / cat.allocated) * 100).toFixed(0);
                      return (
                        <Card key={cat.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                              <Icon className="h-5 w-5" />
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{cat.name}</p>
                                <p className="text-xs text-muted-foreground">{percentage}% of budget</p>
                              </div>
                              <Badge className={cat.color}>{percentage}%</Badge>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>₹{cat.spent.toLocaleString()}</span>
                              <span className="text-muted-foreground">/ ₹{cat.allocated.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${parseInt(percentage) > 100 ? "bg-red-500" : "bg-emerald-500"}`}
                                style={{ width: `${Math.min(parseInt(percentage), 100)}%` }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Recent Tab */}
              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                    <CardDescription>Your latest transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentExpenses.map((expense) => {
                      const Icon = expense.icon;
                      return (
                        <div key={expense.id} className="flex items-center justify-between py-3 border-b last:border-0">
                          <div className="flex items-center gap-3 flex-1">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{expense.description}</p>
                              <p className="text-xs text-muted-foreground">{expense.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-red-600">-₹{expense.amount.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{expense.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
