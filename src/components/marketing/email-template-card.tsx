"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Zap, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type TemplateStatus = "Active" | "Draft";

interface EmailTemplateCardProps {
  title: string;
  description: string;
  status: TemplateStatus;
  onEdit?: () => void;
  onTest?: () => void;
  onRestore?: () => void;
  className?: string;
}

const statusStyles: Record<TemplateStatus, string> = {
  Active: "bg-[#10B981] text-white",
  Draft: "bg-gray-600 text-white",
};

export function EmailTemplateCard({
  title,
  description,
  status,
  onEdit,
  onTest,
  onRestore,
  className,
}: EmailTemplateCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#404254] bg-[#0f1123] p-4 transition-all hover:border-[#505464]",
        className
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[9px] font-medium",
            statusStyles[status]
          )}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-xs text-gray-400">{description}</p>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={onEdit}
          className="flex-1 h-8 gap-1.5 rounded-md border border-[#4F46E5] bg-transparent px-2 text-xs font-medium text-[#4F46E5] hover:bg-[#4F46E5]/10"
        >
          <Edit2 className="size-3" />
          Edits
        </Button>
        <Button
          onClick={onTest}
          className="flex-1 h-8 gap-1.5 rounded-md border border-gray-500 bg-transparent px-2 text-xs font-medium text-gray-400 hover:bg-gray-500/10"
        >
          <Zap className="size-3" />
          Test
        </Button>
        <Button
          onClick={onRestore}
          className="flex-1 h-8 gap-1.5 rounded-md border border-yellow-600 bg-transparent px-2 text-xs font-medium text-yellow-600 hover:bg-yellow-600/10"
        >
          <RotateCcw className="size-3" />
          Restore Default
        </Button>
      </div>
    </div>
  );
}
