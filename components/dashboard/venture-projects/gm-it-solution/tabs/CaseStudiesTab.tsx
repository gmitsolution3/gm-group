"use client";

import {
  BookOpenCheck,
  Boxes,
  Code2,
  FolderKanban,
  TrendingUp,
} from "lucide-react";

import type { CaseStudiesAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  AnalyticsMultiLineChart,
  EmptyState,
  RecentTable,
} from "../AnalyticsShared";

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const INDIGO = "hsl(var(--indigo))";

const chartColors = [
  "hsl(var(--indigo))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function CaseStudiesTab({
  data,
}: {
  data: CaseStudiesAnalytics;
}) {
  const technologyData = data.breakdowns?.technologies ?? [];

  const portfolioData = data.breakdowns?.portfolios ?? [];

  const growthData = data.trends?.growth ?? [];

  const recentCaseStudies = data.recent?.caseStudies ?? [];

  return (
    <div className="space-y-6">
      {/* ================================================================== */}
      {/* HEADER                                                              */}
      {/* ================================================================== */}

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Case Studies
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight">
          Case study analytics
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Track documented projects, technology usage, portfolio
          coverage, and growth over time.
        </p>
      </section>

      {/* ================================================================== */}
      {/* KPI CARDS                                                           */}
      {/* ================================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          title="Total Case Studies"
          value={data.summary?.total ?? 0}
          description="Documented project case studies"
          icon={<BookOpenCheck className="h-5 w-5" />}
        />

        <KpiCard
          title="Technologies Used"
          value={data.summary?.technologiesUsed ?? 0}
          description="Unique technologies represented"
          icon={<Code2 className="h-5 w-5" />}
        />

        <KpiCard
          title="Portfolio Coverage"
          value={data.summary?.portfoliosWithCaseStudies ?? 0}
          description="Portfolios with case studies"
          icon={<FolderKanban className="h-5 w-5" />}
        />
      </section>

      {/* ================================================================== */}
      {/* BREAKDOWN CHARTS                                                   */}
      {/* ================================================================== */}

      <section className="grid gap-6 xl:grid-cols-2">
        {/* TECHNOLOGY USAGE */}

        <Card className="rounded-2xl border-border/70 shadow-none">
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-base">
                Technology Usage
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Technologies used across case studies.
              </p>
            </div>
          </CardHeader>

          <CardContent>
            {technologyData.length === 0 ? (
              <EmptyState text="No technology data available." />
            ) : (
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={technologyData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />

                    <XAxis
                      dataKey="technology"
                      tickLine={false}
                      axisLine={false}
                      className="fill-muted-foreground text-xs"
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      className="fill-muted-foreground text-xs"
                    />

                    <Tooltip
                      cursor={{
                        fill: "var(--muted)",
                        opacity: 0.5,
                      }}
                      contentStyle={{
                        borderRadius: "12px",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      name="Case Studies"
                      radius={[8, 8, 0, 0]}
                      fill={INDIGO}
                    >
                      <LabelList
                        dataKey="count"
                        position="top"
                        className="fill-muted-foreground text-xs"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CASE STUDIES BY PORTFOLIO */}

        <Card className="rounded-2xl border-border/70 shadow-none">
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-base">
                Case Studies by Portfolio
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Distribution of case studies across portfolios.
              </p>
            </div>
          </CardHeader>

          <CardContent>
            {portfolioData.length === 0 ? (
              <EmptyState text="No portfolio breakdown available." />
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center lg:flex-row">
                <div className="h-[240px] w-full max-w-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                        }}
                      />

                      <Pie
                        data={portfolioData}
                        dataKey="count"
                        nameKey="portfolioId"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {portfolioData.map((_, index) => (
                          <Cell
                            key={`portfolio-${index}`}
                            fill={
                              chartColors[index % chartColors.length]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full space-y-3 lg:max-w-[220px]">
                  {portfolioData.map((item, index) => (
                    <div
                      key={item.portfolioId}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/60 px-3 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              chartColors[index % chartColors.length],
                          }}
                        />

                        <span className="truncate text-xs font-medium">
                          Portfolio {shortId(item.portfolioId)}
                        </span>
                      </div>

                      <span className="text-sm font-bold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================== */}
      {/* GROWTH                                                             */}
      {/* ================================================================== */}

      <Card className="rounded-2xl border-border/70 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
              <TrendingUp className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base">
                Case Study Growth
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                New case studies created over time.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {growthData.length === 0 ? (
            <EmptyState text="No case study growth data available." />
          ) : (
            <AnalyticsMultiLineChart
              series={[
                {
                  key: "caseStudies",
                  label: "Case Studies",
                  items: growthData,
                },
              ]}
              height={340}
            />
          )}
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* RECENT CASE STUDIES                                                */}
      {/* ================================================================== */}

      <Card className="rounded-2xl border-border/70 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
              <Boxes className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base">
                Recent Case Studies
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Most recently created case study records.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <RecentTable
            columns={[
              "Case Study",
              "Portfolio",
              "Technologies",
              "Created",
            ]}
            rows={recentCaseStudies.map((item) => [
              <div
                key={`${item._id}-title`}
                className="min-w-[220px]"
              >
                <p className="font-medium">
                  {getCaseStudyTitle(item)}
                </p>

                {item.overview && (
                  <p className="mt-1 max-w-md truncate text-xs text-muted-foreground">
                    {item.overview}
                  </p>
                )}
              </div>,

              <span
                key={`${item._id}-portfolio`}
                className="font-mono text-xs text-muted-foreground"
              >
                {shortId(item.portfolioId)}
              </span>,

              <div
                key={`${item._id}-technologies`}
                className="flex min-w-[180px] flex-wrap gap-1.5"
              >
                {(item.technologies ?? []).length > 0 ? (
                  item.technologies.map((technology) => (
                    <Badge
                      key={technology}
                      variant="secondary"
                      className="rounded-md text-[10px]"
                    >
                      {technology}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No technologies
                  </span>
                )}
              </div>,

              <span
                key={`${item._id}-date`}
                className="whitespace-nowrap text-sm text-muted-foreground"
              >
                {formatDate(item.createdAt)}
              </span>,
            ])}
          />
        </CardContent>
      </Card>
    </div>
  );
}

/* ========================================================================== */
/* KPI CARD                                                                   */
/* ========================================================================== */

function KpiCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function shortId(id: string) {
  if (!id) {
    return "Unknown";
  }

  return `${id.slice(0, 6)}...${id.slice(-4)}`;
}

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getCaseStudyTitle(
  item: CaseStudiesAnalytics["recent"]["caseStudies"][number],
) {
  const technologies = item.technologies?.slice(0, 2).join(", ");

  if (technologies) {
    return `Case Study — ${technologies}`;
  }

  return "Case Study";
}
