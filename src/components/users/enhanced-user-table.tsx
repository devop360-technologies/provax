'use client';

import Image from 'next/image';
import { Eye, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, ChangeEvent, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from '@/types/user';
import { cn } from '@/lib/utils';

interface EnhancedUserTableProps {
  users: User[];
  onDelete?: (user: User) => void;
  onViewUser?: (user: User) => void;
}

type UserRole = 'Inspector' | 'Buyer' | 'Seller' | 'Provider' | 'Workshop';
type VerificationStatus = 'Verified' | 'Pending' | 'Inactive';
type AccountStatus = 'Active' | 'Inactive';

const userRoles: UserRole[] = ['Inspector', 'Buyer', 'Seller', 'Provider', 'Workshop'];
const verificationStatuses: VerificationStatus[] = ['Verified', 'Pending', 'Inactive'];
const accountStatuses: AccountStatus[] = ['Active', 'Inactive'];
const segments = ['Premium', 'Standard', 'Basic'];

export function EnhancedUserTable({ users, onDelete, onViewUser }: EnhancedUserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lowercaseSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(lowercaseSearch) ||
        user.email?.toLowerCase().includes(lowercaseSearch)
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getRoleColor = (role: string) => {
    const roleColorMap: Record<string, string> = {
      'Inspector': 'bg-blue-500/20 text-blue-200 border-blue-500/50',
      'Buyer': 'bg-blue-500/20 text-blue-200 border-blue-500/50',
      'Seller': 'bg-gray-500/20 text-gray-200 border-gray-500/50',
      'Provider': 'bg-red-500/20 text-red-200 border-red-500/50',
      'Workshop': 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50',
    };
    return roleColorMap[role] || 'bg-gray-500/20 text-gray-200 border-gray-500/50';
  };

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-500/20 text-green-400 border-green-500/50'
      : 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const getVerificationColor = (status: string) => {
    if (status === 'Verified') return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (status === 'Pending') return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const getUserRole = (index: number): UserRole => {
    return userRoles[index % userRoles.length];
  };

  const getVerificationStatus = (index: number): VerificationStatus => {
    return verificationStatuses[index % verificationStatuses.length];
  };

  const getAccountStatus = (index: number): AccountStatus => {
    return accountStatuses[index % accountStatuses.length];
  };

  const getSegment = (index: number): string => {
    return segments[index % segments.length];
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Card className="bg-[#1D1D41] border-[#2a2d4a] mr-0 md:mr-7 ">
      <CardContent className="p-6 ">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-[#1a1d3a] border-[#2a2d4a] text-white"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1D1D41]">
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">User ID</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Name</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Email</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Role</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Status</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Verification</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Segment</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Join Date</th>
                <th className="px-4 py-4 text-left text-[12px] font-medium text-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => {
                const globalIndex = startIndex + index;
                const role = getUserRole(globalIndex);
                const verification = getVerificationStatus(globalIndex);
                const status = getAccountStatus(globalIndex);
                const segment = getSegment(globalIndex);

                return (
                  <tr key={user.id} className="border-b border-[#2a2d4a] hover:bg-[#1a1d3a]/50 transition-colors">
                    {/* User ID */}
                    <td className="px-4 py-4 text-[12px] text-gray-300">#USR-{String(globalIndex + 1).padStart(3, '0')}</td>

                    {/* Name with Avatar */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {user.image && (
                          <Image
                            src={user.image}
                            alt={user.name || ''}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                        <span className="text-[12px] text-white font-light">{user.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 text-[12px] text-gray-400">{user.email}</td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <span className={cn('px-3 py-1 rounded-sm text-xs font-medium border', getRoleColor(role))}>
                        {role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className={cn('px-3 py-1 rounded-sm text-xs font-medium border', getStatusColor(status))}>
                        {status}
                      </span>
                    </td>

                    {/* Verification */}
                    <td className="px-4 py-4">
                      <span className={cn('px-3 py-1 rounded-sm text-xs font-medium border', getVerificationColor(verification))}>
                        {verification}
                      </span>
                    </td>

                    {/* Segment */}
                    <td className="px-4 py-4 text-[12px] text-gray-300">{segment}</td>

                    {/* Join Date */}
                    <td className="px-4 py-4 text-[12px] text-gray-300">{formatDate(user.createdAt)}</td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <button className=" hover:bg-[#1a1d3a] rounded-lg transition-colors text-gray-400 hover:text-green-400">
                          <span className="text-[11px] bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/50">
                            Reset PW
                          </span>
                        </button>
                        <button className="p-2 hover:bg-[#1a1d3a] rounded-lg transition-colors text-gray-400 hover:text-red-400">
                          <span className="text-[11px] bg-[#FF7D7D] text-white px-2 py-1 rounded border border-red-500/50">
                            Deactive
                          </span>
                        </button>
                        <button 
                          onClick={() => onViewUser?.(user)}
                          className="p-2 hover:bg-[#1a1d3a] rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-[#1a1d3a] rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-[11px] text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
          </div>
          <div className="flex items-center gap-1 text-[12px] ">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="p-1 hover:bg-[#1a1d3a] rounded-lg transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'w-8 h-8 rounded text-[11px] font-medium transition-colors',
                    page === currentPage
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                      : 'text-gray-400 hover:bg-[#1a1d3a]'
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="p-2 hover:bg-[#1a1d3a] rounded-lg transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
