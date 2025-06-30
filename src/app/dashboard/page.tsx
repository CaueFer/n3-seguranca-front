"use client";

import { Dashboard } from "@/components/view/dash/dashboard";
import Sidebar from "@/components/ui/navs/sidebar";

export default function PageDashboard() {
  return (
    <div className="relative flex flex-row w-screen h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
