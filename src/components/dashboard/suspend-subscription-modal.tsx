import React, { useState } from "react";
import { X } from "lucide-react";

interface SuspendSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string;
  isSuspending: boolean;
}

export default function SuspendSubscriptionModal({
  isOpen,
  onClose,
  providerId: _providerId,
  isSuspending
}: Readonly<SuspendSubscriptionModalProps>) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Handle suspend/cancel action using _providerId and reason
    // In production, send reason to API
    onClose();
    setReason("");
  };

  const handleCancel = () => {
    onClose();
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1D1D41] rounded-lg p-6 w-full max-w-xl mx-4 border border-[#1e2246]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            {isSuspending ? "Suspend Subscription" : "Cancel Subscription"}
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
          <p className="text-gray-300">
            You are about to {isSuspending ? "suspend" : "cancel"} the subscription for provider ID: {_providerId.replace("#TX-", "")}.
          </p>
          
          <p className="text-gray-300">
            Please provide a reason for this action below:
          </p>

          <div>
            <label htmlFor="suspendReason" className="block text-sm font-medium text-white mb-2">
              Reason for action
            </label>
            <textarea
              id="suspendReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter here you reasons..."
              className="w-full h-32 p-3 bg-[#252850] border border-[#404466] rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleConfirm}
            className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Confirm
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