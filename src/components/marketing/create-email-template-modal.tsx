"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CreateEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (templateData: EmailTemplateFormData) => void;
  className?: string;
}

export interface EmailTemplateFormData {
  name: string;
  subject: string;
  body: string;
}

const availableVariables = [
  "user_name",
  "user_email",
  "company_name",
  "customer_date",
  "order_id",
  "order_total",
];

export function CreateEmailTemplateModal({
  isOpen,
  onClose,
  onSave,
  className,
}: CreateEmailTemplateModalProps) {
  const [formData, setFormData] = useState<EmailTemplateFormData>({
    name: "",
    subject: "",
    body: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  const handleSaveAndTest = () => {
    // Save and test implementation placeholder - use formData
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
            Create Email Template
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
          {/* Template Name */}
          <div>
            <label htmlFor="template-name" className="mb-2 block text-sm font-medium text-gray-300">
              Template Name
            </label>
            <input
              id="template-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter template name"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="template-subject" className="mb-2 block text-sm font-medium text-gray-300">
              Subject
            </label>
            <input
              id="template-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter email subject"
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="template-body" className="mb-2 block text-sm font-medium text-gray-300">
              Body
            </label>
            <textarea
              id="template-body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="https://example.com"
              rows={8}
              className="w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none resize-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              Use {'{{variable}}'} for dynamic content
            </p>
          </div>

          {/* Available Variables */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-400">
              Available Variables
            </p>
            <div className="flex flex-wrap gap-2">
              {availableVariables.map((variable) => (
                <button
                  key={variable}
                  className="rounded-full bg-gray-600 px-3 py-1 text-xs font-medium text-white hover:bg-gray-500 transition-colors cursor-pointer"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            onClick={handleSave}
            className="h-10 rounded-lg bg-[#3B82F6] px-6 text-sm font-medium text-white hover:bg-[#2563EB]"
          >
            Save Template
          </Button>
          <Button
            onClick={handleSaveAndTest}
            className="h-10 rounded-lg border border-[#3B82F6] bg-transparent px-6 text-sm font-medium text-[#3B82F6] hover:bg-[#3B82F6]/10"
          >
            Save & Test
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
