import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Welcome back."
      description="Sign in to continue to your GM Group account."
    >
      <LoginForm callbackUrl={params.callbackUrl} />
    </AuthShell>
  );
}