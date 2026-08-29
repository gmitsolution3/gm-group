// ==============================
// Analytics Common Types
// ==============================

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

export interface AnalyticsFilters {
  from: string | null;
  to: string | null;
  period: AnalyticsPeriod;
}

export interface AnalyticsResponse<T> {
  success: boolean;
  message?: string;
  tab: AnalyticsTab;
  filters: AnalyticsFilters;
  data: T;
}

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

/* ========================================================================== */
/* USERS TAB                                                                  */
/* ========================================================================== */

export interface UsersSummary {
  total: number;
  admins: number;
  users: number;
  verified: number;
  unverified: number;
  verificationRate: number;
}

export interface UsersRoleBreakdown {
  count: number;
  role: string;
}

export interface UsersTrendItem {
  count: number;
  period: string;
}

export interface RecentUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  role: string;
}

export interface UsersAnalytics {
  summary: UsersSummary;

  breakdowns: {
    byRole: UsersRoleBreakdown[];
  };

  trends: {
    growth: UsersTrendItem[];
  };

  recent: {
    users: RecentUser[];
  };
}

/* ========================================================================== */
/* SERVICES TAB                                                                  */
/* ========================================================================== */

export interface ServicesAnalytics {
  summary: ServicesAnalyticsSummary;
  breakdowns: ServicesAnalyticsBreakdowns;
  trends: ServicesAnalyticsTrends;
  recent: ServicesAnalyticsRecent;
}

export interface ServicesAnalyticsSummary {
  total: number;
  averageFeatures: number;
  averageTechnologies: number;
}

export interface ServicesAnalyticsBreakdowns {
  technologies: ServicesTechnologyBreakdown[];
}

export interface ServicesTechnologyBreakdown {
  count: number;
  technology: string;
}

export interface ServicesAnalyticsTrends {
  growth: ServicesTrendItem[];
}

export interface ServicesTrendItem {
  count: number;
  period: string;
}

export interface ServicesAnalyticsRecent {
  services: RecentService[];
}

export interface RecentService {
  _id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  image: string;
  createdAt: string;
}

/* ========================================================================== */
/* PORTFOLIOS TAB                                                                  */
/* ========================================================================== */

export interface PortfoliosAnalytics {
  summary: PortfoliosAnalyticsSummary;
  breakdowns: PortfoliosAnalyticsBreakdowns;
  trends: PortfoliosAnalyticsTrends;
  recent: PortfoliosAnalyticsRecent;
}

export interface PortfoliosAnalyticsSummary {
  total: number;
  categories: number;
}

export interface PortfoliosAnalyticsBreakdowns {
  categories: PortfolioCategoryBreakdown[];
}

export interface PortfolioCategoryBreakdown {
  count: number;
  category: string;
}

export interface PortfoliosAnalyticsTrends {
  growth: PortfolioTrendItem[];
}

export interface PortfolioTrendItem {
  count: number;
  period: string;
}

export interface PortfoliosAnalyticsRecent {
  portfolios: RecentPortfolio[];
}

export interface RecentPortfolio {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  createdAt: string;
}

/* ========================================================================== */
/* CASESTUDIES TAB                                                                  */
/* ========================================================================== */

export interface CaseStudiesAnalytics {
  summary: CaseStudiesAnalyticsSummary;
  breakdowns: CaseStudiesAnalyticsBreakdowns;
  trends: CaseStudiesAnalyticsTrends;
  recent: CaseStudiesAnalyticsRecent;
}

export interface CaseStudiesAnalyticsSummary {
  total: number;
  technologiesUsed: number;
  portfoliosWithCaseStudies: number;
}

export interface CaseStudiesAnalyticsBreakdowns {
  technologies: CaseStudyTechnologyBreakdown[];
  portfolios: CaseStudyPortfolioBreakdown[];
}

export interface CaseStudyTechnologyBreakdown {
  count: number;
  technology: string;
}

export interface CaseStudyPortfolioBreakdown {
  count: number;
  portfolioId: string;
}

export interface CaseStudiesAnalyticsTrends {
  growth: CaseStudyTrendItem[];
}

export interface CaseStudyTrendItem {
  count: number;
  period: string;
}

export interface CaseStudiesAnalyticsRecent {
  caseStudies: RecentCaseStudy[];
}

export interface RecentCaseStudy {
  _id: string;
  portfolioId: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  results: string;
  createdAt: string;
}

// ============================================
// BLOG ANALYTICS
// ============================================

export interface BlogAnalytics {
  summary: BlogAnalyticsSummary;
  breakdowns: BlogAnalyticsBreakdowns;
  trends: BlogAnalyticsTrends;
  recent: BlogAnalyticsRecent;
}

export interface BlogAnalyticsSummary {
  total: number;
  featured: number;
  regular: number;
  featuredRate: number;
}

export interface BlogAnalyticsBreakdowns {
  categories: BlogCategoryBreakdown[];
  authors: BlogAuthorBreakdown[];
}

export interface BlogCategoryBreakdown {
  count: number;
  category: string;
}

export interface BlogAuthorBreakdown {
  count: number;
  author: string;
}

export interface BlogAnalyticsTrends {
  growth: BlogTrendItem[];
}

export interface BlogTrendItem {
  count: number;
  period: string;
}

export interface BlogAnalyticsRecent {
  blogs: RecentBlog[];
}

export interface RecentBlog {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

// ============================================
// RECRUITMENT ANALYTICS
// ============================================

export interface RecruitmentAnalytics {
  summary: RecruitmentAnalyticsSummary;
  breakdowns: RecruitmentAnalyticsBreakdowns;
  trends: RecruitmentAnalyticsTrends;
  recent: RecruitmentAnalyticsRecent;
  limitations: string[];
}

export interface RecruitmentAnalyticsSummary {
  jobs: RecruitmentJobSummary;
  applications: RecruitmentApplicationSummary;
  openings: RecruitmentOpeningSummary;
}

export interface RecruitmentJobSummary {
  total: number;
  active: number;
  inactive: number;
}

export interface RecruitmentApplicationSummary {
  total: number;
  averagePerJob: number;
}

export interface RecruitmentOpeningSummary {
  total: number;
  average: number;
}

export interface RecruitmentAnalyticsBreakdowns {
  departments: RecruitmentDepartmentBreakdown[];
  employmentTypes: RecruitmentEmploymentTypeBreakdown[];
  workplaceTypes: RecruitmentWorkplaceTypeBreakdown[];
  experienceLevels: RecruitmentExperienceLevelBreakdown[];
  applicationsByJob: RecruitmentApplicationsByJob[];
}

export interface RecruitmentDepartmentBreakdown {
  jobs: number;
  openings: number;
  department: string;
}

export interface RecruitmentEmploymentTypeBreakdown {
  count: number;
  employmentType: string;
}

export interface RecruitmentWorkplaceTypeBreakdown {
  count: number;
  workplaceType: string;
}

export interface RecruitmentExperienceLevelBreakdown {
  count: number;
  experienceLevel: string;
}

export interface RecruitmentApplicationsByJob {
  _id: string;
  applications: number;
}

export interface RecruitmentAnalyticsTrends {
  applications: RecruitmentTrendItem[];
}

export interface RecruitmentTrendItem {
  count: number;
  period: string;
}

export interface RecruitmentAnalyticsRecent {
  jobs: RecentRecruitmentJob[];
  applications: RecentRecruitmentApplication[];
}

export interface RecentRecruitmentJob {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  workplaceType: string;
  experienceLevel: string;
  salaryRange: RecruitmentSalaryRange;
  applicationDeadline: string;
  openings: number;
  isActive: boolean;
  createdAt: string;
}

export interface RecruitmentSalaryRange {
  min: number;
  max: number;
  currency: string;
  period: string;
}

export interface RecentRecruitmentApplication {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  jobId: string;
  portfolioUrl: string;
  resume: string;
  createdAt: string;
}

// ============================================
// TEAM ANALYTICS
// ============================================

export interface TeamAnalytics {
  summary: TeamAnalyticsSummary;
  breakdowns: TeamAnalyticsBreakdowns;
  trends: TeamAnalyticsTrends;
  recent: TeamAnalyticsRecent;
}

export interface TeamAnalyticsSummary {
  total: number;
  linkedinProfiles: number;
  linkedinCoverage: number;
}

export interface TeamAnalyticsBreakdowns {
  byRole: TeamRoleBreakdown[];
}

export interface TeamRoleBreakdown {
  count: number;
  role: string;
}

export interface TeamAnalyticsTrends {
  growth: TeamTrendItem[];
}

export interface TeamTrendItem {
  count: number;
  period: string;
}

export interface TeamAnalyticsRecent {
  members: RecentTeamMember[];
}

export interface RecentTeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  createdAt: string;
}

export interface ContentAnalytics {
  summary: ContentSummary;
  breakdowns: ContentBreakdowns;
  recent: ContentRecent;
}

export interface ContentSummary {
  total: number;
  contentTypes: number;
}

export interface ContentBreakdowns {
  content: ContentBreakdownItem[];
}

export interface ContentBreakdownItem {
  type: string;
  count: number;
}

export interface ContentRecent {
  blogs: ContentRecentBlog[];
  portfolios: ContentRecentPortfolio[];
  services: ContentRecentService[];
  jobs: ContentRecentJob[];
}

export interface ContentRecentBlog {
  _id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

export interface ContentRecentPortfolio {
  _id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  createdAt: string;
}

export interface ContentRecentService {
  _id: string;
  title: string;
  technologies: string[];
  image: string;
  createdAt: string;
}

export interface ContentRecentJob {
  _id: string;
  title: string;
  department: string;
  openings: number;
  isActive: boolean;
  createdAt: string;
}

export interface GrowthAnalytics {
  period: string;
  series: GrowthSeries;
  availableMetrics: GrowthMetric[];
}

export interface GrowthSeries {
  users: GrowthDataPoint[];
  blogs: GrowthDataPoint[];
  portfolios: GrowthDataPoint[];
  caseStudies: GrowthDataPoint[];
  services: GrowthDataPoint[];
  jobPostings: GrowthDataPoint[];
  jobApplications: GrowthDataPoint[];
  teamMembers: GrowthDataPoint[];
}

export interface GrowthDataPoint {
  count: number;
  period: string;
}

export type GrowthMetric =
  | "users"
  | "blogs"
  | "portfolios"
  | "caseStudies"
  | "services"
  | "jobPostings"
  | "jobApplications"
  | "teamMembers";
