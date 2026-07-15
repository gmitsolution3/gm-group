import Image from "next/image";
import Link from "next/link";
import Facebook from "./icons/Facebook";
import TikTok from "./icons/TikTok";
import Youtube from "./icons/Youtube";

import BangladeshFlag from "./icons/flags/BangladeshFlag";
import ChinaFlag from "./icons/flags/ChinaFlag";
import MalaysiaFlag from "./icons/flags/MalaysiaFlag";
import ThailandFlag from "./icons/flags/ThailandFlag";

const offices = [
  {
    country: "Bangladesh",
    city: "Dhaka, Mirpur",
    address:
      "House 1, Road 1, Section 7, Mirpur 11, Dhaka-1216, Dhaka, Bangladesh, 1216",
    Flag: BangladeshFlag,
  },
  {
    country: "Bangladesh",
    city: "Bogura",
    address:
      "Rakhi Manson (3rd Floor), Jalesharitola,, Puran Bogra, Bangladesh",
    Flag: BangladeshFlag,
  },
  {
    country: "China",
    city: "Guangzhou",
    address:
      "No. 84 Nan'an Road, Liwan District, Guangzhou, Guangdong, Guangzhou, China, 510010",
    Flag: ChinaFlag,
  },
  {
    country: "Thailand",
    city: "Bangkok",
    address: "Bangkok, Bangkok, Thailand, 10100",
    Flag: ThailandFlag,
  },
  {
    country: "Malaysia",
    city: "Kuala Lumpur",
    address:
      "Jalan PJS 8/9 Mentari, Petaling Jaya, Kuala Lumpur, Malaysia, 46150",
    Flag: MalaysiaFlag,
  },
];

const socials = [
  {
    name: "facebook",
    icon: Facebook,
    link: "https://www.facebook.com/gminternational.live",
  },
  {
    name: "youtube",
    icon: Youtube,
    link: "https://www.youtube.com/@gminternationalvisaagency",
  },
  {
    name: "tiktok",
    icon: TikTok,
    link: "https://www.tiktok.com/@gminternational.live",
  },
];

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container mx-auto px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {offices.map((office) => (
            <div
              key={office.country}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="h-auto w-auto p-1 rounded-md bg-white/10 flex items-center justify-center">
                  <office.Flag />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold text-white">
                    {office.country}
                  </h4>
                  <p>{office.city}</p>
                </div>
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
                  src="/images/logo-white.png"
                  alt="GM Group"
                  width={140}
                  height={48}
                  className="w-24"
                />
              </Link>
            </div>

            <p className="max-w-[480px] text-sm text-slate-300">
              We're here for you every step of the way. So count on us
              as we ensure your success and satisfaction.
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
          <div>
            © {date.getFullYear()}, GM Group, All Rights Reserved.
          </div>
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
