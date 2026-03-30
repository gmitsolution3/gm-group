"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";

const OPTIONS = [
  {
    key: "products",
    title: "Products",
    description:
      "AI-first product ecosystem that powers data workflows, edge automation, and life-scale impact.",
    cards: [
      {
        id: "count-trust",
        title: "Count Trust",
        subtitle: "Supply chain reliability in real-time.",
        text: "A data-backed, AI enabled risk scoring platform that protects margin and trust across procurement pipelines.",
        accent: "bg-emerald-400",
      },
      {
        id: "agentic-ai",
        title: "Agentic AI",
        subtitle: "Autonomous decision automation.",
        text: "Context-aware agents that see across systems, execute operations, and improve with feedback loops.",
        accent: "bg-amber-400",
      },
      {
        id: "talkora-ai",
        title: "Talkora AI",
        subtitle: "Conversational intelligence for enterprises.",
        text: "Multilingual voice and text interface that turns any workflow into a personalized, coach-like experience.",
        accent: "bg-fuchsia-400",
      },
      {
        id: "count-trust-2",
        title: "Count Trust",
        subtitle: "Supply chain reliability in real-time.",
        text: "A data-backed, AI enabled risk scoring platform that protects margin and trust across procurement pipelines.",
        accent: "bg-emerald-400",
      },
      {
        id: "agentic-ai-2",
        title: "Agentic AI",
        subtitle: "Autonomous decision automation.",
        text: "Context-aware agents that see across systems, execute operations, and improve with feedback loops.",
        accent: "bg-amber-400",
      },
      {
        id: "talkora-ai-2",
        title: "Talkora AI",
        subtitle: "Conversational intelligence for enterprises.",
        text: "Multilingual voice and text interface that turns any workflow into a personalized, coach-like experience.",
        accent: "bg-fuchsia-400",
      },
    ],
  },
  {
    key: "services",
    title: "Services",
    description:
      "Consulting, integration, and managed innovation for AI transformation.",
    cards: [
      {
        id: "portfolio-ops",
        title: "Portfolio Ops",
        subtitle: "Diligence to execution at pace.",
        text: "Full-stack program delivery with product-minded engineering, governance and rollout excellence.",
        accent: "bg-cyan-400",
      },
      {
        id: "enterprise-ai",
        title: "Enterprise AI",
        subtitle: "Secure, compliant, scalable adoption.",
        text: "Architecture, model ops, and multi-cloud delivery for enterprise trust and performance.",
        accent: "bg-violet-400",
      },
      {
        id: "insight-labs",
        title: "Insight Labs",
        subtitle: "Rapid experimentation, fast value.",
        text: "Embedded discovery pods that validate concepts in weeks and accelerate strategic roadmaps.",
        accent: "bg-emerald-400",
      },
    ],
  },
  {
    key: "solutions",
    title: "Solutions",
    description:
      "Domain-specific packages for health, energy, finance, and smart cities.",
    cards: [
      {
        id: "humanity-hub",
        title: "Humanity Hub",
        subtitle: "Social impact, measurable outcomes.",
        text: "Platform that routes resources to underserved communities through AI demand-sensing and allocation.",
        accent: "bg-sky-400",
      },
      {
        id: "energy-edge",
        title: "Energy Edge",
        subtitle: "Clean energy orchestration.",
        text: "Demand forecast, grid optimisation, and decentralized asset coordination with predictive controls.",
        accent: "bg-amber-400",
      },
      {
        id: "finance-flow",
        title: "Finance Flow",
        subtitle: "Smart treasury and risk automation.",
        text: "AI-powered working capital, credit, and liquidity management for long-term competitive advantage.",
        accent: "bg-teal-400",
      },
    ],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(OPTIONS[0].key);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selected = useMemo(
    () => OPTIONS.find((o) => o.key === activeTab) ?? OPTIONS[0],
    [activeTab],
  );
  const cards = selected.cards;

  // Update visible cards on mount and resize
  useEffect(() => {
    const updateVisibleCards = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1280)
          setVisibleCards(3); // xl and up
        else if (window.innerWidth >= 1024)
          setVisibleCards(3); // lg
        else if (window.innerWidth >= 768)
          setVisibleCards(2); // md
        else setVisibleCards(1); // sm and below
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () =>
      window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Reset carousel when tab changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeTab]);

  const totalSlides = Math.ceil(cards.length / visibleCards);
  const maxSlideIndex = totalSlides - 1;

  const handlePrev = () =>
    setCarouselIndex((prev) =>
      prev <= 0 ? maxSlideIndex : prev - 1,
    );
  const handleNext = () =>
    setCarouselIndex((prev) =>
      prev >= maxSlideIndex ? 0 : prev + 1,
    );

  // Get slide width percentage based on visible cards
  const getSlideWidth = () => {
    return 100 / visibleCards;
  };

  return (
    <section className="relative overflow-hidden text-white">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/employee.jpg"
          alt="Services background"
          fill
          className="object-cover opacity-90"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto container px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              What we do
            </p>
            <h2 className="mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Asia&#39;s Largest <br className="hidden sm:block" /> AI
              Powerhouse
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-100/90">
              We are not a conglomerate. We are a convergence. As
              Asia's largest AI Powerhouse, we fuse deep tech with
              essential industries providing the code behind the crop
              and the intelligence powering the vital needs of
              humanity.
            </p>
          </div>
          <button className="self-start rounded-full border border-white/40 bg-white/10 px-5 sm:px-7 py-2.5 sm:py-3.5 text-sm font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/60">
            Learn More →
          </button>
        </div>

        {/* Two Column Layout: Sidebar + Carousel Section */}
        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-20 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar Tabs - Desktop */}
          <aside className="hidden lg:block rounded-2xl border border-white/20 bg-white/5 p-1.5 backdrop-blur-lg h-fit sticky top-24">
            <div className="px-3 pt-4 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-200/90">
                Explore
              </h3>
            </div>
            <ul className="mt-2 space-y-1.5 p-2">
              {OPTIONS.map((option) => (
                <li key={option.key}>
                  <button
                    onClick={() => {
                      setActiveTab(option.key);
                    }}
                    className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left text-base font-semibold transition-all duration-200 ${
                      option.key === activeTab
                        ? "bg-cyan-500/25 shadow-lg"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                    style={
                      option.key === activeTab
                        ? { background: "rgba(6, 182, 212, 0.25)" }
                        : {}
                    }
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-lg shadow-sm">
                      {option.key === "products"
                        ? "📦"
                        : option.key === "services"
                          ? "⚙️"
                          : "🧩"}
                    </span>
                    <span
                      className={
                        option.key === activeTab ? "text-white" : ""
                      }
                    >
                      {option.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mobile Tab Selector */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 px-5 py-3 backdrop-blur-lg"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/30 bg-white/10">
                  {activeTab === "products"
                    ? "📦"
                    : activeTab === "services"
                      ? "⚙️"
                      : "🧩"}
                </span>
                <span className="font-semibold">
                  {OPTIONS.find((o) => o.key === activeTab)?.title}
                </span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isMobileMenuOpen && (
              <div className="mt-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg p-2">
                {OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setActiveTab(option.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                      option.key === activeTab
                        ? "bg-cyan-500/25"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/30 bg-white/10">
                      {option.key === "products"
                        ? "📦"
                        : option.key === "services"
                          ? "⚙️"
                          : "🧩"}
                    </span>
                    <span className="font-medium">
                      {option.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="space-y-4 sm:space-y-6">

            {/* Carousel Section */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-4 sm:p-5 backdrop-blur-lg">
              {/* Navigation Buttons */}
              <div className="absolute right-3 sm:right-5 top-3 sm:top-5 z-20 flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 bg-black/50 text-base sm:text-lg font-bold text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95"
                  aria-label="Previous card"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 bg-black/50 text-base sm:text-lg font-bold text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95"
                  aria-label="Next card"
                >
                  ›
                </button>
              </div>

              {/* Carousel Track */}
              <div className="mt-8 sm:mt-10 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${carouselIndex * getSlideWidth()}%)`,
                  }}
                >
                  {cards.map((card, idx) => (
                    <div
                      key={`${card.id}-${idx}`}
                      style={{ width: `${getSlideWidth()}%` }}
                      className="flex-shrink-0 px-2 sm:px-3"
                    >
                      <div className="h-full rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 md:p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
                        <div
                          className={`inline-flex self-start rounded-full px-3 sm:px-4 py-1 text-xs font-extrabold tracking-wide text-gray-900 shadow-sm ${card.accent}`}
                        >
                          {card.subtitle}
                        </div>
                        <h4 className="mt-3 sm:mt-4 md:mt-5 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white">
                          {card.title}
                        </h4>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-100/90">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Pagination */}
              {totalSlides > 1 && (
                <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-2.5">
                  {Array.from({ length: totalSlides }, (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-200 ${
                        idx === carouselIndex
                          ? "scale-110 bg-cyan-300"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
