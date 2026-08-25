"use client";

import { useMemo } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import { Reveal } from "@/components/visual/motion";

import { IVenture } from "@/types";

import { ArrowUpRight } from "lucide-react";

import Link from "next/link";

import { FeaturedVentureCard } from "./FeaturedVentureCard";

import { SmallVentureCard } from "./SmallVentureCard";
import VentureSectionLoader from "./VentureLoader";

function chunkVentures(items: IVenture[], size: number) {
  const chunks: IVenture[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
}

export default function Ventures() {
  const { data, isLoading, isError } = useFetch<IVenture[]>(
    "/ventures/get-all",
  );

  const ventures = data ?? [];

  const ventureGroups = useMemo(
    () => chunkVentures(ventures, 3),
    [ventures],
  );

  if (isLoading) {
    return <VentureSectionLoader />;
  }

  if (isError || ventures.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
                02 — Ventures
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
                Our Ventures
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-mutedText text-pretty">
                Businesses built, managed and grown under GM Group.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <Link
              href="/ventures"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-indigo"
            >
              View All Ventures
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Dynamic venture portfolio */}
        <div className="space-y-6 lg:space-y-8">
          {ventureGroups.map((group, groupIndex) => {
            const reversed = groupIndex % 2 === 1;

            const first = group[0];
            const second = group[1];
            const third = group[2];

            return (
              <div
                key={`venture-group-${groupIndex}`}
                className="grid gap-6 lg:grid-cols-12 lg:gap-8"
              >
                {reversed ? (
                  <>
                    {/* Small ventures — left */}
                    <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-8">
                      {first && <SmallVentureCard venture={first} />}

                      {third && <SmallVentureCard venture={third} />}
                    </div>

                    {/* Featured venture — right */}
                    {second && (
                      <FeaturedVentureCard
                        venture={second}
                        className="lg:col-span-7"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {/* Featured venture — left */}
                    {first && (
                      <FeaturedVentureCard
                        venture={first}
                        className="lg:col-span-7"
                      />
                    )}

                    {/* Small ventures — right */}
                    <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-8">
                      {second && (
                        <SmallVentureCard venture={second} />
                      )}

                      {third && <SmallVentureCard venture={third} />}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
