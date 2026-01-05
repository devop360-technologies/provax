"use client";

import { useState } from "react";
import {
  ReportingStatCard,
  ReportTabs,
  ReportFilters,
  VolumeByPeriodChart,
  ConversionFunnelsChart,
  VolumeDetailsTable,
  ReportingActions,
  RevenueOverviewChart,
  RevenueByCategoryChart,
  ProviderPayoutsTable,
  RevenueAnalyticsTable,
  AIModulePerformanceChart,
  AIModulePerformanceDetailsTable,
  AIModuleVolumeAreaChart
} from "@/components/reporting";
import { DashboardTitle } from "@/components/dashboard-title";
import { Award, Store, Wrench, TrendingUp } from "lucide-react";

const reportTabs = [
  { id: "pre-configured", label: "Pre - Configured Reports" },
  { id: "financial", label: "Financial Reports" },
  { id: "ai-module", label: "AI Module Performance" }
];

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState("pre-configured");

  const handleExportCSV = () => {
    // TODO: Implement export CSV functionality
  };

  const handleExportPDF = () => {
    // TODO: Implement export PDF functionality
  };

  return (
    <div className="mr-0 space-y-6 md:mr-7">
      {/* Dashboard Title */}
      <DashboardTitle
        heading="Reporting & Analytics"
        text="Comprehensive reporting dashboard with detailed insights and performance metrics"
      />

      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ReportingStatCard
          title="Total Certifications"
          value="12,458"
          change="1.5% from last month"
          changeType="positive"
          icon={<Award className="size-5 text-white" />}
          iconBg="bg-[#00D9FF]/20"
        />
        <ReportingStatCard
          title="Marketplace Listings"
          value="8,742"
          change="3.2% from last month"
          changeType="positive"
          icon={<Store className="size-5 text-white" />}
          iconBg="bg-[#22C55E]/20"
        />
        <ReportingStatCard
          title="Service Jobs Completed"
          value="5,896"
          change="2.8% from last month"
          changeType="positive"
          icon={<Wrench className="size-5 text-white" />}
          iconBg="bg-[#3B82F6]/20"
        />
        <ReportingStatCard
          title="AI Module Success Rate"
          value="94.7%"
          change="4.1% from last month"
          changeType="positive"
          icon={<TrendingUp className="size-5 text-white" />}
          iconBg="bg-[#F59E0B]/20"
        />
      </div>

      {/* Tabs and Filters Section */}
      <div className="overflow-hidden rounded-lg">
        {/* Tabs */}
        <ReportTabs tabs={reportTabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Filters */}
        <div className="py-6">
          <ReportFilters
            onApplyFilters={() => { /* TODO: Implement apply filters */ }}
            onResetFilter={() => { /* TODO: Implement reset filter */ }}
          />
        </div>

        {/* Pre-Configured Reports Tab Content */}
        {activeTab === "pre-configured" && (
          <div className="space-y-6 border-t border-[#2a2d4a] py-6">
            {/* Top Row - Two Charts */}
            <div className="grid grid-cols-2 gap-6">
              <VolumeByPeriodChart
                title="Volume by Period"
                dataLabel="Certification"
                color="cyan"
              />
              <VolumeByPeriodChart
                title="Volume by Period"
                dataLabel="Marketplace Listing"
                color="green"
              />
            </div>

            {/* Middle Row - Two More Charts */}
            <div className="grid grid-cols-2 gap-6">
              <VolumeByPeriodChart
                title="Volume by Period"
                dataLabel="Marketplace Listing"
                color="green"
              />
              <ConversionFunnelsChart
                title="Conversion Funnels"
                column1={{
                  title: "Certification → Marketplace Listing",
                  steps: [
                    {
                      label: "Certifications Generated",
                      value: 12458
                    },
                    {
                      label: "Listings Created",
                      value: 8742,
                      percentage: 70.2
                    },
                    {
                      label: "Listings Published",
                      value: 7215,
                      percentage: 82.5
                    },
                    {
                      label: "Listings with Sales",
                      value: 4589,
                      percentage: 63.6
                    }
                  ],
                  color: "#00D9FF"
                }}
                column2={{
                  title: "Service Request → Job Completion",
                  steps: [
                    {
                      label: "Service Requests",
                      value: 9874
                    },
                    {
                      label: "Requests Accepted",
                      value: 7542,
                      percentage: 76.4
                    },
                    {
                      label: "Jobs Started",
                      value: 6895,
                      percentage: 91.4
                    },
                    {
                      label: "Jobs Completed",
                      value: 5896,
                      percentage: 85.5
                    }
                  ],
                  color: "#3B82F6"
                }}
                onExportCSV={() => { /* TODO: Implement export CSV */ }}
                onExportPDF={() => { /* TODO: Implement export PDF */ }}
                onComparePeriods={() => { /* TODO: Implement compare periods */ }}
              />
            </div>

            {/* Export Actions */}
            <div className="flex justify-end">
              <ReportingActions onExportCSV={handleExportCSV} onExportPDF={handleExportPDF} />
            </div>

            {/* Volume Details Table */}
            <VolumeDetailsTable />
          </div>
        )}

        {/* Financial Reports Tab */}
        {activeTab === "financial" && (
          <div className="space-y-6 border-t border-[#2a2d4a] py-6">
            {/* Revenue Overview Charts */}
            <div className="grid grid-cols-2 gap-6">
              <RevenueOverviewChart
                title="Revenue Overview"
                dataLabel="Total Revenue"
                color="cyan"
                onExportCSV={() => { /* TODO: Implement export CSV */ }}
                onExportPDF={() => { /* TODO: Implement export PDF */ }}
                onExpand={() => { /* TODO: Implement expand */ }}
              />
              <RevenueOverviewChart
                title="Revenue Overview"
                dataLabel="Provider Payouts"
                color="green"
                onExportCSV={() => { /* TODO: Implement export CSV */ }}
                onExportPDF={() => { /* TODO: Implement export PDF */ }}
                onExpand={() => { /* TODO: Implement expand */ }}
              />
            </div>

            {/* Revenue by Category */}
            <RevenueByCategoryChart
              onExportCSV={() => { /* TODO: Implement export CSV */ }}
              onExportPDF={() => { /* TODO: Implement export PDF */ }}
            />

            {/* Provider Payouts Table */}
            <ProviderPayoutsTable
              onExportCSV={() => { /* TODO: Implement export CSV */ }}
              onExportPDF={() => { /* TODO: Implement export PDF */ }}
              onShowDetails={() => { /* TODO: Implement show details */ }}
            />

            {/* Revenue Analytics Table */}
            <RevenueAnalyticsTable
              onExportCSV={() => { /* TODO: Implement export CSV */ }}
              onExportPDF={() => { /* TODO: Implement export PDF */ }}
              onViewTimeline={() => { /* TODO: Implement view timeline */ }}
            />
          </div>
        )}

        {/* AI Module Performance Tab */}
        {activeTab === "ai-module" && (
          <div className="space-y-6 border-t border-[#2a2d4a] py-6">
            {/* Performance Overview Charts */}
            <div className="grid grid-cols-2 gap-6">
              <AIModulePerformanceChart
                title="AI Module Performance Overview"
                dataLabel="Success Rate (%)"
                color="green"
                onExportCSV={() => { /* TODO: Implement export CSV */ }}
                onExportPDF={() => { /* TODO: Implement export PDF */ }}
                onExpand={() => { /* TODO: Implement expand */ }}
              />
              <AIModulePerformanceChart
                title="AI Module Performance Overview"
                dataLabel="Error Rate (%)"
                color="red"
                onExportCSV={() => { /* TODO: Implement export CSV */ }}
                onExportPDF={() => { /* TODO: Implement export PDF */ }}
                onExpand={() => { /* TODO: Implement expand */ }}
              />
            </div>

            {/* AI Module Performance Details Table */}
            <AIModulePerformanceDetailsTable
              onExportCSV={() => { /* TODO: Implement export CSV */ }}
              onExportPDF={() => { /* TODO: Implement export PDF */ }}
            />

            {/* Volume by Period Charts */}
            {/* Top Row - 2 Charts */}
            <div className="grid grid-cols-2 gap-6">
              <AIModuleVolumeAreaChart
                title="AI Module Volume by Period"
                dataLabel="Structure"
                color="cyan"
              />
              <AIModuleVolumeAreaChart
                title="AI Module Volume by Period"
                dataLabel="Paints"
                color="green"
              />
            </div>

            {/* Bottom Row - 1 Full Width Chart */}
            <div>
              <AIModuleVolumeAreaChart
                title="AI Module Volume by Period"
                dataLabel="Interior"
                color="gold"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
