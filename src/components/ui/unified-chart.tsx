'use client';

import { generateGridLines, calculateBarDimensions, calculateLineChartPoints, createSmoothCurvePath, createFillPath, CHART_COLORS } from '@/lib/chart-utils';

export type ChartType = 'bar' | 'line';

interface ChartDataPoint {
  label?: string;
  value: number;
  month?: string;
}

interface UnifiedChartProps {
  type: ChartType;
  data: ChartDataPoint[] | number[];
  color: string;
  title?: string;
  height?: string;
}

export function UnifiedChart({ type, data, color, title, height = 'h-80' }: Readonly<UnifiedChartProps>) {
  const normalizedData = Array.isArray(data) && typeof data[0] === 'number' 
    ? (data as number[])
    : (data as ChartDataPoint[]).map(d => d.value);
  
  const maxValue = Math.max(...normalizedData);
  const minValue = type === 'line' ? Math.min(...normalizedData) : 0;
  const svgHeight = 280;
  const svgWidth = 500;
  const padding = 40;
  const chartHeight = svgHeight - padding - 40;
  const yLevels = 4;

  if (type === 'bar') {
    const { barWidth, barGap } = calculateBarDimensions(svgWidth, padding, normalizedData.length);
    const gridLines = generateGridLines(maxValue, 0, yLevels, svgHeight, padding, chartHeight);

    return (
      <div className={`w-full ${height}`}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {gridLines.map(({ y, index }) => (
            <line key={`grid-${index}`} x1={padding} y1={y} x2={svgWidth} y2={y} stroke={CHART_COLORS.grid} strokeWidth="1" strokeDasharray="3,3" />
          ))}
          <line x1={padding} y1={20} x2={padding} y2={svgHeight - padding - 30} stroke={CHART_COLORS.grid} strokeWidth="1.5" />
          <line x1={padding} y1={svgHeight - padding - 30} x2={svgWidth} y2={svgHeight - padding - 30} stroke={CHART_COLORS.grid} strokeWidth="1.5" />
          {normalizedData.map((value, idx) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + idx * (barWidth + barGap) + barGap;
            const y = svgHeight - padding - 30 - barHeight;
            return (
              <rect key={`bar-${x}-${value}`} x={x} y={y} width={barWidth} height={barHeight} fill={color} opacity="0.8" rx="4" />
            );
          })}
        </svg>
      </div>
    );
  }

  // Line chart
  const points = calculateLineChartPoints(normalizedData, svgWidth, svgHeight, padding, minValue);
  const pathD = createSmoothCurvePath(points);
  const fillPathD = createFillPath(pathD, points[points.length - 1], padding, svgHeight);
  const gridLines = generateGridLines(maxValue, minValue, yLevels, svgHeight, padding, chartHeight);

  return (
    <div className={`w-full ${height}`}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {gridLines.map(({ y, index }) => (
          <line key={`grid-line-${index}`} x1={padding} y1={y} x2={svgWidth} y2={y} stroke={CHART_COLORS.grid} strokeWidth="1" strokeDasharray="3,3" />
        ))}
        <line x1={padding} y1={20} x2={padding} y2={svgHeight - padding - 30} stroke={CHART_COLORS.grid} strokeWidth="1.5" />
        <line x1={padding} y1={svgHeight - padding - 30} x2={svgWidth} y2={svgHeight - padding - 30} stroke={CHART_COLORS.grid} strokeWidth="1.5" />
        <path d={fillPathD} fill={`url(#gradient-${color})`} opacity="0.1" />
        <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={color} strokeWidth="2" />
        {points.map((point) => (
          <circle key={`point-${point.x}-${point.y}`} cx={point.x} cy={point.y} r="4" fill={color} />
        ))}
      </svg>
    </div>
  );
}
