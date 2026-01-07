import {
  TABLE_CLASSES,
  STATUS_BADGE_COLORS,
  getHeaderCellClass,
  getCellClass,
  getStatusBadgeClass,
} from '../table-utils';

describe('TABLE_CLASSES', () => {
  it('should have all required class properties', () => {
    expect(TABLE_CLASSES).toHaveProperty('wrapper');
    expect(TABLE_CLASSES).toHaveProperty('header');
    expect(TABLE_CLASSES).toHaveProperty('headerCell');
    expect(TABLE_CLASSES).toHaveProperty('row');
    expect(TABLE_CLASSES).toHaveProperty('cell');
    expect(TABLE_CLASSES).toHaveProperty('cellMedium');
    expect(TABLE_CLASSES).toHaveProperty('overflowContainer');
  });

  it('should contain valid CSS class names', () => {
    Object.values(TABLE_CLASSES).forEach((className) => {
      expect(typeof className).toBe('string');
      expect(className.length).toBeGreaterThan(0);
    });
  });
});

describe('STATUS_BADGE_COLORS', () => {
  const statuses = ['COMPLETED', 'PENDING', 'VERIFIED', 'APPROVED', 'ACTIVE', 'INACTIVE', 'FAILED'] as const;

  it('should have all status types', () => {
    statuses.forEach((status) => {
      expect(STATUS_BADGE_COLORS).toHaveProperty(status);
    });
  });

  it('should have bg, text, and border properties for each status', () => {
    statuses.forEach((status) => {
      const colors = STATUS_BADGE_COLORS[status];
      expect(colors).toHaveProperty('bg');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('border');
    });
  });
});

describe('getHeaderCellClass', () => {
  it('should return base class for left alignment', () => {
    const result = getHeaderCellClass('left');
    expect(result).toBe(TABLE_CLASSES.headerCell);
  });

  it('should return base class when no alignment provided', () => {
    const result = getHeaderCellClass();
    expect(result).toBe(TABLE_CLASSES.headerCell);
  });

  it('should add text-center for center alignment', () => {
    const result = getHeaderCellClass('center');
    expect(result).toContain('text-center');
    expect(result).toContain(TABLE_CLASSES.headerCell);
  });

  it('should add text-right for right alignment', () => {
    const result = getHeaderCellClass('right');
    expect(result).toContain('text-right');
    expect(result).toContain(TABLE_CLASSES.headerCell);
  });
});

describe('getCellClass', () => {
  it('should return cell class by default', () => {
    const result = getCellClass();
    expect(result).toBe(TABLE_CLASSES.cell);
  });

  it('should return cellMedium class when isMedium is true', () => {
    const result = getCellClass(true);
    expect(result).toBe(TABLE_CLASSES.cellMedium);
  });

  it('should add text-center for center alignment', () => {
    const result = getCellClass(false, 'center');
    expect(result).toContain('text-center');
  });

  it('should add text-right for right alignment', () => {
    const result = getCellClass(false, 'right');
    expect(result).toContain('text-right');
  });

  it('should combine medium and alignment', () => {
    const result = getCellClass(true, 'center');
    expect(result).toContain(TABLE_CLASSES.cellMedium);
    expect(result).toContain('text-center');
  });
});

describe('getStatusBadgeClass', () => {
  it('should return correct classes for COMPLETED status', () => {
    const result = getStatusBadgeClass('COMPLETED');
    expect(result).toContain('bg-green-500/20');
    expect(result).toContain('text-green-400');
    expect(result).toContain('border-green-500/50');
    expect(result).toContain('rounded-full');
    expect(result).toContain('px-3');
    expect(result).toContain('py-1');
  });

  it('should return correct classes for PENDING status', () => {
    const result = getStatusBadgeClass('PENDING');
    expect(result).toContain('bg-yellow-500/20');
    expect(result).toContain('text-yellow-400');
  });

  it('should return correct classes for FAILED status', () => {
    const result = getStatusBadgeClass('FAILED');
    expect(result).toContain('bg-red-500/20');
    expect(result).toContain('text-red-400');
  });

  it('should include common badge styles', () => {
    const statuses = ['COMPLETED', 'PENDING', 'VERIFIED', 'APPROVED', 'ACTIVE', 'INACTIVE', 'FAILED'] as const;
    statuses.forEach((status) => {
      const result = getStatusBadgeClass(status);
      expect(result).toContain('px-3');
      expect(result).toContain('py-1');
      expect(result).toContain('rounded-full');
      expect(result).toContain('text-xs');
      expect(result).toContain('font-medium');
      expect(result).toContain('border');
    });
  });
});
