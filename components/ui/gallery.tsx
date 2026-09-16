"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

export type GalleryItem = {
  id: number;
  url: string;
  title: string;
  description: string;
  tags: string[];
};

const article = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

function Gallery({
  items,
  index,
  onSelect,
  onOpen,
}: {
  items: GalleryItem[];
  index: number;
  onSelect: (index: number) => void;
  onOpen: () => void;
}) {
  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto flex w-fit max-w-full gap-1">
        {items.map((item, i) => {
          const active = index === i;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              aria-label={`View ${item.title}`}
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => {
                if (active) {
                  onOpen();
                } else {
                  onSelect(i);
                }
              }}
              className={[
                "relative h-[400px] shrink-0 overflow-hidden rounded-xl",
                "transition-[width] duration-500 ease-in-linear",
                "origin-center",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-indigo",
                active ? "w-[450px]" : "w-[50px]",
              ].join(" ")}
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes={
                  active ? "(max-width: 640px) 90vw, 450px" : "50px"
                }
                className="h-full w-full rounded-xl object-cover"
              />

              <AnimatePresence mode="wait">
                {active && (
                  <motion.article
                    variants={article}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="absolute inset-0 flex h-full flex-col justify-end overflow-hidden rounded-xl bg-linear-to-t from-neutral-900/60 from-20% to-transparent to-80% p-3 text-left"
                  >
                    <motion.h2
                      variants={article}
                      className="text-2xl font-semibold text-white"
                    >
                      {item.title}
                    </motion.h2>

                    <motion.p
                      variants={article}
                      className="leading-[120%] text-white/80"
                    >
                      {item.description}
                    </motion.p>
                  </motion.article>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
