"use client";

import { Download, FileText, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversionFunnelStep {
  label: string;
  value: number;
  percentage?: number;
}

interface ConversionFunnelsChartProps {
  title: string;
  column1: {
    title: string;
    steps: ConversionFunnelStep[];
    color: string;
  };
  column2: {
    title: string;
    steps: ConversionFunnelStep[];
    color: string;
  };
  className?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onComparePeriods?: () => void;
}

export function ConversionFunnelsChart({
  title,
  column1,
  column2,
  className,
  onExportCSV,
  onExportPDF,
  onComparePeriods,
}: ConversionFunnelsChartProps) {
  const renderFunnel = (steps: ConversionFunnelStep[], color: string) => (
    <div className="flex flex-col items-center gap-3">
      {steps.map((step) => {
        const widthPercentage = 150 - steps.indexOf(step) * 20;
        return (
          <div
            key={step.label}
            className="flex items-center transition-all"
            style={{ width: `${widthPercentage}%` }}
          >
            <div
              className="w-full  px-2 py-1 text-center transition-all hover:shadow-lg"
              style={{ backgroundColor: color }}
            >
              <div className="text-sm font-semibold text-white">{step.label}</div>
              <div className="text-sm font-bold justify-center items-center space-x-0.5 text-white flex">
                {step.value.toLocaleString()}
              {step.percentage !== undefined && (
                <div className="text-xs text-white/80">({step.percentage}%)</div>
              )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header with Actions */}
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white mr-1.5">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1 rounded bg-[#10B981] px-2 py-2 text-[11px] font-medium text-white hover:bg-[#059669] transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 rounded bg-[#FF6B6B] px-2 py-2 text-[11px] font-medium text-white hover:bg-[#EF4444] transition-colors"
          >
            <FileText size={16} />
            Export PDF
          </button>
          <button
            onClick={onComparePeriods}
            className="flex items-center gap-2 rounded border border-[#00D9FF] px-2 py-2 text-[11px] font-medium text-[#00D9FF] hover:bg-[#1D1D41] transition-colors"
          >
            <GitCompare size={16} />
            Compare Periods
          </button>
        </div>
      </div>

      {/* Two Column Funnel Layout */}
      <div className="grid grid-cols-2 gap-12">
        {/* Column 1 */}
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-sm font-medium text-gray-300 text-center">
            {column1.title}
          </h4>
          {renderFunnel(column1.steps, column1.color)}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-sm font-medium text-gray-300 text-center">
            {column2.title}
          </h4>
          {renderFunnel(column2.steps, column2.color)}
        </div>
      </div>
    </div>
  );
}
