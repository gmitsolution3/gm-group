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
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
} from "lucide-react";

import type {
  BlogAnalytics,
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

const PIE_COLORS = [
  "hsl(var(--indigo))",
  "hsl(var(--chart-2))",
];

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function BlogTab({
  data,
}: {
  data: BlogAnalytics;
}) {
  const {
    summary,
    breakdowns,
    trends,
    recent,
  } = data;

  const featuredDistribution = [
    {
      name: "Featured",
      value: summary.featured,
    },
    {
      name: "Regular",
      value: summary.regular,
    },
  ];

  return (
    <div className="space-y-8">
      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Blog Analytics
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Content performance
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore your publishing activity, featured content,
          categories, authors, and blog growth over time.
        </p>
      </section>

      {/* ================================================================ */}
      {/* SUMMARY                                                         */}
      {/* ================================================================ */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}

        <MetricCard
          label="Total Blogs"
          value={summary.total}
          description="Published blog content"
          icon={BookOpen}
        />

        {/* FEATURED */}

        <MetricCard
          label="Featured Blogs"
          value={summary.featured}
          description="Highlighted content"
          icon={Star}
        />

        {/* REGULAR */}

        <MetricCard
          label="Regular Blogs"
          value={summary.regular}
          description="Standard published content"
          icon={FileText}
        />

        {/* FEATURED RATE */}

        <MetricCard
          label="Featured Rate"
          value={`${summary.featuredRate}%`}
          description="Of all blogs are featured"
          icon={Sparkles}
        />
      </section>

      {/* ================================================================ */}
      {/* CATEGORY + FEATURED DISTRIBUTION                                */}
      {/* ================================================================ */}

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        {/* CATEGORY DISTRIBUTION */}

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Blogs by Category
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Distribution of published content across categories.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {breakdowns.categories.length > 0 ? (
              <div className="h-[360px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={breakdowns.categories}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 45,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-border"
                    />

                    <XAxis
                      dataKey="category"
                      angle={-25}
                      textAnchor="end"
                      height={75}
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
                      fill={INDIGO}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                message="No category data available."
              />
            )}
          </CardContent>
        </Card>

        {/* FEATURED DISTRIBUTION */}

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <Star className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Content Mix
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Featured versus regular content.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {summary.total > 0 ? (
              <>
                <div className="relative h-[280px]">
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
                        data={featuredDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {featuredDistribution.map(
                          (_, index) => (
                            <Cell
                              key={index}
                              fill={PIE_COLORS[index]}
                            />
                          ),
                        )}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">
                      {summary.featuredRate}%
                    </span>

                    <span className="mt-1 text-xs text-muted-foreground">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <LegendItem
                    label="Featured Blogs"
                    value={summary.featured}
                    dotClassName="bg-indigo"
                  />

                  <LegendItem
                    label="Regular Blogs"
                    value={summary.regular}
                    dotClassName="bg-muted-foreground/30"
                  />
                </div>
              </>
            ) : (
              <EmptyState
                message="No blog distribution data available."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* AUTHOR DISTRIBUTION                                              */}
      {/* ================================================================ */}

      <section>
        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Content by Author
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  See how published content is distributed among authors.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {breakdowns.authors.length > 0 ? (
              <div className="h-[360px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={breakdowns.authors}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 30,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      className="stroke-border"
                    />

                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      type="category"
                      dataKey="author"
                      width={120}
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
                      fill={INDIGO}
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                message="No author data available."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* GROWTH                                                           */}
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
                  Publishing Growth
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Track blog publishing activity across reporting periods.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {trends.growth.length > 0 ? (
              <div className="h-[360px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={trends.growth}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="blogGrowthGradient"
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
                      fill="url(#blogGrowthGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                message="No blog growth data available."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* RECENT BLOGS                                                     */}
      {/* ================================================================ */}

      <section>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            Recent Publishing
          </p>

          <h3 className="mt-2 text-xl font-bold">
            Recent Blogs
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            The latest content added to your publishing library.
          </p>
        </div>

        {recent.blogs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recent.blogs.map((blog) => (
              <Card
                key={blog._id}
                className="group overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}

                  {blog.featured && (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-indigo px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Featured
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo">
                      {blog.category}
                    </span>
                  </div>

                  <h4 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug">
                    {blog.title}
                  </h4>

                  {blog.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {blog.excerpt}
                    </p>
                  )}

                  <div className="mt-5 space-y-3 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UserRound className="h-4 w-4" />

                      <span className="truncate">
                        {blog.author}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />

                        <span>
                          {formatDate(
                            blog.date || blog.createdAt,
                          )}
                        </span>
                      </div>

                      {blog.readTime && (
                        <div className="flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />

                          <span>
                            {blog.readTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/70">
            <CardContent className="flex min-h-[220px] items-center justify-center">
              <EmptyState
                message="No recent blogs found."
              />
            </CardContent>
          </Card>
        )}
      </section>
    </div>
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
}: {
  label: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
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
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* LEGEND ITEM                                                                */
/* ========================================================================== */

function LegendItem({
  label,
  value,
  dotClassName,
}: {
  label: string;
  value: number;
  dotClassName: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${dotClassName}`}
        />

        <span className="text-muted-foreground">
          {label}
        </span>
      </div>

      <span className="font-semibold">
        {value}
      </span>
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
    <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <BookOpen className="h-5 w-5 text-muted-foreground" />
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