"use client";

import {
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  Layers3,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type {
  PortfoliosAnalytics,
} from "@/types/dashboard/gm-it-solution.type";

import {
  AnalyticsAreaChart,
  AnalyticsDonutChart,
  KpiCard,
  Section,
} from "../AnalyticsShared";

/* ========================================================================== */
/* PORTFOLIOS TAB                                                             */
/* ========================================================================== */

export default function PortfoliosTab({
  data,
}: {
  data: PortfoliosAnalytics;
}) {
  return (
    <div className="space-y-8">

      {/* ================================================================ */}
      {/* KPI SUMMARY                                                      */}
      {/* ================================================================ */}

      <section className="grid gap-4 sm:grid-cols-2">
        <KpiCard
          label="Total Portfolios"
          value={data.summary.total}
          icon={BriefcaseBusiness}
          description="Total portfolio projects"
        />

        <KpiCard
          label="Categories"
          value={data.summary.categories}
          icon={Layers3}
          description="Unique portfolio categories"
        />
      </section>

      {/* ================================================================ */}
      {/* ANALYTICS CHARTS                                                 */}
      {/* ================================================================ */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* ------------------------------------------------------------ */}
        {/* CATEGORY BREAKDOWN                                           */}
        {/* ------------------------------------------------------------ */}

        <Card>
          <CardContent className="p-5 sm:p-6">
            <Section
              title="Portfolio Categories"
              description="Distribution of portfolios across categories."
            >
              <AnalyticsDonutChart
                items={data.breakdowns.categories}
                labelKey="category"
                centerLabel="Portfolios"
              />
            </Section>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------ */}
        {/* PORTFOLIO GROWTH                                             */}
        {/* ------------------------------------------------------------ */}

        <Card>
          <CardContent className="p-5 sm:p-6">
            <Section
              title="Portfolio Growth"
              description="Portfolio projects created over time."
            >
              <AnalyticsAreaChart
                items={data.trends.growth}
              />
            </Section>
          </CardContent>
        </Card>

      </div>

      {/* ================================================================ */}
      {/* RECENT PORTFOLIOS                                               */}
      {/* ================================================================ */}

      <Section
        title="Recent Portfolios"
        description="Recently added portfolio projects."
      >
        {data.recent.portfolios.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-40 items-center justify-center p-6">
              <p className="text-sm text-muted-foreground">
                No recent portfolios found.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {data.recent.portfolios.map(
              (portfolio) => (
                <Card
                  key={portfolio._id}
                  className="group overflow-hidden border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {/* IMAGE */}

                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {portfolio.image ? (
                      <img
                        src={portfolio.image}
                        alt={portfolio.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FolderKanban className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5">

                    {/* CATEGORY */}

                    <div className="mb-3">
                      <span className="inline-flex rounded-full bg-indigo/10 px-2.5 py-1 text-xs font-semibold text-indigo">
                        {portfolio.category}
                      </span>
                    </div>

                    {/* TITLE */}

                    <h3 className="truncate text-base font-semibold">
                      {portfolio.title}
                    </h3>

                    {/* URL */}

                    {portfolio.url && (
                      <a
                        href={portfolio.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex max-w-full items-center gap-1.5 text-sm font-medium text-indigo transition-colors hover:text-indigo/80"
                      >
                        <span className="truncate">
                          View Project
                        </span>

                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    )}

                    {/* DATE */}

                    <div className="mt-4 border-t border-border/60 pt-3">
                      <p className="text-xs text-muted-foreground">
                        Added{" "}
                        {formatDate(
                          portfolio.createdAt,
                        )}
                      </p>
                    </div>

                  </CardContent>
                </Card>
              ),
            )}
          </div>
        )}
      </Section>

    </div>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function formatDate(value: string) {
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