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
      return NextResponse.redirect(
        new URL(
          `${next}?confirmed=true&message=${encodeURIComponent(
            "Email confirmed successfully! Welcome aboard."
          )}`,
          request.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Email confirmation failed. Please try again or request a new confirmation email."
        )}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      `/login?error=${encodeURIComponent("Invalid confirmation link.")}`,
      request.url
    )
  );
}
