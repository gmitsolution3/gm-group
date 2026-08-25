"use client";

import { useMemo } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import { IVenture } from "@/types";

import { notFound } from "next/navigation";

import RelatedVentures from "../RelatedVentures";
import VentureGallery from "../VentureGallery";
import VentureOverview from "../VentureOverview";
import VentureDetailContent from "./VentureDetailContent";
import VentureDetailCta from "./VentureDetailCta";
import VentureDetailHero from "./VentureDetailHero";
import VentureDetailLoader from "./VentureDetailLoader";
import VentureDetailError from "./VentureDetailError";

type VentureDetailPageContentProps = {
  slug: string;
};

export default function VentureDetailPageContent({
  slug,
}: VentureDetailPageContentProps) {
  const { data, isLoading, isError } = useFetch<IVenture[]>(
    "/ventures/get-all",
  );

  const ventures = data ?? [];

  const venture = useMemo(
    () => ventures.find((item) => item.slug === slug),
    [ventures, slug],
  );

  const relatedVentures = useMemo(
    () => ventures.filter((item) => item.slug !== slug).slice(0, 3),
    [ventures, slug],
  );

  if (isLoading) {
    return <VentureDetailLoader />;
  }

  if (isError) {
    return <VentureDetailError />;
  }

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
