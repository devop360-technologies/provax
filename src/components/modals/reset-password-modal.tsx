"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function ResetPasswordModal({ isOpen, onClose, userName }: ResetPasswordModalProps) {
  if (!isOpen) return null;

  const handleEnable = () => {
    // Handle password reset enable logic here
    // TODO: Implement password reset for userName
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2d4a] pb-4">
          <h2 className="text-lg font-semibold text-white">Access Reset Password</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="py-6">
          <p className="text-center text-gray-300">
            "Are you sure you want to enable password reset access for{" "}
            <span className="font-semibold text-white">{userName}</span>? Once enabled, the user will be able to reset their own password."
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleEnable}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Enable
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-[#2a2d4a]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}