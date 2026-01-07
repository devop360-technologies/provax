"use client";

import { cn } from "@/lib/utils";

interface BarChartData {
  label: string;
  value: number;
}

interface BarChartDisplayProps {
  data: BarChartData[];
  colorFrom: string;
  colorTo: string;
  overlayColor?: string;
  height?: string;
  className?: string;
}

export function BarChartDisplay({
  data,
  colorFrom,
  colorTo,
  overlayColor,
  height = "h-[300px]",
  className,
}: Readonly<BarChartDisplayProps>) {
  return (
    <div className={cn(height, "flex items-end justify-between gap-2 px-4", className)}>
      {data.map((item) => (
        <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm relative"
            style={{
              height: `${item.value}%`,
              background: `linear-gradient(to top, ${colorFrom}, ${colorTo})`,
            }}
          >
            {overlayColor && (
              <div
                className="absolute inset-0 rounded-t-sm"
                style={{ backgroundColor: overlayColor }}
              />
            )}
          </div>
          <span className="text-xs text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Pre-configured chart variants for common use cases
export const CHART_COLORS = {
  blue: { from: "rgba(59, 130, 246, 0.8)", to: "rgba(96, 165, 250, 0.4)", overlay: "rgba(96, 165, 250, 0.2)" },
  green: { from: "rgba(34, 197, 94, 0.8)", to: "rgba(74, 222, 128, 0.4)", overlay: "rgba(74, 222, 128, 0.2)" },
  indigo: { from: "rgba(99, 102, 241, 0.8)", to: "rgba(129, 140, 248, 0.4)", overlay: "rgba(129, 140, 248, 0.2)" },
  cyan: { from: "rgb(6, 182, 212)", to: "rgb(34, 211, 238)", overlay: undefined },
  purple: { from: "rgba(168, 85, 247, 0.8)", to: "rgba(192, 132, 252, 0.4)", overlay: "rgba(192, 132, 252, 0.2)" },
  yellow: { from: "rgba(234, 179, 8, 0.8)", to: "rgba(250, 204, 21, 0.4)", overlay: "rgba(250, 204, 21, 0.2)" },
} as const;

// Helper to create chart data from array with month labels
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function createMonthlyChartData(values: number[]): BarChartData[] {
  return values.map((value, i) => ({
    label: MONTHS[i] || `M${i}`,
    value,
  }));
}
