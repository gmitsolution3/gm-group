"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardVentures } from "@/config/dashboard/ventures";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Plane,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatDate, formatNumber } from "../utils";

const dummyMonthlyData = [
  { month: "Jan", bookings: 820, revenue: 6800000 },
  { month: "Feb", bookings: 940, revenue: 7900000 },
  { month: "Mar", bookings: 1010, revenue: 8500000 },
  { month: "Apr", bookings: 1180, revenue: 9200000 },
  { month: "May", bookings: 1240, revenue: 9800000 },
  { month: "Jun", bookings: 1284, revenue: 12800000 },
];

const dummyRecentBookings = [
  {
    id: "BK-7892",
    passenger: "A. Rahman",
    route: "DAC → DXB",
    flight: "GMA-204",
    date: "2026-09-16",
    status: "Confirmed",
    amount: 285000,
  },
  {
    id: "BK-7893",
    passenger: "S. Ahmed",
    route: "DAC → JED",
    flight: "GMA-207",
    date: "2026-09-15",
    status: "Confirmed",
    amount: 240000,
  },
  {
    id: "BK-7894",
    passenger: "R. Hossain",
    route: "DAC → KUL",
    flight: "GMA-211",
    date: "2026-09-14",
    status: "Pending",
    amount: 265000,
  },
  {
    id: "BK-7895",
    passenger: "M. Khan",
    route: "DAC → SIN",
    flight: "GMA-218",
    date: "2026-09-13",
    status: "Cancelled",
    amount: 295000,
  },
  {
    id: "BK-7896",
    passenger: "T. Islam",
    route: "DAC → BKK",
    flight: "GMA-225",
    date: "2026-09-12",
    status: "Confirmed",
    amount: 205000,
  },
];

const dummyTopRoutes = [
  { route: "DAC → DXB", passengers: 842, bookings: 156 },
  { route: "DAC → JED", passengers: 728, bookings: 138 },
  { route: "DAC → KUL", passengers: 642, bookings: 122 },
  { route: "DAC → SIN", passengers: 534, bookings: 104 },
  { route: "DAC → BKK", passengers: 486, bookings: 98 },
];

const dummyFlightStatus = [
  { status: "Scheduled", count: 18, color: "bg-blue-500" },
  { status: "Boarding", count: 3, color: "bg-yellow-500" },
  { status: "In Flight", count: 7, color: "bg-green-500" },
  { status: "Landed", count: 12, color: "bg-purple-500" },
  { status: "Delayed", count: 2, color: "bg-orange-500" },
  { status: "Cancelled", count: 1, color: "bg-red-500" },
];

export default function GMAviationDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const gmAviation = dashboardVentures.find(
    (v) => v.name === "GM Aviation",
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-8">
      <VentureHeader selectedVenture={gmAviation!} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Aviation Operations Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Real-time overview of aviation operations, bookings, flights, and revenue.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-blue-500" />
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(1284)}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Plane className="h-4 w-4 text-green-500" />
              Active Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(24)}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              3 international, 7 regional, 14 domestic
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-purple-500" />
              Passengers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(3842)}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4 text-amber-500" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳{formatNumber(12800000)}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-orange-500" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(18)}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Requires approval
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-red-500" />
              Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatNumber(32)}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              2.5% of total bookings
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking & Revenue Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Booking & Revenue Overview</CardTitle>
          <CardDescription>
            Monthly booking count and revenue performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  formatter={(value) => [`${value}`, "Value"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="bookings" name="Bookings" fill="#5b5fef" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Revenue" fill="#00bfa6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Flight Status & Recent Bookings */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Flight Status</CardTitle>
            <CardDescription>Current operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyFlightStatus.map((status) => (
                <div key={status.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${status.color}`} />
                    <span className="text-sm font-medium">{status.status}</span>
                  </div>
                  <Badge variant="secondary">{status.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest passenger bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyRecentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{booking.id}</span>
                      <span className="text-xs text-muted-foreground">
                        {booking.passenger}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {booking.route} • {booking.flight} • {formatDate(booking.date)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        booking.status === "Confirmed"
                          ? "default"
                          : booking.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                    <div className="text-right text-sm font-semibold">
                      ৳{formatNumber(booking.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Routes */}
      <Card>
        <CardHeader>
          <CardTitle>Top Routes</CardTitle>
          <CardDescription>Most popular flight routes by passenger volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dummyTopRoutes.map((route) => (
              <div key={route.route} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{route.route}</div>
                  <Plane className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Passengers</div>
                    <div className="font-semibold">{formatNumber(route.passengers)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Bookings</div>
                    <div className="font-semibold">{formatNumber(route.bookings)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Departures */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Departures</CardTitle>
          <CardDescription>Next 6 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">DAC → DXB</div>
                  <div className="text-xs text-muted-foreground">GMA-204</div>
                </div>
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <div className="mt-2 text-sm">Departure: 14:30</div>
              <div className="text-xs text-muted-foreground">Gate A5</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">DAC → JED</div>
                  <div className="text-xs text-muted-foreground">GMA-207</div>
                </div>
                <Calendar className="h-4 w-4 text-green-500" />
              </div>
              <div className="mt-2 text-sm">Departure: 16:45</div>
              <div className="text-xs text-muted-foreground">Gate B2</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">DAC → KUL</div>
                  <div className="text-xs text-muted-foreground">GMA-211</div>
                </div>
                <Users className="h-4 w-4 text-purple-500" />
              </div>
              <div className="mt-2 text-sm">Departure: 18:20</div>
              <div className="text-xs text-muted-foreground">Gate A3</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">DAC → SIN</div>
                  <div className="text-xs text-muted-foreground">GMA-218</div>
                </div>
                <Plane className="h-4 w-4 text-amber-500" />
              </div>
              <div className="mt-2 text-sm">Departure: 20:10</div>
              <div className="text-xs text-muted-foreground">Gate C1</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}