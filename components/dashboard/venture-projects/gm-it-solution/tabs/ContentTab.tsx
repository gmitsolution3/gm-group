"use client";

import Image from "next/image";

import {
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
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  FolderKanban,
  Layers3,
  LayoutGrid,
  Star,
  Wrench,
} from "lucide-react";

import type {
  ContentAnalytics,
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
  "hsl(var(--indigo) / 0.75)",
  "hsl(var(--indigo) / 0.5)",
  "hsl(var(--indigo) / 0.3)",
  "hsl(var(--indigo) / 0.18)",
];

/* ========================================================================== */
/* MAIN COMPONENT                                                             */
/* ========================================================================== */

export default function ContentTab({
  data,
}: {
  data: ContentAnalytics;
}) {
  const {
    summary,
    breakdowns,
    recent,
  } = data;

  const totalRecentContent =
    recent.blogs.length +
    recent.portfolios.length +
    recent.services.length +
    recent.jobs.length;

  return (
    <div className="space-y-8">
      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Content Analytics
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Content overview
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Get a complete view of the content published across blogs,
          portfolios, services, and recruitment.
        </p>
      </section>

      {/* ================================================================ */}
      {/* SUMMARY                                                         */}
      {/* ================================================================ */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          label="Total Content"
          value={summary.total}
          description="All tracked content records"
          icon={Layers3}
        />

        <MetricCard
          label="Content Types"
          value={summary.contentTypes}
          description="Different content categories"
          icon={LayoutGrid}
        />

        <MetricCard
          label="Recent Records"
          value={totalRecentContent}
          description="Latest content currently displayed"
          icon={CalendarDays}
        />
      </section>

      {/* ================================================================ */}
      {/* CONTENT DISTRIBUTION                                            */}
      {/* ================================================================ */}

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        {/* BAR CHART */}

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <LayoutGrid className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Content Distribution
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Compare the volume of content across each type.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {breakdowns.content.length > 0 ? (
              <div className="h-[360px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={breakdowns.content}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-border"
                    />

                    <XAxis
                      dataKey="type"
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
                      contentStyle={tooltipStyle}
                    />

                    <Bar
                      dataKey="count"
                      name="Content"
                      fill={INDIGO}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                message="No content breakdown data available."
              />
            )}
          </CardContent>
        </Card>

        {/* PIE CHART */}

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <Layers3 className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Content Mix
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Visual distribution of your content library.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {breakdowns.content.length > 0 ? (
              <>
                <div className="relative h-[280px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Tooltip
                        contentStyle={tooltipStyle}
                      />

                      <Pie
                        data={breakdowns.content}
                        dataKey="count"
                        nameKey="type"
                        innerRadius={65}
                        outerRadius={105}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {breakdowns.content.map(
                          (_, index) => (
                            <Cell
                              key={index}
                              fill={
                                PIE_COLORS[
                                  index % PIE_COLORS.length
                                ]
                              }
                            />
                          ),
                        )}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">
                      {summary.total}
                    </span>

                    <span className="mt-1 text-xs text-muted-foreground">
                      Total Content
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {breakdowns.content.map(
                    (item, index) => (
                      <LegendItem
                        key={item.type}
                        label={formatLabel(item.type)}
                        value={item.count}
                        dotStyle={{
                          backgroundColor:
                            PIE_COLORS[
                              index % PIE_COLORS.length
                            ],
                        }}
                      />
                    ),
                  )}
                </div>
              </>
            ) : (
              <EmptyState
                message="No content distribution available."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* RECENT BLOGS                                                     */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Publishing"
          title="Recent Blogs"
          description="The latest articles added to your content library."
        />

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
                      <FileText className="h-8 w-8 text-muted-foreground" />
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
                  <span className="inline-flex rounded-full bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo">
                    {blog.category}
                  </span>

                  <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-sm text-muted-foreground">
                    By {blog.author}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />

                    {formatDate(blog.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyCard
            message="No recent blogs found."
          />
        )}
      </section>

      {/* ================================================================ */}
      {/* RECENT PORTFOLIOS                                                */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Projects"
          title="Recent Portfolios"
          description="The latest portfolio projects added to the platform."
        />

        {recent.portfolios.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recent.portfolios.map((portfolio) => (
              <Card
                key={portfolio._id}
                className="group overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {portfolio.image ? (
                    <Image
                      src={portfolio.image}
                      alt={portfolio.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FolderKanban className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <span className="inline-flex rounded-full bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo">
                    {portfolio.category}
                  </span>

                  <h3 className="mt-4 line-clamp-2 text-lg font-semibold">
                    {portfolio.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />

                    {formatDate(portfolio.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyCard
            message="No recent portfolios found."
          />
        )}
      </section>

      {/* ================================================================ */}
      {/* RECENT SERVICES                                                  */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Solutions"
          title="Recent Services"
          description="The latest services available through GM IT Solution."
        />

        {recent.services.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recent.services.map((service) => (
              <Card
                key={service._id}
                className="group overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Wrench className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                    <Wrench className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-lg font-semibold">
                    {service.title}
                  </h3>

                  {service.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.technologies
                        .slice(0, 3)
                        .map((technology) => (
                          <span
                            key={technology}
                            className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}

                      {service.technologies.length > 3 && (
                        <span className="rounded-md bg-indigo/10 px-2 py-1 text-xs text-indigo">
                          +{service.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />

                    {formatDate(service.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyCard
            message="No recent services found."
          />
        )}
      </section>

      {/* ================================================================ */}
      {/* RECENT JOBS                                                      */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Recruitment"
          title="Recent Job Postings"
          description="The latest opportunities published by the company."
        />

        {recent.jobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recent.jobs.map((job) => (
              <Card
                key={job._id}
                className="border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        job.isActive
                          ? "bg-indigo/10 text-indigo"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      {job.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {job.department}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-sm text-muted-foreground">
                      {job.openings} opening
                      {job.openings === 1 ? "" : "s"}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(job.createdAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyCard
            message="No recent job postings found."
          />
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
/* LEGEND ITEM                                                                */
/* ========================================================================== */

function LegendItem({
  label,
  value,
  dotStyle,
}: {
  label: string;
  value: number;
  dotStyle: React.CSSProperties;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={dotStyle}
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
/* EMPTY CARD                                                                 */
/* ========================================================================== */

function EmptyCard({
  message,
}: {
  message: string;
}) {
  return (
    <Card className="border-border/70">
      <CardContent className="flex min-h-[220px] items-center justify-center">
        <EmptyState message={message} />
      </CardContent>
    </Card>
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
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <Layers3 className="h-5 w-5 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* TOOLTIP                                                                    */
/* ========================================================================== */

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
};

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) =>
      character.toUpperCase(),
    );
}

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