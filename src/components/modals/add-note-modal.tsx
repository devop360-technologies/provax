"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function AddNoteModal({ isOpen, onClose, userName }: AddNoteModalProps) {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleAddNote = () => {
    if (note.trim()) {
      // Handle add note logic here
      // TODO: Implement note adding for userName with note content
      setNote("");
      onClose();
    }
  };

  const handleCancel = () => {
    setNote("");
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
      <div className="relative w-full max-w-lg rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2d4a] pb-4">
          <h2 className="text-lg font-semibold text-white">Add Internal Note</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="py-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
                Note
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter internal note..."
                className="w-full h-32 resize-none rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleAddNote}
            disabled={!note.trim()}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Note
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