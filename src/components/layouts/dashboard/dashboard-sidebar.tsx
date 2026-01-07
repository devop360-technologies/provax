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
} from "lucide-react";
import { BaseSidebar, NavItem } from "./base-sidebar";

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
];

export function DashboardSidebar() {
  return <BaseSidebar navItems={navItems} homeHref="/dashboard" />;
}
