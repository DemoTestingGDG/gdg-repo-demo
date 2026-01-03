import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session and get user info
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is authenticated, check onboarding status
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    // Redirect to onboarding if not completed (except if already on onboarding page or auth pages)
    if (
      profile &&
      !profile.onboarding_completed &&
      !request.nextUrl.pathname.startsWith("/onboarding") &&
      !request.nextUrl.pathname.startsWith("/auth")
    ) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // Redirect to dashboard if trying to access onboarding but already completed
    if (
      profile &&
      profile.onboarding_completed &&
      request.nextUrl.pathname.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Guard protected routes (e.g., anything in /dashboard, /profile, /onboarding)
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/onboarding"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
