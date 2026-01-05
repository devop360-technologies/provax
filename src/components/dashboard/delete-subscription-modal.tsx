import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface DeleteSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string;
}

export default function DeleteSubscriptionModal({
  isOpen,
  onClose,
  providerId
}: DeleteSubscriptionModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    // Handle delete action here
    // TODO: Implement actual deletion logic
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#262656] rounded-lg p-6 w-full max-w-md mx-4 border border-[#1d2256]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            Delete Subscription
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-white font-medium">Confirm Deletion</h3>
              <p className="text-gray-300 text-sm">This action cannot be undone</p>
            </div>
          </div>
          
          <p className="text-gray-300">
            Are you sure you want to permanently delete the subscription for provider ID: {providerId.replace("#TX-", "")}?
          </p>
          
          <p className="text-gray-400 text-sm">
            This will remove all subscription data and cannot be reversed. The provider will lose access immediately.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirm}
            className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="px-8 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}