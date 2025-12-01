"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import { Edit, Eye } from "lucide-react";

interface ServiceBiddingProps {
  users: User[];
}

type Tab = "Service Requests" | "Service Detail" | "Dispute Management" | "SLA Tracking";

export function ServiceBidding({ users }: ServiceBiddingProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Service Requests");
  const [activeDetailTab, setActiveDetailTab] = useState("Overview");
  const [filters, setFilters] = useState({
    category: "All Categories",
    region: "All Regions", 
    urgency: "All Urgency",
    status: "All Status",
    budget: "All Budget"
  });

  // Mock service request data
  const serviceRequests = [
    {
      userId: "#USR-001",
      service: "Engine Repair - Toyota Camry",
      client: { name: "John Smith", avatar: "/provax-dashboard/avatars/01.png" },
      category: "Repair",
      region: "North Region",
      urgency: "High",
      budget: "$500-$800",
      bids: "3",
      status: "In Progress",
      statusColor: "bg-blue-500/20 text-blue-400",
      date: "2023-10-15",
      action: "view"
    },
    {
      userId: "#USR-002", 
      service: "Brake Service - Honda Civic",
      client: { name: "Sarah Johnson", avatar: "/provax-dashboard/avatars/02.png" },
      category: "Maintenance",
      region: "South Region", 
      urgency: "Medium",
      budget: "$200-$400",
      bids: "5",
      status: "Pending",
      statusColor: "bg-yellow-500/20 text-yellow-400",
      date: "2023-10-14",
      action: "edit"
    },
    {
      userId: "#USR-003",
      service: "AC Repair - Ford F-150", 
      client: { name: "Michael Brown", avatar: "/provax-dashboard/avatars/03.png" },
      category: "Repair",
      region: "East Region",
      urgency: "Critical",
      budget: "$300-$600",
      bids: "2", 
      status: "Open",
      statusColor: "bg-green-500/20 text-green-400",
      date: "2023-10-12",
      action: "view"
    },
    {
      userId: "#USR-004",
      service: "Vehicle Inspection - BMW X5",
      client: { name: "Emily Davis", avatar: "/provax-dashboard/avatars/04.png" },
      category: "Inspection", 
      region: "West Region",
      urgency: "Low",
      budget: "$100-$200",
      bids: "4",
      status: "Completed",
      statusColor: "bg-green-500/20 text-green-400",
      date: "2023-10-10",
      action: "edit"
    },
    {
      userId: "#USR-005", 
      service: "Detailing - Tesla Model 3",
      client: { name: "Robert Wilson", avatar: "/provax-dashboard/avatars/05.png" },
      category: "Detailing",
      region: "Central Region",
      urgency: "Medium", 
      budget: "$150-$300",
      bids: "6",
      status: "Critical",
      statusColor: "bg-red-500/20 text-red-400",
      date: "2023-10-08",
      action: "view"
    },
    {
      userId: "#USR-006",
      service: "Audio System Installation - Audi A4",
      client: { name: "Lisa Anderson", avatar: "/provax-dashboard/avatars/06.png" },
      category: "Installation",
      region: "North Region", 
      urgency: "Low",
      budget: "$400-$700",
      bids: "2",
      status: "Dispute",
      statusColor: "bg-purple-500/20 text-purple-400",
      date: "2023-10-05",
      action: "edit"
    },
    {
      userId: "#USR-007",
      service: "Transmission Repair - Mercedes C-Class", 
      client: { name: "David Miller", avatar: "/provax-dashboard/avatars/07.png" },
      category: "Repair",
      region: "South Region",
      urgency: "High",
      budget: "$800-$1200",
      bids: "3",
      status: "Refunded", 
      statusColor: "bg-gray-500/20 text-gray-400",
      date: "2023-10-03",
      action: "view"
    },
    {
      userId: "#USR-008",
      service: "Tire Replacement - Chevrolet Silverado",
      client: { name: "Jennifer Taylor", avatar: "/provax-dashboard/avatars/08.png" },
      category: "Maintenance",
      region: "East Region",
      urgency: "Medium",
      budget: "$300-$500", 
      bids: "7",
      status: "In Progress",
      statusColor: "bg-blue-500/20 text-blue-400",
      date: "2023-09-28",
      action: "edit"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="mr-0 flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#1D1D41] px-6 py-4 md:mr-7">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("Service Requests")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "Service Requests"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Service Requests
          </button>
          <button
            onClick={() => setActiveTab("Service Detail")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "Service Detail"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Service Detail
          </button>
          <button
            onClick={() => setActiveTab("Dispute Management")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "Dispute Management"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Dispute Management
          </button>
          <button
            onClick={() => setActiveTab("SLA Tracking")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "SLA Tracking"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            SLA Tracking
          </button>
        </div>
      </div>

      {/* Service Requests Tab Content */}
      {activeTab === "Service Requests" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="mr-0 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:items-end">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option>All Categories</option>
                  <option>Repair</option>
                  <option>Maintenance</option>
                  <option>Inspection</option>
                  <option>Detailing</option>
                  <option>Installation</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option>All Regions</option>
                  <option>North Region</option>
                  <option>South Region</option>
                  <option>East Region</option>
                  <option>West Region</option>
                  <option>Central Region</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Urgency</label>
                <select
                  value={filters.urgency}
                  onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option>All Urgency</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Critical</option>
                  <option>Dispute</option>
                  <option>Refunded</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Budget Range</label>
                <select
                  value={filters.budget}
                  onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option>All Budget</option>
                  <option>$100-$300</option>
                  <option>$300-$500</option>
                  <option>$500-$800</option>
                  <option>$800+</option>
                </select>
              </div>
              <div>
                <button className="w-full rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-4 py-3 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Service Requests Table */}
          <div className="mr-0 overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1D1D41] md:mr-7">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Region</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Urgency</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Budget</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Bids</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((request, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#2a2d4a] transition-colors hover:bg-[#252850]/50"
                    >
                      <td className="px-4 py-4 text-xs font-medium text-white">
                        {request.userId}
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-300">{request.service}</td>
                      <td className="px-4 py-4 text-xs text-gray-300">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
                          <span>{request.client.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-300">{request.category}</td>
                      <td className="px-4 py-4 text-xs text-gray-300">{request.region}</td>
                      <td className="px-4 py-4 text-xs">
                        <span className={`rounded px-3 py-1 text-xs font-medium ${
                          request.urgency === "Critical" ? "bg-red-500/20 text-red-400" :
                          request.urgency === "High" ? "bg-orange-500/20 text-orange-400" :
                          request.urgency === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-green-500/20 text-green-400"
                        }`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-300">{request.budget}</td>
                      <td className="px-4 py-4 text-xs font-medium text-white">{request.bids}</td>
                      <td className="px-4 py-4 text-xs">
                        <span className={`rounded px-3 py-1 text-xs font-medium ${request.statusColor}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-300">{request.date}</td>
                      <td className="px-4 py-4 text-xs">
                        <div className="flex gap-2">
                          <button
                            className="text-gray-400 transition-colors hover:text-cyan-400"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-400 transition-colors hover:text-orange-400"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#2a2d4a] px-6 py-4">
              <div className="text-sm text-gray-400">Showing 1 to 8 of 28 results</div>
              <div className="flex gap-2">
                <button className="rounded p-2 text-gray-400 transition-colors hover:bg-[#1a1d3a]">
                  &lt;
                </button>
                <button className="h-8 w-8 rounded bg-cyan-500/20 text-sm font-medium text-cyan-400">
                  1
                </button>
                <button className="h-8 w-8 rounded text-sm text-gray-400 hover:bg-[#1a1d3a]">2</button>
                <button className="h-8 w-8 rounded text-sm text-gray-400 hover:bg-[#1a1d3a]">3</button>
                <button className="rounded p-2 text-gray-400 transition-colors hover:bg-[#1a1d3a]">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Tab Contents - Placeholder */}
      {activeTab === "Service Detail" && (
        <div className="mr-0 space-y-2 rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] md:mr-7">
          {/* Header Section */}
          <div className="rounded-xl p-6">
            <div className="align-center flex items-center justify-center gap-6">
              {/* Service Icon */}
              <div className="flex h-24 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#2a2d4a] bg-[#252850]">
                <div className="text-4xl">🔧</div>
              </div>

              {/* Service Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white">
                  Vehicle Inspection Service - Premium Package
                </h2>
                <p className="mt-1 text-[12px] text-gray-400">
                  Requested by Sarah Johnson • New York, NY • Submitted on 2023-10-15
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-cyan-500/20 px-6 py-2 text-sm font-medium whitespace-nowrap text-cyan-400 transition-colors hover:bg-cyan-500/30">
                  Assign Inspector
                </button>
                <button className="rounded-lg bg-green-500/20 px-6 py-2 text-sm font-medium whitespace-nowrap text-green-400 transition-colors hover:bg-green-500/30">
                  Approve
                </button>
                <button className="rounded-lg bg-red-500/20 px-6 py-2 text-sm font-medium whitespace-nowrap text-red-400 transition-colors hover:bg-red-500/30">
                  Reject
                </button>
              </div>
            </div>
          </div>
          <hr className="border-[#2a2d4a]" />

          {/* Sub-Tabs */}
          <div className="rounded-xl border-b border-[#2a2d4a] bg-[#1D1D41]">
            <div className="flex gap-8 overflow-x-auto px-6">
              {["Overview", "Service Details", "Client Information", "Documents"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDetailTab(tab)}
                  className={`border-b-2 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeDetailTab === tab
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeDetailTab === "Overview" && (
              <div className="space-y-2">
                {/* Service Request Overview Header */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">Service Request Overview</h3>
                </div>

                {/* Two Column Layout */}
                <div className="mx-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Service Details */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                    <h4 className="mb-6 text-base font-semibold text-white">Service Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Service Type:</span>
                        <span className="text-sm font-medium text-white">Vehicle Inspection</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Category:</span>
                        <span className="text-sm font-medium text-white">Automotive</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Budget Range:</span>
                        <span className="text-sm font-medium text-cyan-400">$100 - $200</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Urgency:</span>
                        <span className="inline-block rounded bg-orange-500/20 px-3 py-1 text-sm font-semibold text-orange-400">
                          High
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Location:</span>
                        <span className="text-sm font-medium text-white">New York, NY</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Preferred Date:</span>
                        <span className="text-sm font-medium text-white">2023-10-20</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Status:</span>
                        <span className="inline-block rounded bg-yellow-500/20 px-3 py-1 text-sm font-semibold text-yellow-400">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Request Information */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                    <h4 className="mb-6 text-base font-semibold text-white">Request Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Request ID:</span>
                        <span className="text-sm font-medium text-white">#REQ-4582</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Submitted Date:</span>
                        <span className="text-sm font-medium text-white">2023-10-15</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Last Updated:</span>
                        <span className="text-sm font-medium text-white">2023-10-16</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Bids Received:</span>
                        <span className="text-sm font-medium text-white">12</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                        <span className="text-sm text-gray-400">Views:</span>
                        <span className="text-sm font-medium text-white">148</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Assigned Inspector:</span>
                        <span className="text-sm font-medium text-white">Not Assigned</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="m-6 gap-3 rounded-2xl bg-[#23234B] p-6">
                  <h3 className="py-2">Service Description</h3>
                  <hr className="border-[#2a2d4a] py-2" />
                  <p className="text-sm text-gray-400">
                    I need a comprehensive vehicle inspection for my 2022 Honda Civic before finalizing a sale. 
                    The inspection should include engine diagnostics, brake system check, tire condition assessment, 
                    and overall safety evaluation. I'm looking for a certified inspector with experience in Honda vehicles. 
                    The inspection needs to be completed by October 20th, and I'm willing to pay between $100-$200 for 
                    a thorough assessment. Please provide a detailed report with photos and recommendations.
                  </p>
                </div>

                <div className="m-6 gap-3 rounded-2xl bg-[#23234B] p-6">
                  <h3 className="py-2">Request Actions</h3>
                  <hr className="border-[#2a2d4a] py-2" />
                  <div className="flex w-full gap-2.5">
                    <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm transition-colors hover:bg-cyan-500/20">
                      Assign Inspector
                    </button>
                    <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm transition-colors hover:bg-green-500/20">
                      Approve Request
                    </button>
                    <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm transition-colors hover:bg-yellow-500/20">
                      Request More Info
                    </button>
                    <button className="rounded-lg border border-[#262656] bg-[#262656] px-8 py-3 text-sm transition-colors hover:bg-red-500/20">
                      Reject Request
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Service Details" && (
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <h4 className="mb-6 text-lg font-semibold text-white">Detailed Service Requirements</h4>
                <div className="space-y-6">
                  <div className="rounded-lg border border-[#2a2d4a] bg-[#252850] p-4">
                    <h5 className="font-medium text-white mb-2">Required Services</h5>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Engine diagnostics and performance check</li>
                      <li>• Brake system inspection (pads, rotors, fluid)</li>
                      <li>• Tire condition and alignment assessment</li>
                      <li>• Fluid level checks (oil, coolant, transmission)</li>
                      <li>• Electrical system testing</li>
                      <li>• Safety feature verification</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-[#2a2d4a] bg-[#252850] p-4">
                    <h5 className="font-medium text-white mb-2">Special Requirements</h5>
                    <p className="text-sm text-gray-300">
                      Please provide photo documentation of any issues found. Inspector must be certified 
                      and have at least 5 years of experience with Honda vehicles.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Client Information" && (
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <h4 className="mb-6 text-lg font-semibold text-white">Client Details</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                      <span className="text-sm text-gray-400">Client Name:</span>
                      <span className="text-sm font-medium text-white">Sarah Johnson</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                      <span className="text-sm text-gray-400">Email:</span>
                      <span className="text-sm font-medium text-white">sarah.johnson@email.com</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                      <span className="text-sm text-gray-400">Phone:</span>
                      <span className="text-sm font-medium text-white">+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                      <span className="text-sm text-gray-400">Member Since:</span>
                      <span className="text-sm font-medium text-white">2022-03-15</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                      <span className="text-sm text-gray-400">Rating:</span>
                      <span className="text-sm font-medium text-white">4.8/5.0</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#2a2d4a]/50 pb-4">
                      <span className="text-sm text-gray-400">Previous Requests:</span>
                      <span className="text-sm font-medium text-white">8</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Documents" && (
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <h4 className="mb-6 text-lg font-semibold text-white">Attached Documents</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center rounded-lg border border-[#2a2d4a] bg-[#252850] p-6">
                    <div className="text-4xl mb-4">📄</div>
                    <h5 className="font-medium text-white mb-2">Vehicle Registration</h5>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300">Download</button>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border border-[#2a2d4a] bg-[#252850] p-6">
                    <div className="text-4xl mb-4">📸</div>
                    <h5 className="font-medium text-white mb-2">Vehicle Photos (5)</h5>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300">View Gallery</button>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border border-[#2a2d4a] bg-[#252850] p-6">
                    <div className="text-4xl mb-4">🔧</div>
                    <h5 className="font-medium text-white mb-2">Service History</h5>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300">View Report</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "Dispute Management" && (
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center text-gray-400">
          Dispute Management content coming soon...
        </div>
      )}

      {activeTab === "SLA Tracking" && (
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center text-gray-400">
          SLA Tracking content coming soon...
        </div>
      )}
    </div>
  );
}
