"use client";

import Image from "next/image";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BadgeCheck,
  TrendingUp,
  Users,
  UserRound,
} from "lucide-react";

import type {
  TeamAnalytics,
} from "@/types/dashboard/gm-it-solution.type";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ========================================================================== */
/* COLORS                                                                     */
/* ========================================================================== */

const INDIGO = "hsl(var(--indigo))";

const CHART_COLORS = [
  "hsl(var(--indigo))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function TeamTab({
  data,
}: {
  data: TeamAnalytics;
}) {
  const {
    summary,
    breakdowns,
    trends,
    recent,
  } = data;

  const totalMembers = summary.total;

  const linkedinProfiles =
    summary.linkedinProfiles;

  const linkedinCoverage =
    summary.linkedinCoverage;

  const roleData =
    breakdowns.byRole;

  const growthData =
    trends.growth;

  const recentMembers =
    recent.members;

  const withoutLinkedin = Math.max(
    totalMembers - linkedinProfiles,
    0,
  );

  const linkedinData = [
    {
      name: "LinkedIn",
      value: linkedinProfiles,
    },
    {
      name: "No LinkedIn",
      value: withoutLinkedin,
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Team Analytics
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Team overview
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore your team composition, role distribution,
          professional profile coverage, and organizational growth.
        </p>
      </section>

      {/* ================================================================ */}
      {/* SUMMARY CARDS                                                   */}
      {/* ================================================================ */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {/* TOTAL MEMBERS */}

        <Card className="overflow-hidden border-border/70">
          <CardContent className="p-6">

            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Members
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight">
                  {totalMembers}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Current organization size
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
                <Users className="h-6 w-6" />
              </div>

            </div>

          </CardContent>
        </Card>

        {/* LINKEDIN PROFILES */}

        <Card className="overflow-hidden border-border/70">
          <CardContent className="p-6">

            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  LinkedIn Profiles
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight">
                  {linkedinProfiles}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Members with professional profiles
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
               {/* <Linkedin className="h-6 w-6" /> */} Linkedin
              </div>

            </div>

          </CardContent>
        </Card>

        {/* COVERAGE */}

        <Card className="overflow-hidden border-border/70">
          <CardContent className="p-6">

            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  LinkedIn Coverage
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight">
                  {linkedinCoverage}%
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Professional profile coverage
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
                <BadgeCheck className="h-6 w-6" />
              </div>

            </div>

          </CardContent>
        </Card>

      </section>

      {/* ================================================================ */}
      {/* ROLE DISTRIBUTION + LINKEDIN                                    */}
      {/* ================================================================ */}

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">

        {/* ROLE DISTRIBUTION */}

        <Card className="border-border/70">

          <CardHeader>

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Team by Role
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Distribution of team members across roles.
                </p>
              </div>

            </div>

          </CardHeader>

          <CardContent>

            {roleData.length > 0 ? (

              <div className="h-[350px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={roleData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 40,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-border"
                    />

                    <XAxis
                      dataKey="role"
                      angle={-30}
                      textAnchor="end"
                      height={70}
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
                      cursor={{
                        fill: "hsl(var(--muted))",
                      }}
                      contentStyle={{
                        borderRadius: "12px",
                        border:
                          "1px solid hsl(var(--border))",
                        background:
                          "hsl(var(--card))",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      radius={[8, 8, 0, 0]}
                      fill={INDIGO}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            ) : (

              <EmptyChartState
                message="No role distribution data available."
              />

            )}

          </CardContent>

        </Card>

        {/* LINKEDIN COVERAGE */}

        <Card className="border-border/70">

          <CardHeader>

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                {/* <Linkedin className="h-5 w-5" /> */}Linkedin
              </div>

              <div>
                <CardTitle>
                  Profile Coverage
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  LinkedIn profile availability.
                </p>
              </div>

            </div>

          </CardHeader>

          <CardContent>

            {totalMembers > 0 ? (

              <div className="relative h-[300px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border:
                          "1px solid hsl(var(--border))",
                        background:
                          "hsl(var(--card))",
                      }}
                    />

                    <Pie
                      data={linkedinData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={4}
                      stroke="none"
                    >

                      {linkedinData.map(
                        (_, index) => (

                          <Cell
                            key={index}
                            fill={
                              index === 0
                                ? INDIGO
                                : "hsl(var(--muted))"
                            }
                          />

                        ),
                      )}

                    </Pie>

                  </PieChart>

                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                  <span className="text-3xl font-bold">
                    {linkedinCoverage}%
                  </span>

                  <span className="mt-1 text-xs text-muted-foreground">
                    Coverage
                  </span>

                </div>

              </div>

            ) : (

              <EmptyChartState
                message="No profile coverage data available."
              />

            )}

            {/* LEGEND */}

            <div className="mt-2 space-y-3">

              <div className="flex items-center justify-between text-sm">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-indigo" />

                  <span className="text-muted-foreground">
                    LinkedIn Profiles
                  </span>

                </div>

                <span className="font-semibold">
                  {linkedinProfiles}
                </span>

              </div>

              <div className="flex items-center justify-between text-sm">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />

                  <span className="text-muted-foreground">
                    Without LinkedIn
                  </span>

                </div>

                <span className="font-semibold">
                  {withoutLinkedin}
                </span>

              </div>

            </div>

          </CardContent>

        </Card>

      </section>

      {/* ================================================================ */}
      {/* TEAM GROWTH                                                     */}
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
                  Team Growth
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Track team member growth across reporting periods.
                </p>
              </div>

            </div>

          </CardHeader>

          <CardContent>

            {growthData.length > 0 ? (

              <div className="h-[360px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart
                    data={growthData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 0,
                    }}
                  >

                    <defs>

                      <linearGradient
                        id="teamGrowthGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="5%"
                          stopColor={INDIGO}
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="95%"
                          stopColor={INDIGO}
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

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
                      contentStyle={{
                        borderRadius: "12px",
                        border:
                          "1px solid hsl(var(--border))",
                        background:
                          "hsl(var(--card))",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke={INDIGO}
                      strokeWidth={3}
                      fill="url(#teamGrowthGradient)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            ) : (

              <EmptyChartState
                message="No team growth data available."
              />

            )}

          </CardContent>

        </Card>

      </section>

      {/* ================================================================ */}
      {/* RECENT TEAM MEMBERS                                             */}
      {/* ================================================================ */}

      <section>

        <div className="mb-5">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            Latest Additions
          </p>

          <h3 className="mt-2 text-xl font-bold">
            Recent Team Members
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Recently added members in your organization.
          </p>

        </div>

        {recentMembers.length > 0 ? (

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {recentMembers.map((member) => (

              <Card
                key={member._id}
                className="group overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >

                <CardContent className="p-5">

                  <div className="flex items-start gap-4">

                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-muted">

                      {member.image ? (

                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />

                      ) : (

                        <div className="flex h-full w-full items-center justify-center">

                          <UserRound className="h-5 w-5 text-muted-foreground" />

                        </div>

                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <h4 className="truncate font-semibold">
                        {member.name}
                      </h4>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {member.role}
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">

                    {member.linkedin ? (

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-indigo transition-opacity hover:opacity-75"
                      >

                        {/* <Linkedin className="h-4 w-4" /> */}

                        LinkedIn

                      </a>

                    ) : (

                      <span className="text-sm text-muted-foreground">
                        No LinkedIn
                      </span>

                    )}

                    <span className="text-xs text-muted-foreground">
                      {formatDate(member.createdAt)}
                    </span>

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

        ) : (

          <Card className="border-border/70">

            <CardContent className="flex min-h-[180px] items-center justify-center">

              <EmptyChartState
                message="No recent team members found."
              />

            </CardContent>

          </Card>

        )}

      </section>

    </div>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

function EmptyChartState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <Users className="h-5 w-5 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {message}
      </p>

    </div>
  );
}

/* ========================================================================== */
/* DATE FORMAT                                                                */
/* ========================================================================== */

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}