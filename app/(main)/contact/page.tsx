import ContactForm from "@/components/contact/ContactForm";
import ContactInformation from "@/components/contact/ContactInformation";
import { Reveal, RevealWords } from "@/components/visual/motion";
import { VisualIdentity } from "@/components/visual/visual-identity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with GM Group about partnerships, press, careers, investment, or general inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[62svh] overflow-hidden bg-ink text-white grain">
        <VisualIdentity variant="hero" />
        <div className="relative mx-auto flex min-h-[62svh] max-w-[1400px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <Reveal><p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"><span className="h-px w-12 bg-indigo" />Contact</p></Reveal>
          <h1 className="mt-8 font-display text-display tracking-tightest text-balance"><RevealWords text="Let’s Connect." className="block w-full" highlightIndices={[1]} highlightClass="text-indigo" delay={0.1} /></h1>
          <Reveal delay={0.28}><p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty sm:text-xl">Have a question, a partnership idea, or want to learn more about GM Group? We&apos;d like to hear from you.</p></Reveal>
        </div>
      </section>
      <section className="bg-canvas py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"><div className="grid gap-12 lg:grid-cols-[0.5fr_1fr] lg:gap-20"><ContactInformation /><ContactForm /></div></div>
      </section>
    </>
  );
}
