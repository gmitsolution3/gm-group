"use client";

import type {
  ComponentType,
  ReactNode,
} from "react";

import {
  Activity,
  BriefcaseBusiness,
  FileText,
  Layers3,
  User,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type IconComponent = ComponentType<{
  className?: string;
}>;

/* ========================================================================== */
/* ANALYTICS COLORS                                                           */
/* ========================================================================== */

const ANALYTICS_PRIMARY_COLOR = "var(--gm-indigo)";

/* ========================================================================== */
/* SECTION                                                                    */
/* ========================================================================== */

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

/* ========================================================================== */
/* KPI CARD                                                                   */
/* ========================================================================== */

export function KpiCard({
  label,
  value,
  icon: Icon,
  description,
}: {
  label: string;
  value: number;
  icon: IconComponent;
  description?: string;
}) {
  return (
    <Card className="overflow-hidden border-border/70">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {label}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>

            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* TREND LIST                                                                 */
/* ========================================================================== */

export function TrendList({
  items,
}: {
  items: Array<{
    count: number;
    period: string;
  }>;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No trend data available for this period." />
    );
  }

  const maxCount = Math.max(
    ...items.map((item) => item.count),
    1,
  );

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percentage =
          (item.count / maxCount) * 100;

        return (
          <div
            key={item.period}
            className="space-y-2"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">
                {formatPeriod(item.period)}
              </span>

              <span className="text-sm font-semibold">
                {item.count.toLocaleString()}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-indigo transition-all"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/* BREAKDOWN LIST                                                             */
/* ========================================================================== */

type BreakdownItem = {
  count: number;
};

export function BreakdownList<
  T extends BreakdownItem,
>({
  items,
  labelKey,
}: {
  items: T[];
  labelKey: keyof T;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No breakdown data available." />
    );
  }

  const maxCount = Math.max(
    ...items.map((item) => item.count),
    1,
  );

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const label = String(
          item[labelKey] ?? "Unknown",
        );

        const percentage =
          (item.count / maxCount) * 100;

        return (
          <div
            key={`${label}-${index}`}
            className="space-y-2"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="truncate text-sm font-medium">
                {label}
              </span>

              <span className="shrink-0 text-sm font-semibold">
                {item.count.toLocaleString()}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-indigo"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/* ANALYTICS AREA CHART                                                       */
/* ========================================================================== */

export function AnalyticsAreaChart({
  items,
  height = 280,
}: {
  items: Array<{
    count: number;
    period: string;
  }>;
  height?: number;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No trend data available for this period." />
    );
  }

  const chartData = items.map((item) => ({
    period: formatPeriod(item.period),
    count: item.count,
  }));

  return (
    <div
      className="w-full"
      style={{ height }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="analyticsAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={ANALYTICS_PRIMARY_COLOR}
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor={ANALYTICS_PRIMARY_COLOR}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-border"
          />

          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground text-xs"
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground text-xs"
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="count"
            stroke={ANALYTICS_PRIMARY_COLOR}
            strokeWidth={2.5}
            fill="url(#analyticsAreaGradient)"
            activeDot={{
              r: 5,
              fill: ANALYTICS_PRIMARY_COLOR,
              stroke: "var(--background)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ========================================================================== */
/* ANALYTICS BAR CHART                                                        */
/* ========================================================================== */

export function AnalyticsBarChart<
  T extends {
    count: number;
  },
>({
  items,
  labelKey,
  height,
}: {
  items: T[];
  labelKey: keyof T;
  height?: number;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No breakdown data available." />
    );
  }

  const chartData = items.map((item) => ({
    label: String(item[labelKey] ?? "Unknown"),
    count: item.count,
  }));

  const chartHeight =
    height ??
    Math.max(260, chartData.length * 42);

  return (
    <div
      className="w-full"
      style={{
        height: chartHeight,
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            horizontal={false}
            strokeDasharray="3 3"
            className="stroke-border"
          />

          <XAxis
            type="number"
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground text-xs"
          />

          <YAxis
            type="category"
            dataKey="label"
            width={140}
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground text-xs"
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
            }}
          />

          <Bar
            dataKey="count"
            radius={[0, 8, 8, 0]}
            fill={ANALYTICS_PRIMARY_COLOR}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ========================================================================== */
/* ANALYTICS DONUT CHART                                                      */
/* ========================================================================== */

const donutColors = [
  ANALYTICS_PRIMARY_COLOR,
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

export function AnalyticsDonutChart<
  T extends {
    count: number;
  },
>({
  items,
  labelKey,
  centerLabel = "Total",
  height = 280,
}: {
  items: T[];
  labelKey: keyof T;
  centerLabel?: string;
  height?: number;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No breakdown data available." />
    );
  }

  const chartData = items.map((item) => ({
    name: String(item[labelKey] ?? "Unknown"),
    value: item.count,
  }));

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <div className="space-y-5">
      <div
        className="relative w-full"
        style={{
          height,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="82%"
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((item, index) => (
                <Cell
                  key={`${item.name}-${index}`}
                  fill={
                    donutColors[
                      index % donutColors.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight">
            {total.toLocaleString()}
          </span>

          <span className="mt-1 text-xs text-muted-foreground">
            {centerLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {chartData.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    donutColors[
                      index % donutColors.length
                    ],
                }}
              />

              <span className="truncate text-sm text-muted-foreground">
                {item.name}
              </span>
            </div>

            <span className="shrink-0 text-sm font-semibold">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* ANALYTICS MULTI LINE CHART                                                 */
/* ========================================================================== */

type MultiLineSeries = {
  key: string;
  label: string;
  items: Array<{
    count: number;
    period: string;
  }>;
};

const lineColors = [
  ANALYTICS_PRIMARY_COLOR,
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function AnalyticsMultiLineChart({
  series,
  height = 340,
}: {
  series: MultiLineSeries[];
  height?: number;
}) {
  const periods = Array.from(
    new Set(
      series.flatMap((seriesItem) =>
        seriesItem.items.map(
          (item) => item.period,
        ),
      ),
    ),
  ).sort();

  if (periods.length === 0) {
    return (
      <EmptyState text="No growth data available for this period." />
    );
  }

  const chartData = periods.map((period) => {
    const row: Record<string, string | number> = {
      period: formatPeriod(period),
    };

    series.forEach((seriesItem) => {
      const match = seriesItem.items.find(
        (item) => item.period === period,
      );

      row[seriesItem.key] =
        match?.count ?? 0;
    });

    return row;
  });

  return (
    <div
      className="w-full"
      style={{
        height,
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-border"
          />

          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground text-xs"
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            className="fill-muted-foreground text-xs"
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
            }}
          />

          <Legend />

          {series.map(
            (seriesItem, index) => (
              <Line
                key={seriesItem.key}
                type="monotone"
                dataKey={seriesItem.key}
                name={seriesItem.label}
                stroke={
                  lineColors[
                    index % lineColors.length
                  ]
                }
                strokeWidth={2.5}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                  fill:
                    lineColors[
                      index % lineColors.length
                    ],
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
            ),
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ========================================================================== */
/* ACTIVITY TIMELINE                                                          */
/* ========================================================================== */

export function ActivityTimeline({
  items,
}: {
  items: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
  }>;
}) {
  if (items.length === 0) {
    return (
      <EmptyState text="No recent activity found." />
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item) => {
            const Icon = getActivityIcon(item.type);

            return (
              <div
                key={item.id}
                className="flex gap-4 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {item.title}
                      </p>

                      {item.description && (
                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <time className="shrink-0 text-xs text-muted-foreground">
                      {formatDateTime(item.date)}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* ========================================================================== */
/* RECENT TABLE                                                               */
/* ========================================================================== */

export function RecentTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  if (rows.length === 0) {
    return (
      <EmptyState text="No recent records found." />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="border-b bg-muted/40">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors hover:bg-muted/30"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-5 py-4 text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

export function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center">
      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function formatPeriod(period: string) {
  const date = new Date(`${period}-01`);

  if (Number.isNaN(date.getTime())) {
    return period;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getActivityIcon(type: string) {
  switch (type) {
    case "user":
      return User;

    case "portfolio":
      return BriefcaseBusiness;

    case "blog":
      return FileText;

    case "job":
      return BriefcaseBusiness;

    case "application":
      return Users;

    case "service":
      return Layers3;

    default:
      return Activity;
  }
}