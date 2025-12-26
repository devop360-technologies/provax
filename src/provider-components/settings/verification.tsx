"use client";

import { Pencil, CheckCircle, FileText, Shield, Building, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmittedDocument {
  id: string;
  title: string;
  description: string;
  submittedDate: string;
  status: "Approved" | "Pending" | "Rejected";
  icon: "id" | "insurance" | "license" | "background";
}

interface VerificationData {
  isVerified: boolean;
  verificationMessage: string;
  documents: SubmittedDocument[];
}

interface VerificationProps {
  className?: string;
  data?: VerificationData;
  onEditInfo?: () => void;
  onUploadDocument?: () => void;
}

const defaultData: VerificationData = {
  isVerified: true,
  verificationMessage: "Your account is fully verified. This badge increases client trust and may help you get more jobs.",
  documents: [
    {
      id: "1",
      title: "Government ID",
      description: "Driver's License",
      submittedDate: "Submitted 05/15/2023",
      status: "Approved",
      icon: "id",
    },
    {
      id: "2",
      title: "Proof of Insurance",
      description: "Business Liability Insurance",
      submittedDate: "Submitted 05/16/2023",
      status: "Approved",
      icon: "insurance",
    },
    {
      id: "3",
      title: "Business License",
      description: "City Business Permit",
      submittedDate: "Submitted 05/17/2023",
      status: "Approved",
      icon: "license",
    },
    {
      id: "4",
      title: "Background Check",
      description: "Completed 05/20/2023",
      submittedDate: "",
      status: "Approved",
      icon: "background",
    },
  ],
};

const IconComponent = ({ icon }: { icon: SubmittedDocument["icon"] }) => {
  const iconMap = {
    id: FileText,
    insurance: Shield,
    license: Building,
    background: UserCheck,
  };
  const Icon = iconMap[icon];
  return <Icon className="w-5 h-5 text-[#00D1FF]" />;
};

const statusStyles: Record<SubmittedDocument["status"], string> = {
  Approved: "text-[#22C55E]",
  Pending: "text-[#FBBF24]",
  Rejected: "text-[#F87171]",
};

export function Verification({
  className,
  data = defaultData,
  onEditInfo,
  onUploadDocument,
}: VerificationProps) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-white">Account Verification</h2>
        <button
          onClick={onEditInfo}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          <Pencil size={16} />
          Edit Info
        </button>
      </div>

      {/* Verified Badge */}
      {data.isVerified && (
        <div className="mb-8 rounded-xl border-l-4 border-[#22C55E] bg-[#1D1D41]/50 p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#22C55E] flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Verified Provider</h3>
              <p className="text-sm text-gray-400">{data.verificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Documents */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-white mb-2">Submitted Documents</h3>
        <p className="text-sm text-gray-400 mb-6">
          The following documents have been submitted for verification:
        </p>

        <div className="space-y-3">
          {data.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#1D1D41]/50 px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#00D1FF] flex items-center justify-center">
                  <IconComponent icon={doc.icon} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#00D1FF]">{doc.title}</p>
                  <p className="text-xs text-gray-500">
                    {doc.description}
                    {doc.submittedDate && ` • ${doc.submittedDate}`}
                  </p>
                </div>
              </div>
              <span className={cn("text-sm font-medium", statusStyles[doc.status])}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          onClick={onUploadDocument}
          className="rounded-lg border border-[#3B82F6] bg-transparent px-6 py-2.5 text-sm font-medium text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-colors"
        >
          Upload Additional Document
        </button>
      </div>
    </div>
  );
}
