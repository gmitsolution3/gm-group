"use client";

import {
  BookOpen,
  GraduationCap,
  Layers3,
  Users,
  Calendar,
  RefreshCw,
} from "lucide-react";
import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { useState } from "react";

import { API_ENDPOINTS } from "@/config/api/api";
import { useFetch } from "@/hooks/api/useFetch";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
import {
  formatDateMonthDay,
  formatDateTime,
  formatDate,
  formatNumber,
} from "../utils";

export default function AILearningAcademyDashboard() {
  const [period, setPeriod] =
    useState<AILearningDashboardPeriod>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading, isError, refetch } =
    useFetch<AILearningDashboardResponse>(
      `${API_ENDPOINTS.aiLearningAcademy.dashboard}?period=${period}`,
    );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (isLoading) {
    return <AILearningAcademyDashboardLoader />;
  }

  if (isError || !data?.data) {
    return <AILearningAcademyDashboardError onRetry={refetch} />;
  }

  const dashboard = data.data;
  const { overview } = dashboard;

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
        {dashboardVentures.find((v) => v.name === "AI Learning Academy") && (
          <VentureHeader
            selectedVenture={dashboardVentures.find((v) => v.name === "AI Learning Academy")!}
          />
        )}

        {/* Dashboard Title & Quick Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                AI Learning Academy
              </h1>
              <Badge
                variant="outline"
                className="hidden sm:inline-flex rounded-full border-indigo/30 bg-indigo/[0.06] text-indigo font-medium text-xs px-2.5 py-0.5"
              >
                Live Overview
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Platform overview, course analytics, enrollment, and
              consultancy insights.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-xs">
              <Calendar className="h-3.5 w-3.5 text-indigo" />
              <span>{formatDate(new Date())}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2 rounded-xl border-border/70 bg-card hover:bg-muted/60 text-xs font-medium shadow-xs"
            >
              <RefreshCw
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground",
                  isRefreshing && "animate-spin text-indigo",
                )}
              />
              <span>
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            title="Total Students"
            value={overview.totalStudents}
            description="Enrolled learners"
            icon={GraduationCap}
            iconClassName="bg-emerald/10 text-emerald-600 dark:text-emerald-400"
            gradientClass="from-emerald-500/[0.04]"
          />

          <OverviewCard
            title="Total Courses"
            value={overview.totalCourses}
            description={`${overview.publishedCourses} published`}
            icon={BookOpen}
            iconClassName="bg-blue/10 text-blue-600 dark:text-blue-400"
            gradientClass="from-blue-500/[0.04]"
          />

          <OverviewCard
            title="Active Batches"
            value={overview.activeBatches}
            description={`${overview.totalBatches} total batches`}
            icon={Layers3}
            iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
            gradientClass="from-violet-500/[0.04]"
          />

          <OverviewCard
            title="Consultancy Requests"
            value={overview.totalConsultancyRequests}
            description="Total requests"
            icon={Users}
            iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            gradientClass="from-amber-500/[0.04]"
          />
        </div>

        {/* Period Filter */}
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Time Period
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Filter dashboard data by time range
                </p>
              </div>
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
          </CardContent>
        </Card>

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
            {formatDateTime(dashboard.generatedAt, true)}
          </span>

          <span>
            {formatDateMonthDay(dashboard.timeRange.startDate)} –{" "}
            {formatDateMonthDay(dashboard.timeRange.endDate)}
          </span>
        </div>
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
      className={`rounded-lg ${active ? "bg-indigo" : ""}`}
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
  gradientClass,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  iconClassName: string;
  gradientClass: string;
}) {
  return (
    <Card className={`relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br ${gradientClass} via-card to-card p-5 shadow-xs transition-all hover:shadow-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="text-3xl font-extrabold tracking-tight text-foreground">
            {formatNumber(value)}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
