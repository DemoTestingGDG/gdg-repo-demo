import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RateUsContent } from "@/components/profile/rate-us-content";

export default async function RateUsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  return <RateUsContent profile={profile} email={user.email!} />;
}
