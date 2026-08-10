"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name is too long."),

    email: z.string().email("Please enter a valid email address."),

    phone: z
      .string()
      .min(7, "Please enter a valid phone number.")
      .max(30, "Phone number is too long."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password is too long."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    });

    if (error) {
      setServerError(
        error.message ||
          "Unable to create your account. Please try again.",
      );
      return;
    }

    router.push("/verify-email");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* Full name */}
      <div className="space-y-3">
        <Label
          htmlFor="name"
          className="text-sm font-medium text-white/80"
        >
          Full name
        </Label>

        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

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

      {/* Phone */}
      <div className="space-y-3">
        <Label
          htmlFor="phone"
          className="text-sm font-medium text-white/80"
        >
          Phone
        </Label>

        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 555 000 0000"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("phone")}
        />

        {errors.phone && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-3">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-white/80"
        >
          Password
        </Label>

        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-3">
        <Label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-white/80"
        >
          Confirm password
        </Label>

        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          className="h-12 border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-white/25 focus-visible:ring-indigo"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm leading-relaxed text-destructive">
            {errors.confirmPassword.message}
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

      {/* Register */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-white text-sm font-semibold text-ink transition-all hover:bg-indigo hover:text-white"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      {/* Login */}
      <p className="pt-2 text-center text-sm text-white/40">
        Already have an account?{" "}
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