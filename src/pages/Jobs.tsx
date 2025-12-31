import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Share2, 
  Bookmark, 
  Search, 
  Filter, 
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Calendar
} from "lucide-react";
import { useJobs } from "@/contexts/JobsContext";

// Job Card Component
function JobCard({ job, onApply, onSave, isSaved, isApplied }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all border-primary/10"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{job.company}</p>
        </div>
        <Badge variant={job.type === "Full-time" ? "default" : "secondary"} className="text-xs flex-shrink-0">
          {job.type}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.postedDays}d ago</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {job.skills.map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5">
              {skill}
            </Badge>
          ))}
        </div>
        <Badge variant="secondary" className="text-xs">
          {job.source}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onApply(job.id)}
          disabled={isApplied}
        >
          {isApplied ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Applied
            </>
          ) : (
            "Apply Now"
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-12 p-0"
          onClick={() => onSave(job.id)}
        >
          <Bookmark
            className={`w-4 h-4 ${isSaved ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-12 p-0"
          onClick={() => window.open(job.externalUrl || "#")}
        >
          <Share2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function Jobs() {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();
  const {
    filteredJobs,
    filters,
    setFilter,
    clearFilters,
    applyForJob,
    saveJob,
    unsaveJob,
    isJobSaved,
    isJobApplied,
    stats,
    sortBy,
    setSortBy,
    fetchJobs,
  } = useJobs();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApply = (jobId: string) => {
    if (!isJobApplied(jobId)) {
      applyForJob(jobId);
    }
  };

  const handleSave = (jobId: string) => {
    if (isJobSaved(jobId)) {
      unsaveJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="space-y-4 p-3">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-primary">{stats.matchingJobs}</div>
                <p className="text-xs text-muted-foreground">Matching Jobs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">{stats.appliedCount}</div>
                <p className="text-xs text-muted-foreground">Applied</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
            />
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <Input
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => setFilter("location", e.target.value)}
            />
          </div>

          {/* Jobs List */}
          <div className="space-y-3">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="pt-8 text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No jobs found</p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  onSave={handleSave}
                  isSaved={isJobSaved(job.id)}
                  isApplied={isJobApplied(job.id)}
                />
              ))
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => toggleSidebar()} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-4 lg:p-6 pt-16">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-h1 lg:text-display">Job Opportunities</h1>
              <p className="text-body text-muted-foreground mt-2">
                Find your next career opportunity based on your skills and interests
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Matching Jobs</p>
                      <p className="text-3xl font-bold mt-2">{stats.matchingJobs}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Applied</p>
                      <p className="text-3xl font-bold mt-2">{stats.appliedCount}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Saved</p>
                      <p className="text-3xl font-bold mt-2">{stats.savedCount}</p>
                    </div>
                    <Bookmark className="h-8 w-8 text-amber-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Interviews</p>
                      <p className="text-3xl font-bold mt-2">{stats.interviewCount}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters Section */}
            <Card className="mb-6 border-primary/20 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <CardTitle>Search & Filter</CardTitle>
                  </div>
                  {(filters.search || filters.location || filters.jobType || filters.salary) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label className="text-sm">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Job title or company..."
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => setFilter("search", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-sm">Location</Label>
                    <Input
                      placeholder="City or Remote..."
                      value={filters.location}
                      onChange={(e) => setFilter("location", e.target.value)}
                    />
                  </div>

                  {/* Job Type */}
                  <div className="space-y-2">
                    <Label className="text-sm">Job Type</Label>
                    <Select value={filters.jobType} onValueChange={(value) => setFilter("jobType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Types">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Salary */}
                  <div className="space-y-2">
                    <Label className="text-sm">Salary Range</Label>
                    <Select value={filters.salary} onValueChange={(value) => setFilter("salary", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All salaries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Salaries">All Salaries</SelectItem>
                        <SelectItem value="0-50k">$0 - $50k</SelectItem>
                        <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                        <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                        <SelectItem value="150k+">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="mt-4 pt-4 border-t">
                  <Label className="text-sm mb-2 block">Sort By</Label>
                  <div className="flex flex-wrap gap-2">
                    {["recent", "bestMatch", "salaryHigh", "salaryLow"].map((sort) => (
                      <Button
                        key={sort}
                        variant={sortBy === sort ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortBy(sort as any)}
                      >
                        {sort === "recent" && "Most Recent"}
                        {sort === "bestMatch" && "Best Match"}
                        {sort === "salaryHigh" && "Salary: High to Low"}
                        {sort === "salaryLow" && "Salary: Low to High"}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jobs Grid */}
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onSave={handleSave}
                    isSaved={isJobSaved(job.id)}
                    isApplied={isJobApplied(job.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
