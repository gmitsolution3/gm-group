"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Vision 2030", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Leadership", href: "#" },
    { label: "Ventures", href: "#" },
    { label: "Industries", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 via-black/10 to-transparent">
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <Link href="/" className="text-3xl font-bold">
              <div className="flex flex-col">
                <span className="text-amber-400 font-semibold tracking-wide">
                  betopia
                </span>
                <span className="text-white text-[0.6rem] tracking-[0.15em] font-semibold">
                  GROUP
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu and CTA Button */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-10">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white text-sm font-semibold hover:text-amber-400 transition-colors duration-300 lowercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#career"
              className="hidden sm:inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/50 lowercase tracking-wide text-sm"
            >
              Career
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-amber-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-6 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-white text-sm font-semibold hover:text-amber-400 transition-colors py-2 lowercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#career"
              className="block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg transition-all duration-300 text-center mt-4 lowercase tracking-wide text-sm"
            >
              Career
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
