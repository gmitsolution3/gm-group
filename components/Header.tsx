"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
    { label: "Ventures", href: "#" },
    { label: "Industries", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/40 via-black/30 to-transparent backdrop-blur-sm">
      {/* Secondary Top Navigation */}
      <div className="hidden md:block border-b border-amber-500/20">
        <div className="px-6 sm:px-8 lg:px-12 py-3">
          <nav className="flex items-center justify-end gap-8">
            {secondaryMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-xs font-medium hover:text-amber-400 transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <Link href="/" className="text-2xl font-bold">
              <div className="flex flex-col">
                <span className="text-amber-400 font-semibold tracking-wide">
                  betopia
                </span>
                <span className="text-white text-[0.5rem] tracking-[0.15em] font-semibold">
                  GROUP
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu and CTA Button */}
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-12">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white text-sm font-semibold hover:text-amber-400 transition-colors duration-300 tracking-wide"
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
            className="md:hidden text-white hover:text-amber-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
