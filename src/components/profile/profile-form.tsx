"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/profile/actions";
import { toast } from "sonner";

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
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateProfile(formData);
      if (result.error) {
        setError(result.error);
        toast.error("Error", {
          description: result.error,
        });
      } else {
        toast.success("Success!", {
          description: "Your profile has been updated successfully.",
        });
        router.refresh();
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="userId" value={profile.id} />
      <input type="hidden" name="userType" value={profile.user_type} />

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Email (read-only) */}
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="mt-1 bg-gray-50"
        />
        <p className="mt-1 text-xs text-gray-500">
          Email cannot be changed. Contact support if needed.
        </p>
      </div>

      {/* User Type (read-only) */}
      <div>
        <Label htmlFor="userType">Account Type</Label>
        <Input
          id="userType"
          type="text"
          value={
            profile.user_type === "student" ? "Student" : "Security Personnel"
          }
          disabled
          className="mt-1 bg-gray-50"
        />
        <p className="mt-1 text-xs text-gray-500">
          Account type cannot be changed.
        </p>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            defaultValue={profile.first_name}
            className="mt-1"
            placeholder="Juan"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            defaultValue={profile.last_name}
            className="mt-1"
            placeholder="Dela Cruz"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile.phone || ""}
          className="mt-1"
          placeholder="+639123456789"
        />
      </div>

      {/* Student-specific fields */}
      {profile.user_type === "student" && (
        <div>
          <Label htmlFor="studentNumber">Student Number *</Label>
          <Input
            id="studentNumber"
            name="studentNumber"
            type="text"
            required
            defaultValue={profile.student_number || ""}
            className="mt-1"
            placeholder="2021-12345-MN-0"
          />
        </div>
      )}

      {/* Security-specific fields */}
      {profile.user_type === "security" && (
        <>
          <div>
            <Label htmlFor="employeeId">Employee ID *</Label>
            <Input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              defaultValue={profile.employee_id || ""}
              className="mt-1"
              placeholder="SEC001"
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              type="text"
              defaultValue={profile.department || ""}
              className="mt-1"
              placeholder="Campus Security"
            />
          </div>
          <div>
            <Label htmlFor="employmentDate">Employment Date *</Label>
            <Input
              id="employmentDate"
              name="employmentDate"
              type="date"
              required
              defaultValue={profile.employment_date || ""}
              className="mt-1"
            />
          </div>
        </>
      )}

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
