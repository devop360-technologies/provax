"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AreaChartPoint {
  x: number;
  y: number;
  label: string;
}

interface AIModuleVolumeAreaChartProps {
  title: string;
  dataLabel: string;
  color: "cyan" | "green" | "gold";
  className?: string;
}

export function AIModuleVolumeAreaChart({
  title,
  dataLabel,
  color,
  className,
}: AIModuleVolumeAreaChartProps) {
  const colorMap = {
    cyan: { line: "#00D9FF", gradient: "#00D9FF" },
    green: { line: "#22C55E", gradient: "#22C55E" },
    gold: { line: "#F59E0B", gradient: "#F59E0B" },
  };

  const selectedColor = colorMap[color];

  // SVG area chart with smooth curves
  const width = 1000;
  const height = 300;
  const padding = 50;

  // Sample data points - 10 months
  const dataPoints: AreaChartPoint[] = [
    { x: 0, y: 1000, label: "Jan" },
    { x: 1, y: 1100, label: "Feb" },
    { x: 2, y: 1050, label: "Mar" },
    { x: 3, y: 1150, label: "Apr" },
    { x: 4, y: 1200, label: "May" },
    { x: 5, y: 1250, label: "Jun" },
    { x: 6, y: 1300, label: "Jul" },
    { x: 7, y: 1350, label: "Aug" },
    { x: 8, y: 1400, label: "Sep" },
    { x: 9, y: 1450, label: "Oct" },
  ];

  const xScale = (width - 2 * padding) / (dataPoints.length - 1);
  const yMax = 1600;
  const yScale = (height - 2 * padding) / yMax;

  // Generate smooth path using quadratic bezier curves
  let pathData = `M ${padding} ${height - padding}`;

  for (let i = 0; i < dataPoints.length; i++) {
    const x = padding + i * xScale;
    const y = height - padding - dataPoints[i].y * yScale;

    if (i === 0) {
      pathData += ` L ${x} ${y}`;
    } else {
      // Quadratic bezier for smooth curves
      const prevX = padding + (i - 1) * xScale;
      const prevY = height - padding - dataPoints[i - 1].y * yScale;
      const controlX = (prevX + x) / 2;
      const controlY = (prevY + y) / 2;
      pathData += ` Q ${controlX} ${controlY} ${x} ${y}`;
    }
  }

  // Close the path for the area
  pathData += ` L ${width - padding} ${height - padding}`;
  pathData += ` L ${padding} ${height - padding}`;
  pathData += " Z";

  const handleExportCSV = () => {
    // CSV export implementation placeholder
  };

  const handleExportPDF = () => {
    // PDF export implementation placeholder
  };

  const handleComparePeriods = () => {
    // Compare periods implementation placeholder
  };

  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {/* Header with Title and Actions */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">{title}</h3>
        <div className="flex gap-2">
          <Button
            onClick={handleExportCSV}
            className="h-8 gap-2 rounded bg-[#10B981] px-1 text-xs font-medium text-white hover:bg-[#059669]"
          >
            <Download className="size-3" />
            Export CSV
          </Button>
          <Button
            onClick={handleExportPDF}
            className="h-8 gap-2 rounded bg-[#FF6B6B] px-1 text-xs font-medium text-white hover:bg-[#EE5A52]"
          >
            <Download className="size-3" />
            Export PDF
          </Button>
          <Button
            onClick={handleComparePeriods}
            className="h-8 gap-2 rounded border border-[#404254] bg-transparent px-1 text-xs font-medium text-gray-400 hover:bg-[#252850]"
          >
            Compare Periods
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-80"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id={`gradient-area-${color}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={selectedColor.gradient} stopOpacity="0.5" />
              <stop offset="50%" stopColor={selectedColor.gradient} stopOpacity="0.25" />
              <stop offset="100%" stopColor={selectedColor.gradient} stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Y-axis grid lines and labels */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const yValue = 1600 - (i * 1600) / 6;
            const yPos = padding + (i * (height - 2 * padding)) / 6;
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={padding}
                  y1={yPos}
                  x2={width - padding}
                  y2={yPos}
                  stroke="#404254"
                  strokeDasharray="4"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={yPos + 5}
                  textAnchor="end"
                  fill="#9CA3AF"
                  fontSize="12"
                >
                  {Math.round(yValue)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path
            d={pathData}
            fill={`url(#gradient-area-${color})`}
            stroke={selectedColor.line}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={padding + index * xScale}
              cy={height - padding - point.y * yScale}
              r="4"
              fill={selectedColor.line}
              stroke="#1D1D41"
              strokeWidth="2"
            />
          ))}

          {/* X-axis line */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#404254"
            strokeWidth="2"
          />

          {/* X-axis labels */}
          {dataPoints.map((point, index) => (
            <text
              key={`label-${index}`}
              x={padding + index * xScale}
              y={height - padding + 25}
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="12"
            >
              {point.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-2">
        <div
          className="h-3 w-3 rounded"
          style={{ backgroundColor: selectedColor.line }}
        />
        <span className="text-sm text-gray-300">{dataLabel}</span>
      </div>
    </div>
  );
}
