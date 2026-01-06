import { Input } from "@/components/ui/input";
import { UserDropdown } from "@/components/layouts/dashboard/nav-user";
import { Bell, Search } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { MobileMenuButton } from "./mobile-menu-button";

export async function DashboardHeader() {

  const user = await getCurrentUser();
  
  return (
    <header className="bg-[#1D1D41] border-b border-[#2a2d4a] px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 sticky top-2 sm:top-3 lg:top-5 rounded-xl sm:rounded-2xl mx-2 sm:mx-4 lg:mr-10 lg:ml-0 z-40">
      <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Mobile menu button */}
        <MobileMenuButton />

        {/* Left side - Welcome text */}
        <div className="flex-1 min-w-0 hidden sm:block">
          <h1 className="text-sm sm:text-base lg:text-xl font-semibold text-white truncate">
            Welcome back, {user?.name}
          </h1>
          <p className="text-[10px] sm:text-[11px] lg:text-[12px] text-gray-400 mt-0.5 sm:mt-1 hidden md:block">
            Welcome back, manage your automotive AI platform
          </p>
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 min-w-0 max-w-xs sm:max-w-sm lg:max-w-md">
          <div className="relative">
            <Input
              placeholder="Find Something..."
              className="pl-3 sm:pl-4 lg:pl-5 pr-10 h-8 sm:h-9 lg:h-10 bg-[#252850] border border-[#2a2d4a] text-gray-300 placeholder-gray-500 rounded-xl sm:rounded-2xl focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-xs sm:text-sm"
            />
            <Search className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
          <button 
            className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252850] rounded-lg transition-colors"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* ← This is now dynamic & reusable */}
          <UserDropdown />
        </div>
      </div>
      
    </header>
  );
}
