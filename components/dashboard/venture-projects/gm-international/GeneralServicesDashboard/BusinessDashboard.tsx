"use client";

import {
  BriefcaseBusiness,
  MapPin,
  Package,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BusinessDashboard as BusinessDashboardType,
} from "@/types";

import { formatDate } from "@/utils";

import ActivityRow from "./ActivityRow";
import EmptyState from "./EmptyState";
import RecentCard from "./RecentCard";
import StatusRow from "./StatusRow";

import OverviewCard from "./OverviewCard";
import MonthlyActivity from "./MonthlyActivity";

export default function BusinessDashboard({
  data,
}: {
  data: BusinessDashboardType;
}) {
  const totalApplications =
    data.documentCount
      ?.totalBusinessApplications ?? 0;

  const totalDeals =
    data.documentCount
      ?.totalBusinessDeals ?? 0;

  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <OverviewCard
          title="Companies"
          value={
            data.documentCount?.totalCompanies ?? 0
          }
          description="Registered companies"
          icon={<BriefcaseBusiness />}
          className="from-violet-[0.04]"
          iconClassName="bg-violet-100/80 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
        />

        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Business applications"
          icon={<BriefcaseBusiness />}
          className="from-blue-[0.04]"
          iconClassName="bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
        />

        <OverviewCard
          title="Deals"
          value={totalDeals}
          description="Business deals"
          icon={<TrendingUp />}
          className="from-emerald-[0.04]"
          iconClassName="bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
        />

        <OverviewCard
          title="Packages"
          value={
            data.documentCount
              ?.totalBusinessPackages ?? 0
          }
          description="Business packages"
          icon={<Package />}
          className="from-amber-[0.04]"
          iconClassName="bg-amber-100/80 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
        />

        <OverviewCard
          title="Activity"
          value={
            data.summary
              ?.totalBusinessActivity ?? 0
          }
          description="Total business activity"
          icon={<TrendingUp />}
          className="from-cyan-[0.04]"
          iconClassName="bg-cyan-100/80 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400"
        />
      </section>

      {/* Application + Deal status */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100/80 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-base font-bold">
                  Business applications
                </CardTitle>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Current application status.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            <StatusRow
              label="Pending"
              value={
                data.documentCount
                  ?.applications?.pending ?? 0
              }
              total={totalApplications}
              color="bg-amber-500"
            />

            <StatusRow
              label="Approved"
              value={
                data.documentCount
                  ?.applications?.approved ?? 0
              }
              total={totalApplications}
              color="bg-emerald-500"
            />

            <StatusRow
              label="Rejected"
              value={
                data.documentCount
                  ?.applications?.rejected ?? 0
              }
              total={totalApplications}
              color="bg-red-500"
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">
              Business deals
            </CardTitle>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Current deal status.
            </p>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            <StatusRow
              label="Pending"
              value={
                data.documentCount
                  ?.deals?.pending ?? 0
              }
              total={totalDeals}
              color="bg-amber-500"
            />

            <StatusRow
              label="Approved"
              value={
                data.documentCount
                  ?.deals?.approved ?? 0
              }
              total={totalDeals}
              color="bg-emerald-500"
            />
          </CardContent>
        </Card>
      </section>

      {/* Top countries */}

      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-bold">
            Top business countries
          </CardTitle>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Countries generating the most business
            applications.
          </p>
        </CardHeader>

        <CardContent className="p-5 space-y-3">
          {(data.topCountries ?? []).length >
          0 ? (
            data.topCountries.map((country) => (
              <div
                key={country._id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-violet-50/40 dark:bg-violet-950/20 px-3.5 py-3 transition-all hover:bg-violet-50/60 dark:hover:bg-violet-950/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100/80 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {country._id}
                  </span>
                </div>

                <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                  {country.count}
                </span>
              </div>
            ))
          ) : (
            <EmptyState text="No country data available." />
          )}
        </CardContent>
      </Card>

      {/* Recent applications + deals */}

      <section className="grid gap-6 lg:grid-cols-2">
        <RecentCard
          title="Recent business applications"
          icon={<BriefcaseBusiness />}
          color="violet"
        >
          {(data.recentApplications ?? []).length >
          0 ? (
            data.recentApplications.map((item) => (
              <ActivityRow
                key={item._id}
                name={`${item.firstName} ${item.lastName}`}
                description={item.companyName}
                date={formatDate(item.createdAt)}
                badges={[
                  item.applicationStatus,
                  item.paymentStatus,
                ]}
              />
            ))
          ) : (
            <EmptyState text="No recent applications." />
          )}
        </RecentCard>

        <RecentCard
          title="Recent business deals"
          icon={<TrendingUp />}
          color="violet"
        >
          {(data.recentDeals ?? []).length >
          0 ? (
            data.recentDeals.map((item) => (
              <ActivityRow
                key={item._id}
                name={item.f_name}
                description={item.serviceTitle}
                date={formatDate(item.createdAt)}
                badges={[
                  item.applicationStatus,
                ]}
              />
            ))
          ) : (
            <EmptyState text="No recent deals." />
          )}
        </RecentCard>
      </section>

      {/* Monthly */}

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyActivity
          items={
            data.monthlyTrendApplications ??
            []
          }
          service="Applications"
        />

        <MonthlyActivity
          items={
            data.monthlyTrendDeals ??
            []
          }
          service="Deals"
        />
      </div>
    </div>
  );
}