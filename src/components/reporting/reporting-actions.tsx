"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportingActionsProps {
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  className?: string;
}

export function ReportingActions({
  onExportCSV,
  onExportPDF,
  className,
}: ReportingActionsProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3", className)}>
      <Button
        onClick={onExportCSV}
        className="h-10 gap-2 rounded-lg bg-[#10B981] px-6 text-sm font-medium text-white hover:bg-[#059669]"
      >
        <Download className="size-4" />
        Export CSV
      </Button>
      <Button
        onClick={onExportPDF}
        className="h-10 gap-2 rounded-lg bg-[#FF6B6B] px-6 text-sm font-medium text-white hover:bg-[#EE5A52]"
      >
        <Download className="size-4" />
        Export PDF
      </Button>
    </div>
  );
}
