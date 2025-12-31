import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  skills: string[];
  postedDays: number;
  source: "LinkedIn" | "Glassdoor" | "Indeed";
  companyLogo?: string;
  externalUrl?: string;
}

export interface JobFilters {
  search: string;
  location: string;
  jobType: string;
  salary: string;
}

export interface JobApplication {
  jobId: string;
  appliedAt: Date;
  status: "applied" | "reviewed" | "rejected" | "interview";
  coverLetter?: string;
}

export interface SavedJob {
  jobId: string;
  savedAt: Date;
}

export interface JobsContextType {
  // Job Data
  jobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: JobFilters;
  setFilter: (key: keyof JobFilters, value: string) => void;
  clearFilters: () => void;

  // Applications & Saved
  applications: JobApplication[];
  savedJobs: SavedJob[];
  applyForJob: (jobId: string, coverLetter?: string) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
  isJobSaved: (jobId: string) => boolean;

  // Stats
  stats: {
    matchingJobs: number;
    appliedCount: number;
    savedCount: number;
    interviewCount: number;
  };

  // Sorting
  sortBy: "recent" | "bestMatch" | "salaryHigh" | "salaryLow";
  setSortBy: (sort: "recent" | "bestMatch" | "salaryHigh" | "salaryLow") => void;

  // Fetch
  fetchJobs: () => Promise<void>;
}

// Mock Data
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    description:
      "We're looking for an experienced Frontend Developer to join our growing team. You'll work with React, TypeScript, and modern web technologies...",
    skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    postedDays: 2,
    source: "LinkedIn",
    companyLogo: "🏢",
    externalUrl: "https://linkedin.com/jobs/1",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    description:
      "Join our fast-growing startup and build scalable applications. Experience with Node.js and React required...",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    postedDays: 5,
    source: "Glassdoor",
    companyLogo: "🚀",
    externalUrl: "https://glassdoor.com/jobs/2",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Analytics Corp",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $180k",
    description:
      "Build machine learning models and drive insights from big data. Python, SQL, and ML experience essential...",
    skills: ["Python", "SQL", "Machine Learning", "Data Analysis"],
    postedDays: 1,
    source: "Indeed",
    companyLogo: "📊",
    externalUrl: "https://indeed.com/jobs/3",
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "Design Studio Pro",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$50k - $80k",
    description:
      "Create beautiful user interfaces and experiences. Figma expertise required. Portfolio must be provided...",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    postedDays: 3,
    source: "LinkedIn",
    companyLogo: "🎨",
    externalUrl: "https://linkedin.com/jobs/4",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $200k",
    description:
      "Manage cloud infrastructure and CI/CD pipelines. Kubernetes and Docker experience required...",
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD"],
    postedDays: 7,
    source: "Glassdoor",
    companyLogo: "☁️",
    externalUrl: "https://glassdoor.com/jobs/5",
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Digital Ventures",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $160k",
    description:
      "Lead product strategy and roadmap for our flagship platform. B2B SaaS experience preferred...",
    skills: ["Product Strategy", "Analytics", "Leadership", "Communication"],
    postedDays: 4,
    source: "Indeed",
    companyLogo: "📱",
    externalUrl: "https://indeed.com/jobs/6",
  },
];

const defaultFilters: JobFilters = {
  search: "",
  location: "",
  jobType: "",
  salary: "",
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "bestMatch" | "salaryHigh" | "salaryLow">("recent");

  // Filter and sort jobs
  const applyFiltersAndSort = useCallback(
    (jobsToFilter: Job[], currentFilters: JobFilters, currentSort: typeof sortBy) => {
      let result = jobsToFilter.filter((job) => {
        let matches = true;

        if (currentFilters.search) {
          matches =
            matches &&
            (job.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
              job.company.toLowerCase().includes(currentFilters.search.toLowerCase()));
        }

        if (currentFilters.location) {
          matches =
            matches &&
            job.location.toLowerCase().includes(currentFilters.location.toLowerCase());
        }

        if (currentFilters.jobType) {
          matches = matches && job.type === currentFilters.jobType;
        }

        if (currentFilters.salary) {
          const salaryRanges: Record<string, [number, number]> = {
            "0-50k": [0, 50000],
            "50k-100k": [50000, 100000],
            "100k-150k": [100000, 150000],
            "150k+": [150000, Infinity],
          };
          const range = salaryRanges[currentFilters.salary];
          if (range) {
            const jobSalaryMax = parseInt(job.salary.split("-")[1]);
            matches = matches && jobSalaryMax >= range[0] && jobSalaryMax <= range[1];
          }
        }

        return matches;
      });

      // Apply sorting
      result.sort((a, b) => {
        switch (currentSort) {
          case "recent":
            return a.postedDays - b.postedDays;
          case "bestMatch":
            return a.postedDays - b.postedDays;
          case "salaryHigh": {
            const salaryA = parseInt(a.salary.split("-")[1]);
            const salaryB = parseInt(b.salary.split("-")[1]);
            return salaryB - salaryA;
          }
          case "salaryLow": {
            const salaryA = parseInt(a.salary.split("-")[1]);
            const salaryB = parseInt(b.salary.split("-")[1]);
            return salaryA - salaryB;
          }
          default:
            return 0;
        }
      });

      return result;
    },
    []
  );

  // Set individual filter
  const setFilter = useCallback(
    (key: keyof JobFilters, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      setFilteredJobs(applyFiltersAndSort(jobs, newFilters, sortBy));
    },
    [filters, jobs, sortBy, applyFiltersAndSort]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setFilteredJobs(applyFiltersAndSort(jobs, defaultFilters, sortBy));
  }, [jobs, sortBy, applyFiltersAndSort]);

  // Update sort
  const updateSortBy = useCallback(
    (newSort: typeof sortBy) => {
      setSortBy(newSort);
      setFilteredJobs(applyFiltersAndSort(filteredJobs, filters, newSort));
    },
    [filters, filteredJobs, applyFiltersAndSort]
  );

  // Apply for job
  const applyForJob = useCallback((jobId: string, coverLetter?: string) => {
    const newApplication: JobApplication = {
      jobId,
      appliedAt: new Date(),
      status: "applied",
      coverLetter,
    };
    setApplications((prev) => [...prev, newApplication]);
  }, []);

  // Save job
  const saveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => [
      ...prev,
      { jobId, savedAt: new Date() },
    ]);
  }, []);

  // Unsave job
  const unsaveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => prev.filter((saved) => saved.jobId !== jobId));
  }, []);

  // Check if job is applied
  const isJobApplied = useCallback(
    (jobId: string) => applications.some((app) => app.jobId === jobId),
    [applications]
  );

  // Check if job is saved
  const isJobSaved = useCallback(
    (jobId: string) => savedJobs.some((saved) => saved.jobId === jobId),
    [savedJobs]
  );

  // Fetch jobs (for future API integration)
  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/v1/jobs');
      // const data = await response.json();
      // setJobs(data);
      setJobs(MOCK_JOBS);
      setFilteredJobs(MOCK_JOBS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stats = {
    matchingJobs: filteredJobs.length,
    appliedCount: applications.length,
    savedCount: savedJobs.length,
    interviewCount: applications.filter((app) => app.status === "interview").length,
  };

  const value: JobsContextType = {
    jobs,
    filteredJobs,
    isLoading,
    error,
    filters,
    setFilter,
    clearFilters,
    applications,
    savedJobs,
    applyForJob,
    saveJob,
    unsaveJob,
    isJobApplied,
    isJobSaved,
    stats,
    sortBy,
    setSortBy: updateSortBy,
    fetchJobs,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs(): JobsContextType {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
}
