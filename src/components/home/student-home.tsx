"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ReportLostModal } from "@/components/modals/report-lost-modal";
import Link from "next/link";
import { Search, Bell, Home, User, Plus } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Dock, DockIcon } from "@/components/ui/dock";

interface HomeProps {
  studentId: number;
  firstName?: string;
  email: string;
}

interface LostItemReport {
  report_id: number;
  item_name: string;
  description: string | null;
  image_url: string | null;
  category: string;
  status: string;
  reported_at: string;
}

interface Stats {
  activeReports: number;
  pendingClaims: number;
  itemsClaimed: number;
}

export function StudentHome({ studentId, firstName, email }: HomeProps) {
  const [lostItems, setLostItems] = useState<LostItemReport[]>([]);
  const [stats, setStats] = useState<Stats>({
    activeReports: 0,
    pendingClaims: 0,
    itemsClaimed: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Fetch all lost item reports
      const { data: items } = await supabase
        .from("lostitemreport")
        .select("*")
        .eq("status", "active")
        .order("reported_at", { ascending: false });

      if (items) {
        setLostItems(items);
      }

      // Fetch student's stats
      const { data: activeReports } = await supabase
        .from("lostitemreport")
        .select("report_id", { count: "exact" })
        .eq("student_id", studentId)
        .eq("status", "active");

      const { data: pendingClaims } = await supabase
        .from("claim")
        .select("claim_id", { count: "exact" })
        .eq("student_id", studentId)
        .eq("status", "pending");

      const { data: approvedClaims } = await supabase
        .from("claim")
        .select("claim_id", { count: "exact" })
        .eq("student_id", studentId)
        .eq("status", "approved");

      setStats({
        activeReports: activeReports?.length || 0,
        pendingClaims: pendingClaims?.length || 0,
        itemsClaimed: approvedClaims?.length || 0,
      });
    };

    fetchData();
  }, [studentId]);

  const filteredItems = lostItems.filter(
    (item) =>
      item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-fetch-red flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
          <Bell className="w-6 h-6 text-fetch-red" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {firstName || "Student"}!
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Let&apos;s help you fetch your lost item.
        </p>
      </div>

      {/* Stats Card */}
      <div className="p-4">
        <div className="bg-fetch-red rounded-2xl p-6 text-white">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.activeReports}</p>
              <p className="text-xs mt-1 opacity-90">Active Reports</p>
            </div>
            <div className="text-center border-x border-white/30">
              <p className="text-3xl font-bold">{stats.pendingClaims}</p>
              <p className="text-xs mt-1 opacity-90">Pending Claims</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.itemsClaimed}</p>
              <p className="text-xs mt-1 opacity-90">Item Claimed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Browse Item Matches
          </h2>
          <Link
            href="/matches"
            className="text-sm text-gray-600 hover:text-fetch-red"
          >
            See more
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg border-gray-200"
          />
        </div>

        {/* Item Cards Marquee */}
        {filteredItems.length > 0 ? (
          <div className="relative">
            <Marquee pauseOnHover className="[--duration:60s]">
              {filteredItems.map((item) => (
                <ItemCard key={item.report_id} item={item} />
              ))}
            </Marquee>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {searchQuery
              ? "No items match your search"
              : "No lost items reported yet"}
          </div>
        )}
      </div>

      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center">
        <Dock
          direction="middle"
          iconSize={48}
          iconMagnification={64}
          iconDistance={120}
        >
          <DockIcon>
            <Link
              href="/dashboard"
              className="flex items-center justify-center text-fetch-red"
            >
              <Home className="w-6 h-6" />
            </Link>
          </DockIcon>

          <DockIcon className="bg-fetch-red hover:bg-fetch-red/90">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center text-white"
            >
              <Plus className="w-7 h-7" />
            </button>
          </DockIcon>

          <DockIcon>
            <Link
              href="/profile"
              className="flex items-center justify-center text-gray-600 hover:text-fetch-red transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
          </DockIcon>
        </Dock>
      </div>

      {/* Report Lost Modal */}
      {isModalOpen && (
        <ReportLostModal
          studentId={studentId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

function ItemCard({ item }: { item: LostItemReport }) {
  const reportDate = new Date(item.reported_at).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  // Generate a random match score for display purposes
  const matchScore = Math.floor(Math.random() * 20) + 80;

  return (
    <Card className="w-[200px] shrink-0 overflow-hidden">
      <CardContent className="p-0">
        {item.image_url ? (
          <div className="relative w-full h-[180px] bg-gray-100">
            <Image
              src={item.image_url}
              alt={item.item_name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        <div className="p-4">
          <h3 className="font-semibold text-sm text-gray-900 mb-1">
            {item.item_name}
          </h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {item.description || "No description available"}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            Reported date: {reportDate}
          </p>
          <div className="flex items-center justify-center">
            <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
              {matchScore}% matched
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
