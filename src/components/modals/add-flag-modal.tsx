"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ModalWrapper, ModalButton, ModalInput } from "@/components/ui/modal-wrapper";

interface AddFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const priorities = ["Low Priority", "Medium Priority", "High Priority", "Critical Priority"];

export function AddFlagModal({ isOpen, onClose, userName }: AddFlagModalProps) {
  const [priority, setPriority] = useState("Low Priority");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddFlag = () => {
    if (title.trim() && description.trim()) {
      // Flag adding placeholder - use userName, priority, title, description
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

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Add User Flag"
      actions={
        <>
          <ModalButton
            onClick={handleAddFlag}
            disabled={!title.trim() || !description.trim()}
            variant="primary"
          >
            Add Note
          </ModalButton>
          <ModalButton onClick={handleCancel} variant="secondary">
            Cancel
          </ModalButton>
        </>
      }
    >
      <div className="space-y-6">
        {/* Flag Priority Dropdown */}
        <div>
          <span className="block text-sm font-medium text-gray-300 mb-2">
            Flag Priority
          </span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <span>{priority}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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

        <ModalInput
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Enter flag title..."
        />

        <ModalInput
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Enter flag description..."
          type="textarea"
          rows={4}
        />
      </div>
    </ModalWrapper>
  );
}