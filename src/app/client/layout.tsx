import type { PropsWithChildren } from "react";
import { ClientDashboardSidebar } from "@/components/layouts/dashboard/client-sidebar";
import { DashboardHeader } from "@/components/layouts/dashboard/dashboard-header";

export default function ClientDashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-[#141332]">
      <ClientDashboardSidebar />
      
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
