"use client";

import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  RefreshCw,
  ServerCog,
  Users,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import { API_ENDPOINTS } from "@/config/api/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type {
  AnalyticsPeriod,
  AnalyticsResponse,
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

type AnalyticsApiResponse = AnalyticsResponse<AnalyticsData>;

export default function GMITSolutionDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const fromParam = searchParams.get("from") ?? "";
  const toParam = searchParams.get("to") ?? "";
  const periodParam = searchParams.get("period");

  const activeTab: AnalyticsTab = analyticsTabs.some(
    (tab) => tab.key === tabParam,
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

  const requestParams = useMemo(() => {
    const params: Record<string, string> = {
      tab: activeTab,
    };

    if (fromParam) {
      params.from = fromParam;
    }

    if (toParam) {
      params.to = toParam;
    }

    if (activeTab === "growth") {
      params.period = activePeriod;
    }

    return params;
  }, [activeTab, activePeriod, fromParam, toParam]);

  const { data, isLoading, isError, refetch } =
    useFetch<AnalyticsApiResponse>(
      API_ENDPOINTS.gmItSolution.analytics,
      {
        params: requestParams,
      },
    );

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

  function handleTabChange(tab: AnalyticsTab) {
    updateUrl({
      tab,
    });
  }

  function handlePeriodChange(period: AnalyticsPeriod) {
    updateUrl({
      period,
    });
  }

  function handleApplyDateRange() {
    updateUrl({
      from: fromDate,
      to: toDate,
    });
  }

  function handleClearDateRange() {
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
        {/* Header */}
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
                Monitor GM IT Solution operations and business
                activity from one dashboard.
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

        {/* Tabs */}
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full gap-1 rounded-2xl border border-border/70 bg-muted/30 p-1 sm:min-w-0">
            {analyticsTabs.map((tab) => {
              const active = tab.key === activeTab;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
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

        {/* Filters */}
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

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  className="rounded-full bg-indigo"
                  onClick={handleApplyDateRange}
                >
                  Apply
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={handleClearDateRange}
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
                      Choose how growth data should be grouped.
                    </p>
                  </div>

                  <div className="relative">
                    <select
                      value={activePeriod}
                      onChange={(event) =>
                        handlePeriodChange(
                          event.target.value as AnalyticsPeriod,
                        )
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

        {/* Tab content */}
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

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

function OverviewTab({ data }: { data: OverviewAnalytics }) {
  const cards = [
    {
      label: "Total Users",
      value: data.users.total,
      icon: Users,
    },
    {
      label: "Admins",
      value: data.users.admins,
      icon: CheckCircle2,
    },
    {
      label: "Services",
      value: data.services.total,
      icon: ServerCog,
    },
    {
      label: "Portfolios",
      value: data.portfolios.total,
      icon: BriefcaseBusiness,
    },
    {
      label: "Case Studies",
      value: data.caseStudies.total,
      icon: FileText,
    },
    {
      label: "Team Members",
      value: data.team.total,
      icon: Users,
    },
    {
      label: "Blog Posts",
      value: data.blog.total,
      icon: BookOpen,
    },
    {
      label: "Featured Blogs",
      value: data.blog.featured,
      icon: GraduationCap,
    },
    {
      label: "Total Jobs",
      value: data.recruitment.jobs,
      icon: BriefcaseBusiness,
    },
    {
      label: "Active Jobs",
      value: data.recruitment.activeJobs,
      icon: Activity,
    },
    {
      label: "Applications",
      value: data.recruitment.applications,
      icon: FileText,
    },
    {
      label: "Leadership Messages",
      value: data.leadership.total,
      icon: Users,
    },
    {
      label: "Sliders",
      value: data.sliders.total,
      icon: LayoutDashboard,
    },
  ];

  return (
    <AnalyticsSection
      title="Overview"
      description="Executive view of GM IT Solution activity."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <KpiCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Users                                                                      */
/* -------------------------------------------------------------------------- */

function UsersTab({ data }: { data: UsersAnalytics }) {
  return (
    <AnalyticsSection
      title="Users"
      description="User composition and verification analytics."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Users"
          value={data.total}
          icon={Users}
        />

        <KpiCard
          label="Admins"
          value={data.admins}
          icon={CheckCircle2}
        />

        <KpiCard
          label="Regular Users"
          value={data.regularUsers}
          icon={Users}
        />

        <KpiCard
          label="Verified"
          value={data.verified}
          icon={CheckCircle2}
        />

        <KpiCard
          label="Unverified"
          value={data.unverified}
          icon={Clock3}
        />
      </div>

      <DistributionCard
        title="Users by role"
        items={data.byRole.map((item) => ({
          label: item.role,
          value: item.count,
        }))}
      />
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

function ServicesTab({ data }: { data: ServicesAnalytics }) {
  return (
    <AnalyticsSection
      title="Services"
      description="Service inventory and technology usage."
    >
      <KpiCard
        label="Total Services"
        value={data.total}
        icon={ServerCog}
      />

      <DistributionCard
        title="Technology usage"
        items={data.technologies.map((item) => ({
          label: item.technology,
          value: item.count,
        }))}
      />
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Portfolios                                                                 */
/* -------------------------------------------------------------------------- */

function PortfoliosTab({ data }: { data: PortfoliosAnalytics }) {
  return (
    <AnalyticsSection
      title="Portfolios"
      description="Portfolio inventory, categories, and recent work."
    >
      <KpiCard
        label="Total Portfolios"
        value={data.total}
        icon={BriefcaseBusiness}
      />

      <DistributionCard
        title="Portfolios by category"
        items={data.byCategory.map((item) => ({
          label: item.category,
          value: item.count,
        }))}
      />

      <RecentTable
        title="Recent portfolios"
        columns={["Title", "Category", "Created"]}
        rows={data.recent.map((item) => [
          item.title,
          item.category,
          formatDate(item.createdAt),
        ])}
      />
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Case Studies                                                               */
/* -------------------------------------------------------------------------- */

function CaseStudiesTab({ data }: { data: CaseStudiesAnalytics }) {
  return (
    <AnalyticsSection
      title="Case Studies"
      description="Case-study inventory and technology usage."
    >
      <KpiCard
        label="Total Case Studies"
        value={data.total}
        icon={FileText}
      />

      <DistributionCard
        title="Technology usage"
        items={data.technologyUsage.map((item) => ({
          label: item.technology,
          value: item.count,
        }))}
      />

      <DistributionCard
        title="Case studies by portfolio"
        items={data.byPortfolio.map((item) => ({
          label: item.portfolio,
          value: item.count,
        }))}
      />
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */

function TeamTab({ data }: { data: TeamAnalytics }) {
  return (
    <AnalyticsSection
      title="Team"
      description="Team composition and professional profile coverage."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <KpiCard
          label="Total Team Members"
          value={data.total}
          icon={Users}
        />

        <KpiCard
          label="LinkedIn Profiles"
          value={data.linkedinProfiles}
          icon={Globe2}
        />
      </div>

      <DistributionCard
        title="Team by role"
        items={data.byRole.map((item) => ({
          label: item.role,
          value: item.count,
        }))}
      />
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                       */
/* -------------------------------------------------------------------------- */

function BlogTab({ data }: { data: BlogAnalytics }) {
  return (
    <AnalyticsSection
      title="Blog"
      description="Blog publishing and content composition."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total Blogs"
          value={data.total}
          icon={BookOpen}
        />

        <KpiCard
          label="Featured"
          value={data.featured}
          icon={CheckCircle2}
        />

        <KpiCard
          label="Regular"
          value={data.regular}
          icon={FileText}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <DistributionCard
          title="Blogs by category"
          items={data.byCategory.map((item) => ({
            label: item.category,
            value: item.count,
          }))}
        />

        <DistributionCard
          title="Blogs by author"
          items={data.byAuthor.map((item) => ({
            label: item.author,
            value: item.count,
          }))}
        />
      </div>
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Recruitment                                                                */
/* -------------------------------------------------------------------------- */

function RecruitmentTab({ data }: { data: RecruitmentAnalytics }) {
  return (
    <AnalyticsSection
      title="Recruitment"
      description="Jobs, openings, and application activity."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Total Jobs"
          value={data.jobs.total}
          icon={BriefcaseBusiness}
        />

        <KpiCard
          label="Active Jobs"
          value={data.jobs.active}
          icon={Activity}
        />

        <KpiCard
          label="Inactive Jobs"
          value={data.jobs.inactive}
          icon={Clock3}
        />

        <KpiCard
          label="Total Openings"
          value={data.jobs.totalOpenings}
          icon={Users}
        />

        <KpiCard
          label="Applications"
          value={data.applications.total}
          icon={FileText}
        />
      </div>

      <KpiCard
        label="Average Applications / Job"
        value={formatNumber(data.applications.averagePerJob)}
        icon={BarChart3}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <DistributionCard
          title="Applications by job"
          items={data.applicationsByJob.map((item) => ({
            label: item.job,
            value: item.count,
          }))}
        />

        <DistributionCard
          title="Jobs by department"
          items={data.byDepartment.map((item) => ({
            label: item.department,
            value: item.count,
          }))}
        />

        <DistributionCard
          title="Jobs by employment type"
          items={data.byEmploymentType.map((item) => ({
            label: item.employmentType,
            value: item.count,
          }))}
        />
      </div>

      {data.note && (
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm leading-6 text-muted-foreground">
          <span className="font-semibold text-foreground">Note:</span>{" "}
          {data.note}
        </div>
      )}
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Content                                                                     */
/* -------------------------------------------------------------------------- */

function ContentTab({ data }: { data: ContentAnalytics }) {
  const items = [
    {
      label: "Sliders",
      value: data.sliders,
    },
    {
      label: "Services",
      value: data.services,
    },
    {
      label: "Portfolios",
      value: data.portfolios,
    },
    {
      label: "Case Studies",
      value: data.caseStudies,
    },
    {
      label: "Blogs",
      value: data.blogs,
    },
    {
      label: "Team Members",
      value: data.teamMembers,
    },
    {
      label: "Leadership Messages",
      value: data.leadershipMessages,
    },
    {
      label: "Job Postings",
      value: data.jobPostings,
    },
  ];

  return (
    <AnalyticsSection
      title="Content"
      description="Content inventory across GM IT Solution."
    >
      <KpiCard
        label="Total Content Items"
        value={data.totalContentItems}
        icon={FileText}
      />

      <DistributionCard title="Content inventory" items={items} />
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Growth                                                                      */
/* -------------------------------------------------------------------------- */

function GrowthTab({ data }: { data: GrowthAnalytics }) {
  const [metric, setMetric] =
    useState<keyof GrowthAnalytics>("users");

  const metrics: {
    key: keyof GrowthAnalytics;
    label: string;
  }[] = [
    {
      key: "users",
      label: "Users",
    },
    {
      key: "blogs",
      label: "Blogs",
    },
    {
      key: "portfolios",
      label: "Portfolios",
    },
    {
      key: "caseStudies",
      label: "Case Studies",
    },
    {
      key: "jobPostings",
      label: "Job Postings",
    },
    {
      key: "jobApplications",
      label: "Job Applications",
    },
    {
      key: "services",
      label: "Services",
    },
  ];

  const points = data[metric];

  return (
    <AnalyticsSection
      title="Growth"
      description="Track content, user, service, and recruitment growth over time."
    >
      <Card className="rounded-2xl border-border/70 shadow-none">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Growth trend</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Showing {metricLabel(metric).toLowerCase()} over the
              selected period.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 rounded-xl border border-border/70 bg-muted/30 p-1">
            {metrics.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setMetric(item.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  metric === item.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <GrowthChart points={points} />
        </CardContent>
      </Card>
    </AnalyticsSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
/* -------------------------------------------------------------------------- */

function AnalyticsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight">
          {title}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function KpiCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {label}
            </p>

            <p className="mt-3 font-display text-2xl font-bold tracking-tight">
              {formatNumber(value)}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/[0.08] text-indigo">
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DistributionCard({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    value: number;
  }[];
}) {
  const max = Math.max(...items.map((item) => item.value), 0);

  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <EmptyData />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <span className="truncate text-sm font-medium">
                    {item.label}
                  </span>

                  <span className="shrink-0 text-sm text-muted-foreground">
                    {formatNumber(item.value)}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-indigo transition-all"
                    style={{
                      width:
                        max > 0
                          ? `${(item.value / max) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {rows.length === 0 ? (
          <EmptyData />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full min-w-[560px]">
              <thead className="bg-muted/40">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {rows.map((row, index) => (
                  <tr
                    key={`${row[0]}-${index}`}
                    className="transition-colors hover:bg-muted/20"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${cell}-${cellIndex}`}
                        className="px-4 py-3 text-sm"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GrowthChart({
  points,
}: {
  points: {
    period: string;
    count: number;
  }[];
}) {
  if (points.length === 0) {
    return <EmptyData />;
  }

  const max = Math.max(...points.map((point) => point.count), 0);

  return (
    <div className="space-y-4">
      {points.map((point) => (
        <div key={point.period}>
          <div className="mb-1.5 flex items-center justify-between gap-4">
            <span className="text-sm font-medium">
              {point.period}
            </span>

            <span className="text-sm text-muted-foreground">
              {formatNumber(point.count)}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-indigo transition-all"
              style={{
                width:
                  max > 0 ? `${(point.count / max) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyData() {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
      <p className="text-sm font-medium">
        No data available for this period.
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Try adjusting the selected date range.
      </p>
    </div>
  );
}

function formatNumber(value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function metricLabel(metric: keyof GrowthAnalytics) {
  const labels: Record<keyof GrowthAnalytics, string> = {
    users: "Users",
    blogs: "Blogs",
    portfolios: "Portfolios",
    caseStudies: "Case Studies",
    jobPostings: "Job Postings",
    jobApplications: "Job Applications",
    services: "Services",
  };

  return labels[metric];
}

function Globe({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex ${className ?? ""}`}
      aria-hidden="true"
    >
      ◉
    </span>
  );
}
