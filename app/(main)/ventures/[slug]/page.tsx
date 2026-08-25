import VentureDetailPageContent from "@/components/ventures/ventureDetail/VentureDetailPageContent";

export const dynamic = "force-dynamic";

type VenturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function VenturePage({
  params,
}: VenturePageProps) {
  const { slug } = await params;

  return <VentureDetailPageContent slug={slug} />;
}
