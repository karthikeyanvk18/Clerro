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
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Bell,
  Users,
  FileText,
  TrendingUp,
  User,
} from "lucide-react";

export default function InterviewTracker() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Interview Tracker</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">24</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">Upcoming</p>
                <p className="text-xl font-bold text-primary">3</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Interviews */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Next 7 Days</h3>
            {[
              { company: "TechCorp", role: "Senior Developer", date: "Dec 2, 2024" },
              { company: "StartupX", role: "Full Stack Dev", date: "Dec 4, 2024" },
            ].map((item) => (
              <Card key={item.company}>
                <CardContent className="pt-3">
                  <p className="text-sm font-semibold">{item.company}</p>
                  <p className="text-xs text-muted-foreground mb-2">{item.role}</p>
                  <Badge variant="outline" className="text-xs">{item.date}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pipeline Tabs */}
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-1" />
            New Application
          </Button>
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
              <h1 className="text-4xl font-bold">Interview & Application Tracker</h1>
              <p className="text-muted-foreground mt-2">
                Track applications, schedule interviews, and manage recruiter contacts
              </p>
            </motion.div>

            {/* Upcoming Alert */}
            <Alert className="mb-6 bg-card border-primary/20">
              <Bell className="h-4 w-4 text-primary" />
              <AlertDescription>
                <strong>Upcoming Interview:</strong> TechCorp on Dec 2, 2024 at 2:00 PM - Don't
                forget to prepare!
              </AlertDescription>
            </Alert>

            {/* KPI Stats */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                { label: "Total Applications", value: "24", icon: FileText, color: "blue" },
                { label: "Interviews Scheduled", value: "3", icon: Calendar, color: "green" },
                { label: "Offers Received", value: "2", icon: CheckCircle, color: "green" },
                { label: "Success Rate", value: "12.5%", icon: TrendingUp, color: "purple" },
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

            {/* Pipeline Kanban */}
            <div className="grid gap-6 lg:grid-cols-4 mb-6">
              {[
                {
                  status: "Applied",
                  color: "blue",
                  count: 16,
                  items: [
                    { company: "CloudCorp", role: "Backend Engineer", date: "Nov 28" },
                    { company: "DataFlow", role: "Full Stack Dev", date: "Nov 25" },
                  ],
                },
                {
                  status: "Interview",
                  color: "orange",
                  count: 3,
                  items: [
                    { company: "TechCorp", role: "Senior Developer", date: "Dec 2" },
                    { company: "StartupX", role: "Full Stack Dev", date: "Dec 4" },
                    { company: "FinanceAI", role: "React Engineer", date: "Dec 6" },
                  ],
                },
                {
                  status: "Offer",
                  color: "green",
                  count: 2,
                  items: [
                    { company: "TechCorp", role: "Senior Developer", amount: "₹35 LPA" },
                    { company: "StartupX", role: "Full Stack Dev", amount: "₹28 LPA" },
                  ],
                },
                {
                  status: "Rejected",
                  color: "red",
                  count: 3,
                  items: [
                    { company: "BigTech", role: "DevOps Engineer", reason: "Budget constraints" },
                    { company: "WebShop", role: "Frontend Dev", reason: "Experience mismatch" },
                    { company: "MobileApp", role: "React Native", reason: "Not selected" },
                  ],
                },
              ].map((pipeline, i) => (
                <Card
                  key={pipeline.status}
                  className={`border-${pipeline.color}-200 dark:bg-[rgb(4,35,51)]`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pipeline.status}</CardTitle>
                      <Badge className={`bg-${pipeline.color}-600`}>{pipeline.count}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pipeline.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg border bg-card/50 border-primary/20">
                        <p className="font-semibold text-sm">{item.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.role}
                          {item.date && ` • ${item.date}`}
                          {item.amount && ` • ${item.amount}`}
                          {item.reason && ` • ${item.reason}`}
                        </p>
                        {pipeline.status === "Applied" && (
                          <Button size="sm" variant="outline" className="w-full">
                            View Details
                          </Button>
                        )}
                        {pipeline.status === "Interview" && (
                          <Button size="sm" className="w-full bg-amber-100 text-amber-900 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300">
                            <Calendar className="w-4 h-4 mr-1" />
                            Schedule
                          </Button>
                        )}
                        {pipeline.status === "Offer" && (
                          <Button size="sm" className="w-full bg-primary">
                            Accept Offer
                          </Button>
                        )}
                      </div>
                    ))}
                    {pipeline.count > 2 && (
                      <Button variant="outline" className="w-full text-sm">
                        View All ({pipeline.count})
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Interview Details */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Upcoming Interviews */}
              <Card className="border-primary/20 bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <CardTitle>Upcoming Interviews</CardTitle>
                        <CardDescription>Next 30 days</CardDescription>
                      </div>
                    </div>
                    <Button size="sm" className="">
                      <Plus className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      company: "TechCorp",
                      role: "Senior React Developer",
                      date: "Dec 2, 2024",
                      time: "2:00 PM",
                      type: "Technical Round",
                      interviewer: "John Smith",
                      email: "john@techcorp.com",
                    },
                    {
                      company: "StartupX",
                      role: "Full Stack Developer",
                      date: "Dec 4, 2024",
                      time: "3:30 PM",
                      type: "Behavioral Round",
                      interviewer: "Sarah Johnson",
                      email: "sarah@startupx.com",
                    },
                    {
                      company: "FinanceAI",
                      role: "React Engineer",
                      date: "Dec 6, 2024",
                      time: "10:00 AM",
                      type: "System Design",
                      interviewer: "Mike Chen",
                      email: "mike@financeai.com",
                    },
                  ].map((interview, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{interview.company}</p>
                          <p className="text-sm text-muted-foreground">{interview.role}</p>
                        </div>
                        <Badge variant="outline">{interview.type}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {interview.date} at {interview.time}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          {interview.interviewer}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {interview.email}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Clock className="w-4 h-4 mr-1" />
                          Add to Calendar
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Bell className="w-4 h-4 mr-1" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recruiter Contacts */}
              <Card className="border-primary/20 bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle>Recruiter Contacts</CardTitle>
                        <CardDescription>Active recruiters and HR managers</CardDescription>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      name: "John Smith",
                      company: "TechCorp",
                      role: "HR Manager",
                      email: "john@techcorp.com",
                      phone: "+91-9876543210",
                      lastContact: "Nov 30",
                    },
                    {
                      name: "Sarah Johnson",
                      company: "StartupX",
                      role: "Recruiting Lead",
                      email: "sarah@startupx.com",
                      phone: "+91-8765432109",
                      lastContact: "Nov 28",
                    },
                    {
                      name: "Mike Chen",
                      company: "FinanceAI",
                      role: "Talent Acquisition",
                      email: "mike@financeai.com",
                      phone: "+91-7654321098",
                      lastContact: "Nov 25",
                    },
                  ].map((contact, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card/50 border-primary/20 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {contact.role} @ {contact.company}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Last: {contact.lastContact}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Interview Preparation */}
            <Card className="mt-6 border-primary/20 dark:bg-[rgb(4,35,51)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>Interview Preparation</CardTitle>
                      <CardDescription>For your upcoming interviews</CardDescription>
                    </div>
                  </div>
                  <Button className="bg-primary">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Notes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-3">
                  {[
                    {
                      company: "TechCorp",
                      title: "Technical Round Prep",
                      items: [
                        "System Design Problems",
                        "React Performance Interview",
                        "Database Optimization",
                      ],
                    },
                    {
                      company: "StartupX",
                      title: "Behavioral Round Prep",
                      items: ["STAR Method Stories", "Culture Fit Questions", "Salary Negotiation"],
                    },
                    {
                      company: "FinanceAI",
                      title: "Take-Home Assignment",
                      items: ["Project Brief Review", "API Design", "Code Quality Checklist"],
                    },
                  ].map((prep, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card/50 dark:bg-[rgb(6,43,63)] border-primary/20">
                      <p className="font-semibold mb-1">{prep.company}</p>
                      <p className="text-sm text-muted-foreground mb-3">{prep.title}</p>
                      <ul className="space-y-1">
                        {prep.items.map((item, idx) => (
                          <li key={idx} className="text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
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
