import { motion } from "motion/react";
import Image from "next/image";

export type GalleryItem = {
  id: number;
  url: string;
  title: string;
  description: string;
  tags: string[];
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
    <div className="flex w-full justify-center overflow-hidden">
      <div className="flex w-fit max-w-full gap-1.5 sm:gap-2">
        {items.map((item, i) => {
          const active = index === i;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`View ${item.title}`}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => {
                onSelect(i);
                onOpen();
              }}
              className={[
                "relative h-[220px] shrink-0 overflow-hidden rounded-xl",
                "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo",
                active
                  ? "w-[240px] sm:w-[320px] lg:w-[380px]"
                  : "w-[16px] sm:w-[22px] lg:w-[30px]",
              ].join(" ")}
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes={
                  active
                    ? "(max-width: 640px) 240px, (max-width: 1024px) 320px, 380px"
                    : "30px"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className={[
                  "absolute inset-0 transition-opacity duration-500",
                  active ? "opacity-0" : "bg-ink/35 opacity-100",
                ].join(" ")}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
