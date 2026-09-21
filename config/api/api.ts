export const API_ENDPOINTS = {
  gmInternational: {
    generalServicesDashboard: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gm-int/get-general-dashboard-summary`,
    accountAnalysisDashboard: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gm-int/get-account-dashboard-summery-stats`,
    umrahHajjDashboard: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gm-int/get-ummrah-hajj-dashboard-summary`,
    accountsIndividualSummary: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gm-int/get-accounts-individual-summary`,
  },

  aiLearningAcademy: {
    dashboard:
      "https://ai-learning-academy-server.vercel.app/api/v1/analytics/dashboard",
  },

  gmItSolution: {
    dashboard:
      "https://gm-it-solution-backend.vercel.app/api/v1/analytics",
  },

  gmFoodPoint: {
    dashboard:
      "https://gm-food-point-backend.vercel.app/api/v1/dashboard/statistics",
    finance: {
      base: "https://gm-food-point-backend.vercel.app/api/v1/dashboard/finance",
      ranges: ["today", "7days", "15days", "1month", "3months", "6months", "1year"] as const,
    },
  },

  gmLogistic: {
    dashboard: "https://gm-logistic-backend.vercel.app/api/v1/admin-dashboard",
  },

  gmAviation: {
    dashboard: "https://gm-aviation-backend.vercel.app/api/v1/dashboard/admin/overview",
  },

  graphicsMultimedia: {
    dashboard: "https://www.graphicsmultimedia.net/api/admin-dashboard-analytics",
  },
};
