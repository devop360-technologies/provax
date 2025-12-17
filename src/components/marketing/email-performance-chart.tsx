"use client";

import { cn } from "@/lib/utils";

interface EmailPerformanceChartProps {
  title: string;
  metric: string;
  color: "blue" | "green" | "red";
  className?: string;
}

export function EmailPerformanceChart({
  title,
  metric,
  color,
  className,
}: EmailPerformanceChartProps) {
  const colorClasses = {
    blue: {
      dot: "bg-[#00D9FF]",
      area: "from-[#00D9FF]/40",
      gradient: "#00D9FF",
    },
    green: {
      dot: "bg-[#22C55E]",
      area: "from-[#22C55E]/40",
      gradient: "#22C55E",
    },
    red: {
      dot: "bg-[#FF6B6B]",
      area: "from-[#FF6B6B]/40",
      gradient: "#FF6B6B",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        "rounded-lg border border-[#404254] bg-[#1D1D41] p-6",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <div className={cn("size-2 rounded-full", colors.dot)} />
          <span className="text-xs text-gray-400">{metric}</span>
        </div>
      </div>

      {/* Mock Chart SVG */}
      <svg
        viewBox="0 0 800 300"
        className="h-48 w-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line
          x1="0"
          y1="250"
          x2="800"
          y2="250"
          stroke="#404254"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="200"
          x2="800"
          y2="200"
          stroke="#2a2d4a"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="150"
          x2="800"
          y2="150"
          stroke="#2a2d4a"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="100"
          x2="800"
          y2="100"
          stroke="#2a2d4a"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="50"
          x2="800"
          y2="50"
          stroke="#2a2d4a"
          strokeWidth="1"
        />

        {/* Chart area based on color */}
        {color === "blue" && (
          <>
            <path
              d="M 0 200 Q 100 180 150 160 T 300 140 T 450 100 T 600 80 T 800 120 L 800 300 L 0 300 Z"
              fill="#00D9FF"
              opacity="0.15"
            />
            <path
              d="M 0 200 Q 100 180 150 160 T 300 140 T 450 100 T 600 80 T 800 120"
              stroke="#00D9FF"
              strokeWidth="2.5"
              fill="none"
            />
          </>
        )}

        {color === "green" && (
          <>
            <path
              d="M 0 240 Q 100 200 150 180 T 300 120 T 450 100 T 600 130 T 800 100 L 800 300 L 0 300 Z"
              fill="#22C55E"
              opacity="0.15"
            />
            <path
              d="M 0 240 Q 100 200 150 180 T 300 120 T 450 100 T 600 130 T 800 100"
              stroke="#22C55E"
              strokeWidth="2.5"
              fill="none"
            />
          </>
        )}

        {color === "red" && (
          <>
            <path
              d="M 0 220 Q 100 200 150 180 T 300 140 T 450 160 T 600 120 T 800 100 L 800 300 L 0 300 Z"
              fill="#FF6B6B"
              opacity="0.15"
            />
            <path
              d="M 0 220 Q 100 200 150 180 T 300 140 T 450 160 T 600 120 T 800 100"
              stroke="#FF6B6B"
              strokeWidth="2.5"
              fill="none"
            />
          </>
        )}
      </svg>

      {/* X-axis labels */}
      <div className="mt-4 flex justify-between px-2 text-[10px] text-gray-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
      </div>
    </div>
  );
}
