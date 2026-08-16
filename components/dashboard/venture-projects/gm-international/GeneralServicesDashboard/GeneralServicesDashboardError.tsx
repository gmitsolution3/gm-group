"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Plane,
  RefreshCw,
  ServerCrash,
} from "lucide-react";

export default function GeneralServicesDashboardError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-hidden bg-background p-6 lg:p-8">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-red-500/5 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-orange-500/5 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.025] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[650px] w-full max-w-[1440px] items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Main error card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50/80 via-background to-background shadow-xl shadow-red-500/5">
            {/* Top accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-400" />

            <div className="p-7 sm:p-10">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-2xl bg-red-200/30" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-500 shadow-sm">
                    <ServerCrash className="h-9 w-9" />
                  </div>

                  <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-background bg-red-500 text-white shadow-sm">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-7 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                    Service unavailable
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div className="mx-auto mt-6 max-w-xl text-center">
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  We couldn't load your services dashboard
                </h1>

                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                  {message ||
                    "We couldn't retrieve the latest GM International service statistics. The dashboard may be temporarily unavailable."}
                </p>
              </div>

              {/* Services affected */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ServiceStatus
                  icon={GraduationCap}
                  label="Student"
                />

                <ServiceStatus
                  icon={HeartPulse}
                  label="Medical"
                />

                <ServiceStatus
                  icon={Plane}
                  label="Tourist"
                />

                <ServiceStatus
                  icon={BriefcaseBusiness}
                  label="Business"
                />
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onRetry}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg sm:w-auto"
                >
                  <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />

                  Try again

                  <ArrowRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Diagnostic hint */}
              <div className="mt-8 rounded-2xl border border-red-100 bg-background/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    <Activity className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      What you can do
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Try refreshing the dashboard. If the problem
                      continues, the service may be experiencing a
                      temporary interruption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer status */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

            <span>GM International • General Services</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceStatus({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-background/70 px-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-400">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-semibold">{label}</p>

        <div className="mt-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

          <span className="text-[10px] text-muted-foreground">
            Unavailable
          </span>
        </div>
      </div>
    </div>
  );
}