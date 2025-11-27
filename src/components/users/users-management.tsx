"use client";

import { useState } from "react";
import Image from "next/image";
import { EnhancedUserTable } from "@/components/users/enhanced-user-table";
import { EditUserModal } from "@/components/users/edit-user-modal";
import { User } from "@/types/user";

interface UsersManagementProps {
  users: User[];
}

type Tab = "list" | "detail" | "audit";

export function UsersManagement({ users }: UsersManagementProps) {
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
      <div className="border-b border-[#2a2d4a]">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-2 pb-4 font-medium transition-colors ${
              activeTab === "list"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            User List
          </button>
          <button
            onClick={() => setActiveTab("detail")}
            className={`px-2 pb-4 font-medium transition-colors ${
              activeTab === "detail"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            User Detail
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-2 pb-4 font-medium transition-colors ${
              activeTab === "audit"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Audit Log
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "list" && <UserListTab users={users} onViewUser={handleViewUser} />}
        {activeTab === "detail" && (
          <UserDetailTab user={selectedUser || users[0]} onEditClick={handleEditClick} />
        )}
        {activeTab === "audit" && <AuditLogTab />}
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

// User List Tab
function UserListTab({ users, onViewUser }: { users: User[]; onViewUser: (user: User) => void }) {
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [segmentFilter, setSegmentFilter] = useState("All Segments");
  const [verificationFilter, setVerificationFilter] = useState("All Status");

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-2xl border border-[#2a2d4a] bg-[#1D1D41] p-4 mr-6">
        <div className="flex justify-between">
          <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-[11px] text-gray-100">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-6 py-4 text-[11px] text-white"
              >
                <option>All Roles</option>
                <option>Inspector</option>
                <option>Buyer</option>
                <option>Seller</option>
                <option>Provider</option>
                <option>Workshop</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] text-gray-100">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-6 py-4 text-[11px] text-white"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] text-gray-100">Segments</label>
              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-6 py-4 text-[11px] text-white"
              >
                <option>All Segments</option>
                <option>Premium</option>
                <option>Standard</option>
                <option>Basic</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] text-gray-100">Verification</label>
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value)}
                className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-6 py-4 text-[11px] text-white"
              >
                <option>All Status</option>
                <option>Verified</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-5 py-4 text-[11px] text-cyan-400 transition-colors hover:bg-cyan-500/30">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <EnhancedUserTable users={users} onViewUser={onViewUser} />
    </div>
  );
}

// User Detail Tab
function UserDetailTab({ user, onEditClick }: { user: User; onEditClick: () => void }) {
  const [activeDetailTab, setActiveDetailTab] = useState("Personal Info");
  const userRole = "Inspector";
  const userSegment = "Premium";

  const detailTabs = [
    "Personal Info",
    "Contact Info",
    "Verification",
    "Certifications",
    "Activity History",
    "Reviews",
    "Internal Notes",
    "Flags",
    "Audit Trail"
  ];

  return (
    <div className="space-y-6">
      {/* User Header */}
      <div className="rounded-xl border border-[#2a2d4a] bg-[#252850] p-6 mr-0 md:mr-6">
        <div className="mb-6 flex items-center gap-6">
          <Image
            src={user.image || "https://via.placeholder.com/100"}
            alt={user.name || "User"}
            width={90}
            height={90}
            className="rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="mt-1 text-[12px] text-gray-400">
              {userRole} • {userSegment} • Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2 flex gap-2">
              <span className="rounded border border-green-500/50 bg-green-500/20 px-2 py-1 text-xs text-green-400">
                Active
              </span>
              <span className="rounded border border-green-500/50 bg-green-500/20 px-2 py-1 text-xs text-green-400">
                Verified
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onEditClick}
              className="rounded-lg bg-[#1a1d3a] px-4 py-2 text-sm text-white transition-colors hover:bg-[#239bc6]"
            >
              Edited User
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#1a1d3a] px-4 py-2 text-sm text-white transition-colors hover:bg-[#239bc6]"
            >
              Reset Access PW
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#1a1d3a] px-4 py-2 text-sm text-white transition-colors hover:bg-[#239bc6]"
            >
              Add Notes
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#1a1d3a] px-4 py-2 text-sm text-white transition-colors hover:bg-[#239bc6]"
            >
              Add Flag
            </button>
            <button
              type="button"
              className="rounded-lg border border-red-500/50 bg-red-500/20 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/30"
            >
              Deactive
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
        {activeDetailTab === "Personal Info" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Personal Details</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Full Name:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{user.name}</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Date Of Birth:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">1985-03-15</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Gender:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Male</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Nationality:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">American</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Account Information</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">User ID:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">#USR-001</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Role:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{userRole}</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Status:</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Active</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Verification:</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Verified</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Segment:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{userSegment}</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Join Date:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeDetailTab === "Contact Info" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Contact Information</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Email:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{user.email}</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Phone:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">+1 (555) 123-4567</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Address:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">123 Main St, Anytown, USA</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Emergency Contact</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Name:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Jane Smith</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Relationship:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Spouse</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Phone:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">+1 (555) 987-6543</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeDetailTab === "Verification" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Contact Information</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Status:</td>
                    <td className="px-6 py-4 text-sm font-medium text-right">
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Verified</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Document Type:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Driver's License</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Document Number:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">DL-789456123</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Verified On:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">2023-05-20</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Expiry Date:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">2028-05-20</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Address Verification</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Status:</td>
                    <td className="px-6 py-4 text-sm font-medium text-right">
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Verified</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Document Type:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Utility Bill</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Verified On:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">2023-05-22</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Payment Method Verification</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Status:</td>
                    <td className="px-6 py-4 text-sm font-medium text-right">
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Verified</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Payment Method:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Driver's License</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Verified On:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">2023-05-25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeDetailTab === "Certifications" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Certification Summary</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Total Certifications:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">142</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Certification Level:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Senior Inspector</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Certification Date:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">2023-05-20</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Expiry Date:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">2024-05-20</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Renewal Status:</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Recent Certifications Performed</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-white">#CERT-4582 - Toyota Camry 2022</p>
                  <p className="text-xs text-gray-300">Certified on 2023-10-15 • Status:</p>
                  <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Approved</span>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-white">#CERT-4581 - Honda Civic 2021</p>
                  <p className="text-xs text-gray-300">Certified on 2023-10-14 • Status:</p>
                  <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Approved</span>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-white">#CERT-4579 - Ford F-150 2020</p>
                  <p className="text-xs text-gray-300">Certified on 2023-10-12 • Status:</p>
                  <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Approved</span>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-medium text-white">#CERT-4575 - BMW X5 2023</p>
                  <p className="text-xs text-gray-300">Certified on 2023-10-10 • Status:</p>
                  <span className="rounded bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">Under Review</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDetailTab === "Activity History" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Bidding History</h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">#BID-8921 - Vehicle Listing #VL-4587</p>
                      <p className="text-xs text-gray-300 mt-1">Bid: $12,500 • Date: 2023-10-12 • Status:</p>
                    </div>
                    <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Won</span>
                  </div>
                </div>
                <div className="border-l-4 border-gray-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">#BID-8915 - Vehicle Listing #VL-4521</p>
                      <p className="text-xs text-gray-300 mt-1">Bid: $8,750 • Date: 2023-10-05 • Status:</p>
                    </div>
                    <span className="rounded bg-gray-500/20 px-2 py-1 text-xs text-gray-400">Lost</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">#BID-8902 - Vehicle Listing #VL-4458</p>
                      <p className="text-xs text-gray-300 mt-1">Bid: $10,200 • Date: 2023-09-28 • Status:</p>
                    </div>
                    <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Won</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Service Work History</h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">#SVC-8921 - Vehicle Inspection</p>
                      <p className="text-xs text-gray-300 mt-1">Completed on 2023-10-14 • Payment: $150</p>
                    </div>
                    <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Approved</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">#SVC-8915 - Diagnostic Service</p>
                      <p className="text-xs text-gray-300 mt-1">Completed on 2023-10-07 • Payment: $85</p>
                    </div>
                    <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Approved</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">#SVC-8902 - Certification Renewal</p>
                      <p className="text-xs text-gray-300 mt-1">Completed on 2023-09-30 • Payment: $200</p>
                    </div>
                    <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDetailTab === "Reviews" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Rating Summary</h3>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">Average Rating:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white text-right">4.8/5.0</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Total Reviews:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white text-right">127</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-400">5-Star Reviews:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white text-right">98</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-400">Response Rate:</td>
                    <td className="px-6 py-4 text-sm font-medium text-white text-right">92%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Recent Reviews</h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="border-l-4 border-yellow-400 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">"John provided excellent service. Very thorough inspection and detailed report."</p>
                  <p className="text-xs text-gray-400 mt-2">From User #USR-2045 on 2023-10-15</p>
                </div>
                <div className="border-l-4 border-yellow-400 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">"Good service but was 15 minutes late to the appointment."</p>
                  <p className="text-xs text-gray-400 mt-2">From User #USR-1987 on 2023-10-12</p>
                </div>
                <div className="border-l-4 border-yellow-400 rounded-lg bg-[#252850] p-4 pl-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-yellow-400 text-sm">★★★★★</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">"Exceptional attention to detail. Found issues that others missed."</p>
                  <p className="text-xs text-gray-400 mt-2">From User #USR-2156 on 2023-10-10</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDetailTab === "Internal Notes" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Internal Notes</h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <p className="text-sm text-gray-300 leading-relaxed">User reported issue with certification upload. Technical team contacted to resolve.</p>
                  <p className="text-xs text-gray-400 mt-2">Added by Admin User on 2023-10-12 14:30</p>
                </div>
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <p className="text-sm text-gray-300 leading-relaxed">User upgraded to Premium segment after completing 100 certifications.</p>
                  <p className="text-xs text-gray-400 mt-2">Added by Admin User on 2023-09-28 10:15</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
              <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
                <h3 className="font-semibold text-white">Support Notes</h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <p className="text-sm text-gray-300 leading-relaxed">User contacted support regarding payment issue. Issue resolved and user notified.</p>
                  <p className="text-xs text-gray-400 mt-2">Added by Support Team on 2023-08-15 16:20</p>
                </div>
                <div className="border-l-4 border-green-500 rounded-lg bg-[#252850] p-4 pl-4">
                  <p className="text-sm text-gray-300 leading-relaxed">Initial verification completed. All documents approved.</p>
                  <p className="text-xs text-gray-400 mt-2">Added by System Admin on 2023-05-20 16:45</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDetailTab === "Flags" && (
          <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
            <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
              <h3 className="font-semibold text-white">User Flags</h3>
            </div>
            <div className="space-y-3 p-6">
              <div className="rounded-lg border-l-4 border-l-orange-500 bg-yellow-500/10 p-4">
                <p className="font-medium text-yellow-300">Multiple Failed Login Attempts</p>
                <p className="text-sm text-yellow-200 mt-1">3 failed login attempts detected on 2023-10-05. User reset password successfully.</p>
                <p className="text-xs text-yellow-300 mt-2">Flagged by System on 2023-10-05 09:22</p>
              </div>
              <div className="rounded-lg border-l-4 border-l-orange-500 bg-yellow-500/10 p-4">
                <p className="font-medium text-yellow-300">Document Expiry Warning</p>
                <p className="text-sm text-yellow-200 mt-1">Driver's license expiring in 30 days. Notification sent to user.</p>
                <p className="text-xs text-yellow-300 mt-2">Flagged by System on 2023-09-15 14:10</p>
              </div>
              <div className="rounded-lg border-l-4 border-l-orange-500 bg-yellow-500/10 p-4">
                <p className="font-medium text-yellow-300">Unusual Activity</p>
                <p className="text-sm text-yellow-200 mt-1">User logged in from new device (iPhone 14, New York). Verified by user.</p>
                <p className="text-xs text-yellow-300 mt-2">Flagged by System on 2023-08-22 11:05</p>
              </div>
            </div>
          </div>
        )}

        {activeDetailTab === "Audit Trail" && (
          <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] overflow-hidden">
            <div className="border-b border-[#2a2d4a] bg-[#252850] px-6 py-4">
              <h3 className="font-semibold text-white">User Audit Trail</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-10-12 14:30</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Internal note added by Admin User</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-10-05 09:22</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Security flag added by System</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-09-28 10:15</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">User segment changed to Premium by Admin User</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-09-15 14:10</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Document expiry flag added by System</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-08-22 11:05</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Unusual activity flag added by System</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-08-15 16:20</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Internal note added by Support Team</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-05-25 14:30</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Payment method verified by System</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a] bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-05-22 11:15</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Address verified by System Admin</td>
                  </tr>
                  <tr className="border-b border-[#2a2d4a]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-05-20 16:45</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">Account verified by System Admin</td>
                  </tr>
                  <tr className="bg-[#252850]">
                    <td className="px-6 py-4 text-sm text-gray-300">2023-05-15 09:30</td>
                    <td className="px-6 py-4 text-sm text-gray-300 text-right">User registered by System</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
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
      <div className="rounded-xl border border-[#2a2d4a] bg-[#1a1d3a] p-6">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-gray-400">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2 text-white"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-400">Admin</label>
            <select
              value={adminFilter}
              onChange={(e) => setAdminFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2 text-white"
            >
              <option>All User</option>
              <option>Admin User</option>
              <option>System Admin</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-400">Action Type</label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full rounded-lg border border-[#2a2d4a] bg-[#252850] px-4 py-2 text-white"
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
          <button className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-6 py-2 text-cyan-400 transition-colors hover:bg-cyan-500/30">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#252850]">
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
