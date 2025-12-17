"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CreateMarketingCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (campaignData: MarketingCampaignFormData) => void;
  className?: string;
}

export interface MarketingCampaignFormData {
  name: string;
  audience: string;
  template: string;
  schedule: string;
  timeZone: string;
}

export function CreateMarketingCampaignModal({
  isOpen,
  onClose,
  onSave,
  className,
}: CreateMarketingCampaignModalProps) {
  const [formData, setFormData] = useState<MarketingCampaignFormData>({
    name: "",
    audience: "",
    template: "",
    schedule: "",
    timeZone: "Eastern Time (EST)",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAsDraft = () => {
    console.log("Save as draft:", formData);
    onClose();
  };

  const handleScheduleCampaign = () => {
    onSave?.(formData);
    onClose();
  };

  const handleSendImmediately = () => {
    console.log("Send immediately:", formData);
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
            Create Marketing Campaign
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
          {/* Campaign Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Campaign Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter campaign name"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Audience */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Audience
            </label>
            <select
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            >
              <option value="">Select audience</option>
              <option value="all-users">All Users</option>
              <option value="active-users">Active Users</option>
              <option value="premium-users">Premium Users</option>
              <option value="subscription">Subscription</option>
            </select>
          </div>

          {/* Email Template */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Template
            </label>
            <select
              name="template"
              value={formData.template}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            >
              <option value="">Select template</option>
              <option value="welcome">Welcome Email</option>
              <option value="promotion">Promotion Email</option>
              <option value="newsletter">Newsletter</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          {/* Email Builder */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Builder
            </label>
            <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 flex flex-col items-center justify-center min-h-64">
              <p className="mb-4 text-sm text-gray-400">
                Drag and drop elements to build your email
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button className="rounded-md border border-[#4F46E5] bg-transparent px-3 py-1.5 text-xs font-medium text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-colors">
                  Text Block
                </button>
                <button className="rounded-md border border-[#4F46E5] bg-transparent px-3 py-1.5 text-xs font-medium text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-colors">
                  Image
                </button>
                <button className="rounded-md border border-[#4F46E5] bg-transparent px-3 py-1.5 text-xs font-medium text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-colors">
                  Buttons
                </button>
                <button className="rounded-md border border-[#4F46E5] bg-transparent px-3 py-1.5 text-xs font-medium text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-colors">
                  Columns
                </button>
              </div>
            </div>
          </div>

          {/* Schedule and TimeZone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Schedule
              </label>
              <input
                type="datetime-local"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy --:--:--"
                className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Time Zone
              </label>
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
              >
                <option value="Eastern Time (EST)">Eastern Time (EST)</option>
                <option value="Central Time (CST)">Central Time (CST)</option>
                <option value="Mountain Time (MST)">Mountain Time (MST)</option>
                <option value="Pacific Time (PST)">Pacific Time (PST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Button
            onClick={handleSaveAsDraft}
            className="h-10 rounded-lg bg-[#3B82F6] px-6 text-sm font-medium text-white hover:bg-[#2563EB]"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleScheduleCampaign}
            className="h-10 rounded-lg bg-[#10B981] px-6 text-sm font-medium text-white hover:bg-[#059669]"
          >
            Schedule Campaign
          </Button>
          <Button
            onClick={handleSendImmediately}
            className="h-10 rounded-lg bg-[#06B6D4] px-6 text-sm font-medium text-white hover:bg-[#0891B2]"
          >
            Send Immediately
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
