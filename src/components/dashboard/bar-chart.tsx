'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateYStep, generateGridLines, calculateBarDimensions, CHART_COLORS } from '@/lib/chart-utils';

interface BarChartProps {
  data: Array<{ month: string; value: number }>;
  color: string;
}

export function BarChart({ data, color }: Readonly<BarChartProps>) {
  const maxValue = Math.max(...data.map(d => d.value));
  const svgHeight = 280;
  const svgWidth = 500;
  const padding = 40;
  const chartHeight = svgHeight - padding - 40;
  const { barWidth, barGap } = calculateBarDimensions(svgWidth, padding, data.length);
  const yLevels = 4;
  const yStep = calculateYStep(maxValue, 0, yLevels);
  const gridLines = generateGridLines(maxValue, 0, yLevels, svgHeight, padding, chartHeight);

  return (
    <div className="w-full h-80">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines (horizontal) */}
        {gridLines.map(({ y, index }) => (
          <line
            key={`grid-${index}`}
            x1={padding}
            y1={y}
            x2={svgWidth}
            y2={y}
            stroke={CHART_COLORS.grid}
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        ))}

        {/* Y-axis */}
        <line
          x1={padding}
          y1={20}
          x2={padding}
          y2={svgHeight - padding - 30}
          stroke={CHART_COLORS.grid}
          strokeWidth="1.5"
        />

        {/* X-axis */}
        <line
          x1={padding}
          y1={svgHeight - padding - 30}
          x2={svgWidth}
          y2={svgHeight - padding - 30}
          stroke={CHART_COLORS.grid}
          strokeWidth="1.5"
        />

        {/* Y-axis labels */}
        {gridLines.map(({ y, label, index }) => (
          <text
            key={`y-label-${index}`}
            x={padding - 15}
            y={y + 5}
            textAnchor="end"
            fontSize="12"
            fill={CHART_COLORS.text}
          >
            {label}
          </text>
        ))}

        {/* Bars and X-axis labels */}
        {data.map((item, i) => {
          const xStart = padding + (i * (barWidth + barGap));
          const barHeight = (item.value / maxValue) * chartHeight;
          const y = svgHeight - padding - 30 - barHeight;

          return (
            <g key={item.month}>
              {/* Bar */}
              <rect
                x={xStart}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx="4"
              />
              {/* X-axis label */}
              <text
                x={xStart + barWidth / 2}
                y={svgHeight - padding - 10}
                textAnchor="middle"
                fontSize="12"
                fill={CHART_COLORS.text}
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface BarChartOverviewProps {
  title: string;
  subtitle: string;
  data: Array<{ month: string; value: number }>;
  color: string;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
}

export function BarChartOverview({
  title,
  subtitle,
  data,
  color,
  filters = ['Daily', 'Quarterly'],
  onFilterChange,
}: Readonly<BarChartOverviewProps>) {
  return (
    <Card className="bg-[#252850] border-[#2a2d4a]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{title}</CardTitle>
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            {filters.map((filter, idx) => (
              <button
                key={filter}
                onClick={() => onFilterChange?.(filter)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  idx === 0
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <BarChart data={data} color={color} />
      </CardContent>
    </Card>
  );
}
