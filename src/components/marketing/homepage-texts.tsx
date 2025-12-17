"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomepageTextsProps {
  mainTitle?: string;
  mainTitlePlaceholder?: string;
  subtitle?: string;
  subtitlePlaceholder?: string;
  description?: string;
  descriptionPlaceholder?: string;
  onSave?: () => void;
  className?: string;
}

export function HomepageTexts({
  mainTitle = "Welcome to Our Platform",
  mainTitlePlaceholder = "Enter main title",
  subtitle = "Discover amazing services and products",
  subtitlePlaceholder = "Enter subtitle",
  description = "Our platform connects you with the best service providers and products. Join thousands of satisfied customers today.",
  descriptionPlaceholder = "Enter description",
  onSave,
  className,
}: HomepageTextsProps) {
  return (
    <div
      className={cn(
        "space-y-6 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6",
        className
      )}
    >
      {/* Header */}
      <h2 className="text-sm font-medium text-white">Homepage Texts</h2>

      {/* Main Title and Subtitle Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Title */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-300">Main Title</label>
          <input
            type="text"
            defaultValue={mainTitle}
            placeholder={mainTitlePlaceholder}
            className="w-full rounded-lg border border-[#2a2d4a] bg-[#262656] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors hover:border-[#3a3d5a] focus:border-[#4F46E5] focus:outline-none"
          />
          <p className="text-[10px] text-gray-500">
            The main headline on the homepage
          </p>
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-300">Subtitle</label>
          <input
            type="text"
            defaultValue={subtitle}
            placeholder={subtitlePlaceholder}
            className="w-full rounded-lg border border-[#2a2d4a] bg-[#262656] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors hover:border-[#3a3d5a] focus:border-[#4F46E5] focus:outline-none"
          />
          <p className="text-[10px] text-gray-500">
            The subtitle below the main title
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-300">Description</label>
        <textarea
          defaultValue={description}
          placeholder={descriptionPlaceholder}
          rows={4}
          className="w-full rounded-lg border border-[#2a2d4a] bg-[#262656] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors hover:border-[#3a3d5a] focus:border-[#4F46E5] focus:outline-none"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={onSave}
          className="h-9 gap-2 rounded-lg bg-[#3B82F6] px-4 text-sm font-medium text-white hover:bg-[#2563EB]"
        >
          <Save className="size-4" />
          Save Text Changes
        </Button>
      </div>
    </div>
  );
}
