"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RevenueDataPoint {
  week: string;
  value: number;
}

interface RevenueOverviewChartProps {
  className?: string;
}

const defaultData: RevenueDataPoint[] = [
  { week: "Week 1", value: 1800 },
  { week: "", value: 1950 },
  { week: "Week 2", value: 2150 },
  { week: "", value: 2300 },
  { week: "", value: 2200 },
  { week: "Week 3", value: 1850 },
  { week: "", value: 1350 },
  { week: "", value: 1650 },
  { week: "", value: 2050 },
  { week: "Week 4", value: 2250 },
  { week: "", value: 2100 },
  { week: "", value: 1700 },
];

type FilterType = "This Month" | "This Quarter" | "This Year";

export function RevenueOverviewChart({ className }: RevenueOverviewChartProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("This Month");
  const filters: FilterType[] = ["This Month", "This Quarter", "This Year"];

  const data = defaultData;
  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = 2500;
  const minValue = 0;
  const yLabels = [0, 500, 1000, 1500, 2000, 2500];

  const xScale = chartWidth / (data.length - 1);
  const yScale = chartHeight / (maxValue - minValue);

  // Generate points
  const points = data.map((d, i) => ({
    x: padding.left + i * xScale,
    y: padding.top + chartHeight - (d.value - minValue) * yScale,
    value: d.value,
    week: d.week,
  }));

  // Create smooth curve path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) / 3;
    const cpy1 = prev.y;
    const cpx2 = curr.x - (curr.x - prev.x) / 3;
    const cpy2 = curr.y;
    pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`;
  }

  // Fill path
  const fillPathD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

  return (
    <div className={cn("rounded-xl border border-[#2a2d4a] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
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

      {/* Chart */}
      <div className="w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {yLabels.map((label, i) => {
            const y = padding.top + chartHeight - (label - minValue) * yScale;
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#2a2d4a"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#6b7280"
                >
                  ${label.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Fill area */}
          <path d={fillPathD} fill="url(#revenueGradient)" />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#00D1FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#00D1FF"
              stroke="#1D1D41"
              strokeWidth="2"
            />
          ))}

          {/* X-axis labels */}
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((label, i) => {
            const x = padding.left + (i * chartWidth) / 3;
            return (
              <text
                key={`x-label-${i}`}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
