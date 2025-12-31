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
import { badgeColors } from "@/lib/colors";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  TrendingUp,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MoreVertical,
  Gauge,
  DollarSign,
  Gift,
  Lock,
} from "lucide-react";

export default function Premium() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Premium Membership</h1>

          {/* Premium Benefits */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Your Benefits</h3>
            {[
              { title: "Priority Support", desc: "24/7 dedicated support" },
              { title: "Advanced Analytics", desc: "Detailed financial insights" },
            ].map((benefit, i) => (
              <Card key={i}>
                <CardContent className="pt-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold mb-1">{benefit.title}</p>
                      <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Plans */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Choose Your Plan</h3>
            <Button className="w-full">Upgrade Now</Button>
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

        <main className="flex-1 p-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Premium Membership</h1>
              <p className="text-muted-foreground mt-2">
                Unlock exclusive features and priority support with our premium plans
              </p>
            </motion.div>

            {/* Premium Alert */}
            <Alert className="mb-6 border-primary/20 bg-card">
              <Crown className="h-4 w-4 text-primary" />
              <AlertDescription>
                <strong>👑 Special Offer!</strong> Get premium membership for the first 3 months at{" "}
                <strong>50% off</strong>. Limited time only!
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Total Savings", value: "₹45,000", icon: DollarSign, color: "green" },
                { label: "Features Unlocked", value: "28", icon: Zap, color: "blue" },
                { label: "Premium Tier", value: "Gold", icon: Star, color: "amber" },
                { label: "Your Status", value: "Active", icon: CheckCircle, color: "purple" },
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

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Premium Plans */}
              <div className="lg:col-span-2 space-y-6">
                {/* Premium Plans Comparison */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Premium Plans</CardTitle>
                          <CardDescription>Choose the perfect plan for you</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">3 Plans</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Basic Premium",
                        price: "₹299",
                        period: "/month",
                        features: ["Priority support", "Advanced reports", "Custom budgets"],
                        match: 85,
                      },
                      {
                        name: "Pro Premium",
                        price: "₹599",
                        period: "/month",
                        features: ["24/7 support", "AI insights", "Unlimited exports", "Priority approvals"],
                        match: 95,
                        popular: true,
                      },
                      {
                        name: "Elite Premium",
                        price: "₹999",
                        period: "/month",
                        features: ["Dedicated manager", "Custom analytics", "API access", "White-label options"],
                        match: 100,
                      },
                    ].map((plan, i) => (
                      <div key={i} className={`p-4 rounded-lg border bg-card/50 border-primary/20 ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{plan.name}</p>
                            <p className="text-sm text-primary font-bold mt-1">{plan.price}<span className="text-xs">{plan.period}</span></p>
                          </div>
                          {plan.popular && <Badge className="bg-primary">Popular</Badge>}
                        </div>

                        <ul className="space-y-2 mb-4 text-sm">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button className="w-full bg-primary">Upgrade Now</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Exclusive Features */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Exclusive Features</CardTitle>
                          <CardDescription>What you get with premium</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">15+ Features</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "AI Financial Advisor", desc: "Get personalized recommendations based on your profile" },
                      { name: "Advanced Analytics", desc: "Deep dive into your spending patterns" },
                      { name: "Unlimited Reports", desc: "Generate and export unlimited financial reports" },
                      { name: "Priority Support", desc: "Get help from our support team within 1 hour" },
                      { name: "Goal Planning", desc: "Advanced goal setting with AI-powered tracking" },
                      { name: "API Access", desc: "Connect with third-party applications" },
                    ].map((feature, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">{feature.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Benefits & Comparison */}
                <Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle>Premium Benefits</CardTitle>
                          <CardDescription>Compare with free plan</CardDescription>
                        </div>
                      </div>
                      <Badge className={badgeColors.info}>Full List</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { feature: "Priority Support", free: false, premium: true },
                      { feature: "Advanced Reports", free: false, premium: true },
                      { feature: "AI Insights", free: false, premium: true },
                      { feature: "Custom Budgets", free: true, premium: true },
                      { feature: "Basic Tracking", free: true, premium: true },
                      { feature: "API Access", free: false, premium: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card/50 border-primary/20">
                        <p className="text-sm font-medium">{item.feature}</p>
                        <div className="flex gap-4">
                          {item.free ? <CheckCircle className="w-5 h-5 text-muted-foreground" /> : <AlertCircle className="w-5 h-5 text-muted-foreground opacity-50" />}
                          {item.premium && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Plan */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-card/50 border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Current Plan</p>
                      <p className="text-xl font-bold">Pro Premium</p>
                      <p className="text-xs text-primary mt-2">₹599/month</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Renewal Date</p>
                        <p className="font-semibold">Jan 15, 2026</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Days Remaining</p>
                        <p className="font-semibold">15 days</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <Badge className="bg-primary">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade Benefits */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Upgrade Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "Instant activation",
                      "Money-back guarantee",
                      "Cancel anytime",
                      "No hidden fees",
                      "30-day free trial",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Support */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-xs">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs">
                      FAQ
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs">
                      View Documentation
                    </Button>
                  </CardContent>
                </Card>

                {/* Testimonials */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Member Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <p className="italic">⭐⭐⭐⭐⭐ "Life changing! Worth every penny"</p>
                    <p className="italic">⭐⭐⭐⭐⭐ "Best financial tool I've used"</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
