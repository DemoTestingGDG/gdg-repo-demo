import Link from "next/link";
import {
  Users,
  BarChart3,
  Settings,
  FileText,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface HomeProps {
  email: string;
}

export function AdminHome({ email }: HomeProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-purple-600 p-3">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-900">
              Administrator Dashboard
            </h1>
            <p className="mt-1 text-purple-700">{email}</p>
            <p className="mt-2 text-sm text-purple-600">
              You have full oversight of the FETCH system. Monitor users, items,
              and system activity.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          System Overview
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Total Students</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Security Staff</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Active Reports</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Total Matches</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Items Returned</p>
          </div>
        </div>
      </div>

      {/* Admin Actions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/users"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-300"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-blue-100 p-3 transition-colors group-hover:bg-blue-200">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                User Management
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage students, security personnel, and admin accounts.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-green-300"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-green-100 p-3 transition-colors group-hover:bg-green-200">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                Analytics & Reports
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View system statistics, trends, and generate reports.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/all-items"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-purple-300"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-purple-100 p-3 transition-colors group-hover:bg-purple-200">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                All Items
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View all lost and found items across the system.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/matches"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-yellow-300"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-yellow-100 p-3 transition-colors group-hover:bg-yellow-200">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
                Match Review
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Review and manage AI-generated item matches.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/claims"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-red-300"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-red-100 p-3 transition-colors group-hover:bg-red-200">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-600">
                All Claims
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Monitor and intervene in claim requests if needed.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-400"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-gray-100 p-3 transition-colors group-hover:bg-gray-200">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                System Settings
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Configure system parameters and preferences.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent System Activity
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-500 italic">
            No recent activity to display. System activity will appear here.
          </p>
        </div>
      </div>

      {/* System Health */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          <div>
            <h3 className="font-semibold text-green-900">
              System Status: Operational
            </h3>
            <p className="text-sm text-green-700">
              All services running normally
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
