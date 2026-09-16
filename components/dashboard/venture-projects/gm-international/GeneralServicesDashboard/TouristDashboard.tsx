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
          className="from-cyan-[0.04]"
          iconClassName="bg-cyan-100/80 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400"
        />

        <OverviewCard
          title="Packages"
          value={
            data.documentCount?.totalTourPackages ??
            0
          }
          description="Available tour packages"
          icon={<Package />}
          className="from-blue-[0.04]"
          iconClassName="bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
        />

        <OverviewCard
          title="International"
          value={
            data.documentCount
              ?.totalInternationalBookings ?? 0
          }
          description="International bookings"
          icon={<Plane />}
          className="from-violet-[0.04]"
          iconClassName="bg-violet-100/80 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
        />

        <OverviewCard
          title="Domestic"
          value={
            data.documentCount
              ?.totalDomesticBookings ?? 0
          }
          description="Domestic bookings"
          icon={<MapPin />}
          className="from-emerald-[0.04]"
          iconClassName="bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
        />
      </section>

      {/* Tourism overview */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100/80 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400">
                <Plane className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-base font-bold">
                  Tourism overview
                </CardTitle>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Domestic and international
                  tourism activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5">
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
              <div className="rounded-xl border border-border/60 bg-blue-50/40 dark:bg-blue-950/20 p-3.5 transition-all hover:bg-blue-50/60 dark:hover:bg-blue-950/30">
                <p className="text-xs font-semibold text-muted-foreground">
                  International revenue
                </p>

                <p className="mt-2 text-base sm:text-lg font-bold text-foreground">
                  {formatCurrency(
                    data.internationalVsDomestic
                      ?.internationalRevenue ?? 0,
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 transition-all hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30">
                <p className="text-xs font-semibold text-muted-foreground">
                  Domestic revenue
                </p>

                <p className="mt-2 text-base sm:text-lg font-bold text-foreground">
                  {formatCurrency(
                    data.internationalVsDomestic
                      ?.domesticRevenue ?? 0,
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-bold">
              Top tour packages
            </CardTitle>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Most frequently booked packages.
            </p>
          </CardHeader>

          <CardContent className="p-5 space-y-3">
            {(data.topPackages ?? []).length >
            0 ? (
              data.topPackages.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-cyan-50/40 dark:bg-cyan-950/20 px-3.5 py-3 transition-all hover:bg-cyan-50/60 dark:hover:bg-cyan-950/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100/80 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400">
                      <Package className="h-4 w-4" />
                    </div>

                    <span className="truncate text-xs sm:text-sm font-semibold text-foreground">
                      {item._id}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
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