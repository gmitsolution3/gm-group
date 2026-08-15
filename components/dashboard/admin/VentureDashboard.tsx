"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  dashboardVentures,
  type DashboardVenture,
} from "@/config/dashboard/ventures";

import { Card, CardContent } from "@/components/ui/card";

export function VentureDashboards() {
  const router = useRouter();

  const [selectedVenture, setSelectedVenture] =
    useState<DashboardVenture | null>(null);

  function handleVentureClick(venture: DashboardVenture) {
    /*
     * A venture with one dashboard goes
     * directly to that dashboard.
     */
    if (venture.dashboards.length === 1) {
      router.push(venture.dashboards[0].href);
      return;
    }

    /*
     * A venture with multiple dashboards
     * opens its dashboard selection.
     */
    setSelectedVenture(venture);
  }

  function handleBack() {
    setSelectedVenture(null);
  }

  /*
   * Dashboard selection view
   */
  if (selectedVenture) {
    return (
      <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <section>
          <button
            type="button"
            onClick={handleBack}
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to ventures
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
              <Image
                src={selectedVenture.logo}
                alt={selectedVenture.name}
                width={56}
                height={56}
                className="h-full w-full object-contain p-2"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                Venture
              </p>

              <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {selectedVenture.name}
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Select a dashboard to continue.
          </p>
        </section>

        {/* Dashboard grid */}
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {selectedVenture.dashboards.map((dashboard) => {
              const Icon = dashboard.icon;

              return (
                <button
                  key={dashboard.href}
                  type="button"
                  onClick={() => router.push(dashboard.href)}
                  className="group text-left"
                >
                  <Card className="h-full rounded-2xl border-border/70 bg-background shadow-none transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-border group-hover:shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo/[0.08] text-indigo transition-colors group-hover:bg-indigo/[0.12]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/60" />
                      </div>

                      <div className="mt-6">
                        <h2 className="font-display text-base font-bold tracking-tight">
                          {dashboard.name}
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {dashboard.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  /*
   * Root venture view
   */
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {/* Page header */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Administration
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Venture Dashboards
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Access dashboards and tools across GM Group ventures.
        </p>
      </section>

      {/* Ventures */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardVentures.map((venture) => (
            <button
              key={venture.name}
              type="button"
              onClick={() => handleVentureClick(venture)}
              className="group text-left"
            >
              <Card className="h-full rounded-2xl border-border/70 bg-background shadow-none transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-border group-hover:shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    {/* Venture logo */}
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-white transition-shadow duration-200 group-hover:shadow-sm">
                      <Image
                        src={venture.logo}
                        alt={venture.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/60" />
                  </div>

                  <div className="mt-6">
                    <h2 className="font-display text-base font-bold tracking-tight">
                      {venture.name}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {venture.description}
                    </p>

                    <p className="mt-4 text-xs font-medium text-indigo">
                      {venture.dashboards.length === 1
                        ? "Open dashboard"
                        : `${venture.dashboards.length} dashboards`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
