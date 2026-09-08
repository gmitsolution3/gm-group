// GM Food Point Dashboard Types
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

export interface GMFoodPointDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GMFoodPointDashboardStatistics;
}