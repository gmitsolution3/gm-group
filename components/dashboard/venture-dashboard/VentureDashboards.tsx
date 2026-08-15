"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  dashboardVentures,
  type DashboardVenture,
} from "@/config/dashboard/ventures";

import { Card, CardContent } from "@/components/ui/card";
import SelectedVenture from "./SelectedVenture";

export function VentureDashboards() {
  const router = useRouter();

  const [selectedVenture, setSelectedVenture] =
    useState<DashboardVenture | null>(null);

  function handleVentureClick(
    venture: DashboardVenture,
  ) {
    if (venture.dashboards.length === 1) {
      router.push(venture.dashboards[0].href);
      return;
    }

    setSelectedVenture(venture);
  }

  function handleBack() {
    setSelectedVenture(null);
  }

  if (selectedVenture) {
    return (
      <SelectedVenture
        selectedVenture={selectedVenture}
        handleBack={handleBack}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-indigo/[0.07] via-background to-background p-7 sm:p-9">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo/[0.08] blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo/10 bg-indigo/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo">
              GM Group
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Venture Dashboards
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Access dashboards and tools across GM Group
            ventures from one place.
          </p>
        </div>
      </section>

      {/* Venture grid */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">
              Your ventures
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose a venture to continue.
            </p>
          </div>

          <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
            {dashboardVentures.length} ventures
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardVentures.map((venture) => (
            <button
              key={venture.name}
              type="button"
              onClick={() =>
                handleVentureClick(venture)
              }
              className="group text-left"
            >
              <Card className="relative h-full overflow-hidden rounded-3xl border-border/70 bg-background shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-indigo/20 hover:shadow-[0_18px_50px_-20px_rgba(79,70,229,0.25)]">
                {/* Hover accent */}
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-indigo via-violet-500 to-indigo transition-transform duration-300 group-hover:scale-x-100" />

                <CardContent className="relative flex min-h-[270px] flex-col p-6">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo/[0.04] to-transparent" />

                      <Image
                        src={venture.logo}
                        alt={venture.name}
                        width={80}
                        height={80}
                        className="relative h-full w-full object-contain p-3"
                      />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-all duration-300 group-hover:border-indigo/20 group-hover:bg-indigo/[0.06] group-hover:text-indigo">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto pt-8">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl font-bold tracking-tight">
                        {venture.name}
                      </h2>
                    </div>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                      {venture.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                      <span className="text-xs font-semibold text-indigo">
                        {venture.dashboards.length === 1
                          ? "Open dashboard"
                          : "Explore dashboards"}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {venture.dashboards.length}{" "}
                        {venture.dashboards.length === 1
                          ? "dashboard"
                          : "dashboards"}
                      </span>
                    </div>
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