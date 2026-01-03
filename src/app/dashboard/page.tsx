"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { logout } from "../(auth)/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, LogOut } from "lucide-react";
import { StudentHome } from "@/components/home/student-home";
import { SecurityHome } from "@/components/home/security-home";
import { AdminHome } from "@/components/home/admin-home";
import type { UserRole } from "@/utils/supabase/get-user-role";

interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  studentId?: number;
  securityId?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const message = searchParams.get("message");
  const success = searchParams.get("success");
  const confirmed = searchParams.get("confirmed");

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.push("/login");
        return;
      }

      const role = (authUser.user_metadata?.role as UserRole) || "student";
      const userProfile: UserProfile = {
        id: authUser.id,
        email: authUser.email || "",
        role: role,
        firstName: authUser.user_metadata?.first_name,
        lastName: authUser.user_metadata?.last_name,
      };

      // Get student or security ID from database
      if (role === "student") {
        const { data: student } = await supabase
          .from("Student")
          .select("student_id")
          .eq("email", authUser.email)
          .single();
        userProfile.studentId = student?.student_id;
      } else if (role === "security") {
        const { data: security } = await supabase
          .from("SecurityPersonnel")
          .select("security_id")
          .eq("email", authUser.email)
          .single();
        userProfile.securityId = security?.security_id;
      }

      setUser(userProfile);
      setLoading(false);
    };

    checkUser();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    if (success) {
      toast.success("Welcome back!", {
        description: "You have successfully signed in.",
        duration: 4000,
      });
    }
    if (confirmed && message) {
      toast.success("Email Confirmed!", {
        description: message,
        duration: 5000,
      });
    }
  }, [success, confirmed, message]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">FETCH</h1>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {user.role}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {message && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {message}
            </AlertDescription>
          </Alert>
        )}

        {user.role === "student" && user.studentId && (
          <StudentHome
            studentId={user.studentId}
            firstName={user.firstName}
            email={user.email}
          />
        )}
        {user.role === "security" && user.securityId && (
          <SecurityHome
            securityId={user.securityId}
            firstName={user.firstName}
            email={user.email}
          />
        )}
        {user.role === "admin" && <AdminHome email={user.email} />}
      </main>
    </div>
  );
}
