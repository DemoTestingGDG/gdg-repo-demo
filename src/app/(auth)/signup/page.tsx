"use client";

import { signupStudent } from "../actions";
import { SubmitButton } from "@/components/auth/submit-button";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold">
            Create FETCH Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Polytechnic University of the Philippines
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-6" action={signupStudent}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Juan"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Dela Cruz"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="studentNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Student Number
            </label>
            <input
              id="studentNumber"
              name="studentNumber"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="2021-12345-MN-0"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use your personal email
            </p>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="+639123456789"
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
              autoComplete="new-password"
              required
              minLength={8}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>

          <SubmitButton text="Create Student Account" />
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
