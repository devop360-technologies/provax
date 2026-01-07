"use client";

import {
  Users,
  ShieldCheck,
  Package,
  Briefcase,
  DollarSign,
  Wallet,
  AlertTriangle,
  CreditCard,
  CheckCircle,
  XCircle
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AlertItem } from "@/components/dashboard/alert-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartDisplay, CHART_COLORS, createMonthlyChartData } from "@/components/ui/bar-chart-display";

const CERT_ACTIVITY = createMonthlyChartData([35, 48, 62, 75, 68, 82, 71, 88, 76, 92, 85, 95]);
const MARKETPLACE_ACTIVITY = createMonthlyChartData([42, 55, 68, 72, 65, 78, 85, 92, 88, 95, 90, 98]);
const SERVICE_ACTIVITY = createMonthlyChartData([38, 52, 65, 78, 72, 85, 80, 90, 85, 95, 92, 97]);
const COMPLETED_JOBS = createMonthlyChartData([45, 58, 72, 65, 78, 82, 75, 88, 92, 85, 95, 90]);

export default function DashboardPage() {
  const stats = [
    {
      title: "Active User",
      value: "12,458",
      change: "+2.5% from last month",
      changeType: "positive" as const,
      icon: Users,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20"
    },
    {
      title: "Certified Vehicles",
      value: "3,742",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: ShieldCheck,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20"
    },
    {
      title: "Active Listing",
      value: "8,921",
      change: "+6.5% from last month",
      changeType: "positive" as const,
      icon: Package,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20"
    },
    {
      title: "Active Services",
      value: "1,245",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: Briefcase,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/20"
    },
    {
      title: "Subscriptions",
      value: "4,567",
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: Users,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20"
    },
    {
      title: "Total Revenue",
      value: "$284,752",
      change: "+7.6% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20"
    },
    {
      title: "Escrow Balance",
      value: "$87,430",
      change: "+3% from last month",
      changeType: "positive" as const,
      icon: Wallet,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/20"
    },
    {
      title: "Pending Disputes",
      value: "23",
      change: "+1.5% from last month",
      changeType: "negative" as const,
      icon: AlertTriangle,
      iconColor: "text-red-400",
      iconBg: "bg-red-500/20"
    }
  ];

  const alerts = [
    {
      id: "alert-dispute-6345",
      icon: AlertTriangle,
      iconColor: "text-red-400",
      iconBg: "bg-red-500/20",
      title: "New Dispute Reported",
      description: "A dispute for $4,827.00 for Vehicle #6345 was filed",
      time: "5 min ago"
    },
    {
      id: "alert-payment-4362",
      icon: CreditCard,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/20",
      title: "Failed Payment",
      description: "A payment of $2,349.00 failed for invoice #4362",
      time: "12 min ago"
    },
    {
      id: "alert-cert-error",
      icon: XCircle,
      iconColor: "text-red-400",
      iconBg: "bg-red-500/20",
      title: "AI Certification Error",
      description: "AI failed to certify process encountered an error",
      time: "24 min ago"
    },
    {
      id: "alert-expiring-certs",
      icon: CheckCircle,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      title: "Expiring Certifications",
      description: "5 vehicle certifications will expire right now",
      time: "1 hour ago"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-[#0f1129] min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certification Activity */}
        <ChartCard
          title="Certification Activity Overview"
          subtitle="Currently you have 158 new user certifications compared to last month"
        >
          <BarChartDisplay
            data={CERT_ACTIVITY}
            colorFrom={CHART_COLORS.blue.from}
            colorTo={CHART_COLORS.blue.to}
            overlayColor={CHART_COLORS.blue.overlay}
          />
        </ChartCard>

        {/* Marketplace Listing Activity */}
        <ChartCard
          title="Marketplace Listing Activity Overview"
          subtitle="Currently you have 892 active listing compared to last month"
        >
          <BarChartDisplay
            data={MARKETPLACE_ACTIVITY}
            colorFrom={CHART_COLORS.green.from}
            colorTo={CHART_COLORS.green.to}
            overlayColor={CHART_COLORS.green.overlay}
          />
        </ChartCard>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Request Activity */}
        <ChartCard
          title="Service Request Activity Overview"
          subtitle="Currently you have 342 service requests compared to last month"
        >
          <BarChartDisplay
            data={SERVICE_ACTIVITY}
            colorFrom={CHART_COLORS.indigo.from}
            colorTo={CHART_COLORS.indigo.to}
            overlayColor={CHART_COLORS.indigo.overlay}
          />
        </ChartCard>

        {/* Completed Jobs */}
        <ChartCard
          title="Completed Jobs Overview"
          subtitle="Currently you have 1,245 jobs completed compared to last month"
          filters={["Today", "Monthly"]}
        >
          <BarChartDisplay
            data={COMPLETED_JOBS}
            colorFrom={CHART_COLORS.cyan.from}
            colorTo={CHART_COLORS.cyan.to}
            className="gap-3"
          />
        </ChartCard>
      </div>

      {/* Real-Time Alerts */}
      <Card className="bg-[#1a1d3a] border-[#2a2d4a]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-lg">Real - Time Alerts</CardTitle>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} {...alert} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
