import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account."
      description="Join GM Group and get started."
    >
      <RegisterForm />
    </AuthShell>
  );
}