'use client';

import { StatCard, ChartOverview, BarChartOverview, RealTimeAlerts } from '@/components/dashboard';

export default function DashboardPage() {
  // Chart data for different metrics
  const certificationActivityData = [45, 52, 48, 61, 55, 67, 72, 68, 74, 71, 69, 75];
  const marketplaceActivityData = [38, 52, 48, 61, 55, 67, 72, 68, 74, 71, 69, 75];
  const serviceRequestData = [35, 48, 52, 58, 62, 70, 72, 68, 71, 75, 78, 80];
  const completedJobsData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 67 },
    { month: 'Jul', value: 72 },
    { month: 'Aug', value: 68 },
    { month: 'Sep', value: 74 },
    { month: 'Oct', value: 71 },
    { month: 'Nov', value: 69 },
    { month: 'Dec', value: 75 },
  ];

  return (
    <div className="pr-6 bg-[#141332] space-y-6">
      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active User"
          value="12,458"
          change="+2.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/users.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Certified Vehicles"
          value="3,742"
          change="+3.5% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/vehicle.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Active Listing"
          value="8,921"
          change="+12.4% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/list.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Active Services"
          value="1,245"
          change="+2.1% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/services.png"
          iconBg="bg-[#64CFF6]"
        />
      </div>

      {/* Second Row Stats - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Subscriptions"
          value="4,587"
          change="+1.3% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/sub.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Total Revenue"
          value="$284,752"
          change="+8.8% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/renvenue.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Escrow Balance"
          value="$87,430"
          change="+3.6% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/balance.png"
          iconBg="bg-[#64CFF6]"
        />
        <StatCard
          title="Pending Disputes"
          value="23"
          change="+1.1% from last month"
          changeType="positive"
          iconSrc="/provax-dashboard/icons/pending.png"
          iconBg="bg-[#64CFF6]"
        />
      </div>

     

      {/* Charts Grid - 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartOverview
          title="Certification Activity Overview"
          subtitle="Summary of key metrics and insights across all registered companies"
          data={certificationActivityData}
          color="#3b82f6"
          filters={['Daily', 'Weekly', 'Monthly']}
        />
        <ChartOverview
          title="Marketplace Listing Activity Overview"
          subtitle="Summary of key metrics and insights across all registered companies"
          data={marketplaceActivityData}
          color="#10b981"
          filters={['Daily', 'Weekly', 'Monthly']}
        />
      </div>

      {/* Charts Grid - 2x1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartOverview
          title="Service Request Activity Overview"
          subtitle="Summary of key metrics and insights across all registered companies"
          data={serviceRequestData}
          color="#06b6d4"
          filters={['Daily', 'Weekly', 'Monthly']}
        />
        <BarChartOverview
          title="Completed Jobs Overview"
          subtitle="Summary of key metrics and insights across all registered companies"
          data={completedJobsData}
          color="#06b6d4"
          filters={['Monthly', 'Quarterly']}
        />
      </div>

       {/* Real-Time Alerts */}
      <RealTimeAlerts />
    </div>
  );
}


