import CareersCta from "@/components/home/CareersCta";
import GlobeDemo from "@/components/home/GlobeDemo";
import GroupIdentity from "@/components/home/GroupIdentity";
import Growth from "@/components/home/Growth";
import Hero from "@/components/home/Hero";
import News from "@/components/home/News";
import Story from "@/components/home/Story";
import Values from "@/components/home/Values";
import Ventures from "@/components/home/Ventures/Ventures";
import VissionMission from "@/components/home/VisionMission";
import GlobalPresence from "@/components/home/GlobalPresence";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GroupIdentity />
      <Ventures />
      <Growth />
      <VissionMission />
      <Values />
      <Story />
      <CareersCta />
      <News />
     <GlobalPresence />
    </>
  );
}
