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
import { Plus, TrendingUp, Wallet, PieChart, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as PieChartComponent, Pie, Cell } from "recharts";
import { amountColors, progressColors } from "@/lib/colors";

// Budget Data
const monthlyBudgetData = [
  { month: "Aug", planned: 70000, actual: 62000, savings: 8000 },
  { month: "Sep", planned: 70000, actual: 58000, savings: 12000 },
  { month: "Oct", planned: 70000, actual: 71000, savings: -1000 },
  { month: "Nov", planned: 75000, actual: 65000, savings: 10000 },
  { month: "Dec", planned: 75000, actual: 59000, savings: 16000 },
  { month: "Jan", planned: 80000, actual: 68000, savings: 12000 },
];

// Expense Categories
const expenseCategories = [
  { id: 1, name: "Food & Dining", allocated: 15000, spent: 14200, percentage: 95 },
  { id: 2, name: "Transportation", allocated: 8000, spent: 7500, percentage: 94 },
  { id: 3, name: "Entertainment", allocated: 5000, spent: 3200, percentage: 64 },
  { id: 4, name: "Shopping", allocated: 12000, spent: 11800, percentage: 98 },
  { id: 5, name: "Utilities", allocated: 6000, spent: 5900, percentage: 98 },
  { id: 6, name: "Health & Fitness", allocated: 4000, spent: 2100, percentage: 53 },
  { id: 7, name: "Education", allocated: 8000, spent: 7500, percentage: 94 },
  { id: 8, name: "Others", allocated: 8000, spent: 9800, percentage: 123 },
];

const expensePieData = [
  { name: "Food & Dining", value: 14200 },
  { name: "Shopping", value: 11800 },
  { name: "Education", value: 7500 },
  { name: "Utilities", value: 5900 },
  { name: "Transportation", value: 7500 },
  { name: "Others", value: 9800 },
];

const COLORS = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#14b8a6"];

const budgetStatistics = {
  totalIncome: 102000,
  totalSpent: 68000,
  totalSavings: 34000,
  savingsRate: 33.3,
  monthlyAverage: 67333,
  highestExpenseCategory: "Shopping",
};

const recentTransactions = [
  { id: 1, description: "Grocery Store", category: "Food & Dining", amount: 2450, date: "29 Dec", type: "expense" },
  { id: 2, description: "Salary Credit", category: "Income", amount: 102000, date: "28 Dec", type: "income" },
  { id: 3, description: "Movie Tickets", category: "Entertainment", amount: 500, date: "27 Dec", type: "expense" },
  { id: 4, description: "Fuel", category: "Transportation", amount: 1200, date: "27 Dec", type: "expense" },
  { id: 5, description: "Online Shopping", category: "Shopping", amount: 3200, date: "26 Dec", type: "expense" },
  { id: 6, description: "Electricity Bill", category: "Utilities", amount: 2100, date: "25 Dec", type: "expense" },
];

export default function BudgetAndExpenses() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">Budget & Expenses</h1>
          <div className="space-y-4">
            {expenseCategories.map((category) => (
              <Card key={category.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm font-semibold">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${Math.min(category.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>₹{category.spent}</span>
                    <span>/ ₹{category.allocated}</span>
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
                <h1 className="text-h1 lg:text-display">Budget & Expenses</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Track your spending and manage your budget
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
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{budgetStatistics.totalIncome.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{budgetStatistics.totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Expenses this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{budgetStatistics.totalSavings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{budgetStatistics.savingsRate}% savings rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{budgetStatistics.highestExpenseCategory}</div>
                  <p className="text-xs text-muted-foreground">Highest expense</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Income vs Expenses Trend</CardTitle>
                    <CardDescription>
                      Last 6 months comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyBudgetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="planned" stroke="#3b82f6" name="Planned Budget" />
                        <Line type="monotone" dataKey="actual" stroke="#ef4444" name="Actual Spent" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Savings</CardTitle>
                    <CardDescription>
                      Your savings trend over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyBudgetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="savings" fill="#22c55e" name="Savings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Distribution</CardTitle>
                      <CardDescription>
                        Breakdown by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChartComponent>
                          <Pie
                            data={expensePieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ₹${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {expensePieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChartComponent>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Category Details</CardTitle>
                      <CardDescription>
                        Budget vs Actual spending
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {expenseCategories.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                category.percentage > 100 ? "bg-red-500 dark:bg-red-600" : "bg-green-500 dark:bg-green-600"
                              }`}
                              style={{ width: `${Math.min(category.percentage, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>₹{category.spent.toLocaleString()}</span>
                            <span>/ ₹{category.allocated.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Your latest income and expenses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                          <div className="flex-1">
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{transaction.category}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${transaction.type === "income" ? amountColors.positive : amountColors.negative}`}>
                              {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
