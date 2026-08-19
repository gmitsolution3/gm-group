import { Reveal } from "@/components/visual/motion";

import { ventures } from "@/content/ventures";

import FeaturedVenture from "@/components/ventures/FeaturedVenture";
import VentureCard from "@/components/ventures/VentureCard";
import VenturesCta from "@/components/ventures/VenturesCta";
import VenturesHero from "@/components/ventures/VenturesHero";

export const metadata = {
  title: "Ventures",
  description: "Businesses built, managed and grown under GM Group.",
  alternates: {
    canonical: "/ventures",
  },
};

export default function VenturesPage() {
  const featuredVenture = ventures.find(
    (venture) => venture.featured,
  );

  const otherVentures = ventures.filter(
    (venture) => !venture.featured,
  );

  return (
    <main>
      <VenturesHero />

      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Featured venture */}
          {featuredVenture && (
            <Reveal>
              <FeaturedVenture venture={featuredVenture} />
            </Reveal>
          )}

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

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
                {otherVentures.map((venture, index) => (
                  <Reveal key={venture.slug} delay={index * 0.08}>
                    <VentureCard venture={venture} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <VenturesCta />
    </main>
  );
}
