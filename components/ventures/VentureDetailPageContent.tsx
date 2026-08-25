"use client";

import { useMemo } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import { IVenture } from "@/types";

import { notFound } from "next/navigation";

import RelatedVentures from "./RelatedVentures";
import VentureDetailContent from "./VentureDetailContent";
import VentureDetailCta from "./VentureDetailCta";
import VentureDetailHero from "./VentureDetailHero";
import VentureGallery from "./VentureGallery";
import VentureOverview from "./VentureOverview";

type VentureDetailPageContentProps = {
  slug: string;
};

function VentureDetailLoader() {
  return (
    <main>
      <section className="relative min-h-[70svh] overflow-hidden bg-ink">
        <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-white/10" />

            <div className="mt-10 flex items-center gap-8">
              <div className="h-24 w-24 rounded-2xl bg-white/10" />

              <div>
                <div className="h-3 w-40 rounded bg-white/10" />
              </div>
            </div>

            <div className="mt-8 h-20 w-3/4 max-w-4xl rounded-xl bg-white/10" />

            <div className="mt-6 h-6 w-full max-w-2xl rounded bg-white/10" />

            <div className="mt-8 flex gap-3">
              <div className="h-10 w-32 rounded-full bg-white/10" />
              <div className="h-10 w-32 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div className="animate-pulse">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="mt-5 h-12 w-3/4 rounded-lg bg-muted" />
              <div className="mt-7 h-24 w-full rounded-lg bg-muted" />
            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </section>
    </main>
  );
}

function VentureDetailError() {
  return (
    <main>
      <section className="flex min-h-[60svh] items-center justify-center px-5 py-24">
        <div className="w-full max-w-xl rounded-2xl border border-dashed border-black/10 p-10 text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Unable to load venture
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We couldn't retrieve this venture right now. Please try
            again later.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function VentureDetailPageContent({
  slug,
}: VentureDetailPageContentProps) {
  const { data, isLoading, isError } = useFetch<IVenture[]>(
    "/ventures/get-all",
  );

  const ventures = data ?? [];

  const venture = useMemo(
    () => ventures.find((item) => item.slug === slug),
    [ventures, slug],
  );

  const relatedVentures = useMemo(
    () => ventures.filter((item) => item.slug !== slug).slice(0, 3),
    [ventures, slug],
  );

  if (isLoading) {
    return <VentureDetailLoader />;
  }

  if (isError) {
    return <VentureDetailError />;
  }

  if (!venture) {
    notFound();
  }

  return (
    <main>
      <VentureDetailHero venture={venture} />

      <VentureOverview venture={venture} />

      <VentureDetailContent venture={venture} />

      <VentureGallery venture={venture} />

      <RelatedVentures ventures={relatedVentures} />

      <VentureDetailCta />
    </main>
  );
}
