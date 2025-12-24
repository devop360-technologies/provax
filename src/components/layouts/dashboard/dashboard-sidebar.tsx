"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Car, 
  Wrench, 
  Wallet,
  HeadphonesIcon,
  BarChart3,
  FileText,
  Settings,
  Lock,
  X
} from "lucide-react";
import { useMobileSidebar } from "./mobile-sidebar-context";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/users", icon: Users, label: "User Management" },
  { href: "/dashboard/certification", icon: ShieldCheck, label: "AI Certification" },
  { href: "/dashboard/marketplace", icon: Car, label: "Vehicle Marketplace" },
  { href: "/dashboard/service", icon: Wrench, label: "Service Bidding" },
  { href: "/dashboard/financial", icon: Wallet, label: "Financial" },
  { href: "/dashboard/support", icon: HeadphonesIcon, label: "Support" },
  { href: "/dashboard/marketing", icon: BarChart3, label: "Marketing" },
  { href: "/dashboard/reporting", icon: FileText, label: "Reporting Panel" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  // { href: "/dashboard/change-password", icon: Lock, label: "Change Password" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-50 h-full w-64 
        border-r border-[#2a2d4a] bg-gradient-to-b from-[#202047] to-[#131231] 
        transition-transform duration-300 ease-in-out
        lg:left-4 lg:top-4 lg:h-[calc(100vh-25px)] lg:w-54 lg:rounded-2xl lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="flex h-20 sm:h-24 items-center justify-between border-b border-[#2a2d4a] px-4 sm:px-6">
          <Link href="/dashboard" className="flex flex-col items-center gap-2 flex-1">
            {/* Provax Logo */}
            <Image
              src="/provax-images/logo.png"
              alt="Provax Logo"
              width={85}
              height={85}
              className="object-contain w-16 sm:w-20 lg:w-[85px]"
            />
          </Link>
          
          {/* Close button - Mobile only */}
          <button 
            onClick={close}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#252850] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 px-3 sm:px-4 py-4 sm:py-5 overflow-y-auto max-h-[calc(100vh-100px)] lg:max-h-[calc(100vh-145px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close} // Close sidebar on mobile when navigating
                className={`group flex items-center gap-3 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-[12px] font-medium transition-colors ${
                  isActive
                    ? "bg-green-500/20 border border-green-500/30 text-white"
                    : "text-gray-400 hover:bg-[#252850] hover:text-white"
                }`}
              >
                <item.icon 
                  className={`h-4 w-4 flex-shrink-0 ${
                    isActive ? "text-green-400" : "text-gray-400 group-hover:text-white"
                  }`} 
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
