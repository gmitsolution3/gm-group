import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
        <div className="w-full">
          <div className="mb-8">
            <p className="text-sm font-medium text-muted-foreground">
              GM Group
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Forgot your password?
            </h1>

            <p className="mt-2 text-muted-foreground">
              Enter your email and we'll send you a secure password
              reset link.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}