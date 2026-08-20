import type { Metadata } from "next";

import PrivacyHero from "@/components/legal/PrivacyHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for GM Group.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PrivacyHero />

      <section className="bg-canvas py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[700px] px-5 sm:px-8">
          <div className="space-y-8 text-muted-foreground">
            <p className="text-lg leading-relaxed text-ink">
              [PLACEHOLDER] This is a placeholder privacy policy. GM
              Group&apos;s official privacy policy will be provided
              here.
            </p>

            <p className="leading-relaxed">
              [PLACEHOLDER] This section would describe how GM Group
              collects, uses, and protects personal information.
            </p>

            <p className="leading-relaxed">
              [PLACEHOLDER] This section would describe user rights
              regarding their data.
            </p>

            <p className="leading-relaxed">
              [PLACEHOLDER] This section would provide contact
              information for privacy-related inquiries.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
