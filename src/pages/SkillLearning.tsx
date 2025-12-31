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
  BookOpen,
  Zap,
  Target,
  CheckCircle,
  AlertTriangle,
  Play,
  Clock,
  Award,
  Star,
  TrendingUp,
  Lightbulb,
  Plus,
} from "lucide-react";

export default function SkillLearning() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Skill Development</h1>

          {/* Skill Gaps Summary */}
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Skill Gap For Your Next Role</p>
              <p className="text-sm font-semibold mb-2">Senior React Developer</p>
              <p className="text-lg font-bold text-orange-600">3 Skills Missing</p>
              <Badge className="mt-2 bg-amber-600">Start Learning</Badge>
            </CardContent>
          </Card>

          {/* Missing Skills */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Gap Analysis</h3>
            {["TypeScript Advanced", "GraphQL", "Web Performance"].map((skill) => (
              <Card key={skill}>
                <CardContent className="pt-3">
                  <p className="text-sm font-medium mb-1">{skill}</p>
                  <Button size="sm" className="w-full">Find Courses</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* In Progress */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Currently Learning</h3>
            {[
              { course: "React 18 Mastery", progress: 65 },
              { course: "Node.js Advanced", progress: 45 },
            ].map((item) => (
              <Card key={item.course}>
                <CardContent className="pt-3">
                  <p className="text-sm font-medium mb-2">{item.course}</p>
                  <Progress value={item.progress} className="h-1.5 mb-1" />
                  <p className="text-xs text-muted-foreground">{item.progress}% complete</p>
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
              <h1 className="text-4xl font-bold">Skill Development & Learning Paths</h1>
              <p className="text-muted-foreground mt-2">
                Bridge skill gaps and advance your career with AI-recommended courses
              </p>
            </motion.div>

            {/* Skill Gap Alert */}
            <Alert className="mb-6 bg-card border-amber-600/30">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                <strong>Gap Analysis Found!</strong> For your target role "Senior React Developer",
                you need: <strong>TypeScript Advanced, GraphQL, Web Performance</strong>. Start learning today!
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Skills Mastered", value: "8", icon: Award, color: "green" },
                { label: "In Progress", value: "2", icon: TrendingUp, color: "blue" },
                { label: "Gap Identified", value: "3", icon: Target, color: "orange" },
                { label: "Learning Streak", value: "15 days", icon: Zap, color: "purple" },
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

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Skill Gaps */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skill Gap Analysis */}
                <Card className="border-amber-600/30 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-amber-600" />
                        <div>
                          <CardTitle>Skill Gap Analysis</CardTitle>
                          <CardDescription>For: Senior React Developer Role</CardDescription>
                        </div>
                      </div>
                      <Button className="bg-amber-600">
                        <Plus className="w-4 h-4 mr-1" />
                        Find Courses
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          skill: "TypeScript Advanced",
                          description: "Advanced typing, generics, decorators",
                          courses: 24,
                          difficulty: "Advanced",
                        },
                        {
                          skill: "GraphQL",
                          description: "Query language for APIs with advanced patterns",
                          courses: 18,
                          difficulty: "Intermediate",
                        },
                        {
                          skill: "Web Performance Optimization",
                          description: "Caching, bundling, lazy loading, CDN strategies",
                          courses: 15,
                          difficulty: "Advanced",
                        },
                      ].map((gap, i) => (
                        <div key={i} className="p-4 rounded-lg border bg-card/50 dark:bg-[rgb(6,43,63)] border-primary/20">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold">{gap.skill}</p>
                              <p className="text-sm text-muted-foreground mt-1">{gap.description}</p>
                            </div>
                            <Badge variant="outline">{gap.difficulty}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{gap.courses} courses available</p>
                            <Button size="sm" className="bg-amber-600">
                              View Courses
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Currently Learning */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle>Currently Learning</CardTitle>
                        <CardDescription>Courses in progress</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        course: "React 18 Mastery - Advanced Patterns",
                        platform: "Udemy",
                        progress: 65,
                        hoursLeft: 12,
                      },
                      {
                        course: "Node.js & Express Advanced Concepts",
                        platform: "Coursera",
                        progress: 45,
                        hoursLeft: 18,
                      },
                      {
                        course: "System Design for Web Developers",
                        platform: "LinkedIn Learning",
                        progress: 28,
                        hoursLeft: 22,
                      },
                    ].map((course, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{course.course}</p>
                            <p className="text-sm text-muted-foreground">{course.platform}</p>
                          </div>
                          <Badge variant="secondary">{course.progress}%</Badge>
                        </div>
                        <Progress value={course.progress} className="mb-2 h-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {course.hoursLeft} hours remaining
                          </p>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Course Recommendations */}
                <Card className="border-primary/20 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                      <div>
                        <CardTitle>Recommended Courses</CardTitle>
                        <CardDescription>Based on your skill gaps and interests</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        course: "Advanced TypeScript: Type System Deep Dive",
                        platform: "Udemy",
                        price: "₹799",
                        rating: 4.8,
                        students: "45K+",
                      },
                      {
                        course: "GraphQL Complete Course",
                        platform: "Coursera",
                        price: "₹2,999/mo",
                        rating: 4.7,
                        students: "32K+",
                      },
                      {
                        course: "Web Performance & Optimization",
                        platform: "LinkedIn Learning",
                        price: "₹3,999/mo",
                        rating: 4.9,
                        students: "18K+",
                      },
                    ].map((course, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{course.course}</p>
                            <p className="text-sm text-muted-foreground">{course.platform}</p>
                          </div>
                          <Badge variant="outline" className="text-yellow-600">
                            <Star className="w-3 h-3 mr-1" fill="currentColor" />
                            {course.rating}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.students} students • {course.price}
                        </p>
                        <Button className="w-full bg-primary">Enroll Now</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* Target Role */}
                <Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Target Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Badge className="bg-purple-600 mb-3">Senior React Developer</Badge>
                      <p className="text-sm text-muted-foreground mb-3">
                        Match your profile to get personalized recommendations
                      </p>
                      <Button variant="outline" className="w-full">
                        Change Role
                      </Button>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                      <p className="text-sm font-semibold">Match Score: 78%</p>
                      <Progress value={78} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { cert: "AWS Solutions Architect", status: "Completed", date: "Oct 2024" },
                      { cert: "Google Cloud Associate", status: "In Progress", date: "50%" },
                      { cert: "JavaScript Expert", status: "Completed", date: "Aug 2024" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-card/50 dark:bg-[rgb(6,43,63)] border-primary/20">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{item.cert}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                          {item.status === "Completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Badge variant="outline" className="text-xs">{item.status}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Certification
                    </Button>
                  </CardContent>
                </Card>

                {/* Learning Platforms */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Connected Platforms</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Udemy", connected: true, courses: 5 },
                      { name: "Coursera", connected: true, courses: 3 },
                      { name: "LinkedIn Learning", connected: true, courses: 2 },
                    ].map((platform) => (
                      <div key={platform.name} className="p-2.5 rounded border flex items-center justify-between bg-card/50 dark:bg-[rgb(6,43,63)] border-primary/20">
                        <div className="flex items-center gap-2">
                          {platform.connected && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{platform.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {platform.courses} courses synced
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      Connect Platform
                    </Button>
                  </CardContent>
                </Card>

                {/* Learning Streak */}
                <Card className="border-amber-200 bg-amber-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Streak 🔥</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-3">
                      <p className="text-3xl font-bold text-amber-600">15</p>
                      <p className="text-sm text-muted-foreground">consecutive days</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Keep the momentum! You're making great progress.
                    </p>
                    <Button className="w-full bg-amber-600">Continue Learning</Button>
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
