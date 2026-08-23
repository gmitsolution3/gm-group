import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LenisProvider from "@/providers/LenisProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LenisProvider>
  );
}
