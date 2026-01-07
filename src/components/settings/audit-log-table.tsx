"use client";

import { Eye } from "lucide-react";

export interface AuditLogEntry {
  id: string;
  eventType: "Setting Change" | "User Login" | "API Key Generated" | "Security Event" | "Payment Processed";
  dateTime: string;
  user: string;
  actionPerformed: string;
  ipAddress: string;
  previousValue?: string;
  newValue?: string;
}

interface AuditLogTableProps {
  entries?: AuditLogEntry[];
  onViewDetails?: (entry: AuditLogEntry) => void;
}

const eventTypeColors: Record<string, { bg: string; text: string }> = {
  "Setting Change": { bg: "#3B82F6", text: "white" },
  "User Login": { bg: "#10B981", text: "white" },
  "API Key Generated": { bg: "#F59E0B", text: "white" },
  "Security Event": { bg: "#FF6B6B", text: "white" },
  "Payment Processed": { bg: "#00D9FF", text: "white" },
};

const defaultEntries: AuditLogEntry[] = [
  {
    id: "1",
    eventType: "Setting Change",
    dateTime: "2023-10-15 14:30",
    user: "Admin User",
    actionPerformed: "Updated certification fee from $45.00 to $49.99",
    ipAddress: "192.168.1.100",
    previousValue: "$45.00",
    newValue: "$49.99",
  },
  {
    id: "2",
    eventType: "User Login",
    dateTime: "2023-10-15 12:15",
    user: "Support Agent",
    actionPerformed: "User logged in from new device",
    ipAddress: "203.0.113.45",
  },
  {
    id: "3",
    eventType: "API Key Generated",
    dateTime: "2023-10-14 16:45",
    user: "Admin User",
    actionPerformed: "Generated new Stripe API key",
    ipAddress: "192.168.1.100",
  },
  {
    id: "4",
    eventType: "Security Event",
    dateTime: "2023-10-14 11:20",
    user: "System",
    actionPerformed: "Multiple failed login attempts detected",
    ipAddress: "198.51.100.23",
  },
  {
    id: "5",
    eventType: "Payment Processed",
    dateTime: "2023-10-13 09:30",
    user: "System",
    actionPerformed: "Processed payout batch for providers",
    ipAddress: "N/A",
  },
];

export function AuditLogTable({
  entries = defaultEntries,
  onViewDetails,
}: AuditLogTableProps) {
  return (
    <div className="rounded-lg border border-[#404254] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#404254] bg-[#1D1D41]">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Event Type
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Date & Time
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              User
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Action Performed
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              IP Address
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const colors = eventTypeColors[entry.eventType];
            return (
              <tr
                key={entry.id}
                className="border-b border-[#404254] bg-[#252850] hover:bg-[#2a2d4a] transition-colors"
              >
                <td className="px-6 py-4">
                  <span
                    className="inline-block px-3 py-1 rounded text-xs font-semibold text-white"
                    style={{ backgroundColor: colors.bg }}
                  >
                    {entry.eventType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {entry.dateTime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {entry.user}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {entry.actionPerformed}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {entry.ipAddress}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onViewDetails?.(entry)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#404254] hover:bg-[#1D1D41] transition-colors text-[#00D9FF]"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
