"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AddBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (bannerData: BannerFormData) => void;
  className?: string;
}

export interface BannerFormData {
  title: string;
  image: File | null;
  linkUrl: string;
  startDate: string;
  endDate: string;
  displayOrder: number;
}

export function AddBannerModal({
  isOpen,
  onClose,
  onSave,
  className,
}: AddBannerModalProps) {
  const [formData, setFormData] = useState<BannerFormData>({
    title: "",
    image: null,
    linkUrl: "",
    startDate: "",
    endDate: "",
    displayOrder: 1,
  });

  const [fileName, setFileName] = useState("No file chosen");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "displayOrder" ? parseInt(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50", className)}>
      <div className="w-full max-w-2xl rounded-xl border border-[#404254] bg-[#1D1D41] p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Add New Banner</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Banner Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Banner Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Banner Title"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Banner Image
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-[#505464]">
                Choose file
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-400">{fileName}</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Recommended size: 1200×400 pixels
            </p>
          </div>

          {/* Link URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Link URL
            </label>
            <input
              type="text"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              Recommended size: 1200×400 pixels
            </p>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Link URL
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy --:--:--"
                className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Link URL
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy --:--:--"
                className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
              />
            </div>
          </div>

          {/* Display Order */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Display Order
            </label>
            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleInputChange}
              min="1"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            onClick={handleSave}
            className="h-10 rounded-lg bg-[#3B82F6] px-8 text-sm font-medium text-white hover:bg-[#2563EB]"
          >
            Save Banner
          </Button>
          <Button
            onClick={onClose}
            className="h-10 rounded-lg border border-[#404254] bg-[#252850] px-8 text-sm font-medium text-gray-400 hover:bg-[#1a1d3a]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
