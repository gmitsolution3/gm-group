import { ArrowRight } from "lucide-react";
import Link from "next/link";

import VenturesHero from "@/components/ventures/VenturesHero";
import { Reveal } from "@/components/visual/motion";

import { ventures } from "@/content/ventures";

import FeaturedVenture from "@/components/ventures/FeaturedVenture";
import VentureCard from "@/components/ventures/VentureCard";

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

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {featuredVenture && (
            <Reveal>
              <FeaturedVenture venture={featuredVenture} />
            </Reveal>
          )}

          {otherVentures.length > 0 && (
            <div className="mt-20 sm:mt-24">
              <Reveal>
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
                    Across the Group
                  </p>

                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    Businesses built for the long term.
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
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

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-black/5 bg-canvas py-24 sm:py-32 lg:py-40">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-indigo/10 blur-[120px]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-teal/10 blur-[100px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
                Work With Us
              </p>
            </Reveal>

            <h2 className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-tightest text-balance">
              <Reveal>Want to build with GM Group?</Reveal>
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                Explore opportunities to connect, collaborate, and
                build something meaningful together.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-indigo"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
