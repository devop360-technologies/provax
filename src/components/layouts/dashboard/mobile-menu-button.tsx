"use client";

import { Menu } from "lucide-react";
import { useMobileSidebar } from "./mobile-sidebar-context";

export function MobileMenuButton() {
  const { toggle } = useMobileSidebar();

  return (
    <button
      onClick={toggle}
      className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#252850] transition-colors flex-shrink-0"
      aria-label="Toggle sidebar menu"
    >
      <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  );
}
