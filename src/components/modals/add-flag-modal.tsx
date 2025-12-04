"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";

interface AddFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function AddFlagModal({ isOpen, onClose, userName }: AddFlagModalProps) {
  const [priority, setPriority] = useState("Low Priority");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const priorities = ["Low Priority", "Medium Priority", "High Priority", "Critical Priority"];

  if (!isOpen) return null;

  const handleAddFlag = () => {
    if (title.trim() && description.trim()) {
      // Handle add flag logic here
      console.log(`Adding flag for ${userName}:`, { priority, title, description });
      setTitle("");
      setDescription("");
      setPriority("Low Priority");
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setPriority("Low Priority");
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
          <h2 className="text-lg font-semibold text-white">Add User Flag</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-[#2a2d4a] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="py-6">
          <div className="space-y-6">
            {/* Flag Priority Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Flag Priority
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <span>{priority}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#2a2d4a] bg-[#252850] shadow-lg z-10">
                    {priorities.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPriority(p);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#2a2d4a] first:rounded-t-lg last:rounded-b-lg"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter flag title..."
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter flag description..."
                className="w-full h-32 resize-none rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleAddFlag}
            disabled={!title.trim() || !description.trim()}
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