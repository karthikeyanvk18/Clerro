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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Award,
  Edit2,
  Share2,
  Download,
  Trophy
} from "lucide-react";

const profileData = {
  name: "Karthi",
  email: "karthi@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  joinDate: "Jan 2024",
  bio: "Financial enthusiast | Learning & Growing",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthi",
};

const achievements = [
  { id: 1, title: "Debt Warrior", description: "Cleared ₹1,00,000 in debt", icon: "⚔️", date: "Dec 2024" },
  { id: 2, title: "Savings Master", description: "Saved ₹3,00,000 in a year", icon: "💰", date: "Nov 2024" },
  { id: 3, title: "Budget Hero", description: "Stayed under budget for 12 months", icon: "🦸", date: "Sep 2024" },
  { id: 4, title: "Early Bird", description: "Started investing before age 30", icon: "🐦", date: "Aug 2024" },
  { id: 5, title: "Goal Crusher", description: "Achieved 5 financial goals", icon: "🎯", date: "Jul 2024" },
  { id: 6, title: "Financially Fit", description: "Maintained 6-month emergency fund", icon: "💪", date: "Jun 2024" },
];

const statistics = {
  totalDebt: "₹8,47,500",
  monthlyIncome: "₹1,32,500",
  monthlyExpenses: "₹68,000",
  savings: "₹34,000",
  savingsRate: "25.6%",
  creditScore: "750+",
  debtFreeDate: "Mar 2026",
};

const recentActivity = [
  { action: "Updated income source", date: "29 Dec 2024", icon: "📝" },
  { action: "Paid EMI for Home Loan", date: "25 Dec 2024", icon: "✅" },
  { action: "Added new financial goal", date: "20 Dec 2024", icon: "🎯" },
  { action: "Achieved budget milestone", date: "15 Dec 2024", icon: "🏆" },
  { action: "Updated monthly budget", date: "01 Dec 2024", icon: "💼" },
];

export default function Profile() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        
        <div className="space-y-4 pt-4 px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-r from-navy/10 to-emerald/10 text-center">
              <CardContent className="pt-6">
                <Avatar className="h-24 w-24 mx-auto mb-3 border-4 border-background">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback>K</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground text-sm mt-1">{profileData.bio}</p>
                
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                <Button className="w-full mt-4"><Edit2 className="mr-2 h-4 w-4" />Edit Profile</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Full Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <h3 className="font-semibold">Financial Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(statistics).map(([key, value]) => (
                <Card key={key} className="p-3">
                  <p className="text-xs text-muted-foreground capitalize mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="font-bold text-sm">{value}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Tabs for Mobile */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Info</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{profileData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{profileData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{profileData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{profileData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">{profileData.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-emerald">Active</Badge>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-3">
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-3">
                    <div className="flex gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-3">
              {recentActivity.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-3 flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
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
            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-navy/10 to-emerald/10">
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-32 w-32 border-4 border-background">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback>K</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl font-bold">{profileData.name}</h1>
                      <p className="text-muted-foreground text-lg mt-1">{profileData.bio}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{profileData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{profileData.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(statistics).map(([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-xs text-muted-foreground capitalize mb-1">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-2xl font-bold">{value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold">{profileData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">{profileData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold">{profileData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-semibold">{profileData.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-semibold">{profileData.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Status</p>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>Your financial overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(statistics).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b last:border-0">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <p className="font-semibold">{achievement.title}</p>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground mt-2">Achieved: {achievement.date}</p>
                            </div>
                            <Trophy className="h-5 w-5 text-amber-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-0">
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
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
