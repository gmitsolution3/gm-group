"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { API_ENDPOINTS } from "@/config/api/api";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { useFetch } from "@/hooks/api/useFetch";
import { GMLogisticDashboardResponse } from "@/types";
import {
  CheckCircle,
  Clock,
  Database,
  FileText,
  Globe,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber, formatPercentage } from "../utils";
import GMLogisticDashboardError from "./GMLogisticDashboardError";
import GMLogisticDashboardLoader from "./GMLogisticDashboardLoader";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

export default function GMLogisticDashboard() {
  const { data, isLoading, isError, refetch } =
    useFetch<GMLogisticDashboardResponse>(
      API_ENDPOINTS.gmLogistic.dashboard,
    );

  const gmLogistic = dashboardVentures.find(
    (v) => v.name === "GM Logistic",
  );

  if (isLoading) return <GMLogisticDashboardLoader />;
  if (isError || !data?.success || !data.data)
    return (
      <GMLogisticDashboardError
        message={data?.message}
        onRetry={refetch}
      />
    );

  const stats = data.data;

  const barData = [
    { label: "Users", value: stats.users?.totalUsers ?? 0 },
    { label: "Admins", value: stats.users?.totalAdmins ?? 0 },
    {
      label: "Countries",
      value: stats.countries?.totalCountries ?? 0,
    },
    {
      label: "Categories",
      value: stats.categories?.totalCategories ?? 0,
    },
  ];

  const pieData = [
    {
      name: "Configured",
      value: stats.pricing?.configuredPricingRecords ?? 0,
    },
    {
      name: "Pending",
      value: stats.pricing?.pendingPricingRecords ?? 0,
    },
    { name: "Total", value: stats.pricing?.totalPricingRecords ?? 0 },
  ];

  const trendData = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1450 },
    { month: "Mar", value: 1100 },
    { month: "Apr", value: 1800 },
    { month: "May", value: 2100 },
    { month: "Jun", value: 1950 },
  ];

  const statsCards = [
    {
      title: "Total Users",
      value: formatNumber(stats.users?.totalUsers ?? 0),
      sub: `${stats.users?.totalAdmins ?? 0} Admins · ${stats.users?.totalBannedUsers ?? 0} Banned`,
      icon: <Users className="h-5 w-5 text-indigo" />,
    },
    {
      title: "Countries",
      value: formatNumber(stats.countries?.totalCountries ?? 0),
      sub: `${stats.countries?.activeCountries ?? 0} Active`,
      icon: <Globe className="h-5 w-5 text-teal" />,
    },
    {
      title: "Categories",
      value: formatNumber(stats.categories?.totalCategories ?? 0),
      sub: `${stats.categories?.activeCategories ?? 0} Active`,
      icon: <Tag className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Pricing Records",
      value: formatNumber(stats.pricing?.totalPricingRecords ?? 0),
      sub: `${stats.pricing?.configuredPricingRecords ?? 0} Configured · ${stats.pricing?.pendingPricingRecords ?? 0} Pending`,
      icon: <Database className="h-5 w-5 text-coral" />,
    },
  ];

  const pricingBreakdown = [
    {
      label: "Total Records",
      value: stats.pricing?.totalPricingRecords ?? 0,
      icon: <Database className="h-5 w-5 text-indigo" />,
      bg: "bg-gradient-to-br from-indigo-50 to-white",
    },
    {
      label: "Configured",
      value: stats.pricing?.configuredPricingRecords ?? 0,
      icon: <CheckCircle className="h-5 w-5 text-emerald" />,
      bg: "bg-gradient-to-br from-emerald-50 to-white",
    },
    {
      label: "Pending",
      value: stats.pricing?.pendingPricingRecords ?? 0,
      icon: <Clock className="h-5 w-5 text-amber" />,
      bg: "bg-gradient-to-br from-amber-50 to-white",
    },
    {
      label: "Completion %",
      value: formatPercentage(
        stats.pricing?.pricingCompletionPercentage ?? 0,
      ),
      icon: <TrendingUp className="h-5 w-5 text-rose-500" />,
      bg: "bg-gradient-to-br from-rose-50 to-white",
      progress: stats.pricing?.pricingCompletionPercentage ?? 0,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {gmLogistic && <VentureHeader selectedVenture={gmLogistic} />}

      {/* Stats cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((s) => (
          <Card
            key={s.title}
            className="group overflow-hidden rounded-3xl border-none bg-gradient-to-b from-white to-indigo-50/40 shadow-lg shadow-indigo-100/20 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-200/30 hover:-rotate-[0.5deg]"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {s.title}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.sub}
                  </p>
                </div>
                <span className="text-3xl opacity-90 group-hover:scale-125 group-hover:rotate-6 transition duration-300">
                  {s.icon}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-none bg-card shadow-xl shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">
              Stats Comparison
            </h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barSize={32}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                  />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#6366f1"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-card shadow-xl shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">
              Distribution
            </h3>
            <div className="h-64 mt-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((_, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-card shadow-xl shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">
              Trend Line
            </h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient
                      id="trendGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                  />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#trendGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing + Users */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-none bg-gradient-to-br from-slate-50 to-card shadow-lg shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-rose-500" />
              Pricing Breakdown
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {pricingBreakdown.map((item) => (
                <div
                  key={item.label}
                  className={`group relative overflow-hidden rounded-3xl ${item.bg} p-5 shadow-md shadow-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 border border-white/60`}
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-white/70 p-2 shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-3xl font-extrabold tracking-tight text-foreground">
                      {item.value}
                    </p>
                  </div>
                  {item.progress !== undefined && (
                    <div className="mt-3 h-2 w-full rounded-full bg-white/70 overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-700"
                        style={{
                          width: `${Math.min(100, Math.max(0, item.progress))}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-card shadow-lg shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold">
              Recent Users
            </h3>
            <div className="mt-4 space-y-3">
              {(stats.recentUsers || []).map((user: any) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 rounded-2xl bg-muted/30 p-4 transition hover:bg-muted/60"
                >
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                    <AvatarImage
                      src={
                        user.image ||
                        "https://i.pravatar.cc/150?img=3"
                      }
                    />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                      {user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border-none"
                  >
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
