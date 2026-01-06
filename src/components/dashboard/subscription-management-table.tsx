import React, { useState } from "react";
import { Play, Pause, X } from "lucide-react";
import SuspendSubscriptionModal from "./suspend-subscription-modal";
import DeleteSubscriptionModal from "./delete-subscription-modal";

interface SubscriptionData {
  provider: string;
  plan: string;
  status: string;
  renewalDate: string;
  paymentStatus: string;
}

const subscriptionData: SubscriptionData[] = [
  {
    provider: "#TX-7845",
    plan: "Professional",
    status: "Active",
    renewalDate: "2023-11-15",
    paymentStatus: "Paid"
  },
  {
    provider: "#TX-7844", 
    plan: "Enterprise",
    status: "Active",
    renewalDate: "2023-11-20",
    paymentStatus: "Paid"
  },
  {
    provider: "#TX-7843",
    plan: "Basic", 
    status: "Suspended",
    renewalDate: "2023-10-25",
    paymentStatus: "Failed"
  },
  {
    provider: "#TX-7842",
    plan: "Professional",
    status: "Active", 
    renewalDate: "2023-11-05",
    paymentStatus: "Paid"
  }
];

const getStatusBadge = (status: string) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium";
  
  switch (status) {
    case "Active":
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
    case "Suspended":
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400`;
  }
};

const getPlanBadge = (plan: string) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium";
  
  switch (plan) {
    case "Professional":
      return `${baseClasses} bg-blue-500 text-white`;
    case "Enterprise":
      return `${baseClasses} bg-green-500 text-white`;
    case "Basic":
      return `${baseClasses} bg-gray-500 text-white`;
    default:
      return `${baseClasses} bg-gray-500 text-white`;
  }
};

const getPaymentStatusBadge = (status: string) => {
  const baseClasses = "px-2 py-1 rounded text-xs font-medium";
  
  switch (status) {
    case "Paid":
      return `${baseClasses} bg-green-500 text-white`;
    case "Failed":
      return `${baseClasses} bg-red-500 text-white`;
    default:
      return `${baseClasses} bg-gray-500 text-white`;
  }
};

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvider("");
  };

  const handleDeleteClick = (providerId: string) => {
    setSelectedProviderForDelete(providerId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProviderForDelete("");
  };
  return (
    <div className="bg-[#252850] rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Provider Subscription Management</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Provider</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Plan</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Renewal Date</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Payment Status</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionData.map((subscription) => (
              <tr key={subscription.provider} className="border-b border-gray-700 hover:bg-[#2a2d4a] transition-colors">
                <td className="py-4 px-4">
                  <span className="text-white font-medium">{subscription.provider}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={getPlanBadge(subscription.plan)}>
                    {subscription.plan}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={getStatusBadge(subscription.status)}>
                    {subscription.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{subscription.renewalDate}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={getPaymentStatusBadge(subscription.paymentStatus)}>
                    {subscription.paymentStatus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePlayPauseClick(subscription.provider, subscription.status)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                      title={subscription.status === "Active" ? "Suspend subscription" : "Resume subscription"}
                    >
                      {subscription.status === "Active" ? (
                        <Pause className="h-4 w-4 text-gray-400 hover:text-white" />
                      ) : (
                        <Play className="h-4 w-4 text-gray-400 hover:text-white" />
                      )}
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(subscription.provider)}
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

      {/* Suspend Subscription Modal */}
      <SuspendSubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        providerId={selectedProvider}
        isSuspending={isSuspending}
      />

      {/* Delete Subscription Modal */}
      <DeleteSubscriptionModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        providerId={selectedProviderForDelete}
      />
    </div>
  );
}