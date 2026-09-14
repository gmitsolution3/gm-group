"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_ENDPOINTS } from "@/config/api/api";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { useFetch } from "@/hooks/api/useFetch";
import { cn } from "@/lib/utils";
import { GraphicsMultimediaDashboardResponse } from "@/types/dashboard/graphics-multimedia.type";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Minus,
  Package,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  calculatePercentage,
  formatCurrency,
  formatDate,
  formatNumber,
} from "../utils";
import GraphicsMultimediaDashboardError from "./GraphicsMultimediaDashboardError";
import GraphicsMultimediaDashboardLoader from "./GraphicsMultimediaDashboardLoader";

/* ========================================================================== */
/* CONSTANTS & COLOR THEMES                                                   */
/* ========================================================================== */

const BOOKING_COLORS = {
  regular: "#5b5fef",
  custom: "#00bfa6",
  influencer: "#f59e0b",
};

/* ========================================================================== */
/* CHANGE BADGE COMPONENT                                                     */
/* ========================================================================== */

interface ChangeBadgeProps {
  change?: number;
}

function ChangeBadge({ change }: ChangeBadgeProps) {
  if (change === undefined || change === null || change === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground">
        <Minus className="h-3 w-3" />
        0%
      </span>
    );
  }

  const isPositive = change > 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold tracking-tight border",
        isPositive
          ? "border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "border-rose-200/80 bg-rose-50 text-rose-700 dark:border-rose-800/40 dark:bg-rose-950/40 dark:text-rose-400",
      )}
    >
      {isPositive ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" />
      )}
      {isPositive ? `+${change}%` : `${change}%`}
    </span>
  );
}

/* ========================================================================== */
/* EMPTY STATE HELPER                                                         */
/* ========================================================================== */

function EmptyDataState({
  message,
  icon: Icon = HelpCircle,
}: {
  message: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 py-8 text-center px-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground mb-2.5">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* MAIN DASHBOARD COMPONENT                                                   */
/* ========================================================================== */

export default function GraphicsMultimediaDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch dashboard statistics using existing hook
  const { data, isLoading, isError, refetch } =
    useFetch<GraphicsMultimediaDashboardResponse>(
      API_ENDPOINTS.graphicsMultimedia.dashboard,
    );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Show loading state
  if (isLoading) {
    return <GraphicsMultimediaDashboardLoader />;
  }

  // Show error state
  if (isError || !data?.success || !data.data) {
    return (
      <GraphicsMultimediaDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const dashboardData = data.data;
  const {
    stats,
    today,
    breakdown,
    recentBookings,
    recentInfluencerBookings,
    recentUsers,
    recentApplications,
  } = dashboardData;

  const graphicsMultimediaVenture = dashboardVentures.find(
    (v) => v.name === "Graphics Multimedia",
  );

  // Booking distribution calculations
  const totalBreakdownBookings =
    (breakdown.bookings.regular ?? 0) +
    (breakdown.bookings.custom ?? 0) +
    (breakdown.bookings.influencer ?? 0);

  const bookingChartData = [
    {
      name: "Regular Bookings",
      value: breakdown.bookings.regular ?? 0,
      color: BOOKING_COLORS.regular,
      percent: calculatePercentage(
        breakdown.bookings.regular ?? 0,
        totalBreakdownBookings,
      ),
    },
    {
      name: "Custom Packages",
      value: breakdown.bookings.custom ?? 0,
      color: BOOKING_COLORS.custom,
      percent: calculatePercentage(
        breakdown.bookings.custom ?? 0,
        totalBreakdownBookings,
      ),
    },
    {
      name: "Influencers",
      value: breakdown.bookings.influencer ?? 0,
      color: BOOKING_COLORS.influencer,
      percent: calculatePercentage(
        breakdown.bookings.influencer ?? 0,
        totalBreakdownBookings,
      ),
    },
  ];

  const averageBookingValue =
    stats.totalBookings > 0
      ? Math.round(stats.totalRevenue / stats.totalBookings)
      : 0;

  const activeJobsPercentage =
    breakdown.jobs.total > 0
      ? Math.round(
          (breakdown.jobs.active / breakdown.jobs.total) * 100,
        )
      : 0;

  const totalCatalogItems =
    (breakdown.catalog.services ?? 0) +
    (breakdown.catalog.packages ?? 0) +
    (breakdown.catalog.customPackages ?? 0) +
    (breakdown.catalog.influencers ?? 0);

  const todayTotalActivity =
    (today.bookings ?? 0) +
    (today.influencerBookings ?? 0) +
    (today.applications ?? 0);

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
        {/* Existing Venture Header — Preserved */}
        {graphicsMultimediaVenture && (
          <VentureHeader
            selectedVenture={graphicsMultimediaVenture}
          />
        )}

        {/* Dashboard Title & Quick Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Graphics Multimedia Analytics
              </h1>
              <Badge
                variant="outline"
                className="hidden sm:inline-flex rounded-full border-indigo/30 bg-indigo/[0.06] text-indigo font-medium text-xs px-2.5 py-0.5"
              >
                Live Overview
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Performance metrics, revenue analytics, bookings, and
              creative talent operations.
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

        {/* ================================================================== */}
        {/* TOP KPI CARDS                                                      */}
        {/* ================================================================== */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* KPI 1: Total Revenue */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-indigo/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-indigo/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatCurrency(stats.totalRevenue ?? 0, "BDT")}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <ChangeBadge change={stats.revenueChange} />
                  <span className="text-xs text-muted-foreground truncate">
                    vs previous period
                  </span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </Card>

          {/* KPI 2: Total Bookings */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-teal/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-teal/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Bookings
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatNumber(stats.totalBookings ?? 0)}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <ChangeBadge change={stats.bookingChange} />
                  <span className="text-xs text-muted-foreground truncate">
                    {stats.totalInfluencerBookings ?? 0} influencer
                    bookings
                  </span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
          </Card>

          {/* KPI 3: Total Users */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-violet-500/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-violet-500/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Users
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatNumber(stats.totalUsers ?? 0)}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <ChangeBadge change={stats.userChange} />
                  <span className="text-xs text-muted-foreground truncate">
                    Registered client accounts
                  </span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </Card>

          {/* KPI 4: Job Applications */}
          <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-amber-500/[0.04] via-card to-card p-5 shadow-xs transition-all hover:border-amber-500/30 hover:shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Job Applications
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-foreground">
                  {formatNumber(stats.totalJobApplications ?? 0)}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <ChangeBadge change={stats.applicationChange} />
                  <span className="text-xs text-muted-foreground truncate">
                    Across {stats.totalJobPostings ?? 0} listings
                  </span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>

        {/* ================================================================== */}
        {/* MAIN ANALYTICS GRID                                                */}
        {/* ================================================================== */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left / Center Section: Revenue & Booking Analytics (8 Cols) */}
          <div className="space-y-6 lg:col-span-8">
            {/* Business Overview & Booking Breakdown Card */}
            <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                      <TrendingUp className="h-5 w-5 text-indigo" />
                      Business Performance Overview
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs sm:text-sm">
                      Revenue distribution and booking volume by
                      channel
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="rounded-lg text-xs font-medium"
                    >
                      {formatNumber(stats.totalBookings ?? 0)} Total
                      Orders
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Metric Summary Bar */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl bg-muted/30 p-4 border border-border/50">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {formatCurrency(stats.totalRevenue ?? 0, "BDT")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Total Bookings
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {formatNumber(stats.totalBookings ?? 0)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Avg. Booking Value
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {formatCurrency(averageBookingValue, "BDT")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Today's Orders
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-indigo">
                      {formatNumber(today.totalBookings ?? 0)}
                    </p>
                  </div>
                </div>

                {/* Booking Breakdown Chart & Channels */}
                <div className="grid gap-6 md:grid-cols-12 items-center pt-2">
                  {/* Donut Chart */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative h-48 w-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookingChartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={4}
                            stroke="none"
                          >
                            {bookingChartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: any) => [
                              formatNumber(Number(value)),
                              "Bookings",
                            ]}
                            contentStyle={{
                              borderRadius: "10px",
                              border: "1px solid var(--border)",
                              backgroundColor: "var(--card)",
                              color: "var(--foreground)",
                              boxShadow:
                                "0 4px 12px rgba(0,0,0,0.08)",
                              fontSize: "12px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          Total
                        </span>
                        <span className="text-xl font-extrabold tracking-tight text-foreground">
                          {formatNumber(totalBreakdownBookings)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Channel Breakdown Bars */}
                  <div className="md:col-span-7 space-y-3.5">
                    {/* Regular Bookings */}
                    <div className="rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:bg-muted/30">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="h-3 w-3 rounded-full bg-indigo" />
                          <span className="text-xs sm:text-sm font-semibold text-foreground">
                            Regular Bookings
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {formatNumber(
                              breakdown.bookings.regular ?? 0,
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (
                            {calculatePercentage(
                              breakdown.bookings.regular ?? 0,
                              totalBreakdownBookings,
                            ).toFixed(0)}
                            %)
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo transition-all duration-500"
                          style={{
                            width: `${calculatePercentage(breakdown.bookings.regular ?? 0, totalBreakdownBookings)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Custom Packages */}
                    <div className="rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:bg-muted/30">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="h-3 w-3 rounded-full bg-teal" />
                          <span className="text-xs sm:text-sm font-semibold text-foreground">
                            Custom Packages
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {formatNumber(
                              breakdown.bookings.custom ?? 0,
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (
                            {calculatePercentage(
                              breakdown.bookings.custom ?? 0,
                              totalBreakdownBookings,
                            ).toFixed(0)}
                            %)
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-teal transition-all duration-500"
                          style={{
                            width: `${calculatePercentage(breakdown.bookings.custom ?? 0, totalBreakdownBookings)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Influencers */}
                    <div className="rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:bg-muted/30">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="h-3 w-3 rounded-full bg-amber-500" />
                          <span className="text-xs sm:text-sm font-semibold text-foreground">
                            Influencer Collaborations
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {formatNumber(
                              breakdown.bookings.influencer ?? 0,
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (
                            {calculatePercentage(
                              breakdown.bookings.influencer ?? 0,
                              totalBreakdownBookings,
                            ).toFixed(0)}
                            %)
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all duration-500"
                          style={{
                            width: `${calculatePercentage(breakdown.bookings.influencer ?? 0, totalBreakdownBookings)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Catalog & Jobs Overview Grid (2 Columns) */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Catalog Overview */}
              <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
                <CardHeader className="border-b border-border/60 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                      <Layers className="h-4 w-4 text-indigo" />
                      Service Catalog
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold"
                    >
                      {totalCatalogItems} Total
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Offerings, packages & influencer portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all hover:bg-muted/40">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Layers className="h-3.5 w-3.5 text-indigo" />
                        Services
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {formatNumber(
                          breakdown.catalog.services ?? 0,
                        )}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Individual services
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all hover:bg-muted/40">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Package className="h-3.5 w-3.5 text-teal" />
                        Packages
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {formatNumber(
                          breakdown.catalog.packages ?? 0,
                        )}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Standard bundles
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all hover:bg-muted/40">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                        Custom
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {formatNumber(
                          breakdown.catalog.customPackages ?? 0,
                        )}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Tailored packages
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-all hover:bg-muted/40">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <UserCheck className="h-3.5 w-3.5 text-amber-500" />
                        Influencers
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {formatNumber(
                          breakdown.catalog.influencers ?? 0,
                        )}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Active creators
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Postings Status */}
              <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
                <CardHeader className="border-b border-border/60 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                      <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Recruitment & Jobs
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-semibold"
                    >
                      {breakdown.jobs.active ?? 0} Active
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Job postings status and hiring pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Active Postings
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        {formatNumber(breakdown.jobs.active ?? 0)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Accepting applications
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Inactive / Closed
                        </span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-muted-foreground">
                        {formatNumber(breakdown.jobs.inactive ?? 0)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Closed or drafts
                      </p>
                    </div>
                  </div>

                  {/* Active Ratio Progress */}
                  <div className="space-y-1.5 rounded-xl border border-border/60 bg-card p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground">
                        Open Listings Ratio
                      </span>
                      <span className="font-semibold text-foreground">
                        {activeJobsPercentage}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${activeJobsPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                      <span>
                        {breakdown.jobs.total ?? 0} Total Listings
                      </span>
                      <span>
                        {stats.totalJobApplications ?? 0} Received
                        Resumes
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Today's Activity & Quick Summary (4 Cols) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Today's Activity Card */}
            <Card className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-indigo/[0.02] shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Calendar className="h-4 w-4 text-indigo" />
                    Today's Activity
                  </CardTitle>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo" />
                    Today
                  </span>
                </div>
                <CardDescription className="text-xs">
                  Real-time events recorded today
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3.5">
                {/* Highlight Summary */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                      Total Activity Today
                    </span>
                    <span className="text-lg font-extrabold text-indigo">
                      {formatNumber(todayTotalActivity)}
                    </span>
                  </div>
                </div>

                {/* Activity List */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3 transition-all hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100/80 text-indigo dark:bg-indigo-900/40">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Service Bookings
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Standard & custom orders
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground">
                      {formatNumber(today.bookings ?? 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3 transition-all hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100/80 text-amber-600 dark:bg-amber-900/40">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Influencer Bookings
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Creator collaborations
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground">
                      {formatNumber(today.influencerBookings ?? 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-3 transition-all hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/40">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Job Applications
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          New resumes received
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground">
                      {formatNumber(today.applications ?? 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Operations Metrics Card */}
            <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <CardTitle className="text-base font-bold">
                  Platform Metrics
                </CardTitle>
                <CardDescription className="text-xs">
                  Key operational inventory summary
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5 text-xs">
                  <span className="text-muted-foreground">
                    Registered Creators
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(stats.totalInfluencers ?? 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5 text-xs">
                  <span className="text-muted-foreground">
                    Active Service Packages
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(stats.totalPackages ?? 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5 text-xs">
                  <span className="text-muted-foreground">
                    Services Offered
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(stats.totalServices ?? 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-muted-foreground">
                    Total Job Postings
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(stats.totalJobPostings ?? 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ================================================================== */}
        {/* RECENT ACTIVITY SECTIONS                                           */}
        {/* ================================================================== */}
        <div className="space-y-6">
          {/* Recent Bookings Card */}
          <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
            <CardHeader className="border-b border-border/60 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <ShoppingBag className="h-5 w-5 text-indigo" />
                    Recent Bookings
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    Latest client service packages and custom orders
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-semibold"
                >
                  {recentBookings.length} Recorded
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {recentBookings && recentBookings.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 shrink-0 border border-border/60">
                          <AvatarFallback className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs">
                            {booking.name
                              ? booking.name.slice(0, 2).toUpperCase()
                              : "BK"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-foreground truncate">
                              {booking.name}
                            </p>
                            <Badge
                              variant={
                                booking.bookingType === "custom"
                                  ? "secondary"
                                  : "default"
                              }
                              className={cn(
                                "rounded-full text-[10px] font-semibold px-2 py-0",
                                booking.bookingType === "custom"
                                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
                                  : "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300",
                              )}
                            >
                              {booking.bookingType === "custom"
                                ? "Custom"
                                : "Regular"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {booking.company || "Individual Client"} •{" "}
                            <span className="font-medium text-foreground/80">
                              {booking.selectedPackage?.name ||
                                "Standard Package"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold text-foreground">
                            {formatCurrency(
                              booking.selectedPackage?.price ?? 0,
                              "BDT",
                            )}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyDataState
                  message="No recent bookings found"
                  icon={ShoppingBag}
                />
              )}
            </CardContent>
          </Card>

          {/* Recent Influencer Bookings Card */}
          <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
            <CardHeader className="border-b border-border/60 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <UserCheck className="h-5 w-5 text-amber-500" />
                    Recent Influencer Bookings
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    Latest collaborations with creators and brand
                    ambassadors
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-semibold"
                >
                  {recentInfluencerBookings.length} Recorded
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {recentInfluencerBookings &&
              recentInfluencerBookings.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {recentInfluencerBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 shrink-0 border border-border/60">
                          {booking.influencer?.image ? (
                            <AvatarImage
                              src={booking.influencer.image}
                              alt={
                                booking.influencer.name ||
                                "Influencer"
                              }
                              className="object-cover"
                            />
                          ) : null}
                          <AvatarFallback className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs">
                            {booking.influencer?.name
                              ? booking.influencer.name
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "IN"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {booking.influencer?.name || "Influencer"}
                            <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                              (
                              {booking.influencer?.designation ||
                                "Creator"}
                              )
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            Client:{" "}
                            <span className="text-foreground/80 font-medium">
                              {booking.name}
                            </span>
                            {booking.company
                              ? ` • ${booking.company}`
                              : ""}
                            {booking.duration
                              ? ` • Duration: ${booking.duration}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold text-foreground">
                            {formatCurrency(
                              booking.price ?? 0,
                              "BDT",
                            )}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyDataState
                  message="No recent influencer bookings recorded"
                  icon={UserCheck}
                />
              )}
            </CardContent>
          </Card>

          {/* Bottom Grid: Recent Users & Recent Applications (2 Columns) */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Users Card */}
            <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                      <UserCircle className="h-4 w-4 text-violet-500" />
                      Recent Registered Users
                    </CardTitle>
                    <CardDescription className="mt-0.5 text-xs">
                      Newly registered client and team accounts
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold"
                  >
                    {recentUsers.length} Users
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                {recentUsers && recentUsers.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {recentUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar className="h-9 w-9 shrink-0 border border-border/60">
                            {user.image ? (
                              <AvatarImage
                                src={user.image}
                                alt={user.name}
                              />
                            ) : null}
                            <AvatarFallback className="bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 font-bold text-xs">
                              {user.name
                                ? user.name.slice(0, 2).toUpperCase()
                                : "US"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Badge
                            variant={
                              user.role === "admin"
                                ? "default"
                                : "secondary"
                            }
                            className={cn(
                              "rounded-full text-[10px] font-semibold px-2 py-0.5 capitalize",
                              user.role === "admin"
                                ? "bg-indigo text-white"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {user.role || "User"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyDataState
                    message="No recently registered users"
                    icon={UserCircle}
                  />
                )}
              </CardContent>
            </Card>

            {/* Recent Job Applications Card */}
            <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                      <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Recent Job Applications
                    </CardTitle>
                    <CardDescription className="mt-0.5 text-xs">
                      Latest candidates and submitted resumes
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold"
                  >
                    {recentApplications.length} Applicants
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                {recentApplications &&
                recentApplications.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {recentApplications.map((app) => (
                      <div
                        key={app._id}
                        className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate">
                              {app.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              <span className="font-medium text-foreground/80">
                                {app.jobTitle}
                              </span>{" "}
                              • Expected:{" "}
                              {formatCurrency(
                                app.expectedSalary ?? 0,
                                "BDT",
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {app.resumeLink ? (
                            <Button
                              variant="outline"
                              size="xs"
                              asChild
                              className="gap-1 rounded-lg text-xs font-medium border-border/70 hover:border-indigo/40 hover:bg-indigo/[0.04] hover:text-indigo"
                            >
                              <a
                                href={app.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>Resume</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">
                              {formatDate(app.createdAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyDataState
                    message="No recent job applications received"
                    icon={FileText}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
