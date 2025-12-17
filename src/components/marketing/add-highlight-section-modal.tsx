"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AddHighlightSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (sectionData: HighlightSectionFormData) => void;
  className?: string;
}

export interface HighlightSectionFormData {
  title: string;
  description: string;
  image?: File | null;
  displayOrder: number;
  active: boolean;
}

export function AddHighlightSectionModal({
  isOpen,
  onClose,
  onSave,
  className,
}: AddHighlightSectionModalProps) {
  const [formData, setFormData] = useState<HighlightSectionFormData>({
    title: "",
    description: "",
    image: null,
    displayOrder: 1,
    active: true,
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

  const handleToggleActive = () => {
    setFormData((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className
      )}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#404254] bg-[#1D1D41] p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sticky top-0 bg-[#1D1D41]">
          <h2 className="text-lg font-medium text-white">
            Add Highlight Section
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter section title"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter section description"
              rows={6}
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Image (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-gray-500 transition-colors hover:border-[#505464]">
                <span>Choose file</span>
                <span className="ml-4 text-gray-600">{fileName}</span>
              </div>
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

          {/* Active Toggle */}
          <div className="flex items-center gap-3 py-2">
            <button
              onClick={handleToggleActive}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                formData.active ? "bg-[#3B82F6]" : "bg-gray-600"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  formData.active ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className="text-sm text-gray-300">
              {formData.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            onClick={handleSave}
            className="h-10 rounded-lg bg-[#3B82F6] px-6 text-sm font-medium text-white hover:bg-[#2563EB]"
          >
            Save Highlight Section
          </Button>
          <Button
            onClick={onClose}
            className="h-10 rounded-lg border border-[#404254] bg-[#252850] px-6 text-sm font-medium text-gray-400 hover:bg-[#1a1d3a]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
