// ==============================
// Overview Analytics
// ==============================

export interface OverviewTrendItem {
  count: number;
  period: string;
}

export interface OverviewTechnologyBreakdown {
  count: number;
  technology: string;
}

export interface OverviewCategoryBreakdown {
  count: number;
  category: string;
}

export interface OverviewUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  role: string;
}

export interface OverviewPortfolio {
  _id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  createdAt: string;
}

export interface OverviewBlog {
  _id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

export interface OverviewJob {
  _id: string;
  title: string;
  department: string;
  employmentType: string;
  workplaceType: string;
  applicationDeadline: string;
  openings: number;
  isActive: boolean;
  createdAt: string;
}

export interface OverviewApplication {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  jobId: string;
  portfolioUrl: string;
  resume: string;
  createdAt: string;
}

export interface OverviewService {
  _id: string;
  title: string;
  technologies: string[];
  image: string;
  createdAt: string;
}

export interface OverviewActivity {
  type: string;
  title: string;
  description: string;
  date: string;
  id: string;
}

export interface OverviewAnalytics {
  summary: {
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
      regular: number;
    };

    recruitment: {
      totalJobs: number;
      activeJobs: number;
      inactiveJobs: number;
      totalApplications: number;
    };

    leadership: {
      total: number;
    };

    sliders: {
      total: number;
    };
  };

  trends: {
    users: OverviewTrendItem[];
    blogs: OverviewTrendItem[];
    portfolios: OverviewTrendItem[];
    applications: OverviewTrendItem[];
  };

  breakdowns: {
    technologies: OverviewTechnologyBreakdown[];
    portfolioCategories: OverviewCategoryBreakdown[];
    blogCategories: OverviewCategoryBreakdown[];
  };

  recent: {
    users: OverviewUser[];
    portfolios: OverviewPortfolio[];
    blogs: OverviewBlog[];
    jobs: OverviewJob[];
    applications: OverviewApplication[];
    services: OverviewService[];
  };

  activity: OverviewActivity[];
}