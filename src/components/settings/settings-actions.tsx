"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsActionsProps {
  onResetToDefault?: () => void;
  onSaveChanges?: () => void;
  className?: string;
}

export function SettingsActions({
  onResetToDefault,
  onSaveChanges,
  className,
}: SettingsActionsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 pt-6", className)}>
      <Button
        onClick={onResetToDefault}
        className="h-10 rounded-lg border border-[#404254] bg-transparent px-8 text-sm font-medium text-gray-400 hover:bg-[#252850]"
      >
        Reset to Default
      </Button>
      <Button
        onClick={onSaveChanges}
        className="h-10 rounded-lg bg-[#3B82F6] px-8 text-sm font-medium text-white hover:bg-[#2563EB]"
      >
        Save Changes
      </Button>
    </div>
  );
}
