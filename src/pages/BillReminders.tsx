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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  Eye,
  DollarSign,
} from "lucide-react";

export default function BillReminders() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Bills & Reminders</h1>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">₹12,450</p>
                <Badge variant="outline" className="mt-2 text-xs">5 Bills</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Due Soon</p>
                <p className="text-xl font-bold text-orange-600">2</p>
                <Badge variant="destructive" className="mt-2 text-xs">3 days left</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Bills List */}
          {[
            { name: "Electricity Bill", amount: "₹2,450", dueDate: "Dec 3", status: "Due Soon" },
            { name: "Internet Bill", amount: "₹999", dueDate: "Dec 5", status: "Due Soon" },
            { name: "Netflix", amount: "₹649", dueDate: "Dec 15", status: "Upcoming" },
            { name: "Rent Payment", amount: "₹25,000", dueDate: "Dec 1", status: "Paid" },
          ].map((bill, i) => (
            <Card key={i}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{bill.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Due {bill.dueDate}</p>
                  </div>
                  <Badge
                    variant={
                      bill.status === "Due Soon"
                        ? "destructive"
                        : bill.status === "Paid"
                        ? "default"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {bill.status}
                  </Badge>
                </div>
                <p className="text-lg font-bold">{bill.amount}</p>
                {bill.status !== "Paid" && (
                  <Button size="sm" className="w-full mt-2 bg-blue-600">Pay Now</Button>
                )}
              </CardContent>
            </Card>
          ))}
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

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Bills & Recurring Payments</h1>
              <p className="text-muted-foreground mt-2">Track, manage, and automate your bills</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "This Month", value: "₹12,450", icon: DollarSign, color: "blue" },
                { label: "Due Soon", value: "2 Bills", icon: AlertTriangle, color: "orange" },
                { label: "Paid On-Time", value: "95%", icon: CheckCircle, color: "green" },
                { label: "Auto-Pay Enabled", value: "8/12", icon: Bell, color: "purple" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                          </div>
                          <Icon className={`w-5 h-5 text-${stat.color}-600 opacity-70`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Alerts */}
            <Alert className="mb-6 bg-orange-50 border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <strong>2 bills due in next 3 days:</strong> Electricity (Dec 3) and Internet (Dec 5)
              </AlertDescription>
            </Alert>

            {/* Bills by Status */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Due Soon */}
              <Card className="border-orange-200 bg-orange-50/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <CardTitle>Due Soon (Next 7 days)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Electricity Bill", amount: "₹2,450", daysLeft: 3 },
                    { name: "Internet Bill", amount: "₹999", daysLeft: 5 },
                  ].map((bill, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{bill.name}</p>
                          <p className="text-xs text-red-600 font-medium">{bill.daysLeft} days left</p>
                        </div>
                        <p className="font-bold">{bill.amount}</p>
                      </div>
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                        Pay Now
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming (Future) */}
              <Card className="border-blue-200 bg-blue-50/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <CardTitle>Upcoming (7-30 days)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Netflix", amount: "₹649", date: "Dec 15" },
                    { name: "Gym Membership", amount: "₹2,000", date: "Dec 20" },
                    { name: "Phone Bill", amount: "₹599", date: "Dec 25" },
                  ].map((bill, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{bill.name}</p>
                          <p className="text-xs text-muted-foreground">Due {bill.date}</p>
                        </div>
                        <p className="font-bold">{bill.amount}</p>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Mark Reminder
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recently Paid */}
              <Card className="border-green-200 bg-green-50/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <CardTitle>Recently Paid</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Rent Payment", amount: "₹25,000", date: "Dec 1" },
                    { name: "Loan EMI", amount: "₹18,500", date: "Nov 30" },
                    { name: "Credit Card Bill", amount: "₹15,423", date: "Nov 28" },
                  ].map((bill, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{bill.name}</p>
                          <p className="text-xs text-muted-foreground">Paid on {bill.date}</p>
                        </div>
                        <Badge variant="outline" className="text-green-700">✓</Badge>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-1" />
                        Download Receipt
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Auto-Pay Management */}
            <Card className="mt-6 border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div>
                      <CardTitle>Auto-Pay Subscriptions</CardTitle>
                      <CardDescription>Automatically paid bills</CardDescription>
                    </div>
                  </div>
                  <Button className="bg-purple-600">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Auto-Pay
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { bill: "Netflix", amount: "₹649", frequency: "Monthly", status: "Active" },
                    { bill: "Gym Membership", amount: "₹2,000", frequency: "Monthly", status: "Active" },
                    { bill: "Phone Bill", amount: "₹599", frequency: "Monthly", status: "Active" },
                    { bill: "Insurance Premium", amount: "₹4,500", frequency: "Quarterly", status: "Active" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-purple-50/30 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.bill}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.amount} • {item.frequency}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-600">Active</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
