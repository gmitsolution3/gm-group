// Graphics Multimedia Dashboard Types

// Statistics Types based on API response
export interface GraphicsMultimediaDashboardStatistics {
  stats: {
    totalUsers: number;
    totalBookings: number;
    totalInfluencerBookings: number;
    totalServices: number;
    totalPackages: number;
    totalInfluencers: number;
    totalJobPostings: number;
    totalJobApplications: number;
    totalRevenue: number;
    bookingChange: number;
    revenueChange: number;
    userChange: number;
    applicationChange: number;
  };
  today: {
    bookings: number;
    influencerBookings: number;
    totalBookings: number;
    applications: number;
  };
  breakdown: {
    bookings: {
      regular: number;
      custom: number;
      influencer: number;
    };
    jobs: {
      total: number;
      active: number;
      inactive: number;
    };
    catalog: {
      services: number;
      packages: number;
      customPackages: number;
      influencers: number;
    };
  };
}

// Finance Types - adapting from GM Food Point structure
export type GraphicsMultimediaFinanceDateRange = "today" | "7days" | "15days" | "1month" | "3months" | "6months" | "1year";
export type ChartGranularity = "hourly" | "daily" | "weekly" | "monthly";

// Chart data point
export interface ChartDataPoint {
  label: string;
  value: number;
}

// Charts data structure
export interface GraphicsMultimediaChartsData {
  granularity: ChartGranularity;
  revenue: ChartDataPoint[];
  bookings: ChartDataPoint[];
}

// Summary data structure
export interface GraphicsMultimediaFinanceSummary {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  regularBookings: number;
  customBookings: number;
  influencerBookings: number;
}

// Complete finance data structure
export interface GraphicsMultimediaFinanceData {
  summary: GraphicsMultimediaFinanceSummary;
  charts: GraphicsMultimediaChartsData;
}

// Recent items types
export interface RecentBooking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
  selectedPackage: {
    _id: string;
    name: string;
    description: string;
    price: number;
    period: string;
    services: Array<{
      name: string;
      price?: number;
      quantity?: number;
      included: boolean;
    }>;
    cta: string;
    popular: boolean;
    createdAt: string;
    updatedAt: string;
  };
  packageModel: string;
  bookingType: "regular" | "custom";
  createdAt: string;
  updatedAt: string;
}

export interface RecentInfluencerBooking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
  influencer: {
    _id: string;
    name: string;
    designation: string;
    image: string;
  };
  duration: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecentUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  image?: string;
  phone?: string;
}

export interface RecentApplication {
  _id: string;
  name: string;
  email: string;
  address: string;
  resumeLink: string;
  expectedSalary: number;
  jobId: string;
  jobTitle: string;
  createdAt: string;
  updatedAt: string;
}

// Complete dashboard response
export interface GraphicsMultimediaDashboardResponse {
  success: boolean;
  data: {
    stats: GraphicsMultimediaDashboardStatistics['stats'];
    today: GraphicsMultimediaDashboardStatistics['today'];
    breakdown: GraphicsMultimediaDashboardStatistics['breakdown'];
    recentBookings: RecentBooking[];
    recentInfluencerBookings: RecentInfluencerBooking[];
    recentUsers: RecentUser[];
    recentApplications: RecentApplication[];
  };
}

// Finance response
export interface GraphicsMultimediaFinanceResponse {
  success: boolean;
  data: GraphicsMultimediaFinanceData;
  message?: string;
}