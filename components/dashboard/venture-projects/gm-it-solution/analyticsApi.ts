import type {
  AnalyticsPeriod,
  AnalyticsTab,
} from "@/types/dashboard/gm-it-solution.type";

export function buildAnalyticsUrl({
  baseUrl,
  tab,
  from,
  to,
  period,
}: {
  baseUrl: string;
  tab: AnalyticsTab;
  from?: string;
  to?: string;
  period?: AnalyticsPeriod;
}) {
  const params = new URLSearchParams();

  params.set("tab", tab);

  if (from) {
    params.set("from", from);
  }

  if (to) {
    params.set("to", to);
  }

  if (period) {
    params.set("period", period);
  }

  return `${baseUrl}?${params.toString()}`;
}