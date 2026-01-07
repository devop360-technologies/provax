/**
 * Shared chart utilities to reduce duplication across dashboard charts
 */

export interface GridLineConfig {
  yLevels: number;
  svgHeight: number;
  svgWidth: number;
  padding: number;
  chartHeight: number;
}

export interface AxisConfig {
  maxValue: number;
  minValue?: number;
  padding: number;
  svgHeight: number;
  chartHeight: number;
  yLevels: number;
}

/**
 * Calculate Y-axis step value
 */
export function calculateYStep(maxValue: number, minValue: number = 0, yLevels: number = 4): number {
  const range = maxValue - minValue || 1;
  return range / yLevels;
}

/**
 * Generate grid line y positions and labels
 */
export function generateGridLines(
  maxValue: number,
  minValue: number = 0,
  yLevels: number = 4,
  svgHeight: number = 280,
  padding: number = 40,
  chartHeight: number = 200
): Array<{ y: number; label: string; index: number }> {
  const yStep = calculateYStep(maxValue, minValue, yLevels);
  
  return Array.from({ length: yLevels + 1 }).map((_, i) => ({
    y: svgHeight - padding - 30 - (i * chartHeight) / yLevels,
    label: (minValue + (yLevels - i) * yStep).toFixed(0),
    index: i,
  }));
}

/**
 * Format Y-axis label with appropriate scaling (K for thousands, M for millions)
 */
export function formatAxisLabel(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Calculate bar width and spacing for bar charts
 */
export function calculateBarDimensions(
  svgWidth: number,
  padding: number,
  dataLength: number,
  spacingMultiplier: number = 1.8
): { barWidth: number; barGap: number } {
  const barWidth = (svgWidth - padding - 20) / (dataLength * spacingMultiplier);
  const barGap = barWidth * 0.6;
  return { barWidth, barGap };
}

/**
 * Calculate point positions for line charts
 */
export function calculateLineChartPoints(
  data: number[],
  svgWidth: number,
  svgHeight: number,
  padding: number,
  minValue: number = 0
): Array<{ x: number; y: number }> {
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;
  const chartHeight = svgHeight - padding - 40;
  const pointSpacing = (svgWidth - 80) / (data.length - 1);

  return data.map((value, i) => ({
    x: i * pointSpacing + padding,
    y: svgHeight - padding - 30 - ((value - minValue) / range) * chartHeight,
  }));
}

/**
 * Create smooth curve path using quadratic bezier curves
 */
export function createSmoothCurvePath(
  points: Array<{ x: number; y: number }>
): string {
  if (points.length === 0) return '';
  
  let pathD = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const xMid = (points[i - 1].x + points[i].x) / 2;
    const yMid = (points[i - 1].y + points[i].y) / 2;
    pathD += ` Q ${xMid} ${points[i - 1].y}, ${xMid} ${yMid}`;
    pathD += ` T ${points[i].x} ${points[i].y}`;
  }
  
  return pathD;
}

/**
 * Create fill path for area charts
 */
export function createFillPath(
  curvePath: string,
  lastPoint: { x: number; y: number },
  padding: number,
  svgHeight: number
): string {
  return `${curvePath} L ${lastPoint.x} ${svgHeight - padding - 30} L ${padding} ${svgHeight - padding - 30} Z`;
}

/**
 * Colors configuration for charts
 */
export const CHART_COLORS = {
  grid: '#3a3d5a',
  text: '#9ca3af',
  border: '#2a2d4a',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
} as const;
