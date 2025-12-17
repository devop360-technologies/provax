"use client";

import { Button } from "@/components/ui/button";
import { Eye, Megaphone, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  onPreviewChanges?: () => void;
  onPublish?: () => void;
  onSaveDraft?: () => void;
  className?: string;
}

export function ActionButtons({
  onPreviewChanges,
  onPublish,
  onSaveDraft,
  className,
}: ActionButtonsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        onClick={onPreviewChanges}
        className="h-9 gap-2 rounded-lg bg-[#3083FF] px-4 text-sm font-medium text-white hover:bg-[#4338CA]"
      >
        <Eye className="size-4" />
        Preview Changes
      </Button>
      <Button
        onClick={onPublish}
        className="h-9 gap-2 rounded-lg bg-[#10B981] px-6 text-sm font-medium text-white hover:bg-[#059669]"
      >
        <Megaphone className="size-4" />
        Publish
      </Button>
      <Button
        onClick={onSaveDraft}
        variant="outline"
        className="h-9 gap-2 rounded-lg border-[#2a2d] bg-transparent px-5 text-sm font-medium text-green-600 hover:bg-[#1a1d] hover:text-white"
      >
        <Save className="size-4" />
        Save Draft
      </Button>
    </div>
  );
}
