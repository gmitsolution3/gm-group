// GM Food Point Dashboard Types

// Statistics Types
export interface GMFoodPointDashboardStatistics {
  orders: {
    totalToday: number;
    awaitingPayment: number;
    queued: number;
    cooking: number;
    ready: number;
    completedToday: number;
  };
  payments: {
    pending: number;
  };
  resources: {
    users: number;
    menus: number;
    categories: number;
  };
}

// Finance Types based on actual API response
export type FinanceDateRange = "today" | "7days" | "15days" | "1month" | "3months" | "6months" | "1year";
export type ChartGranularity = "hourly" | "daily" | "weekly" | "monthly";

// Chart data point
export interface ChartDataPoint {
  label: string;
  value: number;
}

// Charts data structure
export interface GMFoodPointChartsData {
  granularity: ChartGranularity;
  revenue: ChartDataPoint[];
  orders: ChartDataPoint[];
}

// Summary data structure
export interface GMFoodPointFinanceSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  cashRevenue: number;
  wechatRevenue: number;
}

// Complete finance data structure
export interface GMFoodPointFinanceData {
  summary: GMFoodPointFinanceSummary;
  charts: GMFoodPointChartsData;
}

export interface GMFoodPointDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GMFoodPointDashboardStatistics;
}

export interface GMFoodPointFinanceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GMFoodPointFinanceData;
  meta?: {
    range: FinanceDateRange;
    startDate: string;
    endDate: string;
    currency: string;
  };
}