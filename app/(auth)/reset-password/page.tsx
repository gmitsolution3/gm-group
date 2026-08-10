import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Create a new password."
      description="Choose a new password for your GM Group account."
    >
      <ResetPasswordForm
        token={params.token}
        initialError={
          params.error === "INVALID_TOKEN"
            ? "This password reset link is invalid or has expired."
            : null
        }
      />
    </AuthShell>
  );
}
