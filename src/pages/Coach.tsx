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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2, MessageSquare, BookOpen, Award } from "lucide-react";
import { badgeColors, getBadgeColor } from "@/lib/colors";

const coachingTips = [
  {
    id: 1,
    category: "Debt Management",
    title: "Pay Off High-Interest Debt First",
    description: "Prioritize paying off credit cards and high-interest loans before other debts. This strategy saves the most money.",
    icon: TrendingUp,
    priority: "high",
    savings: "₹12,340",
  },
  {
    id: 2,
    category: "Savings",
    title: "Build Emergency Fund First",
    description: "Aim for 3-6 months of expenses in an emergency fund before aggressive debt repayment.",
    icon: CheckCircle2,
    priority: "high",
    savings: "Peace of mind",
  },
  {
    id: 3,
    category: "Budgeting",
    title: "50/30/20 Budget Rule",
    description: "Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.",
    icon: Lightbulb,
    priority: "medium",
    savings: "Better control",
  },
  {
    id: 4,
    category: "Investment",
    title: "Start Investing Early",
    description: "Begin investing with even small amounts. Time in market beats timing the market.",
    icon: TrendingUp,
    priority: "medium",
    savings: "₹50,000+/year",
  },
  {
    id: 5,
    category: "Credit",
    title: "Improve Your Credit Score",
    description: "A higher credit score gets you better loan rates. Pay bills on time and keep credit utilization low.",
    icon: Award,
    priority: "high",
    savings: "₹5,000+/year",
  },
  {
    id: 6,
    category: "Expense",
    title: "Cut Unnecessary Subscriptions",
    description: "Review and cancel unused subscriptions. They add up to ₹500-1000 per month.",
    icon: AlertCircle,
    priority: "medium",
    savings: "₹6,000/year",
  },
];

const personalizedRecommendations = [
  {
    type: "warning",
    title: "Your EMI-to-Income Ratio is 44%",
    description: "Recommended: Below 40%. Consider refinancing or increasing income.",
    action: "View Options",
  },
  {
    type: "success",
    title: "Great Job on Savings!",
    description: "You saved 33% of your income this month. Keep it up!",
    action: "View Details",
  },
  {
    type: "info",
    title: "Investment Opportunity",
    description: "With ₹34,000 monthly savings, consider starting an investment portfolio.",
    action: "Learn More",
  },
];

export default function Coach() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();

  const getPriorityColor = (priority: string) => {
    return getBadgeColor(priority, badgeColors);
  };

  const filteredTips = activeTab === "all" ? coachingTips : coachingTips.filter(t => t.category === activeTab);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-3 pt-2 px-4">
          <h1 className="text-2xl font-bold">AI Coach</h1>
          <div className="space-y-3">
            {filteredTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <Card key={tip.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Icon className="h-5 w-5 text-emerald flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{tip.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                        <Badge className={`${getPriorityColor(tip.priority)} mt-2`}>
                          {tip.priority}
                        </Badge>
                      </div>
                    </div>
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

        <main className="flex-1 p-4 lg:p-6 pt-16">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-h1 lg:text-display">AI Financial Coach</h1>
                <p className="text-body text-muted-foreground mt-1">
                  Personalized financial guidance powered by AI
                </p>
              </div>
            </motion.div>

            {/* Personalized Recommendations */}
            <div className="grid gap-4 md:grid-cols-3">
              {personalizedRecommendations.map((rec, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card className={`border-l-4 ${
                    rec.type === "warning" ? "border-l-orange-500" :
                    rec.type === "success" ? "border-l-green-500" :
                    "border-l-blue-500"
                  }`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        {rec.action}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Coaching Tips */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Debt Management">Debt</TabsTrigger>
                <TabsTrigger value="Savings">Savings</TabsTrigger>
                <TabsTrigger value="Budgeting">Budget</TabsTrigger>
                <TabsTrigger value="Investment">Invest</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredTips.map((tip) => {
                    const Icon = tip.icon;
                    return (
                      <motion.div
                        key={tip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow h-full">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <Icon className="h-5 w-5 text-emerald" />
                                  {tip.title}
                                </CardTitle>
                                <CardDescription className="mt-1">{tip.category}</CardDescription>
                              </div>
                              <Badge className={getPriorityColor(tip.priority)}>
                                {tip.priority}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-foreground">{tip.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t">
                              <span className="text-sm font-semibold text-emerald">
                                Potential saving: {tip.savings}
                              </span>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>

            {/* Learning Resources */}
            <Card className="dark:bg-[rgb(4,35,51)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Financial Learning Resources
                </CardTitle>
                <CardDescription>Improve your financial literacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { title: "Debt Management 101", duration: "15 min", level: "Beginner" },
                    { title: "Investment Basics", duration: "20 min", level: "Beginner" },
                    { title: "Budgeting Strategies", duration: "18 min", level: "Beginner" },
                    { title: "Credit Score Improvement", duration: "12 min", level: "Intermediate" },
                    { title: "Tax Optimization", duration: "25 min", level: "Intermediate" },
                    { title: "Wealth Building", duration: "30 min", level: "Advanced" },
                  ].map((resource, idx) => (
                    <Card key={idx} className="bg-muted/50 dark:bg-[rgb(6,43,63)]">
                      <CardContent className="pt-6">
                        <p className="font-semibold text-sm">{resource.title}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{resource.duration}</span>
                          <Badge variant="outline">{resource.level}</Badge>
                        </div>
                        <Button className="w-full mt-3 bg-white text-[rgb(4,35,51)] hover:bg-white/90">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
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
