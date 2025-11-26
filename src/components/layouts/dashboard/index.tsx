import type { PropsWithChildren } from "react";

import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-[#141332]">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto py-9">
          <div className="bg-[#141332] rounded-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
