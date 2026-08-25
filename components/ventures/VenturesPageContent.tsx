"use client";

import { useMemo } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import { IVenture } from "@/types";

import { Reveal } from "@/components/visual/motion";

import FeaturedVenture from "./FeaturedVenture";
import VentureCard from "./VentureCard";
import VenturesPageLoader from "./VenturesPageLoader";
import VenturesPageError from "./VenturesPageError";
import VenturesPageEmpty from "./VenturesPageEmpty";

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
