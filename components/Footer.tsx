import Image from "next/image";
import Link from "next/link";
import Facebook from "./icons/Facebook";
import Twitter from "./icons/Twitter";
import LinkedIn from "./icons/LinkedIn";
import Youtube from "./icons/Youtube";
import Instagram from "./icons/Instagram";

const offices = [
  {
    country: "Bangladesh",
    address:
      "Lotus Kamal Tower-2, Level 6, 59 & 61 Gulshan South Avenue, Gulshan-1, Dhaka-1212",
  },
  {
    country: "United Arab Emirates",
    address: "Meydan Grandstand, 6th Floor, Meydan Road, UAE",
  },
  {
    country: "Philippines",
    address:
      "Business Center 4, Philexcel Business Park M.A. Roxas Highway, Clark Freeport Zone, Angeles City, Pampanga, Region III Philippines",
  },
  {
    country: "United States",
    address:
      "3651 Peachtree Pkwy STE. E #116, Suwanee, GA 30024, United States of America",
  },
];

const socials = [
  {
    name: "facebook",
    icon: Facebook,
    link: "#",
  },
  {
    name: "twitter",
    icon: Twitter,
    link: "#",
  },
  {
    name: "linkedin",
    icon: LinkedIn,
    link: "#",
  },
  {
    name: "youtube",
    icon: Youtube,
    link: "#",
  },
  {
    name: "instagram",
    icon: Instagram,
    link: "#",
  },
];

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container mx-auto px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div
              key={office.country}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-white/10" />
                <h4 className="text-xl font-bold text-white">
                  {office.country}
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {office.address}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/logo-white.png"
                  alt="GM Group"
                  width={140}
                  height={48}
                  className="w-24"
                />
              </Link>
            </div>

            <p className="max-w-[480px] text-sm text-slate-300">
              Asia&#39;s Largest AI Powerhouse. We fuse deep tech with
              essential industries providing the code behind the crop
              and the intelligence powering the grid.
            </p>

            <ul className="flex items-center gap-4 text-white/80">
              {socials.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="hover:text-white hover:scale-110 transition"
                  >
                    {<item.icon />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rest unchanged */}
          <div>
            <h5 className="text-lg font-bold text-white">Company</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Vision 2030
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Ventures
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold text-white">
              Resources
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  Industries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Procurement
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  News & Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Photo Frame
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold text-white">Connect</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col lg:flex-row items-center justify-between text-sm text-slate-400 gap-5">
          <div>© {date.getFullYear()}, GM Group, All Rights Reserved.</div>
          <div>
            Developed by{" "}
            <a
              href="https://www.gmitsolution.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              GM IT Solution
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
