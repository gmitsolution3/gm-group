"use client";

import { BriefcaseBusiness, FileText, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { RecruitmentAnalytics } from "@/types/dashboard/gm-it-solution.type";

import {
  BreakdownList,
  KpiCard,
  RecentTable,
  Section,
  TrendList,
} from "../AnalyticsShared";

export default function RecruitmentTab({
  data,
}: {
  data: RecruitmentAnalytics;
}) {
  const getJobTitle = (jobId: string) => {
    return (
      data.recent.jobs.find((job) => job._id === jobId)?.title ??
      "Unknown Job"
    );
  };

  return (
    <div className="space-y-8">
      {/* ============================================
          SUMMARY
      ============================================ */}

      <Section
        title="Recruitment Analytics"
        description="Overview of jobs, applications, openings, and recruitment activity."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard
            label="Total Jobs"
            value={data.summary.jobs.total}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Active Jobs"
            value={data.summary.jobs.active}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Inactive Jobs"
            value={data.summary.jobs.inactive}
            icon={BriefcaseBusiness}
          />

          <KpiCard
            label="Applications"
            value={data.summary.applications.total}
            icon={Users}
          />

          <KpiCard
            label="Total Openings"
            value={data.summary.openings.total}
            icon={FileText}
          />

          <KpiCard
            label="Avg. Applications / Job"
            value={data.summary.applications.averagePerJob}
            icon={Users}
          />
        </div>
      </Section>

      {/* ============================================
          APPLICATION TREND
      ============================================ */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Application Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <TrendList items={data.trends.applications} />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          DEPARTMENTS
      ============================================ */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Department</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {data.breakdowns.departments.map((item) => (
              <div
                key={item.department}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{item.department}</p>

                  <p className="text-sm text-muted-foreground">
                    {item.jobs} jobs
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{item.openings}</p>

                  <p className="text-sm text-muted-foreground">
                    Openings
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Types</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.employmentTypes}
              labelKey="employmentType"
            />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          WORKPLACE & EXPERIENCE
      ============================================ */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workplace Types</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.workplaceTypes}
              labelKey="workplaceType"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Levels</CardTitle>
          </CardHeader>

          <CardContent>
            <BreakdownList
              items={data.breakdowns.experienceLevels}
              labelKey="experienceLevel"
            />
          </CardContent>
        </Card>
      </section>

      {/* ============================================
          APPLICATIONS BY JOB
      ============================================ */}

      <Section
        title="Applications by Job"
        description="Number of applications received for each available job."
      >
        <RecentTable
          columns={["Job", "Applications"]}
          rows={data.breakdowns.applicationsByJob.map((item) => [
            getJobTitle(item._id),
            item.applications,
          ])}
        />
      </Section>

      {/* ============================================
          RECENT JOBS
      ============================================ */}

      <Section
        title="Recent Jobs"
        description="Latest job postings created in the recruitment system."
      >
        <RecentTable
          columns={[
            "Job",
            "Department",
            "Location",
            "Employment",
            "Workplace",
            "Openings",
            "Status",
          ]}
          rows={data.recent.jobs.map((item) => [
            item.title,
            item.department,
            item.location,
            item.employmentType,
            item.workplaceType,
            item.openings,
            item.isActive ? "Active" : "Inactive",
          ])}
        />
      </Section>

      {/* ============================================
          RECENT APPLICATIONS
      ============================================ */}

      <Section
        title="Recent Applications"
        description="Latest applications received for available positions."
      >
        <RecentTable
          columns={[
            "Applicant",
            "Email",
            "Phone",
            "Applied For",
            "Date",
          ]}
          rows={data.recent.applications.map((item) => [
            item.fullName,
            item.email,
            item.phone,
            getJobTitle(item.jobId),
            new Date(item.createdAt).toLocaleDateString(),
          ])}
        />
      </Section>

      {/* ============================================
          DATA LIMITATIONS
      ============================================ */}

      {data.limitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analytics Limitations</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
              {data.limitations.map((limitation) => (
                <li
                  key={limitation}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />

                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
