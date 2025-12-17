"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PreviewHomepageChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish?: () => void;
  className?: string;
}

export function PreviewHomepageChangesModal({
  isOpen,
  onClose,
  onPublish,
  className,
}: PreviewHomepageChangesModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className
      )}
    >
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#404254] bg-[#1D1D41] shadow-xl">
        {/* Header */}
        <div className="sticky top-0 border-b border-[#404254] bg-[#1D1D41] px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            Preview Homepage Changes
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6 space-y-6">
          {/* Homepage Title & Subtitle */}
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-white">
              Welcome to Our Platform
            </h1>
            <p className="text-gray-400">
              Discover amazing services and products
            </p>
          </div>

          {/* Banner Image */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-[#404254]">
            <Image
              src="/provax-dashboard/images/car1.png"
              alt="Banner"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>

          {/* Highlight Sections Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Featured Services */}
            <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 text-center">
              <h3 className="mb-2 text-base font-medium text-white">
                Featured Services
              </h3>
              <p className="text-sm text-gray-400">
                Showcase our most popular services with high-quality images and compelling descriptions.
              </p>
            </div>

            {/* Customer Testimonials */}
            <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 text-center">
              <h3 className="mb-2 text-base font-medium text-white">
                Customer Testimonials
              </h3>
              <p className="text-sm text-gray-400">
                Display reviews and testimonials from satisfied customers to build trust.
              </p>
            </div>

            {/* Latest News */}
            <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 text-center">
              <h3 className="mb-2 text-base font-medium text-white">
                Latest News
              </h3>
              <p className="text-sm text-gray-400">
                Keep visitors informed with the latest updates and announcements.
              </p>
            </div>
          </div>

          {/* Campaign Block */}
          <div className="rounded-lg border-l-4 border-l-[#00D9FF] border border-[#404254] bg-[#252850] p-6">
            <h3 className="text-lg font-medium text-white mb-2">
              Black Friday Sale
            </h3>
            <p className="text-gray-400 mb-4">
              Special discounts on all services for Black Friday. Limited time offer!
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-gray-500">
                Active: 2023-11-20 to 2023-11-27
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 border-t border-[#404254] bg-[#1D1D41] px-6 py-4 flex items-center justify-center gap-3">
          <Button
            onClick={onPublish}
            className="h-10 rounded-lg bg-[#3B82F6] px-8 text-sm font-medium text-white hover:bg-[#2563EB]"
          >
            Publish Changes
          </Button>
          <Button
            onClick={onClose}
            className="h-10 rounded-lg border border-[#404254] bg-transparent px-8 text-sm font-medium text-gray-400 hover:bg-[#252850]"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
