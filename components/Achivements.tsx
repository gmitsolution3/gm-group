import Image from "next/image";
import { Heart, UsersRound, Building2 } from "lucide-react";

const achievements = [
  {
    value: "5,000+",
    label: "Associates",
    description:
      "A world-class team of talented professionals delivering growth.",
    image: "/stats.jpg",
    Icon: UsersRound,
  },
  {
    value: "22+",
    label: "Strategic Business Units",
    description:
      "Focused excellence across industries with domain expertise.",
    image: "/stats.jpg",
    Icon: Building2,
  },
  {
    value: "10M+",
    label: "Lives Touched",
    description:
      "Impacting communities with technology, jobs, and ideas.",
    image: "/stats.jpg",
    Icon: Heart,
  },
];

export default function Achivements() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 dark:text-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between">
          <h2 className="text-4xl font-semibold tracking-tight">
            Intelligence at Scale
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-md">
            5,000+ Minds. 22+ SBU. One Vision. Engineering Asia’s
            largest AI powerhouse for the world.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <article
              key={item.label}
              className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl h-96"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
              <div className="absolute left-4 top-4 w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-lg z-20">
                <item.Icon className="text-amber-600 dark:text-slate-100" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <div className="text-4xl font-bold">{item.value}</div>
                <div className="text-xl font-semibold mt-1">
                  {item.label}
                </div>
                <p className="mt-3 text-sm opacity-0 translate-y-100 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
