export type AnalyticsTab =
  | "overview"
  | "users"
  | "services"
  | "portfolios"
  | "case-studies"
  | "team"
  | "blog"
  | "recruitment"
  | "content"
  | "growth";

export type AnalyticsPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export type AnalyticsFilters = {
  from: string | null;
  to: string | null;
  period?: AnalyticsPeriod;
};

export type AnalyticsResponse<T> = {
  success: boolean;
  tab: AnalyticsTab;
  filters: AnalyticsFilters;
  data: T;
  message?: string;
};

export type GrowthPoint = {
  period: string;
  count: number;
};

export type AnalyticsBreakdown = {
  label: string;
  count: number;
};

export type AnalyticsActivity = {
  id: string;
  type:
    | "user"
    | "portfolio"
    | "blog"
    | "job"
    | "application";
  title: string;
  description: string;
  date: string;
};

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

export type OverviewAnalytics = {
  users: {
    total: number;
    admins: number;
    regularUsers: number;
  };

  services: {
    total: number;
  };

  portfolios: {
    total: number;
  };

  caseStudies: {
    total: number;
  };

  team: {
    total: number;
  };

  blog: {
    total: number;
    featured: number;
  };

  recruitment: {
    jobs: number;
    activeJobs: number;
    applications: number;
  };

  leadership: {
    total: number;
  };

  sliders: {
    total: number;
  };

  trends: {
    users: GrowthPoint[];
    blogs: GrowthPoint[];
    portfolios: GrowthPoint[];
    applications: GrowthPoint[];
  };

  breakdowns: {
    technologies: AnalyticsBreakdown[];
    portfolioCategories: AnalyticsBreakdown[];
    blogCategories: AnalyticsBreakdown[];
  };

  recent: {
    users: RecentUser[];
    portfolios: RecentPortfolio[];
    blogs: RecentBlog[];
    jobs: RecentJob[];
    applications: RecentApplication[];
    services: RecentService[];
  };

  activity: AnalyticsActivity[];
};

/* -------------------------------------------------------------------------- */
/* Users                                                                      */
/* -------------------------------------------------------------------------- */

export type UsersAnalytics = {
  summary: {
    total: number;
    admins: number;
    regularUsers: number;
    verified: number;
    unverified: number;
    verificationRate: number;
  };

  breakdowns: {
    byRole: AnalyticsBreakdown[];
  };

  trends: {
    growth: GrowthPoint[];
  };

  recent: {
    users: RecentUser[];
  };
};

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export type ServicesAnalytics = {
  summary: {
    total: number;
    averageFeatures: number;
    averageTechnologies: number;
  };

  breakdowns: {
    technologies: AnalyticsBreakdown[];
  };

  trends: {
    growth: GrowthPoint[];
  };

  recent: {
    services: RecentService[];
  };
};

/* -------------------------------------------------------------------------- */
/* Portfolios                                                                 */
/* -------------------------------------------------------------------------- */

export type PortfoliosAnalytics = {
  summary: {
    total: number;
    categories: number;
  };

  breakdowns: {
    categories: AnalyticsBreakdown[];
  };

  trends: {
    growth: GrowthPoint[];
  };

  recent: {
    portfolios: RecentPortfolio[];
  };
};

/* -------------------------------------------------------------------------- */
/* Case Studies                                                               */
/* -------------------------------------------------------------------------- */

export type CaseStudiesAnalytics = {
  summary: {
    total: number;
    technologies: number;
    portfolios: number;
  };

  breakdowns: {
    technologies: AnalyticsBreakdown[];
    portfolios: AnalyticsBreakdown[];
  };

  trends: {
    growth: GrowthPoint[];
  };

  recent: {
    caseStudies: RecentCaseStudy[];
  };
};

/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */

export type TeamAnalytics = {
  summary: {
    total: number;
    linkedinProfiles: number;
    linkedinCoverage: number;
  };

  breakdowns: {
    byRole: AnalyticsBreakdown[];
  };

  trends: {
    growth: GrowthPoint[];
  };

  recent: {
    members: RecentTeamMember[];
  };
};

/* -------------------------------------------------------------------------- */
/* Blog                                                                       */
/* -------------------------------------------------------------------------- */

export type BlogAnalytics = {
  summary: {
    total: number;
    featured: number;
    regular: number;
    featuredRate: number;
  };

  breakdowns: {
    categories: AnalyticsBreakdown[];
    authors: AnalyticsBreakdown[];
  };

  trends: {
    growth: GrowthPoint[];
  };

  recent: {
    blogs: RecentBlog[];
  };
};

/* -------------------------------------------------------------------------- */
/* Recruitment                                                                */
/* -------------------------------------------------------------------------- */

export type RecruitmentAnalytics = {
  summary: {
    totalJobs: number;
    activeJobs: number;
    inactiveJobs: number;
    totalOpenings: number;
    totalApplications: number;
    averageApplicationsPerJob: number;
    averageOpeningsPerJob: number;
  };

  breakdowns: {
    departments: AnalyticsBreakdown[];
    employmentTypes: AnalyticsBreakdown[];
    workplaceTypes: AnalyticsBreakdown[];
    experienceLevels: AnalyticsBreakdown[];
    applicationsByJob: AnalyticsBreakdown[];
  };

  trends: {
    applications: GrowthPoint[];
  };

  recent: {
    jobs: RecentJob[];
    applications: RecentApplication[];
  };

  limitations: string[];
};

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export type ContentAnalytics = {
  summary: {
    sliders: number;
    services: number;
    portfolios: number;
    caseStudies: number;
    blogs: number;
    teamMembers: number;
    leadershipMessages: number;
    jobPostings: number;
    totalContentItems: number;
  };

  recent: {
    users: RecentUser[];
    services: RecentService[];
    portfolios: RecentPortfolio[];
    caseStudies: RecentCaseStudy[];
    blogs: RecentBlog[];
    teamMembers: RecentTeamMember[];
    jobs: RecentJob[];
  };
};

/* -------------------------------------------------------------------------- */
/* Growth                                                                     */
/* -------------------------------------------------------------------------- */

export type GrowthAnalytics = {
  series: {
    users: GrowthPoint[];
    blogs: GrowthPoint[];
    portfolios: GrowthPoint[];
    caseStudies: GrowthPoint[];
    services: GrowthPoint[];
    jobPostings: GrowthPoint[];
    jobApplications: GrowthPoint[];
    teamMembers: GrowthPoint[];
  };
};

/* -------------------------------------------------------------------------- */
/* Recent records                                                             */
/* -------------------------------------------------------------------------- */

export type RecentUser = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  verified?: boolean;
  createdAt: string;
};

export type RecentService = {
  _id: string;
  title: string;
  technologies: string[];
  createdAt: string;
};

export type RecentPortfolio = {
  _id: string;
  title: string;
  category: string;
  image?: string;
  url?: string;
  createdAt: string;
};

export type RecentCaseStudy = {
  _id: string;
  title: string;
  portfolio: string;
  technologies: string[];
  createdAt: string;
};

export type RecentTeamMember = {
  _id: string;
  name: string;
  role: string;
  linkedin?: string;
  createdAt: string;
};

export type RecentBlog = {
  _id: string;
  title: string;
  category: string;
  author: string;
  featured: boolean;
  image?: string;
  createdAt: string;
};

export type RecentJob = {
  _id: string;
  title: string;
  department?: string;
  employmentType?: string;
  workplaceType?: string;
  openings?: number;
  createdAt: string;
};

export type RecentApplication = {
  _id: string;
  name?: string;
  job?: string;
  createdAt: string;
};