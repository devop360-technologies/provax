"use client";

import { cn } from "@/lib/utils";

interface BarData {
  label: string;
  value: number;
}

interface AIModulePerformanceChartProps {
  title: string;
  dataLabel: string;
  color: "green" | "red";
  data?: BarData[];
  className?: string;
}

const defaultSuccessData: BarData[] = [
  { label: "Structure Analysis", value: 98.2 },
  { label: "Text Extraction", value: 96.1 },
  { label: "Insight Generation", value: 92.8 },
  { label: "Glass Inspection", value: 98.8 },
  { label: "Functionality Check", value: 91.3 },
];

const defaultErrorData: BarData[] = [
  { label: "Structure Analysis", value: 1.8 },
  { label: "Text Extraction", value: 3.9 },
  { label: "Insight Generation", value: 7.2 },
  { label: "Glass Inspection", value: 1.2 },
  { label: "Functionality Check", value: 8.7 },
];

export function AIModulePerformanceChart({
  title,
  dataLabel,
  color,
  data,
  className,
}: AIModulePerformanceChartProps) {
  const chartData = data || (color === "green" ? defaultSuccessData : defaultErrorData);
  const colorClass = color === "green" ? "#22C55E" : "#FF6B6B";
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-3" style={{ height: "250px" }}>
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-full rounded-t-lg transition-all hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 200}px`,
                backgroundColor: colorClass,
              }}
            />
            <span className="text-xs text-gray-400 text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-2">
        <div
          className="h-3 w-3 rounded"
          style={{ backgroundColor: colorClass }}
        />
        <span className="text-sm text-gray-300">{dataLabel}</span>
      </div>
    </div>
  );
}
