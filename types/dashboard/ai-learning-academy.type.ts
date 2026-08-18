export type AILearningDashboardPeriod = "all" | "7d" | "30d";

export interface AILearningDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AILearningDashboardData;
}

export interface AILearningDashboardData {
  overview: {
    totalCourses: number;
    publishedCourses: number;
    totalBatches: number;
    activeBatches: number;
    totalStudents: number;
    totalModules: number;
    totalLessons: number;
    totalConsultancyRequests: number;
    courseGrowth: GrowthAnalytics;
    consultancyGrowth: GrowthAnalytics;
  };

  courses: {
    statusDistribution: DistributionItem[];
    levelDistribution: DistributionItem[];
    categoryDistribution: CategoryDistributionItem[];
    pricingAnalytics: PricingAnalytics;
    topCoursesByModules: TopCourse[];
  };

  batches: {
    statusDistribution: DistributionItem[];
    enrollmentAnalytics: EnrollmentAnalytics;
    batchProgress: BatchProgress[];
  };

  content: {
    contentTypeDistribution: DistributionItem[];
    durationAnalytics: DurationAnalytics;
    moduleAnalytics: ModuleAnalytics;
  };

  consultancy: {
    monthlyTrend: MonthlyTrend[];
    typeDistribution: DistributionItem[];
    enrollmentStatus: EnrollmentStatus;
    topRequestedCourses: RequestedCourse[];
    topRequestedBatches: RequestedBatch[];
  };

  instructors: {
    topInstructors: TopInstructor[];
  };

  generatedAt: string;

  timeRange: {
    startDate: string;
    endDate: string;
  };
}

export interface GrowthAnalytics {
  thisMonth: number;
  lastMonth: number;
  growthPercentage: number;
}

export interface DistributionItem {
  _id: string;
  count: number;
  percentage: number;
}

export interface CategoryDistributionItem extends DistributionItem {
  categoryName: string;
}

export interface PricingAnalytics {
  averageRegularPrice: number;
  averageDiscountPrice: number;
  averageDiscountPercentage: number;
  coursesWithDiscount: number;
  totalCourses: number;
}

export interface TopCourse {
  courseId: string;
  courseName: string;
  moduleCount: number;
  lessonCount: number;
  totalDuration: number;
}

export interface EnrollmentAnalytics {
  online: EnrollmentType;
  offline: EnrollmentType;
  overall: {
    onlinePercentage: number;
    offlinePercentage: number;
  };
}

export interface EnrollmentType {
  totalCapacity: number;
  totalEnrolled: number;
  occupancyRate: number;
}

export interface BatchProgress {
  batchId: string;
  batchName: string;
  courseName: string;
  totalModules: number;
  completedModules: number;
  progressPercentage: number;
}

export interface DurationAnalytics {
  totalDuration: number;
  averageLessonDuration: number;
  longestLesson: number;
  shortestLesson: number;
  durationDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
}

export interface ModuleAnalytics {
  averageLessonsPerModule: number;
  averageDurationPerModule: number;
}

export interface MonthlyTrend {
  month: string;
  count: number;
}

export interface EnrollmentStatus {
  enrolled: number;
  notEnrolled: number;
  enrolledPercentage: number;
}

export interface RequestedCourse {
  _id: string;
  courseName: string;
  requestCount: number;
}

export interface RequestedBatch {
  _id: string;
  batchName: string;
  requestCount: number;
}

export interface TopInstructor {
  instructorId: string;
  instructorName: string;
  courseCount: number;
  consultancyCount: number;
}
