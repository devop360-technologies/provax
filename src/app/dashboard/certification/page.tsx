import { DashboardTitle } from "@/components/dashboard-title";
import { ShieldCheck } from "lucide-react";

export default function CertificationPage() {
  return (
    <div className="p-6">
      <DashboardTitle 
        title="AI Certification"
        description="Manage and view AI certifications"
        icon={ShieldCheck}
      />
      
      <div className="mt-6 bg-[#252850] border border-[#2a2d4a] rounded-lg p-8 text-center">
        <ShieldCheck className="h-16 w-16 mx-auto text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">AI Certification Management</h2>
        <p className="text-gray-400">View and manage all AI certifications here</p>
      </div>
    </div>
  );
}
