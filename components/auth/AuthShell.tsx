"use client";

import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { Logo } from "@/components/visual/logo";

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export function AuthShell({
  children,
  title,
  description,
  backHref = "/",
  backLabel = "Back to GM Group",
}: AuthShellProps) {
  const reduce = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white grain">
      {/* Ambient visual identity */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          {...(reduce
            ? {}
            : {
                animate: {
                  x: [0, 35, 0],
                  y: [0, -25, 0],
                  scale: [1, 1.08, 1],
                },
                transition: {
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
          className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-indigo/20 blur-[120px]"
        />

        <motion.div
          {...(reduce
            ? {}
            : {
                animate: {
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.1, 1],
                },
                transition: {
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
          className="absolute -right-32 bottom-10 h-[460px] w-[460px] rounded-full bg-teal/15 blur-[120px]"
        />

        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-yellow/10 blur-[100px]" />
      </div>

      {/* Top navigation */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" aria-label="GM Group home">
          <Logo variant="light" />
        </Link>

        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {backLabel}
        </Link>
      </div>

      {/* Main */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1400px] items-center justify-center px-5 py-16 sm:px-8 lg:px-12">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
              GM Group
            </p>

            <h1 className="font-display text-4xl font-extrabold tracking-tightest sm:text-5xl">
              {title}
            </h1>

            {description && (
              <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-white/50">
                {description}
              </p>
            )}
          </div>

          {/* Form surface */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
            {children}
          </div>

          <p className="mt-8 text-center text-xs text-white/30">
            Building businesses. Growing possibilities.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
