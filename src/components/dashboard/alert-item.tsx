"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItemProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

export function AlertItem({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  time
}: Readonly<AlertItemProps>) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#14162e] transition-colors">
      <div className={cn("p-2 rounded-full", iconBg)}>
        <Icon className={cn("w-4 h-4", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
}
