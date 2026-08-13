"use client";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Users,
  UserRound,
  XCircle,
} from "lucide-react";

import { useFetch } from "@/hooks/api/useFetch";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type DashboardSummary = {
  documentCount: {
    totalBookings: number;

    applications: {
      pending: number;
      approved: number;
      rejected: number;
    };

    payment: {
      pending: number;
      partial: number;
      paid: number;
    };
  };

  genderStats: {
    gender: string;
    count: number;
  }[];

  recentBookings: {
    _id: string;

    applicantInfo: {
      fullName: string;
      gender: string;
      phone: string;
      email: string;
    };

    travelInfo: {
      packageType: string;
    };

    payment: {
      paymentStatus: string;
    };

    pkgInfo: {
      pkgName: string;
    };

    createdAt: string;
    applicationStatus: string;
  }[];

  topPackages: {
    _id: string;
    count: number;
    totalRevenue: number;
  }[];

  monthlyTrend: {
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }[];

  summary: {
    totalRevenue: number;
  };
};

const API_URL =
  "https://gm-group-backend.vercel.app/api/v1/gm-int/get-ummrah-hajj-dashboard-summary";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusVariant(
  status: string,
): "default" | "secondary" | "destructive" {
  if (status === "approved" || status === "paid") {
    return "default";
  }

  if (status === "rejected") {
    return "destructive";
  }

  return "secondary";
}

export function UmrahHajjDashboard() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFetch<DashboardSummary>(API_URL);

  if (isLoading) {
    return (
      <div className="space-y-8 p-6 lg:p-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            GM Group
          </p>

          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Umrah & Hajj
          </h1>

          <p className="mt-2 text-muted-foreground">
            Overview of Umrah and Hajj bookings.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-display text-xl font-bold">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading the Umrah & Hajj
            statistics.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const applications =
    data.documentCount.applications;

  const payment =
    data.documentCount.payment;

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
          Overview of bookings, applications, payments, and
          package performance.
        </p>
      </div>

      {/* Main stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Total bookings
            </CardTitle>

            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {data.documentCount.totalBookings}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Total registered bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Revenue
            </CardTitle>

            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(
                data.summary.totalRevenue,
              )}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Total package revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Pending applications
            </CardTitle>

            <Clock3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {applications.pending}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium">
              Paid bookings
            </CardTitle>

            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {payment.paid}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Fully paid bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application + payment status */}
      <div className="grid gap-6 lg:grid-cols-2">
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
            />

            <StatusRow
              label="Approved"
              value={applications.approved}
              total={data.documentCount.totalBookings}
              icon={<CheckCircle2 />}
            />

            <StatusRow
              label="Rejected"
              value={applications.rejected}
              total={data.documentCount.totalBookings}
              icon={<XCircle />}
            />
          </CardContent>
        </Card>

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
            />

            <StatusRow
              label="Partial"
              value={payment.partial}
              total={data.documentCount.totalBookings}
              icon={<CreditCard />}
            />

            <StatusRow
              label="Paid"
              value={payment.paid}
              total={data.documentCount.totalBookings}
              icon={<CheckCircle2 />}
            />
          </CardContent>
        </Card>
      </div>

      {/* Gender + packages */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gender distribution</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {data.genderStats.map((item) => (
                <div
                  key={item.gender}
                  className="rounded-2xl border bg-muted/20 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top packages</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {data.topPackages.map((packageItem) => (
              <div
                key={packageItem._id}
                className="flex items-center justify-between gap-4 rounded-2xl border p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {packageItem._id}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {packageItem.count} bookings
                  </p>
                </div>

                <p className="shrink-0 font-semibold">
                  {formatCurrency(
                    packageItem.totalRevenue,
                  )}
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
          <div className="space-y-4">
            {data.monthlyTrend.map((item) => {
              const max =
                Math.max(
                  ...data.monthlyTrend.map(
                    (trend) => trend.count,
                  ),
                ) || 1;

              const width =
                (item.count / max) * 100;

              return (
                <div
                  key={`${item._id.year}-${item._id.month}`}
                >
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {new Intl.DateTimeFormat(
                        "en",
                        {
                          month: "long",
                          year: "numeric",
                        },
                      ).format(
                        new Date(
                          item._id.year,
                          item._id.month - 1,
                        ),
                      )}
                    </span>

                    <span className="font-medium">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-ink transition-all"
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
                className="flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
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

                <div className="flex items-center gap-2">
                  <Badge
                    variant={statusVariant(
                      booking.applicationStatus,
                    )}
                  >
                    {formatStatus(
                      booking.applicationStatus,
                    )}
                  </Badge>

                  <Badge variant="secondary">
                    {formatStatus(
                      booking.payment.paymentStatus,
                    )}
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

function StatusRow({
  label,
  value,
  total,
  icon,
}: {
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>

          <span className="text-sm font-medium">
            {label}
          </span>
        </div>

        <span className="text-sm font-semibold">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-ink transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-1 text-right text-xs text-muted-foreground">
        {percentage}%
      </p>
    </div>
  );
}