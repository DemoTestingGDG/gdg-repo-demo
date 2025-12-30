import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();

  // Fetch User Session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white text-black">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Build the Future in 2026
        </h1>
        <p className="text-lg text-gray-600">
          A secure, high-performance starter using Next.js 16 and Supabase.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </Link>
              <p className="block w-full text-sm text-gray-500 mt-2">
                Logged in as: {user.email}
              </p>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
