"use client";

import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Layers3,
  Users,
} from "lucide-react";

import type { GrowthAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  KpiCard,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function GrowthTab({
  data,
}: {
  data: GrowthAnalytics;
}) {
  const getLatestCount = (
    series: { count: number; period: string }[] | undefined
  ) => {
    if (!series || series.length === 0) return 0;

    return series[series.length - 1]?.count ?? 0;
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <Section
        title="Growth Overview"
        description={`Growth analytics grouped by ${data?.period ?? "monthly"} periods.`}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Users"
            value={getLatestCount(data?.series?.users)}
            icon={Users}
          />

          <KpiCard
            label="Blogs"
            value={getLatestCount(data?.series?.blogs)}
            icon={FileText}
          />

          <KpiCard
            label="Portfolios"
            value={getLatestCount(data?.series?.portfolios)}
            icon={FolderKanban}
          />

          <KpiCard
            label="Services"
            value={getLatestCount(data?.series?.services)}
            icon={BriefcaseBusiness}
          />
        </div>
      </Section>

      {/* Core Growth */}
      <Section
        title="Core Growth"
        description="Growth trends for the main platform content."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <TrendCard
            title="User Growth"
            items={data?.series?.users ?? []}
          />

          <TrendCard
            title="Blog Growth"
            items={data?.series?.blogs ?? []}
          />

          <TrendCard
            title="Portfolio Growth"
            items={data?.series?.portfolios ?? []}
          />

          <TrendCard
            title="Service Growth"
            items={data?.series?.services ?? []}
          />
        </div>
      </Section>

      {/* Content Growth */}
      <Section
        title="Content Growth"
        description="Growth across case studies and team content."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <TrendCard
            title="Case Study Growth"
            items={data?.series?.caseStudies ?? []}
          />

          <TrendCard
            title="Team Growth"
            items={data?.series?.teamMembers ?? []}
          />
        </div>
      </Section>

      {/* Recruitment Growth */}
      <Section
        title="Recruitment Growth"
        description="Growth trends for job postings and applications."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <TrendCard
            title="Job Posting Growth"
            items={data?.series?.jobPostings ?? []}
          />

          <TrendCard
            title="Job Application Growth"
            items={data?.series?.jobApplications ?? []}
          />
        </div>
      </Section>
    </div>
  );
}

function TrendCard({
  title,
  items,
}: {
  title: string;
  items: {
    count: number;
    period: string;
  }[];
}) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold">{title}</h3>

      <TrendList items={items} />
    </div>
  );
}