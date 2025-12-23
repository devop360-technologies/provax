"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText,
  Briefcase,
  Users,
  Wallet,
  CreditCard,
  Star,
  Settings,
  HelpCircle
} from "lucide-react";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/provider", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/provider/certification", icon: ShieldCheck, label: "AI Certification" },
  { href: "/provider/service-request", icon: FileText, label: "Service Request" },
  { href: "/provider/proposals", icon: Briefcase, label: "Proposals" },
  { href: "/provider/active-jobs", icon: Users, label: "Active Jobs" },
  { href: "/provider/financial", icon: Wallet, label: "Financial" },
  { href: "/provider/subscription", icon: CreditCard, label: "Subscription Plans" },
  { href: "/provider/reviews", icon: Star, label: "Reviews" },
  { href: "/provider/settings", icon: Settings, label: "Settings" },
  { href: "/provider/support", icon: HelpCircle, label: "Support" },
];

export function ProviderDashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-4 rounded-2xl top-4 z-40 h-[calc(100vh-25px)] w-54 border-r border-[#2a2d4a] bg-gradient-to-b from-[#202047] to-[#131231] transition-transform lg:translate-x-0">
      {/* Logo Section */}
      <div className="flex h-24 items-center justify-center border-b border-[#2a2d4a] px-6">
        <Link href="/dashboard/provider" className="flex flex-col items-center gap-2">
          <Image
            src="/provax-images/logo.png"
            alt="Provax Logo"
            width={85}
            height={85}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-4 py-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-[11px] font-medium transition-colors ${
                isActive
                  ? "bg-green-500/20 border border-green-500/30 text-white"
                  : "text-gray-400 hover:bg-[#252850] hover:text-white"
              }`}
            >
              <item.icon 
                className={`h-4 w-4 ${
                  isActive ? "text-green-400" : "text-gray-400 group-hover:text-white"
                }`} 
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
