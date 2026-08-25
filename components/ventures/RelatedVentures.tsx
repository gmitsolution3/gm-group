import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/visual/motion";

import { IVenture } from "@/types";

import VentureLogo from "./VentureLogo";
import VentureCard from "./VentureCard";

type RelatedVenturesProps = {
  ventures: IVenture[];
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
          {ventures.map((venture, index) => (
            <Reveal
              key={venture._id}
              delay={index * 0.08}
            >
              <VentureCard venture={venture} key={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}