"use client";

import { cn } from "@/lib/utils";

interface DataPoint {
  x: number;
  y: number;
}

interface RevenueOverviewChartProps {
  title: string;
  dataLabel: string;
  color: "cyan" | "green";
  className?: string;
}

export function RevenueOverviewChart({
  title,
  dataLabel,
  color,
  className,
}: RevenueOverviewChartProps) {
  const colorClass = color === "cyan" ? "#00D9FF" : "#22C55E";
  const gradientColor = color === "cyan" ? "#00D9FF" : "#22C55E";

  // SVG area chart with smooth curves
  const width = 800;
  const height = 200;
  const padding = 30;

  // Sample data points
  const dataPoints: DataPoint[] = [
    { x: 0, y: 100 },
    { x: 1, y: 120 },
    { x: 2, y: 95 },
    { x: 3, y: 110 },
    { x: 4, y: 105 },
    { x: 5, y: 125 },
    { x: 6, y: 115 },
    { x: 7, y: 130 },
    { x: 8, y: 120 },
    { x: 9, y: 140 },
    { x: 10, y: 135 },
    { x: 11, y: 150 },
  ];

  const xScale = (width - 2 * padding) / (dataPoints.length - 1);
  const yMax = 150;
  const yScale = (height - 2 * padding) / yMax;

  // Generate path string for the area
  let pathData = `M ${padding} ${height - padding}`;

  dataPoints.forEach((point, index) => {
    const x = padding + index * xScale;
    const y = height - padding - point.y * yScale;
    if (index === 0) {
      pathData += ` L ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }
  });

  pathData += ` L ${width - padding} ${height - padding}`;

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>

      {/* Chart */}
      <div className="flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-64"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={gradientColor} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={padding + (i * (height - 2 * padding)) / 4}
              x2={width - padding}
              y2={padding + (i * (height - 2 * padding)) / 4}
              stroke="#404254"
              strokeDasharray="4"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path
            d={pathData}
            fill={`url(#gradient-${color})`}
            stroke={colorClass}
            strokeWidth="2"
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={padding + index * xScale}
              cy={height - padding - point.y * yScale}
              r="3"
              fill={colorClass}
            />
          ))}

          {/* X-axis labels */}
          {dataPoints.map((point, index) => (
            <text
              key={`label-${index}`}
              x={padding + index * xScale}
              y={height - 5}
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="12"
            >
              {labels[index]}
            </text>
          ))}
        </svg>
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
