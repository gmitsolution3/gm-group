import type { Metadata } from "next";

import TermsHero from "@/components/legal/TermsHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for GM Group.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <TermsHero />

      <section className="bg-canvas py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[700px] px-5 sm:px-8">
          <div className="space-y-8 text-muted-foreground">
            <p className="text-lg leading-relaxed text-ink">
              [PLACEHOLDER] This is a placeholder terms of service. GM
              Group&apos;s official terms will be provided here.
            </p>

            <p className="leading-relaxed">
              [PLACEHOLDER] This section would describe the terms and
              conditions for using the GM Group website.
            </p>

            <p className="leading-relaxed">
              [PLACEHOLDER] This section would describe intellectual
              property rights.
            </p>

            <p className="leading-relaxed">
              [PLACEHOLDER] This section would describe limitations of
              liability.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}