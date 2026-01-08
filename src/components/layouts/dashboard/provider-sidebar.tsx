"use client";

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
  HelpCircle,
} from "lucide-react";
import { BaseSidebar, NavItem } from "./base-sidebar";

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
  return <BaseSidebar navItems={navItems} homeHref="/provider" />;
}
