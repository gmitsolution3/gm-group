"use client";

import type { ContentAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  KpiCard,
  Section,
} from "../AnalyticsShared";

export default function ContentTab({
  data,
}: {
  data: ContentAnalytics;
}) {
  return (
    <div className="space-y-8">
      <Section
        title="Content Inventory"
        description="Content currently available across GM IT Solution."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Content"
            value={data.summary.totalContentItems}
          />

          <KpiCard
            label="Services"
            value={data.summary.services}
          />

          <KpiCard
            label="Portfolios"
            value={data.summary.portfolios}
          />

          <KpiCard
            label="Case Studies"
            value={data.summary.caseStudies}
          />

          <KpiCard
            label="Blogs"
            value={data.summary.blogs}
          />

          <KpiCard
            label="Team Members"
            value={data.summary.teamMembers}
          />

          <KpiCard
            label="Job Postings"
            value={data.summary.jobPostings}
          />

          <KpiCard
            label="Sliders"
            value={data.summary.sliders}
          />
        </div>
      </Section>
    </div>
  );
}