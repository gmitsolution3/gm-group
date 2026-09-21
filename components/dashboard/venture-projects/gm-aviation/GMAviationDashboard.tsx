"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_ENDPOINTS } from "@/config/api/api";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { useFetch } from "@/hooks/api/useFetch";
import { cn } from "@/lib/utils";
import { GMAviationDashboardResponse } from "@/types/dashboard/gm-aviation.type";
import {
  Calendar,
  ClipboardCheck,
  Plane,
  RefreshCw,
  UserCircle,
  Users,
  GraduationCap,
  Layers,
  FileCheck
} from "lucide-react";
import { useState } from "react";
import { formatDate, formatNumber } from "../utils";
import GMAviationDashboardError from "./GMAviationDashboardError";
import GMAviationDashboardLoader from "./GMAviationDashboardLoader";

/* ========================================================================== */
/* MAIN DASHBOARD COMPONENT                                                   */
/* ========================================================================== */

export default function GMAviationDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch dashboard statistics
  const { data, isLoading, isError, refetch } =
    useFetch<GMAviationDashboardResponse>(
      API_ENDPOINTS.gmAviation.dashboard,
    );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Show loading state
  if (isLoading) {
    return <GMAviationDashboardLoader />;
  }

  // Show error state
  if (isError || !data?.success || !data.data) {
    return (
      <GMAviationDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const { courses, admissions, enrollments } = data.data;

  const gmAviationVenture = dashboardVentures.find(
    (v) => v.name === "GM Aviation",
  );

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
        {/* Venture Header */}
        {gmAviationVenture && (
          <VentureHeader selectedVenture={gmAviationVenture} />
        )}

        {/* Dashboard Title & Quick Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Aviation Dashboard
              </h1>
              <Badge
                variant="outline"
                className="hidden sm:inline-flex rounded-full border-blue-500/30 bg-blue-500/[0.06] text-blue-600 dark:text-blue-400 font-medium text-xs px-2.5 py-0.5"
              >
                Live Overview
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
              <Plane className="h-3.5 w-3.5 text-blue-500/70" />
              Overview of aviation courses, admissions, and student enrollments.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-border/70 bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-xs">
              <Calendar className="h-3.5 w-3.5 text-blue-500" />
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
                  isRefreshing && "animate-spin text-blue-500",
                )}
              />
              <span>
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </Button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* TOP KPI CARDS                                                      */}
        {/* ================================================================== */}
        <div className="grid gap-5 sm:grid-cols-3">
          {/* KPI 1: Total Courses */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-indigo/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-indigo/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Courses
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatNumber(courses.total ?? 0)}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-indigo">
                      {courses.published}
                    </span>{" "}
                    Published
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo flex-col">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
          </Card>

          {/* KPI 2: Total Admissions */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-emerald-500/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-emerald-500/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Admissions
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatNumber(admissions.total ?? 0)}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {admissions.underReview}
                    </span>{" "}
                    Under Review
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FileCheck className="h-5 w-5" />
              </div>
            </div>
          </Card>

          {/* KPI 3: Total Enrollments */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-amber-500/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-amber-500/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Enrollments
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatNumber(enrollments.total ?? 0)}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {enrollments.active}
                    </span>{" "}
                    Active Students
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>

        {/* ================================================================== */}
        {/* MAIN METRICS GRID                                                  */}
        {/* ================================================================== */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Courses Overview */}
            <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Layers className="h-4 w-4 text-indigo" />
                    Courses Breakdown
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all hover:bg-muted/40">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span>Total</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {formatNumber(courses.total ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-indigo-700 dark:text-indigo-400">
                      <span>Published</span>
                      <span className="h-2 w-2 rounded-full bg-indigo" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                      {formatNumber(courses.published ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span>Unpublished</span>
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-muted-foreground">
                      {formatNumber(courses.unpublished ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <span>Admission Open</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                      {formatNumber(courses.admissionOpen ?? 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admissions Overview */}
            <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <ClipboardCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Admissions Pipeline
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span>Submitted</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {formatNumber(admissions.submitted ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-amber-50/40 dark:bg-amber-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-amber-700 dark:text-amber-400">
                      <span>Under Review</span>
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-400">
                      {formatNumber(admissions.underReview ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <span>Approved</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                      {formatNumber(admissions.approved ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-rose-50/40 dark:bg-rose-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-rose-700 dark:text-rose-400">
                      <span>Rejected</span>
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-rose-700 dark:text-rose-400">
                      {formatNumber(admissions.rejected ?? 0)}
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

             {/* Enrollments Overview */}
             <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <UserCircle className="h-4 w-4 text-violet-500" />
                    Enrollment Status
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/60 bg-violet-50/40 dark:bg-violet-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-violet-700 dark:text-violet-400">
                      <span>Active</span>
                      <span className="h-2 w-2 rounded-full bg-violet-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-violet-700 dark:text-violet-400">
                      {formatNumber(enrollments.active ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <span>Completed</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                      {formatNumber(enrollments.completed ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-rose-50/40 dark:bg-rose-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-rose-700 dark:text-rose-400">
                      <span>Dropped</span>
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-rose-700 dark:text-rose-400">
                      {formatNumber(enrollments.dropped ?? 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-amber-50/40 dark:bg-amber-950/20 p-3.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-medium text-amber-700 dark:text-amber-400">
                      <span>Suspended</span>
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-400">
                      {formatNumber(enrollments.suspended ?? 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
