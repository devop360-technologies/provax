"use client";

import { Download, Filter, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReportingPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reporting Panel</h1>
          <p className="text-gray-400 mt-1">Generate and view detailed reports</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Monthly Revenue", icon: "📊", type: "Financial" },
          { title: "User Analytics", icon: "👥", type: "Analytics" },
          { title: "Service Performance", icon: "⚡", type: "Operations" },
          { title: "Marketing ROI", icon: "📈", type: "Marketing" },
        ].map((report) => (
          <Card key={report.title} className="bg-[#252850] border-[#2a2d4a] hover:border-green-500/30 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <p className="text-3xl mb-2">{report.icon}</p>
              <h3 className="text-white font-semibold">{report.title}</h3>
              <Badge className="mt-2 bg-green-500/20 text-green-400">{report.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Reports</CardTitle>
            <Button variant="outline" size="sm" className="border-[#2a2d4a]">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "November Revenue Report", date: "Nov 30, 2024", size: "2.4 MB", type: "Financial" },
              { name: "Q4 Analytics Summary", date: "Nov 28, 2024", size: "1.8 MB", type: "Analytics" },
              { name: "October Performance", date: "Nov 01, 2024", size: "3.1 MB", type: "Operations" },
              { name: "Marketing Campaign ROI", date: "Oct 25, 2024", size: "1.2 MB", type: "Marketing" },
            ].map((report) => (
              <div key={report.name} className="bg-[#1a1d3a] border border-[#2a2d4a] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <div>
                    <h4 className="text-white font-medium">{report.name}</h4>
                    <p className="text-gray-400 text-sm">{report.date} • {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400">{report.type}</Badge>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
