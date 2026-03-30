"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSecondary, setShowSecondary] = useState(true);
  const lastScrollY = useRef(0);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 50) {
        setShowSecondary(false);
      } else {
        setShowSecondary(true);
      }

      lastScrollY.current = currentY;
      setIsScrolled(currentY > 100);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const secondaryMenuItems = [
    { label: "Tech Recruitment Program", href: "#" },
    { label: "News & Media", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Sitemap", href: "#" },
  ];

  const menuItems = [
    { label: "Vision 2030", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Leadership", href: "#" },
    { label: "Ventures", href: "/ventures" },
    { label: "Industries", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${pathname !== "/" || isScrolled ? "bg-black" : "bg-gradient-to-b from-black/40 via-black/30 to-transparent"} pb-10`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center lg:items-start h-20">
          {/* Left: Logo */}
          <div className="group cursor-pointer pt-3">
            <Link href="/">
              <Image
                src="/logo-white.png"
                alt="Betopia Group Logo"
                width={120}
                height={60}
                className="h-auto w-18 lg:w-24 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: All Navigation Content */}
          <div
            className={`basis-3/5 flex flex-col transition-all duration-300 items-end`}
          >
            {/* Secondary Top Navigation */}
            <div
              className={`hidden md:block py-3 pb-5 transition-opacity duration-300 ${showSecondary ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <nav className="flex items-center gap-4">
                {secondaryMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-white/90 text-sm font-medium hover:text-amber-400 transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Main Navigation */}
            <div
              className={`hidden md:flex items-center justify-end gap-12 pt-3 border-t border-white/20 w-full transition-all duration-300 ${!showSecondary ? "border-t-0 pt-0 justify-center -translate-y-5" : ""}`}
            >
              <nav className="flex items-center justify-end gap-12">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-white/90 text-base font-semibold hover:text-amber-400 transition-colors duration-300 tracking-wide"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="#career"
                className="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/50 text-sm whitespace-nowrap"
              >
                Career
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-amber-400 transition-colors mt-3"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            {secondaryMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-white text-xs font-medium hover:text-amber-400 transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-3 pt-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-white text-sm font-semibold hover:text-amber-400 transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="#career"
              className="block px-8 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full transition-all duration-300 text-center mt-4 text-sm"
            >
              Career
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
