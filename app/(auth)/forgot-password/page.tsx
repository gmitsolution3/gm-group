import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      description="Enter your email and we&apos;ll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}