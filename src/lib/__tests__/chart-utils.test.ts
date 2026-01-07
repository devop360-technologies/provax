import {
  calculateYStep,
  generateGridLines,
  formatAxisLabel,
  calculateBarDimensions,
  calculateLineChartPoints,
  createSmoothCurvePath,
  createFillPath,
  CHART_COLORS,
} from '../chart-utils';

describe('calculateYStep', () => {
  it('should calculate correct step value', () => {
    expect(calculateYStep(100, 0, 4)).toBe(25);
    expect(calculateYStep(1000, 0, 5)).toBe(200);
  });

  it('should handle min value', () => {
    expect(calculateYStep(100, 20, 4)).toBe(20);
  });

  it('should handle zero range', () => {
    expect(calculateYStep(50, 50, 4)).toBe(0.25);
  });

  it('should use default values', () => {
    expect(calculateYStep(100)).toBe(25);
  });
});

describe('generateGridLines', () => {
  it('should generate correct number of grid lines', () => {
    const lines = generateGridLines(100, 0, 4, 280, 40, 200);
    expect(lines).toHaveLength(5); // yLevels + 1
  });

  it('should include y position, label, and index', () => {
    const lines = generateGridLines(100, 0, 4, 280, 40, 200);
    lines.forEach((line, index) => {
      expect(line).toHaveProperty('y');
      expect(line).toHaveProperty('label');
      expect(line).toHaveProperty('index');
      expect(line.index).toBe(index);
    });
  });

  it('should generate labels from max to min', () => {
    const lines = generateGridLines(100, 0, 4);
    expect(lines[0].label).toBe('100');
    expect(lines[lines.length - 1].label).toBe('0');
  });

  it('should use default values', () => {
    const lines = generateGridLines(100);
    expect(lines).toHaveLength(5);
  });
});

describe('formatAxisLabel', () => {
  it('should format millions with M suffix', () => {
    expect(formatAxisLabel(1000000)).toBe('1.0M');
    expect(formatAxisLabel(2500000)).toBe('2.5M');
  });

  it('should format thousands with K suffix', () => {
    expect(formatAxisLabel(1000)).toBe('1.0K');
    expect(formatAxisLabel(5500)).toBe('5.5K');
  });

  it('should return raw number for values under 1000', () => {
    expect(formatAxisLabel(500)).toBe('500');
    expect(formatAxisLabel(999)).toBe('999');
  });

  it('should handle zero', () => {
    expect(formatAxisLabel(0)).toBe('0');
  });
});

describe('calculateBarDimensions', () => {
  it('should calculate bar width and gap', () => {
    const { barWidth, barGap } = calculateBarDimensions(500, 40, 6);
    expect(barWidth).toBeGreaterThan(0);
    expect(barGap).toBeGreaterThan(0);
  });

  it('should maintain gap ratio', () => {
    const { barWidth, barGap } = calculateBarDimensions(500, 40, 6);
    expect(barGap).toBe(barWidth * 0.6);
  });

  it('should accept custom spacing multiplier', () => {
    const result1 = calculateBarDimensions(500, 40, 6, 1.5);
    const result2 = calculateBarDimensions(500, 40, 6, 2.0);
    expect(result1.barWidth).toBeGreaterThan(result2.barWidth);
  });
});

describe('calculateLineChartPoints', () => {
  it('should calculate correct number of points', () => {
    const data = [10, 20, 30, 40, 50];
    const points = calculateLineChartPoints(data, 500, 280, 40);
    expect(points).toHaveLength(5);
  });

  it('should return x and y coordinates', () => {
    const data = [10, 20, 30];
    const points = calculateLineChartPoints(data, 500, 280, 40);
    points.forEach((point) => {
      expect(point).toHaveProperty('x');
      expect(point).toHaveProperty('y');
      expect(typeof point.x).toBe('number');
      expect(typeof point.y).toBe('number');
    });
  });

  it('should start from padding position', () => {
    const data = [10, 20, 30];
    const padding = 40;
    const points = calculateLineChartPoints(data, 500, 280, padding);
    expect(points[0].x).toBe(padding);
  });

  it('should handle single data point', () => {
    const data = [50];
    const points = calculateLineChartPoints(data, 500, 280, 40);
    expect(points).toHaveLength(1);
  });
});

describe('createSmoothCurvePath', () => {
  it('should return empty string for empty array', () => {
    expect(createSmoothCurvePath([])).toBe('');
  });

  it('should start with M command', () => {
    const points = [{ x: 10, y: 20 }, { x: 30, y: 40 }];
    const path = createSmoothCurvePath(points);
    expect(path.startsWith('M')).toBe(true);
  });

  it('should include all points in path', () => {
    const points = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 30 },
    ];
    const path = createSmoothCurvePath(points);
    expect(path).toContain('10');
    expect(path).toContain('20');
  });

  it('should handle single point', () => {
    const points = [{ x: 10, y: 20 }];
    const path = createSmoothCurvePath(points);
    expect(path).toBe('M 10 20');
  });
});

describe('createFillPath', () => {
  it('should create closed path', () => {
    const curvePath = 'M 10 20 L 30 40';
    const lastPoint = { x: 30, y: 40 };
    const fillPath = createFillPath(curvePath, lastPoint, 40, 280);
    expect(fillPath).toContain('Z');
  });

  it('should extend to bottom of chart', () => {
    const curvePath = 'M 10 20 L 30 40';
    const lastPoint = { x: 30, y: 40 };
    const fillPath = createFillPath(curvePath, lastPoint, 40, 280);
    expect(fillPath).toContain('L 30');
    expect(fillPath).toContain('L 40');
  });
});

describe('CHART_COLORS', () => {
  it('should have all required color properties', () => {
    expect(CHART_COLORS).toHaveProperty('grid');
    expect(CHART_COLORS).toHaveProperty('text');
    expect(CHART_COLORS).toHaveProperty('border');
    expect(CHART_COLORS).toHaveProperty('success');
    expect(CHART_COLORS).toHaveProperty('warning');
    expect(CHART_COLORS).toHaveProperty('danger');
    expect(CHART_COLORS).toHaveProperty('info');
  });

  it('should have valid hex colors', () => {
    Object.values(CHART_COLORS).forEach((color) => {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });
});
