import Link from "next/link";
import { Users, Package, Shield, BarChart3 } from "lucide-react";

interface AdminHomeProps {
  firstName?: string;
  email: string;
  adminId?: number;
}

export function AdminHome({ firstName, email, adminId }: AdminHomeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-2 text-gray-600">{email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Management */}
        <Link
          href="/admin/users"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                User Management
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Manage students and security personnel accounts
              </p>
            </div>
          </div>
        </Link>

        {/* Lost Items */}
        <Link
          href="/admin/lost-items"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-red-100 p-3">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-600">
                Lost Items
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View and manage all lost item reports
              </p>
            </div>
          </div>
        </Link>

        {/* Found Items */}
        <Link
          href="/admin/found-items"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-green-100 p-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                Found Items
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View and manage all found items
              </p>
            </div>
          </div>
        </Link>

        {/* Analytics */}
        <Link
          href="/admin/analytics"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-purple-100 p-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                Analytics
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View statistics and reports
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">System Overview</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">0</p>
            <p className="text-sm text-gray-600">Lost Reports</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">Found Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600">Matches</p>
          </div>
        </div>
      </div>
    </div>
  );
}
