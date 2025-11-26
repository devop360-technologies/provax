// "use client";

// import { Search, Bell, ChevronDown, Zap, LogOut } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { useTransition } from "react";
// import { signOut } from "next-auth/react";

// export function DashboardHeader() {
//   const [isPending, startTransition] = useTransition();

//   const handleSignOut = () => {
//     startTransition(async () => {
//       await signOut({ redirectTo: "/login" });
//     });
//   };

//   return (
//     <header className="bg-[#1a1d3a] border-b border-[#2a2d4a] px-8 py-5 sticky top-5 rounded-2xl mr-4 z-40">
//       <div className="flex items-center justify-between gap-8">
//         {/* Left side - Welcome text */}
//         <div className="flex-1 min-w-0">
//           <h1 className="text-xl font-semibold text-white truncate">Welcome back, Andrew Smith</h1>
//           <p className="text-[12px] text-gray-400 mt-1">Welcome back, manage your automotive AI platform</p>
//         </div>

//         {/* Center - Search bar */}
//         <div className="flex-1 min-w-0 max-w-md">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
//             <Input 
//               placeholder="Find Something..."
//               className="pl-10 pr-4 h-10 bg-[#252850] border border-[#2a2d4a] text-gray-300 placeholder-gray-500 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
//             />
//           </div>
//         </div>

//         {/* Right side - Notification and User profile */}
//         <div className="flex items-center gap-5">
//           {/* Notification Bell */}
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             className="h-10 w-10 text-gray-400 hover:text-white hover:bg-[#252850] rounded-lg transition-colors"
//           >
//             <Bell className="h-5 w-5" />
//           </Button>

//           {/* User Profile with Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#252850] transition-colors group">
               
//                 <Avatar className="h-10 w-10 ">
//                   <AvatarImage src="/avatars/user-avatar.jpg" alt="Daniel Estasmos" />
//                   <AvatarFallback className="bg-gradient-to-br rounded-full from-green-400 to-green-600 text-white font-bold text-sm">
//                     DE
//                   </AvatarFallback>
//                 </Avatar>
//                <div className="text-right">
//                   <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">WELCOME</p>
//                   <p className="text-sm font-semibold text-white">Daniel Estasmos</p>
//                 </div>
//                 <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-64 bg-[#1a1d3a] border-[#2a2d4a]">
//               <DropdownMenuLabel className="px-4 py-3">
//                 <div className="flex items-center gap-3">
//                   <Avatar className="h-9 w-9 border-2 border-green-500">
//                     <AvatarImage src="/avatars/user-avatar.jpg" alt="Daniel Estasmos" />
//                     <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-sm">
//                       DE
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm font-semibold text-white">Daniel Estasmos</p>
//                     <p className="text-xs text-gray-400">admin@provax.com</p>
//                   </div>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator className="bg-[#2a2d4a]" />
//               <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-[#252850] cursor-pointer px-4 py-2 flex items-center gap-2">
//                 <Zap className="h-4 w-4" />
//                 Upgrade to Pro
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="bg-[#2a2d4a]" />
//               <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-[#252850] cursor-pointer px-4 py-2 flex items-center gap-2">
//                 Dashboard
//               </DropdownMenuItem>
//               <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-[#252850] cursor-pointer px-4 py-2 flex items-center gap-2">
//                 Account
//               </DropdownMenuItem>
//               <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-[#252850] cursor-pointer px-4 py-2 flex items-center gap-2">
//                 Billing
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="bg-[#2a2d4a]" />
//               <DropdownMenuItem 
//                 onClick={handleSignOut}
//                 disabled={isPending}
//                 className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer px-4 py-2 flex items-center gap-2"
//               >
//                 <LogOut className="h-4 w-4" />
//                 Sign Out
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }
// Keep your header exactly as is, just replace the old dropdown
import { Input } from "@/components/ui/input";
import { UserDropdown } from "@/components/layouts/dashboard/nav-user"; // ← your new component
import { Button } from "@react-email/components";
import { Bell, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-[#1D1D41] border-b border-[#2a2d4a] px-6 py-5 sticky top-5 rounded-2xl mr-4 z-40">
      <div className="flex items-center justify-between gap-8">
        {/* Left side - Welcome text */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-white truncate">Welcome back, Andrew Smith</h1>
          <p className="text-[12px] text-gray-400 mt-1">Welcome back, manage your automotive AI platform</p>
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 min-w-0 max-w-md">
          <div className="relative">
            <Input
              placeholder="Find Something..."
              className="pl-5 pr-4 h-10 bg-[#252850] border border-[#2a2d4a] text-gray-300 placeholder-gray-500 rounded-2xl focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <Button 
            // variant="ghost" 
            // size="icon" 
            className="h-10 w-10 mt-4 text-gray-400 hover:text-white hover:bg-[#252850] rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* ← This is now dynamic & reusable */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}