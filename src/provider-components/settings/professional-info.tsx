"use client";

import { Pencil, Plus, Upload, Wrench, Snowflake, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

interface Certification {
  id: string;
  name: string;
  expiry: string;
  status: "Verified" | "Pending" | "Expired";
}

interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  icon: "wrench" | "snowflake" | "cog";
}

interface ProfessionalInfoData {
  businessName: string;
  description: string;
  hourlyRate: string;
  categories: string[];
  certifications: Certification[];
  portfolio: PortfolioItem[];
}

interface ProfessionalInfoProps {
  className?: string;
  data?: ProfessionalInfoData;
  onEditInfo?: () => void;
  onSaveChanges?: () => void;
  onAddCertification?: () => void;
  onUploadMedia?: () => void;
}

const defaultData: ProfessionalInfoData = {
  businessName: "AutoPro Services",
  description:
    "With over 10 years of experience in automotive repair, I specialize in electrical systems, AC repair, and brake services. Certified ASE Master Technician with a focus on quality work and customer satisfaction. I use only high-quality parts and provide detailed explanations of all work performed.",
  hourlyRate: "85",
  categories: [
    "Engine Repair",
    "Brake Systems",
    "AC & Heating",
    "Electrical",
    "Suspension",
    "Transmission",
    "Diagnostics",
    "Maintenance",
  ],
  certifications: [
    { id: "1", name: "ASE Master Technician Certification", expiry: "Expires: 12/2025", status: "Verified" },
    { id: "2", name: "State Contractor License #CT12345", expiry: "Expires: 08/2024", status: "Verified" },
    { id: "3", name: "EPA 609 Certification", expiry: "Expires: 06/2026", status: "Verified" },
  ],
  portfolio: [
    { id: "1", title: "Complete Engine Rebuild", subtitle: "Toyota Camry 2018", icon: "wrench" },
    { id: "2", title: "AC System Overhaul", subtitle: "Honda Accord 2020", icon: "snowflake" },
    { id: "3", title: "Transmission Repair", subtitle: "Ford F-150 2019", icon: "cog" },
  ],
};

const IconComponent = ({ icon }: { icon: PortfolioItem["icon"] }) => {
  const iconMap = {
    wrench: Wrench,
    snowflake: Snowflake,
    cog: Cog,
  };
  const Icon = iconMap[icon];
  return <Icon className="w-8 h-8 text-[#00D1FF]" />;
};

const certStatusStyles: Record<Certification["status"], string> = {
  Verified: "text-[#22C55E]",
  Pending: "text-[#FBBF24]",
  Expired: "text-[#F87171]",
};

export function ProfessionalInfo({
  className,
  data = defaultData,
  onEditInfo,
  onSaveChanges,
  onAddCertification,
  onUploadMedia,
}: ProfessionalInfoProps) {
  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-white">Professional Information</h2>
        <button
          onClick={onEditInfo}
          className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          <Pencil size={16} />
          Edit Info
        </button>
      </div>

      {/* Business Name */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Business Name</label>
        <div className="rounded-lg bg-[#2a2d4a] px-4 py-3 text-sm text-white">
          {data.businessName}
        </div>
      </div>

      {/* Professional Description */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Professional Description</label>
        <div className="rounded-lg bg-[#2a2d4a] px-4 py-3 text-sm text-gray-300 leading-relaxed">
          {data.description}
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Hourly Rate ($)</label>
        <div className="rounded-lg bg-[#2a2d4a] px-4 py-3 text-sm text-white w-32">
          {data.hourlyRate}
        </div>
      </div>

      {/* Categories of Work */}
      <div className="mb-8">
        <label className="block text-sm text-gray-400 mb-2">Categories of Work</label>
        <p className="text-xs text-gray-500 mb-3">Select the service categories you specialize in:</p>
        <div className="flex flex-wrap gap-2">
          {data.categories.map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg border border-[#00D1FF] bg-transparent px-4 py-2 text-sm font-medium text-[#00D1FF]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <label className="block text-sm text-gray-400 mb-4">Categories of Work</label>
        <div className="space-y-3">
          {data.certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between rounded-xl border border-[#2a2d4a] bg-[#1D1D41]/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#00D1FF] flex items-center justify-center">
                  <span className="text-[#00D1FF] text-xs font-bold">C</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#00D1FF]">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.expiry}</p>
                </div>
              </div>
              <span className={cn("text-sm font-medium", certStatusStyles[cert.status])}>
                {cert.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onAddCertification}
          className="mt-4 flex items-center gap-2 rounded-lg border border-[#00D1FF] bg-transparent px-4 py-2 text-sm font-medium text-[#00D1FF] hover:bg-[#00D1FF]/10 transition-colors"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {/* Portfolio */}
      <div className="mb-8">
        <label className="block text-sm text-gray-400 mb-2">Portfolio</label>
        <p className="text-xs text-gray-500 mb-4">Showcase your best work with photos and descriptions:</p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {data.portfolio.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#00D1FF] flex items-center justify-center mb-3">
                <IconComponent icon={item.icon} />
              </div>
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Upload Area */}
        <div
          onClick={onUploadMedia}
          className="border-2 border-dashed border-[#2a2d4a] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#00D1FF] transition-colors"
        >
          <Upload className="w-10 h-10 text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">Click to upload project media</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={onSaveChanges}
          className="rounded-lg bg-[#3B82F6] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
