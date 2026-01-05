'use client';

import { useEffect, useRef } from 'react';

interface EditUserModalProps {
  isOpen: boolean;
  formData: {
    fullName: string;
    email: string;
    role: string;
    status: string;
    segment: string;
    verification: string;
  };
  onFormChange: (data: EditUserModalProps['formData']) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditUserModal({
  isOpen,
  formData,
  onFormChange,
  onSave,
  onCancel,
}: EditUserModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target === modalRef.current) {
      onCancel();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        className="bg-[#1a1d3a] border border-[#2a2d4a] rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="border-b border-[#2a2d4a] pb-6 mb-6">
          <h2 className="text-2xl font-bold text-white">Edit User</h2>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Full Name and Email */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  onFormChange({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-[#252850] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  onFormChange({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#252850] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="john.smith@example.com"
              />
            </div>
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  onFormChange({ ...formData, role: e.target.value })
                }
                className="w-full bg-[#252850] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option>Inspector</option>
                <option>Buyer</option>
                <option>Seller</option>
                <option>Provider</option>
                <option>Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  onFormChange({ ...formData, status: e.target.value })
                }
                className="w-full bg-[#252850] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Segment and Verification Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Segment
              </label>
              <select
                value={formData.segment}
                onChange={(e) =>
                  onFormChange({ ...formData, segment: e.target.value })
                }
                className="w-full bg-[#252850] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option>Premium</option>
                <option>Standard</option>
                <option>Basic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Verification Status
              </label>
              <select
                value={formData.verification}
                onChange={(e) =>
                  onFormChange({ ...formData, verification: e.target.value })
                }
                className="w-full bg-[#252850] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option>Verified</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-[#2a2d4a]">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-[#252850] text-white rounded-lg hover:bg-[#2a2d4a] transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
