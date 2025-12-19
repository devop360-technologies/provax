"use client";

import { X } from "lucide-react";
import { AuditLogEntry } from "./audit-log-table";
import { cn } from "@/lib/utils";

interface AuditLogDetailsModalProps {
  isOpen: boolean;
  entry?: AuditLogEntry;
  onClose?: () => void;
}

const eventTypeColors: Record<string, string> = {
  "Setting Change": "#3B82F6",
  "User Login": "#10B981",
  "API Key Generated": "#F59E0B",
  "Security Event": "#FF6B6B",
  "Payment Processed": "#00D9FF",
};

export function AuditLogDetailsModal({
  isOpen,
  entry,
  onClose,
}: AuditLogDetailsModalProps) {
  if (!isOpen || !entry) return null;

  const bgColor = eventTypeColors[entry.eventType];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1D1D41] rounded-lg border border-[#404254] w-full max-w-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#404254]">
          <h2 className="text-xl font-semibold text-white">Audit Log Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#252850] transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-8">
          {/* Event Type */}
          <div className="flex items-start justify-between">
            <span className="text-gray-400 font-medium">Event Type:</span>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: bgColor }}
            >
              {entry.eventType}
            </span>
          </div>

          {/* Action Performed */}
          <div className="flex items-start justify-between">
            <span className="text-gray-400 font-medium">Action Performed:</span>
            <span className="text-gray-300 text-right max-w-xs">
              {entry.actionPerformed}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">Date & Time:</span>
            <span className="text-gray-300">{entry.dateTime}</span>
          </div>

          {/* User */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">User:</span>
            <span className="text-gray-300">{entry.user}</span>
          </div>

          {/* Previous Value */}
          {entry.previousValue && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Previous Value</span>
              <span className="text-gray-300">{entry.previousValue}</span>
            </div>
          )}

          {/* New Value */}
          {entry.newValue && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">New Value</span>
              <span className="text-gray-300">{entry.newValue}</span>
            </div>
          )}

          {/* IP Address */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">IP Address:</span>
            <span className="text-gray-300">{entry.ipAddress}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#404254]">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 rounded-lg border border-[#404254] bg-[#252850] text-sm font-medium text-gray-400 hover:bg-[#1D1D41] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
