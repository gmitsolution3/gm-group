import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GM Group",
  description:
    "GM Group is a parent company focused on building, managing, and growing businesses for the long term.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
