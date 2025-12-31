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
  FileText,
  Download,
  Check,
  AlertCircle,
  Plus,
  Edit2,
  Eye,
  CheckCircle,
  Sparkles,
  Copy,
  Share2,
} from "lucide-react";

export default function ResumeBuilder() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Resume Builder</h1>

          {/* Current Resume Card */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm">Your Resume</p>
                  <p className="text-xs text-muted-foreground mt-1">Updated Dec 2024</p>
                </div>
                <Badge className="bg-green-600">ATS Ready</Badge>
              </div>
              <div className="space-y-2">
                <Button className="w-full">Edit</Button>
                <Button variant="outline" className="w-full">Download PDF</Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Tools */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">AI Tools</h3>
            <Button variant="outline" className="w-full justify-start">
              <Sparkles className="w-4 h-4 mr-2" />
              Fix Grammar
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Sparkles className="w-4 h-4 mr-2" />
              Improve Wording
            </Button>
          </div>

          {/* Templates */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Templates</h3>
            {["Modern", "Professional", "Creative"].map((template) => (
              <Button key={template} variant="outline" className="w-full">{template}</Button>
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
              <h1 className="text-4xl font-bold">Resume Builder</h1>
              <p className="text-muted-foreground mt-2">
                Build ATS-friendly resumes with AI assistance
              </p>
            </motion.div>

            {/* ATS Score Alert */}
            <Alert className="mb-6 bg-card border-primary/20">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>Your resume is ATS-optimized!</strong> 98% compatibility score with most
                applicant tracking systems.
              </AlertDescription>
            </Alert>

            {/* Main Layout */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Current Resume */}
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>Your Resume</CardTitle>
                          <CardDescription>Full Stack Developer</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">ATS Ready</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-dashed p-6 mb-4 bg-card/50">
                      <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto text-primary/60 mb-3" />
                        <p className="font-semibold mb-1">John Doe</p>
                        <p className="text-sm text-muted-foreground">Full Stack Developer • India</p>
                        <p className="text-sm text-muted-foreground">john@example.com • +91-9876543210</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-sm mb-2">Professional Summary</p>
                        <p className="text-sm text-muted-foreground">
                          Experienced Full Stack Developer with 5+ years of expertise in building
                          scalable web applications using React, Node.js, and cloud technologies.
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-sm mb-2">Experience</p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="font-medium">Senior Developer - TechCorp (2022-Present)</p>
                            <p className="text-muted-foreground">Led team of 5 engineers building microservices</p>
                          </div>
                          <div>
                            <p className="font-medium">Full Stack Developer - StartupX (2020-2022)</p>
                            <p className="text-muted-foreground">Built and maintained React + Node.js applications</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-sm mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"].map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button className="flex-1">
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit Resume
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Grammar Check */}
                <Card className="border-orange-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                      <div>
                        <CardTitle>AI Grammar & Improvement</CardTitle>
                        <CardDescription>AI-powered suggestions to enhance your resume</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        type: "Grammar",
                        text: '"Buided" team of 5 engineers',
                        suggestion: "Built team of 5 engineers",
                        severity: "high",
                      },
                      {
                        type: "Weak Verb",
                        text: "Did various tasks in the organization",
                        suggestion: "Spearheaded digital transformation initiatives",
                        severity: "medium",
                      },
                      {
                        type: "Action Verb",
                        text: "Was responsible for API development",
                        suggestion: "Architected and deployed REST APIs serving 10K+ daily users",
                        severity: "medium",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-card/50 border-primary/20">
                        <div className="flex items-start gap-2 mb-2">
                          <Badge
                            variant={item.severity === "high" ? "destructive" : "outline"}
                            className="mt-0.5"
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm line-through text-muted-foreground mb-2">
                          {item.text}
                        </p>
                        <p className="text-sm font-medium text-green-700 mb-2">
                          ✓ {item.suggestion}
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Apply Suggestion
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right: Tools & Templates */}
              <div className="space-y-6">
                {/* ATS Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ATS Compatibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold text-green-600">98%</p>
                      <p className="text-sm text-muted-foreground">ATS Ready</p>
                    </div>
                    <Progress value={98} className="mb-4 h-2" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Proper formatting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Keywords optimized</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>No images or graphics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span>Add more metrics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Templates */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Resume Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Modern", match: "Best for Tech" },
                      { name: "Professional", match: "Best for Corporate" },
                      { name: "Creative", match: "Best for Design" },
                      { name: "Minimal", match: "Best for Clarity" },
                    ].map((template) => (
                      <div
                        key={template.name}
                        className="p-3 rounded-lg border cursor-pointer hover:bg-card/80 transition border-primary/20"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-xs text-muted-foreground">{template.match}</p>
                          </div>
                          {template.name === "Modern" && (
                            <Badge className="bg-primary">Active</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate with AI
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate Resume
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                  </CardContent>
                </Card>

                {/* Cover Letter */}
                <Card className="border-purple-200 dark:bg-[rgb(4,35,51)]">
                  <CardHeader>
                    <CardTitle className="text-lg">Cover Letter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Generate AI-powered cover letters customized for each job
                    </p>
                    <Button className="w-full bg-purple-600">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Generate Cover Letter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Cover Letter Generator Section */}
            <Card className="mt-6 border-purple-200 dark:bg-[rgb(4,35,51)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <div>
                      <CardTitle>Cover Letter Generator</CardTitle>
                      <CardDescription>AI generates tailored cover letters for job applications</CardDescription>
                    </div>
                  </div>
                  <Button className="bg-purple-600">
                    <Plus className="w-4 h-4 mr-1" />
                    New Cover Letter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      role: "Senior React Developer at TechCorp",
                      date: "Generated 2 days ago",
                      score: 94,
                    },
                    {
                      role: "Full Stack Engineer at StartupX",
                      date: "Generated 1 week ago",
                      score: 88,
                    },
                  ].map((letter, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card/50 dark:bg-[rgb(6,43,63)] border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{letter.role}</p>
                          <p className="text-sm text-muted-foreground">{letter.date}</p>
                        </div>
                        <Badge variant="outline">{letter.score}% Score</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
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
