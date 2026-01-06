import React from "react";
import { Eye, User } from "lucide-react";

interface SupportTicket {
  id: string;
  subject: string;
  request: string;
  topic: string;
  priority: string;
  status: string;
  agent: {
    name: string;
    avatar: string;
  } | null;
  created: string;
}

const supportTickets: SupportTicket[] = [
  {
    id: "#TX-7845",
    subject: "Payment not processed",
    request: "sarah.johnson@example.com",
    topic: "Billing",
    priority: "High",
    status: "Open",
    agent: {
      name: "Sarah Johnson",
      avatar: "👩‍💼"
    },
    created: "2023-10-15"
  },
  {
    id: "#TX-7844",
    subject: "Cannot upload certification document",
    request: "michael.brown@example.com",
    topic: "Technical Issue",
    priority: "Medium",
    status: "Pending",
    agent: {
      name: "Michael Brown",
      avatar: "👨‍💼"
    },
    created: "2023-10-14"
  },
  {
    id: "#TX-7843",
    subject: "Account verification problem",
    request: "emily.davis@example.com",
    topic: "Account Problem",
    priority: "Medium",
    status: "Open",
    agent: null,
    created: "2023-10-14"
  },
  {
    id: "#TX-7842",
    subject: "Feature request: bulk upload",
    request: "john.smith@example.com",
    topic: "Feature Request",
    priority: "Low",
    status: "Resolved",
    agent: {
      name: "John Smith",
      avatar: "🧑‍💼"
    },
    created: "2023-10-13"
  }
];

const getPriorityBadge = (priority: string) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium";
  
  switch (priority) {
    case "High":
      return `${baseClasses} bg-red-500 text-white`;
    case "Medium":
      return `${baseClasses} bg-yellow-500 text-white`;
    case "Low":
      return `${baseClasses} bg-blue-500 text-white`;
    default:
      return `${baseClasses} bg-gray-500 text-white`;
  }
};

const getStatusBadge = (status: string) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium";
  
  switch (status) {
    case "Open":
      return `${baseClasses} bg-blue-500 text-white`;
    case "Pending":
      return `${baseClasses} bg-yellow-500 text-white`;
    case "Resolved":
      return `${baseClasses} bg-green-500 text-white`;
    default:
      return `${baseClasses} bg-gray-500 text-white`;
  }
};

const getTopicColor = (topic: string) => {
  switch (topic) {
    case "Billing":
      return "text-blue-400";
    case "Technical Issue":
      return "text-purple-400";
    case "Account Problem":
      return "text-orange-400";
    case "Feature Request":
      return "text-green-400";
    default:
      return "text-gray-400";
  }
};

export default function SupportTicketsTable() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Support Tickets</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <span className="text-lg">+</span>
          <span>New Ticket</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1D1D41] rounded-lg border border-[#2a2d4a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#252850]">
              <tr>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">ID</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Subject</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Request</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Topic</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Priority</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Agent</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Created</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-700 hover:bg-[#252850] transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{ticket.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white">{ticket.subject}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{ticket.request}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getTopicColor(ticket.topic)}`}>
                      {ticket.topic}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getPriorityBadge(ticket.priority)}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(ticket.status)}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {ticket.agent ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{ticket.agent.avatar}</span>
                        <span className="text-white text-sm">{ticket.agent.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{ticket.created}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                        <Eye className="h-4 w-4 text-cyan-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                        <User className="h-4 w-4 text-cyan-400" />
                      </button>
                    </div>
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