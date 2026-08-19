import { Reveal } from "@/components/visual/motion";
import type { Venture } from "@/content/ventures";

type VentureGalleryProps = {
  venture: Venture;
};

export default function VentureGallery({
  venture,
}: VentureGalleryProps) {
  if (venture.gallery.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo">
              <span className="h-px w-10 bg-indigo" />
              Inside the Venture
            </p>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A closer look.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {venture.gallery.map((image, index) => (
            <Reveal
              key={image}
              delay={index * 0.08}
            >
              <div className="overflow-hidden rounded-2xl border border-black/8 bg-muted">
                <img
                  src={image}
                  alt={`${venture.name} gallery image ${index + 1}`}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}