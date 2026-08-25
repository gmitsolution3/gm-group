import { Reveal } from "@/components/visual/motion";

import { IVenture } from "@/types";

import { ventureAccentMap } from "@/content/ventures";

type VentureOverviewProps = {
  venture: IVenture;
};

export default function VentureOverview({
  venture,
}: VentureOverviewProps) {
  const accent = ventureAccentMap[venture.accent];

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Main description */}
          <div>
            <Reveal>
              <p
                className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${accent.text}`}
              >
                <span className={`h-px w-10 ${accent.bg}`} />
                About the Venture
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {venture.tagline}
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-ink/80 sm:text-lg">
                {venture.shortDescription}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {venture.description}
              </p>
            </Reveal>
          </div>

          {/* Key information */}
          <Reveal delay={0.15} className="lg:pt-1">
            <div className="rounded-2xl border border-black/8 bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Key Information
              </p>

              <dl className="mt-6 divide-y divide-black/8">
                {venture.keyInfo.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {item.label}
                    </dt>

                    <dd className="text-right text-sm font-semibold text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
