"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";

interface AddTechnicalCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (commentData: {
    commentType: string;
    aiModule: string;
    priority: string;
    comment: string;
    requiresFollowUp: boolean;
  }) => void;
  editData?: {
    commentType: string;
    aiModule: string;
    priority: string;
    comment: string;
    requiresFollowUp: boolean;
  } | null;
  isEditing?: boolean;
}

export function AddTechnicalCommentModal({ isOpen, onClose, onSave, editData, isEditing = false }: AddTechnicalCommentModalProps) {
  const [commentType, setCommentType] = useState(editData?.commentType || "Technical Override");
  const [aiModule, setAiModule] = useState(editData?.aiModule || "Structure Analysis");
  const [priority, setPriority] = useState(editData?.priority || "Medium");
  const [comment, setComment] = useState(editData?.comment || "");
  const [requiresFollowUp, setRequiresFollowUp] = useState(editData?.requiresFollowUp || false);
  const [isCommentTypeDropdownOpen, setIsCommentTypeDropdownOpen] = useState(false);
  const [isAiModuleDropdownOpen, setIsAiModuleDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  const commentTypes = [
    "Technical Override",
    "Quality Assurance",
    "Safety Concern",
    "Process Improvement",
    "Documentation Update"
  ];

  const aiModules = [
    "Structure Analysis",
    "Paint Analysis", 
    "Ballistic Glass",
    "Interior Inspection",
    "Functionality Test",
    "Overall Assessment"
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];

  // Update state when editData changes
  React.useEffect(() => {
    if (editData) {
      setCommentType(editData.commentType);
      setAiModule(editData.aiModule);
      setPriority(editData.priority);
      setComment(editData.comment);
      setRequiresFollowUp(editData.requiresFollowUp);
    } else {
      // Reset to defaults when editData is null (for add new comment)
      setCommentType("Technical Override");
      setAiModule("Structure Analysis");
      setPriority("Medium");
      setComment("");
      setRequiresFollowUp(false);
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (comment.trim()) {
      onSave({
        commentType,
        aiModule,
        priority,
        comment: comment.trim(),
        requiresFollowUp
      });
      
      // Reset form only if not editing
      if (!isEditing) {
        setCommentType("Technical Override");
        setAiModule("Structure Analysis");
        setPriority("Medium");
        setComment("");
        setRequiresFollowUp(false);
      }
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form only if not editing
    if (!isEditing) {
      setCommentType("Technical Override");
      setAiModule("Structure Analysis");
      setPriority("Medium");
      setComment("");
      setRequiresFollowUp(false);
    }
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
          <h2 className="text-lg font-semibold text-white">
            {isEditing ? "Edit Technical Comment" : "Add Technical Comment"}
          </h2>
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
            {/* Comment Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Comment Type
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsCommentTypeDropdownOpen(!isCommentTypeDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <span>{commentType}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isCommentTypeDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isCommentTypeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#2a2d4a] bg-[#252850] shadow-lg z-10">
                    {commentTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setCommentType(type);
                          setIsCommentTypeDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#2a2d4a] first:rounded-t-lg last:rounded-b-lg"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* AI Module Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                AI Module
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsAiModuleDropdownOpen(!isAiModuleDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <span>{aiModule}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isAiModuleDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isAiModuleDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#2a2d4a] bg-[#252850] shadow-lg z-10">
                    {aiModules.map((module) => (
                      <button
                        key={module}
                        onClick={() => {
                          setAiModule(module);
                          setIsAiModuleDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#2a2d4a] first:rounded-t-lg last:rounded-b-lg"
                      >
                        {module}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Priority Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <span>{priority}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${isPriorityDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isPriorityDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#2a2d4a] bg-[#252850] shadow-lg z-10">
                    {priorities.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setPriority(p);
                          setIsPriorityDropdownOpen(false);
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

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your technical comment or override reason..."
                className="w-full h-32 resize-none rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Requires Follow-up Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="requiresFollowUp"
                checked={requiresFollowUp}
                onChange={(e) => setRequiresFollowUp(e.target.checked)}
                className="h-4 w-4 rounded border border-[#2a2d4a] bg-[#252850] text-cyan-500 focus:ring-cyan-500"
              />
              <label htmlFor="requiresFollowUp" className="text-sm text-gray-300">
                Requires follow-up action
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleCancel}
            className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-[#2a2d4a]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!comment.trim()}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? "Update Comment" : "Save Comment"}
          </button>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}