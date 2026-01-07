import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  className?: string;
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
  marginRight?: boolean;
}

export function DashboardCard({ className, children, padding = "md", marginRight = false }: DashboardCardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-[#2a2d4a] bg-[#1D1D41]",
        paddingClasses[padding],
        marginRight && "mr-0 md:mr-7",
        className
      )}
    >
      {children}
    </div>
  );
}

interface DashboardCardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function DashboardCardHeader({ title, subtitle, action, className }: DashboardCardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
