"use client";

import { 
  LayoutDashboard, 
  ShieldCheck, 
  Store,
  Gavel,
  Wallet,
  CreditCard,
  HelpCircle,
  Settings,
} from "lucide-react";
import { BaseSidebar, NavItem } from "./base-sidebar";

const navItems: NavItem[] = [
  { href: "/client", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/client/certification", icon: ShieldCheck, label: "AI Certification" },
  { href: "/client/marketplace", icon: Store, label: "Marketplace" },
  { href: "/client/bidding", icon: Gavel, label: "Bidding System" },
  { href: "/client/financial", icon: Wallet, label: "Financial" },
  { href: "/client/subscription", icon: CreditCard, label: "Subscription Plans" },
  { href: "/client/support", icon: HelpCircle, label: "Disputes & Support" },
  { href: "/client/settings", icon: Settings, label: "Profile & Settings" },
];

export function ClientDashboardSidebar() {
  return <BaseSidebar navItems={navItems} homeHref="/client" />;
}
