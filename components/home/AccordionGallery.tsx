"use client";

import { Reveal } from "@/components/visual/motion";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Gallery, { GalleryItem } from "../ui/gallery";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
    title: "Misty Mountain Majesty",
    description:
      "A breathtaking view of misty mountains shrouded in clouds, creating an ethereal landscape.",
    tags: ["Misty", "Mountains", "Clouds", "Ethereal", "Landscape"],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
    title: "Winter Wonderland",
    description:
      "A serene winter scene with snow-covered trees and mountains, showcasing nature's pristine beauty.",
    tags: ["Winter", "Snow", "Trees", "Mountains", "Serene"],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
    title: "Autumn Mountain Retreat",
    description:
      "A cozy cabin nestled in the mountains, surrounded by the vibrant colors of autumn foliage.",
    tags: ["Autumn", "Cabin", "Mountains", "Foliage", "Cozy"],
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?q=80&w=1200&auto=format",
    title: "Tranquil Lake Reflection",
    description:
      "A calm mountain lake perfectly reflecting the surrounding peaks and sky, creating a mirror-like surface.",
    tags: ["Lake", "Reflection", "Mountains", "Tranquil", "Mirror"],
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
    title: "Misty Mountain Peaks",
    description:
      "Majestic mountain peaks emerging from a sea of clouds, showcasing nature's grandeur.",
    tags: ["Misty", "Peaks", "Clouds", "Majestic", "Nature"],
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=1200&auto=format",
    title: "Golden Hour Glow",
    description:
      "A stunning mountain landscape bathed in the warm light of the golden hour, highlighting every contour.",
    tags: ["Golden Hour", "Mountains", "Landscape", "Warm", "Scenic"],
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format",
    title: "Snowy Mountain Highway",
    description:
      "A winding road cutting through a snowy mountain landscape, inviting adventure and exploration.",
    tags: ["Snow", "Road", "Mountains", "Winter", "Adventure"],
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1709949908219-fd9046282019?q=80&w=1200&auto=format",
    title: "Foggy Mountain Forest",
    description:
      "A mysterious and enchanting forest shrouded in fog, with mountains looming in the background.",
    tags: ["Fog", "Forest", "Mountains", "Mysterious", "Enchanting"],
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=1200&auto=format",
    title: "Sunset Mountain Silhouette",
    description:
      "A dramatic silhouette of mountain peaks against a vibrant sunset sky, creating a stunning contrast.",
    tags: ["Sunset", "Silhouette", "Mountains", "Dramatic", "Sky"],
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1462989856370-729a9c1e2c91?q=80&w=1200&auto=format",
    title: "Alpine Meadow Bliss",
    description:
      "A lush alpine meadow dotted with wildflowers, set against a backdrop of towering mountain peaks.",
    tags: [
      "Alpine",
      "Meadow",
      "Wildflowers",
      "Mountains",
      "Peaceful",
    ],
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=1200&auto=format",
    title: "Mountain Lake Serenity",
    description:
      "A serene mountain lake surrounded by pine forests, reflecting the calm beauty of the wilderness.",
    tags: ["Lake", "Mountains", "Forest", "Reflection", "Serenity"],
  },
];

export default function AccordionGallery() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(2);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("overflow-hidden");
      return;
    }

    document.body.classList.add("overflow-hidden");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const activeItem = galleryItems[index];

  return (
    <section className="relative bg-canvas py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mutedText">
              06 — Explore The Group
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-h2 tracking-tightest text-ink text-balance">
              See What We{" "}
              <span className="text-indigo">Are Building.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mutedText text-pretty">
              Take a closer look at the businesses, people, and ideas
              shaping the growing GM Group.
            </p>
          </Reveal>
        </div>

        {/* Gallery */}
        <Reveal delay={0.15}>
          <div className="mt-16 border-y border-black/[0.08] py-10 sm:mt-20 lg:mt-24 lg:py-14">
            <Gallery
              items={galleryItems}
              index={index}
              onSelect={setIndex}
              onOpen={() => setOpen(true)}
            />
          </div>
        </Reveal>

        {/* Active item information */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <motion.div
            key={activeItem.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={
              reduce ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-2xl font-bold tracking-tightest text-ink">
              {activeItem.title}
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mutedText">
              {activeItem.description}
            </p>
          </motion.div>

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mutedText">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(galleryItems.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-5 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              layoutId={`gallery-${activeItem.id}`}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-[520px] overflow-hidden rounded-2xl bg-ink"
            >
              <div className="relative aspect-square">
                <Image
                  src={activeItem.url}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 520px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="border-t border-white/10 p-5 sm:p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-2 font-display text-2xl font-bold tracking-tightest text-white">
                  {activeItem.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
