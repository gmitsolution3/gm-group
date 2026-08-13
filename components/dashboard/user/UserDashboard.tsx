import {
  Activity,
  ArrowUpRight,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
  };
}

export function UserDashboard({
  user,
}: UserDashboardProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-6 sm:p-8 lg:p-10">
      {/* Introduction */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
          Overview
        </p>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          Welcome back, {user.name}.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Here&apos;s an overview of your GM Group account.
        </p>
      </section>

      {/* Status cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Account */}
        <Card className="group rounded-2xl border-border/70 bg-background shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account
            </CardTitle>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo/[0.08] text-indigo">
              <UserRound className="h-4 w-4" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="font-display text-2xl font-bold tracking-tight">
              Active
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Your account is ready to use.
            </p>
          </CardContent>
        </Card>

        {/* Verification */}
        <Card className="group rounded-2xl border-border/70 bg-background shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verification
            </CardTitle>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/[0.08] text-teal">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </CardHeader>

          <CardContent>
            <Badge
              variant="secondary"
              className="rounded-full border border-teal/15 bg-teal/[0.08] px-2.5 py-1 text-xs font-medium text-teal hover:bg-teal/[0.08]"
            >
              <ShieldCheck className="mr-1 h-3 w-3" />
              Verified
            </Badge>

            <p className="mt-3 text-sm text-muted-foreground">
              Your email address is verified.
            </p>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="group rounded-2xl border-border/70 bg-background shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Activity
            </CardTitle>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>

          <CardContent>
            <p className="font-display text-2xl font-bold tracking-tight">
              No activity
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Activity tracking will appear here.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Account information */}
      <Card className="rounded-2xl border-border/70 bg-background shadow-none">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 px-6 py-5 sm:px-7">
          <div>
            <CardTitle className="font-display text-base font-bold tracking-tight">
              Account information
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Your basic GM Group account details.
            </p>
          </div>

          <ArrowUpRight className="h-4 w-4 text-muted-foreground/50" />
        </CardHeader>

        <CardContent className="px-6 py-7 sm:px-7">
          <div className="grid gap-7 sm:grid-cols-2">
            {/* Name */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                Name
              </p>

              <p className="mt-2 text-sm font-medium text-foreground sm:text-base">
                {user.name}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-medium text-foreground sm:text-base">
                {user.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}