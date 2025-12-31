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
  Share2,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Star,
  MoreVertical,
  Gauge,
  Gift,
  Trophy,
} from "lucide-react";

interface CommunityMember {
  rank: number;
  name: string;
  debtCleared: number;
  monthlyRank: number;
  avatar: string;
  isUser?: boolean;
}

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  category: "tip" | "milestone" | "question";
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const leaderboardData: CommunityMember[] = [];
const communityPosts: CommunityPost[] = [];

export default function Referral() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Referral Program</h1>

          {/* Referral Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Your Referrals</h3>
            {[
              { name: "Friend 1", status: "Active", bonus: "₹500" },
              { name: "Friend 2", status: "Pending", bonus: "₹0" },
            ].map((ref, i) => (
              <Card key={i}>
                <CardContent className="pt-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold mb-1">{ref.name}</p>
                      <p className="text-xs text-muted-foreground">{ref.status}</p>
                    </div>
                    <p className="text-sm font-bold">{ref.bonus}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full">Share Link</Button>
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
              <h1 className="text-4xl font-bold">Referral Program</h1>
              <p className="text-muted-foreground mt-2">
                Earn rewards by referring friends and family to Cleero Financial Compass
              </p>
            </motion.div>

            {/* Referral Alert */}
            <Alert className="mb-6 border-primary/20 bg-card">
              <Gift className="h-4 w-4 text-primary" />
              <AlertDescription>
                <strong>🎁 Earn More Rewards!</strong> Invite friends and earn ₹500 for each
                successful referral. Unlimited earning potential!
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Total Referrals", value: "12", icon: Users, color: "green" },
                { label: "Earned So Far", value: "₹6,000", icon: Gift, color: "blue" },
                { label: "Active Friends", value: "8", icon: CheckCircle, color: "amber" },
                { label: "Reward Points", value: "6K", icon: Star, color: "purple" },
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
              {/* Left: Referral Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Referral Link */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Your Referral Link</CardTitle>
                          <CardDescription>Share this link to start earning</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg border bg-card/50 border-primary/20">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Your Unique Link</p>
                          <p className="font-mono text-sm font-semibold break-all">
                            https://cleero.app/ref/KARTHI123
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-primary">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Share
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Uses</p>
                        <p className="font-semibold">12</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Conversions</p>
                        <p className="font-semibold">8</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Conversion Rate</p>
                        <p className="font-semibold">67%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Referral List */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Your Referrals</CardTitle>
                          <CardDescription>People you've referred</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">8 Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Priya Singh",
                        status: "Active",
                        joined: "Dec 10, 2025",
                        earned: "₹500",
                        tier: "Premium",
                      },
                      {
                        name: "Amit Patel",
                        status: "Active",
                        joined: "Dec 5, 2025",
                        earned: "₹500",
                        tier: "Free",
                      },
                      {
                        name: "Neha Verma",
                        status: "Pending",
                        joined: "Dec 20, 2025",
                        earned: "₹0",
                        tier: "Pending",
                      },
                      {
                        name: "Rahul Kumar",
                        status: "Active",
                        joined: "Nov 28, 2025",
                        earned: "₹500",
                        tier: "Pro",
                      },
                    ].map((ref, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{ref.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">Joined {ref.joined}</p>
                          </div>
                          <Badge
                            className={ref.status === "Active" ? "bg-primary" : "bg-muted-foreground"}
                          >
                            {ref.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Tier</p>
                            <p className="font-semibold">{ref.tier}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">You Earned</p>
                            <p className="font-semibold text-primary">{ref.earned}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="font-semibold text-xs">Active</p>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Rewards Tiers */}
                <Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-purple-600" />
                        <div>
                          <CardTitle>Reward Tiers</CardTitle>
                          <CardDescription>Earn more with tier bonuses</CardDescription>
                        </div>
                      </div>
                      <Badge className={badgeColors.info}>Tier 2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { tier: "Bronze", referrals: "1-5", bonus: "₹500 each", current: false },
                      { tier: "Silver", referrals: "6-10", bonus: "₹600 each", current: true },
                      { tier: "Gold", referrals: "11-20", bonus: "₹750 each", current: false },
                      { tier: "Platinum", referrals: "20+", bonus: "₹1000 each", current: false },
                    ].map((tier, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{tier.tier}</p>
                            <p className="text-xs text-muted-foreground">{tier.referrals} referrals</p>
                          </div>
                          {tier.current && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                        <p className="text-sm font-medium text-primary">{tier.bonus}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Earnings Summary */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Earnings Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-card/50 border-primary/20">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Total Earned</p>
                        <Badge className="bg-primary">This Month</Badge>
                      </div>
                      <p className="text-2xl font-bold">₹6,000</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">This Month</p>
                        <p className="font-semibold">₹2,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Pending</p>
                        <p className="font-semibold">₹500</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Withdrawals</p>
                        <p className="font-semibold">₹3,500</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* How It Works */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "1. Share your referral link",
                      "2. Friend signs up with link",
                      "3. They upgrade to premium",
                      "4. You earn ₹500 bonus",
                    ].map((step) => (
                      <div key={step} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Withdraw */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Withdraw Earnings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border bg-card/50 border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Available to Withdraw</p>
                      <p className="text-2xl font-bold">₹500</p>
                    </div>
                    <Button className="w-full bg-primary">Withdraw Now</Button>
                  </CardContent>
                </Card>

                {/* Share */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Share Now</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <Button variant="outline" className="w-full justify-start">
                      Share on WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Share on Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Share on Twitter
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
