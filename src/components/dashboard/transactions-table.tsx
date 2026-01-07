"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import TransactionDetailsModal from "./transaction-details-modal";
import { TRANSACTIONS } from "@/data/dashboard-data";

export function TransactionsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState("");

  const handleViewDetails = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId("");
  };

  return (
    <div className="bg-[#1D1D41] rounded-lg border border-[#2a2d4a] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#252850] border-b border-[#2a2d4a]">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Payer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Receiver</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Gateway</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((transaction) => (
              <tr 
                key={transaction.id}
                className="border-b border-[#2a2d4a] hover:bg-[#252850]/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm">
                      {transaction.payer.avatar}
                    </div>
                    <span>{transaction.payer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {transaction.receiver}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${transaction.gatewayColor}`}>
                    {transaction.gateway}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${transaction.statusColor}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleViewDetails(transaction.id)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors p-1 rounded"
                    title="View transaction details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transactionId={selectedTransactionId}
      />
    </div>
  );
}

export default TransactionsTable;