import React from "react";
import { Eye } from "lucide-react";

interface DisputeItem {
  disputeId: string;
  transaction: string;
  parties: string;
  service: string;
  amount: string;
  status: string;
  created: string;
}

const disputes: DisputeItem[] = [
  {
    disputeId: "#DSP-4582",
    transaction: "#TX-7845",
    parties: "John Smith vs. Tech Solutions Inc.",
    service: "Auto Repair",
    amount: "$1,200.00",
    status: "Evidence Collection",
    created: "2023-10-15"
  },
  {
    disputeId: "#DSP-45801",
    transaction: "#TX-7844",
    parties: "Sarah Johnson vs. Global Certifications",
    service: "Certification",
    amount: "$299.00",
    status: "Under Review",
    created: "2023-10-14"
  },
  {
    disputeId: "#DSP-4580",
    transaction: "#TX-7843",
    parties: "Michael Brown vs. Service Pro",
    service: "Pro Repair",
    amount: "$450.00",
    status: "Awaiting Decision",
    created: "2023-10-14"
  }
];

const getStatusBadge = (status: string) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  
  switch (status) {
    case "Evidence Collection":
      return `${baseClasses} bg-blue-500 text-white`;
    case "Under Review":
      return `${baseClasses} bg-orange-500 text-white`;
    case "Awaiting Decision":
      return `${baseClasses} bg-cyan-500 text-white`;
    default:
      return `${baseClasses} bg-gray-500 text-white`;
  }
};

export default function DisputeResolution() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Active Disputes</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <span className="text-lg">+</span>
          <span>New Ticket</span>
        </button>
      </div>

      {/* Disputes Table */}
      <div className="bg-[#1D1D41] rounded-lg border border-[#2a2d4a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#252850]">
              <tr>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Dispute ID</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Transaction</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Parties</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Service</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Amount</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Created</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute) => (
                <tr key={dispute.disputeId} className="border-b border-gray-700 hover:bg-[#252850] transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{dispute.disputeId}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white">{dispute.transaction}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{dispute.parties}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{dispute.service}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{dispute.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(dispute.status)}>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{dispute.created}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                      <Eye className="h-4 w-4 text-cyan-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}