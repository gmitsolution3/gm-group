import {
  BriefcaseBusiness,
  Building2,
  Globe2,
  UsersRound,
} from "lucide-react";
import Image from "next/image";

const achievements = [
  {
    value: "10+",
    label: "Strategic Business Units",
    description:
      "A diversified portfolio of businesses spanning technology, logistics, education, agriculture, media, food, retail, and international services.",
    image: "/images/stats.jpg",
    Icon: Building2,
  },
  {
    value: "20+",
    label: "Team Members",
    description:
      "A passionate team of professionals working together to build innovative businesses and deliver value across every venture.",
    image: "/images/employee-2.jpg",
    Icon: UsersRound,
  },
  {
    value: "10+",
    label: "Business Operations",
    description:
      "Successfully operating multiple businesses across diverse industries with a shared commitment to quality, innovation, and sustainable growth.",
    image: "/images/employee-3.jpg",
    Icon: BriefcaseBusiness,
  },
  {
    value: "5",
    label: "Global Presence",
    description:
      "Serving clients and operating through offices in Bangladesh, China, Malaysia, Thailand, and beyond with a growing international footprint.",
    image: "/images/global-presence.jpg",
    Icon: Globe2,
  },
];

export default function Achivements() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 dark:text-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between">
          <h2 className="text-4xl font-semibold tracking-tight">
            Building Businesses, Creating Impact
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-4xl">
            GM Group is a diversified business conglomerate with 10+
            strategic business units, a growing team of professionals,
            and operations across multiple industries, driving
            innovation and sustainable growth from Bangladesh to the
            global market.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
