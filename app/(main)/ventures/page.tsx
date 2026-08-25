import VenturesPageContent from "@/components/ventures/VenturesPageContent";
import VenturesCta from "@/components/ventures/VenturesCta";
import VenturesHero from "@/components/ventures/VenturesHero";

export const metadata = {
  title: "Ventures",
  description: "Businesses built, managed and grown under GM Group.",
  alternates: {
    canonical: "/ventures",
  },
};

export default function VenturesPage() {
  return (
    <main>
      <VenturesHero />

      <VenturesPageContent />

      <VenturesCta />
    </main>
  );
}