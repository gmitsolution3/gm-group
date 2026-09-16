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
  ArrowUpRight,
  TrendingUp,
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
import { calculatePercentage, formatMonth, formatNumber } from "../../utils";
import { UmrahHajjDashboardError } from "./UmrahHajjDashboardError";
import { UmrahHajjDashboardLoader } from "./UmrahHajjDashboardLoader";
import { API_ENDPOINTS } from "@/config/api/api";
import StatusRow from "./StatusRow";
import { dashboardVentures } from "@/config/dashboard/ventures";
import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "approved":
    case "paid":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-950/30 dark:text-emerald-400";
    case "rejected":
      return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/30 dark:bg-rose-950/30 dark:text-rose-400";
    case "partial":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800/30 dark:bg-blue-950/30 dark:text-blue-400";
    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/30 dark:bg-amber-950/30 dark:text-amber-400";
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

  const gmInternational = dashboardVentures.find(
    (v) => v.name === "GM International",
  );

  const trendData = data.monthlyTrend.map(item => ({
    name: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
    month: formatMonth({ year: item._id.year, month: item._id.month }),
    bookings: item.count
  }));

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-8 p-6 sm:p-8 lg:p-10">
      {gmInternational && (
        <VentureHeader
          selectedVenture={gmInternational}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Umrah & Hajj Analytics
        </h1>
        <p className="mt-2 text-muted-foreground">
          Overview of bookings, applications, payments, and package performance.
        </p>
      </div>

      {/* Main stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Bookings", value: data.documentCount.totalBookings, icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
          { title: "Total Revenue", value: formatCurrency(data.summary.totalRevenue), icon: DollarSign, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { title: "Pending Apps", value: applications.pending, icon: Clock3, color: "text-amber-600 bg-amber-50 border-amber-100" },
          { title: "Paid Bookings", value: payment.paid, icon: CreditCard, color: "text-violet-600 bg-violet-50 border-violet-100" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-2xl border-border/70 bg-card shadow-xs">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 shadow-xs">
          <CardHeader><CardTitle>Application status</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <StatusRow label="Pending" value={applications.pending} total={data.documentCount.totalBookings} icon={<Clock3 />} iconClassName="bg-amber-100 text-amber-600" barClassName="bg-amber-500" />
            <StatusRow label="Approved" value={applications.approved} total={data.documentCount.totalBookings} icon={<CheckCircle2 />} iconClassName="bg-emerald-100 text-emerald-600" barClassName="bg-emerald-500" />
            <StatusRow label="Rejected" value={applications.rejected} total={data.documentCount.totalBookings} icon={<XCircle />} iconClassName="bg-rose-100 text-rose-600" barClassName="bg-rose-500" />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/70 shadow-xs">
          <CardHeader><CardTitle>Payment status</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <StatusRow label="Pending" value={payment.pending} total={data.documentCount.totalBookings} icon={<Clock3 />} iconClassName="bg-amber-100 text-amber-600" barClassName="bg-amber-500" />
            <StatusRow label="Partial" value={payment.partial} total={data.documentCount.totalBookings} icon={<CreditCard />} iconClassName="bg-blue-100 text-blue-600" barClassName="bg-blue-500" />
            <StatusRow label="Paid" value={payment.paid} total={data.documentCount.totalBookings} icon={<CheckCircle2 />} iconClassName="bg-emerald-100 text-emerald-600" barClassName="bg-emerald-500" />
          </CardContent>
        </Card>
      </div>

      {/* Monthly trend & Gender/Packages */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Monthly Trend */}
        <Card className="xl:col-span-2 rounded-2xl border-border/70 shadow-xs">
          <CardHeader><CardTitle>Monthly bookings trend</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs><linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: 12}} />
                <Area type="monotone" dataKey="bookings" stroke="#6366f1" strokeWidth={3} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender */}
        <Card className="rounded-2xl border-border/70 shadow-xs">
           <CardHeader><CardTitle>Gender distribution</CardTitle></CardHeader>
           <CardContent className="space-y-4">
            {data.genderStats.map((item) => (
              <div key={item.gender} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", item.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-rose-100 text-rose-600")}>
                    <UserRound className="h-5 w-5" />
                  </div>
                  <span className="font-medium capitalize">{item.gender}</span>
                </div>
                <span className="text-xl font-bold">{item.count}</span>
              </div>
            ))}
           </CardContent>
        </Card>
      </div>

      {/* Package Rankings table */}
      <Card className="rounded-2xl border-border/70 shadow-xs">
        <CardHeader><CardTitle>Top packages</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topPackages.map((pkg, i) => (
              <div key={pkg._id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-muted-foreground w-6">#{i+1}</div>
                  <Package className="h-5 w-5 text-teal-600" />
                  <span className="font-medium">{pkg._id}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium">{pkg.count} bookings</span>
                  <span className="font-bold text-teal-700 w-32 text-right">{formatCurrency(pkg.totalRevenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent bookings */}
      <Card className="rounded-2xl border-border/70 shadow-xs">
        <CardHeader><CardTitle>Recent bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentBookings.map((booking) => (
              <div key={booking._id} className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold">{booking.applicantInfo.fullName.charAt(0)}</div>
                  <div>
                    <p className="font-semibold">{booking.applicantInfo.fullName}</p>
                    <p className="text-xs text-muted-foreground">{booking.pkgInfo.pkgName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusBadgeClass(booking.applicationStatus)}>{formatStatus(booking.applicationStatus)}</Badge>
                  <Badge className={statusBadgeClass(booking.payment.paymentStatus)}>{formatStatus(booking.payment.paymentStatus)}</Badge>
                  <span className="text-xs text-muted-foreground w-24 text-right">{formatDate(booking.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
