"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface VolumeByPeriodChartProps {
  title: string;
  dataLabel: string;
  color: "cyan" | "green";
  filters?: React.ReactNode;
  className?: string;
}

export function VolumeByPeriodChart({
  title,
  dataLabel,
  color,
  filters,
  className,
}: VolumeByPeriodChartProps) {
  const colorClass = color === "cyan" ? "#00D9FF" : "#22C55E";
  const maxValue = 1400;

  // Sample data for the chart - Jan to Oct
  const data = [
    { value: 900, label: "Jan" },
    { value: 950, label: "Feb" },
    { value: 1000, label: "Mar" },
    { value: 1100, label: "Apr" },
    { value: 1050, label: "May" },
    { value: 1150, label: "Jun" },
    { value: 1200, label: "Jul" },
    { value: 1250, label: "Aug" },
    { value: 1300, label: "Sep" },
    { value: 1350, label: "Oct" },
  ];

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  const handleExportPDF = () => {
    console.log("Export PDF");
  };

  const handleExpand = () => {
    console.log("Expand");
  };

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header with Title and Actions */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">{title}</h3>
        <div className="flex gap-2">
          <Button
            onClick={handleExportCSV}
            className="h-8 gap-2 rounded-lg bg-[#10B981] px-3 text-xs font-medium text-white hover:bg-[#059669]"
          >
            <Download className="size-3" />
            Export CSV
          </Button>
          <Button
            onClick={handleExportPDF}
            className="h-8 gap-2 rounded-lg bg-[#FF6B6B] px-3 text-xs font-medium text-white hover:bg-[#EE5A52]"
          >
            <Download className="size-3" />
            Export PDF
          </Button>
          <Button
            onClick={handleExpand}
            className="h-8 gap-2 rounded-lg border border-[#404254] bg-transparent px-3 text-xs font-medium text-gray-400 hover:bg-[#252850]"
          >
            Expand
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-2" style={{ height: "280px" }}>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3 flex-1">
            <div
              className="w-full rounded-t-lg transition-all hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 250}px`,
                backgroundColor: colorClass,
              }}
            />
            <span className="text-xs text-gray-400">{item.label}</span>
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
