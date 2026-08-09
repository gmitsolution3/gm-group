"use client";

import { RevealWords } from "@/components/visual/motion";
import { careersContent } from "@/content/company";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function CareersCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white grain sm:py-32 lg:py-40">
      {/* Visual energy — yellow and indigo accents */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <motion.div
          {...(reduce
            ? {}
            : {
                animate: {
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                },
                transition: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
          className="absolute -left-20 top-1/4 h-[40vh] w-[40vh] rounded-full bg-indigo/25 blur-[100px]"
        />

        <motion.div
          {...(reduce
            ? {}
            : {
                animate: {
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                },
                transition: {
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                },
              })}
          className="absolute -right-20 bottom-1/4 h-[45vh] w-[45vh] rounded-full bg-yellow/20 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow">
            08 — Careers
          </span>

          <h2 className="mt-6 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-tightest text-balance">
            <RevealWords
              text={careersContent.headline}
              highlightIndices={[
                careersContent.headline.split(" ").length - 1,
              ]}
              highlightClass="text-indigo"
            />
          </h2>

          <p className="mt-8 max-w-xl text-lg text-white/60 text-pretty">
            Join a group building businesses across industries — with
            the ambition, direction, and long-term thinking that
            define GM Group.
          </p>

          <Link
            href="/careers"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-yellow"
          >
            Explore Careers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
