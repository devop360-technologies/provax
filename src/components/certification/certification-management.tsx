"use client";

import { useState } from "react";
import Image from "next/image";
import { EnhancedUserTable } from "@/components/users/enhanced-user-table";
import { EditUserModal } from "@/components/users/edit-user-modal";
import { AddTechnicalCommentModal } from "@/components/modals/add-technical-comment-modal";
import { DeleteCommentModal } from "@/components/modals/delete-comment-modal";
import { User } from "@/types/user";
import { Edit, Trash } from "lucide-react";
import { BarChartOverview, ChartOverview } from "../dashboard";

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
  const [isTechnicalCommentModalOpen, setIsTechnicalCommentModalOpen] = useState(false);
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<any>(null);
  const [deletingComment, setDeletingComment] = useState<any>(null);
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

  const handleTechnicalCommentModalOpen = () => {
    setEditingComment(null);
    setIsTechnicalCommentModalOpen(true);
  };

  const handleEditComment = (comment: any) => {
    setEditingComment({
      commentType: "Technical Override",
      aiModule: comment.module.replace("AI Module: ", ""),
      priority: "Medium",
      comment: comment.text,
      requiresFollowUp: false
    });
    setIsTechnicalCommentModalOpen(true);
  };

  const handleDeleteComment = (comment: any) => {
    setDeletingComment(comment);
    setIsDeleteCommentModalOpen(true);
  };

  const handleConfirmDeleteComment = () => {
    console.log("Comment deleted:", deletingComment);
    // Add your delete logic here
    setDeletingComment(null);
    setIsDeleteCommentModalOpen(false);
  };

  const handleSaveTechnicalComment = (commentData: {
    commentType: string;
    aiModule: string;
    priority: string;
    comment: string;
    requiresFollowUp: boolean;
  }) => {
    if (editingComment) {
      console.log("Technical comment updated:", commentData);
      // Add your update logic here
    } else {
      console.log("Technical comment saved:", commentData);
      // Add your save logic here
    }
    setEditingComment(null);
    setIsTechnicalCommentModalOpen(false);
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
          <UserDetailTab 
            user={selectedUser || users[0]} 
            onEditClick={handleEditClick}
            onTechnicalCommentClick={handleTechnicalCommentModalOpen}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
          />
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

      {/* Technical Comment Modal */}
      <AddTechnicalCommentModal
        isOpen={isTechnicalCommentModalOpen}
        onClose={() => {
          setIsTechnicalCommentModalOpen(false);
          setEditingComment(null);
        }}
        onSave={handleSaveTechnicalComment}
        editData={editingComment}
        isEditing={!!editingComment}
      />

      {/* Delete Comment Modal */}
      <DeleteCommentModal
        isOpen={isDeleteCommentModalOpen}
        onClose={() => {
          setIsDeleteCommentModalOpen(false);
          setDeletingComment(null);
        }}
        onConfirm={handleConfirmDeleteComment}
        commentAuthor={deletingComment?.author}
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

  const handleViewInspection = (inspection: any) => {
    // Map inspection to a User object to navigate to Certification Detail
    const user = users[0]; // Use first user or you can create a mock user
    if (user) {
      onViewUser(user);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex justify-between items-center mr-0 rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 md:mr-7">
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
        </div>
        <div>
          <button className="w-full mt-4 rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-4 py-3 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30">
            Apply Filters
          </button>
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
                  <td className="px-4 py-4 text-[12px] font-medium text-white">
                    {inspection.userId}
                  </td>
                  <td className="px-4 py-4 text-[12px] text-gray-300">{inspection.vehicle}</td>
                  <td className="px-4 py-4 text-[12px] text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
                      <span>{inspection.owner.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-gray-300">{inspection.date}</td>
                  <td className="px-4 py-4 text-[12px] text-gray-300">{inspection.aiModule}</td>
                  <td className="px-4 py-4 text-[12px] text-gray-300">{inspection.comboType}</td>
                  <td className="px-4 py-4 text-[12px] font-medium text-white">
                    {inspection.integrityScore}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`rounded px-3 py-1 text-xs font-medium ${inspection.statusColor}`}
                    >
                      {inspection.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewInspection(inspection)}
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
function UserDetailTab({ 
  user, 
  onEditClick, 
  onTechnicalCommentClick,
  onEditComment,
  onDeleteComment
}: { 
  user: User; 
  onEditClick: () => void;
  onTechnicalCommentClick: () => void;
  onEditComment: (comment: any) => void;
  onDeleteComment: (comment: any) => void;
}) {
  const [activeDetailTab, setActiveDetailTab] = useState("User Uploads");

  const detailTabs = [
    "User Uploads",
    "AI Module Results",
    "Reports",
    "Vehicle Metrics",
    "Admin Comments"
  ];

  return (
    <div className="mr-0 space-y-6 rounded-2xl bg-[#1e1e40] px-6 pt-6 md:mr-7">
      {/* Inspection Header */}
      <div className="rounded-xl border border-[#2a2d4a] bg-[#252850] p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h2 className="text-white">Inspection #CERT-4582 - Toyota Camry 2022</h2>
            <p className="mt-2 text-[12px] text-gray-400">
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
      <div className="rounded-2xl border border-[#2a2d4a] bg-[#252850] px-6 pt-5">
        <div className="flex gap-6 overflow-x-auto">
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
      <div>
        {activeDetailTab === "User Uploads" && <UserUploadsTab />}
        {activeDetailTab === "AI Module Results" && <AIModuleResultsTab />}
        {activeDetailTab === "Reports" && <ReportsTab />}
        {activeDetailTab === "Vehicle Metrics" && <VehicleMetricsTab />}
        {activeDetailTab === "Admin Comments" && (
          <AdminCommentsTab 
            onTechnicalCommentClick={onTechnicalCommentClick}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------------------- other Detail Tab Components ---------------------------------------------------------------------------------

// User Uploads Tab
function UserUploadsTab() {
  const mediaItems = [
    { id: 1, title: "Front View", image: "/provax-images/Markeetplace/card-cars/frontcar.png" },
    { id: 2, title: "Rear View", image: "/provax-images/Markeetplace/card-cars/fullcar.png" },
    { id: 3, title: "Slide View", image: "/provax-images/Markeetplace/card-cars/darkcar.png" },
    { id: 4, title: "Engine Bay", image: "/provax-images/Markeetplace/card-cars/car.png" },
    {
      id: 5,
      title: "Interior View",
      image: "/provax-images/Markeetplace/card-cars/first.png"
    },
    { id: 6, title: "Test Drive Video", image: "/provax-images/Markeetplace/card-cars/treecar.png" }
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
              <div className="relative h-40 w-full bg-[#2a2d4a]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="h-40 w-full object-cover"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%232a2d4a'/%3E%3Ctext x='150' y='90' font-family='Arial, sans-serif' font-size='14' fill='%236b7280' text-anchor='middle' dy='0.3em'%3E" + item.title + "%3C/text%3E%3Ctext x='150' y='110' font-family='Arial, sans-serif' font-size='12' fill='%234b5563' text-anchor='middle' dy='0.3em'%3EImage Loading...%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
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
function AdminCommentsTab({ 
  onTechnicalCommentClick, 
  onEditComment, 
  onDeleteComment 
}: { 
  onTechnicalCommentClick: () => void;
  onEditComment: (comment: any) => void;
  onDeleteComment: (comment: any) => void;
}) {
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
                <button 
                  onClick={() => onEditComment(comment)}
                  className="rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] p-2 transition-colors hover:border-cyan-400/50"
                >
                  <Edit className="h-4 w-4 text-cyan-400" />
                </button>

                {/* Delete */}
                <button 
                  onClick={() => onDeleteComment(comment)}
                  className="rounded-lg border border-red-500/30 bg-red-500/20 p-2 transition-colors hover:border-red-500/50"
                >
                  <Trash className="h-4 w-4 text-red-400" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Comment Button */}
      <div className="mt- flex w-full justify-center">
        <button 
          onClick={onTechnicalCommentClick}
          className="align-center flex items-center justify-center gap-2 rounded-xl bg-[#3083FF] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <span>+</span> Add New Comment
        </button>
      </div>
    </div>
  );
}

const serviceRequestData = [35, 48, 52, 58, 62, 70, 72, 68, 71, 75, 78, 80];
const completedJobsData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 61 },
  { month: "May", value: 55 },
  { month: "Jun", value: 67 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 71 },
  { month: "Nov", value: 69 },
  { month: "Dec", value: 75 }
];

// AI Statistics Tab
function AIStatisticsTab() {
  return (
    <div className="mr-0 space-y-6 md:mr-7">
      {/* Charts Grid - 2x1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarChartOverview
          title="Completed Jobs Overview"
          subtitle="Summary of key metrics and insights across all registered companies"
          data={completedJobsData}
          color="#06b6d4"
          filters={["Monthly", "Quarterly"]}
        />
        <ChartOverview
          title="Service Request Activity Overview"
          subtitle="Summary of key metrics and insights across all registered companies"
          data={serviceRequestData}
          color="#06b6d4"
          filters={["Daily", "Weekly", "Monthly"]}
        />
      </div>
    </div>
  );
}

// Data Export Tab
function DataExportTab() {
  const [dateRangeFilter, setDateRangeFilter] = useState("Last 7 Days");
  const [aiModuleFilter, setAiModuleFilter] = useState("AI Modules");
  const [statusFilter, setStatusFilter] = useState("All Status");

  return (
    <div className="space-y-6 rounded-2xl bg-[#1D1D41] p-5 mr-0 md:mr-7">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-white">Export Inspection Data</h3>
        <p className="text-xs text-gray-400">
          Select the format and data range for exporting inspection and certification data.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#2a2d4a] bg-[#262651] p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end">
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-300">Date Range</label>
            <select
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] px-4 py-5 text-xs text-white focus:outline-none"
            >
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>All Time</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-300">AI Module</label>
            <select
              value={aiModuleFilter}
              onChange={(e) => setAiModuleFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] px-4 py-5 text-xs text-white focus:outline-none"
            >
              <option>AI Modules</option>
              <option>Structure Analysis</option>
              <option>Paint Analysis</option>
              <option>Ballistic Glass</option>
              <option>Interior Inspection</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-300">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] px-4 py-5 text-xs text-white focus:outline-none"
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Processing</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* CSV Export */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2a2d4a] bg-[#262651] p-6 text-center transition-colors hover:border-cyan-400/30">
          <Image
            src="/provax-dashboard/file-icons/csv.png"
            alt="CSV"
            width={60}
            height={60}
            className="mb-4 h-16 w-16"
          />
          <h4 className="mb-2 text-base font-semibold text-white">CSV Export</h4>

          <hr className="my-2 w-full border-gray-600" />
          <p className="my-1 max-w-50 text-base text-gray-400">
            Structured data in CSV format for analysis
          </p>
        </div>

        {/* PDF Report */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2a2d4a] bg-[#262651] p-6 text-center transition-colors hover:border-cyan-400/30">
          <Image
            src="/provax-dashboard/file-icons/pdf.png"
            alt="PDF"
            width={60}
            height={60}
            className="mb-4 h-16 w-16"
          />
          <h4 className="mb-2 text-base font-semibold text-white">CSV Export</h4>

          <hr className="my-2 w-full border-gray-600" />
          <p className="my-1 max-w-50 text-base text-gray-400">
            Structured data in CSV format for analysis
          </p>
        </div>

        {/* Shareable Link */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2a2d4a] bg-[#262651] p-6 text-center transition-colors hover:border-cyan-400/30">
          <Image
            src="/provax-dashboard/file-icons/share.png"
            alt="Share"
            width={60}
            height={60}
            className="mb-4 h-16 w-16"
          />
          <h4 className="mb-2 text-base font-semibold text-white">CSV Export</h4>

          <hr className="my-2 w-full border-gray-600" />
          <p className="my-1 max-w-50 text-base text-gray-400">
            Structured data in CSV format for analysis
          </p>
        </div>
      </div>
    </div>
  );
}
