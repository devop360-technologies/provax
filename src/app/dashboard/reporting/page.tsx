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
  AIModuleVolumeAreaChart,
} from "@/components/reporting";
import { DashboardTitle } from "@/components/dashboard-title";
import {
  Award,
  Store,
  Wrench,
  TrendingUp,
} from "lucide-react";

const reportTabs = [
  { id: "pre-configured", label: "Pre - Configured Reports" },
  { id: "financial", label: "Financial Reports" },
  { id: "ai-module", label: "AI Module Performance" },
];

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState("pre-configured");

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  const handleExportPDF = () => {
    console.log("Export PDF");
  };

  return (
    <div className="space-y-6">
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
      <div className="rounded-lg border border-[#2a2d4a] bg-[#1D1D41] overflow-hidden">
        {/* Tabs */}
        <ReportTabs
          tabs={reportTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Filters */}
        <div className="border-t border-[#2a2d4a] p-6">
          <ReportFilters
            onApplyFilters={() => console.log("Apply filters")}
            onResetFilter={() => console.log("Reset filter")}
          />
        </div>

        {/* Pre-Configured Reports Tab Content */}
        {activeTab === "pre-configured" && (
        <div className="border-t border-[#2a2d4a] p-6 space-y-6">
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
                bars: [
                  {
                    label: "Initial Listings",
                    value: 10328,
                    maxValue: 15000,
                    color: "#00D9FF",
                  },
                  {
                    label: "Active Listings",
                    value: 4762,
                    maxValue: 15000,
                    color: "#00D9FF",
                  },
                  {
                    label: "Listed Items",
                    value: 3228,
                    maxValue: 15000,
                    color: "#00D9FF",
                  },
                  {
                    label: "Unique Web Visits",
                    value: 4949,
                    maxValue: 15000,
                    color: "#00D9FF",
                  },
                ],
              }}
              column2={{
                title: "Service Request → Job Completion",
                bars: [
                  {
                    label: "Service Requests",
                    value: 8141,
                    maxValue: 15000,
                    color: "#3B82F6",
                  },
                  {
                    label: "Accepted Requests",
                    value: 2848,
                    maxValue: 15000,
                    color: "#3B82F6",
                  },
                  {
                    label: "Active Work Orders",
                    value: 4888,
                    maxValue: 15000,
                    color: "#3B82F6",
                  },
                  {
                    label: "Job Completions",
                    value: 4849,
                    maxValue: 15000,
                    color: "#3B82F6",
                  },
                ],
              }}
            />
          </div>

          {/* Export Actions */}
          <div className="flex justify-end">
            <ReportingActions
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
            />
          </div>

          {/* Volume Details Table */}
          <VolumeDetailsTable />
        </div>
        )}

        {/* Financial Reports Tab */}
        {activeTab === "financial" && (
          <div className="space-y-6 p-6 border-t border-[#2a2d4a]">
            {/* Revenue Overview Charts */}
            <div className="grid grid-cols-2 gap-6">
              <RevenueOverviewChart
                title="Revenue Overview"
                dataLabel="Total Revenue"
                color="cyan"
              />
              <RevenueOverviewChart
                title="Revenue Overview"
                dataLabel="Provider Payouts"
                color="green"
              />
            </div>

            {/* Revenue by Category */}
            <RevenueByCategoryChart />

            {/* Provider Payouts Table */}
            <ProviderPayoutsTable />

            {/* Export Actions */}
            <div className="flex justify-end">
              <ReportingActions
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
              />
            </div>

            {/* Revenue Analytics Table */}
            <RevenueAnalyticsTable />
          </div>
        )}

        {/* AI Module Performance Tab */}
        {activeTab === "ai-module" && (
          <div className="space-y-6 p-6 border-t border-[#2a2d4a]">
            {/* Performance Overview Charts */}
            <div className="grid grid-cols-2 gap-6">
              <AIModulePerformanceChart
                title="AI Module Performance Overview"
                dataLabel="Success Rate (%)"
                color="green"
              />
              <AIModulePerformanceChart
                title="AI Module Performance Overview"
                dataLabel="Error Rate (%)"
                color="red"
              />
            </div>

            {/* AI Module Performance Details Table */}
            <AIModulePerformanceDetailsTable />

            {/* Export Actions */}
            <div className="flex justify-end">
              <ReportingActions
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
              />
            </div>

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
