"use client";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  GraduationCap,
  HeartPulse,
  Plane,
  TrendingDown,
  UserRound,
  Users,
} from "lucide-react";

import { useFetch } from "@/hooks/api/useFetch";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AccountAnalysisDashboardError } from "./AccountAnalysisDashboardError";
import { AccountAnalysisDashboardLoader } from "./AccountAnalysisDashboardLoader";

import { Badge } from "@/components/ui/badge";
import { AccountDashboardResponse } from "@/types";
import { formatCurrency, formatNumber } from "@/utils";

import { API_ENDPOINTS } from "@/config/api/api";

function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1));
}

function serviceIcon(service: string) {
  switch (service) {
    case "student":
      return GraduationCap;

    case "medical":
      return HeartPulse;

    case "tourist":
      return Plane;

    case "business":
      return BriefcaseBusiness;

    case "visa":
      return FileText;

    default:
      return FileText;
  }
}

function serviceColors(service: string) {
  switch (service) {
    case "student":
      return {
        card: "border-blue-100 bg-blue-50/50",
        icon: "bg-blue-100 text-blue-600",
        value: "text-blue-700",
        bar: "bg-blue-500",
      };

    case "medical":
      return {
        card: "border-rose-100 bg-rose-50/50",
        icon: "bg-rose-100 text-rose-600",
        value: "text-rose-700",
        bar: "bg-rose-500",
      };

    case "tourist":
      return {
        card: "border-cyan-100 bg-cyan-50/50",
        icon: "bg-cyan-100 text-cyan-600",
        value: "text-cyan-700",
        bar: "bg-cyan-500",
      };

    case "business":
      return {
        card: "border-violet-100 bg-violet-50/50",
        icon: "bg-violet-100 text-violet-600",
        value: "text-violet-700",
        bar: "bg-violet-500",
      };

    case "visa":
      return {
        card: "border-amber-100 bg-amber-50/50",
        icon: "bg-amber-100 text-amber-600",
        value: "text-amber-700",
        bar: "bg-amber-500",
      };

    default:
      return {
        card: "border-slate-100 bg-slate-50/50",
        icon: "bg-slate-100 text-slate-600",
        value: "text-slate-700",
        bar: "bg-slate-500",
      };
  }
}

export function AccountAnalysisDashboard({
  email,
}: {
  email: string;
}) {
  const API_URL = `${API_ENDPOINTS.gmInternational.accountAnalysisDashboard}/${encodeURIComponent(
    email,
  )}`;

  const { data, isLoading, isError, refetch } =
    useFetch<AccountDashboardResponse>(API_URL);

  if (isLoading) {
    return <AccountAnalysisDashboardLoader />;
  }

  if (isError || !data?.success || !data.data) {
    return (
      <AccountAnalysisDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const dashboard = data.data;

  const {
    overview,
    serviceWise,
    monthlyTrend,
    accountHolderStats,
    branchStats,
    dueAnalysis,
    missingDocsAnalysis,
    documentCount,
  } = dashboard;

  const totalAmount = overview.totalAmount || 0;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          GM Group
        </p>

        <div className="mt-1 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Account Analysis
            </h1>

            <p className="mt-2 text-muted-foreground">
              Financial and operational overview for this account.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-700"
          >
            <UserRound className="mr-1.5 h-3.5 w-3.5" />
            {email}
          </Badge>
        </div>
      </div>

      {/* Financial overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total amount"
          value={formatCurrency(overview.totalAmount)}
          description="Total transaction value"
          icon={<CreditCard className="h-5 w-5" />}
          cardClassName="border-blue-100 bg-gradient-to-br from-blue-50/80 to-background"
          iconClassName="bg-blue-100 text-blue-600"
          valueClassName="text-blue-950"
          descriptionClassName="text-blue-700/70"
        />

        <StatCard
          title="Total advance"
          value={formatCurrency(overview.totalAdvance)}
          description="Amount received"
          icon={<CheckCircle2 className="h-5 w-5" />}
          cardClassName="border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-background"
          iconClassName="bg-emerald-100 text-emerald-600"
          valueClassName="text-emerald-950"
          descriptionClassName="text-emerald-700/70"
        />

        <StatCard
          title="Total due"
          value={formatCurrency(overview.totalDue)}
          description="Outstanding amount"
          icon={<TrendingDown className="h-5 w-5" />}
          cardClassName="border-red-100 bg-gradient-to-br from-red-50/80 to-background"
          iconClassName="bg-red-100 text-red-600"
          valueClassName="text-red-950"
          descriptionClassName="text-red-700/70"
        />

        <StatCard
          title="Total records"
          value={formatNumber(documentCount.totalCounts.totalRecords)}
          description="Total account records"
          icon={<FileText className="h-5 w-5" />}
          cardClassName="border-violet-100 bg-gradient-to-br from-violet-50/80 to-background"
          iconClassName="bg-violet-100 text-violet-600"
          valueClassName="text-violet-950"
          descriptionClassName="text-violet-700/70"
        />
      </div>

      {/* Due analysis */}
      <Card className="overflow-hidden border-amber-100">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-background">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Due analysis</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Outstanding amount compared with total account value.
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <TrendingDown className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">Due ratio</span>

                <span className="text-lg font-bold text-amber-700">
                  {dueAnalysis.dueRatio.toFixed(1)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-amber-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{
                    width: `${Math.min(dueAnalysis.dueRatio, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-red-600">
                Total due
              </p>

              <p className="mt-1 text-xl font-bold text-red-800">
                {formatCurrency(dueAnalysis.totalDue)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service wise */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Service breakdown</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Financial performance by service category.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {Object.entries(serviceWise).map(([service, stats]) => {
              const Icon = serviceIcon(service);
              const colors = serviceColors(service);

              const percentage =
                totalAmount > 0
                  ? (stats.total / totalAmount) * 100
                  : 0;

              return (
                <div
                  key={service}
                  className={`rounded-2xl border p-5 ${colors.card}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`text-xs font-semibold ${colors.value}`}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-medium capitalize text-muted-foreground">
                    {service}
                  </p>

                  <p
                    className={`mt-1 text-xl font-bold ${colors.value}`}
                  >
                    {formatCurrency(stats.total)}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Advance
                      </span>

                      <span className="font-medium">
                        {formatCurrency(stats.advance)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Due
                      </span>

                      <span className="font-medium">
                        {formatCurrency(stats.due)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/80">
                    <div
                      className={`h-full rounded-full ${colors.bar}`}
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly trend */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Monthly financial trend</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Monthly total, advance, and outstanding amounts.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {monthlyTrend.map((item) => {
              const max =
                Math.max(
                  ...monthlyTrend.map((trend) => trend.total),
                ) || 1;

              const totalWidth = (item.total / max) * 100;

              const advanceWidth = (item.advance / max) * 100;

              const dueWidth = (item.due / max) * 100;

              return (
                <div key={item.month}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-medium">
                      {formatMonth(item.month)}
                    </span>

                    <span className="text-sm font-semibold text-blue-700">
                      {formatCurrency(item.total)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <TrendBar
                      label="Total"
                      value={item.total}
                      width={totalWidth}
                      color="bg-blue-500"
                    />

                    <TrendBar
                      label="Advance"
                      value={item.advance}
                      width={advanceWidth}
                      color="bg-emerald-500"
                    />

                    <TrendBar
                      label="Due"
                      value={item.due}
                      width={dueWidth}
                      color="bg-red-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Branch + account holders */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Branch stats */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Branch performance</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Financial breakdown by branch.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {branchStats.map((branch) => (
              <div
                key={branch.branch}
                className="rounded-2xl border border-cyan-100 bg-cyan-50/40 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{branch.branch}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Total business
                    </p>
                  </div>

                  <p className="font-bold text-cyan-700">
                    {formatCurrency(branch.total)}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MiniMetric
                    label="Advance"
                    value={formatCurrency(branch.advance)}
                    className="bg-emerald-50 text-emerald-700"
                  />

                  <MiniMetric
                    label="Due"
                    value={formatCurrency(branch.due)}
                    className="bg-red-50 text-red-700"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account holder stats */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Account holders</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Financial contribution by account.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {accountHolderStats.map((account) => (
              <div
                key={account.email}
                className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4"
              >
                <p className="truncate text-sm font-medium">
                  {account.email}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniMetric
                    label="Total"
                    value={formatCurrency(account.total)}
                    className="bg-blue-50 text-blue-700"
                  />

                  <MiniMetric
                    label="Advance"
                    value={formatCurrency(account.advance)}
                    className="bg-emerald-50 text-emerald-700"
                  />

                  <MiniMetric
                    label="Due"
                    value={formatCurrency(account.due)}
                    className="bg-red-50 text-red-700"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Record counts */}
      <Card>
        <CardHeader>
          <CardTitle>Record distribution</CardTitle>

          <p className="text-sm text-muted-foreground">
            Number of records by service and branch.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold">By service</p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <CountCard
                  label="Student"
                  count={documentCount.totalCounts.student}
                  className="border-blue-100 bg-blue-50 text-blue-700"
                />

                <CountCard
                  label="Medical"
                  count={documentCount.totalCounts.medical}
                  className="border-rose-100 bg-rose-50 text-rose-700"
                />

                <CountCard
                  label="Tourist"
                  count={documentCount.totalCounts.tourist}
                  className="border-cyan-100 bg-cyan-50 text-cyan-700"
                />

                <CountCard
                  label="Business"
                  count={documentCount.totalCounts.business}
                  className="border-violet-100 bg-violet-50 text-violet-700"
                />

                <CountCard
                  label="Visa"
                  count={documentCount.totalCounts.visa}
                  className="border-amber-100 bg-amber-50 text-amber-700"
                />

                <CountCard
                  label="Total"
                  count={documentCount.totalCounts.totalRecords}
                  className="border-slate-200 bg-slate-50 text-slate-700"
                />
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold">By branch</p>

              <div className="space-y-3">
                {documentCount.branchCounts.map((branch) => (
                  <div
                    key={branch.branch}
                    className="flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                        <Building2 className="h-4 w-4" />
                      </div>

                      <span className="text-sm font-medium">
                        {branch.branch}
                      </span>
                    </div>

                    <span className="font-bold text-cyan-700">
                      {branch.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missing documents */}
      <Card
        className={
          missingDocsAnalysis.totalMissingAccounts > 0
            ? "border-red-100"
            : "border-emerald-100"
        }
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={
                missingDocsAnalysis.totalMissingAccounts > 0
                  ? "flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600"
                  : "flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"
              }
            >
              {missingDocsAnalysis.totalMissingAccounts > 0 ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
            </div>

            <div>
              <CardTitle>Missing documents</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Document completeness status.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {missingDocsAnalysis.totalMissingAccounts === 0 ? (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="font-medium text-emerald-800">
                All documents are complete
              </p>

              <p className="mt-1 text-sm text-emerald-700/80">
                No accounts currently have missing documents.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-red-700">
                {missingDocsAnalysis.totalMissingAccounts} accounts
                have missing documents.
              </p>

              {missingDocsAnalysis.documents.map((document) => (
                <div
                  key={document}
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {document}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  cardClassName,
  iconClassName,
  valueClassName,
  descriptionClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  cardClassName: string;
  iconClassName: string;
  valueClassName: string;
  descriptionClassName: string;
}) {
  return (
    <Card className={cardClassName}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <p className={`text-2xl font-bold ${valueClassName}`}>
          {value}
        </p>

        <p className={`mt-1 text-xs ${descriptionClassName}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function TrendBar({
  label,
  value,
  width,
  color,
}: {
  label: string;
  value: number;
  width: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-xs text-muted-foreground">
        {label}
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${Math.min(width, 100)}%`,
          }}
        />
      </div>

      <span className="w-28 text-right text-xs font-medium">
        {formatCurrency(value)}
      </span>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className={`rounded-xl px-3 py-2 ${className}`}>
      <p className="text-[10px] font-medium uppercase tracking-wide opacity-70">
        {label}
      </p>

      <p className="mt-0.5 truncate text-xs font-bold">{value}</p>
    </div>
  );
}

function CountCard({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <p className="text-xs font-medium opacity-70">{label}</p>

      <p className="mt-1 text-2xl font-bold">{formatNumber(count)}</p>
    </div>
  );
}
