"use client";

import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface RevenueByCategory {
  category: string;
  revenue: string;
  share: string;
}

interface RevenueByCategoryChartProps {
  data?: CategoryData[];
  tableData?: RevenueByCategory[];
  className?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

const defaultData: CategoryData[] = [
  { name: "Certification", value: 45, color: "#00D9FF" },
  { name: "Marketplace", value: 32, color: "#22C55E" },
  { name: "Service", value: 23, color: "#F59E0B" },
];

const defaultTableData: RevenueByCategory[] = [
  { category: "Certification", revenue: "$124,000", share: "45%" },
  { category: "Marketplace", revenue: "$87,200", share: "32%" },
  { category: "Service", revenue: "$65,400", share: "23%" },
];

export function RevenueByCategoryChart({
  data = defaultData,
  tableData = defaultTableData,
  className,
  onExportCSV,
  onExportPDF,
}: RevenueByCategoryChartProps) {
  // Calculate angles for pie chart
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  const slices = data.map((item, index) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 100 + 80 * Math.cos(startRad);
    const y1 = 100 + 80 * Math.sin(startRad);
    const x2 = 100 + 80 * Math.cos(endRad);
    const y2 = 100 + 80 * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    return {
      d: `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: item.color,
      name: item.name,
    };
  });

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">Revenue by Category</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1 rounded bg-[#10B981] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#059669] transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-1 rounded bg-[#FF6B6B] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            <FileText size={14} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Donut Chart */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-48 h-48">
            {/* Outer circle */}
            {slices.map((slice) => (
              <path
                key={slice.color}
                d={slice.d}
                fill={slice.color}
                stroke="#1D1D41"
                strokeWidth="2"
              />
            ))}

            {/* Inner white circle for donut effect */}
            <circle cx="100" cy="100" r="50" fill="#1D1D41" />
          </svg>

          {/* Legend */}
          <div className="mt-6 space-y-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div>
          <div className="space-y-3">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-[#404254]">
              <span className="text-xs font-medium text-gray-400">Category</span>
              <span className="text-xs font-medium text-gray-400">Revenue</span>
              <span className="text-xs font-medium text-gray-400">Share</span>
            </div>

            {/* Table Body */}
            {tableData.map((row) => (
              <div key={row.category} className="grid grid-cols-3 gap-4">
                <span className="text-sm text-gray-300">{row.category}</span>
                <span className="text-sm font-medium text-white">
                  {row.revenue}
                </span>
                <span className="text-sm text-gray-300">{row.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
