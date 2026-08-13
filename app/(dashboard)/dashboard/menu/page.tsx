import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { dashboardMenus } from "@/config/dashboard/menus";
import { requireAuth } from "@/lib/auth-guards";

import { Card, CardContent } from "@/components/ui/card";

export default async function MenuPage() {
  await requireAuth();

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {/* Page header */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Administration
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Menu
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Access and manage the different areas of the GM Group
          dashboard.
        </p>
      </section>

      {/* Menu grid */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardMenus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className="group"
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
                        {menu.name}
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {menu.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
