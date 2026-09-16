"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { Card, CardContent } from "@/components/ui/card";
import { type DashboardVenture } from "@/config/dashboard/ventures";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SelectedVentureProps {
  selectedVenture: DashboardVenture;
}

export default function SelectedVenture({
  selectedVenture,
}: SelectedVentureProps) {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      <VentureHeader selectedVenture={selectedVenture} />

      {/* Dashboards Section */}
      <section className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Dashboards
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Access powerful analytics and management tools for {selectedVenture.name}.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {selectedVenture.dashboards.map((dashboard) => {
            const Icon = dashboard.icon;

            return (
              <button
                key={dashboard.href}
                type="button"
                onClick={() => router.push(dashboard.href)}
                className="group relative text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl transition-all duration-300"
              >
                <Card className="relative h-full overflow-hidden rounded-2xl border-border/70 bg-card shadow-xs transition-all duration-300 group-hover:border-border group-hover:shadow-sm group-hover:bg-card">
                  {/* Hover indicator line */}
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-indigo via-indigo/80 to-indigo transition-transform duration-300 group-hover:scale-x-100" />

                  <CardContent className="flex h-full flex-col gap-4 p-6 sm:p-5">
                    {/* Icon Container */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-indigo transition-all duration-300 group-hover:bg-indigo/15">
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Arrow Indicator */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-indigo/50 group-hover:bg-indigo/5 group-hover:text-indigo">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                          {dashboard.name}
                        </h3>
                        <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                          {dashboard.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-auto pt-3 border-t border-border/40">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo">
                        Open dashboard
                        <ArrowRight className="h-3 w-3" />
                      </span>
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
