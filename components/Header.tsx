"use client";

import HeaderAccount from "@/components/auth/HeaderAccount";
import { Logo } from "@/components/visual/logo";
import { siteConfig } from "@/content/company";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ArrowRight, LogIn, Menu, UserRound, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = authClient.useSession();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 py-2",
          pathname !== "/" || scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-black/[0.06]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="relative z-10"
            aria-label="GM Group home"
          >
            <Logo
              variant={
                pathname !== "/" || scrolled ? "dark" : "light"
              }
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-4 py-2 text-sm font-medium transition-colors",
                    pathname !== "/" || scrolled
                      ? active
                        ? "text-ink"
                        : "text-mutedText hover:text-ink"
                      : active
                        ? "text-white"
                        : "text-white/70 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-px origin-left transition-transform duration-300",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                      pathname !== "/" || scrolled
                        ? "bg-indigo"
                        : "bg-white",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <HeaderAccount
              variant={
                pathname !== "/" || scrolled ? "dark" : "light"
              }
            />

            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all",
                pathname !== "/" || scrolled
                  ? "bg-ink text-white hover:bg-indigo"
                  : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white hover:text-ink",
              )}
            >
              Let&apos;s Connect
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "relative z-10 inline-flex h-10 w-10 items-center justify-center lg:hidden",
              pathname !== "/" || scrolled || mobileOpen
                ? "text-ink"
                : "text-white",
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNav
            pathname={pathname}
            onClose={() => setMobileOpen(false)}
            reduce={!!reduce}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNav({
  pathname,
  onClose,
  reduce,
}: {
  pathname: string;
  onClose: () => void;
  reduce: boolean;
}) {
  const { data: session } = authClient.useSession();

  return (
    <motion.div
      className="fixed inset-0 z-40 lg:hidden"
      initial={reduce ? { opacity: 0 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-indigo/30 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
      </div>

      <motion.nav
        className="relative flex h-full flex-col justify-center px-8"
        initial={reduce ? {} : { x: 40 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-12 flex items-center">
          <Logo variant="light" />
        </div>
        <ul className="space-y-1">
          {siteConfig.nav.map((item, i) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <motion.li
                key={item.href}
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, x: 30 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + i * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="group flex items-baseline justify-between border-b border-white/10 py-4"
                  onClick={onClose}
                >
                  <span
                    className={cn(
                      "font-display text-3xl font-bold tracking-tightest transition-colors",
                      active
                        ? "text-indigo"
                        : "text-white group-hover:text-indigo",
                    )}
                  >
                    {item.label}
                  </span>
                  <ArrowRight className="h-5 w-5 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-indigo" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          {session?.user ? (
            <Link
              href="/account"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <UserRound className="h-4 w-4" />
              My Account
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}

          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            Let&apos;s Connect
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
