"use client";

import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionStatus = "Active" | "Draft" | "Inactive";

interface HighlightSection {
  id: string;
  title: string;
  description: string;
  status: SectionStatus;
  displayOrder: number;
}

interface HighlightSectionsProps {
  sections?: HighlightSection[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const statusStyles: Record<SectionStatus, string> = {
  Active: "bg-[#10B981] text-white",
  Draft: "bg-gray-600 text-white",
  Inactive: "bg-gray-500 text-white",
};

export function HighlightSections({
  sections = [
    {
      id: "1",
      title: "Featured Services",
      description: "Showcase our most popular services with high-quality images and compelling descriptions.",
      status: "Active",
      displayOrder: 1,
    },
    {
      id: "2",
      title: "Customer Testimonials",
      description: "Display reviews and testimonials from satisfied customers to build trust.",
      status: "Active",
      displayOrder: 2,
    },
    {
      id: "3",
      title: "Latest News",
      description: "Keep visitors informed with the latest updates and announcements.",
      status: "Draft",
      displayOrder: 3,
    },
  ],
  onAdd,
  onEdit,
  onDelete,
  className,
}: HighlightSectionsProps) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Highlight Sections</h2>
        <Button
          onClick={onAdd}
          className="h-8 gap-2 rounded-lg bg-[#3B82F6] px-3 text-xs font-medium text-white hover:bg-[#2563EB]"
        >
          <Plus className="size-3.5" />
          Add Highlight Section
        </Button>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-3 md:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-lg border border-[#2a2d4a] bg-[#262656] p-3 transition-all hover:border-[#3a3d5a]"
          >
            {/* Header */}
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xs font-medium text-white">{section.title}</h3>
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                    statusStyles[section.status]
                  )}
                >
                  {section.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit?.(section.id)}
                  className="rounded-md bg-[#4F46E5] p-1 text-white transition-colors hover:bg-[#4338CA]"
                >
                  <Edit2 className="size-2.5" />
                </button>
                <button
                  onClick={() => onDelete?.(section.id)}
                  className="rounded-md bg-[#EF4444] p-1 text-white transition-colors hover:bg-[#DC2626]"
                >
                  <Trash2 className="size-2.5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="mb-3 text-[10px] text-gray-400 line-clamp-3">
              {section.description}
            </p>

            {/* Display Order */}
            <div className="text-[9px] text-gray-500">
              Display order: 1 | Status: <span className="text-gray-400">{section.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
