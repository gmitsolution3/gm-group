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
};

export type AnalyticsResponse<T> = {
  success: boolean;
  tab: AnalyticsTab;
  filters: AnalyticsFilters;
  period?: AnalyticsPeriod;
  data: T;
  message?: string;
};

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
};

export type UsersAnalytics = {
  total: number;
  admins: number;
  regularUsers: number;
  verified: number;
  unverified: number;

  byRole: {
    role: string;
    count: number;
  }[];
};

export type ServicesAnalytics = {
  total: number;

  technologies: {
    technology: string;
    count: number;
  }[];
};

export type PortfoliosAnalytics = {
  total: number;

  byCategory: {
    category: string;
    count: number;
  }[];

  recent: {
    title: string;
    category: string;
    url: string;
    createdAt: string;
  }[];
};

export type CaseStudiesAnalytics = {
  total: number;

  byPortfolio: {
    portfolio: string;
    count: number;
  }[];

  technologyUsage: {
    technology: string;
    count: number;
  }[];
};

export type TeamAnalytics = {
  total: number;
  linkedinProfiles: number;

  byRole: {
    role: string;
    count: number;
  }[];
};

export type BlogAnalytics = {
  total: number;
  featured: number;
  regular: number;

  byCategory: {
    category: string;
    count: number;
  }[];

  byAuthor: {
    author: string;
    count: number;
  }[];
};

export type RecruitmentAnalytics = {
  jobs: {
    total: number;
    active: number;
    inactive: number;
    totalOpenings: number;
  };

  applications: {
    total: number;
    averagePerJob: number;
  };

  applicationsByJob: {
    job: string;
    count: number;
  }[];

  byDepartment: {
    department: string;
    count: number;
  }[];

  byEmploymentType: {
    employmentType: string;
    count: number;
  }[];

  note?: string;
};

export type ContentAnalytics = {
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

export type GrowthPoint = {
  period: string;
  count: number;
};

export type GMITGrowthAnalytics = {
  users: GrowthPoint[];
  blogs: GrowthPoint[];
  portfolios: GrowthPoint[];
  caseStudies: GrowthPoint[];
  jobPostings: GrowthPoint[];
  jobApplications: GrowthPoint[];
  services: GrowthPoint[];
};
