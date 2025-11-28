"use client";

import { useState } from "react";
import Image from "next/image";
import { EnhancedUserTable } from "@/components/users/enhanced-user-table";
import { EditUserModal } from "@/components/users/edit-user-modal";
import { User } from "@/types/user";
import { Edit, Trash } from "lucide-react";

interface certificationManagementProps {
  users: User[];
}

type Tab = "list" | "detail" | "statistics" | "export";

export function CertificationManagement({ users }: certificationManagementProps) {
  const [activeTab, setActiveTab] = useState<Tab>("list");
  const [selectedUser, setSelectedUser] = useState<User | null>(
    users && users.length > 0 ? users[0] : null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<{
    fullName: string;
    email: string;
    role: string;
    status: string;
    segment: string;
    verification: string;
  }>({
    fullName: "",
    email: "",
    role: "Inspector",
    status: "Active",
    segment: "Premium",
    verification: "Verified"
  });

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setActiveTab("detail");
  };

  const handleEditClick = () => {
    if (selectedUser) {
      const newFormData = {
        fullName: selectedUser.name || "",
        email: selectedUser.email || "",
        role: "Inspector",
        status: "Active",
        segment: "Premium",
        verification: "Verified"
      };
      setEditFormData(newFormData);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveChanges = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="mr-0 flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#1D1D41] px-6 py-4 md:mr-7">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "list"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Inspection List
          </button>
          <button
            onClick={() => setActiveTab("detail")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "detail"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Certification Detail
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "statistics"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            AI Statistics
          </button>
          <button
            onClick={() => setActiveTab("export")}
            className={`px-2 font-medium transition-colors ${
              activeTab === "export"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Data Export
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "list" && <UserListTab users={users} onViewUser={handleViewUser} />}
        {activeTab === "detail" && (
          <UserDetailTab user={selectedUser || users[0]} onEditClick={handleEditClick} />
        )}
        {activeTab === "statistics" && <AIStatisticsTab />}
        {activeTab === "export" && <DataExportTab />}
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        formData={editFormData}
        onFormChange={setEditFormData}
        onSave={handleSaveChanges}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

// User List Tab - Inspection List
function UserListTab({ users, onViewUser }: { users: User[]; onViewUser: (user: User) => void }) {
  const [dateRangeFilter, setDateRangeFilter] = useState("All Dates");
  const [aiModuleFilter, setAiModuleFilter] = useState("AI Modules");
  const [comboTypeFilter, setComboTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Mock inspection data matching the image
  const inspections = [
    {
      userId: "#USR-001",
      vehicle: "Toyota Camry 2022",
      owner: { name: "John Smith", image: "" },
      date: "2023-10-15",
      aiModule: "Structure Analysis",
      comboType: "Premium Package",
      integrityScore: "92%",
      status: "Approved",
      statusColor: "bg-green-500/20 text-green-400"
    },
    {
      userId: "#USR-002",
      vehicle: "Honda Civic 2021",
      owner: { name: "Sarah Johnson", image: "" },
      date: "2023-10-14",
      aiModule: "Paint Analysis",
      comboType: "Basic Inspection",
      integrityScore: "87%",
      status: "Processing",
      statusColor: "bg-yellow-500/20 text-yellow-400"
    },
    {
      userId: "#USR-003",
      vehicle: "Ford F-150 2020",
      owner: { name: "Michael Brown", image: "" },
      date: "2023-10-12",
      aiModule: "Ballistic Glass",
      comboType: "Comprehensive",
      integrityScore: "78%",
      status: "Pending",
      statusColor: "bg-yellow-500/20 text-yellow-400"
    },
    {
      userId: "#USR-004",
      vehicle: "BMW X5 2023",
      owner: { name: "Emily Davis", image: "" },
      date: "2023-10-10",
      aiModule: "Interior Inspection",
      comboType: "Premium Package",
      integrityScore: "95%",
      status: "Approved",
      statusColor: "bg-green-500/20 text-green-400"
    },
    {
      userId: "#USR-005",
      vehicle: "Tesla Model 3 2023",
      owner: { name: "Robert Wilson", image: "" },
      date: "2023-10-08",
      aiModule: "Functionality Test",
      comboType: "Comprehensive",
      integrityScore: "89%",
      status: "Rejected",
      statusColor: "bg-red-500/20 text-red-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="mr-0 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">Date Range</label>
            <select
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option>All Dates</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white">AI Module</label>
            <select
              value={aiModuleFilter}
              onChange={(e) => setAiModuleFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option>AI Modules</option>
              <option>Structure Analysis</option>
              <option>Paint Analysis</option>
              <option>Ballistic Glass</option>
              <option>Interior Inspection</option>
              <option>Functionality Test</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white">Combo Type</label>
            <select
              value={comboTypeFilter}
              onChange={(e) => setComboTypeFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option>All Types</option>
              <option>Premium Package</option>
              <option>Basic Inspection</option>
              <option>Comprehensive</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-3 text-sm text-white focus:outline-none"
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Processing</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <button className="w-full rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-4 py-3 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Inspection Table */}
      <div className="mr-0 overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1D1D41] md:mr-7">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Vehicle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Owner</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  AI Module
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Combo Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Integrity Score
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#2a2d4a] transition-colors hover:bg-[#252850]/50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">{inspection.userId}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{inspection.vehicle}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
                      <span>{inspection.owner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{inspection.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{inspection.aiModule}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{inspection.comboType}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {inspection.integrityScore}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-medium ${inspection.statusColor}`}
                    >
                      {inspection.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        className="text-gray-400 transition-colors hover:text-cyan-400"
                        title="View"
                      >
                        👁️
                      </button>
                      <button
                        className="text-gray-400 transition-colors hover:text-green-400"
                        title="Approve"
                      >
                        ✓
                      </button>
                      <button
                        className="text-gray-400 transition-colors hover:text-red-400"
                        title="Reject"
                      >
                        ✕
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
          <div className="text-sm text-gray-400">Showing 1 to 4 of 28 results</div>
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
  );
}

// Certification Detail Tab
function UserDetailTab({ user, onEditClick }: { user: User; onEditClick: () => void }) {
  const [activeDetailTab, setActiveDetailTab] = useState("User Uploads");

  const detailTabs = [
    "User Uploads",
    "AI Module Results",
    "Reports",
    "Vehicle Metrics",
    "Admin Comments"
  ];

  return (
    <div className="mr-0 space-y-6 md:mr-7">
      {/* Inspection Header */}
      <div className="rounded-xl border border-[#2a2d4a] bg-[#252850] p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">
              Inspection #CERT-4582 - Toyota Camry 2022
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Submitted by John Smith on 2023-10-15 • Vehicle VIN: JTNKU4BEXC9012345
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg bg-green-500/20 px-6 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/30"
            >
              Approved
            </button>
            <button
              type="button"
              className="rounded-lg bg-orange-500/20 px-6 py-2 text-sm font-medium text-orange-400 transition-colors hover:bg-orange-500/30"
            >
              Reprocess
            </button>
            <button
              type="button"
              className="rounded-lg bg-red-500/20 px-6 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"
            >
              Rejected
            </button>
            <button
              type="button"
              className="rounded-lg bg-cyan-500/20 px-6 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>

      {/* Detail Sub-Tabs */}
      <div className="border-b border-[#2a2d4a]">
        <div className="flex gap-6 overflow-x-auto pb-0">
          {detailTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveDetailTab(tab)}
              className={`px-2 pb-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeDetailTab === tab
                  ? "border-b-2 border-cyan-400 text-cyan-400"
                  : "border-b-2 border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mr-0 md:mr-7">
        {activeDetailTab === "User Uploads" && <UserUploadsTab />}
        {activeDetailTab === "AI Module Results" && <AIModuleResultsTab />}
        {activeDetailTab === "Reports" && <ReportsTab />}
        {activeDetailTab === "Vehicle Metrics" && <VehicleMetricsTab />}
        {activeDetailTab === "Admin Comments" && <AdminCommentsTab />}
      </div>
    </div>
  );
}

// User Uploads Tab
function UserUploadsTab() {
  const mediaItems = [
    { id: 1, title: "Front View", image: "https://via.placeholder.com/300x200?text=Front+View" },
    { id: 2, title: "Rear View", image: "https://via.placeholder.com/300x200?text=Rear+View" },
    { id: 3, title: "Slide View", image: "https://via.placeholder.com/300x200?text=Slide+View" },
    { id: 4, title: "Engine Bay", image: "https://via.placeholder.com/300x200?text=Engine+Bay" },
    {
      id: 5,
      title: "Interior View",
      image: "https://via.placeholder.com/300x200?text=Interior+View"
    },
    { id: 6, title: "Test Drive Video", image: "https://via.placeholder.com/300x200?text=Video" }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
        <h3 className="mb-6 text-lg font-semibold text-white">Uploaded Media</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-[#2a2d4a] bg-[#252850] transition-colors hover:border-cyan-400/50"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={200}
                className="h-40 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-lg bg-cyan-500/20 p-3 text-cyan-400 transition-colors hover:bg-cyan-500/40">
                  👁️ View
                </button>
                <button className="rounded-lg bg-green-500/20 p-3 text-green-400 transition-colors hover:bg-green-500/40">
                  ✓ Approve
                </button>
              </div>
              <div className="border-t border-[#2a2d4a] p-4">
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AI Module Results Tab
function AIModuleResultsTab() {
  const moduleResults = [
    {
      title: "Structure Analysis",
      status: "Complete",
      metrics: [
        { label: "Frame Integrity", score: "96%", color: "bg-green-500/20 text-green-400" },
        { label: "Chassis Alignment", score: "95%", color: "bg-green-500/20 text-green-400" },
        { label: "Suspension Check", score: "87%", color: "bg-orange-500/20 text-orange-400" },
        { label: "Rust Detection", score: "96%", color: "bg-green-500/20 text-green-400" }
      ]
    },
    {
      title: "Paint Analysis",
      status: "Complete",
      metrics: [
        { label: "Paint Thickness", score: "92%", color: "bg-green-500/20 text-green-400" },
        { label: "Color Consistency", score: "94%", color: "bg-green-500/20 text-green-400" },
        { label: "Surface Imperfections", score: "86%", color: "bg-orange-500/20 text-orange-400" },
        { label: "Clear Coat Quality", score: "91%", color: "bg-green-500/20 text-green-400" }
      ]
    },
    {
      title: "Ballistic Glass Assessment",
      status: "Complete",
      metrics: [
        { label: "Impact Resistance", score: "96%", color: "bg-green-500/20 text-green-400" },
        { label: "Optical Clarity", score: "98%", color: "bg-green-500/20 text-green-400" },
        { label: "Lamination Integrity", score: "95%", color: "bg-green-500/20 text-green-400" },
        { label: "Installation Quality", score: "88%", color: "bg-orange-500/20 text-orange-400" }
      ]
    },
    {
      title: "Interior Inspection",
      status: "Complete",
      metrics: [
        { label: "Upholstery Condition", score: "93%", color: "bg-green-500/20 text-green-400" },
        { label: "Electronic Systems", score: "88%", color: "bg-orange-500/20 text-orange-400" },
        { label: "Safety Features", score: "97%", color: "bg-green-500/20 text-green-400" },
        { label: "Cleanliness Score", score: "91%", color: "bg-green-500/20 text-green-400" }
      ]
    },
    {
      title: "Functionality Test",
      status: "Complete",
      metrics: [
        { label: "Engine Performance", score: "94%", color: "bg-green-500/20 text-green-400" },
        { label: "Braking System", score: "96%", color: "bg-green-500/20 text-green-400" },
        { label: "Transmission", score: "89%", color: "bg-orange-500/20 text-orange-400" },
        { label: "Steering Response", score: "92%", color: "bg-green-500/20 text-green-400" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="mb-6 text-lg font-semibold text-white">AI Module Results</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {moduleResults.map((module, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl border border-l-4 border-[#2a2d4a] border-l-[#00FF88] bg-[#1a1d3a]"
          >
            <div className="flex items-center justify-between border-b border-[#2a2d4a] bg-[#252850] px-6 py-3">
              <h4 className="text-sm font-semibold text-white">{module.title}</h4>
              <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-medium text-cyan-400">
                {module.status}
              </span>
            </div>
            <div className="space-y-3 p-4">
              {module.metrics.map((metric, midx) => (
                <div key={midx} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">{metric.label}:</span>
                  <span className={`rounded px-3 py-1 text-xs font-bold ${metric.color}`}>
                    {metric.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reports Tab
function ReportsTab() {
  return (
    <div className="space-y-6 rounded-2xl bg-[#23234B] p-5">
      <h3 className="mb-6 text-lg font-semibold text-white">Reports</h3>
      <hr className="border-[#4d506a]" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* PDF Report Card */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#262656]">
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Image
              src="/provax-dashboard/file-icons/pdf.png"
              alt="PDF"
              width={48}
              height={48}
              className="h-20 w-20 p-2"
            />
            <h4 className="mb-2 text-lg font-semibold text-white">PDF Report</h4>
            <p className="mb-6 text-xs text-gray-400">
              Complete certification report in PDF format
            </p>
            <div className="flex w-full gap-3">
              <button className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">
                View Report
              </button>
              <button className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#303067] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">
                Download
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#262156]">
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Image
              src="/provax-dashboard/file-icons/qr.png"
              alt="QR Code"
              width={48}
              height={48}
              className="h-20 w-20 p-2"
            />
            <h4 className="mb-4 text-lg font-semibold text-white">QR Code</h4>
            <p className="mb-4 text-xs text-gray-400">Embedded QR code for quick verification</p>
            <div className="mb-6 bg-white p-1">
              <Image
                src="/provax-dashboard/file-icons/code.png"
                alt="QR Code"
                width={60}
                height={60}
                className="h-30 w-30 p-1"
              />
            </div>
            <button className="w-full rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">
              Generate New QR
            </button>
          </div>
        </div>

        {/* Shareable Link Card */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#262156]">
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Image
              src="/provax-dashboard/file-icons/share.png"
              alt="Share"
              width={48}
              height={48}
              className="h-20 w-20 p-2"
            />
            <h4 className="mb-2 text-lg font-semibold text-white">Shareable Link</h4>
            <p className="mb-4 text-xs text-gray-400">Public link for sharing certification</p>
            <div className="mb-6 w-full rounded-lg bg-[#303067] p-3">
              <p className="text-xs break-all text-gray-400">https://cert.example.com/CERT-4582</p>
            </div>
            <div className="flex w-full gap-3">
              <button className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">
                Copy Link
              </button>
              <button className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#303067] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vehicle Metrics Tab
function VehicleMetricsTab() {
  return (
    <div className="space-y-6 rounded-2xl bg-[#23234B] p-5">
      <h3 className="mb-6 text-lg font-semibold text-white">Vehicle Metrics</h3>

      <hr className="border-[#4d506a]" />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col items-center rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] p-6">
          <svg width="80" height="80" viewBox="0 0 80 80" className="mb-4">
            <circle cx="40" cy="40" r="35" fill="none" stroke="#10b981" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="4"
              strokeDasharray="219.8 351.9"
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
            <text x="40" y="48" fontSize="20" fontWeight="bold" fill="#10b981" textAnchor="middle">
              92%
            </text>
          </svg>
          <p className="text-center text-sm font-medium text-gray-400">Vehicle Integrity Score</p>
          <p className="mt-1 text-center text-xs text-gray-500">
            Overall vehicle condition assessment
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-[#2a2d4a] bg-[#252850] p-6">
          <p className="text-center text-4xl font-bold text-white">142</p>
          <p className="mt-2 text-center text-sm text-gray-400">Components Checked</p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] p-6">
          <p className="text-center text-4xl font-bold text-white">98%</p>
          <p className="mt-2 text-center text-sm text-gray-400">AI Confidence Score</p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-[#2a2d4a] bg-[#252850] p-6">
          <p className="text-center text-4xl font-bold text-white">3</p>
          <p className="mt-2 text-center text-sm text-gray-400">Previous Certifications</p>
        </div>
      </div>

      {/* Certification Summary */}
      <div className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1a1d3a]">
        <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
          <h4 className="text-lg font-semibold text-white">Certification Summary</h4>
        </div>
        <div className="divide-y divide-[#2a2d4a]">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-white">2023-10-15</p>
              <p className="text-xs text-gray-400">Current Inspection</p>
            </div>
            <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              92%
            </span>
          </div>
          <div className="flex items-center justify-between bg-[#252850] p-4">
            <div>
              <p className="font-medium text-white">2023-04-10</p>
              <p className="text-xs text-gray-400">Routine Inspection</p>
            </div>
            <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              89%
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-white">2022-11-05</p>
              <p className="text-xs text-gray-400">Post-Repair Inspection</p>
            </div>
            <span className="rounded bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
              84%
            </span>
          </div>
          <div className="flex items-center justify-between bg-[#252850] p-4">
            <div>
              <p className="font-medium text-white">2022-05-20</p>
              <p className="text-xs text-gray-400">Initial Certification</p>
            </div>
            <span className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              91%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Comments Tab
function AdminCommentsTab() {
  const comments = [
    {
      id: 1,
      author: "Admin User",
      badge: "Safety Issue",
      badgeColor: "bg-red-500/20 text-red-400",
      date: "2023-10-15 14:30",
      module: "AI Module: Structure Analysis",
      text: "Found minor frame misalignment in rear section that AI missed. Requires manual verification.",
      hasActions: true
    },
    {
      id: 2,
      author: "Technical Team",
      badge: "In Progress",
      badgeColor: "bg-blue-500/20 text-blue-400",
      date: "2023-10-15 11:15",
      module: "AI Module: Paint Analysis",
      text: "Found minor frame misalignment in rear section that AI missed. Requires manual verification.",
      hasActions: true
    },
    {
      id: 3,
      author: "Admin User",
      badge: "Safety Issue",
      badgeColor: "bg-red-500/20 text-red-400",
      date: "2023-10-15 14:30",
      module: "AI Module: Structure Analysis",
      text: "Found minor frame misalignment in rear section that AI missed. Requires manual verification.",
      hasActions: true
    }
  ];

  // Admin Comments Tab
  return (
    <div className="space-y-6 rounded-2xl bg-[#23234B] p-5">
      <h3 className="mb-6 text-lg font-semibold text-white">Technical Comments & Overrides</h3>

      <div className="space-y-4">
        {comments.map((comment, idx) => (
          <div
            key={comment.id}
            className={`rounded-xl border border-l-8 border-[#2a2d4a] border-l-[#00FF88] p-4 ${
              idx % 2 === 0 ? "bg-[#1a1d3a]" : "bg-[#252850]"
            }`}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">{comment.author}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${comment.badgeColor}`}
                >
                  {comment.badge}
                </span>
              </div>
              <span className="text-xs text-gray-400">• {comment.date}</span>
            </div>

            <p className="mb-2 text-xs font-medium text-gray-400">{comment.module}</p>
            <p className="mb-4 text-sm text-gray-300">{comment.text}</p>

            {comment.hasActions && (
              <div className="flex gap-2">
                {/* Action Buttons */}
                {/* Edit */}
                <button className="rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] p-2 transition-colors hover:border-cyan-400/50">
                  <Edit className="h-4 w-4 text-cyan-400" />
                </button>

                {/* Delete */}
                <button className="rounded-lg border border-red-500/30 bg-red-500/20 p-2 transition-colors hover:border-red-500/50">
                  <Trash className="h-4 w-4 text-red-400" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Comment Button */}
      <div className="mt- flex w-full justify-center">
        <button className="align-center flex items-center justify-center gap-2 rounded-xl bg-[#3083FF] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <span>+</span> Add New Comment
        </button>
      </div>
    </div>
  );
}

// AI Statistics Tab
function AIStatisticsTab() {
  return (
    <div className="mr-0 space-y-6 md:mr-7">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">AI Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Average Accuracy</span>
              <span className="font-semibold text-cyan-400">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Processing Speed</span>
              <span className="font-semibold text-cyan-400">2.3s/scan</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">False Positives</span>
              <span className="font-semibold text-green-400">2.1%</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Module Usage</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Structure Analysis</span>
              <span className="font-semibold text-cyan-400">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Paint Analysis</span>
              <span className="font-semibold text-cyan-400">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Interior Inspection</span>
              <span className="font-semibold text-cyan-400">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data Export Tab
function DataExportTab() {
  return (
    <div className="mr-0 space-y-6 md:mr-7">
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6">
        <h3 className="mb-6 text-lg font-semibold text-white">Export Data</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 p-6 transition-colors hover:bg-cyan-500/30">
            <div className="mb-2 text-lg font-semibold text-cyan-400">📊 Export as CSV</div>
            <p className="text-sm text-gray-300">Download inspection data in CSV format</p>
          </button>
          <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 p-6 transition-colors hover:bg-cyan-500/30">
            <div className="mb-2 text-lg font-semibold text-cyan-400">📄 Export as PDF</div>
            <p className="text-sm text-gray-300">Download formatted inspection reports</p>
          </button>
          <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 p-6 transition-colors hover:bg-cyan-500/30">
            <div className="mb-2 text-lg font-semibold text-cyan-400">📋 Export as Excel</div>
            <p className="text-sm text-gray-300">Download data with advanced formatting</p>
          </button>
          <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 p-6 transition-colors hover:bg-cyan-500/30">
            <div className="mb-2 text-lg font-semibold text-cyan-400">⚙️ Custom Export</div>
            <p className="text-sm text-gray-300">Choose specific fields and format</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Audit Log Tab
function AuditLogTab() {
  const [dateFilter, setDateFilter] = useState("Last 7 Days");
  const [adminFilter, setAdminFilter] = useState("All User");
  const [actionFilter, setActionFilter] = useState("All Action");

  const auditLogs = [
    {
      timestamp: "2023-10-15 11:30",
      admin: "Admin User",
      action: "Changed user role",
      user: "Sarah Johnson (#USR-1002)",
      previousValue: "Buyer",
      newValue: "Seller"
    },
    {
      timestamp: "2023-10-14 16:45",
      admin: "System Admin",
      action: "Reset user password",
      user: "Michael Brown (#USR-1003)",
      previousValue: "-",
      newValue: "Password Reset"
    },
    {
      timestamp: "2023-10-12 14:30",
      admin: "Admin User",
      action: "Added internal note",
      user: "John Smith (#USR-1001)",
      previousValue: "-",
      newValue: "Note added"
    },
    {
      timestamp: "2023-10-10 09:15",
      admin: "Admin User",
      action: "Deactivated account",
      user: "Robert Wilson (#USR-1005)",
      previousValue: "Active",
      newValue: "Inactive"
    },
    {
      timestamp: "2023-10-05 14:20",
      admin: "System",
      action: "Flagged user",
      user: "John Smith (#USR-1001)",
      previousValue: "-",
      newValue: "Security flag added"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="mr-0 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-4 md:mr-7">
        <div className="mb-1 flex items-center justify-between">
          <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-[12px] text-gray-400">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-4 text-[12px] text-white"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>All Time</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[12px] text-gray-400">Admin</label>
              <select
                value={adminFilter}
                onChange={(e) => setAdminFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-4 text-[12px] text-white"
              >
                <option>All User</option>
                <option>Admin User</option>
                <option>System Admin</option>
                <option>System</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[12px] text-gray-400">Action Type</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-4 text-[12px] text-white"
              >
                <option>All Action</option>
                <option>Changed user role</option>
                <option>Reset user password</option>
                <option>Added internal note</option>
                <option>Deactivated account</option>
                <option>Flagged user</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-6 py-4 text-[11px] text-cyan-400 transition-colors hover:bg-cyan-500/30">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="mr-0 overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#1D1D41] md:mr-7">
        <div className="border-b border-[#2a2d4a] p-6">
          <h3 className="font-semibold text-white">System Audit Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d4a]">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Admin</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Action</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Previous Value
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">New Value</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#2a2d4a] transition-colors hover:bg-[#1a1d3a]/50"
                >
                  <td className="px-6 py-4 text-sm text-gray-300">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.admin}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.previousValue}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{log.newValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#2a2d4a] px-6 py-4">
          <div className="text-sm text-gray-400">Showing 1 to 4 of 28 results</div>
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
  );
}
