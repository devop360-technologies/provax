"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PaymentStatusData {
  name: string;
  value: number;
  color: string;
}

interface PaymentStatusChartProps {
  className?: string;
}

const defaultData: PaymentStatusData[] = [
  { name: "Paid", value: 55, color: "#22C55E" },
  { name: "Pending", value: 25, color: "#FBBF24" },
  { name: "Dispute", value: 10, color: "#F87171" },
  { name: "Failed", value: 10, color: "#9CA3AF" },
];

type FilterType = "This Month" | "This Quarter" | "This Year";

export function PaymentStatusChart({ className }: PaymentStatusChartProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("This Month");
  const filters: FilterType[] = ["This Month", "This Quarter", "This Year"];

  const data = defaultData;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Chart dimensions
  const size = 200;
  const center = size / 2;
  const outerRadius = 85;
  const innerRadius = 55;

  // Calculate arc paths
  let currentAngle = -90;
  const arcs = data.map((item) => {
    const startAngle = currentAngle;
    const sliceAngle = (item.value / total) * 360;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + outerRadius * Math.cos(startRad);
    const y1 = center + outerRadius * Math.sin(startRad);
    const x2 = center + outerRadius * Math.cos(endRad);
    const y2 = center + outerRadius * Math.sin(endRad);

    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    return {
      d: `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`,
      color: item.color,
      name: item.name,
    };
  });

  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Payment Status Distribution</h3>
        <div className="flex gap-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-medium transition-colors",
                activeFilter === filter
                  ? "bg-[#00D1FF] text-white"
                  : "bg-transparent text-gray-400 hover:text-white border border-[#2a2d4a]"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center gap-8">
        {/* Legend */}
        <div className="flex-1 space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="h-3 w-8 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-48 h-48">
            {arcs.map((arc, index) => (
              <path
                key={index}
                d={arc.d}
                fill={arc.color}
                stroke="#1D1D41"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
