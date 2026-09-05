"use client";

import Earth, { type GlobeMarker } from "@/components/ui/globe";
import { Reveal } from "@/components/visual/motion";
import ReactCountryFlag from "react-country-flag";

const countries = [
  {
    name: "Bangladesh",
    location: "Dhaka",
    code: "BD",
    coordinates: [23.8103, 90.4125] as [number, number],
  },
  {
    name: "China",
    location: "Beijing",
    code: "CN",
    coordinates: [39.9042, 116.4074] as [number, number],
  },
  {
    name: "Malaysia",
    location: "Kuala Lumpur",
    code: "MY",
    coordinates: [3.139, 101.6869] as [number, number],
  },
  {
    name: "Thailand",
    location: "Bangkok",
    code: "TH",
    coordinates: [13.7563, 100.5018] as [number, number],
  },
];

const markers: GlobeMarker[] = countries.map((country) => ({
  location: country.coordinates,
  size: 0.08,
}));

export default function GlobalPresence() {
  return (
    <section className="relative overflow-hidden bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-2xl lg:mb-24">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
              09 — Global Presence
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-h2 tracking-tightest text-ink text-balance">
              Growing Beyond{" "}
              <span className="text-indigo">Borders.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-mutedText text-pretty">
              GM Group operates across borders, connecting people,
              businesses, and opportunities through a growing network
              of services and international operations.
            </p>
          </Reveal>
        </div>

        {/* Countries */}
        <div className="border-t border-black/[0.08]">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {countries.map((country, index) => (
              <Reveal key={country.name} delay={0.05 + index * 0.05}>
                <div
                  className={`group flex items-center gap-5 border-b border-black/[0.08] py-7 transition-colors duration-500 hover:bg-white sm:px-4 lg:border-b-0 lg:py-8 ${
                    index < countries.length - 1
                      ? "lg:border-r lg:border-black/[0.08]"
                      : ""
                  }`}
                >
                  {/* Flag */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl ring-1 ring-black/[0.06] transition-transform duration-500 group-hover:scale-110">
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                      }}
                      title={country.name}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <p className="font-display text-xl font-bold tracking-tightest text-ink">
                      {country.name}
                    </p>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-mutedText">
                      {country.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Globe */}
        <Reveal delay={0.2}>
          <div className="relative mx-auto mt-16 flex h-[330px] max-w-3xl items-center justify-center overflow-hidden sm:mt-20 sm:h-[420px] lg:h-[500px]">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/[0.035] blur-3xl sm:h-[360px] sm:w-[360px]" />

            {/* Globe */}
            <Earth
              theta={0.3}
              phi={0.95}
              dark={0}
              scale={1.05}
              diffuse={1.2}
              mapSamples={40000}
              mapBrightness={6}
              baseColor={[1, 1, 1]}
              markerColor={[0.31, 0.4, 0.85]}
              glowColor={[1, 1, 1]}
              markers={markers}
              rotationSpeed={0.005}
              className="relative h-[330px] w-[330px] sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]"
            />
          </div>
        </Reveal>

        {/* Bottom statement */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-8 max-w-2xl border-t border-black/[0.08] pt-8 text-center">
            <p className="text-sm leading-relaxed text-mutedText sm:text-base">
              Our growing international presence reflects a shared
              ambition to create opportunities and deliver services
              wherever people and businesses need them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
