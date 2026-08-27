"use client";

import {
  BriefcaseBusiness,
  FileText,
  Layers,
  LayoutDashboard,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { OverviewAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  ActivityTimeline,
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function OverviewTab({
  data,
}: {
  data: OverviewAnalytics;
}) {
  return (
    <div className="space-y-8">
      {/* ==================== OVERVIEW ==================== */}
      <Section
        title="Overview"
        description="Company-wide view of GM IT Solution activity."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard
            label="Users"
            value={data.summary.users.total}
            icon={Users}
          />

          <KpiCard
            label="Services"
            value={data.summary.services.total}
            icon={Layers}
          />

          <KpiCard
            label="Portfolios"
            value={data.summary.portfolios.total}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Blog Posts"
            value={data.summary.blog.total}
            icon={FileText}
          />

          <KpiCard
            label="Active Jobs"
            value={data.summary.recruitment.activeJobs}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Applications"
            value={data.summary.recruitment.totalApplications}
            icon={FileText}
          />
        </div>
      </Section>

      {/* ==================== TRENDS ==================== */}
      <Section
        title="Growth Trends"
        description="Activity growth across key areas."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>

            <CardContent>
              <TrendList items={data.trends.users} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
            </CardHeader>

            <CardContent>
              <TrendList items={data.trends.portfolios} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog Growth</CardTitle>
            </CardHeader>

            <CardContent>
              <TrendList items={data.trends.blogs} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Growth</CardTitle>
            </CardHeader>

            <CardContent>
              <TrendList items={data.trends.applications} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ==================== BREAKDOWNS ==================== */}
      <Section
        title="Content Breakdown"
        description="Distribution across technologies and categories."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>

            <CardContent>
              <BreakdownList
                items={data.breakdowns.technologies}
                labelKey="technology"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Categories</CardTitle>
            </CardHeader>

            <CardContent>
              <BreakdownList
                items={data.breakdowns.portfolioCategories}
                labelKey="category"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog Categories</CardTitle>
            </CardHeader>

            <CardContent>
              <BreakdownList
                items={data.breakdowns.blogCategories}
                labelKey="category"
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ==================== ACTIVITY ==================== */}
      <Section
        title="Recent Activity"
        description="Latest activity across GM IT Solution."
      >
        <ActivityTimeline items={data.activity} />
      </Section>

      {/* ==================== RECENT PORTFOLIOS ==================== */}
      <Section
        title="Recent Portfolios"
        description="Recently added portfolio projects."
      >
        <RecentTable
          columns={["Project", "Category", "Date"]}
          rows={data.recent.portfolios.map((item) => [
            item.title,
            item.category,
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* ==================== RECENT BLOGS ==================== */}
      <Section
        title="Recent Blogs"
        description="Recently published blog posts."
      >
        <RecentTable
          columns={["Title", "Category", "Author", "Date"]}
          rows={data.recent.blogs.map((item) => [
            item.title,
            item.category,
            item.author,
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* ==================== RECENT APPLICATIONS ==================== */}
      <Section
        title="Recent Applications"
        description="Latest job applications received."
      >
        <RecentTable
          columns={["Applicant", "Email", "Phone", "Date"]}
          rows={data.recent.applications.map((item) => [
            item.fullName,
            item.email,
            item.phone,
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* ==================== RECENT JOBS ==================== */}
      <Section
        title="Recent Jobs"
        description="Recently created job listings."
      >
        <RecentTable
          columns={["Job", "Department", "Type", "Status"]}
          rows={data.recent.jobs.map((item) => [
            item.title,
            item.department,
            item.employmentType,
            item.isActive ? "Active" : "Inactive",
          ])}
        />
      </Section>
    </div>
  );
}