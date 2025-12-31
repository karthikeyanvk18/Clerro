import { motion } from "framer-motion";
import {
  Check,
  X,
  Star,
  Zap,
  Download,
  TrendingUp,
  Calculator,
  Share2,
  Shield,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  badge?: string;
  features: Array<{ text: string; included: boolean }>;
  icon: React.ElementType;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 0,
    period: "Forever",
    description: "Perfect for getting started",
    features: [
      { text: "2-3 Accounts", included: true },
      { text: "Basic tracking", included: true },
      { text: "Monthly reports", included: true },
      { text: "Email support", included: false },
      { text: "Advanced AI insights", included: false },
      { text: "Unlimited exports", included: false },
      { text: "Priority support", included: false },
      { text: "Scenario planning", included: false },
    ],
    icon: Star,
  },
  {
    name: "Pro",
    price: 99,
    period: "month",
    description: "For serious debt fighters",
    badge: "Most Popular",
    features: [
      { text: "Unlimited Accounts", included: true },
      { text: "Advanced tracking", included: true },
      { text: "Daily reports", included: true },
      { text: "Priority email support", included: true },
      { text: "Advanced AI insights", included: true },
      { text: "CSV/PDF exports", included: true },
      { text: "24/7 support", included: false },
      { text: "Scenario planning", included: true },
    ],
    icon: Zap,
  },
  {
    name: "Elite",
    price: 199,
    period: "month",
    description: "Maximum power & support",
    features: [
      { text: "Unlimited Accounts", included: true },
      { text: "Real-time tracking", included: true },
      { text: "Hourly reports", included: true },
      { text: "Priority phone support", included: true },
      { text: "Personal AI coach", included: true },
      { text: "All exports + custom", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Advanced scenario planning", included: true },
    ],
    icon: Shield,
  },
];

const premiumFeatures = [
  {
    icon: Download,
    title: "CSV & PDF Reports",
    description: "Download all your financial reports for tax filing and bank submissions",
  },
  {
    icon: TrendingUp,
    title: "Advanced AI Insights",
    description: "Personalized strategies based on your spending and debt patterns",
  },
  {
    icon: Calculator,
    title: "Scenario Planner",
    description: "Run what-if simulations: extra payments vs savings for investments",
  },
  {
    icon: Share2,
    title: "Multi-Currency Support",
    description: "Track debts and income across multiple currencies seamlessly",
  },
  {
    icon: Zap,
    title: "Unlimited Accounts",
    description: "Manage unlimited personal, joint, and business accounts",
  },
  {
    icon: Star,
    title: "Priority Support",
    description: "Get help from our team 24/7 via email, chat, and phone",
  },
];

export default function Premium() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<"razorpay" | "stripe">("razorpay");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = (planName: string) => {
    setSelectedPlan(planName);
    setShowPaymentModal(true);
  };

  const handlePayment = (gateway: "razorpay" | "stripe") => {
    // In a real app, this would initiate payment with the gateway
    console.log(`Processing payment with ${gateway} for ${selectedPlan} plan`);
    // Simulate payment processing
    setTimeout(() => {
      alert(`✅ Payment successful! Upgrade to ${selectedPlan} plan activated.`);
      setShowPaymentModal(false);
      setSelectedPlan(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-navy/5 pb-20 lg:pb-8">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h2 font-bold">Upgrade to Pro</h1>
              <p className="text-muted-foreground mt-1">
                Unlock advanced features and take control of your finances
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <h2 className="text-h1 font-bold">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your financial goals
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex rounded-2xl border-2 border-emerald/20 bg-emerald/5 p-1.5 gap-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-emerald text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                billingPeriod === "annual"
                  ? "bg-emerald text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              {billingPeriod === "annual" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3"
                >
                  <Badge className="bg-crimson text-white font-bold">
                    Save 20%
                  </Badge>
                </motion.div>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.badge === "Most Popular";
            const annualPrice = billingPeriod === "annual" ? Math.floor(plan.price * 12 * 0.8) : plan.price;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card
                  className={cn(
                    "relative p-6 lg:p-8 h-full flex flex-col transition-all hover:shadow-lg",
                    isPopular && "ring-2 ring-emerald lg:scale-105"
                  )}
                >
                  {isPopular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald text-white">
                      {plan.badge}
                    </Badge>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-6 w-6 text-emerald" />
                      <h3 className="text-h3 font-bold">{plan.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                    {plan.price === 0 ? (
                      <div className="text-h2 font-bold text-emerald">Free</div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-h2 font-bold">
                          ₹{billingPeriod === "monthly" ? plan.price : annualPrice}
                          <span className="text-body-sm text-muted-foreground font-normal">
                            /{billingPeriod === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        {billingPeriod === "annual" && (
                          <p className="text-caption text-emerald font-medium">
                            ₹{(annualPrice / 12).toFixed(0)}/month billed yearly
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  {plan.name === "Starter" ? (
                    <Button disabled className="w-full mb-6 opacity-50">
                      Your Current Plan
                    </Button>
                  ) : (
                    <Button
                      className={`w-full mb-6 ${
                        isPopular ? "bg-emerald hover:bg-emerald/90" : ""
                      }`}
                      onClick={() => handleUpgrade(plan.name)}
                    >
                      Upgrade Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}

                  {/* Features List */}
                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-body-sm ${
                            !feature.included && "text-muted-foreground/50 line-through"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-h2 font-bold mb-8">What's Included in Pro & Elite</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-emerald/10">
                          <FeatureIcon className="h-6 w-6 text-emerald" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-body-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h2 className="text-h2 font-bold">Frequently Asked Questions</h2>

          <Tabs defaultValue="billing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="billing" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel my subscription?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can cancel anytime from your Account settings. Your access continues until the end of your billing period.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">When does my billing cycle renew?</h3>
                <p className="text-muted-foreground text-sm">
                  Your billing cycle renews on the same day every month (or year, depending on your plan).
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can I upgrade/downgrade anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely! Changes take effect immediately and we'll adjust your billing accordingly.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">What's the difference between Pro and Elite?</h3>
                <p className="text-muted-foreground text-sm">
                  Elite includes a personal AI coach, 24/7 priority support, and advanced scenario planning. Pro has most features but with community support.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How do I get help?</h3>
                <p className="text-muted-foreground text-sm">
                  Contact us via email, chat, or phone. Elite members get 24/7 priority support.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes! We offer a 7-day money-back guarantee if you're not satisfied.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl space-y-6"
          >
            <div>
              <h2 className="text-h2 font-bold mb-2">Choose Payment Method</h2>
              <p className="text-muted-foreground text-sm">
                Upgrade to {selectedPlan} plan
              </p>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePayment("razorpay")}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left",
                  selectedPaymentGateway === "razorpay"
                    ? "border-emerald bg-emerald/5"
                    : "border-border hover:border-emerald/50"
                )}
              >
                <div className="font-semibold mb-1">Razorpay</div>
                <div className="text-sm text-muted-foreground">
                  Debit/Credit Card • UPI • Wallets • NetBanking
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePayment("stripe")}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left",
                  selectedPaymentGateway === "stripe"
                    ? "border-emerald bg-emerald/5"
                    : "border-border hover:border-emerald/50"
                )}
              >
                <div className="font-semibold mb-1">Stripe</div>
                <div className="text-sm text-muted-foreground">
                  International cards • Visa • Mastercard • Amex
                </div>
              </motion.button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Button
                onClick={() => handlePayment(selectedPaymentGateway)}
                className="w-full bg-emerald hover:bg-emerald/90"
              >
                Continue to Payment
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Your payment is secure and encrypted. 7-day money-back guarantee.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
