"use client";

import { cn } from "@/lib/utils";

interface ConversionFunnelBar {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

interface ConversionFunnelsChartProps {
  title: string;
  column1: {
    title: string;
    bars: ConversionFunnelBar[];
  };
  column2: {
    title: string;
    bars: ConversionFunnelBar[];
  };
  filters?: React.ReactNode;
  className?: string;
}

export function ConversionFunnelsChart({
  title,
  column1,
  column2,
  filters,
  className,
}: ConversionFunnelsChartProps) {
  const renderBars = (bars: ConversionFunnelBar[]) => (
    <div className="space-y-4">
      {bars.map((bar, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">{bar.label}</span>
            <span className="text-sm font-medium text-white">{bar.value.toLocaleString()}</span>
          </div>
          <div className="h-6 w-full overflow-hidden rounded bg-[#252850]">
            <div
              className="h-full rounded transition-all"
              style={{
                width: `${(bar.value / bar.maxValue) * 100}%`,
                backgroundColor: bar.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">{title}</h3>
        {filters}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="mb-4 text-sm font-medium text-gray-300">{column1.title}</h4>
          {renderBars(column1.bars)}
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="mb-4 text-sm font-medium text-gray-300">{column2.title}</h4>
          {renderBars(column2.bars)}
        </div>
      </div>
    </div>
  );
}
