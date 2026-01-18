import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    });

    if (!error) {
      // Email confirmed successfully
      return NextResponse.redirect(
        new URL(
          `/dashboard?confirmed=true&message=${encodeURIComponent(
            "Email confirmed successfully! Welcome to FETCH."
          )}`,
          request.url
        )
      );
    }

    // Email confirmation failed
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Email confirmation failed. The link may be expired. Please request a new confirmation email."
        )}`,
        request.url
      )
    );
  }

  // Invalid confirmation link
  return NextResponse.redirect(
    new URL(
      `/login?error=${encodeURIComponent(
        "Invalid confirmation link. Please check your email for the correct link."
      )}`,
      request.url
    )
  );
}
