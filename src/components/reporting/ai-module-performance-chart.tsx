"use client";

import { Download, FileText, Expand } from "lucide-react";
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
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onExpand?: () => void;
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
  onExportCSV,
  onExportPDF,
  onExpand,
}: AIModulePerformanceChartProps) {
  const chartData = data || (color === "green" ? defaultSuccessData : defaultErrorData);
  const colorClass = color === "green" ? "#22C55E" : "#FF6B6B";
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-4", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between ">
        <h4 className="text-base font-medium text-white">{title}</h4>
        <div className="flex items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1 rounded bg-[#10B981] px-2 py-1.5 text-[11px] font-medium text-white hover:bg-[#059669] transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-1 rounded bg-[#FF6B6B] px-2 py-1.5 text-[11px] font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            <FileText size={14} />
            Export PDF
          </button>
          <button
            onClick={onExpand}
            className="flex items-center gap-1 rounded border border-[#00D9FF] px-2 py-1.5 text-[11px] font-medium text-[#00D9FF] hover:bg-[#1D1D41] transition-colors"
          >
            <Expand size={14} />
            Expand
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-4 px-4" style={{ height: "280px" }}>
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3 flex-1">
            <div
              className="w-full rounded-t-md transition-all hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 230}px`,
                backgroundColor: colorClass,
              }}
            />
            <span className="text-[10px] text-gray-400 text-center whitespace-nowrap">{item.label}</span>
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
