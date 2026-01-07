import React, { useState } from "react";
import { Play, Pause, X } from "lucide-react";
import SuspendSubscriptionModal from "./suspend-subscription-modal";
import DeleteSubscriptionModal from "./delete-subscription-modal";
import { TABLE_CLASSES } from "@/lib/table-utils";

interface SubscriptionData {
  provider: string;
  plan: string;
  status: string;
  renewalDate: string;
  paymentStatus: string;
}

const subscriptionData: SubscriptionData[] = [
  { provider: "#TX-7845", plan: "Professional", status: "Active", renewalDate: "2023-11-15", paymentStatus: "Paid" },
  { provider: "#TX-7844", plan: "Enterprise", status: "Active", renewalDate: "2023-11-20", paymentStatus: "Paid" },
  { provider: "#TX-7843", plan: "Basic", status: "Suspended", renewalDate: "2023-10-25", paymentStatus: "Failed" },
  { provider: "#TX-7842", plan: "Professional", status: "Active", renewalDate: "2023-11-05", paymentStatus: "Paid" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Suspended: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const PLAN_STYLES: Record<string, string> = {
  Professional: "bg-blue-500 text-white",
  Enterprise: "bg-green-500 text-white",
  Basic: "bg-gray-500 text-white",
};

const PAYMENT_STYLES: Record<string, string> = {
  Paid: "bg-green-500 text-white",
  Failed: "bg-red-500 text-white",
};

const BADGE_BASE = "px-2 py-1 rounded text-xs font-medium";

export default function SubscriptionManagementTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [isSuspending, setIsSuspending] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProviderForDelete, setSelectedProviderForDelete] = useState("");

  const handlePlayPauseClick = (providerId: string, status: string) => {
    setSelectedProvider(providerId);
    setIsSuspending(status === "Active");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (providerId: string) => {
    setSelectedProviderForDelete(providerId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-[#252850] rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Provider Subscription Management</h2>
      <div className={TABLE_CLASSES.overflowContainer}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              {["Provider", "Plan", "Status", "Renewal Date", "Payment Status", "Action"].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-gray-300 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscriptionData.map((sub) => (
              <tr key={sub.provider} className="border-b border-gray-700 hover:bg-[#2a2d4a] transition-colors">
                <td className="py-4 px-4"><span className="text-white font-medium">{sub.provider}</span></td>
                <td className="py-4 px-4">
                  <span className={`${BADGE_BASE} ${PLAN_STYLES[sub.plan] || "bg-gray-500 text-white"}`}>{sub.plan}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`${BADGE_BASE} ${STATUS_STYLES[sub.status] || "bg-gray-100 text-gray-800"}`}>{sub.status}</span>
                </td>
                <td className="py-4 px-4"><span className="text-gray-300">{sub.renewalDate}</span></td>
                <td className="py-4 px-4">
                  <span className={`${BADGE_BASE} ${PAYMENT_STYLES[sub.paymentStatus] || "bg-gray-500 text-white"}`}>{sub.paymentStatus}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handlePlayPauseClick(sub.provider, sub.status)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                      title={sub.status === "Active" ? "Suspend subscription" : "Resume subscription"}
                    >
                      {sub.status === "Active" ? (
                        <Pause className="h-4 w-4 text-gray-400 hover:text-white" />
                      ) : (
                        <Play className="h-4 w-4 text-gray-400 hover:text-white" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(sub.provider)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                      title="Delete subscription"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SuspendSubscriptionModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedProvider(""); }} providerId={selectedProvider} isSuspending={isSuspending} />
      <DeleteSubscriptionModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedProviderForDelete(""); }} providerId={selectedProviderForDelete} />
    </div>
  );
}
