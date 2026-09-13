"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { type DashboardVenture } from "@/config/dashboard/ventures";

interface VentureHeaderProps {
  selectedVenture: DashboardVenture;
  showBackButton?: boolean;
}

export default function VentureHeader({
  selectedVenture,
  showBackButton = true,
}: VentureHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined") {
      router.back();
    }
  };

  return (
    <section className="mb-10">
      {showBackButton && (
        <button
          type="button"
          onClick={handleBack}
          className="group mb-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-indigo/20 hover:bg-indigo/[0.04] hover:text-indigo"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to ventures
        </button>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-indigo/[0.07] via-background to-background p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo/[0.08] blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
            <Image
              src={selectedVenture.logo}
              alt={selectedVenture.name}
              width={80}
              height={80}
              className="h-full w-full object-contain p-3"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo">
              Venture dashboards
            </p>

            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {selectedVenture.name}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {selectedVenture.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
