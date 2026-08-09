import { VisualIdentity } from "@/components/visual/visual-identity";
import { siteConfig } from "@/content/company";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from '@/components/visual/logo';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white grain">
      <VisualIdentity variant="footer" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        {/* Top — brand statement */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Link href="/" aria-label="GM Group home">
              <Logo variant={"light"} />
            </Link>
            <p className="mt-8 max-w-md font-display text-3xl font-bold leading-tight tracking-tightest text-balance">
              Building businesses.
              <br />
              <span className="text-white/50">
                Growing possibilities.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Navigation
              </p>
              <ul className="mt-5 space-y-3">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Corporate
              </p>
              <ul className="mt-5 space-y-3">
                {siteConfig.corporateLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Connect
              </p>
              <ul className="mt-5 space-y-3">
                {siteConfig.social.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            © 2026 GM Group. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            {siteConfig.coreConcept}
          </p>
        </div>
      </div>
    </footer>
  );
}
