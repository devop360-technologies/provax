import { X } from "lucide-react";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transactionId
}: TransactionDetailsModalProps) {
  if (!isOpen) return null;

  // Mock data - in a real app, this would fetch transaction details based on transactionId
  const getTransactionDetails = (id: string) => {
    const details = {
      "#TX-7845": {
        payer: { name: "John Smith", email: "john.smith@example.com", userId: "USR-784523" },
        gateway: "Stripe",
        paymentTransactionId: "ch_7845abc123",
        status: "Completed",
        receiver: { business: "ABC Services", contact: "Robert Johnson", providerId: "PRV-784587" },
        splitRules: { platformFee: "10% ($24.50)", providerShare: "90% ($220.50)", tax: "$0.00" },
        workflow: { id: "WF-784556", type: "Service Payment", initiated: "2023-10-15 14:30:22" },
        financial: { grossAmount: "$245.00", fees: "$24.50", tax: "$0.00", netReleased: "$220.50" }
      },
      "#TX-7844": {
        payer: { name: "Sarah Johnson", email: "sarah.johnson@example.com", userId: "USR-784524" },
        gateway: "Mercado Pago",
        paymentTransactionId: "mp_7844def456", 
        status: "Completed",
        receiver: { business: "Tech Solutions Inc.", contact: "Michael Lee", providerId: "PRV-784588" },
        splitRules: { platformFee: "10% ($120.00)", providerShare: "90% ($1080.00)", tax: "$0.00" },
        workflow: { id: "WF-784557", type: "Service Payment", initiated: "2023-10-14 16:45:10" },
        financial: { grossAmount: "$1,200.00", fees: "$120.00", tax: "$0.00", netReleased: "$1,080.00" }
      }
    };
    return details[id as keyof typeof details] || details["#TX-7845"];
  };

  const transaction = getTransactionDetails(transactionId);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1D1D41] rounded-xl p-6 w-full max-w-xl mx-4 max-h-[85vh]  border border-[#301e78]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            Transaction Details - {transactionId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Grid - 2x3 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-2">

          {/* Payer Information */}
          <div className="bg-[#252850] rounded-lg p-4 border border-[#404466]">
            <h3 className="text-sm font-medium text-white mb-3">Payer Information</h3>
            <div className="space-y-2">
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Name:</span>
                <p className="text-white text-sm">{transaction.payer.name}</p>
              </div>
              <div  className="flex gap-1">
                <span className="text-gray-400 text-xs">Email:</span>
                <p className="text-white text-sm">{transaction.payer.email}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">User ID:</span>
                <p className="text-white text-sm">{transaction.payer.userId}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-[#252850] rounded-lg p-4 border border-[#404466]">
            <h3 className="text-sm font-medium text-white mb-3">Payment Information</h3>
            <div className="space-y-2">
              <div  className="flex gap-1">
                <span className="text-gray-400 text-xs">Gateway:</span>
                <p className="text-white text-sm">{transaction.gateway}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Transaction ID:</span>
                <p className="text-white text-sm">{transaction.paymentTransactionId}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Status:</span>
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-500 text-white ml-1">
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          {/* Receiver Information */}
          <div className="bg-[#252850] rounded-lg p-4 border border-[#404466]">
            <h3 className="text-sm font-medium text-white mb-3">Receiver Information</h3>
            <div className="space-y-2">
              <div  className="flex gap-1">
                <span className="text-gray-400 text-xs">Business:</span>
                <p className="text-white text-sm">{transaction.receiver.business}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Contact:</span>
                <p className="text-white text-sm">{transaction.receiver.contact}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Provider ID:</span>
                <p className="text-white text-sm">{transaction.receiver.providerId}</p>
              </div>
            </div>
          </div>

          {/* Split Rules */}
          <div className="bg-[#252850] rounded-lg p-4 border border-[#404466]">
            <h3 className="text-sm font-medium text-white mb-3">Split Rules</h3>
            <div className="space-y-2">
              <div  className="flex gap-1">
                <span className="text-gray-400 text-xs">Platform Fee:</span>
                <p className="text-white text-sm">{transaction.splitRules.platformFee}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Provider Share:</span>
                <p className="text-white text-sm">{transaction.splitRules.providerShare}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Tax:</span>
                <p className="text-white text-sm">{transaction.splitRules.tax}</p>
              </div>
            </div>
          </div>

          {/* Workflow Details */}
          <div className="bg-[#252850] rounded-lg p-4 border border-[#404466]">
            <h3 className="text-sm font-medium text-white mb-3">Workflow Details</h3>
            <div className="space-y-2">
              <div  className="flex gap-1">
                <span className="text-gray-400 text-xs">Workflow ID:</span>
                <p className="text-white text-sm">{transaction.workflow.id}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Type:</span>
                <p className="text-white text-sm">{transaction.workflow.type}</p>
              </div>
              <div className="flex gap-1"   >
                <span className="text-gray-400 text-xs">Initiated:</span>
                <p className="text-white text-sm">{transaction.workflow.initiated}</p>
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-[#252850] rounded-lg p-4 border border-[#404466]">
            <h3 className="text-sm font-medium text-white mb-3">Financial Breakdown</h3>
            <div className="space-y-2">
              <div  className="flex gap-1">
                <span className="text-gray-400 text-xs">Gross Amount:</span>
                <p className="text-white text-sm">{transaction.financial.grossAmount}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Fees:</span>
                <p className="text-white text-sm">{transaction.financial.fees}</p>
              </div>
              <div className="flex gap-1"   >
                <span className="text-gray-400 text-xs">Tax:</span>
                <p className="text-white text-sm">{transaction.financial.tax}</p>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-400 text-xs">Net Released:</span>
                <p className="text-white text-sm font-semibold">{transaction.financial.netReleased}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4 border-t border-[#404466]">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            Print Receipt
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}