"use client";

import {
  Activity,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Layers3,
  LayoutGrid,
  TrendingUp,
  Users,
  UserRound,
} from "lucide-react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  GrowthAnalytics,
  GrowthDataPoint,
  GrowthMetric,
} from "@/types/dashboard/gm-it-solution.type";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const INDIGO = "hsl(var(--indigo))";

/* ========================================================================== */
/* METRIC CONFIG                                                              */
/* ========================================================================== */

type MetricConfig = {
  key: GrowthMetric;
  label: string;
  description: string;
  icon: React.ElementType;
};

const metricConfig: MetricConfig[] = [
  {
    key: "users",
    label: "Users",
    description: "User growth over time",
    icon: Users,
  },
  {
    key: "blogs",
    label: "Blogs",
    description: "Published blog growth",
    icon: FileText,
  },
  {
    key: "portfolios",
    label: "Portfolios",
    description: "Portfolio growth over time",
    icon: FolderKanban,
  },
  {
    key: "caseStudies",
    label: "Case Studies",
    description: "Case study growth",
    icon: LayoutGrid,
  },
  {
    key: "services",
    label: "Services",
    description: "Service growth over time",
    icon: Layers3,
  },
  {
    key: "jobPostings",
    label: "Job Postings",
    description: "Recruitment opportunities",
    icon: BriefcaseBusiness,
  },
  {
    key: "jobApplications",
    label: "Applications",
    description: "Incoming job applications",
    icon: UserRound,
  },
  {
    key: "teamMembers",
    label: "Team Members",
    description: "Team growth over time",
    icon: Users,
  },
];

/* ========================================================================== */
/* MAIN COMPONENT                                                             */
/* ========================================================================== */

export default function GrowthTab({
  data,
}: {
  data: GrowthAnalytics;
}) {
  const availableMetrics = new Set(
    data.availableMetrics,
  );

  const availableConfigs = metricConfig.filter(
    (metric) =>
      availableMetrics.has(metric.key),
  );

  return (
    <div className="space-y-8">
      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Growth Analytics
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Business growth
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Track how GM IT Solution is growing across
          users, content, services, recruitment, and
          team activity.
        </p>
      </section>

      {/* ================================================================ */}
      {/* PERIOD INFO                                                     */}
      {/* ================================================================ */}

      <Card className="border-border/70">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Growth period
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Analytics are currently grouped by{" "}
                  <span className="font-medium text-foreground">
                    {formatPeriod(data.period)}
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo/10 px-4 py-2 text-sm font-semibold text-indigo">
              <Activity className="h-4 w-4" />

              {availableConfigs.length} metrics tracked
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================ */}
      {/* METRIC CARDS                                                    */}
      {/* ================================================================ */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {availableConfigs.map((metric) => {
          const series = data.series[metric.key];

          const latestValue = getLatestValue(series);

          const previousValue =
            getPreviousValue(series);

          const change =
            latestValue - previousValue;

          return (
            <MetricCard
              key={metric.key}
              label={metric.label}
              value={latestValue}
              description={metric.description}
              icon={metric.icon}
              change={change}
              period={data.period}
            />
          );
        })}
      </section>

      {/* ================================================================ */}
      {/* PRIMARY GROWTH OVERVIEW                                         */}
      {/* ================================================================ */}

      <section>
        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Growth Overview
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Compare growth across all available
                  business metrics.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <CombinedGrowthChart
              data={data}
              metrics={availableConfigs}
            />
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* INDIVIDUAL GROWTH CHARTS                                        */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Detailed Growth"
          title="Metric Performance"
          description="Explore each business metric individually over the selected period."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {availableConfigs.map((metric) => (
            <GrowthChart
              key={metric.key}
              metric={metric}
              series={data.series[metric.key]}
              period={data.period}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ========================================================================== */
/* COMBINED GROWTH CHART                                                      */
/* ========================================================================== */

function CombinedGrowthChart({
  data,
  metrics,
}: {
  data: GrowthAnalytics;
  metrics: MetricConfig[];
}) {
  const chartData = combineSeries(
    data.series,
    metrics,
  );

  if (chartData.length === 0) {
    return (
      <EmptyState
        message="No growth data available for the selected period."
      />
    );
  }

  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 15,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-border"
          />

          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
            }}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={tooltipStyle}
          />

          <Legend />

          {metrics.map(
            (metric, index) => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.label}
                stroke={`hsl(var(--indigo) / ${
                  Math.max(
                    1 - index * 0.1,
                    0.3,
                  )
                })`}
                strokeWidth={
                  index === 0 ? 3 : 2
                }
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />
            ),
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ========================================================================== */
/* INDIVIDUAL GROWTH CHART                                                    */
/* ========================================================================== */

function GrowthChart({
  metric,
  series,
  period,
}: {
  metric: MetricConfig;
  series: GrowthDataPoint[];
  period: string;
}) {
  const Icon = metric.icon;

  const latestValue =
    getLatestValue(series);

  const previousValue =
    getPreviousValue(series);

  const change =
    latestValue - previousValue;

  return (
    <Card className="border-border/70">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base">
                {metric.label}
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {metric.description}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold">
              {latestValue}
            </p>

            <p
              className={[
                "mt-1 text-xs font-medium",
                change > 0
                  ? "text-indigo"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              {formatChange(change)} vs previous
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {series.length > 0 ? (
          <>
            <div className="h-[300px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={series}
                  margin={{
                    top: 10,
                    right: 15,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border"
                  />

                  <XAxis
                    dataKey="period"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fontSize: 11,
                    }}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                  />

                  <Line
                    type="monotone"
                    dataKey="count"
                    name={metric.label}
                    stroke={INDIGO}
                    strokeWidth={3}
                    dot={{
                      r: 3,
                      fill: INDIGO,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
              <span>
                Grouped by{" "}
                {formatPeriod(period)}
              </span>

              <span>
                {series.length} data point
                {series.length === 1 ? "" : "s"}
              </span>
            </div>
          </>
        ) : (
          <EmptyState
            message={`No ${metric.label.toLowerCase()} growth data available.`}
          />
        )}
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* METRIC CARD                                                                */
/* ========================================================================== */

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  change,
  period,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ElementType;
  change: number;
  period: string;
}) {
  return (
    <Card className="overflow-hidden border-border/70">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {label}
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {value}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
          <span
            className={[
              "text-xs font-semibold",
              change > 0
                ? "text-indigo"
                : "text-muted-foreground",
            ].join(" ")}
          >
            {formatChange(change)}
          </span>

          <span className="text-xs text-muted-foreground">
            {formatPeriod(period)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* SECTION HEADING                                                            */
/* ========================================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </div>

      <p className="mt-4 max-w-sm text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function getLatestValue(
  series: GrowthDataPoint[],
) {
  if (series.length === 0) {
    return 0;
  }

  return series[series.length - 1]?.count ?? 0;
}

function getPreviousValue(
  series: GrowthDataPoint[],
) {
  if (series.length < 2) {
    return 0;
  }

  return series[series.length - 2]?.count ?? 0;
}

function formatChange(change: number) {
  if (change > 0) {
    return `+${change}`;
  }

  return String(change);
}

function formatPeriod(period: string) {
  if (!period) {
    return "Monthly";
  }

  return (
    period.charAt(0).toUpperCase() +
    period.slice(1)
  );
}

/* ========================================================================== */
/* COMBINE SERIES                                                             */
/* ========================================================================== */

function combineSeries(
  series: GrowthAnalytics["series"],
  metrics: MetricConfig[],
) {
  const map = new Map<
    string,
    Record<string, string | number>
  >();

  metrics.forEach((metric) => {
    const metricSeries =
      series[metric.key] ?? [];

    metricSeries.forEach((item) => {
      const existing =
        map.get(item.period) ?? {
          period: item.period,
        };

      existing[metric.key] =
        item.count;

      map.set(
        item.period,
        existing,
      );
    });
  });

  return Array.from(map.values());
}

/* ========================================================================== */
/* TOOLTIP                                                                    */
/* ========================================================================== */

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
};