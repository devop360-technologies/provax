"use client";

import { Eye, Crown, Clock, Calendar, Star, CheckCircle, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageItem {
  name: string;
  current: number;
  max: number;
  color: string;
}

interface BenefitItem {
  title: string;
  description: string;
}

interface PlansOverviewProps {
  className?: string;
  planName?: string;
  renewDate?: string;
  isActive?: boolean;
  nextBillingAmount?: string;
  nextBillingDate?: string;
  paymentMethod?: string;
  usage?: UsageItem[];
  benefits?: BenefitItem[];
  onViewDetail?: () => void;
  onViewFullUsage?: () => void;
  onManage?: () => void;
}

const defaultUsage: UsageItem[] = [
  { name: "Certifications", current: 12, max: 25, color: "#FBBF24" },
  { name: "Vehicle Listing", current: 8, max: 15, color: "#22C55E" },
];

const defaultBenefits: BenefitItem[] = [
  { title: "Marketplace Access", description: "Full access to provider marketplace" },
  { title: "50 Certifications", description: "Upload and manage up to 50 certifications" },
  { title: "Priority Support", description: "24/7 priority email and chat support" },
  { title: "Analytics Dashboard", description: "Advanced analytics and reporting tools" },
];

export function PlansOverview({
  className,
  planName = "PROVAX Premium",
  renewDate = "15 Sep 2023",
  isActive = true,
  nextBillingAmount = "$4,999",
  nextBillingDate = "15 Sep 2023",
  paymentMethod = "Visa ending in 4242",
  usage = defaultUsage,
  benefits = defaultBenefits,
  onViewDetail,
  onViewFullUsage,
  onManage,
}: PlansOverviewProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Row - Current Plan & Monthly Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan Card */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 relative">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-sm font-medium text-gray-400">Current Plan</h3>
            <div className="w-12 h-12 rounded-xl bg-[#00D1FF] flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-1">{planName}</h2>
          <p className="text-sm text-gray-400 mb-8">Renews on: {renewDate}</p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={onViewDetail}
              className="flex items-center gap-2 rounded-full border border-[#2a2d4a] bg-[#2a2d4a] px-4 py-2 text-sm font-medium text-white hover:bg-[#374151] transition-colors"
            >
              <Eye size={16} />
              View Detail
            </button>
            {isActive && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E] px-4 py-1.5 text-sm font-medium text-[#22C55E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                Active
              </span>
            )}
          </div>
        </div>

        {/* Monthly Usage Card */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 relative">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-sm font-medium text-gray-400">Monthly Usage</h3>
            <div className="w-12 h-12 rounded-xl bg-[#22C55E] flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {usage.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm text-gray-400">
                    {item.current}/{item.max}
                  </span>
                </div>
                <div className="h-1.5 bg-[#2a2d4a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(item.current / item.max) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onViewFullUsage}
            className="flex items-center gap-2 rounded-full border border-[#2a2d4a] bg-[#2a2d4a] px-4 py-2 text-sm font-medium text-white hover:bg-[#374151] transition-colors"
          >
            <BarChart3 size={16} />
            View Full Usage
          </button>
        </div>
      </div>

      {/* Bottom Row - Next Billing & Platform Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Billing Card */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 relative">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-sm font-medium text-gray-400">Next Billing</h3>
            <div className="w-12 h-12 rounded-xl bg-[#FBBF24] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-1">{nextBillingAmount}</h2>
          <p className="text-sm text-gray-400 mb-8">Due on: {nextBillingDate}</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Payment Method:</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-[#1A1F71] rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <span className="text-sm text-white">{paymentMethod}</span>
              </div>
            </div>
            <button
              onClick={onManage}
              className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Manage
            </button>
          </div>
        </div>

        {/* Platform Benefits Card */}
        <div className="rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6 relative">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-sm font-medium text-gray-400">Platform Benefits</h3>
            <div className="w-12 h-12 rounded-xl bg-[#F472B6] flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">{benefit.title}</p>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
