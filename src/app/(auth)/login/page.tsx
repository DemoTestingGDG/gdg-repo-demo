"use client";

import { login } from "../actions";
import { SubmitButton } from "@/components/auth/submit-button";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const error = searchParams.get("error");

  useEffect(() => {
    if (message) {
      toast.success("Success", {
        description: message,
        duration: 5000,
      });
    }
    if (error) {
      toast.error("Error", {
        description: error,
        duration: 5000,
      });
    }
  }, [message, error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        {message && (
          <Alert className="border-green-500 bg-green-50">
            <Mail className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Check your email</AlertTitle>
            <AlertDescription className="text-green-700">
              {message}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-6" action={login}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <SubmitButton text="Sign in" />
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
