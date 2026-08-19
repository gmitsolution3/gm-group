"use client";

import { Reveal } from "@/components/visual/motion";
import { siteConfig } from "@/content/company";

export const inquiryTypes = ["General", "Partnership", "Press / Media", "Careers", "Investment"] as const;

export default function ContactInformation() {
  return (
    <aside className="space-y-12">
      <Reveal>
        <section aria-labelledby="contact-information-heading"><p id="contact-information-heading" className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">Contact Information</p><dl className="mt-6 space-y-5"><div><dt className="text-sm text-mutedText">Email</dt><dd className="mt-1 font-display text-lg font-semibold tracking-tightest text-ink"><a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-indigo">{siteConfig.contact.email}</a></dd></div><div><dt className="text-sm text-mutedText">Phone</dt><dd className="mt-1 font-display text-lg font-semibold tracking-tightest text-ink"><a href={`tel:${siteConfig.contact.phone}`} className="transition-colors hover:text-indigo">{siteConfig.contact.phone}</a></dd></div><div><dt className="text-sm text-mutedText">Address</dt><dd className="mt-1 font-display text-lg font-semibold tracking-tightest text-ink">{siteConfig.contact.address}</dd></div></dl></section>
      </Reveal>
      <Reveal delay={0.08}>
        <section aria-labelledby="inquiry-types-heading"><p id="inquiry-types-heading" className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">Inquiry Types</p><ul className="mt-6 space-y-3">{inquiryTypes.map((type) => <li key={type} className="flex items-center gap-3 text-ink"><span className="h-2 w-2 rounded-full bg-indigo" />{type}</li>)}</ul></section>
      </Reveal>
    </aside>
  );
}
