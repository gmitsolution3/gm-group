"use client";

import { ChevronDown, RefreshCw } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type {
  AnalyticsPeriod,
  AnalyticsTab,
  BlogAnalytics,
  CaseStudiesAnalytics,
  ContentAnalytics,
  GrowthAnalytics,
  OverviewAnalytics,
  PortfoliosAnalytics,
  RecruitmentAnalytics,
  ServicesAnalytics,
  TeamAnalytics,
  UsersAnalytics,
} from "@/types/dashboard/gm-it-solution.type";

import { useAnalytics } from "./useAnalytics";

import BlogTab from "./tabs/BlogTab";
import CaseStudiesTab from "./tabs/CaseStudiesTab";
import ContentTab from "./tabs/ContentTab";
import GrowthTab from "./tabs/GrowthTab";
import OverviewTab from "./tabs/OverviewTab";
import PortfoliosTab from "./tabs/PortfoliosTab";
import RecruitmentTab from "./tabs/RecruitmentTab";
import ServicesTab from "./tabs/ServicesTab";
import TeamTab from "./tabs/TeamTab";
import UsersTab from "./tabs/UsersTab";

import GMITSolutionDashboardError from "./GMITSolutionDashboardError";
import GMITSolutionDashboardLoader from "./GMITSolutionDashboardLoader";

const analyticsTabs: {
  key: AnalyticsTab;
  label: string;
}[] = [
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "users",
    label: "Users",
  },
  {
    key: "services",
    label: "Services",
  },
  {
    key: "portfolios",
    label: "Portfolios",
  },
  {
    key: "case-studies",
    label: "Case Studies",
  },
  {
    key: "team",
    label: "Team",
  },
  {
    key: "blog",
    label: "Blog",
  },
  {
    key: "recruitment",
    label: "Recruitment",
  },
  {
    key: "content",
    label: "Content",
  },
  {
    key: "growth",
    label: "Growth",
  },
];

const analyticsPeriods: {
  key: AnalyticsPeriod;
  label: string;
}[] = [
  {
    key: "daily",
    label: "Daily",
  },
  {
    key: "weekly",
    label: "Weekly",
  },
  {
    key: "monthly",
    label: "Monthly",
  },
  {
    key: "yearly",
    label: "Yearly",
  },
];

type AnalyticsData =
  | OverviewAnalytics
  | UsersAnalytics
  | ServicesAnalytics
  | PortfoliosAnalytics
  | CaseStudiesAnalytics
  | TeamAnalytics
  | BlogAnalytics
  | RecruitmentAnalytics
  | ContentAnalytics
  | GrowthAnalytics;

export default function GMITSolutionDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const fromParam = searchParams.get("from") ?? "";
  const toParam = searchParams.get("to") ?? "";
  const periodParam = searchParams.get("period");

  const activeTab: AnalyticsTab = analyticsTabs.some(
    (item) => item.key === tabParam,
  )
    ? (tabParam as AnalyticsTab)
    : "overview";

  const activePeriod: AnalyticsPeriod =
    periodParam === "daily" ||
    periodParam === "weekly" ||
    periodParam === "yearly"
      ? periodParam
      : "monthly";

  const [fromDate, setFromDate] = useState(fromParam);

  const [toDate, setToDate] = useState(toParam);

  const { data, isLoading, isError, refetch } =
    useAnalytics<AnalyticsData>({
      tab: activeTab,
      from: fromParam || undefined,
      to: toParam || undefined,
      period: activeTab === "growth" ? activePeriod : undefined,
    });

    console.log(data)

  function updateUrl(
    changes: Partial<{
      tab: AnalyticsTab;
      from: string;
      to: string;
      period: AnalyticsPeriod;
    }>,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (changes.tab) {
      params.set("tab", changes.tab);
    }

    if (changes.from !== undefined) {
      if (changes.from) {
        params.set("from", changes.from);
      } else {
        params.delete("from");
      }
    }

    if (changes.to !== undefined) {
      if (changes.to) {
        params.set("to", changes.to);
      } else {
        params.delete("to");
      }
    }

    if (changes.period !== undefined) {
      params.set("period", changes.period);
    }

    if (changes.tab && changes.tab !== "growth") {
      params.delete("period");
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }

  function handleApply() {
    updateUrl({
      from: fromDate,
      to: toDate,
    });
  }

  function handleClear() {
    setFromDate("");
    setToDate("");

    updateUrl({
      from: "",
      to: "",
    });
  }

  if (isLoading) {
    return <GMITSolutionDashboardLoader />;
  }

  if (isError || !data?.success || !data.data) {
    return (
      <GMITSolutionDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        <section>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                GM IT Solution
              </p>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Analytics
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Company-wide business intelligence across GM IT
                Solution.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="self-start rounded-full lg:self-auto"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
          </div>
        </section>

        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full gap-1 rounded-2xl border border-border/70 bg-muted/30 p-1 sm:min-w-0">
            {analyticsTabs.map((tab) => {
              const active = tab.key === activeTab;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    updateUrl({
                      tab: tab.key,
                    })
                  }
                  className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <Card className="rounded-2xl border-border/70 shadow-none">
          <CardContent className="p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="analytics-from"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    From
                  </label>

                  <Input
                    id="analytics-from"
                    type="date"
                    value={fromDate}
                    onChange={(event) =>
                      setFromDate(event.target.value)
                    }
                    className="h-10 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="analytics-to"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    To
                  </label>

                  <Input
                    id="analytics-to"
                    type="date"
                    value={toDate}
                    onChange={(event) =>
                      setToDate(event.target.value)
                    }
                    className="h-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className="rounded-full bg-indigo"
                  onClick={handleApply}
                >
                  Apply
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </div>

            {activeTab === "growth" && (
              <div className="mt-5 border-t border-border/60 pt-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      Growth period
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Choose the grouping used by the Growth
                      analytics.
                    </p>
                  </div>

                  <div className="relative">
                    <select
                      value={activePeriod}
                      onChange={(event) =>
                        updateUrl({
                          period: event.target
                            .value as AnalyticsPeriod,
                        })
                      }
                      className="h-10 appearance-none rounded-xl border border-border bg-background px-3 pr-9 text-sm font-medium outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10"
                    >
                      {analyticsPeriods.map((period) => (
                        <option key={period.key} value={period.key}>
                          {period.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {activeTab === "overview" && (
          <OverviewTab data={data.data as OverviewAnalytics} />
        )}

        {activeTab === "users" && (
          <UsersTab data={data.data as UsersAnalytics} />
        )}

        {activeTab === "services" && (
          <ServicesTab data={data.data as ServicesAnalytics} />
        )}

        {activeTab === "portfolios" && (
          <PortfoliosTab data={data.data as PortfoliosAnalytics} />
        )}

        {activeTab === "case-studies" && (
          <CaseStudiesTab data={data.data as CaseStudiesAnalytics} />
        )}

        {activeTab === "team" && (
          <TeamTab data={data.data as TeamAnalytics} />
        )}

        {activeTab === "blog" && (
          <BlogTab data={data.data as BlogAnalytics} />
        )}

        {activeTab === "recruitment" && (
          <RecruitmentTab data={data.data as RecruitmentAnalytics} />
        )}

        {activeTab === "content" && (
          <ContentTab data={data.data as ContentAnalytics} />
        )}

        {activeTab === "growth" && (
          <GrowthTab data={data.data as GrowthAnalytics} />
        )}
      </div>
    </div>
  );
}
