"use client";

import { Reveal } from "@/components/visual/motion";
import { leaders, type Leader } from "@/content/leadership";

const accentStyles: Record<Leader["accent"], { color: string; background: string }> = {
  indigo: { color: "#5b5fef", background: "#5b5fef" },
  teal: { color: "#00bfa6", background: "#00bfa6" },
  yellow: { color: "#c58b00", background: "#ffd23f" },
  coral: { color: "#f43f5e", background: "#f43f5e" },
};

function LeaderVisual({ leader, featured }: { leader: Leader; featured: boolean }) {
  const accent = accentStyles[leader.accent];
  const initial = leader.name.replace(/[\[\]]/g, "").trim().charAt(0) || "?";

  return (
    <div
      className={`relative mb-6 overflow-hidden rounded-xl ${featured ? "h-56 sm:h-72" : "h-32"}`}
      style={{ background: `linear-gradient(135deg, ${accent.background}28, ${accent.background}08)` }}
      aria-hidden="true"
    >
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-40 blur-xl" style={{ backgroundColor: accent.background }} />
      <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full opacity-25 blur-xl" style={{ backgroundColor: accent.background }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${featured ? "text-7xl" : "text-5xl"} font-display font-extrabold tracking-tightest opacity-30`} style={{ color: accent.color }}>{initial}</span>
      </div>
    </div>
  );
}

export default function LeadershipProfiles() {
  return (
    <section className="bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {leaders.map((leader, index) => {
            const featured = index === 0;
            const accent = accentStyles[leader.accent];

            return (
              <Reveal key={leader.slug} delay={index * 0.05} className={featured ? "lg:col-span-2 lg:row-span-2" : undefined}>
                <article className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] ${featured ? "lg:min-h-[520px] lg:p-10" : "lg:min-h-[240px]"}`}>
                  <LeaderVisual leader={leader} featured={featured} />
                  <div className="mt-auto">
                    <h2 className="font-display text-xl font-bold tracking-tightest text-ink lg:text-2xl">{leader.name}</h2>
                    <p className="mt-1 text-sm font-semibold" style={{ color: accent.color }}>{leader.position}</p>
                    {featured && <p className="mt-5 max-w-md text-base leading-relaxed text-mutedText text-pretty">{leader.bio}</p>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
