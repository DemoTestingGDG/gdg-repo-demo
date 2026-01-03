"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  // Get user role from metadata
  const role = authData.user?.user_metadata?.role || "student";

  revalidatePath("/", "layout");
  redirect("/dashboard?success=true");
}

export async function signupStudent(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const studentNumber = formData.get("studentNumber") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;

  // Validate email
  if (!email || !email.includes("@")) {
    redirect(
      "/signup?error=" +
        encodeURIComponent("Please provide a valid email address")
    );
  }

  // Check if student number already exists
  const { data: existingStudent } = await supabase
    .from("Student")
    .select("student_number")
    .eq("student_number", studentNumber)
    .single();

  if (existingStudent) {
    redirect(
      "/signup?error=" + encodeURIComponent("Student number already registered")
    );
  }

  // Create auth user with student role
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: {
        role: "student",
        student_number: studentNumber,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      },
    },
  });

  if (authError) {
    redirect("/signup?error=" + encodeURIComponent(authError.message));
  }

  // Insert into Student table
  const { error: dbError } = await supabase.from("Student").insert({
    student_number: studentNumber,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
  });

  if (dbError) {
    console.error("Failed to insert student:", dbError);
    redirect(
      "/signup?error=" +
        encodeURIComponent("Registration failed. Please contact support.")
    );
  }

  redirect(
    "/login?message=" +
      encodeURIComponent(
        "Registration successful! Check your email to confirm your account before signing in."
      )
  );
}

export async function signupSecurity(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const employeeId = formData.get("employeeId") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const department = formData.get("department") as string;

  // Check if employee ID already exists
  const { data: existingEmployee } = await supabase
    .from("SecurityPersonnel")
    .select("employee_id")
    .eq("employee_id", employeeId)
    .single();

  if (existingEmployee) {
    redirect(
      "/signup-security?error=" +
        encodeURIComponent("Employee ID already registered")
    );
  }

  // Create auth user with security role
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: {
        role: "security",
        employee_id: employeeId,
        first_name: firstName,
        last_name: lastName,
        department: department,
      },
    },
  });

  if (authError) {
    redirect("/signup-security?error=" + encodeURIComponent(authError.message));
  }

  // Insert into SecurityPersonnel table
  const { error: dbError } = await supabase.from("SecurityPersonnel").insert({
    employee_id: employeeId,
    first_name: firstName,
    last_name: lastName,
    email: email,
    department: department,
    employment_date: new Date().toISOString().split("T")[0],
  });

  if (dbError) {
    console.error("Failed to insert security personnel:", dbError);
    redirect(
      "/signup-security?error=" +
        encodeURIComponent("Registration failed. Please contact administrator.")
    );
  }

  redirect(
    "/login?message=" +
      encodeURIComponent(
        "Registration successful! Check your email to confirm your account before signing in."
      )
  );
}

// Default export for compatibility
export const signup = signupStudent;

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
  }

  revalidatePath("/", "layout");
  redirect(
    "/login?message=" +
      encodeURIComponent("You have been signed out successfully")
  );
}
