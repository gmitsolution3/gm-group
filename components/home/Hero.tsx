"use client";

import { VisualIdentity } from "@/components/visual/visual-identity";
import { heroContent } from "@/content/company";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative grain min-h-[100svh] bg-ink text-white">
      <VisualIdentity variant="hero" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 pb-24 pt-20 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-indigo" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
            Parent Company · Multi-Industry Group
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-[16ch] font-display text-display tracking-tightest text-balance">
          {heroContent.headline.map((line, i) => {
            const words = line.split(" ");
            const lastWord = words[words.length - 1];
            const beginning = words.slice(0, -1).join(" ");

            return (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.9,
                    delay: 0.2 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {i === 0 ? (
                    <>
                      {beginning && `${beginning} `}

                      <span className="text-white/40">
                        {lastWord}
                      </span>
                    </>
                  ) : (
                    <>
                      {beginning && `${beginning} `}

                      <span className="relative inline-block">
                        <span className="relative z-10 text-yellow">
                          {lastWord}
                        </span>

                        <motion.span
                          className="absolute -bottom-1 left-0 h-3 w-full bg-indigo/30 blur-md"
                          initial={reduce ? false : { scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: 1.1,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ originX: 0 }}
                        />
                      </span>
                    </>
                  )}
                </motion.span>
              </span>
            );
          })}
        </h1>

        {/* Support text */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-white/60"
        >
          {heroContent.supportText}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href={heroContent.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-indigo hover:text-white"
          >
            {heroContent.primaryCta.label}

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href={heroContent.secondaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full px-2 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            {heroContent.secondaryCta.label}

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>

          <motion.div
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-4 w-4 text-white/40" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}