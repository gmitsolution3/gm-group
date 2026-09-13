"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { API_ENDPOINTS } from "@/config/api/api";
import { dashboardVentures } from "@/config/dashboard/ventures";
import { useFetch } from "@/hooks/api/useFetch";
import { GMLogisticDashboardResponse } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import GMLogisticDashboardLoader from "./GMLogisticDashboardLoader";
import GMLogisticDashboardError from "./GMLogisticDashboardError";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

export default function GMLogisticDashboard() {
  const { data, isLoading, isError, refetch } =
    useFetch<GMLogisticDashboardResponse>(
      API_ENDPOINTS.gmLogistic.dashboard
    );

  const gmLogistic = dashboardVentures.find(
    (v) => v.name === "GM Logistic"
  );

  if (isLoading) return <GMLogisticDashboardLoader />;
  if (isError || !data?.success || !data.data)
    return <GMLogisticDashboardError message={data?.message} onRetry={refetch} />;

  const stats = data.data;

  const barData = [
    { label: "Users", value: stats.users?.totalUsers ?? 0 },
    { label: "Admins", value: stats.users?.totalAdmins ?? 0 },
    { label: "Countries", value: stats.countries?.totalCountries ?? 0 },
    { label: "Categories", value: stats.categories?.totalCategories ?? 0 },
  ];

  const pieData = [
    { name: "Configured", value: stats.pricing?.configuredPricingRecords ?? 0 },
    { name: "Pending", value: stats.pricing?.pendingPricingRecords ?? 0 },
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

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {gmLogistic && <VentureHeader selectedVenture={gmLogistic} />}

      {/* Gradient hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-rose-500 p-8 sm:p-10 shadow-2xl shadow-indigo-900/20">
        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Logistics Overview
          </h2>
          <p className="mt-2 max-w-xl text-indigo-100">Real-time metrics and analytics across your global supply chain.</p>
          <div className="mt-6 flex gap-3">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">Active</Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none">{stats.users?.totalUsers ?? 0} Users</Badge>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: String(stats.users?.totalUsers ?? 0), sub: "Registered users", icon: "👥" },
          { title: "Admin Users", value: String(stats.users?.totalAdmins ?? 0), sub: "Admin accounts", icon: "🛡️" },
          { title: "Countries", value: String(stats.countries?.totalCountries ?? 0), sub: "Active countries", icon: "🌍" },
          { title: "Categories", value: String(stats.categories?.totalCategories ?? 0), sub: "Active categories", icon: "📦" },
        ].map((s) => (
          <Card key={s.title} className="group overflow-hidden rounded-3xl border-none bg-gradient-to-b from-card to-slate-50/60 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/10">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{s.title}</p>
                  <p className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
                </div>
                <span className="text-3xl opacity-80 group-hover:scale-110 transition">{s.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-none bg-card shadow-xl shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Stats Comparison</h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-card shadow-xl shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold">Distribution</h3>
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
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
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
            <h3 className="font-display text-lg font-bold">Trend Line</h3>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#trendGrad)" />
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
            <h3 className="font-display text-xl font-bold">Pricing Breakdown</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                { label: "Total Records", value: stats.pricing?.totalPricingRecords ?? 0 },
                { label: "Configured", value: stats.pricing?.configuredPricingRecords ?? 0 },
                { label: "Pending", value: stats.pricing?.pendingPricingRecords ?? 0 },
                { label: "Completion %", value: `${stats.pricing?.pricingCompletionPercentage ?? 0}%` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/70 p-4 shadow-sm border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-extrabold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none bg-card shadow-lg shadow-black/5">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold">Recent Users</h3>
            <div className="mt-4 space-y-3">
              {(stats.recentUsers || []).map((user: any) => (
                <div key={user._id} className="flex items-center gap-4 rounded-2xl bg-muted/30 p-4 transition hover:bg-muted/60">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                    <AvatarImage src={user.image || "https://i.pravatar.cc/150?img=3"} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border-none">{user.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
