"use client";

import { useMemo } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import { IVenture } from "@/types";

import { Reveal } from "@/components/visual/motion";

import FeaturedVenture from "./FeaturedVenture";
import VentureCard from "./VentureCard";

function VenturesPageLoader() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="animate-pulse">
          <div className="min-h-[30rem] rounded-[2rem] bg-muted" />

          <div className="mt-24 sm:mt-28 lg:mt-32">
            <div className="max-w-2xl">
              <div className="h-3 w-32 rounded bg-muted" />

              <div className="mt-5 h-12 w-3/4 rounded-lg bg-muted" />

              <div className="mt-5 h-5 w-full max-w-xl rounded bg-muted" />
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
              <div className="h-72 rounded-2xl bg-muted" />
              <div className="h-72 rounded-2xl bg-muted" />
              <div className="h-72 rounded-2xl bg-muted" />
              <div className="h-72 rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VenturesPageError() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center">
          <p className="text-sm font-medium text-ink">
            Unable to load ventures.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </div>
    </section>
  );
}

function VenturesPageEmpty() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-dashed border-black/10 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No ventures are currently available.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function VenturesPageContent() {
  const { data, isLoading, isError } = useFetch<IVenture[]>(
    "/ventures/get-all",
  );

  const ventures = data ?? [];

  const featuredVenture = useMemo(
    () => ventures.filter((venture) => venture.featured),
    [ventures],
  );

  const otherVentures = useMemo(
    () => ventures.filter((venture) => !venture.featured),
    [ventures],
  );

  if (isLoading) {
    return <VenturesPageLoader />;
  }

  if (isError) {
    return <VenturesPageError />;
  }

  if (ventures.length === 0) {
    return <VenturesPageEmpty />;
  }

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Featured venture */}
        {featuredVenture.length > 0 &&
          featuredVenture.map((featuredVenture, index) => (
            <Reveal key={featuredVenture._id} delay={index * 0.08}>
              <div className="mt-8">
                <FeaturedVenture venture={featuredVenture} />
              </div>
            </Reveal>
          ))}

        {/* Other ventures */}
        {otherVentures.length > 0 && (
          <div className="mt-24 sm:mt-28 lg:mt-32">
            <Reveal>
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
                  <span className="h-px w-10 bg-indigo" />
                  Across the Group
                </p>

                <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Businesses built for the long term.
                </h2>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Each venture brings a distinct focus while
                  contributing to the broader direction of GM Group.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {otherVentures.map((venture, index) => (
                <Reveal key={venture._id} delay={index * 0.08}>
                  <VentureCard venture={venture} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
