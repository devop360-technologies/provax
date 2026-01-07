"use client";

import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleIcon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | string;
  className?: string;
}

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function ModalWrapper({
  isOpen,
  onClose,
  title,
  titleIcon,
  children,
  actions,
  maxWidth = "lg",
  className,
}: Readonly<ModalWrapperProps>) {
  if (!isOpen) return null;

  // Support both preset sizes and custom Tailwind classes
  const widthClass = maxWidthClasses[maxWidth] ?? maxWidth;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] p-6 shadow-2xl",
          widthClass,
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2d4a] pb-4">
          <div className="flex items-center gap-3">
            {titleIcon}
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="py-6">{children}</div>

        {/* Actions */}
        {actions && <div className="flex gap-3 pt-4">{actions}</div>}
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

// Pre-built button styles for modal actions
interface ModalButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
  className?: string;
}

export function ModalButton({
  onClick,
  disabled = false,
  variant = "primary",
  children,
  className,
}: Readonly<ModalButtonProps>) {
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border border-[#2a2d4a] bg-[#252850] text-gray-300 hover:bg-[#2a2d4a]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

// Common input component for modals
interface ModalInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "textarea";
  rows?: number;
}

export function ModalInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows = 4,
}: Readonly<ModalInputProps>) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const baseClasses =
    "w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500";

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={cn(baseClasses, "resize-none")}
        />
      ) : (
        <input
          type="text"
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}

// Dropdown component for modals
interface ModalDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

export function ModalDropdown({
  label,
  value,
  onChange,
  options,
}: Readonly<ModalDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <span>{value}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#2a2d4a] bg-[#252850] shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#2a2d4a] first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Checkbox component for modals
interface ModalCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ModalCheckbox({
  id,
  label,
  checked,
  onChange,
}: Readonly<ModalCheckboxProps>) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border border-[#2a2d4a] bg-[#252850] text-cyan-500 focus:ring-cyan-500"
      />
      <label htmlFor={id} className="text-sm text-gray-300">
        {label}
      </label>
    </div>
  );
}