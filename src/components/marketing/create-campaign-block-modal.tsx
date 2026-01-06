"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CreateCampaignBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (campaignData: CampaignBlockFormData) => void;
  className?: string;
}

export interface CampaignBlockFormData {
  title: string;
  description: string;
  linkUrl1: string;
  linkUrl2: string;
  displayOrder: number;
  activateImmediately: boolean;
}

export function CreateCampaignBlockModal({
  isOpen,
  onClose,
  onSave,
  className,
}: CreateCampaignBlockModalProps) {
  const [formData, setFormData] = useState<CampaignBlockFormData>({
    title: "",
    description: "",
    linkUrl1: "",
    linkUrl2: "",
    displayOrder: 1,
    activateImmediately: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "displayOrder" ? parseInt(value) || 0 : value,
    }));
  };

  const handleToggleActivate = () => {
    setFormData((prev) => ({
      ...prev,
      activateImmediately: !prev.activateImmediately,
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
            Create Campaign Block
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
          {/* Campaign Title */}
          <div>
            <label htmlFor="block-title" className="mb-2 block text-sm font-medium text-gray-300">
              Campaign Title
            </label>
            <input
              id="block-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter campaign title"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="block-description" className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="block-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter campaign description"
              rows={6}
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none resize-none"
            />
          </div>

          {/* Link URLs Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Link URL 1 */}
            <div>
              <label htmlFor="block-link-url-1" className="mb-2 block text-sm font-medium text-gray-300">
                Link URL
              </label>
              <input
                id="block-link-url-1"
                type="text"
                name="linkUrl1"
                value={formData.linkUrl1}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy ->|-<-|-"
                className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
              />
            </div>

            {/* Link URL 2 */}
            <div>
              <label htmlFor="block-link-url-2" className="mb-2 block text-sm font-medium text-gray-300">
                Link URL
              </label>
              <input
                id="block-link-url-2"
                type="text"
                name="linkUrl2"
                value={formData.linkUrl2}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy ->|-<-|-"
                className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
              />
            </div>
          </div>

          {/* Display Order */}
          <div>
            <label htmlFor="block-display-order" className="mb-2 block text-sm font-medium text-gray-300">
              Display Order
            </label>
            <input
              id="block-display-order"
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleInputChange}
              min="1"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Activate Immediately Toggle */}
          <div className="flex items-center gap-3 py-2">
            <button
              onClick={handleToggleActivate}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                formData.activateImmediately ? "bg-[#3B82F6]" : "bg-gray-600"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  formData.activateImmediately ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className="text-sm text-gray-300">Activate immediately</span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            onClick={handleSave}
            className="h-10 rounded-lg bg-[#3B82F6] px-6 text-sm font-medium text-white hover:bg-[#2563EB]"
          >
            Create Campaign
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
