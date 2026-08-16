"use client";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Package,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import { useFetch } from "@/hooks/api/useFetch";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardSummary } from "@/types";
import { formatCurrency, formatDate } from "@/utils";
import { UmrahHajjDashboardError } from "./UmrahHajjDashboardError";
import { UmrahHajjDashboardLoader } from "./UmrahHajjDashboardLoader";

import { API_ENDPOINTS } from "@/config/api/api";
import StatusRow from "./StatusRow";

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "approved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "rejected":
      return "border-red-200 bg-red-50 text-red-700";

    case "paid":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "partial":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-muted bg-muted text-muted-foreground";
  }
}

export default function UmrahHajjDashboard() {
  const { data, isLoading, isError, refetch } =
    useFetch<DashboardSummary>(
      API_ENDPOINTS.gmInternational.umrahHajjDashboard,
    );

  if (isLoading) {
    return <UmrahHajjDashboardLoader />;
  }

  if (isError || !data) {
    return <UmrahHajjDashboardError onRetry={refetch} />;
  }

  const applications = data.documentCount.applications;
  const payment = data.documentCount.payment;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          GM Group
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          Umrah & Hajj
        </h1>

        <p className="mt-2 text-muted-foreground">
          Overview of bookings, applications, payments, and package
          performance.
        </p>
      </div>

      {/* Main stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total bookings */}
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/80 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total bookings
            </CardTitle>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-blue-950">
              {data.documentCount.totalBookings}
            </p>

            <p className="mt-1 text-xs text-blue-700/70">
              Total registered bookings
            </p>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700">
              Revenue
            </CardTitle>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-emerald-950">
              {formatCurrency(data.summary.totalRevenue)}
            </p>

            <p className="mt-1 text-xs text-emerald-700/70">
              Total package revenue
            </p>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="border-amber-100 bg-gradient-to-br from-amber-50/80 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-amber-700">
              Pending applications
            </CardTitle>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock3 className="h-5 w-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-amber-950">
              {applications.pending}
            </p>

            <p className="mt-1 text-xs text-amber-700/70">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        {/* Paid */}
        <Card className="border-violet-100 bg-gradient-to-br from-violet-50/80 to-background">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-violet-700">
              Paid bookings
            </CardTitle>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-violet-950">
              {payment.paid}
            </p>

            <p className="mt-1 text-xs text-violet-700/70">
              Fully paid bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application + payment status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application status */}
        <Card>
          <CardHeader>
            <CardTitle>Application status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <StatusRow
              label="Pending"
              value={applications.pending}
              total={data.documentCount.totalBookings}
              icon={<Clock3 />}
              iconClassName="bg-amber-100 text-amber-600"
              barClassName="bg-amber-500"
            />

            <StatusRow
              label="Approved"
              value={applications.approved}
              total={data.documentCount.totalBookings}
              icon={<CheckCircle2 />}
              iconClassName="bg-emerald-100 text-emerald-600"
              barClassName="bg-emerald-500"
            />

            <StatusRow
              label="Rejected"
              value={applications.rejected}
              total={data.documentCount.totalBookings}
              icon={<XCircle />}
              iconClassName="bg-red-100 text-red-600"
              barClassName="bg-red-500"
            />
          </CardContent>
        </Card>

        {/* Payment status */}
        <Card>
          <CardHeader>
            <CardTitle>Payment status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <StatusRow
              label="Pending"
              value={payment.pending}
              total={data.documentCount.totalBookings}
              icon={<Clock3 />}
              iconClassName="bg-amber-100 text-amber-600"
              barClassName="bg-amber-500"
            />

            <StatusRow
              label="Partial"
              value={payment.partial}
              total={data.documentCount.totalBookings}
              icon={<CreditCard />}
              iconClassName="bg-blue-100 text-blue-600"
              barClassName="bg-blue-500"
            />

            <StatusRow
              label="Paid"
              value={payment.paid}
              total={data.documentCount.totalBookings}
              icon={<CheckCircle2 />}
              iconClassName="bg-emerald-100 text-emerald-600"
              barClassName="bg-emerald-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Gender + packages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gender distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender distribution</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {data.genderStats.map((item) => {
                const isMale = item.gender.toLowerCase() === "male";

                return (
                  <div
                    key={item.gender}
                    className={
                      isMale
                        ? "rounded-2xl border border-blue-100 bg-blue-50/50 p-5"
                        : "rounded-2xl border border-rose-100 bg-rose-50/50 p-5"
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          isMale
                            ? "flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600"
                            : "flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600"
                        }
                      >
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm capitalize text-muted-foreground">
                          {item.gender}
                        </p>

                        <p className="text-2xl font-bold">
                          {item.count}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top packages */}
        <Card>
          <CardHeader>
            <CardTitle>Top packages</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {data.topPackages.map((packageItem) => (
              <div
                key={packageItem._id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-teal-100 bg-teal-50/40 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                    <Package className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {packageItem._id}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {packageItem.count} bookings
                    </p>
                  </div>
                </div>

                <p className="shrink-0 font-semibold text-teal-700">
                  {formatCurrency(packageItem.totalRevenue)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly bookings</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {data.monthlyTrend.map((item) => {
              const max =
                Math.max(
                  ...data.monthlyTrend.map((trend) => trend.count),
                ) || 1;

              const width = (item.count / max) * 100;

              return (
                <div key={`${item._id.year}-${item._id.month}`}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      {new Intl.DateTimeFormat("en", {
                        month: "long",
                        year: "numeric",
                      }).format(
                        new Date(item._id.year, item._id.month - 1),
                      )}
                    </span>

                    <span className="font-semibold text-indigo-700">
                      {item.count} bookings
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-indigo-50">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                      style={{
                        width: `${width}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent bookings</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {data.recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col gap-3 rounded-2xl border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium">
                      {booking.applicantInfo.fullName}
                    </p>

                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {booking.pkgInfo.pkgName}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={statusBadgeClass(
                      booking.applicationStatus,
                    )}
                  >
                    {formatStatus(booking.applicationStatus)}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={statusBadgeClass(
                      booking.payment.paymentStatus,
                    )}
                  >
                    {formatStatus(booking.payment.paymentStatus)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
