"use client";

import {
  BookOpen,
  GraduationCap,
  Layers3,
  Users,
} from "lucide-react";
import { useState } from "react";

import { API_ENDPOINTS } from "@/config/api/api";
import { useFetch } from "@/hooks/api/useFetch";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type {
  AILearningDashboardPeriod,
  AILearningDashboardResponse,
} from "@/types";

import AILearningAcademyBatchAnalytics from "./AILearningAcademyBatchAnalytics";
import AILearningAcademyConsultancyAnalytics from "./AILearningAcademyConsultancyAnalytics";
import AILearningAcademyContentAnalytics from "./AILearningAcademyContentAnalytics";
import AILearningAcademyCourseAnalytics from "./AILearningAcademyCourseAnalytics";
import AILearningAcademyDashboardError from "./AILearningAcademyDashboardError";
import AILearningAcademyDashboardLoader from "./AILearningAcademyDashboardLoader";
import AILearningAcademyInstructorAnalytics from "./AILearningAcademyInstructorAnalytics";

export default function AILearningAcademyDashboard() {
  const [period, setPeriod] =
    useState<AILearningDashboardPeriod>("all");

  const { data, isLoading, isError, refetch } =
    useFetch<AILearningDashboardResponse>(
      `${API_ENDPOINTS.aiLearningAcademy.dashboard}?period=${period}`,
    );

  if (isLoading) {
    return <AILearningAcademyDashboardLoader />;
  }

  if (isError || !data?.data) {
    return <AILearningAcademyDashboardError onRetry={refetch} />;
  }

  const dashboard = data.data;
  const { overview } = dashboard;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            GM Group
          </p>

          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            AI Learning Academy
          </h1>

          <p className="mt-2 text-muted-foreground">
            Overview of courses, batches, learning content, students,
            and consultancy activity.
          </p>
        </div>

        {/* Period selector */}
        <div className="flex w-fit rounded-xl border bg-muted/40 p-1">
          <PeriodButton
            active={period === "all"}
            onClick={() => setPeriod("all")}
          >
            All time
          </PeriodButton>

          <PeriodButton
            active={period === "7d"}
            onClick={() => setPeriod("7d")}
          >
            7 days
          </PeriodButton>

          <PeriodButton
            active={period === "30d"}
            onClick={() => setPeriod("30d")}
          >
            30 days
          </PeriodButton>
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Total courses"
          value={overview.totalCourses}
          description={`${overview.publishedCourses} published`}
          icon={BookOpen}
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="Total batches"
          value={overview.totalBatches}
          description={`${overview.activeBatches} active`}
          icon={Layers3}
          iconClassName="bg-violet-100 text-violet-600"
        />

        <OverviewCard
          title="Total students"
          value={overview.totalStudents}
          description="Registered students"
          icon={GraduationCap}
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <OverviewCard
          title="Consultancy requests"
          value={overview.totalConsultancyRequests}
          description="Total requests"
          icon={Users}
          iconClassName="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Course analytics */}
      <AILearningAcademyCourseAnalytics courses={dashboard.courses} />

      {/* Batch analytics */}
      <AILearningAcademyBatchAnalytics batches={dashboard.batches} />

      {/* Content analytics */}
      <AILearningAcademyContentAnalytics
        content={dashboard.content}
      />

      {/* Consultancy analytics */}
      <AILearningAcademyConsultancyAnalytics
        consultancy={dashboard.consultancy}
      />

      {/* Instructor analytics */}
      <AILearningAcademyInstructorAnalytics
        instructors={dashboard.instructors}
      />

      {/* Footer metadata */}
      <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          Data generated{" "}
          {new Intl.DateTimeFormat("en", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(dashboard.generatedAt))}
        </span>

        <span>
          {new Intl.DateTimeFormat("en", {
            dateStyle: "medium",
          }).format(new Date(dashboard.timeRange.startDate))}{" "}
          –{" "}
          {new Intl.DateTimeFormat("en", {
            dateStyle: "medium",
          }).format(new Date(dashboard.timeRange.endDate))}
        </span>
      </div>
    </div>
  );
}

function PeriodButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className="rounded-lg"
    >
      {children}
    </Button>
  );
}

function OverviewCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  iconClassName: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
