import CareersCta from "@/components/careers/CareersCta";
import CareersCulture from "@/components/careers/CareersCulture";
import CareersHero from "@/components/careers/CareersHero";
import CareersOpportunities from "@/components/careers/CareersOpportunities";
import CareersWhy from "@/components/careers/CareersWhy";
import CareersWorkingWithUs from "@/components/careers/CareersWorkingWithUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build the future with GM Group. Explore careers across the group and its businesses.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersWhy />
      <CareersCulture />
      <CareersWorkingWithUs />
      <CareersOpportunities />
      <CareersCta />
    </>
  );
}
