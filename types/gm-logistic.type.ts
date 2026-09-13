export interface GMLogisticUsers {
  totalUsers: number;
  totalAdmins: number;
  totalBannedUsers: number;
}

export interface GMLogisticCountries {
  totalCountries: number;
  activeCountries: number;
}

export interface GMLogisticCategories {
  totalCategories: number;
  activeCategories: number;
}

export interface GMLogisticPricing {
  totalPricingRecords: number;
  configuredPricingRecords: number;
  pendingPricingRecords: number;
  pricingCompletionPercentage: number;
}

export interface GMLogisticRecentUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  role: string;
}

export interface GMLogisticDashboardData {
  users: GMLogisticUsers;
  countries: GMLogisticCountries;
  categories: GMLogisticCategories;
  pricing: GMLogisticPricing;
  recentUsers: GMLogisticRecentUser[];
}

export interface GMLogisticDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GMLogisticDashboardData;
}
