"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import TransactionDetailsModal from "./transaction-details-modal";
import { TABLE_CLASSES } from "@/lib/table-utils";

export interface Transaction {
  id: string;
  date: string;
  payer: { name: string; avatar: string };
  receiver: string;
  amount: string;
  gateway: string;
  gatewayColor: string;
  status: string;
  statusColor: string;
}

interface TransactionsTableProps {
  transactions?: Transaction[];
}

export function TransactionsTable({ transactions = [] }: TransactionsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState("");

  const handleViewDetails = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  if (transactions.length === 0) {
    return (
      <div className={TABLE_CLASSES.wrapper}>
        <div className="p-8 text-center text-gray-400">No transactions found</div>
      </div>
    );
  }

  return (
    <div className={TABLE_CLASSES.wrapper}>
      <div className={TABLE_CLASSES.overflowContainer}>
        <table className="w-full">
          <thead>
            <tr className={TABLE_CLASSES.header}>
              {["ID", "Date", "Payer", "Receiver", "Amount", "Gateway", "Status", "Action"].map((h) => (
                <th key={h} className={TABLE_CLASSES.headerCell}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className={TABLE_CLASSES.row}>
                <td className={TABLE_CLASSES.cellMedium}>{t.id}</td>
                <td className={TABLE_CLASSES.cell}>{t.date}</td>
                <td className={TABLE_CLASSES.cell}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm">{t.payer.avatar}</div>
                    <span>{t.payer.name}</span>
                  </div>
                </td>
                <td className={TABLE_CLASSES.cell}>{t.receiver}</td>
                <td className={TABLE_CLASSES.cellMedium}>{t.amount}</td>
                <td className={TABLE_CLASSES.cell}>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${t.gatewayColor}`}>{t.gateway}</span>
                </td>
                <td className={TABLE_CLASSES.cell}>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${t.statusColor}`}>{t.status}</span>
                </td>
                <td className={TABLE_CLASSES.cell}>
                  <button type="button" onClick={() => handleViewDetails(t.id)} className="text-cyan-400 hover:text-cyan-300 transition-colors p-1 rounded" title="View details">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TransactionDetailsModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedTransactionId(""); }} transactionId={selectedTransactionId} />
    </div>
  );
}

export default TransactionsTable;
