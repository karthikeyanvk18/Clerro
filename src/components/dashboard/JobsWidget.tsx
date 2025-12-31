import { Briefcase, ArrowRight, Bookmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useJobs } from "@/contexts/JobsContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function JobsWidget() {
  const { filteredJobs, applyForJob, saveJob, isJobSaved } = useJobs();

  // Get top 3 recommended jobs
  const recommendedJobs = filteredJobs.slice(0, 3);

  if (!recommendedJobs || recommendedJobs.length === 0) {
    return (
      <Card className="border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Recommended Jobs
          </CardTitle>
          <CardDescription>
            Complete your profile to see personalized job recommendations
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-card dark:bg-[rgb(4,35,51)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <CardTitle>Recommended Jobs</CardTitle>
          </div>
          <Link to="/jobs">
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <CardDescription>
          {recommendedJobs.length} opportunities matching your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendedJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all border-primary/10 hover:border-primary/20 dark:bg-[rgb(6,43,63)]"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground truncate">
                  {job.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate">{job.company}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {job.type}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{job.location}</span>
              </div>
              <span className="text-primary font-medium">{job.salary}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {job.skills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    +{job.skills.length - 2}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => saveJob(job.id)}
                  title={isJobSaved(job.id) ? "Unsave job" : "Save job"}
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isJobSaved(job.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <Button
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={() => applyForJob(job.id)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        ))}

        <Link to="/jobs" className="block pt-2">
          <Button
            variant="outline"
            className="w-full text-primary border-primary/20 hover:bg-primary/10"
          >
            View All {filteredJobs.length} Jobs
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
