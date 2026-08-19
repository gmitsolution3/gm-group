import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/visual/motion";
import {
  ventureAccentMap,
  type Venture,
} from "@/content/ventures";

import VentureLogo from "./VentureLogo";

type RelatedVenturesProps = {
  ventures: Venture[];
};

export default function RelatedVentures({
  ventures,
}: RelatedVenturesProps) {
  if (ventures.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/5 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
              <span className="h-px w-10 bg-indigo" />
              More From GM Group
            </p>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Explore more ventures.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ventures.map((venture, index) => {
            const accent = ventureAccentMap[venture.accent];

            return (
              <Reveal
                key={venture.slug}
                delay={index * 0.08}
              >
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="group block rounded-2xl border border-black/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <VentureLogo
                      venture={venture}
                      size="sm"
                    />

                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </div>

                  <p
                    className={`mt-7 text-xs font-semibold uppercase tracking-[0.18em] ${accent.text}`}
                  >
                    {venture.industry}
                  </p>

                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
                    {venture.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {venture.shortDescription}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}