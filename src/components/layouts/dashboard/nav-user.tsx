import { ChevronDown, LogOut, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/components/sign-out-button";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

const NavMenu = [
  { title: "Dashboard", url: "/dashboard", icon: null },
  // { title: "Account", url: "/dashboard/general", icon: null },
  // { title: "Billing", url: "/dashboard/billing", icon: null },
];

export async function UserDropdown() {
  const user = await getCurrentUser();

  if (!user) return null;

  const displayName = user.name || user.email?.split("@")[0] || "User";
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#252850] transition-colors group">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || "/avatars/avatar-1.jpg"} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br rounded-full from-green-400 to-green-600 text-white font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">WELCOME</p>
            <p className="text-sm font-semibold text-white truncate max-w-32">
              {displayName}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 bg-[#1a1d3a] border-[#2a2d4a]">
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-green-500">
              <AvatarImage src={user.image || "/avatars/avatar-1.jpg"} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-white">{displayName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#2a2d4a]" />

        {/* Upgrade to Pro - optional */}
        {/* <DropdownMenuItem asChild>
          <Link href="/pricing" className="text-gray-400 hover:text-white hover:bg-[#252850] cursor-pointer px-4 py-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Upgrade to Pro
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator className="bg-[#2a2d4a]" />

        {NavMenu.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <Link href={item.url} className="text-gray-400 hover:text-white hover:bg-[#252850] cursor-pointer px-4 py-2">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-[#2a2d4a]" />

        <DropdownMenuItem asChild>
          <div className="w-full">
            <SignOutButton className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer px-4 py-2 flex items-center gap-2 text-left">
              <LogOut className="h-4 w-4" />
              Sign Out
            </SignOutButton>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}