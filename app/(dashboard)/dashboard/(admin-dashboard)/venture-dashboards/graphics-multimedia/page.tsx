import GraphicsMultimediaDashboard from "@/components/dashboard/venture-projects/graphics-multimedia/GraphicsMultimediaDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function GraphicsMultimediaDashboardPage() {
  await requireRole("admin");

  return <GraphicsMultimediaDashboard />;
}