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
import {
  GMLogisticDashboardResponse,
  GMLogisticRecentUser,
} from "@/types";
import {
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Globe,
  RefreshCw,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  calculatePercentage,
  formatDate,
  formatNumber,
  formatPercentage,
} from "../utils";
import EmptyUsersState from "./EmptyUsersState";
import GMLogisticDashboardError from "./GMLogisticDashboardError";
import GMLogisticDashboardLoader from "./GMLogisticDashboardLoader";
import ProgressTrack from "./ProgressTrack";

function initials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function GMLogisticDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading, isError, refetch } =
    useFetch<GMLogisticDashboardResponse>(
      API_ENDPOINTS.gmLogistic.dashboard,
    );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const gmLogistic = dashboardVentures.find(
    (v) => v.name === "GM Logistic",
  );

  if (isLoading) return <GMLogisticDashboardLoader />;

  if (isError || !data?.success || !data.data) {
    return (
      <GMLogisticDashboardError
        message={data?.message}
        onRetry={refetch}
      />
    );
  }

  console.log(data);

  const stats = data.data;
  const users = stats.users;
  const countries = stats.countries;
  const categories = stats.categories;
  const pricing = stats.pricing;
  const recentUsers: GMLogisticRecentUser[] = stats.recentUsers ?? [];

  const totalUsers = users?.totalUsers ?? 0;
  const totalAdmins = users?.totalAdmins ?? 0;
  const totalBannedUsers = users?.totalBannedUsers ?? 0;

  const totalCountries = countries?.totalCountries ?? 0;
  const activeCountries = countries?.activeCountries ?? 0;
  const inactiveCountries = Math.max(
    0,
    totalCountries - activeCountries,
  );

  const totalCategories = categories?.totalCategories ?? 0;
  const activeCategories = categories?.activeCategories ?? 0;
  const inactiveCategories = Math.max(
    0,
    totalCategories - activeCategories,
  );

  const totalPricingRecords = pricing?.totalPricingRecords ?? 0;
  const configuredPricingRecords =
    pricing?.configuredPricingRecords ?? 0;
  const pendingPricingRecords = pricing?.pendingPricingRecords ?? 0;
  const apiCompletion = pricing?.pricingCompletionPercentage ?? 0;
  const actualCompletion = calculatePercentage(
    configuredPricingRecords,
    totalPricingRecords,
  );
  const configuredShare = calculatePercentage(
    configuredPricingRecords,
    totalPricingRecords,
  );
  const pendingShare = calculatePercentage(
    pendingPricingRecords,
    totalPricingRecords,
  );
  const countryActiveShare = calculatePercentage(
    activeCountries,
    totalCountries,
  );
  const categoryActiveShare = calculatePercentage(
    activeCategories,
    totalCategories,
  );
  const adminShare = calculatePercentage(totalAdmins, totalUsers);

  const kpiCards = [
    {
      title: "Total Users",
      value: formatNumber(totalUsers),
      description: "Registered accounts on the platform",
      detail: `${formatNumber(totalAdmins)} admins · ${formatNumber(totalBannedUsers)} banned`,
      icon: Users,
    },
    {
      title: "Active Countries",
      value: formatNumber(activeCountries),
      description: "Currently supported destinations",
      detail: `${formatNumber(totalCountries)} countries in catalog`,
      icon: Globe,
    },
    {
      title: "Total Categories",
      value: formatNumber(totalCategories),
      description: "Available product categories",
      detail: `${formatNumber(activeCategories)} currently active`,
      icon: Tag,
    },
    {
      title: "Pricing Completion",
      value: formatPercentage(apiCompletion),
      description: "Pricing configuration progress",
      detail: `${formatNumber(configuredPricingRecords)} of ${formatNumber(totalPricingRecords)} configured`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
      {gmLogistic && <VentureHeader selectedVenture={gmLogistic} />}

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl flex items-center gap-x-3">
            <span> GM Logistic Dashboard</span>{" "}
            <Badge
              variant="outline"
              className="hidden sm:inline-flex rounded-full border-indigo/30 bg-indigo/[0.06] text-indigo font-medium text-xs px-2.5 py-0.5"
            >
              Live Overview
            </Badge>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of users, coverage, catalog, and pricing
            configuration.
          </p>
        </div>

        <div className="flex items-center gap-3 sm:self-start">
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
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="rounded-2xl border-border/70 shadow-xs"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {card.description}
                    </p>
                    <p className="mt-2 truncate text-xs font-medium text-foreground/80">
                      {card.detail}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/[0.08] text-indigo">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pricing + system overview */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="rounded-2xl border-border/70 shadow-xs lg:col-span-8">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <CircleDollarSign className="h-5 w-5 text-indigo" />
              Pricing Configuration
            </CardTitle>
            <CardDescription>
              Current coverage of logistics pricing records. Most
              records still need configuration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Total records
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {formatNumber(totalPricingRecords)}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo" />
                  Configured
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {formatNumber(configuredPricingRecords)}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  Pending
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {formatNumber(pendingPricingRecords)}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Complete
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {formatPercentage(apiCompletion)}
                </p>
                {apiCompletion === 0 && actualCompletion > 0 && (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {actualCompletion.toFixed(2)}% by record count
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">
                  Configuration status
                </span>
                <span className="font-semibold text-foreground">
                  {formatNumber(configuredPricingRecords)} configured
                  · {formatNumber(pendingPricingRecords)} pending
                </span>
              </div>
              <div
                className="flex h-3 w-full overflow-hidden rounded-full bg-muted"
                role="img"
                aria-label={`Pricing configuration: ${formatNumber(configuredPricingRecords)} configured, ${formatNumber(pendingPricingRecords)} pending`}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${configuredShare}%`,
                    backgroundColor: "var(--color-indigo)",
                    minWidth:
                      configuredPricingRecords > 0 ? "2px" : 0,
                  }}
                />
                <div
                  className="h-full bg-border"
                  style={{ width: `${pendingShare}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo" />
                  Configured {configuredShare.toFixed(1)}%
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-border" />
                  Pending {pendingShare.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-xs lg:col-span-4">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">
              System Overview
            </CardTitle>
            <CardDescription>
              Configuration snapshot across the logistics platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Users</span>
                <span className="font-semibold">
                  {formatNumber(totalUsers)}
                </span>
              </div>
              <ProgressTrack value={adminShare} />
              <p className="text-[11px] text-muted-foreground">
                {formatNumber(totalAdmins)} of{" "}
                {formatNumber(totalUsers)} are admins
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Countries
                </span>
                <span className="font-semibold">
                  {formatNumber(activeCountries)} /{" "}
                  {formatNumber(totalCountries)}
                </span>
              </div>
              <ProgressTrack value={countryActiveShare} />
              <p className="text-[11px] text-muted-foreground">
                {formatNumber(inactiveCountries)} inactive
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Categories
                </span>
                <span className="font-semibold">
                  {formatNumber(activeCategories)} /{" "}
                  {formatNumber(totalCategories)}
                </span>
              </div>
              <ProgressTrack value={categoryActiveShare} />
              <p className="text-[11px] text-muted-foreground">
                {formatNumber(inactiveCategories)} inactive
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pricing</span>
                <span className="font-semibold">
                  {formatPercentage(apiCompletion)}
                </span>
              </div>
              <ProgressTrack value={actualCompletion} />
              <p className="text-[11px] text-muted-foreground">
                {formatNumber(pendingPricingRecords)} records still
                pending
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage overviews */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl border-border/70 shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Globe className="h-4 w-4 text-indigo" />
              Country Coverage
            </CardTitle>
            <CardDescription>
              Active versus total destination coverage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {formatNumber(activeCountries)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Active of {formatNumber(totalCountries)} total
                </p>
              </div>
              <Badge variant="outline" className="font-semibold">
                {countryActiveShare.toFixed(0)}% active
              </Badge>
            </div>
            <ProgressTrack value={countryActiveShare} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="mt-1 font-semibold">
                  {formatNumber(totalCountries)}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <p className="text-xs text-muted-foreground">
                  Inactive
                </p>
                <p className="mt-1 font-semibold">
                  {formatNumber(inactiveCountries)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Tag className="h-4 w-4 text-indigo" />
              Category Catalog
            </CardTitle>
            <CardDescription>
              Aggregate product category configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {formatNumber(totalCategories)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Total catalog entries
                </p>
              </div>
              <Badge variant="outline" className="font-semibold">
                {formatNumber(activeCategories)} active
              </Badge>
            </div>
            <ProgressTrack value={categoryActiveShare} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <p className="text-xs text-muted-foreground">
                  Active
                </p>
                <p className="mt-1 font-semibold">
                  {formatNumber(activeCategories)}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <p className="text-xs text-muted-foreground">
                  Inactive
                </p>
                <p className="mt-1 font-semibold">
                  {formatNumber(inactiveCategories)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Users className="h-4 w-4 text-indigo" />
              User Overview
            </CardTitle>
            <CardDescription>
              Registered accounts, admins, and banned users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-3 py-3">
              <span className="text-sm text-muted-foreground">
                Total users
              </span>
              <span className="text-base font-semibold">
                {formatNumber(totalUsers)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-3 py-3">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Admins
              </span>
              <span className="text-base font-semibold">
                {formatNumber(totalAdmins)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-3 py-3">
              <span className="text-sm text-muted-foreground">
                Banned users
              </span>
              <span className="text-base font-semibold">
                {formatNumber(totalBannedUsers)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent users */}
      <Card className="rounded-2xl border-border/70 shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold">
                Recent Users
              </CardTitle>
              <CardDescription>
                Latest accounts registered on the logistics platform
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-semibold">
              {formatNumber(recentUsers.length)} shown
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {recentUsers.length === 0 ? (
            <EmptyUsersState />
          ) : (
            <ul className="divide-y divide-border/50">
              {recentUsers.map((user) => {
                const role = (user.role || "user").toLowerCase();
                const isAdmin = role === "admin";

                return (
                  <li
                    key={user._id}
                    className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border/60">
                        {user.image ? (
                          <AvatarImage
                            src={user.image}
                            alt={user.name}
                          />
                        ) : null}
                        <AvatarFallback className="text-xs font-bold bg-indigo/[0.08] text-indigo">
                          {initials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                      <Badge
                        variant={isAdmin ? "default" : "secondary"}
                        className={cn(
                          "capitalize",
                          isAdmin
                            ? "bg-indigo border-transparent text-white"
                            : "",
                        )}
                      >
                        {role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
