'use client';

import { motion, useReducedMotion } from 'motion/react';
import { groupIdentity } from '@/content/company';
import { RevealWords } from '@/components/visual/motion';

export default function GroupIdentity() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Asymmetric layout: large text offset right, small label left */}
        <div className="grid gap-12 lg:grid-cols-[0.4fr_1.6fr] lg:gap-20">
          {/* Left rail — label */}
          <div className="lg:pt-6">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-28"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
                01 — Identity
              </span>
              <p className="mt-4 text-sm leading-relaxed text-mutedText max-w-xs">
                {groupIdentity.supportText}
              </p>
            </motion.div>
          </div>

          {/* Right — giant typography */}
          <div className="lg:pl-8">
            <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tightest text-ink">
              {groupIdentity.lines.map((line, i) => {
                const words = line.split(' ');
                const highlightWord = words.length > 1 ? words.length - 1 : 0;
                return (
                  <span key={i} className="block">
                    <RevealWords
                      text={line}
                      delay={i * 0.15}
                      highlightIndices={[highlightWord]}
                      highlightClass="text-indigo"
                    />
                  </span>
                );
              })}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
