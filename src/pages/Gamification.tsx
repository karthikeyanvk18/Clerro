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
  Trophy,
  Zap,
  Target,
  Flame,
  Star,
  Coins,
  Gift,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Award,
  Lock,
} from "lucide-react";

export default function Gamification() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Rewards & Challenges</h1>

          {/* Level & Coins */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="text-3xl font-bold text-amber-600">12</p>
                <Badge className="mt-2 bg-amber-600">Gold Member</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Coins</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-500">2,450</p>
                <Badge variant="outline" className="mt-2">+280 this week</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Streaks */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <p className="font-semibold">Streak</p>
              </div>
              <p className="text-3xl font-bold">23</p>
              <p className="text-xs text-muted-foreground">days consecutive</p>
            </CardContent>
          </Card>

          {/* Active Challenges */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Active Challenges</h3>
            {[
              { name: "Save ₹5,000", progress: 72 },
              { name: "No Spend Sunday", progress: 100 },
            ].map((item) => (
              <Card key={item.name}>
                <CardContent className="pt-3">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.progress}%</p>
                  </div>
                  <Progress value={item.progress} className="h-2" />
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

        <main className="flex-1 p-6 pt-16">
          <div className="mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-4xl font-bold">Rewards & Challenges</h1>
              <p className="text-muted-foreground mt-2">
                Earn rewards by completing financial challenges and streaks
              </p>
            </motion.div>

            {/* Achievement Alert */}
            <Alert className="mb-6 bg-card border-primary/20">
              <Trophy className="h-4 w-4 text-green-600 dark:text-green-500" />
              <AlertDescription>
                <strong>🎉 Achievement Unlocked!</strong> You completed "No Spend Sunday" and earned
                <strong> 50 coins</strong>!
              </AlertDescription>
            </Alert>

            {/* Profile Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Current Level", value: "12", icon: Trophy, color: "amber", extra: "Gold Member" },
                { label: "Coins Balance", value: "2,450", icon: Coins, color: "yellow", extra: "+280 this week" },
                { label: "Streak Days", value: "23", icon: Flame, color: "orange", extra: "consecutive" },
                { label: "Badges Earned", value: "18/42", icon: Award, color: "purple", extra: "42% unlocked" },
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
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-bold mt-1">{stat.value}</p>
                          </div>
                          <Icon className={`w-5 h-5 text-${stat.color}-600 opacity-70`} />
                        </div>
                        <p className="text-xs text-muted-foreground">{stat.extra}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Challenges */}
              <div className="lg:col-span-2 space-y-6">
                {/* Active Challenges */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Active Challenges</CardTitle>
                          <CardDescription>Complete to earn rewards</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">3 Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Save ₹5,000 This Month",
                        description: "Save at least ₹5,000 by end of month",
                        progress: 72,
                        target: "3,600 / 5,000",
                        reward: 150,
                        daysLeft: 1,
                      },
                      {
                        name: "No Spend Sundays",
                        description: "Don't spend money on 4 consecutive Sundays",
                        progress: 100,
                        target: "4 / 4",
                        reward: 50,
                        daysLeft: 0,
                        completed: true,
                      },
                      {
                        name: "Budget Master",
                        description: "Stay within budget for 2 consecutive weeks",
                        progress: 50,
                        target: "1 / 2 weeks",
                        reward: 200,
                        daysLeft: 7,
                      },
                    ].map((challenge, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{challenge.name}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {challenge.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={challenge.completed ? "default" : "outline"} className="mb-1">
                              {challenge.reward} coins
                            </Badge>
                            {!challenge.completed && (
                              <p className="text-xs text-muted-foreground">
                                {challenge.daysLeft} days left
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs text-muted-foreground">Progress</p>
                            <p className="text-xs font-medium">{challenge.target}</p>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                        {challenge.completed ? (
                          <Button className="w-full bg-primary">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Challenges */}
                <Card className="border-primary/20 bg-primary/5 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Upcoming Challenges</CardTitle>
                          <CardDescription>Next challenges starting soon</CardDescription>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary">New Challenge</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Debt Payoff Sprint", reward: 300, starts: "Dec 1", difficulty: "Hard" },
                      { name: "Investment Challenge", reward: 250, starts: "Dec 8", difficulty: "Medium" },
                      { name: "Zero Junk Food Week", reward: 100, starts: "Dec 15", difficulty: "Easy" },
                    ].map((challenge, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-card/50 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{challenge.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Starts {challenge.starts} • {challenge.difficulty}
                          </p>
                        </div>
                        <Badge variant="outline">{challenge.reward} coins</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Daily Check-ins */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <div>
                          <CardTitle>Daily Check-in Streak</CardTitle>
                          <CardDescription>Return daily to earn bonuses</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">Day 23</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center rounded-lg text-xs font-semibold ${
                            i < 23
                              ? badgeColors.success
                              : i === 23
                              ? "bg-primary/60 text-white border-2 border-primary/80"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg border bg-card/50 border-primary/20 mb-3">
                      <p className="text-sm font-medium mb-1">🔥 Current Bonus: +10 coins/day</p>
                      <p className="text-xs text-muted-foreground">
                        Reach day 30 for +50 bonus coins! Keep your streak alive.
                      </p>
                    </div>
                    <Button className="w-full bg-primary">Check In Today</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Level Progress */}
                <Card className="border-amber-600/20 bg-amber-600/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Level Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <Trophy className="w-12 h-12 text-amber-600 dark:text-amber-500 mx-auto mb-2" />
                      <p className="text-4xl font-bold text-amber-600 dark:text-amber-500">12</p>
                      <p className="text-sm text-muted-foreground mt-1">Gold Member</p>
                    </div>
                    <Progress value={65} className="mb-3 h-2" />
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span>XP to Level 13</span>
                        <span className="font-medium">650 / 1,000</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Total XP</span>
                        <span>12,450</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Levels
                    </Button>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Savings Master", icon: "🏆" },
                      { name: "Debt Slayer", icon: "⚡" },
                      { name: "Consistency King", icon: "👑" },
                      { name: "Budget Champion", icon: "🎯" },
                    ].map((badge) => (
                      <div key={badge.name} className="p-2 rounded border flex items-center gap-2">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{badge.name}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Rewards Shop */}
                <Card className="border-pink-600/20 bg-pink-600/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Rewards Shop</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { reward: "Premium Month", cost: 1000, icon: "🎁" },
                      { reward: "Discount: -10% Fee", cost: 500, icon: "🎟️" },
                      { reward: "Donation 500 NGO", cost: 300, icon: "❤️" },
                    ].map((item) => (
                      <Button key={item.reward} variant="outline" className="w-full justify-between h-auto py-2">
                        <span className="text-left">
                          <p className="font-medium">{item.reward}</p>
                          <p className="text-xs text-muted-foreground">{item.icon}</p>
                        </span>
                        <span className="text-sm font-bold flex items-center gap-1">
                          <Coins className="w-4 h-4" />
                          {item.cost}
                        </span>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Leaderboard Preview */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { rank: 1, name: "Arjun", level: 18, coins: 8900 },
                      { rank: 2, name: "You", level: 12, coins: 2450, highlighted: true },
                      { rank: 3, name: "Priya", level: 11, coins: 2100 },
                    ].map((user) => (
                      <div
                        key={user.rank}
                        className={`p-2 rounded border flex items-center justify-between ${
                          user.highlighted ? "bg-card border-primary/20" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{user.rank}</span>
                          <p className="text-sm font-medium">{user.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold">Level {user.level}</p>
                          <p className="text-xs text-muted-foreground">{user.coins} coins</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      View Full Leaderboard
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
