import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LenisProvider from "@/providers/LenisProvider";
import "lenis/dist/lenis.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gmgroupbd.com"),

  title: {
    default: "GM Group Company",
    template: "%s | GM Group",
  },

  description:
    "GM Group is a parent company focused on building, managing, and growing businesses for the long term.",

  applicationName: "GM Group",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen antialiased">
        <TooltipProvider>
          <LenisProvider>
            {children}
            <Toaster />
          </LenisProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
