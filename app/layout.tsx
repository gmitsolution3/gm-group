import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "GM Group",
  description:
    "GM Group is a leading conglomerate in Bangladesh, with a diverse portfolio spanning multiple industries. We are committed to driving innovation and growth across our ventures, contributing to the economic development of the region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
