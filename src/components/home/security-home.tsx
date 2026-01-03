import { ReportFoundModal } from "@/components/modals/report-found-modal";
import Link from "next/link";
import { FileCheck, Shield, Users } from "lucide-react";

interface HomeProps {
  securityId: number;
  firstName?: string;
  email: string;
}

export function SecurityHome({ securityId, firstName, email }: HomeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome{firstName ? `, ${firstName}` : ""} • {email}
        </p>
      </div>

      {/* Quick Action - Log Found Item Modal */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-green-900">
          Found an Item?
        </h2>
        <ReportFoundModal securityId={securityId} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/found-items"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-blue-100 p-3">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                Found Items Inventory
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View and manage all found items.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/verify-claims"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-purple-100 p-3">
              <FileCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                Verify Claims
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Review and approve item claim requests.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/all-reports"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-yellow-100 p-3">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600">
                All Reports
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                View all lost item reports from students.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Security Stats */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Today's Overview
        </h3>
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">Items Found</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">In Storage</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600">Claims Pending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">0</p>
            <p className="text-sm text-gray-600">Items Returned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
