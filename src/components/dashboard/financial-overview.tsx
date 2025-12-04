"use client";

import React from "react";
import { BarChartOverview, ChartOverview } from "@/components/dashboard";
import { Card, CardContent } from "@/components/ui/card";

export function FinancialOverview() {
  // sample monthly data
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const certificationData = months.map((m, i) => ({ month: m, value: [12000,18000,15000,22000,20000,26000,24000,28000,30000,32000,34000,42000][i] }));
  const marketplaceData = months.map((m, i) => ({ month: m, value: [8000,12000,14000,16000,19000,21000,23000,25000,27000,29000,31000,36000][i] }));
  const serviceData = months.map((m, i) => ({ month: m, value: [6000,7000,8000,9000,11000,12000,14000,16000,18000,20000,23000,26000][i] }));

  const grossRevenue = months.map((m, i) => ({ month: m, value: [20000,30000,35000,40000,45000,50000,53000,56000,60000,65000,70000,75000][i] }));
  const providerPayouts = months.map((m, i) => ({ month: m, value: [5000,8000,10000,12000,14000,16000,17000,18000,20000,22000,24000,26000][i] }));

  const revenueByCategory = [
    { label: "Certification", value: 45, color: "#60CFFF" },
    { label: "Marketplace", value: 20, color: "#00E08A" },
    { label: "Service", value: 35, color: "#FF6B6B" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChartOverview
          title="Revenue Evolution"
          subtitle="Certification"
          data={[12000,18000,15000,22000,20000,26000,24000,28000,30000,32000,34000,42000]}
          color="#60CFFF"
        />

        <ChartOverview
          title="Revenue Evolution"
          subtitle="Marketplace"
          data={[8000,12000,14000,16000,19000,21000,23000,25000,27000,29000,31000,36000]}
          color="#00E08A"
        />

        <ChartOverview
          title="Revenue Evolution"
          subtitle="Service"
          data={[6000,7000,8000,9000,11000,12000,14000,16000,18000,20000,23000,26000]}
          color="#FF6B6B"
        />

        <Card className="bg-[#1D1D41] border-[#2a2d4a]">
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white text-lg">Revenue by Category</h3>
                <p className="text-xs text-gray-400 mt-1">A detailed view of revenue generated across each category</p>
                <div className="mt-6 space-y-3">
                  {revenueByCategory.map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div style={{ width: 12, height: 12, background: r.color }} className="rounded-full" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">{r.label}</span>
                          <span className="text-sm text-white">{r.value}%</span>
                        </div>
                        <div className="w-full bg-[#23234B] h-2 rounded mt-2">
                          <div className="h-2 rounded" style={{ width: `${r.value}%`, background: r.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                {/* Simple donut */}
                <svg width="140" height="140" viewBox="0 0 42 42" className="mx-auto">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60CFFF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#60CFFF" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {/* background ring */}
                  <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#2a2d4a" strokeWidth="6" />
                  {/* segments */}
                  {(() => {
                    const total = revenueByCategory.reduce((s, x) => s + x.value, 0);
                    let offset = 0;
                    return revenueByCategory.map((seg, i) => {
                      const portion = seg.value / total;
                      const dash = portion * 100;
                      const circle = (
                        <circle
                          key={seg.label}
                          cx="21"
                          cy="21"
                          r="15.9155"
                          fill="transparent"
                          stroke={seg.color}
                          strokeWidth="6"
                          strokeDasharray={`${dash} ${100 - dash}`}
                          strokeDashoffset={-offset}
                          transform="rotate(-90 21 21)"
                        />
                      );
                      offset += dash;
                      return circle;
                    });
                  })()}
                  <text x="21" y="22" textAnchor="middle" fontSize="5" fill="#ffffff">{`${revenueByCategory[0].value}%`}</text>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <BarChartOverview
          title="Monthly Performance"
          subtitle="Gross Revenue"
          data={grossRevenue}
          color="#60CFFF"
        />

        <BarChartOverview
          title="Monthly Performance"
          subtitle="Provider Payouts"
          data={providerPayouts}
          color="#00E08A"
        />
      </div>
    </div>
  );
}

export default FinancialOverview;
