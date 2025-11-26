"use client";

import { BarChart3, TrendingUp, Users, MouseClick } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Marketing Dashboard</h1>
        <p className="text-gray-400 mt-1">Campaign performance and analytics</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Total Campaigns</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Total Impressions</p>
              <p className="text-2xl font-bold text-blue-400">234.5K</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Click-Through Rate</p>
              <p className="text-2xl font-bold text-green-400">8.5%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">ROI</p>
              <p className="text-2xl font-bold text-purple-400">245%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <CardTitle className="text-white">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Summer Sale", impressions: 45000, clicks: 3240, conversions: 324, status: "active" },
              { name: "New Feature Launch", impressions: 32000, clicks: 2560, conversions: 256, status: "active" },
              { name: "Loyalty Program", impressions: 28000, clicks: 2100, conversions: 210, status: "paused" },
              { name: "Referral Bonus", impressions: 19500, clicks: 1560, conversions: 156, status: "active" },
            ].map((campaign) => (
              <div key={campaign.name} className="bg-[#1a1d3a] border border-[#2a2d4a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{campaign.name}</h3>
                    <p className="text-gray-400 text-sm">Status: {campaign.status}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Impressions</p>
                    <p className="text-white font-semibold">{(campaign.impressions / 1000).toFixed(1)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Clicks</p>
                    <p className="text-blue-400 font-semibold">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Conversions</p>
                    <p className="text-green-400 font-semibold">{campaign.conversions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
