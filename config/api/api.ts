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
};
