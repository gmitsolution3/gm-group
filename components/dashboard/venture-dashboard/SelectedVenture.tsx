"use client";

import VentureHeader from "@/components/dashboard/venture-dashboard/VentureHeader";
import { Card, CardContent } from "@/components/ui/card";
import { type DashboardVenture } from "@/config/dashboard/ventures";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SelectedVentureProps {
  selectedVenture: DashboardVenture;
  handleBack: () => void;
}

export default function SelectedVenture({
  selectedVenture,
  handleBack,
}: SelectedVentureProps) {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      <VentureHeader selectedVenture={selectedVenture} />

      {/* Dashboard grid */}
      <section>
        <div className="mb-5">
          <h2 className="font-display text-lg font-bold tracking-tight">
            Dashboards
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Tools and analytics available for this venture.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {selectedVenture.dashboards.map((dashboard) => {
            const Icon = dashboard.icon;

            return (
              <button
                key={dashboard.href}
                type="button"
                onClick={() => router.push(dashboard.href)}
                className="group text-left"
              >
                <Card className="relative h-full min-h-[220px] overflow-hidden rounded-3xl border-border/70 bg-background shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-indigo/20 hover:shadow-[0_18px_50px_-20px_rgba(79,70,229,0.25)]">
                  {/* Hover accent */}
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-indigo via-violet-500 to-indigo transition-transform duration-300 group-hover:scale-x-100" />

                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/[0.08] text-indigo transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo/[0.12]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 group-hover:border-indigo/20 group-hover:bg-indigo/[0.06] group-hover:text-indigo">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <h2 className="font-display text-xl font-bold tracking-tight">
                        {dashboard.name}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {dashboard.description}
                      </p>

                      <div className="mt-5 border-t border-border/60 pt-4">
                        <span className="text-xs font-semibold text-indigo">
                          Launch dashboard
                        </span>
                      </div>
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
