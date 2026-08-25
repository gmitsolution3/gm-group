import { Reveal } from "@/components/visual/motion";

import { IVenture } from "@/types";

import { ventureAccentMap } from "@/content/ventures";

type VentureDetailContentProps = {
  venture: IVenture;
};

export default function VentureDetailContent({
  venture,
}: VentureDetailContentProps) {
  const accent = ventureAccentMap[venture.accent];

  return (
    <section className="border-t border-black/5 bg-muted/20 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p
              className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${accent.text}`}
            >
              <span className={`h-px w-10 ${accent.bg}`} />
              What It Does
            </p>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {venture.whatItDoes}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${accent.text}`}
            >
              <span className={`h-px w-10 ${accent.bg}`} />
              Role Within GM Group
            </p>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {venture.roleInGroup}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
