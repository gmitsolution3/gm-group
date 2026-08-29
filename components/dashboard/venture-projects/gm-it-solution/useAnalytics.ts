import { useFetch } from "@/hooks/api/useFetch";

import { API_ENDPOINTS } from "@/config/api/api";

import { buildAnalyticsUrl } from "./analyticsApi";

import type {
  AnalyticsPeriod,
  AnalyticsResponse,
  AnalyticsTab,
} from "@/types/dashboard/gm-it-solution.type";

export function useAnalytics<T>({
  tab,
  from,
  to,
  period,
}: {
  tab: AnalyticsTab;
  from?: string;
  to?: string;
  period?: AnalyticsPeriod;
}) {
  const url = buildAnalyticsUrl({
    baseUrl: API_ENDPOINTS.gmItSolution.dashboard,
    tab,
    from,
    to,
    period: tab === "growth" ? period : undefined,
  });

  return useFetch<AnalyticsResponse<T>>(url);
}