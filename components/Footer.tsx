import Image from "next/image";

const offices = [
  {
    country: "Bangladesh",
    address: "Lotus Kamal Tower-2, Level 6, 59 & 61 Gulshan South Avenue, Gulshan-1, Dhaka-1212",
  },
  {
    country: "United Arab Emirates",
    address: "Meydan Grandstand, 6th Floor, Meydan Road, UAE",
  },
  {
    country: "Philippines",
    address: "Business Center 4, Philexcel Business Park M.A. Roxas Highway, Clark Freeport Zone, Angeles City, Pampanga, Region III Philippines",
  },
  {
    country: "United States",
    address: "3651 Peachtree Pkwy STE. E #116, Suwanee, GA 30024, United States of America",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container mx-auto px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div key={office.country} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-white/10" />
                <h4 className="text-xl font-bold text-white">{office.country}</h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{office.address}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-white.png" alt="Betopia Group" width={140} height={48} />
            </div>
            <p className="max-w-[480px] text-sm text-slate-300">
              Asia&#39;s Largest AI Powerhouse. We fuse deep tech with essential industries providing the code behind the crop and the intelligence powering the grid.
            </p>
            <div className="flex items-center gap-3 text-white/80">
              <a href="#" className="hover:text-white">f</a>
              <a href="#" className="hover:text-white">t</a>
              <a href="#" className="hover:text-white">in</a>
              <a href="#" className="hover:text-white">yt</a>
              <a href="#" className="hover:text-white">ig</a>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-bold text-white">Company</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Leadership</a></li>
              <li><a href="#" className="hover:text-white">Vision 2030</a></li>
              <li><a href="#" className="hover:text-white">Ventures</a></li>
              <li><a href="#" className="hover:text-white">Career</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold text-white">Resources</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white">Industries</a></li>
              <li><a href="#" className="hover:text-white">Procurement</a></li>
              <li><a href="#" className="hover:text-white">News & Media</a></li>
              <li><a href="#" className="hover:text-white">Photo Frame</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold text-white">Connect</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          © 2026, Betopia Group, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
