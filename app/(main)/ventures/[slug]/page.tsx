import { notFound } from "next/navigation";

import {
  getRelatedVentures,
  getVenture,
  ventures,
} from "@/content/ventures";

import VentureDetailHero from "@/components/ventures/VentureDetailHero";
import VentureOverview from "@/components/ventures/VentureOverview";
import VentureDetailContent from "@/components/ventures/VentureDetailContent";
import VentureGallery from "@/components/ventures/VentureGallery";
import VentureDetailCta from "@/components/ventures/VentureDetailCta";
import RelatedVentures from "@/components/ventures/RelatedVentures";

type VenturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return ventures.map((venture) => ({
    slug: venture.slug,
  }));
}

export default async function VenturePage({
  params,
}: VenturePageProps) {
  const { slug } = await params;

  const venture = getVenture(slug);

  const relatedVentures = getRelatedVentures(slug, 3);

  if (!venture) {
    notFound();
  }

  return (
    <main>
      <VentureDetailHero venture={venture} />

      <VentureOverview venture={venture} />

      <VentureDetailContent venture={venture} />

      <VentureGallery venture={venture} />

      <RelatedVentures ventures={relatedVentures} />

      <VentureDetailCta />
    </main>
  );
}