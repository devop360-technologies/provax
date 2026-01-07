/**
 * Shared modal utilities and base components to reduce duplication
 */

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSave?: () => void;
  onCancel?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isLoading?: boolean;
}

const MAX_WIDTH_MAP = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
} as const;

export function BaseModal({
  isOpen,
  onClose,
  title,
  onSave,
  onCancel,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  children,
  className,
  maxWidth = '2xl',
  isLoading = false,
}: BaseModalProps) {
  if (!isOpen) return null;

  const handleCancel = onCancel || onClose;
  const handleSave = onSave || onClose;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className
      )}
    >
      <div className={cn(
        "w-full max-h-[90vh] overflow-y-auto rounded-xl border border-[#404254] bg-[#1D1D41] p-6 shadow-xl",
        MAX_WIDTH_MAP[maxWidth]
      )}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sticky top-0 bg-[#1D1D41] z-10">
          <h2 className="text-lg font-medium text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-8">
          {children}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="h-10 rounded-lg bg-[#3B82F6] px-6 text-sm font-medium text-white hover:bg-[#2563EB] disabled:opacity-50"
          >
            {isLoading ? "Processing..." : saveButtonText}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            className="h-10 rounded-lg border border-[#404254] bg-[#252850] px-6 text-sm font-medium text-gray-400 hover:bg-[#1a1d3a] disabled:opacity-50"
          >
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared form input styles
 */
export const MODAL_INPUT_CLASSES = {
  base: "w-full rounded-lg border border-[#404254] bg-[#252850] px-4 py-2.5 text-sm text-white placeholder-gray-600 transition-colors hover:border-[#505464] focus:border-[#4F46E5] focus:outline-none",
  label: "mb-2 block text-sm font-medium text-gray-300",
  container: "space-y-4",
  field: "",
} as const;

/**
 * Create form field classes
 */
export function getFormFieldClass(): string {
  return "mb-4 last:mb-0";
}

/**
 * Form input change handler utility
 */
export function createInputChangeHandler<T extends Record<string, any>>(
  setFormData: (fn: (prev: T) => T) => void,
  typeConversions?: Record<string, (value: string) => any>
) {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeConversions?.[name] ? typeConversions[name](value) : value,
    }));
  };
}

/**
 * File change handler utility
 */
export function createFileChangeHandler(
  setFormData: (fn: (prev: any) => any) => void,
  setFileName: (name: string) => void,
  fileFieldName: string = 'image'
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        [fileFieldName]: file,
      }));
    }
  };
}

/**
 * Toggle switch handler utility
 */
export function createToggleHandler(
  setFormData: (fn: (prev: any) => any) => void,
  fieldName: string
) {
  return () => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };
}
