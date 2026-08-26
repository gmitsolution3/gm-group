"use client";

import { Code2, Globe2, MonitorCog, ServerCog } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function GMITSolutionDashboard() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* Header */}
        <section>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              GM Group
            </p>

            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
              GM IT Solution
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Overview of GM IT Solution technology, software, and
              digital operations.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section>
          <div className="mb-5">
            <h2 className="font-display text-lg font-bold tracking-tight">
              Overview
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Key areas of GM IT Solution operations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <OverviewCard
              title="Applications"
              description="Software applications and digital products."
              icon={Code2}
            />

            <OverviewCard
              title="Web Solutions"
              description="Websites and web-based platforms."
              icon={Globe2}
            />

            <OverviewCard
              title="Infrastructure"
              description="Technology infrastructure and systems."
              icon={ServerCog}
            />

            <OverviewCard
              title="IT Operations"
              description="Technology operations and service management."
              icon={MonitorCog}
            />
          </div>
        </section>

        {/* Dashboard content placeholder */}
        <section>
          <Card className="rounded-2xl border-border/70 shadow-none">
            <CardContent className="flex min-h-[240px] items-center justify-center p-6">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/[0.08] text-indigo">
                  <MonitorCog className="h-5 w-5" />
                </div>

                <h2 className="mt-4 font-display text-lg font-bold tracking-tight">
                  Dashboard data will appear here
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  GM IT Solution dashboard data will be connected once
                  the backend API specification is available.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function OverviewCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Code2;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-none">
      <CardContent className="p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/[0.08] text-indigo">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-5 font-display text-base font-bold tracking-tight">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
