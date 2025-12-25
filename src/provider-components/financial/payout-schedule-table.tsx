"use client";

import { useState } from "react";
import { Download, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentDetailsModal } from "./payment-details-modal";

interface PayoutItem {
  client: string;
  service: string;
  amount: string;
  deliveryDate: string;
}

interface PaymentDetails {
  paymentId: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  method: string;
  breakdown: {
    name: string;
    amount: string;
  }[];
  total: string;
}

interface PayoutScheduleTableProps {
  className?: string;
  data?: PayoutItem[];
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

const defaultData: PayoutItem[] = [
  {
    client: "Michael Johnson",
    service: "Brake System Repair",
    amount: "$450",
    deliveryDate: "Oct 18, 2023",
  },
  {
    client: "Michael Johnson",
    service: "Oil Change & Filter",
    amount: "$85",
    deliveryDate: "Oct 12, 2023",
  },
  {
    client: "Michael Johnson",
    service: "Windshield Replacement",
    amount: "$320",
    deliveryDate: "Oct 8, 2",
  },
  {
    client: "Michael Johnson",
    service: "Oil Change & Filter",
    amount: "$85",
    deliveryDate: "Oct 12, 2023",
  },
];

export function PayoutScheduleTable({
  className,
  data = defaultData,
  onExportCSV,
  onExportPDF,
}: PayoutScheduleTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (item: PayoutItem) => {
    // Mock payment details - in real app, this would come from an API
    const paymentDetails: PaymentDetails = {
      paymentId: "PAY-00123",
      date: item.deliveryDate,
      amount: item.amount,
      status: "Paid",
      method: "Visa ****4242",
      breakdown: [
        { name: "Brake Pads Replacement", amount: "$180.00" },
        { name: "Brake Rotors Replacement", amount: "$220.00" },
        { name: "Labor Charges", amount: "$50.00" },
      ],
      total: item.amount,
    };
    setSelectedPayment(paymentDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleDownloadReceipt = () => {
    console.log("Download receipt for payment:", selectedPayment?.paymentId);
    // Implement receipt download logic
  };
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Payout Schedule</h3>
        <div className="flex gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-medium text-white hover:bg-[#059669] transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 rounded-lg bg-[#6B7280] px-4 py-2 text-sm font-medium text-white hover:bg-[#4B5563] transition-colors"
          >
            <FileText size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2d4a]">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Clients
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Service
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Delivery Date
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-[#2a2d4a] last:border-b-0"
              >
                <td className="py-4 px-4 text-sm text-white">{item.client}</td>
                <td className="py-4 px-4 text-sm text-gray-300">
                  {item.service}
                </td>
                <td className="py-4 px-4 text-sm font-medium text-white">
                  {item.amount}
                </td>
                <td className="py-4 px-4 text-sm text-gray-300">
                  {item.deliveryDate}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="flex items-center gap-1.5 rounded-full border border-[#2a2d4a] bg-transparent px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-[#2a2d4a] transition-colors"
                    >
                      <Eye size={14} />
                      Details
                    </button>
                    <button
                      onClick={handleDownloadReceipt}
                      className="flex items-center gap-1.5 rounded-full border border-[#2a2d4a] bg-transparent px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-[#2a2d4a] transition-colors"
                    >
                      <Download size={14} />
                      Receipt
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details Modal */}
      <PaymentDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
        onDownloadReceipt={handleDownloadReceipt}
      />
    </div>
  );
}
