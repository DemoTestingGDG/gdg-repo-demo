import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p className="mt-2 text-gray-600">Update your personal information</p>
          <div className="mt-6">
            <ProfileForm profile={profile} email={user.email!} />
          </div>
        </div>
      </div>
    </div>
  );
}
