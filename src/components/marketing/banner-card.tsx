"use client";

import Image from "next/image";
import { Edit2, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerStatus = "Active" | "Scheduled" | "Draft" | "Inactive";

interface BannerCardProps {
  title: string;
  status: BannerStatus;
  imageSrc: string;
  imageAlt?: string;
  scheduledFrom?: string;
  scheduledTo?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  draggable?: boolean;
}

const statusStyles: Record<BannerStatus, string> = {
  Active: "bg-[#10B981] text-white",
  Scheduled: "bg-[#3B82F6] text-white",
  Draft: "bg-gray-600 text-white",
  Inactive: "bg-gray-500 text-white",
};

export function BannerCard({
  title,
  status,
  imageSrc,
  imageAlt = "Banner image",
  scheduledFrom,
  scheduledTo,
  onEdit,
  onDelete,
  className,
  draggable = false,
}: BannerCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-[#2a2d4a] bg-[#23234B] p-3 transition-all hover:border-[#3a3d5a]",
        className
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {draggable && (
            <button className="cursor-grab text-gray-300 hover:text-gray-400 active:cursor-grabbing">
              <GripVertical className="size-6" />
            </button>
          )}
          <h3 className="text-xs font-medium text-white">{title}</h3>
          <span
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-medium",
              statusStyles[status]
            )}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onEdit}
            className="rounded-md bg-[#4F46E5] p-1 text-white transition-colors hover:bg-[#4338CA]"
          >
            <Edit2 className="size-3" />
          </button>
          <button
            onClick={onDelete}
            className="rounded-md bg-[#EF4444] p-1 text-white transition-colors hover:bg-[#DC2626]"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative mb-2 aspect-[6/2] w-full overflow-hidden rounded-md p-4">
        <div className="relative h-full w-full overflow-hidden rounded-sm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 700px) 100vw, (max-width: 1000px) 40vw, 25vw"
          />
        </div>
      </div>

      {/* Schedule Info */}
      {(scheduledFrom || scheduledTo) && (
        <div className="text-[10px] text-gray-400">
          <span>Scheduled: {scheduledFrom}</span>
          {scheduledTo && (
            <>
              <span className="mx-1">-</span>
              <span>{scheduledTo}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
