"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setServerError(null);

    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      setServerError(
        error.message || "Unable to process your request.",
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-7 text-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tightest text-white">
            Check your email
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            If an account exists for that email address, we&apos;ve
            sent instructions to reset your password.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center justify-center text-sm font-medium text-white/60 transition-colors hover:text-indigo"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7"
    >
      {/* Email */}
      <div className="space-y-3">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-white/80"
        >
          Email
        </Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-relaxed text-destructive"
        >
          {serverError}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-white text-sm font-semibold text-ink transition-all hover:bg-indigo hover:text-white"
      >
        {isSubmitting ? "Sending..." : "Send reset link"}
      </Button>

      {/* Login */}
      <p className="pt-2 text-center text-sm text-white/40">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-white transition-colors hover:text-indigo"
        >
          Login
        </Link>
      </p>
    </form>
  );
}