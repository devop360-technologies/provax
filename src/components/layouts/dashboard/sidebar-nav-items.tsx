"use client";

import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  Wallet,
  HeadphonesIcon,
  BarChart3,
  FileText,
  Settings,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";

interface NavItem {
  id: number;
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

interface NavGroup {
  id: number;
  navGroup: NavItem[];
  title?: string;
}

const navItems: NavGroup[] = [
  {
    id: 1,
    navGroup: [
      { id: 1, title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { id: 2, title: "User Management", url: "/dashboard/users", icon: Users },
      { id: 3, title: "AI Certification", url: "/dashboard/certification", icon: ShieldCheck },
      { id: 4, title: "Vehicle Marketplace", url: "/dashboard/marketplace", icon: ShoppingCart },
      { id: 5, title: "Service Bidding", url: "/dashboard/service-bidding", icon: Wrench },
      { id: 6, title: "Financial", url: "/dashboard/billing", icon: Wallet },
      { id: 7, title: "Support", url: "/dashboard/support", icon: HeadphonesIcon },
      { id: 8, title: "Marketing", url: "/dashboard/marketing", icon: BarChart3 },
      { id: 9, title: "Reporting Panel", url: "/dashboard/reports", icon: FileText },
      { id: 10, title: "Settings", url: "/dashboard/general", icon: Settings }
    ]
  }
];

export function SidebarNavItems() {
  return navItems.map(({ id, navGroup }) => (
    <NavGroup items={navGroup} key={id} />
  ));
}

function NavGroup({ items }: { items: NavItem[] }) {
  const currentPath = usePathname();

  return (
    <SidebarGroup className="px-0">
      <SidebarMenu className="space-y-1.5">
        {items.map((item) => (
          <SidebarMenuLink key={item.id} item={item} currentPath={currentPath} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarMenuLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(currentPath, item);

  return (
    <SidebarMenuItem>
      {item.url && (
        <Link 
          href={item.url} 
          onClick={() => setOpenMobile(false)} 
          className={`
            flex items-center gap-3 h-12 px-4 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-gradient-to-r from-emerald-500/90 to-green-500/90 text-white shadow-lg shadow-emerald-500/20' 
              : 'text-gray-400 hover:text-white hover:bg-[#14162e]'
            }
          `}
        >
          {item.icon && <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />}
          <span className="text-sm font-medium">{item.title}</span>
        </Link>
      )}
    </SidebarMenuItem>
  );
}

function checkIsActive(currentPath: string, item: NavItem) {
  return (
    currentPath === item.url || 
    currentPath.split("?")[0] === item.url
  );
}
