"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Shield,
  Moon,
  Globe,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SettingsContentProps {
  profile: {
    id: string;
    first_name: string;
    user_type: string;
  };
}

export function SettingsContent({ profile }: SettingsContentProps) {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = (setting: string, value: boolean) => {
    toast.success("Settings updated", {
      description: `${setting} ${value ? "enabled" : "disabled"}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Link href="/profile" className="text-gray-900">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 py-6 space-y-6">
        {/* Account Info */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-sm text-blue-800">
            Logged in as{" "}
            <span className="font-medium">{profile.first_name}</span> (
            {profile.user_type === "student" ? "Student" : "Security Personnel"}
            )
          </AlertDescription>
        </Alert>

        {/* Notifications */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600">
            Notifications
          </h2>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Push Notifications
                  </p>
                  <p className="text-xs text-gray-500">Receive match alerts</p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => {
                    setNotifications(e.target.checked);
                    handleToggle("Push notifications", e.target.checked);
                  }}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <Bell className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Alerts</p>
                  <p className="text-xs text-gray-500">Get updates via email</p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => {
                    setEmailAlerts(e.target.checked);
                    handleToggle("Email alerts", e.target.checked);
                  }}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>


        {/* Other */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600">
            Other
          </h2>

          <Link
            href="/settings/language"
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Language</p>
                <p className="text-xs text-gray-500">English (US)</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            href="/settings/privacy"
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <p className="font-medium text-gray-900">Privacy & Security</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            href="/support"
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                <HelpCircle className="h-5 w-5 text-orange-600" />
              </div>
              <p className="font-medium text-gray-900">Help & Support</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* App Version */}
        <div className="text-center text-xs text-gray-500">FETCH v1.0.0</div>
      </div>
    </div>
  );
}
