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

/* ====================================================================== */
/* TAB CONFIGURATION                                                      */
/* ====================================================================== */

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

/* ====================================================================== */
/* PERIOD CONFIGURATION                                                   */
/* ====================================================================== */

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

/* ====================================================================== */
/* DATA TYPES                                                             */
/* ====================================================================== */

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

/* ====================================================================== */
/* ANALYTICS TABS                                                         */
/* ====================================================================== */

function AnalyticsTabs({
  activeTab,
  onChange,
}: {
  activeTab: AnalyticsTab;
  onChange: (tab: AnalyticsTab) => void;
}) {
  return (
    <div className="border-b border-border">
      <div className="flex w-full overflow-x-auto">
        {analyticsTabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={[
                "relative flex shrink-0 items-center px-4 py-3 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span>{tab.label}</span>

              {isActive && (
                <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ====================================================================== */
/* MAIN DASHBOARD                                                         */
/* ====================================================================== */

export default function GMITSolutionDashboard() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");

  const fromParam = searchParams.get("from") ?? "";

  const toParam = searchParams.get("to") ?? "";

  const periodParam = searchParams.get("period");

  /* ================================================================== */
  /* ACTIVE TAB                                                         */
  /* ================================================================== */

  const activeTab: AnalyticsTab = analyticsTabs.some(
    (item) => item.key === tabParam,
  )
    ? (tabParam as AnalyticsTab)
    : "overview";

  /* ================================================================== */
  /* ACTIVE PERIOD                                                      */
  /* ================================================================== */

  const activePeriod: AnalyticsPeriod =
    periodParam === "daily" ||
    periodParam === "weekly" ||
    periodParam === "yearly"
      ? periodParam
      : "monthly";

  /* ================================================================== */
  /* LOCAL FILTER STATE                                                 */
  /* ================================================================== */

  const [fromDate, setFromDate] = useState(fromParam);

  const [toDate, setToDate] = useState(toParam);

  /* ================================================================== */
  /* ANALYTICS REQUEST                                                  */
  /* ================================================================== */

  const { data, isLoading, isError, refetch } =
    useAnalytics<AnalyticsData>({
      tab: activeTab,
      from: fromParam || undefined,
      to: toParam || undefined,
      period:
        activeTab === "growth"
          ? activePeriod
          : undefined,
    });

  /* ================================================================== */
  /* URL UPDATE                                                         */
  /* ================================================================== */

  function updateUrl(
    changes: Partial<{
      tab: AnalyticsTab;
      from: string;
      to: string;
      period: AnalyticsPeriod;
    }>,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

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

    if (
      changes.tab &&
      changes.tab !== "growth"
    ) {
      params.delete("period");
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }

  /* ================================================================== */
  /* FILTER ACTIONS                                                     */
  /* ================================================================== */

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

  /* ================================================================== */
  /* LOADING                                                            */
  /* ================================================================== */

  if (isLoading) {
    return <GMITSolutionDashboardLoader />;
  }

  /* ================================================================== */
  /* ERROR                                                              */
  /* ================================================================== */

  if (
    isError ||
    !data?.success ||
    !data.data
  ) {
    return (
      <GMITSolutionDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  /* ================================================================== */
  /* DASHBOARD                                                          */
  /* ================================================================== */

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">

        {/* ============================================================ */}
        {/* HEADER                                                       */}
        {/* ============================================================ */}

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
                  isLoading
                    ? "animate-spin"
                    : ""
                }`}
              />

              Refresh
            </Button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ANALYTICS TABS                                               */}
        {/* ============================================================ */}

        <AnalyticsTabs
          activeTab={activeTab}
          onChange={(tab) =>
            updateUrl({
              tab,
            })
          }
        />

        {/* ============================================================ */}
        {/* FILTERS                                                      */}
        {/* ============================================================ */}

        <Card>
          <CardContent className="p-5 sm:p-6">

            <div className="flex flex-col gap-5">

              <div>
                <p className="text-sm font-semibold">
                  Analytics filters
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Filter analytics data by a custom date range.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">

                {/* FROM DATE */}

                <div className="space-y-2">
                  <label
                    htmlFor="analytics-from"
                    className="text-sm font-medium"
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
                  />
                </div>

                {/* TO DATE */}

                <div className="space-y-2">
                  <label
                    htmlFor="analytics-to"
                    className="text-sm font-medium"
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
                  />
                </div>

                {/* ACTIONS */}

                <div className="flex items-end gap-2">
                  <Button
                    type="button"
                    onClick={handleApply}
                  >
                    Apply
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {/* ====================================================== */}
              {/* GROWTH PERIOD                                         */}
              {/* ====================================================== */}

              {activeTab === "growth" && (
                <div className="border-t border-border/60 pt-5">
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
                            period:
                              event.target
                                .value as AnalyticsPeriod,
                          })
                        }
                        className="h-10 appearance-none rounded-xl border border-border bg-background px-3 pr-9 text-sm font-medium outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10"
                      >
                        {analyticsPeriods.map(
                          (period) => (
                            <option
                              key={period.key}
                              value={period.key}
                            >
                              {period.label}
                            </option>
                          ),
                        )}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ============================================================ */}
        {/* ACTIVE TAB                                                   */}
        {/* ============================================================ */}

        {activeTab === "overview" && (
          <OverviewTab
            data={data.data as OverviewAnalytics}
          />
        )}

        {activeTab === "users" && (
          <UsersTab
            data={data.data as UsersAnalytics}
          />
        )}

        {activeTab === "services" && (
          <ServicesTab
            data={data.data as ServicesAnalytics}
          />
        )}

        {activeTab === "portfolios" && (
          <PortfoliosTab
            data={data.data as PortfoliosAnalytics}
          />
        )}

        {activeTab === "case-studies" && (
          <CaseStudiesTab
            data={data.data as CaseStudiesAnalytics}
          />
        )}

        {activeTab === "team" && (
          <TeamTab
            data={data.data as TeamAnalytics}
          />
        )}

        {activeTab === "blog" && (
          <BlogTab
            data={data.data as BlogAnalytics}
          />
        )}

        {activeTab === "recruitment" && (
          <RecruitmentTab
            data={data.data as RecruitmentAnalytics}
          />
        )}

        {activeTab === "content" && (
          <ContentTab
            data={data.data as ContentAnalytics}
          />
        )}

        {activeTab === "growth" && (
          <GrowthTab
            data={data.data as GrowthAnalytics}
          />
        )}
      </div>
    </div>
  );
}