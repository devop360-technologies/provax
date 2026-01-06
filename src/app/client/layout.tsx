import type { PropsWithChildren } from "react";
import { ClientDashboardSidebar } from "@/components/layouts/dashboard/client-sidebar";
import { DashboardHeader } from "@/components/layouts/dashboard/dashboard-header";
import { MobileSidebarProvider } from "@/components/layouts/dashboard/mobile-sidebar-context";

export default function ClientDashboardLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <MobileSidebarProvider>
      <div className="flex h-screen bg-[#141332]">
        <ClientDashboardSidebar />
        
        {/* Main content - responsive margin for sidebar */}
        <div className="flex-1 flex flex-col ml-0 lg:ml-64 overflow-hidden transition-all duration-300">
          <DashboardHeader />
          <main className="flex-1 overflow-auto py-4 sm:py-6 lg:py-9 px-2 sm:px-4 lg:px-0">
            <div className="bg-[#141332] rounded-2xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
}
