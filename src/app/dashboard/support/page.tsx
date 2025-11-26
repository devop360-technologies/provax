"use client";

import { Plus, Search, Filter, MoreVertical, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SupportPage() {
  const tickets = [
    { id: "TK001", subject: "Vehicle not syncing", customer: "John Doe", status: "open", priority: "high", created: "2 hours ago" },
    { id: "TK002", subject: "Payment issue", customer: "Jane Smith", status: "in-progress", priority: "medium", created: "5 hours ago" },
    { id: "TK003", subject: "Feature request", customer: "Mike Johnson", status: "resolved", priority: "low", created: "1 day ago" },
    { id: "TK004", subject: "AI service error", customer: "Sarah Wilson", status: "open", priority: "high", created: "3 hours ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Center</h1>
          <p className="text-gray-400 mt-1">Manage customer support tickets</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Open Tickets</p>
            <p className="text-2xl font-bold text-red-400">12</p>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">In Progress</p>
            <p className="text-2xl font-bold text-blue-400">8</p>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Resolved</p>
            <p className="text-2xl font-bold text-green-400">156</p>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Avg Response Time</p>
            <p className="text-2xl font-bold text-white">2.3 hrs</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-white">Support Tickets</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-10 bg-[#1a1d3a] border-[#2a2d4a] text-white placeholder-gray-500"
                />
              </div>
              <Button variant="outline" className="border-[#2a2d4a] text-gray-400">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#1a1d3a] border border-[#2a2d4a] rounded-lg p-4 hover:border-green-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 text-sm font-mono">{ticket.id}</span>
                      <h3 className="text-white font-semibold">{ticket.subject}</h3>
                      <Badge className={ticket.priority === "high" ? "bg-red-500/20 text-red-400" : ticket.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">From: {ticket.customer}</span>
                      <span className="text-gray-400">{ticket.created}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={ticket.status === "open" ? "bg-red-500/20 text-red-400" : ticket.status === "in-progress" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}>
                      {ticket.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#252850] border-[#2a2d4a]">
                        <DropdownMenuItem className="text-gray-300 hover:text-white cursor-pointer">
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white cursor-pointer">
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:text-red-300 cursor-pointer">
                          Close
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
