import Image from "next/image";
import Link from "next/link";
import { ventures } from "@/utils/data";


export default function Venture() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl lg:text-5xl font-semibold mb-12">
          <span className="text-amber-500">One Group</span> <br />{" "}
          Multiple Engines of Growth
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {ventures
            .sort((a, b) => a.order - b.order)
            .map((venture) => (
              <Link
                key={venture.name}
                href={venture.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-slate-300/40 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-28 items-center justify-center">
                  <Image
                    src={venture.logo}
                    alt={`${venture.name} logo`}
                    width={160}
                    height={80}
                    className="h-auto w-24 object-contain"
                  />
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-slate-700 group-hover:text-amber-500">
                  {venture.name}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
