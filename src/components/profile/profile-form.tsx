"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/profile/edit/actions";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

interface ProfileFormProps {
  profile: {
    id: string;
    user_type: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    student_number: string | null;
    employee_id: string | null;
    department: string | null;
    employment_date: string | null;
  };
  email: string;
}

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateProfile(formData);
      if (result.error) {
        toast.error("Error", {
          description: result.error,
        });
      } else {
        toast.success("Success!", {
          description: "Your profile has been updated successfully.",
        });
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="userId" value={profile.id} />
      <input type="hidden" name="userType" value={profile.user_type} />

      {/* Full Name */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <button
            type="button"
            onClick={() => setIsEditing(isEditing === "name" ? null : "name")}
            className="text-gray-400 hover:text-gray-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
        {isEditing === "name" ? (
          <div className="flex gap-2">
            <input
              name="firstName"
              type="text"
              required
              defaultValue={profile.first_name}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="First Name"
            />
            <input
              name="lastName"
              type="text"
              required
              defaultValue={profile.last_name}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Last Name"
            />
          </div>
        ) : (
          <div className="text-gray-900">
            <input type="hidden" name="firstName" value={profile.first_name} />
            <input type="hidden" name="lastName" value={profile.last_name} />
            {profile.first_name} {profile.last_name}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Email</label>
          <Pencil className="h-4 w-4 text-gray-300" />
        </div>
        <div className="text-gray-400">{email}</div>
        <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
      </div>

      {/* Student Number (if student) */}
      {profile.user_type === "student" && (
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">
              Student Number
            </label>
            <button
              type="button"
              onClick={() =>
                setIsEditing(isEditing === "student" ? null : "student")
              }
              className="text-gray-400 hover:text-gray-600"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          {isEditing === "student" ? (
            <input
              name="studentNumber"
              type="text"
              required
              defaultValue={profile.student_number || ""}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="1234-56789-MN-0"
            />
          ) : (
            <div className="text-gray-900">
              <input
                type="hidden"
                name="studentNumber"
                value={profile.student_number || ""}
              />
              {profile.student_number || "Not set"}
            </div>
          )}
        </div>
      )}

      {/* Employee ID (if security) */}
      {profile.user_type === "security" && (
        <>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-600">
                Employee ID
              </label>
              <button
                type="button"
                onClick={() =>
                  setIsEditing(isEditing === "employee" ? null : "employee")
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            {isEditing === "employee" ? (
              <input
                name="employeeId"
                type="text"
                required
                defaultValue={profile.employee_id || ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="SEC001"
              />
            ) : (
              <div className="text-gray-900">
                <input
                  type="hidden"
                  name="employeeId"
                  value={profile.employee_id || ""}
                />
                {profile.employee_id || "Not set"}
              </div>
            )}
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-600">
                Department
              </label>
              <button
                type="button"
                onClick={() =>
                  setIsEditing(isEditing === "department" ? null : "department")
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            {isEditing === "department" ? (
              <input
                name="department"
                type="text"
                defaultValue={profile.department || ""}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Campus Security"
              />
            ) : (
              <div className="text-gray-900">
                <input
                  type="hidden"
                  name="department"
                  value={profile.department || ""}
                />
                {profile.department || "Not set"}
              </div>
            )}
          </div>

          <input
            type="hidden"
            name="employmentDate"
            value={profile.employment_date || ""}
          />
        </>
      )}

      {/* Phone Number */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <button
            type="button"
            onClick={() => setIsEditing(isEditing === "phone" ? null : "phone")}
            className="text-gray-400 hover:text-gray-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
        {isEditing === "phone" ? (
          <input
            name="phone"
            type="tel"
            defaultValue={profile.phone || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="09123456789"
          />
        ) : (
          <div className="text-gray-900">
            <input type="hidden" name="phone" value={profile.phone || ""} />
            {profile.phone || "Not set"}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-fetch-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
