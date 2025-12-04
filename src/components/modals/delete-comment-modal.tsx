"use client";

import { createPortal } from "react-dom";
import { X, AlertTriangle } from "lucide-react";

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentAuthor?: string;
}

export function DeleteCommentModal({ isOpen, onClose, onConfirm, commentAuthor }: DeleteCommentModalProps) {
  if (!isOpen) return null;

  const handleDelete = () => {
    onConfirm();
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
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-500/20 p-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Delete Comment</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="py-6">
          <p className="text-gray-300">
            Are you sure you want to delete this technical comment
            {commentAuthor && (
              <span className="font-medium text-white"> by {commentAuthor}</span>
            )}?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            This action cannot be undone. The comment will be permanently removed from the certification record.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-[#2a2d4a]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete Comment
          </button>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}