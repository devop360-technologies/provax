import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnifiedChart } from '@/components/ui/unified-chart';

// Mock the chart-utils module
jest.mock('@/lib/chart-utils', () => ({
  generateGridLines: jest.fn(() => [
    { y: 40, label: '100', index: 0 },
    { y: 90, label: '75', index: 1 },
    { y: 140, label: '50', index: 2 },
    { y: 190, label: '25', index: 3 },
    { y: 240, label: '0', index: 4 },
  ]),
  calculateBarDimensions: jest.fn(() => ({ barWidth: 30, barGap: 18 })),
  calculateLineChartPoints: jest.fn(() => [
    { x: 40, y: 100 },
    { x: 150, y: 80 },
    { x: 260, y: 120 },
    { x: 370, y: 60 },
    { x: 480, y: 90 },
  ]),
  createSmoothCurvePath: jest.fn(() => 'M 40 100 Q 95 90, 150 80'),
  createFillPath: jest.fn(() => 'M 40 100 Q 95 90, 150 80 L 150 210 L 40 210 Z'),
  CHART_COLORS: {
    grid: '#3a3d5a',
    text: '#9ca3af',
    border: '#2a2d4a',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },
}));

describe('UnifiedChart Component', () => {
  describe('Bar Chart', () => {
    it('renders bar chart', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30, 40, 50]}
          color="#3B82F6"
        />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders bars for each data point', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30, 40, 50]}
          color="#3B82F6"
        />
      );
      const bars = container.querySelectorAll('rect');
      expect(bars.length).toBe(5);
    });

    it('applies color to bars', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30]}
          color="#10B981"
        />
      );
      const bar = container.querySelector('rect');
      expect(bar).toHaveAttribute('fill', '#10B981');
    });

    it('renders grid lines', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30]}
          color="#3B82F6"
        />
      );
      const gridLines = container.querySelectorAll('line');
      expect(gridLines.length).toBeGreaterThan(0);
    });

    it('accepts data as objects with value property', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[{ value: 10 }, { value: 20 }, { value: 30 }]}
          color="#3B82F6"
        />
      );
      const bars = container.querySelectorAll('rect');
      expect(bars.length).toBe(3);
    });
  });

  describe('Line Chart', () => {
    it('renders line chart', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[10, 20, 30, 40, 50]}
          color="#8B5CF6"
        />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders polyline for data', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[10, 20, 30]}
          color="#8B5CF6"
        />
      );
      const polyline = container.querySelector('polyline');
      expect(polyline).toBeInTheDocument();
    });

    it('renders data points as circles', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[10, 20, 30, 40, 50]}
          color="#8B5CF6"
        />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBe(5);
    });

    it('renders fill path for area effect', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[10, 20, 30]}
          color="#8B5CF6"
        />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('creates gradient definition', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[10, 20]}
          color="#8B5CF6"
        />
      );
      const gradient = container.querySelector('linearGradient');
      expect(gradient).toBeInTheDocument();
    });
  });

  describe('Common Features', () => {
    it('applies custom height', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30]}
          color="#3B82F6"
          height="h-96"
        />
      );
      expect(container.firstChild).toHaveClass('h-96');
    });

    it('uses default height when not specified', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30]}
          color="#3B82F6"
        />
      );
      expect(container.firstChild).toHaveClass('h-80');
    });

    it('preserves aspect ratio', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[10, 20, 30]}
          color="#3B82F6"
        />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    });

    it('has full width styling', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[10, 20, 30]}
          color="#3B82F6"
        />
      );
      expect(container.firstChild).toHaveClass('w-full');
    });

    it('handles empty data array', () => {
      const { container } = render(
        <UnifiedChart
          type="bar"
          data={[]}
          color="#3B82F6"
        />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('handles single data point', () => {
      const { container } = render(
        <UnifiedChart
          type="line"
          data={[50]}
          color="#3B82F6"
        />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});
