import { ReportLostModal } from "@/components/modals/report-lost-modal";
import Link from "next/link";
import { FileText, Search, Bell, Package } from "lucide-react";

interface HomeProps {
  studentId: number;
  firstName?: string;
  email: string;
}

export function StudentHome({ studentId, firstName, email }: HomeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back{firstName ? `, ${firstName}` : ""}!
        </h1>
        <p className="mt-2 text-gray-600">{email}</p>
      </div>

      {/* Quick Action - Report Lost Item Modal */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-blue-900">
          Lost Something?
        </h2>
        <ReportLostModal studentId={studentId} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/my-reports"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-green-100 p-3">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                My Reports
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View and manage your lost item reports.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/matches"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-purple-100 p-3">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                View Matches
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Check potential matches for your lost items.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/claims"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-yellow-100 p-3">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
                My Claims
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Track your item claim requests and status.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">Active Reports</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">Matches Found</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">0</p>
            <p className="text-sm text-gray-600">Pending Claims</p>
          </div>
        </div>
      </div>
    </div>
  );
}
