"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

import { Reveal, RevealWords } from "@/components/visual/motion";
import { VisualIdentity } from "@/components/visual/visual-identity";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white grain">
      <VisualIdentity variant="hero" />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
            <span className="h-px w-12 bg-coral" />
            Something Went Wrong
          </p>
        </Reveal>

        <h1 className="mt-8 max-w-5xl font-display text-display tracking-tightest text-balance">
          <RevealWords
            text="We hit a roadblock."
            delay={0.1}
            highlightIndices={[3]}
            highlightClass="text-coral"
          />
        </h1>

        <Reveal delay={0.28}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty sm:text-xl">
            Something unexpected happened while loading this page. You can
            try again or return to the GM Group homepage.
          </p>
        </Reveal>

        <Reveal
          delay={0.4}
          className="mt-10 flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={() => reset()}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-yellow"
          >
            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
            Try Again
          </button>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Reveal>
      </div>
    </main>
  );
}