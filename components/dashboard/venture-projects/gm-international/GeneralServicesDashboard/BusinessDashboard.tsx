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
          className="border-violet-100 bg-violet-50/40"
          iconClassName="bg-violet-100 text-violet-600"
        />

        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Business applications"
          icon={<BriefcaseBusiness />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="Deals"
          value={totalDeals}
          description="Business deals"
          icon={<TrendingUp />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <OverviewCard
          title="Packages"
          value={
            data.documentCount
              ?.totalBusinessPackages ?? 0
          }
          description="Business packages"
          icon={<Package />}
          className="border-amber-100 bg-amber-50/40"
          iconClassName="bg-amber-100 text-amber-600"
        />

        <OverviewCard
          title="Activity"
          value={
            data.summary
              ?.totalBusinessActivity ?? 0
          }
          description="Total business activity"
          icon={<TrendingUp />}
          className="border-cyan-100 bg-cyan-50/40"
          iconClassName="bg-cyan-100 text-cyan-600"
        />
      </section>

      {/* Application + Deal status */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Business applications
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Current application status.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
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

        <Card>
          <CardHeader>
            <CardTitle>
              Business deals
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Current deal status.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
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

      <Card>
        <CardHeader>
          <CardTitle>
            Top business countries
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Countries generating the most business
            applications.
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {(data.topCountries ?? []).length >
          0 ? (
            data.topCountries.map((country) => (
              <div
                key={country._id}
                className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <span className="text-sm font-medium">
                    {country._id}
                  </span>
                </div>

                <span className="font-bold text-violet-700">
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