"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Loading() {
  const reduce = useReducedMotion();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink text-white grain">
      {/* Ambient visual identity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/10 blur-3xl" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-indigo/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-center px-5 py-24 sm:px-8 lg:px-12">
        {/* Brand */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            {/* Outer ring */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-white/10"
              animate={
                reduce
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Accent ring */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-1 rounded-full border border-indigo/30 border-t-indigo"
              animate={
                reduce
                  ? undefined
                  : {
                      rotate: -360,
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* GM mark */}
            <span className="font-display text-lg font-extrabold tracking-[-0.08em] text-white">
              GM
            </span>
          </div>

          {/* Loading indicator */}
          <div className="mt-10 w-40">
            <div className="relative h-px overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/3 bg-indigo"
                initial={{ x: "-100%" }}
                animate={
                  reduce
                    ? { x: 0 }
                    : {
                        x: ["-100%", "300%"],
                      }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.25,
              duration: 0.5,
            }}
            className="mt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40"
          >
            GM Group
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="mt-2 text-xs text-white/25"
          >
            Loading
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}