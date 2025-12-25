import { StatCard } from "@/components/dashboard";
import {
  RevenueOverviewChart,
  PaymentStatusChart,
  EscrowBalancePanel,
  PayoutScheduleTable,
} from "@/provider-components/financial";

export default function ProviderFinancialPage() {
  return (
    <div className="mr-0 md:mr-6 space-y-6">
      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Earnings"
          value="12,458"
          change="+2.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/inspection.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Available for Payout"
          value="3,742"
          change="+0.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/warning.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="In Escrow"
          value="8,921"
          change="+12.4% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/clock.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Avg. Job Value"
          value="1,245"
          change="+12.4% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/tw.png"
          iconBg="bg-[#64CFF6]"
        />
      </div>

      {/* Revenue Overview & Payment Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueOverviewChart />
        <PaymentStatusChart />
      </div>

      {/* Escrow Balance Panel */}
      <EscrowBalancePanel />

      {/* Payout Schedule Table */}
      <PayoutScheduleTable />
    </div>
  );
}
