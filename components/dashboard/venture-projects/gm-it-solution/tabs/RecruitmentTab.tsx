"use client";

import type { ElementType } from "react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleAlert,
  FileText,
  MapPin,
  TrendingUp,
  Users,
  UserRound,
  Briefcase,
  Layers3,
  Target,
} from "lucide-react";

import type {
  RecruitmentAnalytics,
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
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function RecruitmentTab({
  data,
}: {
  data: RecruitmentAnalytics;
}) {
  const {
    summary,
    breakdowns,
    trends,
    recent,
    limitations,
  } = data;

  const jobStatusData = [
    {
      name: "Active",
      value: summary.jobs.active,
    },
    {
      name: "Inactive",
      value: summary.jobs.inactive,
    },
  ];

  return (
    <div className="space-y-8">
      {/* ================================================================ */}
      {/* HEADER                                                          */}
      {/* ================================================================ */}

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Recruitment Analytics
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Hiring overview
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Monitor job opportunities, applications, openings, hiring
          distribution, and recruitment activity.
        </p>
      </section>

      {/* ================================================================ */}
      {/* SUMMARY                                                         */}
      {/* ================================================================ */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Jobs"
          value={summary.jobs.total}
          description={`${summary.jobs.active} currently active`}
          icon={BriefcaseBusiness}
        />

        <MetricCard
          label="Applications"
          value={summary.applications.total}
          description={`${summary.applications.averagePerJob.toFixed(
            1,
          )} average per job`}
          icon={Users}
        />

        <MetricCard
          label="Total Openings"
          value={summary.openings.total}
          description={`${summary.openings.average.toFixed(
            1,
          )} average per job`}
          icon={Target}
        />

        <MetricCard
          label="Active Jobs"
          value={summary.jobs.active}
          description={`${summary.jobs.inactive} inactive jobs`}
          icon={TrendingUp}
        />
      </section>

      {/* ================================================================ */}
      {/* JOB STATUS + DEPARTMENTS                                        */}
      {/* ================================================================ */}

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.4fr]">
        {/* JOB STATUS */}

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Job Status</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Active versus inactive job postings.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {summary.jobs.total > 0 ? (
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
                        data={jobStatusData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={105}
                        paddingAngle={4}
                        stroke="none"
                      >
                        <Cell fill={INDIGO} />

                        <Cell
                          fill="hsl(var(--muted))"
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">
                      {summary.jobs.active}
                    </span>

                    <span className="mt-1 text-xs text-muted-foreground">
                      Active Jobs
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <LegendItem
                    label="Active"
                    value={summary.jobs.active}
                    dotClassName="bg-indigo"
                  />

                  <LegendItem
                    label="Inactive"
                    value={summary.jobs.inactive}
                    dotClassName="bg-muted-foreground/30"
                  />
                </div>
              </>
            ) : (
              <EmptyState message="No job status data available." />
            )}
          </CardContent>
        </Card>

        {/* DEPARTMENTS */}

        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Jobs by Department</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Compare available jobs and openings across departments.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {breakdowns.departments.length > 0 ? (
              <div className="h-[360px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={breakdowns.departments}
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
                      dataKey="department"
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
                      contentStyle={tooltipStyle}
                      cursor={{
                        fill: "hsl(var(--muted))",
                      }}
                    />

                    <Bar
                      dataKey="jobs"
                      name="Jobs"
                      fill={INDIGO}
                      radius={[7, 7, 0, 0]}
                    />

                    <Bar
                      dataKey="openings"
                      name="Openings"
                      fill="hsl(var(--indigo) / 0.35)"
                      radius={[7, 7, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState message="No department data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* EMPLOYMENT + WORKPLACE + EXPERIENCE                              */}
      {/* ================================================================ */}

      <section className="grid gap-6 lg:grid-cols-3">
        <BreakdownChart
          title="Employment Type"
          description="Distribution of available employment types."
          icon={Briefcase}
          data={breakdowns.employmentTypes}
          labelKey="employmentType"
        />

        <BreakdownChart
          title="Workplace Type"
          description="Where available roles are based."
          icon={MapPin}
          data={breakdowns.workplaceTypes}
          labelKey="workplaceType"
        />

        <BreakdownChart
          title="Experience Level"
          description="Required experience across job opportunities."
          icon={Layers3}
          data={breakdowns.experienceLevels}
          labelKey="experienceLevel"
        />
      </section>

      {/* ================================================================ */}
      {/* APPLICATIONS TREND                                              */}
      {/* ================================================================ */}

      <section>
        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Application Activity</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Track incoming job applications over time.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {trends.applications.length > 0 ? (
              <div className="h-[360px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={trends.applications}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="recruitmentApplicationsGradient"
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
                      contentStyle={tooltipStyle}
                    />

                    <Area
                      type="monotone"
                      dataKey="count"
                      name="Applications"
                      stroke={INDIGO}
                      strokeWidth={3}
                      fill="url(#recruitmentApplicationsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState message="No application trend data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* APPLICATIONS BY JOB                                             */}
      {/* ================================================================ */}

      <section>
        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Applications by Job</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Compare the number of applications received for each job.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {breakdowns.applicationsByJob.length > 0 ? (
              <div className="h-[340px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={breakdowns.applicationsByJob}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
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
                    />

                    <YAxis
                      type="category"
                      dataKey="_id"
                      width={120}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        String(value).slice(-8)
                      }
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                    />

                    <Bar
                      dataKey="applications"
                      fill={INDIGO}
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                message="No applications by job data available."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================================================================ */}
      {/* RECENT JOBS                                                     */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Latest Opportunities"
          title="Recent Jobs"
          description="The most recently created job opportunities."
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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
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
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {job.department}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-border/60 pt-4">
                    <InfoRow
                      icon={MapPin}
                      text={job.location}
                    />

                    <InfoRow
                      icon={Briefcase}
                      text={job.employmentType}
                    />

                    <InfoRow
                      icon={Layers3}
                      text={job.experienceLevel}
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-sm">
                    <span className="text-muted-foreground">
                      {job.openings} opening
                      {job.openings === 1 ? "" : "s"}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {formatDate(job.createdAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/70">
            <CardContent className="flex min-h-[220px] items-center justify-center">
              <EmptyState message="No recent jobs found." />
            </CardContent>
          </Card>
        )}
      </section>

      {/* ================================================================ */}
      {/* RECENT APPLICATIONS                                             */}
      {/* ================================================================ */}

      <section>
        <SectionHeading
          eyebrow="Candidate Activity"
          title="Recent Applications"
          description="The latest applications submitted for available roles."
        />

        {recent.applications.length > 0 ? (
          <Card className="overflow-hidden border-border/70">
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {recent.applications.map((application) => (
                  <div
                    key={application._id}
                    className="flex flex-col gap-4 p-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {application.fullName}
                        </p>

                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {application.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />

                      {formatDate(application.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/70">
            <CardContent className="flex min-h-[180px] items-center justify-center">
              <EmptyState message="No recent applications found." />
            </CardContent>
          </Card>
        )}
      </section>

      {/* ================================================================ */}
      {/* LIMITATIONS                                                      */}
      {/* ================================================================ */}

      {limitations.length > 0 && (
        <section>
          <Card className="border-border/70">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                  <CircleAlert className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>Analytics Limitations</CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Notes about the currently available recruitment data.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {limitations.map((limitation, index) => (
                  <li
                    key={`${limitation}-${index}`}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />

                    {limitation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}

/* ========================================================================== */
/* BREAKDOWN CHART                                                           */
/* ========================================================================== */

function BreakdownChart<
  T extends object,
  K extends keyof T,
>({
  title,
  description,
  icon: Icon,
  data,
  labelKey,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  data: T[];
  labelKey: K;
}) {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-base">
              {title}
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {data.length > 0 ? (
          <div className="h-[280px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data}
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
                  dataKey={String(labelKey)}
                  angle={-25}
                  textAnchor="end"
                  height={70}
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
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="count"
                  fill={INDIGO}
                  radius={[7, 7, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState message={`No ${title.toLowerCase()} data available.`} />
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
}: {
  label: string;
  value: string | number;
  description: string;
  icon: ElementType;
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
/* SECTION HEADING                                                           */
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
/* LEGEND                                                                    */
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
/* INFO ROW                                                                  */
/* ========================================================================== */

function InfoRow({
  icon: Icon,
  text,
}: {
  icon: ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0" />

      <span className="truncate">
        {text}
      </span>
    </div>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                               */
/* ========================================================================== */

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
        <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* TOOLTIP                                                                   */
/* ========================================================================== */

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
};

/* ========================================================================== */
/* DATE FORMAT                                                               */
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