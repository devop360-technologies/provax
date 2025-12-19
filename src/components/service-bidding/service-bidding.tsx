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
  const [activeDetailTab, setActiveDetailTab] = useState("Service Information");
  const [selectedService, setSelectedService] = useState<any>(null);
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
      client: { 
        name: "John Smith", 
        avatar: "/provax-dashboard/avatars/01.png",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567"
      },
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
      client: { 
        name: "Sarah Johnson", 
        avatar: "/provax-dashboard/avatars/02.png",
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 987-6543"
      },
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

  // Handle viewing a specific service
  const handleViewService = (service: any) => {
    setSelectedService(service);
    setActiveTab("Service Detail");
    setActiveDetailTab("Service Information");
  };

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
                            onClick={() => handleViewService(request)}
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
                  {selectedService?.service || "Vehicle Inspection Service - Premium Package"}
                </h2>
                <p className="mt-1 text-[12px] text-gray-400">
                  Requested by {selectedService?.client?.name || "Sarah Johnson"} • {selectedService?.region || "New York, NY"} • Submitted on {selectedService?.date || "2023-10-15"}
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
              {["Service Information", "Bids Received", "Provider Details", "Communication", "Dispute Handling"].map((tab) => (
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
            {activeDetailTab === "Service Information" && (
              <div className="space-y-6 p-6">
                {/* Service Information and details header */}
                <h3 className="text-lg font-semibold text-white">Service Information and details</h3>
                
                {/* Three Column Layout */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Service Details */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
                    <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                      <h4 className="text-base font-semibold text-white">Service Details</h4>
                    </div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Service ID:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.userId || "RSVC-4582"}</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Category:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.category || "Repair"}</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Urgency:</td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <span className={`inline-block rounded px-3 py-1 text-xs font-medium ${
                              selectedService?.urgency === "Critical" ? "bg-red-500/20 text-red-400" :
                              selectedService?.urgency === "High" ? "bg-orange-500/20 text-orange-400" :
                              selectedService?.urgency === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-green-500/20 text-green-400"
                            }`}>
                              {selectedService?.urgency || "High"}
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Budget:</td>
                          <td className="px-6 py-4 text-sm font-medium text-cyan-400">{selectedService?.budget || "$500 - $800"}</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Status:</td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <span className={`inline-block rounded px-3 py-1 text-xs font-medium ${selectedService?.statusColor || "bg-blue-500/20 text-blue-400"}`}>
                              {selectedService?.status || "In Progress"}
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Deadline:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.date || "2023-10-25"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Vehicle Information */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
                    <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                      <h4 className="text-base font-semibold text-white">Vehicle Information</h4>
                    </div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Make & Model:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">Toyota Camry 2022</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">VIN:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">JTNUU4BEX03012345</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Mileage:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">19,450 miles</td>
                        </tr>
                        <tr className="bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Certification:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">#CERT-4582 (92%)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Client Information */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
                    <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                      <h4 className="text-base font-semibold text-white">Client Information</h4>
                    </div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Name:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.client?.name || "John Smith"}</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Email:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.client?.email || "john.smith@example.com"}</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Phone:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.client?.phone || "+1 (555) 123-4567"}</td>
                        </tr>
                        <tr className="bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Location:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">{selectedService?.region || "New York, NY"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Service Description */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#23234B] p-6">
                  <h4 className="mb-4 text-base font-semibold text-white">Service Description</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The engine has been producing unusual knocking noises, particularly noticeable during acceleration, and the check engine light has recently turned on. The vehicle also 
                    struggles to start in the morning, indicating a potential underlying mechanical or sensor-related issue. I am looking for a complete diagnostic and repair service to identify 
                    and resolve the problems. A provider with specialized experience in Toyota vehicles is strongly preferred.
                  </p>
                </div>

                {/* Uploaded Photos */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#23234B] p-6">
                  <h4 className="mb-4 text-base font-semibold text-white">Uploaded Photos</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/seat.png"
                        alt="Engine Bay" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Engine Bay</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/car-top-view.png"
                        alt="Dashboard Warning" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Dashboard Warning</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="/provax/lightCar.png"
                        alt="Engine Overall" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#191840] p-2">
                        <span className="text-xs font-medium text-white">Engine Overall</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Control */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#23234B] p-6">
                  <h4 className="mb-4 text-base font-semibold text-white">Status Control</h4>
                  <div className="flex gap-3">
                    <button className="rounded-lg bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30">
                      Mark Completed
                    </button>
                    <button className="rounded-lg bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-400 transition-colors hover:bg-yellow-500/30">
                      Cancel Service
                    </button>
                    <button className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30">
                      Mark as Dispute
                    </button>
                    <button className="rounded-lg bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30">
                      Process Refund
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Bids Received" && (
              <div className="space-y-6 p-6">
                {/* Bids Detail header */}
                <h3 className="text-lg font-semibold text-white">Bids Detail</h3>
                
                {/* Provider Cards Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* AutoFix Pro Services */}
                  <div className="rounded-xl border border-[#23234B] bg-[#26265c] p-6">
                    <h4 className="mb-4 text-lg font-semibold text-white">AutoFix Pro Services</h4>
                    
                    <div className="mb-4 flex gap-6 text-sm">
                      <div>
                        <span className="text-gray-400">Deadline: </span>
                        <span className="text-white">5 days</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Warranty: </span>
                        <span className="text-white">6 months</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Rating: </span>
                        <span className="text-white">4.8/5.0</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-2 text-sm font-medium text-white">Service Details:</h5>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        A full engine diagnostic and repair service that identifies the root cause of performance issues and 
                        replaces any necessary parts to restore optimal function. This service provides reliable workmanship 
                        and is supported by a 6-month warranty on all completed repairs for added peace of mind.
                      </p>
                    </div>

                    <div className="mb-6 text-2xl font-bold text-white">$650</div>

                    <div className="flex gap-3">
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                        View Provider
                      </button>
                      <button className="rounded-lg border border-[#2a2d4a] bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#252850]">
                        Contact
                      </button>
                    </div>
                  </div>

                  {/* QuickFix Mechanics */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#26265c] p-6">
                    <h4 className="mb-4 text-lg font-semibold text-white">QuickFix Mechanics</h4>
                    
                    <div className="mb-4 flex gap-6 text-sm"> 
                      <div>
                        <span className="text-gray-400">Deadline: </span>
                        <span className="text-white">7 days</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Warranty: </span>
                        <span className="text-white">3 months</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Rating: </span>
                        <span className="text-white">4.5/5.0</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-2 text-sm font-medium text-white">Service Details:</h5>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Comprehensive engine diagnostics with all necessary repairs to restore proper performance. Service 
                        includes inspection, fixing detected issues, and post-repair testing. A 3-month warranty on labor is 
                        included for added assurance.
                      </p>
                    </div>

                    <div className="mb-6 text-2xl font-bold text-white">$550</div>

                    <div className="flex gap-3">
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                        View Provider
                      </button>
                      <button className="rounded-lg border border-[#2a2d4a] bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#252850]">
                        Contact
                      </button>
                    </div>
                  </div>

                  {/* Elite Auto Care */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#26265c] p-6">
                    <h4 className="mb-4 text-lg font-semibold text-white">Elite Auto Care</h4>
                    
                    <div className="mb-4 flex gap-6 text-sm">
                      <div>
                        <span className="text-gray-400">Deadline: </span>
                        <span className="text-white">4 days</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Warranty: </span>
                        <span className="text-white">12 months</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Rating: </span>
                        <span className="text-white">4.9/5.0</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-2 text-sm font-medium text-white">Service Details:</h5>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Premium engine service from a skilled Toyota specialist, starting with a full diagnostic to identify all 
                        issues. Complete repair work is performed using quality parts to restore optimal engine performance. 
                        Service is protected by a 12-month comprehensive warranty for long-term peace of mind.
                      </p>
                    </div>

                    <div className="mb-6 text-2xl font-bold text-white">$750</div>

                    <div className="flex gap-3">
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                        View Provider
                      </button>
                      <button className="rounded-lg border border-[#2a2d4a] bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#252850]">
                        Contact
                      </button>
                    </div>
                  </div>

                  {/* QuickFix Mechanics (Second Entry) */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#26265c] p-6">
                    <h4 className="mb-4 text-lg font-semibold text-white">QuickFix Mechanics</h4>
                    
                    <div className="mb-4 flex gap-6 text-sm">
                      <div>
                        <span className="text-gray-400">Deadline: </span>
                        <span className="text-white">7 days</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Warranty: </span>
                        <span className="text-white">3 months</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Rating: </span>
                        <span className="text-white">4.5/5.0</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-2 text-sm font-medium text-white">Service Details:</h5>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Comprehensive engine diagnostics with all necessary repairs to restore proper performance. Service 
                        includes inspection, fixing detected issues, and post-repair testing. A 3-month warranty on labor is 
                        included for added assurance.
                      </p>
                    </div>

                    <div className="mb-6 text-2xl font-bold text-white">$650</div>

                    <div className="flex gap-3">
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                        View Provider
                      </button>
                      <button className="rounded-lg border border-[#2a2d4a] bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#252850]">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Provider Details" && (
              <div className="space-y-6 p-6">
                {/* Provider Service details and Progress header */}
                <h3 className="text-lg font-semibold text-white">Provider Service details and Progress</h3>
                
                {/* Provider Header with Avatar and Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img 
                      src="/clients/tesla.png"
                      alt="AutoFix Pro Services" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">AutoFix Pro Services</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex text-yellow-400">
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400 ml-2">(1,854/107 reviews)</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Certified Toyota Specialist • Member since 2018</p>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Contact Information */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
                    <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                      <h5 className="text-base font-semibold text-white">Contact Information</h5>
                    </div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Email:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">contact@autofixpro.com</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Phone:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">+1 (555) 987-6543</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Location:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">Brooklyn, NY</td>
                        </tr>
                        <tr className="bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Response Time:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">2.1 hours average</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Service Statistics */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
                    <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                      <h5 className="text-base font-semibold text-white">Service Statistics</h5>
                    </div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Completed Services:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">342</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Success Rate:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">98.5%</td>
                        </tr>
                        <tr className="border-b border-[#2a2d4a]">
                          <td className="px-6 py-4 text-sm text-gray-400">Repeat Clients:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">67%</td>
                        </tr>
                        <tr className="bg-[#252850]">
                          <td className="px-6 py-4 text-sm text-gray-400">Average Rating:</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">4.8/5.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Service Progress */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                  <h5 className="mb-6 text-base font-semibold text-white">Service Progress</h5>
                  
                  <div className="space-y-6">
                    {/* Service Request Received */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-white">Service Request Received</h6>
                        <p className="text-sm text-gray-400">Client submitted service request</p>
                        <p className="text-xs text-gray-500 mt-1">2023-10-15 08:30 AM</p>
                      </div>
                    </div>

                    {/* Bid Submitted */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-white">Bid Submitted</h6>
                        <p className="text-sm text-gray-400">Provider submitted service bid</p>
                        <p className="text-xs text-gray-500 mt-1">2023-10-15 02:15 PM</p>
                      </div>
                    </div>

                    {/* Bid Accepted */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-white">Bid Accepted</h6>
                        <p className="text-sm text-gray-400">Client accepted the service bid</p>
                        <p className="text-xs text-gray-500 mt-1">2023-10-17 10:45 AM</p>
                      </div>
                    </div>

                    {/* Diagnostic Started */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-white">Diagnostic Started</h6>
                        <p className="text-sm text-gray-400">Initial vehicle diagnostic in progress</p>
                        <p className="text-xs text-gray-500 mt-1">2023-10-18 09:00 AM</p>
                      </div>
                    </div>

                    {/* Repair in Progress */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-white">Repair in Progress</h6>
                        <p className="text-sm text-gray-400">Engine repair and parts replacement</p>
                        <p className="text-xs text-gray-500 mt-1">Started: 2023-10-19</p>
                      </div>
                    </div>

                    {/* Quality Check */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-gray-400">Quality Check</h6>
                        <p className="text-sm text-gray-400">Final inspection and testing</p>
                        <p className="text-xs text-gray-500 mt-1">Estimated: 2023-10-23</p>
                      </div>
                    </div>

                    {/* Service Completion */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-gray-400">Service Completion</h6>
                        <p className="text-sm text-gray-400">Service completed and vehicle returned</p>
                        <p className="text-xs text-gray-500 mt-1">Estimated: 2023-10-24</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Communication" && (
              <div className="space-y-6 p-6">
                {/* Communication (Message) header */}
                <h3 className="text-lg font-semibold text-white">Communication (Message)</h3>
                
                {/* Chat Container */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#23234B] p-6 min-h-[500px] flex flex-col">
                  {/* Messages Area */}
                  <div className="flex-1 space-y-4 mb-6">
                    {/* Client Message 1 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0">
                        <span className="text-sm font-medium text-white">J</span>
                      </div>
                      <div className="flex-1 max-w-md">
                        <div className="rounded-lg bg-[#2a2d4a] p-4">
                          <p className="text-sm text-white">
                            Hello, my Toyota Camry is making knocking sounds and the check engine light is on. I need this fixed as soon as possible.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">2023-10-15 08:30 AM</div>
                      </div>
                    </div>

                    {/* Provider Response 1 */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 max-w-md">
                        <div className="rounded-lg bg-[#4A90E2] p-4 ml-auto">
                          <p className="text-sm text-white">
                            We've reviewed your service request and can perform a comprehensive engine diagnostic and repair for $650. We can complete this within 5 days with a 6-month warranty.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400 text-right">2023-10-15 02:30 AM</div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A90E2] flex-shrink-0">
                        <span className="text-sm font-medium text-white">AF</span>
                      </div>
                    </div>

                    {/* Client Message 2 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0">
                        <span className="text-sm font-medium text-white">J</span>
                      </div>
                      <div className="flex-1 max-w-md">
                        <div className="rounded-lg bg-[#2a2d4a] p-4">
                          <p className="text-sm text-white">
                            I accept your bid. When can I bring the car in for service?
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">2023-10-17 10:45 AM</div>
                      </div>
                    </div>

                    {/* Provider Response 2 */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 max-w-md">
                        <div className="rounded-lg bg-[#4A90E2] p-4 ml-auto">
                          <p className="text-sm text-white">
                            Great! You can bring the vehicle tomorrow morning at 8 AM. Please bring your vehicle registration and service history if available.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400 text-right">2023-10-17 11:30 AM</div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A90E2] flex-shrink-0">
                        <span className="text-sm font-medium text-white">AF</span>
                      </div>
                    </div>

                    {/* Client Message 3 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0">
                        <span className="text-sm font-medium text-white">J</span>
                      </div>
                      <div className="flex-1 max-w-md">
                        <div className="rounded-lg bg-[#2a2d4a] p-4">
                          <p className="text-sm text-white">
                            How is the repair progressing? Do you have an update on when the car will be ready?
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">2023-10-19 02:45 AM</div>
                      </div>
                    </div>

                    {/* Provider Response 3 */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 max-w-md">
                        <div className="rounded-lg bg-[#4A90E2] p-4 ml-auto">
                          <p className="text-sm text-white">
                            We've completed the diagnostic and identified the issue with the engine bearings. We're currently replacing them and expect to complete the repair by end of day tomorrow.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-400 text-right">2023-10-19 11:30 AM</div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A90E2] flex-shrink-0">
                        <span className="text-sm font-medium text-white">AF</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Input Area */}
                  <div className="border-t border-[#2a2d4a] pt-4">
                    <div className="flex items-center gap-3">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2d4a] text-gray-400 hover:bg-[#3a3d5a] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Message"
                          className="w-full rounded-lg border border-[#2a2d4a] bg-[#1D1D41] px-4 py-3 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A90E2] text-white hover:bg-[#357ABD] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2d4a] text-gray-400 hover:bg-[#3a3d5a] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1C18 1 23 6 23 12S18 23 12 23C10 23 8.5 22 7.5 21L2 23L4 18C3 17 1 15 1 12C1 6 6 1 12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeDetailTab === "Dispute Handling" && (
              <div className="space-y-6 p-6">
                {/* Dispute Handling header */}
                <h3 className="text-lg font-semibold text-white">Dispute Handling</h3>
                
                {/* Dispute Case */}
                <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
                  <div className="border-l-4 border-l-red-500 bg-[#252850] p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-4">Service Dispute - Additional Charges</h4>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-400">Issue: </span>
                            <span className="text-white">Client claims provider added unexpected additional charges for parts that were not agreed upon in the original bid.</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Client Position: </span>
                            <span className="text-white">The original bid was $650 but I'm being charged $850 for additional parts I didn't approve.</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Provider Position: </span>
                            <span className="text-white">"The additional parts were necessary for the repair and were discussed with the client during the service."</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Amount in Dispute: </span>
                            <span className="text-white font-semibold">$200</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="rounded-lg bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30">
                          ✓ Resolve
                        </button>
                        <button className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30">
                          ✗ Escalate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dispute Resolution Tools */}
                <h4 className="text-lg font-semibold text-white">Dispute Resolution Tools</h4>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Mediation Options */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                    <h5 className="mb-4 text-base font-semibold text-white">Mediation Options</h5>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Partial refund to client</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Split additional costs</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Service credit for future</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Provider absorbs costs</span>
                      </div>
                    </div>
                  </div>

                  {/* Documentation */}
                  <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                    <h5 className="mb-4 text-base font-semibold text-white">Documentation</h5>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Original service agreement</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Communication logs</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Before/after photos</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#252850] hover:bg-[#2a2d4a] transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-white">Parts receipts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button className="rounded-lg bg-blue-500/20 px-6 py-3 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30">
                    Propose Solution
                  </button>
                  <button className="rounded-lg bg-orange-500/20 px-6 py-3 text-sm font-medium text-orange-400 transition-colors hover:bg-orange-500/30">
                    Force Resolution
                  </button>
                  <button className="rounded-lg bg-gray-500/20 px-6 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-500/30">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "Dispute Management" && (
        <div className="space-y-6">
          {/* Active Disputes Table */}
          <div className="mr-0 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] md:mr-7">
            <div className="border-b border-[#2a2d4a] p-6">
              <h3 className="text-lg font-semibold text-white">Active Disputes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Dispute ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Parties</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Issue</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#2a2d4a] transition-colors hover:bg-[#252850]/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">#DSP-1001</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Engine Repair - Toyota Camry</td>
                    <td className="px-6 py-4 text-sm text-gray-300">John Smith vs AutoFix Pro</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Additional charges</td>
                    <td className="px-6 py-4 text-sm text-gray-300">$200</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="rounded bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                        Under Review
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">2023-10-19</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="rounded bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
                          Resolve
                        </button>
                        <button className="text-gray-400 transition-colors hover:text-cyan-400">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] transition-colors hover:bg-[#252850]/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">#DSP-1002</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Brake Service - Honda Civic</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Sarah Johnson vs QuickFix Mechanics</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Service quality</td>
                    <td className="px-6 py-4 text-sm text-gray-300">$350</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="rounded bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                        Mediation
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">2023-10-18</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="rounded bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
                          Resolve
                        </button>
                        <button className="text-gray-400 transition-colors hover:text-cyan-400">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] transition-colors hover:bg-[#252850]/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">#DSP-1003</td>
                    <td className="px-6 py-4 text-sm text-gray-300">AC Repair - Ford F-150</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Michael Brown vs Elite Auto Care</td>
                    <td className="px-6 py-4 text-sm text-gray-300">Timeline delay</td>
                    <td className="px-6 py-4 text-sm text-gray-300">$150</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="rounded bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                        Awaiting Info
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">2023-10-17</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="rounded bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
                          Resolve
                        </button>
                        <button className="text-gray-400 transition-colors hover:text-cyan-400">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dispute Resolution Statistics */}
          <div className="mr-0 md:mr-7">
            <h3 className="mb-6 text-lg font-semibold text-white">Dispute Resolution Statistics</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Resolution Rate */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
                <h4 className="mb-2 text-sm font-medium text-gray-400">Resolution Rate</h4>
                <div className="mb-2 text-4xl font-bold text-white">94%</div>
                <p className="text-xs text-gray-500">of disputes resolved successfully</p>
              </div>

              {/* Average Resolution Time */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
                <h4 className="mb-2 text-sm font-medium text-gray-400">Average Resolution Time</h4>
                <div className="mb-2 text-4xl font-bold text-white">3.2 days</div>
                <p className="text-xs text-gray-500">from dispute to resolution</p>
              </div>

              {/* Client Satisfaction */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
                <h4 className="mb-2 text-sm font-medium text-gray-400">Client Satisfaction</h4>
                <div className="mb-2 text-4xl font-bold text-white">4.5/5.0</div>
                <p className="text-xs text-gray-500">post-resolution rating</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "SLA Tracking" && (
        <div className="space-y-6">
          {/* Service Level Agreement Tracking */}
          <div className="mr-0 md:mr-7">
            <h3 className="mb-6 text-lg font-semibold text-white">Service Level Agreement Tracking</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Engine Repair - Toyota Camry */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">Engine Repair - Toyota Camry</h4>
                  <span className="rounded bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
                    Overdue
                  </span>
                </div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-[#2a2d4a]">
                      <td className="py-2 text-sm text-gray-400">Provider:</td>
                      <td className="py-2 text-right text-sm text-white">AutoFix Pro Services</td>
                    </tr>
                    <tr className="border-b border-[#2a2d4a] bg-[#252850]/30">
                      <td className="py-2 text-sm text-gray-400">Promise Date:</td>
                      <td className="py-2 text-right text-sm text-white">2023-10-22</td>
                    </tr>
                    <tr className="border-b border-[#2a2d4a]">
                      <td className="py-2 text-sm text-gray-400">Days Overdue:</td>
                      <td className="py-2 text-right text-sm text-red-400">2 days</td>
                    </tr>
                    <tr className="bg-[#252850]/30">
                      <td className="py-2 text-sm text-gray-400">Penalty:</td>
                      <td className="py-2 text-right text-sm text-white">$50/day</td>
                    </tr>
                  </tbody>
                </table>
                <button className="mt-4 w-full rounded bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30">
                  Contact Provider
                </button>
              </div>

              {/* Brake Service - Honda Civic */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">Brake Service - Honda Civic</h4>
                  <span className="rounded bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                    At Risk
                  </span>
                </div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-[#2a2d4a]">
                      <td className="py-2 text-sm text-gray-400">Provider:</td>
                      <td className="py-2 text-right text-sm text-white">QuickFix Mechanics</td>
                    </tr>
                    <tr className="border-b border-[#2a2d4a] bg-[#252850]/30">
                      <td className="py-2 text-sm text-gray-400">Promise Date:</td>
                      <td className="py-2 text-right text-sm text-white">2023-10-25</td>
                    </tr>
                    <tr className="border-b border-[#2a2d4a]">
                      <td className="py-2 text-sm text-gray-400">Days Remaining:</td>
                      <td className="py-2 text-right text-sm text-yellow-400">1 days</td>
                    </tr>
                    <tr className="bg-[#252850]/30">
                      <td className="py-2 text-sm text-gray-400">Progress:</td>
                      <td className="py-2 text-right text-sm text-white">75% complete</td>
                    </tr>
                  </tbody>
                </table>
                <button className="mt-4 w-full rounded bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30">
                  Contact Provider
                </button>
              </div>

              {/* AC Repair - Ford F-150 */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">AC Repair - Ford F-150</h4>
                  <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                    On Track
                  </span>
                </div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-[#2a2d4a]">
                      <td className="py-2 text-sm text-gray-400">Provider:</td>
                      <td className="py-2 text-right text-sm text-white">Elite Auto Care</td>
                    </tr>
                    <tr className="border-b border-[#2a2d4a] bg-[#252850]/30">
                      <td className="py-2 text-sm text-gray-400">Promise Date:</td>
                      <td className="py-2 text-right text-sm text-white">2023-10-28</td>
                    </tr>
                    <tr className="border-b border-[#2a2d4a]">
                      <td className="py-2 text-sm text-gray-400">Days Remaining:</td>
                      <td className="py-2 text-right text-sm text-green-400">4 days</td>
                    </tr>
                    <tr className="bg-[#252850]/30">
                      <td className="py-2 text-sm text-gray-400">Progress:</td>
                      <td className="py-2 text-right text-sm text-white">90% complete</td>
                    </tr>
                  </tbody>
                </table>
                <button className="mt-4 w-full rounded bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30">
                  Contact Provider
                </button>
              </div>
            </div>
          </div>

          {/* SLA Performance Metrics */}
          <div className="mr-0 md:mr-7">
            <h3 className="mb-6 text-lg font-semibold text-white">SLA Performance Metrics</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* On-Time Completion */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
                <h4 className="mb-2 text-sm font-medium text-gray-400">On-Time Completion</h4>
                <div className="mb-2 text-4xl font-bold text-white">87%</div>
                <p className="text-xs text-gray-500">of services completed on time</p>
              </div>

              {/* Average Delay */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
                <h4 className="mb-2 text-sm font-medium text-gray-400">Average Delay</h4>
                <div className="mb-2 text-4xl font-bold text-white">1.8 days</div>
                <p className="text-xs text-gray-500">average delay for late services</p>
              </div>

              {/* SLA Penalties */}
              <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 text-center">
                <h4 className="mb-2 text-sm font-medium text-gray-400">SLA Penalties</h4>
                <div className="mb-2 text-4xl font-bold text-white">$2,450</div>
                <p className="text-xs text-gray-500">collected in penalties this month</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
