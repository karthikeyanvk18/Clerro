import { motion } from "framer-motion";
import {
  Share2,
  Copy,
  Users,
  Trophy,
  Gift,
  TrendingUp,
  MessageCircle,
  Heart,
  Crown,
  ArrowUpRight,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const leaderboardData: CommunityMember[] = [
  {
    rank: 1,
    name: "Raj Kumar",
    debtCleared: 850000,
    monthlyRank: 1,
    avatar: "🥇",
    isUser: false,
  },
  {
    rank: 2,
    name: "Priya Singh",
    debtCleared: 720000,
    monthlyRank: 2,
    avatar: "🥈",
    isUser: false,
  },
  {
    rank: 3,
    name: "Karthi (You)",
    debtCleared: 385000,
    monthlyRank: 5,
    avatar: "🥉",
    isUser: true,
  },
  {
    rank: 4,
    name: "Amit Patel",
    debtCleared: 560000,
    monthlyRank: 3,
    avatar: "👤",
    isUser: false,
  },
  {
    rank: 5,
    name: "Neha Verma",
    debtCleared: 445000,
    monthlyRank: 4,
    avatar: "👤",
    isUser: false,
  },
];

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Priya Singh",
    avatar: "👤",
    category: "milestone",
    title: "Just cleared ₹7 lakhs in debt! 🎉",
    content:
      "It took me 3 years, but I finally paid off all my EMIs! The Cleero app helped me track and optimize my payments. If I can do it, anyone can!",
    timestamp: "2 hours ago",
    likes: 234,
    comments: 45,
    liked: false,
  },
  {
    id: "2",
    author: "Raj Kumar",
    avatar: "👤",
    category: "tip",
    title: "Pro tip: Use the Scenario Planner",
    content:
      "I discovered that increasing my monthly payment by just ₹5,000 saves me 8 months of payments and ₹40,000 in interest. Run the scenarios!",
    timestamp: "4 hours ago",
    likes: 189,
    comments: 32,
    liked: false,
  },
  {
    id: "3",
    author: "Amit Patel",
    avatar: "👤",
    category: "question",
    title: "Should I clear high-interest debt first?",
    content:
      "I have a personal loan (16% interest) and a car loan (8% interest). Which one should I prioritize? Any suggestions from the community?",
    timestamp: "6 hours ago",
    likes: 78,
    comments: 23,
    liked: false,
  },
];

export default function Referral() {
  const navigate = useNavigate();
  const [referralCode] = useState("DB7K5M3");
  const [copied, setCopied] = useState(false);
  const [communityPosts_, setCommunityPosts] = useState(communityPosts);
  const [referralStats] = useState({
    referrals: 3,
    earned: 2,
    pending: 1,
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (id: string) => {
    setCommunityPosts(
      communityPosts_.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "milestone":
        return "bg-purple-500/10 text-purple-600";
      case "tip":
        return "bg-blue-500/10 text-blue-600";
      case "question":
        return "bg-yellow-500/10 text-yellow-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "milestone":
        return <CheckCircle className="h-4 w-4" />;
      case "tip":
        return <Zap className="h-4 w-4" />;
      case "question":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-navy/5 pb-20 lg:pb-8">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h2 font-bold">Referrals & Community</h1>
              <p className="text-muted-foreground mt-1">
                Share your journey and grow together
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Referrals Made */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-500">Active</Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Referrals Made</p>
              <p className="text-h2 font-bold">{referralStats.referrals}</p>
              <p className="text-caption text-muted-foreground mt-2">
                {referralStats.pending} pending approval
              </p>
            </Card>

            {/* Premium Earned */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-emerald/10">
                  <Gift className="h-6 w-6 text-emerald" />
                </div>
                <Badge className="bg-emerald">Available</Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-1">
                Premium Months Earned
              </p>
              <p className="text-h2 font-bold">{referralStats.earned}</p>
              <p className="text-caption text-emerald mt-2">
                Worth ₹{referralStats.earned * 99}
              </p>
            </Card>

            {/* Current Status */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-500">Silver</Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Referral Tier</p>
              <p className="text-h2 font-bold">Silver</p>
              <p className="text-caption text-muted-foreground mt-2">
                3 more referrals to Gold
              </p>
            </Card>
          </div>

          {/* Referral Code Card */}
          <Card className="p-6 lg:p-8 bg-gradient-to-br from-navy/10 to-emerald/10 border-emerald/20">
            <div className="space-y-6">
              <div>
                <h3 className="text-h3 font-bold mb-2">Your Referral Code</h3>
                <p className="text-muted-foreground text-sm">
                  Share this code with friends. Both of you get 1 month premium when they sign up and pay their first EMI.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 p-4 rounded-xl bg-background border-2 border-emerald/50">
                  <p className="text-h2 font-bold font-mono text-emerald">
                    {referralCode}
                  </p>
                </div>
                <Button
                  onClick={handleCopyCode}
                  className="bg-emerald hover:bg-emerald/90"
                  size="lg"
                >
                  {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald hover:bg-emerald/90">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
              </div>

              {/* Rewards Tiers */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl mb-1">🥚</p>
                  <p className="text-xs font-medium mb-1">Bronze</p>
                  <p className="text-xs text-muted-foreground">0-2 referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">🥈</p>
                  <p className="text-xs font-medium mb-1">Silver (You)</p>
                  <p className="text-xs text-emerald">3-5 referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">👑</p>
                  <p className="text-xs font-medium mb-1">Gold</p>
                  <p className="text-xs text-muted-foreground">6+ referrals</p>
                </div>
              </div>
            </div>
          </Card>

          {/* How It Works */}
          <Card className="p-6 lg:p-8 space-y-6">
            <h3 className="text-h3 font-bold">How It Works</h3>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Share Your Code",
                  desc: "Send DB7K5M3 to a friend or family member",
                },
                {
                  step: 2,
                  title: "They Sign Up",
                  desc: "Your friend creates an account using your code",
                },
                {
                  step: 3,
                  title: "Log First EMI",
                  desc: "They log their first EMI payment or debt entry",
                },
                {
                  step: 4,
                  title: "Both Get Rewards",
                  desc: "You both receive 1 month free premium instantly",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 flex-shrink-0">
                    <span className="text-sm font-bold text-emerald">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 pt-8 border-t"
        >
          <Tabs defaultValue="community" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="community">Community Feed</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="achievements" className="hidden lg:grid">
                Achievements
              </TabsTrigger>
            </TabsList>

            {/* Community Feed */}
            <TabsContent value="community" className="space-y-4">
              {communityPosts_.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 lg:p-6 hover:shadow-md transition-all">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-2xl">{post.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {post.timestamp}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          "flex items-center gap-1",
                          getCategoryColor(post.category)
                        )}
                      >
                        {getCategoryIcon(post.category)}
                        <span className="capitalize">{post.category}</span>
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">{post.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {post.content}
                      </p>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "gap-2",
                          post.liked && "text-crimson"
                        )}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            post.liked && "fill-current"
                          )}
                        />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View Thread
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Leaderboard */}
            <TabsContent value="leaderboard" className="space-y-4">
              <Card className="overflow-hidden">
                <div className="divide-y">
                  {leaderboardData.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-4 flex items-center justify-between",
                        member.isUser && "bg-emerald/5"
                      )}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-2xl w-8 text-center">
                          {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            #{member.monthlyRank} this month
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald">
                          ₹{(member.debtCleared / 100000).toFixed(1)}L
                        </p>
                        <p className="text-xs text-muted-foreground">
                          cleared
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { emoji: "🔥", title: "7-Day Streak", desc: "Log expenses for 7 days" },
                  { emoji: "💯", title: "Debt Slasher", desc: "Clear ₹1L in debt" },
                  { emoji: "🎯", title: "Budget Master", desc: "Stay within budget 3 months" },
                  { emoji: "👑", title: "Leaderboard Hero", desc: "Rank in top 10" },
                  { emoji: "💰", title: "Savings King", desc: "Save ₹50K in interest" },
                  { emoji: "🤝", title: "Influencer", desc: "Get 5 referrals" },
                ].map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 text-center hover:shadow-lg transition-all cursor-pointer group">
                      <p className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {badge.emoji}
                      </p>
                      <p className="font-semibold text-sm">{badge.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {badge.desc}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
