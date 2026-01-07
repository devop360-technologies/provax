"use client";

import { useState } from "react";
import { BaseModal, MODAL_INPUT_CLASSES, createInputChangeHandler, createFileChangeHandler } from "@/components/ui/modal-base";

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

  const handleInputChange = createInputChangeHandler(setFormData, {
    displayOrder: (val) => parseInt(val) || 0,
  });

  const handleFileChange = createFileChangeHandler(setFormData, setFileName, 'image');

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Banner"
      onSave={handleSave}
      saveButtonText="Save Banner"
      className={className}
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Banner Title */}
        <div>
          <label htmlFor="banner-title" className={MODAL_INPUT_CLASSES.label}>
            Banner Title
          </label>
          <input
            type="text"
            id="banner-title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter Banner Title"
            className={MODAL_INPUT_CLASSES.base}
          />
        </div>

        {/* Banner Image */}
        <div>
          <label htmlFor="banner-image" className={MODAL_INPUT_CLASSES.label}>
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
          <label htmlFor="link-url" className={MODAL_INPUT_CLASSES.label}>
            Link URL
          </label>
          <input
            type="text"
            id="link-url"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className={MODAL_INPUT_CLASSES.base}
          />
          <p className="mt-2 text-xs text-gray-500">
            Recommended size: 1200×400 pixels
          </p>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className={MODAL_INPUT_CLASSES.label}>
              Start Date
            </label>
            <input
              type="datetime-local"
              id="start-date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              placeholder="mm/dd/yyyy --:--:--"
              className={MODAL_INPUT_CLASSES.base}
            />
          </div>
          <div>
            <label htmlFor="end-date" className={MODAL_INPUT_CLASSES.label}>
              End Date
            </label>
            <input
              type="datetime-local"
              id="end-date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              placeholder="mm/dd/yyyy --:--:--"
              className={MODAL_INPUT_CLASSES.base}
            />
          </div>
        </div>

        {/* Display Order */}
        <div>
          <label htmlFor="display-order" className={MODAL_INPUT_CLASSES.label}>
            Display Order
          </label>
          <input
            type="number"
            id="display-order"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleInputChange}
            min="1"
            className={MODAL_INPUT_CLASSES.base}
          />
        </div>
      </div>
    </BaseModal>
  );
}
