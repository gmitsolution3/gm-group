import AboutApproach from "@/components/about/AboutApproach";
import AboutCta from "@/components/about/AboutCta";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroduction from "@/components/about/AboutIntroduction";
import AboutJourney from "@/components/about/AboutJourney";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import Values from "@/components/home/Values";
import VisionMission from "@/components/home/VisionMission";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntroduction />
      <AboutPhilosophy />
      <AboutApproach />
      <AboutJourney />
      <VisionMission />
      <Values />
      <AboutCta />
    </>
  );
}
