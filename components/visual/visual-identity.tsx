'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { HTMLAttributes } from 'react';

type Variant = 'hero' | 'section' | 'footer' | 'minimal';

interface VisualIdentityProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  interactive?: boolean;
}

/**
 * Abstract visual system inspired by the GM Group logo —
 * layered, translucent, fluid forms with controlled color.
 * Not a single blob: a composed scene with depth.
 */
export function VisualIdentity({
  variant = 'hero',
  interactive = false,
  className,
  ...props
}: VisualIdentityProps) {
  const reduce = useReducedMotion();

  const float = (delay = 0, range = 20) =>
    reduce
      ? {}
      : {
          animate: {
            y: [0, -range, 0],
            x: [0, range * 0.4, 0],
          },
          transition: {
            duration: 14 + Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay,
          },
        };

  if (variant === 'minimal') {
    return (
      <div className={`pointer-events-none relative ${className ?? ''}`} {...props}>
        <motion.div
          {...float(0, 12)}
          className="absolute -left-8 top-0 h-32 w-32 rounded-full bg-indigo/30 blur-3xl"
        />
        <motion.div
          {...float(2, 16)}
          className="absolute right-0 top-10 h-24 w-24 rounded-full bg-teal/25 blur-2xl"
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} {...props}>
        <motion.div
          {...float(0, 15)}
          className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-indigo/20 blur-3xl"
        />
        <motion.div
          {...float(3, 20)}
          className="absolute -bottom-10 right-1/4 h-48 w-48 rounded-full bg-teal/15 blur-3xl"
        />
        <motion.div
          {...float(1, 18)}
          className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-coral/10 blur-3xl"
        />
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <div className={`pointer-events-none relative overflow-hidden ${className ?? ''}`} {...props}>
        <motion.div
          {...float(0, 18)}
          className="absolute left-0 top-0 h-48 w-48 rounded-[40%] bg-indigo/25 blur-2xl rotate-12"
        />
        <motion.div
          {...float(2, 22)}
          className="absolute right-10 top-10 h-40 w-40 rounded-[45%] bg-teal/20 blur-2xl -rotate-12"
        />
        <motion.div
          {...float(4, 14)}
          className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-yellow/15 blur-2xl"
        />
      </div>
    );
  }

  // Hero — the full composition
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
      {...props}
    >
      {/* Layer 1 — large indigo field */}
      <motion.div
        {...float(0, 30)}
        className="absolute -right-20 -top-10 h-[55vh] w-[55vh] rounded-[42%] bg-gradient-to-br from-indigo/40 to-indigo/10 blur-2xl rotate-12 mix-blend-screen"
      />
      {/* Layer 2 — teal flowing form */}
      <motion.div
        {...float(2, 35)}
        className="absolute right-1/4 top-1/4 h-[40vh] w-[40vh] rounded-[48%] bg-gradient-to-tr from-teal/35 to-teal/10 blur-2xl -rotate-6 mix-blend-screen"
      />
      {/* Layer 3 — yellow accent */}
      <motion.div
        {...float(1, 25)}
        className="absolute -right-10 bottom-1/4 h-[30vh] w-[30vh] rounded-[50%] bg-gradient-to-bl from-yellow/30 to-yellow/5 blur-xl mix-blend-screen"
      />
      {/* Layer 4 — coral depth */}
      <motion.div
        {...float(3, 28)}
        className="absolute right-1/3 bottom-0 h-[35vh] w-[35vh] rounded-[44%] bg-gradient-to-tl from-coral/25 to-coral/5 blur-2xl rotate-6 mix-blend-screen"
      />
      {/* Sharp translucent rings */}
      <motion.div
        {...float(1.5, 20)}
        className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full border border-white/10"
      />
      <motion.div
        {...float(4, 24)}
        className="absolute right-1/3 top-1/4 h-96 w-96 rounded-full border border-white/[0.06]"
      />
      {/* Small sharp accent dot */}
      <motion.div
        {...float(2.5, 16)}
        className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-yellow shadow-[0_0_30px_8px_rgba(255,210,63,0.4)]"
      />
    </div>
  );
}
