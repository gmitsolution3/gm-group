import AILearningAcademyDashboard from "@/components/dashboard/venture-projects/ai-learning-academy/AILearningAcademyDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function AILearningAcademyDashboardPage() {
  await requireRole("admin");

  return <AILearningAcademyDashboard />;
}
