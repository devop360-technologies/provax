'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateLineChartPoints, createSmoothCurvePath, createFillPath, generateGridLines, CHART_COLORS } from '@/lib/chart-utils';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface LineChartProps {
  data: number[];
  color: string;
}

export function LineChart({ data, color }: Readonly<LineChartProps>) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const svgHeight = 280;
  const svgWidth = 500;
  const padding = 40;
  const chartHeight = svgHeight - padding - 40;
  const yLevels = 4;
  
  const points = calculateLineChartPoints(data, svgWidth, svgHeight, padding, minValue);
  const pathD = createSmoothCurvePath(points);
  const fillPathD = createFillPath(pathD, points[points.length - 1], padding, svgHeight);
  const gridLines = generateGridLines(maxValue, minValue, yLevels, svgHeight, padding, chartHeight);

  return (
    <div className="w-full h-80">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines (horizontal) */}
        {gridLines.map(({ y, index }) => (
          <line
            key={`grid-line-y${y.toFixed(2)}`}
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
            key={`y-label-v${label}`}
            x={padding - 15}
            y={y + 5}
            textAnchor="end"
            fontSize="12"
            fill={CHART_COLORS.text}
          >
            {label}
          </text>
        ))}

        {/* X-axis labels */}
        {points.map((point, i) => {
          const labelKey = monthLabels[i] ?? "m" + String(i);
          return (
            <text
              key={`x-label-${labelKey}`}
              x={point.x}
              y={svgHeight - padding - 10}
              textAnchor="middle"
              fontSize="12"
              fill={CHART_COLORS.text}
            >
              {monthLabels[i] || ''}
            </text>
          );
        })}

        {/* Fill area */}
        <path
          d={fillPathD}
          fill={`url(#gradient-${color})`}
          stroke="none"
        />

        {/* Line */}
        <path
          d={pathD}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={`point-x${point.x.toFixed(0)}-y${point.y.toFixed(0)}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={color}
            fillOpacity="0.8"
          />
        ))}
      </svg>
    </div>
  );
}

interface ChartOverviewProps {
  title: string;
  subtitle: string;
  data: number[];
  color: string;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
}

export function ChartOverview({
  title,
  subtitle,
  data,
  color,
  filters = ['Daily', 'Weekly', 'Monthly'],
  onFilterChange,
}: Readonly<ChartOverviewProps>) {
  return (
    <Card className="bg-[#1D1D41] border-[#2a2d4a]">
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
        <LineChart data={data} color={color} />
      </CardContent>
    </Card>
  );
}
