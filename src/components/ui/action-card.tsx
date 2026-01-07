"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  buttonText: string;
  buttonBg: string;
  buttonHoverBg: string;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  iconColor,
  buttonText,
  buttonBg,
  buttonHoverBg,
  onClick,
  className,
}: Readonly<ActionCardProps>) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex justify-center mb-4">
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <p className="text-sm text-gray-400 mb-6">{description}</p>
      <button
        onClick={onClick}
        className={cn(
          "w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors",
          buttonBg,
          `hover:${buttonHoverBg}`
        )}
        style={{
          backgroundColor: buttonBg.startsWith("bg-") ? undefined : buttonBg,
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Action card with custom button colors using inline styles for better control
interface ActionCardWithStylesProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  buttonText: string;
  buttonColor: string;
  buttonHoverColor: string;
  onClick?: () => void;
  className?: string;
}

export function ActionCardStyled({
  title,
  description,
  icon: Icon,
  iconColor,
  buttonText,
  buttonColor,
  buttonHoverColor,
  onClick,
  className,
}: Readonly<ActionCardWithStylesProps>) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex justify-center mb-4">
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <p className="text-sm text-gray-400 mb-6">{description}</p>
      <button
        onClick={onClick}
        className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
        style={{ backgroundColor: buttonColor }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = buttonHoverColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = buttonColor; }}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Info card with icon, title, and value display
interface InfoCardProps {
  title: string;
  icon: ReactNode;
  iconBg: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  icon,
  iconBg,
  children,
  action,
  className,
}: Readonly<InfoCardProps>) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 relative", className)}>
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
          {icon}
        </div>
      </div>
      {children}
      {action}
    </div>
  );
}
