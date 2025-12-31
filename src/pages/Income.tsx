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
import { Plus, Briefcase, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const incomeData = [
  { month: "Jan", salary: 102000, bonus: 0, freelance: 8000 },
  { month: "Feb", salary: 102000, bonus: 0, freelance: 12000 },
  { month: "Mar", salary: 102000, bonus: 25000, freelance: 5000 },
  { month: "Apr", salary: 102000, bonus: 0, freelance: 15000 },
  { month: "May", salary: 102000, bonus: 0, freelance: 10000 },
  { month: "Jun", salary: 102000, bonus: 30000, freelance: 8000 },
];

const incomeSources = [
  {
    id: 1,
    name: "Primary Salary",
    type: "salary",
    company: "Tech Corp India",
    amount: 102000,
    frequency: "Monthly",
    nextPaymentDate: "Jan 31, 2025",
    startDate: "Jan 2020",
    isActive: true,
    ytdAmount: 306000,
  },
  {
    id: 2,
    name: "Freelance Projects",
    type: "freelance",
    company: "Multiple Clients",
    amount: 10500,
    frequency: "Variable",
    nextPaymentDate: "Ongoing",
    startDate: "Jan 2023",
    isActive: true,
    ytdAmount: 31500,
  },
  {
    id: 3,
    name: "Rental Income",
    type: "rental",
    company: "Property - Mumbai",
    amount: 15000,
    frequency: "Monthly",
    nextPaymentDate: "Feb 5, 2025",
    startDate: "Jun 2022",
    isActive: true,
    ytdAmount: 45000,
  },
  {
    id: 4,
    name: "Dividend Income",
    type: "investment",
    company: "Stock Portfolio",
    amount: 5000,
    frequency: "Quarterly",
    nextPaymentDate: "Mar 15, 2025",
    startDate: "Jan 2021",
    isActive: true,
    ytdAmount: 15000,
  },
  {
    id: 5,
    name: "Bonus (Annual)",
    type: "bonus",
    company: "Tech Corp India",
    amount: 102000,
    frequency: "Bi-Annual",
    nextPaymentDate: "Jul 15, 2025",
    startDate: "Jan 2020",
    isActive: true,
    ytdAmount: 55000,
  },
];

export default function Income() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const totalMonthlyIncome = 102000 + 10500 + 15000 + 5000;
  const ytdIncome = incomeSources.reduce((sum, source) => sum + source.ytdAmount, 0);
  const averageMonthlyIncome = ytdIncome / 3; // Based on 3 months

  const getTypeColor = (type: string) => {
    switch (type) {
      case "salary":
        return "bg-blue-100 text-blue-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
      case "rental":
        return "bg-emerald-100 text-emerald-800";
      case "investment":
        return "bg-amber-100 text-amber-800";
      case "bonus":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">Income Sources</h1>
          <div className="space-y-3">
            {incomeSources.map((source) => (
              <Card key={source.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{source.name}</p>
                      <p className="text-xs text-muted-foreground">{source.company}</p>
                    </div>
                    <Badge className={getTypeColor(source.type)}>{source.frequency}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-emerald">₹{source.amount.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">YTD: ₹{source.ytdAmount.toLocaleString()}</p>
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
                <h1 className="text-h1 lg:text-display">Income Sources</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Track all your income streams and earnings
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Income Source
              </Button>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                  <DollarSign className="h-4 w-4 text-emerald" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalMonthlyIncome.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Current month average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">YTD Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-emerald" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{ytdIncome.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Year to date</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
                  <Calendar className="h-4 w-4 text-emerald" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{averageMonthlyIncome.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">3-month average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Income Sources</CardTitle>
                  <Briefcase className="h-4 w-4 text-emerald" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{incomeSources.filter(s => s.isActive).length}</div>
                  <p className="text-xs text-muted-foreground">Active sources</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sources">Sources</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Distribution</CardTitle>
                    <CardDescription>Your income sources breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="salary" fill="#0066cc" name="Salary" />
                        <Bar dataKey="freelance" fill="#9966ff" name="Freelance" />
                        <Bar dataKey="bonus" fill="#ff6699" name="Bonus" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sources Tab */}
              <TabsContent value="sources" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {incomeSources.map((source) => (
                    <motion.div
                      key={source.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle>{source.name}</CardTitle>
                              <CardDescription>{source.company}</CardDescription>
                            </div>
                            <Badge className={getTypeColor(source.type)}>
                              {source.frequency}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-2xl font-bold text-emerald">
                              ₹{source.amount.toLocaleString()}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Next Payment</p>
                              <p className="text-sm font-semibold">{source.nextPaymentDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">YTD Amount</p>
                              <p className="text-sm font-semibold">₹{source.ytdAmount.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Trend</CardTitle>
                    <CardDescription>6-month income overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="salary" stroke="#0066cc" name="Salary" />
                        <Line type="monotone" dataKey="freelance" stroke="#9966ff" name="Freelance" />
                        <Line type="monotone" dataKey="bonus" stroke="#ff6699" name="Bonus" />
                      </LineChart>
                    </ResponsiveContainer>
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
