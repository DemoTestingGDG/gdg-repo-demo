"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "@/app/onboarding/actions";
import { toast } from "sonner";

interface OnboardingFormProps {
  userId: string;
  email: string;
}

export function OnboardingForm({ userId, email }: OnboardingFormProps) {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("userId", userId);

    try {
      const result = await completeOnboarding(formData);
      if (result.error) {
        setError(result.error);
        toast.error("Error", {
          description: result.error,
        });
      } else {
        toast.success("Success!", {
          description: "Your profile has been set up successfully.",
        });
        router.push("/dashboard");
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
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* User Type Selection */}
      <div>
        <Label htmlFor="userType">I am a... *</Label>
        <Select
          name="userType"
          value={userType}
          onValueChange={setUserType}
          required
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="security">Security Personnel</SelectItem>
          </SelectContent>
        </Select>
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
          className="mt-1"
          placeholder="+639123456789"
        />
      </div>

      {/* Student-specific fields */}
      {userType === "student" && (
        <div>
          <Label htmlFor="studentNumber">Student Number *</Label>
          <Input
            id="studentNumber"
            name="studentNumber"
            type="text"
            required
            className="mt-1"
            placeholder="2021-12345-MN-0"
          />
        </div>
      )}

      {/* Security-specific fields */}
      {userType === "security" && (
        <>
          <div>
            <Label htmlFor="employeeId">Employee ID *</Label>
            <Input
              id="employeeId"
              name="employeeId"
              type="text"
              required
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
              className="mt-1"
            />
          </div>
        </>
      )}

      <Button type="submit" disabled={loading || !userType} className="w-full">
        {loading ? "Saving..." : "Complete Setup"}
      </Button>
    </form>
  );
}
