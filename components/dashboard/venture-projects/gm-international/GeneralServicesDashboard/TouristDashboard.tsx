"use client";

import {
  MapPin,
  Package,
  Plane,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TouristDashboard as TouristDashboardType,
} from "@/types";

import {
  formatCurrency,
  formatDate,
} from "@/utils";

import ActivityRow from "./ActivityRow";
import EmptyState from "./EmptyState";
import MiniStat from "./MiniStat";
import RecentCard from "./RecentCard";

import OverviewCard from "./OverviewCard";
import MonthlyActivity from "./MonthlyActivity";

export default function TouristDashboard({
  data,
}: {
  data: TouristDashboardType;
}) {
  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Bookings"
          value={
            data.documentCount?.totalBookings ?? 0
          }
          description="Total tourism bookings"
          icon={<Plane />}
          className="border-cyan-100 bg-cyan-50/40"
          iconClassName="bg-cyan-100 text-cyan-600"
        />

        <OverviewCard
          title="Packages"
          value={
            data.documentCount?.totalTourPackages ??
            0
          }
          description="Available tour packages"
          icon={<Package />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="International"
          value={
            data.documentCount
              ?.totalInternationalBookings ?? 0
          }
          description="International bookings"
          icon={<Plane />}
          className="border-violet-100 bg-violet-50/40"
          iconClassName="bg-violet-100 text-violet-600"
        />

        <OverviewCard
          title="Domestic"
          value={
            data.documentCount
              ?.totalDomesticBookings ?? 0
          }
          description="Domestic bookings"
          icon={<MapPin />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />
      </section>

      {/* Tourism overview */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                <Plane className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>
                  Tourism overview
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Domestic and international
                  tourism activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <MiniStat
                label="Bookings"
                value={
                  data.documentCount
                    ?.totalBookings ?? 0
                }
              />

              <MiniStat
                label="Tour packages"
                value={
                  data.documentCount
                    ?.totalTourPackages ?? 0
                }
              />

              <MiniStat
                label="Custom packages"
                value={
                  data.documentCount
                    ?.totalCustomPackage ?? 0
                }
              />

              <MiniStat
                label="International"
                value={
                  data.documentCount
                    ?.totalInternationalBookings ??
                  0
                }
              />

              <MiniStat
                label="Domestic"
                value={
                  data.documentCount
                    ?.totalDomesticBookings ?? 0
                }
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-600">
                  International revenue
                </p>

                <p className="mt-1 text-lg font-bold text-blue-800">
                  {formatCurrency(
                    data.internationalVsDomestic
                      ?.internationalRevenue ?? 0,
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-medium text-emerald-600">
                  Domestic revenue
                </p>

                <p className="mt-1 text-lg font-bold text-emerald-800">
                  {formatCurrency(
                    data.internationalVsDomestic
                      ?.domesticRevenue ?? 0,
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Top tour packages
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Most frequently booked packages.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {(data.topPackages ?? []).length >
            0 ? (
              data.topPackages.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-cyan-100 bg-cyan-50/40 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                      <Package className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {item._id}
                    </span>
                  </div>

                  <span className="font-bold text-cyan-700">
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState text="No package data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent */}

      <RecentCard
        title="Recent tourist bookings"
        icon={<Plane />}
        color="cyan"
      >
        {(data.recentBookings ?? []).length >
        0 ? (
          data.recentBookings.map((item) => (
            <ActivityRow
              key={item._id}
              name={item.fullName}
              description={
                item.packageInfo?.packageName ??
                item.packageInfo?.title ??
                "Tour package"
              }
              date={formatDate(item.createdAt)}
              badges={[
                item.location?.country ??
                  "Unknown",
              ]}
            />
          ))
        ) : (
          <EmptyState text="No recent bookings." />
        )}
      </RecentCard>

      {/* Monthly */}

      <MonthlyActivity
        items={data.monthlyTrend ?? []}
        service="Tourist"
      />
    </div>
  );
}