import { SignupForm } from "@/components/auth/RegisterForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
        <div className="w-full">
          <div className="mb-8">
            <p className="text-sm font-medium text-muted-foreground">
              GM Group
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-muted-foreground">
              Get started with your GM Group account.
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </main>
  );
}