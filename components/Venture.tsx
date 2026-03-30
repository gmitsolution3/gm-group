import Image from "next/image";

const ventures = [
  {
    name: "GM Collection",
    url: "https://www.gmcollection.net",
    logo: "/gm-collection.png",
  },
  {
    name: "GM Food Point",
    url: "https://www.facebook.com/gmfoodpoint",
    logo: "/gm-foodpoint.png",
  },
  {
    name: "GM International",
    url: "https://www.gminternational.live",
    logo: "/gm-international.png",
  },
  {
    name: "GM IT Solution",
    url: "https://www.gmitsolution.net",
    logo: "/gm-itsolution.png",
  },
  {
    name: "GM Logistic",
    url: "https://www.gmlogistic.net",
    logo: "/gm-logistic.png",
  },
  {
    name: "Graphic Multimedia",
    url: "https://www.graphicsmultimedia.net",
    logo: "/graphic-multimedia.png",
  },
  {
    name: "Uttar Banga Organic",
    url: "https://uttarbangaorganic.com",
    logo: "/uttor-bangoorganic.png",
  },
  {
    name: "AI Learning Academy",
    url: "https://www.facebook.com/profile.php?id=61584815173172",
    logo: "/ai-learning-academy.png",
  },
];

export default function Venture() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl lg:text-5xl font-semibold mb-12">
          <span className="text-amber-500">One Group</span> <br />{" "}
          Multiple Engines of Growth
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {ventures.map((venture) => (
            <a
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
