"use client";

import { BarChart3, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FinancialPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Financial Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage revenue, expenses, and financial reports</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-400">$124,530</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +12% from last month
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Expenses</p>
                <p className="text-3xl font-bold text-red-400">$45,320</p>
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +5% from last month
                </p>
              </div>
              <Wallet className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Net Profit</p>
                <p className="text-3xl font-bold text-blue-400">$79,210</p>
                <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +18% from last month
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <CardTitle className="text-white">Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Vehicle Sales", amount: 65000, percentage: 52 },
              { name: "Service Fees", amount: 35200, percentage: 28 },
              { name: "AI Services", amount: 18330, percentage: 15 },
              { name: "Premium Subscriptions", amount: 6000, percentage: 5 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-white font-semibold">${item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#1a1d3a] rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "income", description: "Vehicle Sale - Tesla Model 3", amount: 45000, date: "Today" },
              { type: "expense", description: "Server Maintenance", amount: -500, date: "Yesterday" },
              { type: "income", description: "Service Fee", amount: 2500, date: "2 days ago" },
              { type: "expense", description: "Marketing Campaign", amount: -3000, date: "3 days ago" },
            ].map((txn, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-[#1a1d3a] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    txn.type === "income" ? "bg-green-500/20" : "bg-red-500/20"
                  }`}>
                    {txn.type === "income" ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{txn.description}</p>
                    <p className="text-gray-400 text-xs">{txn.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  txn.type === "income" ? "text-green-400" : "text-red-400"
                }`}>
                  {txn.type === "income" ? "+" : "-"}${Math.abs(txn.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
