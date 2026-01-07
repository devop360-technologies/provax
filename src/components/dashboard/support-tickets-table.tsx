import React from "react";
import { Eye, User } from "lucide-react";
import { TABLE_CLASSES } from "@/lib/table-utils";

export interface SupportTicket {
  id: string;
  subject: string;
  request: string;
  topic: string;
  priority: string;
  status: string;
  agent: { name: string; avatar: string } | null;
  created: string;
}

interface SupportTicketsTableProps {
  tickets?: SupportTicket[];
  onNewTicket?: () => void;
}

const PRIORITY_COLORS: Record<string, string> = { High: "bg-red-500", Medium: "bg-yellow-500", Low: "bg-blue-500" };
const STATUS_COLORS: Record<string, string> = { Open: "bg-blue-500", Pending: "bg-yellow-500", Resolved: "bg-green-500" };
const TOPIC_COLORS: Record<string, string> = { Billing: "text-blue-400", "Technical Issue": "text-purple-400", "Account Problem": "text-orange-400", "Feature Request": "text-green-400" };

export default function SupportTicketsTable({ tickets = [], onNewTicket }: SupportTicketsTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Support Tickets</h2>
        <button type="button" onClick={onNewTicket} className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <span className="text-lg">+</span>
          <span>New Ticket</span>
        </button>
      </div>
      {tickets.length === 0 ? (
        <div className={TABLE_CLASSES.wrapper}>
          <div className="p-8 text-center text-gray-400">No tickets found</div>
        </div>
      ) : (
        <div className={TABLE_CLASSES.wrapper}>
          <div className={TABLE_CLASSES.overflowContainer}>
            <table className="w-full">
              <thead className={TABLE_CLASSES.header}>
                <tr>
                  {["ID", "Subject", "Request", "Topic", "Priority", "Status", "Agent", "Created", "Action"].map((h) => (
                    <th key={h} className={TABLE_CLASSES.headerCell}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className={TABLE_CLASSES.row}>
                    <td className={TABLE_CLASSES.cellMedium}>{ticket.id}</td>
                    <td className={TABLE_CLASSES.cell}><span className="text-white">{ticket.subject}</span></td>
                    <td className={TABLE_CLASSES.cell}>{ticket.request}</td>
                    <td className={TABLE_CLASSES.cell}>
                      <span className={`font-medium ${TOPIC_COLORS[ticket.topic] || "text-gray-400"}`}>{ticket.topic}</span>
                    </td>
                    <td className={TABLE_CLASSES.cell}>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${PRIORITY_COLORS[ticket.priority] || "bg-gray-500"}`}>{ticket.priority}</span>
                    </td>
                    <td className={TABLE_CLASSES.cell}>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${STATUS_COLORS[ticket.status] || "bg-gray-500"}`}>{ticket.status}</span>
                    </td>
                    <td className={TABLE_CLASSES.cell}>
                      {ticket.agent ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{ticket.agent.avatar}</span>
                          <span className="text-white text-sm">{ticket.agent.name}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td className={TABLE_CLASSES.cell}>{ticket.created}</td>
                    <td className={TABLE_CLASSES.cell}>
                      <div className="flex items-center space-x-2">
                        <button type="button" title="View details" className="p-1 hover:bg-gray-600 rounded transition-colors">
                          <Eye className="h-4 w-4 text-cyan-400" />
                        </button>
                        <button type="button" title="Assign agent" className="p-1 hover:bg-gray-600 rounded transition-colors">
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
      )}
    </div>
  );
}
