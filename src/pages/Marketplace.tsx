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
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  TrendingUp,
  CreditCard,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Heart,
  Star,
  MoreVertical,
  Gauge,
  DollarSign,
  Gift,
  Shield,
} from "lucide-react";

export default function Marketplace() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Financial Marketplace</h1>

          {/* Personalized Offers */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Offers For You</h3>
            {[
              { title: "Personal Loan", rate: "7.5%", amount: "Up to ₹50L" },
              { title: "Credit Card", rate: "2.5% Cashback", reward: "₹5K bonus" },
            ].map((offer, i) => (
              <Card key={i}>
                <CardContent className="pt-3">
                  <p className="text-sm font-semibold mb-1">{offer.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {offer.rate} • {offer.amount || offer.reward}
                  </p>
                  <Button size="sm" className="w-full bg-blue-600">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Insurance */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Insurance</h3>
            <Button variant="outline" className="w-full">Health Insurance</Button>
            <Button variant="outline" className="w-full">Term Life Insurance</Button>
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

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Financial Marketplace</h1>
              <p className="text-muted-foreground mt-2">
                Discover personalized financial products and services tailored to your profile
              </p>
            </motion.div>

            {/* Marketplace Alert */}
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <strong>🎁 Exclusive Offer!</strong> Your credit profile qualifies for a personal
                loan at <strong>7.5% interest</strong> with up to <strong>₹50 Lakhs</strong>. Limited
                time offer!
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Your Credit Score", value: "742", icon: Gauge, color: "green" },
                { label: "Best Loan Rate", value: "7.5%", icon: TrendingUp, color: "blue" },
                { label: "Premium Tier", value: "Gold", icon: Star, color: "amber" },
                { label: "Personalized Offers", value: "12", icon: Gift, color: "purple" },
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
              {/* Left: Products */}
              <div className="lg:col-span-2 space-y-6">
                {/* Loan Products */}
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <div>
                          <CardTitle>Loan Products</CardTitle>
                          <CardDescription>Competitive rates based on your profile</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-blue-600">3 Options</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Personal Loan - TechBank",
                        rate: "7.5% p.a.",
                        amount: "₹10 Lac",
                        tenure: "5 years",
                        emi: "₹19,500/mo",
                        score: "Your best match",
                        match: 95,
                      },
                      {
                        name: "Personal Loan - FinanceHub",
                        rate: "8.2% p.a.",
                        amount: "₹50 Lac",
                        tenure: "7 years",
                        emi: "₹8,200/mo",
                        score: "Good alternative",
                        match: 88,
                      },
                      {
                        name: "Personal Loan - QuickCash",
                        rate: "9.5% p.a.",
                        amount: "₹25 Lac",
                        tenure: "3 years",
                        emi: "₹7,800/mo",
                        score: "Faster approval",
                        match: 82,
                      },
                    ].map((loan, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{loan.name}</p>
                            <p className="text-xs text-blue-600 font-medium mt-1">{loan.score}</p>
                          </div>
                          <Badge variant="outline">
                            <Gauge className="w-3 h-3 mr-1" />
                            {loan.match}%
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Interest Rate</p>
                            <p className="font-semibold">{loan.rate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="font-semibold">{loan.amount}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">EMI</p>
                            <p className="font-semibold">{loan.emi}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-blue-600">Apply Now</Button>
                          <Button variant="outline" className="flex-1">
                            Compare
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Credit Cards */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <div>
                          <CardTitle>Credit Card Offers</CardTitle>
                          <CardDescription>Premium cards with rewards</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-600">4 Cards</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Premium Cashback Card",
                        bank: "TechBank",
                        cashback: "2.5% on all",
                        bonus: "₹5,000 bonus",
                        limit: "₹3 Lac limit",
                        fee: "₹500/year",
                      },
                      {
                        name: "Elite Travel Card",
                        bank: "GlobalCard",
                        cashback: "5% on flights",
                        bonus: "₹10,000 miles",
                        limit: "₹5 Lac limit",
                        fee: "₹1,500/year",
                      },
                      {
                        name: "Online Shopping Card",
                        bank: "ShopPay",
                        cashback: "10% on shopping",
                        bonus: "₹2,000 cashback",
                        limit: "₹2 Lac limit",
                        fee: "Lifetime free",
                      },
                    ].map((card, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{card.name}</p>
                            <p className="text-xs text-muted-foreground">{card.bank}</p>
                          </div>
                          <Heart className="w-5 h-5 text-red-600" />
                        </div>

                        <div className="space-y-1 mb-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Cashback</span>
                            <span className="font-semibold">{card.cashback}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Sign-up Bonus</span>
                            <span className="font-semibold text-green-600">{card.bonus}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Credit Limit</span>
                            <span className="font-semibold">{card.limit}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Annual Fee</span>
                            <span className="font-semibold">{card.fee}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-green-600">Apply Now</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Insurance Products */}
                <Card className="border-purple-200 bg-purple-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle>Insurance Plans</CardTitle>
                          <CardDescription>Affordable health & life coverage</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-purple-600">5 Plans</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Health Insurance - Complete",
                        company: "SecureHealth",
                        coverage: "₹10 Lac",
                        premium: "₹350/month",
                        features: ["OPD Coverage", "Cashless treatment", "Day care procedures"],
                      },
                      {
                        name: "Term Life Insurance - 20 Year",
                        company: "LifeGuard",
                        coverage: "₹50 Lac",
                        premium: "₹799/month",
                        features: ["TP cover", "Accidental benefit", "Waiver of premium"],
                      },
                      {
                        name: "Combo Plan - Health + Life",
                        company: "AllSecure",
                        coverage: "Health ₹10L + Life ₹25L",
                        premium: "₹899/month",
                        features: ["Combined savings", "Bundle discount", "Flexible coverage"],
                      },
                    ].map((plan, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{plan.name}</p>
                            <p className="text-xs text-muted-foreground">{plan.company}</p>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Coverage</span>
                            <span className="font-semibold">{plan.coverage}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Monthly Premium</span>
                            <span className="font-semibold text-green-600">{plan.premium}</span>
                          </div>
                        </div>

                        <p className="text-xs font-medium mb-2">Includes:</p>
                        <ul className="text-xs space-y-0.5 mb-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-1 text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button className="w-full bg-purple-600">Get Quote</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Your Profile */}
                <Card className="border-amber-200 bg-amber-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-white">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Credit Score</p>
                        <Badge className="bg-green-600">Excellent</Badge>
                      </div>
                      <p className="text-2xl font-bold">742</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Income</p>
                        <p className="font-semibold">₹75,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Debt-to-Income Ratio</p>
                        <p className="font-semibold">18% (Good)</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Account Age</p>
                        <p className="font-semibold">8 years</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Premium Tier Benefits */}
                <Card className="border-pink-200 bg-pink-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Premium Member</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "Priority approvals",
                      "Exclusive rate discounts",
                      "Dedicated support",
                      "Early offer access",
                      "No processing fees",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-pink-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Comparison Tool */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compare</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-xs">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Compare Loans
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Compare Cards
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Compare Insurance
                    </Button>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Help & FAQs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <Button variant="outline" className="w-full justify-start">
                      How does approval work?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Can I change my offer?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Contact Support
                    </Button>
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
