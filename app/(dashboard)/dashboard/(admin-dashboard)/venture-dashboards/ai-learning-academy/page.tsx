import AILearningAcademyDashboard from "@/components/dashboard/venture-projects/ai-learning-academy/AiLearningAcademyDashboard";
import { requireRole } from "@/lib/auth-guards";

export default async function AILearningAcademyDashboardPage() {
  await requireRole("admin");

  return <AILearningAcademyDashboard />;
}
