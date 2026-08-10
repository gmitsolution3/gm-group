import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
        <div className="w-full text-center">
          <p className="text-sm font-medium text-muted-foreground">
            GM Group
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Check your email
          </h1>

          <p className="mt-4 text-muted-foreground">
            We've sent a verification link to your email address.
            Click the link to verify your account.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Didn't receive it?
          </p>

          <Link
            href="/login"
            className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}